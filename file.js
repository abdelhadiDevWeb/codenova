// Sends one email per recipient over SMTP with Nodemailer.
//
// Setup in .env or .env.local (never commit them):
//   SMTP_HOST=mail.privateemail.com
//   SMTP_PORT=465
//   SMTP_USER=contact@codenoova.codes
//   SMTP_PASSWORD=...
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
  "acil3967@gmail.com",
   "hadiabdou721@gmail.com"
  //  "blida@eurovisadz.com" , 
  //  "getawaytravel@hotmail.com",
  //  "contact@nour-education.net"
//   "contact@sarlagrotech.com",
//   "contact@maystro-delivery.com",
//   "contact@algerianagripreneurs.dz",
//   "contact@tradifoot.com",
// "ceramdivindus@gmail.com",
//   "meftahi.cbm@gmail.com",
//   "commercial@cerhippocampe.com",
//   "contact@phobos.dz",
//   "misebaou@gmail.com",
//   "kh.hamfood@gmail.com",
//   "bahiapeche2003@yahoo.fr",
//   "h.allou@condisalgerie.com",
//   "flimadex@yahoo.fr",
//   "ziad.a@kollirama.com",
//   "cmc2000_dz@yahoo.fr",
//   "contact@in-tuition.dz",
//   "contact@elnabilepromotion.com",
//   "amel.kasmi@hotmail.fr",
//   "contact@bricomawad.com",
//   "contact@sm-distributions.com",
//   "contact@palmaryfood.com",
//   "Contact@agrorayane.com",
//   "spicychickendz@gmail.com",
//   "contact@ndwi-dz.com",
//   "info@nechma.com" , 
//   "contact@sarlfmco.com" ,
//   "contact@spi-dz.com",
//   "contact@www.divindus.dz",
//   "amm.comark1@gmail.com",
//   "commercial@ceramdecor-dz.com",
];

const contact = {
  phone: "0782860182",
  phoneLabel: "0782 86 01 82",
  phoneHref: "tel:+213782860182",
  email: "contact@codenoova.codes",
  website: "https://codenoova.codes/",
  websiteLabel: "codenoova.codes",
  address: "Draria, Alger, Algérie",
};

const logoPath = fileURLToPath(new URL("./public/logo-mark.png", import.meta.url));
const logoCid = "codenoova-logo";

const subject = "Présentation de CodeNoova — Développement web, mobile et solutions digitales";
const preheader =
  "Sites web, applications mobiles, logiciels et intelligence artificielle sur mesure pour votre entreprise — consultation gratuite.";

// Pausing between messages keeps the mail provider from flagging the batch as spam.
const DELAY_MS = 2000;

// Errors that will fail for every remaining recipient too, so the loop stops:
// wrong login, unreachable server, or 421/454 = the server is throttling the account.
const isFatal = (error) =>
  ["EAUTH", "ECONNECTION", "ESOCKET", "ETIMEDOUT", "EDNS"].includes(error.code) ||
  error.responseCode === 421 ||
  error.responseCode === 454;

const dryRun = process.argv.includes("--dry-run");
const preview = process.argv.includes("--preview");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const services = [
  ["Développement web", "Sites vitrines, plateformes web, boutiques e-commerce et landing pages."],
  ["Applications mobiles", "Conception et développement d’applications pour Android et iOS."],
  [
    "Logiciels de bureau",
    "Solutions personnalisées pour la gestion et l’optimisation des activités professionnelles.",
  ],
  ["Design UI/UX", "Création d’interfaces modernes, intuitives et centrées sur l’expérience utilisateur."],
  [
    "Intelligence artificielle",
    "Intégration de chatbots, d’automatisation et d’analyse de données dans vos sites, applications et logiciels.",
  ],
];

const highlights = [
  ["Consultation gratuite", "Un premier échange offert et sans engagement."],
  ["Tarifs transparents", "Des devis clairs et détaillés en dinars algériens."],
  ["De l’idée au marché", "Un accompagnement à chaque étape de votre projet."],
];

