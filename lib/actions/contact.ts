"use server";

import nodemailer from "nodemailer";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, hasLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export type ContactState = { status: "idle" | "success" | "error" | "invalid" };

const limits = { name: 100, email: 150, phone: 20, service: 100, message: 5000 };
const companyLimit = 150;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[\d\s.()-]{8,20}$/;

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const field = (key: string) => String(formData.get(key) ?? "").trim();

  // Hidden "website" field: real visitors never fill it, spam bots do.
  if (field("website")) return { status: "success" };

  const values = {
    name: field("name"),
    email: field("email"),
    phone: field("phone"),
    service: field("service"),
    message: field("message"),
  };
  const clientType = field("clientType");
  const isCompany = clientType === "company";
  const company = isCompany ? field("company") : "";
  const phoneDigits = values.phone.replace(/\D/g, "").length;

  const invalid =
    (Object.keys(limits) as (keyof typeof limits)[]).some(
      (key) => !values[key] || values[key].length > limits[key],
    ) ||
    (clientType !== "individual" && !isCompany) ||
    (isCompany && (!company || company.length > companyLimit)) ||
    !emailPattern.test(values.email) ||
    !phonePattern.test(values.phone) ||
    phoneDigits < 8 ||
    phoneDigits > 15;
  if (invalid) return { status: "invalid" };

  const user = process.env.SMTP_USER;
  // Gmail shows app passwords in groups of four; the spaces are not part of the password.
  const pass = process.env.SMTP_PASS?.replace(/\s/g, "");
  if (!user || !pass) {
    console.error("Contact form: SMTP_USER or SMTP_PASS is not set.");
    return { status: "error" };
  }

  const lang = field("lang");
  const labels = (await getDictionary(hasLocale(lang) ? lang : defaultLocale)).contact.form;
  const rows: [string, string][] = [
    [labels.emailClientType, isCompany ? labels.company : labels.individual],
    [labels.emailName, values.name],
    ...(isCompany ? [[labels.companyName, company] as [string, string]] : []),
    [labels.email, values.email],
    [labels.phone, values.phone],
    [labels.emailService, values.service],
  ];
  const sender = isCompany ? `${values.name}, ${company}` : values.name;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const mail = {
    // Gmail rewrites any other sender address to the authenticated account.
    from: { name: `${site.name} Website`, address: user },
    to: process.env.CONTACT_TO_EMAIL || site.email,
    replyTo: values.email,
    subject: `${labels.emailSubject} — ${values.service} (${sender})`,
    text: [...rows.map(([label, value]) => `${label}: ${value}`), "", values.message].join("\n"),
    html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#334155;max-width:620px">
  <h2 style="margin:0 0 16px;color:#112b5a">${escapeHtml(labels.emailSubject)}</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:16px">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#64748b;vertical-align:top">${escapeHtml(label)}</td><td style="padding:4px 0;font-weight:600;color:#112b5a">${escapeHtml(value)}</td></tr>`,
      )
      .join("")}
  </table>
  <div style="white-space:pre-wrap;padding:16px;background:#f1f5f9;border-radius:12px">${escapeHtml(values.message)}</div>
</div>`,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(`Contact form: sending failed: ${error instanceof Error ? error.message : String(error)}`);
    return { status: "error" };
  }
  return { status: "success" };
}
