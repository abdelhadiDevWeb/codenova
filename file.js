// Sends one email per recipient with Resend.
//
// Setup in .env or .env.local (never commit them):
//   RESEND_API_KEY=re_...
//   RESEND_FROM=CodeNova <contact@your-domain.com>   (optional, see below)
// Until a domain you own is verified at resend.com/domains, Resend only delivers to the
// email address of your Resend account, from onboarding@resend.dev.
//
// Run:
//   node file.js --preview   write email-preview.html to check the design in a browser
//   node file.js --dry-run   preview the list without sending anything
//   node file.js             send for real

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";

for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    // Missing file: fall back to the other one or to variables set in the shell.
  }
}

const recipients = [
  "abdouhadi2002@gmail.com",
  "hadiabdou721@gmail.com",
  "acil396@gmail.com",
];

const contact = {
  phone: "0782860182",
  phoneHref: "tel:+213782860182",
  email: "codenova.dz@gmail.com",
  website: "https://dzcode-nova.vercel.app",
  websiteLabel: "dzcode-nova.vercel.app",
};

const logoPath = fileURLToPath(new URL("./public/logo-mark.png", import.meta.url));
const logoCid = "codenova-logo";

const subject = "Présentation de CodeNova — Développement web, mobile et solutions digitales";

// Resend's free plan allows 100 emails per day and 10 requests per second.
const DELAY_MS = 1000;

// Errors that will fail for every remaining recipient too, so the loop stops.
const FATAL_ERRORS = new Set([
  "missing_api_key",
  "invalid_api_key",
  "restricted_api_key",
  "invalid_from_address",
  "daily_quota_exceeded",
  "monthly_quota_exceeded",
]);

const dryRun = process.argv.includes("--dry-run");
const preview = process.argv.includes("--preview");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const text = `CODENOVA
Développement web, mobile et solutions digitales

---

À l’attention de la direction commerciale

Madame, Monsieur,

Nous avons le plaisir de vous présenter CodeNova, une agence spécialisée dans la conception et le développement de solutions digitales sur mesure pour les entreprises.

Notre objectif est d’accompagner les professionnels dans leur transformation digitale en leur proposant des solutions adaptées à leurs besoins, à leurs activités et à leurs objectifs.

Nos principaux services :

- Développement web : sites vitrines, plateformes web, boutiques e-commerce et landing pages.
- Applications mobiles : conception et développement d’applications pour Android et iOS.
- Logiciels de bureau : solutions personnalisées pour la gestion et l’optimisation des activités professionnelles.
- Design UI/UX : création d’interfaces modernes, intuitives et centrées sur l’expérience utilisateur.

Chez CodeNova, chaque projet est étudié individuellement afin de proposer une solution adaptée aux exigences et au budget du client.

Nous serions ravis d’échanger avec vous pour comprendre vos besoins et vous présenter les solutions que nous pourrions mettre en place pour votre entreprise.

Vous pouvez découvrir nos services et nos réalisations sur notre site web :

Site web : ${contact.website}

Nous restons à votre disposition pour toute information complémentaire ou pour convenir d’un premier échange.

Cordialement,

L’équipe CodeNova
Développement web, mobile et solutions digitales

Tél. : ${contact.phone}
E-mail : ${contact.email}
Site web : ${contact.website}

CodeNova — Vos idées, nos solutions digitales.`;

const services = [
  ["Développement web", "sites vitrines, plateformes web, boutiques e-commerce et landing pages."],
  ["Applications mobiles", "conception et développement d’applications pour Android et iOS."],
  [
    "Logiciels de bureau",
    "solutions personnalisées pour la gestion et l’optimisation des activités professionnelles.",
  ],
  ["Design UI/UX", "création d’interfaces modernes, intuitives et centrées sur l’expérience utilisateur."],
];