const optOut =
  "Vous recevez ce message à titre d’information professionnelle. Si vous ne souhaitez plus recevoir nos messages, répondez simplement « STOP ».";

const text = `CODENOOVA
Développement web, mobile et solutions digitales

---

À l’attention de la direction commerciale

Madame, Monsieur,

Nous avons le plaisir de vous présenter CodeNoova, une agence spécialisée dans la conception et le développement de solutions digitales sur mesure pour les entreprises.

Notre objectif est d’accompagner les professionnels dans leur transformation digitale en leur proposant des solutions adaptées à leurs besoins, à leurs activités et à leurs objectifs.

Nos principaux services :

${services.map(([title, detail]) => `- ${title} : ${detail}`).join("\n")}

Pourquoi CodeNoova :

${highlights.map(([title, detail]) => `- ${title} : ${detail}`).join("\n")}

Chez CodeNoova, chaque projet est étudié individuellement afin de proposer une solution adaptée aux exigences et au budget du client.

Nous serions ravis d’échanger avec vous pour comprendre vos besoins et vous présenter les solutions que nous pourrions mettre en place pour votre entreprise.

Vous pouvez découvrir nos services et nos réalisations sur notre site web :

Site web : ${contact.website}

Nous restons à votre disposition pour toute information complémentaire ou pour convenir d’un premier échange.

Cordialement,

L’équipe CodeNoova
Développement web, mobile et solutions digitales

Tél. : ${contact.phoneLabel}
E-mail : ${contact.email}
Site web : ${contact.website}
Adresse : ${contact.address}

CodeNoova — Vos idées, nos solutions digitales.

${optOut}`;

const colors = {
  navy: "#112b5a",
  navyDark: "#0b1f44",
  blue: "#2b6fc2",
  sky: "#278bdb",
  text: "#334155",
  muted: "#64748b",
  border: "#e2e8f0",
  soft: "#f6f8fb",
  page: "#eef2f7",
};

function sectionTitle(eyebrow, title) {
  return `<div style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${colors.blue}">${eyebrow}</div>
    <div style="margin:6px 0 18px;font-size:20px;line-height:1.3;font-weight:800;color:${colors.navy}">${title}</div>`;
}

// The card styles sit on the cell itself so that both cards of a row share one height.
function serviceCard([title, detail], index, wide = false) {
  return `<td class="col card" width="${wide ? "100%" : "50%"}" ${wide ? 'colspan="2"' : ""} valign="top" style="padding:18px 20px;background:${colors.soft};border:1px solid ${colors.border};border-radius:12px">
          <div style="display:inline-block;min-width:28px;padding:4px 0;border-radius:8px;background:${colors.navy};color:#ffffff;font-size:12px;font-weight:700;text-align:center">${String(index + 1).padStart(2, "0")}</div>
          <div style="margin:12px 0 6px;font-size:16px;font-weight:700;color:${colors.navy}">${title}</div>
          <div style="font-size:14px;line-height:1.6;color:${colors.muted}">${detail}</div>
    </td>`;
}

function serviceRows() {
  const rows = [];
  for (let i = 0; i < services.length; i += 2) {
    const pair = services.slice(i, i + 2);
    rows.push(
      `<tr>${pair.length === 2 ? pair.map((s, j) => serviceCard(s, i + j)).join("") : serviceCard(pair[0], i, true)}</tr>`,
    );
  }
  return rows.join("\n    ");
}

