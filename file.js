// Sends one email per recipient through Gmail with Nodemailer.
//
// Setup in .env or .env.local (never commit them):
//   SMTP_USER=codenoova.dz@gmail.com
//   SMTP_PASS=xxxxxxxxxxxxxxxx   (Gmail app password: myaccount.google.com/apppasswords)
//
// Run:
//   node file.js --preview   write email-preview.html to check the design in a browser
//   node file.js --dry-run   preview the list without sending anything
//   node file.js             send for real

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    // Missing file: fall back to the other one or to variables set in the shell.
  }
}

const recipients = [
  "abdouhadi2002@gmail.com" , 
   "hadiabdou72@gmail.com",
   "boudjemline.mohamed.abdelhadi@gmail.com",
  "contact@sarlagrotech.com",
  "contact@maystro-delivery.com",
  "contact@algerianagripreneurs.dz",
  "contact@tradifoot.com",
"ceramdivindus@gmail.com",
  "meftahi.cbm@gmail.com",
  "commercial@cerhippocampe.com",
  "contact@phobos.dz",
  "misebaou@gmail.com",
  "kh.hamfood@gmail.com",
  "bahiapeche2003@yahoo.fr",
  "h.allou@condisalgerie.com",
  "flimadex@yahoo.fr",
  "ziad.a@kollirama.com",
  "cmc2000_dz@yahoo.fr",
  "contact@in-tuition.dz",
  "contact@elnabilepromotion.com",
  "amel.kasmi@hotmail.fr",
  "contact@bricomawad.com",
  "contact@sm-distributions.com",
  "contact@palmaryfood.com",
  "Contact@agrorayane.com",
  "spicychickendz@gmail.com",
  "contact@ndwi-dz.com",
  "info@nechma.com" , 
  "contact@sarlfmco.com" ,
  "contact@spi-dz.com",
  "contact@www.divindus.dz",
  "amm.comark1@gmail.com",
  "commercial@ceramdecor-dz.com",
];

const contact = {
  phone: "0782860182",
  phoneHref: "tel:+213782860182",
  email: "codenoova.dz@gmail.com",
  website: "https://dzcode-nova.vercel.app",
  websiteLabel: "dzcode-nova.vercel.app",
};

const logoPath = fileURLToPath(new URL("./public/logo-mark.png", import.meta.url));
const logoCid = "codenoova-logo";

const subject = "Présentation de CodeNoova — Développement web, mobile et solutions digitales";

// A normal Gmail account can send about 500 emails per day; pausing between messages
// keeps Gmail from flagging the batch as spam.
const DELAY_MS = 2000;

// SMTP response codes that will fail for every remaining recipient too, so the loop stops:
// 421/454 = Gmail is throttling the account, 550 5.4.5 = daily sending limit reached.
const isFatal = (error) =>
  error.code === "EAUTH" ||
  error.responseCode === 421 ||
  error.responseCode === 454 ||
  /5\.4\.5|daily user sending limit/i.test(error.response ?? "");