function buildHtml(logoSrc) {
  const link = "color:#2b6fc2;text-decoration:none;font-weight:600";
  const p = "margin:0 0 16px";
  return `<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#334155">
  <tr><td style="padding:28px 32px 20px;border-bottom:3px solid #2b6fc2">
    <div style="font-size:22px;font-weight:800;letter-spacing:2px;color:#112b5a">CODENOVA</div>
    <div style="font-style:italic;color:#64748b">Développement web, mobile et solutions digitales</div>
  </td></tr>

  <tr><td style="padding:28px 32px 8px">
    <p style="${p};font-weight:700;color:#112b5a">À l’attention de la direction commerciale</p>
    <p style="${p}">Madame, Monsieur,</p>
    <p style="${p}">Nous avons le plaisir de vous présenter <strong style="color:#112b5a">CodeNova</strong>, une agence spécialisée dans la conception et le développement de solutions digitales sur mesure pour les entreprises.</p>
    <p style="${p}">Notre objectif est d’accompagner les professionnels dans leur transformation digitale en leur proposant des solutions adaptées à leurs besoins, à leurs activités et à leurs objectifs.</p>
    <p style="margin:0 0 8px;font-weight:700;color:#112b5a">Nos principaux services :</p>
    <ul style="margin:0 0 16px;padding-left:20px">
      ${services.map(([title, detail]) => `<li style="margin-bottom:6px"><strong style="color:#112b5a">${title} :</strong> ${detail}</li>`).join("\n      ")}
    </ul>
    <p style="${p}">Chez CodeNova, chaque projet est étudié individuellement afin de proposer une solution adaptée aux exigences et au budget du client.</p>
    <p style="${p}">Nous serions ravis d’échanger avec vous pour comprendre vos besoins et vous présenter les solutions que nous pourrions mettre en place pour votre entreprise.</p>
    <p style="margin:0 0 12px">Vous pouvez découvrir nos services et nos réalisations sur notre site web :</p>
    <p style="margin:0 0 20px;text-align:center">
      <a href="${contact.website}" style="display:inline-block;background:#2b6fc2;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 28px;border-radius:999px">Visitez notre site web</a>
    </p>
    <p style="${p}">Nous restons à votre disposition pour toute information complémentaire ou pour convenir d’un premier échange.</p>
    <p style="margin:0 0 24px">Cordialement,</p>
  </td></tr>

  <tr><td style="padding:0 32px 28px">
    <table role="presentation" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;width:100%">
      <tr>
        <td style="width:104px;padding:20px 18px 0 0;vertical-align:top">
          <img src="${logoSrc}" width="96" alt="CodeNova" style="display:block;width:96px;height:auto;border:0">
        </td>
        <td style="padding:20px 0 0 18px;border-left:2px solid #e2e8f0;vertical-align:top;font-size:14px;line-height:1.6">
          <div style="font-size:18px;font-weight:800"><span style="color:#112b5a">Code</span><span style="color:#278bdb">Nova</span></div>
          <div style="font-weight:700;color:#112b5a">L’équipe CodeNova</div>
          <div style="color:#64748b;margin-bottom:8px">Développement web, mobile et solutions digitales</div>
          <div>Tél. : <a href="${contact.phoneHref}" style="${link}">${contact.phone}</a></div>
          <div>E-mail : <a href="mailto:${contact.email}" style="${link}">${contact.email}</a></div>
          <div>Site web : <a href="${contact.website}" style="${link}">${contact.websiteLabel}</a></div>
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:16px 32px;background:#112b5a;border-radius:0 0 16px 16px;text-align:center;color:#ffffff;font-style:italic;font-size:14px">
    CodeNova — Vos idées, nos solutions digitales.
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function cleanRecipients(list) {
  const seen = new Set();
  const result = [];
  for (const raw of list) {
    const email = raw.trim().toLowerCase();
    if (!isEmail(email)) {
      console.warn(`Skipping invalid address: "${raw}"`);
      continue;
    }
    if (seen.has(email)) continue;
    seen.add(email);
    result.push(email);
  }
  return result;
}

async function main() {
  if (preview) {
    writeFileSync("email-preview.html", buildHtml("public/logo-mark.png"));
    console.log("Wrote email-preview.html — open it in your browser.");
    return;
  }

  const { RESEND_API_KEY } = process.env;
  const from = process.env.RESEND_FROM || "CodeNova <contact@boudjemlineabdelhadi.com>";
  if (!dryRun && !RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY. Add it to .env (see the top of this file).");
    process.exit(1);
  }

  const list = cleanRecipients(recipients);
  console.log(`${list.length} recipient(s) from ${from}${dryRun ? " — dry run, nothing will be sent" : ""}\n`);

  const resend = new Resend(RESEND_API_KEY);
  const html = buildHtml(`cid:${logoCid}`);
  const logo = readFileSync(logoPath);
  let sent = 0;
  const failed = [];

  for (const [index, email] of list.entries()) {
    const label = `[${index + 1}/${list.length}] ${email}`;

    if (dryRun) {
      console.log(`${label} — would send "${subject}"`);
      continue;
    }

    const { data, error } = await resend.emails.send({
      from,
      to: email,
      replyTo: contact.email,
      subject,
      text,
      html,
      attachments: [{ content: logo, filename: "codenova-logo.png", contentId: logoCid }],
    });

    if (error) {
      failed.push({ email, error: error.message });
      console.error(`${label} — FAILED (${error.name}): ${error.message}`);
      if (FATAL_ERRORS.has(error.name) || error.statusCode === 401) {
        console.error("\nStopping: this error would affect every remaining recipient.");
        break;
      }
    } else {
      sent++;
      console.log(`${label} — sent (${data.id})`);
    }

    if (index < list.length - 1) await sleep(DELAY_MS);
  }

  if (!dryRun) {
    console.log(`\nDone: ${sent} sent, ${failed.length} failed, ${list.length - sent - failed.length} not attempted.`);
    for (const { email, error } of failed) console.log(`  ${email}: ${error}`);
    if (failed.length) process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