function buildHtml(logoSrc) {
  const p = "margin:0 0 16px";
  const link = `color:${colors.blue};text-decoration:none;font-weight:600`;
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${subject}</title>
<style>
  @media (max-width: 600px) {
    .container { width: 100% !important; border-radius: 0 !important; }
    .px { padding-left: 20px !important; padding-right: 20px !important; }
    .px-cards { padding: 4px 20px 16px !important; }
    .cards { border-spacing: 0 !important; }
    .col { display: block !important; width: 100% !important; box-sizing: border-box; }
    .card { margin-bottom: 12px !important; }
    .hide-sm { display: none !important; }
    .h1 { font-size: 24px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${colors.page};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${colors.page}">
<tr><td align="center" style="padding:28px 12px">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:${colors.text}">

  <tr><td class="px" style="padding:22px 32px;border-bottom:1px solid ${colors.border}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td valign="middle">
        <img src="${logoSrc}" width="60" height="32" alt="" style="display:inline-block;vertical-align:middle;border:0">
        <span style="display:inline-block;vertical-align:middle;margin-left:8px;font-size:22px;font-weight:800;letter-spacing:-0.3px"><span style="color:${colors.navy}">Code</span><span style="color:${colors.sky}">Noova</span></span>
      </td>
      <td class="hide-sm" align="right" valign="middle" style="font-size:12px;color:${colors.muted}">Agence digitale · ${contact.address}</td>
    </tr></table>
  </td></tr>

  <tr><td class="px" style="padding:40px 32px;background:${colors.navy};background-image:linear-gradient(135deg,${colors.navyDark} 0%,${colors.navy} 55%,#1e5aa8 100%)">
    <div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7dd3fc">Agence de développement digital — Algérie</div>
    <h1 class="h1" style="margin:12px 0 12px;font-size:28px;line-height:1.25;font-weight:800;color:#ffffff">Des solutions digitales sur mesure pour votre entreprise</h1>
    <p style="margin:0;font-size:15px;color:#cbd5e1">Développement web, mobile et solutions digitales</p>
  </td></tr>

  <tr><td class="px" style="padding:32px 32px 8px">
    <p style="${p};font-weight:700;color:${colors.navy}">À l’attention de la direction commerciale</p>
    <p style="${p}">Madame, Monsieur,</p>
    <p style="${p}">Nous avons le plaisir de vous présenter <strong style="color:${colors.navy}">CodeNoova</strong>, une agence spécialisée dans la conception et le développement de solutions digitales sur mesure pour les entreprises.</p>
    <p style="margin:0 0 28px">Notre objectif est d’accompagner les professionnels dans leur transformation digitale en leur proposant des solutions adaptées à leurs besoins, à leurs activités et à leurs objectifs.</p>
    ${sectionTitle("Nos expertises", "Nos principaux services")}
  </td></tr>

  <tr><td class="px-cards" style="padding:0 20px 16px">
    <table role="presentation" class="cards" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:12px">
    ${serviceRows()}
    </table>
  </td></tr>

  <tr><td class="px" style="padding:8px 32px 8px">
    ${sectionTitle("Pourquoi CodeNoova", "Un partenaire fiable pour votre croissance")}
  </td></tr>
  <tr><td class="px" style="padding:0 26px 24px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      ${highlights
        .map(
          ([title, detail]) => `<td class="col" width="33%" valign="top" style="padding:6px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:3px solid ${colors.sky}">
          <tr><td style="padding:14px 4px 0">
            <div style="font-size:15px;font-weight:700;color:${colors.navy}">✓ ${title}</div>
            <div style="margin-top:4px;font-size:13px;line-height:1.55;color:${colors.muted}">${detail}</div>
          </td></tr>
        </table>
      </td>`,
        )
        .join("\n      ")}
    </tr></table>
  </td></tr>

  <tr><td class="px" style="padding:8px 32px 8px">
    <p style="${p}">Chez CodeNoova, chaque projet est étudié individuellement afin de proposer une solution adaptée aux exigences et au budget du client.</p>
    <p style="${p}">Nous serions ravis d’échanger avec vous pour comprendre vos besoins et vous présenter les solutions que nous pourrions mettre en place pour votre entreprise.</p>
  </td></tr>

  <tr><td class="px" style="padding:8px 32px 28px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${colors.soft};border:1px solid ${colors.border};border-radius:14px">
      <tr><td align="center" style="padding:26px 20px">
        <div style="margin:0 0 16px;font-size:15px;color:${colors.text}">Vous pouvez découvrir nos services et nos réalisations sur notre site&nbsp;web&nbsp;:</div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>
          <td align="center" style="border-radius:999px;background:${colors.blue}">
            <a href="${contact.website}" style="display:inline-block;padding:14px 34px;border-radius:999px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none">Visitez notre site web</a>
          </td>
        </tr></table>
        <div style="margin-top:14px;font-size:13px;color:${colors.muted}">ou appelez-nous au <a href="${contact.phoneHref}" style="${link}">${contact.phoneLabel}</a></div>
      </td></tr>
    </table>
  </td></tr>

  <tr><td class="px" style="padding:0 32px 8px">
    <p style="${p}">Nous restons à votre disposition pour toute information complémentaire ou pour convenir d’un premier échange.</p>
    <p style="margin:0 0 24px">Cordialement,</p>
  </td></tr>

  <tr><td class="px" style="padding:0 32px 32px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${colors.border}">
      <tr>
        <td width="96" valign="top" style="padding:22px 18px 0 0">
          <img src="${logoSrc}" width="84" alt="CodeNoova" style="display:block;width:84px;height:auto;border:0">
        </td>
        <td valign="top" style="padding:20px 0 0 18px;border-left:2px solid ${colors.border};font-size:14px;line-height:1.7">
          <div style="font-size:18px;font-weight:800"><span style="color:${colors.navy}">Code</span><span style="color:${colors.sky}">Noova</span></div>
          <div style="font-weight:700;color:${colors.navy}">L’équipe CodeNoova</div>
          <div style="margin-bottom:8px;color:${colors.muted}">Développement web, mobile et solutions digitales</div>
          <div><span style="color:${colors.muted}">Tél.&nbsp;:</span> <a href="${contact.phoneHref}" style="${link}">${contact.phoneLabel}</a></div>
          <div><span style="color:${colors.muted}">E-mail&nbsp;:</span> <a href="mailto:${contact.email}" style="${link}">${contact.email}</a></div>
          <div><span style="color:${colors.muted}">Site web&nbsp;:</span> <a href="${contact.website}" style="${link}">${contact.websiteLabel}</a></div>
          <div><span style="color:${colors.muted}">Adresse&nbsp;:</span> ${contact.address}</div>
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td class="px" align="center" style="padding:22px 32px;background:${colors.navy}">
    <div style="font-size:14px;font-style:italic;color:#ffffff">CodeNoova — Vos idées, nos solutions digitales.</div>
    <div style="margin-top:6px;font-size:13px">
      <a href="${contact.website}" style="color:#93c5fd;text-decoration:none">${contact.websiteLabel}</a>
      <span style="color:#64748b">&nbsp;·&nbsp;</span>
      <a href="mailto:${contact.email}" style="color:#93c5fd;text-decoration:none">${contact.email}</a>
    </div>
  </td></tr>
</table>

<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px">
  <tr><td class="px" align="center" style="padding:18px 32px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#94a3b8">${optOut}</td></tr>
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

  const { SMTP_HOST: host, SMTP_USER: user, SMTP_PASSWORD: pass } = process.env;
  const port = Number(process.env.SMTP_PORT || 465);
  if (!dryRun && (!host || !user || !pass)) {
    console.error("Missing SMTP_HOST, SMTP_USER or SMTP_PASSWORD. Add them to .env (see the top of this file).");
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
    host,
    port,
    // Port 465 uses SSL from the start; 587 starts plain and upgrades with STARTTLS.
    secure: port === 465,
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
        list: { unsubscribe: { url: `mailto:${contact.email}?subject=STOP`, comment: "STOP" } },
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