const dryRun = process.argv.includes("--dry-run");
const preview = process.argv.includes("--preview");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const text = `CODENOOVA
Développement web, mobile et solutions digitales

---

À l’attention de la direction commerciale

Madame, Monsieur,

Nous avons le plaisir de vous présenter CodeNoova, une agence spécialisée dans la conception et le développement de solutions digitales sur mesure pour les entreprises.

Notre objectif est d’accompagner les professionnels dans leur transformation digitale en leur proposant des solutions adaptées à leurs besoins, à leurs activités et à leurs objectifs.

Nos principaux services :

- Développement web : sites vitrines, plateformes web, boutiques e-commerce et landing pages.
- Applications mobiles : conception et développement d’applications pour Android et iOS.
- Logiciels de bureau : solutions personnalisées pour la gestion et l’optimisation des activités professionnelles.
- Design UI/UX : création d’interfaces modernes, intuitives et centrées sur l’expérience utilisateur.

Chez CodeNoova, chaque projet est étudié individuellement afin de proposer une solution adaptée aux exigences et au budget du client.

Nous serions ravis d’échanger avec vous pour comprendre vos besoins et vous présenter les solutions que nous pourrions mettre en place pour votre entreprise.

Vous pouvez découvrir nos services et nos réalisations sur notre site web :

Site web : ${contact.website}

Nous restons à votre disposition pour toute information complémentaire ou pour convenir d’un premier échange.

Cordialement,

L’équipe CodeNoova
Développement web, mobile et solutions digitales

Tél. : ${contact.phone}
E-mail : ${contact.email}
Site web : ${contact.website}

CodeNoova — Vos idées, nos solutions digitales.`;

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
    <div style="font-size:22px;font-weight:800;letter-spacing:2px;color:#112b5a">CODENOOVA</div>
    <div style="font-style:italic;color:#64748b">Développement web, mobile et solutions digitales</div>
  </td></tr>

  <tr><td style="padding:28px 32px 8px">
    <p style="${p};font-weight:700;color:#112b5a">À l’attention de la direction commerciale</p>
    <p style="${p}">Madame, Monsieur,</p>
    <p style="${p}">Nous avons le plaisir de vous présenter <strong style="color:#112b5a">CodeNoova</strong>, une agence spécialisée dans la conception et le développement de solutions digitales sur mesure pour les entreprises.</p>
    <p style="${p}">Notre objectif est d’accompagner les professionnels dans leur transformation digitale en leur proposant des solutions adaptées à leurs besoins, à leurs activités et à leurs objectifs.</p>
    <p style="margin:0 0 8px;font-weight:700;color:#112b5a">Nos principaux services :</p>
    <ul style="margin:0 0 16px;padding-left:20px">
      ${services.map(([title, detail]) => `<li style="margin-bottom:6px"><strong style="color:#112b5a">${title} :</strong> ${detail}</li>`).join("\n      ")}
    </ul>
    <p style="${p}">Chez CodeNoova, chaque projet est étudié individuellement afin de proposer une solution adaptée aux exigences et au budget du client.</p>
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
          <img src="${logoSrc}" width="96" alt="CodeNoova" style="display:block;width:96px;height:auto;border:0">
        </td>
        <td style="padding:20px 0 0 18px;border-left:2px solid #e2e8f0;vertical-align:top;font-size:14px;line-height:1.6">
          <div style="font-size:18px;font-weight:800"><span style="color:#112b5a">Code</span><span style="color:#278bdb">Noova</span></div>
          <div style="font-weight:700;color:#112b5a">L’équipe CodeNoova</div>
          <div style="color:#64748b;margin-bottom:8px">Développement web, mobile et solutions digitales</div>
          <div>Tél. : <a href="${contact.phoneHref}" style="${link}">${contact.phone}</a></div>
          <div>E-mail : <a href="mailto:${contact.email}" style="${link}">${contact.email}</a></div>
          <div>Site web : <a href="${contact.website}" style="${link}">${contact.websiteLabel}</a></div>
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:16px 32px;background:#112b5a;border-radius:0 0 16px 16px;text-align:center;color:#ffffff;font-style:italic;font-size:14px">
    CodeNoova — Vos idées, nos solutions digitales.
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

  const user = process.env.SMTP_USER;
  // Gmail shows app passwords in groups of four; the spaces are not part of the password.
  const pass = process.env.SMTP_PASS?.replace(/\s/g, "");
  if (!dryRun && (!user || !pass)) {
    console.error("Missing SMTP_USER or SMTP_PASS. Add them to .env (see the top of this file).");
    process.exit(1);
  }

  const from = { name: "CodeNoova", address: user || contact.email };
  const list = cleanRecipients(recipients);
  console.log(`${list.length} recipient(s) from ${from.address}${dryRun ? " — dry run, nothing will be sent" : ""}\n`);

  if (dryRun) {
    for (const [index, email] of list.entries()) {
      console.log(`[${index + 1}/${list.length}] ${email} — would send "${subject}"`);
    }
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    pool: true,
    maxConnections: 1,
    auth: { user, pass },
  });
  await transporter.verify();

  const html = buildHtml(`cid:${logoCid}`);
  let sent = 0;
  const failed = [];

  for (const [index, email] of list.entries()) {
    const label = `[${index + 1}/${list.length}] ${email}`;

    try {
      const info = await transporter.sendMail({
        from,
        to: email,
        replyTo: contact.email,
        subject,
        text,
        html,
        attachments: [{ path: logoPath, filename: "codenoova-logo.png", cid: logoCid }],
      });
      sent++;
      console.log(`${label} — sent (${info.messageId})`);
    } catch (error) {
      failed.push({ email, error: error.message });
      console.error(`${label} — FAILED: ${error.message}`);
      if (isFatal(error)) {
        console.error("\nStopping: this error would affect every remaining recipient.");
        break;
      }
    }

    if (index < list.length - 1) await sleep(DELAY_MS);
  }

  transporter.close();
  console.log(`\nDone: ${sent} sent, ${failed.length} failed, ${list.length - sent - failed.length} not attempted.`);
  for (const { email, error } of failed) console.log(`  ${email}: ${error}`);
  if (failed.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
