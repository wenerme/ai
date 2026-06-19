---
title: Send email over SMTP
description: Send transactional emails through Cloudflare Email Service authenticated SMTP from curl, Node.js, Python, or PHP.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Send email over SMTP

Send transactional emails over Cloudflare Email Service SMTP using curl, Nodemailer, Python smtplib, or PHPMailer.

Send transactional emails over Cloudflare Email Service [authenticated SMTP](https://developers.cloudflare.com/email-service/api/send-emails/smtp/) (`smtp.mx.cloudflare.net:465`) from any SMTP-capable language or client.

## Prerequisites

* A domain onboarded for [Email Sending](https://developers.cloudflare.com/email-service/configuration/domains/).
* A [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the **Email Sending: Edit** permission. Set it as `CF_API_TOKEN` in your environment. The token is used as the SMTP password; the username is the literal string `api_token`.

* [ curl ](#tab-panel-8586)
* [ Node.js (Nodemailer) ](#tab-panel-8587)
* [ Python (smtplib) ](#tab-panel-8588)
* [ PHP (PHPMailer) ](#tab-panel-8589)

### Send an email

Terminal window

```
cat > mail.txt <<EOFFrom: welcome@yourdomain.comTo: recipient@example.comSubject: Welcome to our service!
Thanks for signing up.EOF
curl --ssl-reqd \  --url "smtps://smtp.mx.cloudflare.net:465" \  --user "api_token:$CF_API_TOKEN" \  --mail-from "welcome@yourdomain.com" \  --mail-rcpt "recipient@example.com" \  --upload-file mail.txt
```

The sender domain must be onboarded for Email Sending on the account that owns the API token.

Install [Nodemailer ↗](https://nodemailer.com/) with `npm install nodemailer`.

### Send an email

JavaScript

```
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({  host: "smtp.mx.cloudflare.net",  port: 465,  secure: true, // implicit TLS  auth: {    user: "api_token",    pass: process.env.CF_API_TOKEN,  },});
const info = await transporter.sendMail({  from: '"Acme" <welcome@yourdomain.com>',  to: "user@example.com",  subject: "Welcome to Acme",  text: "Thanks for signing up.",  html: "<h1>Welcome to Acme</h1><p>Thanks for signing up.</p>",});
console.log("Message sent:", info.messageId);
```

### Send with an attachment

JavaScript

```
const info = await transporter.sendMail({  from: '"Acme Billing" <billing@yourdomain.com>',  to: "customer@example.com",  subject: "Your invoice",  text: "Please find your invoice attached.",  attachments: [    {      filename: "invoice-2026-04.pdf",      path: "./invoices/invoice-2026-04.pdf",      contentType: "application/pdf",    },  ],});
```

Total message size (including base64-encoded attachments) must not exceed 5 MiB. See [Limits](https://developers.cloudflare.com/email-service/platform/limits/).

### Error handling

Nodemailer rejects the promise with an `Error` whose `.responseCode` reflects the SMTP reply code. See [SMTP response codes](https://developers.cloudflare.com/email-service/api/send-emails/smtp/#response-codes) and [Troubleshooting](https://developers.cloudflare.com/email-service/api/send-emails/smtp/#troubleshooting).

JavaScript

```
try {  await transporter.sendMail({    /* ... */  });} catch (err) {  console.error(err.responseCode, err.message);}
```

Uses the standard-library [smtplib ↗](https://docs.python.org/3/library/smtplib.html) (Python 3.8 or later).

### Send an email

Python

```
import osimport smtplibfrom email.message import EmailMessage
msg = EmailMessage()msg["From"] = "Acme <welcome@yourdomain.com>"msg["To"] = "user@example.com"msg["Subject"] = "Welcome to Acme"msg.set_content("Thanks for signing up.")msg.add_alternative(    "<h1>Welcome to Acme</h1><p>Thanks for signing up.</p>",    subtype="html",)
with smtplib.SMTP_SSL("smtp.mx.cloudflare.net", 465) as s:    s.login("api_token", os.environ["CF_API_TOKEN"])    s.send_message(msg)
```

`smtplib.SMTP_SSL` opens an implicit-TLS connection on port `465`, which is what Cloudflare's SMTP endpoint requires. Do not use `smtplib.SMTP` with `starttls()`; `STARTTLS` is not supported.

### Send to multiple recipients

Python

```
msg["To"] = ", ".join([    "user1@example.com",    "user2@example.com",    "user3@example.com",])
```

A single SMTP session can deliver to up to 50 `RCPT TO` addresses. See [Limits](https://developers.cloudflare.com/email-service/platform/limits/).

### Send with an attachment

Python

```
from pathlib import Path
pdf = Path("invoice-2026-04.pdf").read_bytes()msg.add_attachment(    pdf,    maintype="application",    subtype="pdf",    filename="invoice-2026-04.pdf",)
```

### Error handling

`smtplib` raises subclasses of `smtplib.SMTPException` with the SMTP reply code attached. See [SMTP response codes](https://developers.cloudflare.com/email-service/api/send-emails/smtp/#response-codes) and [Troubleshooting](https://developers.cloudflare.com/email-service/api/send-emails/smtp/#troubleshooting).

Python

```
try:    with smtplib.SMTP_SSL("smtp.mx.cloudflare.net", 465) as s:        s.login("api_token", os.environ["CF_API_TOKEN"])        s.send_message(msg)except smtplib.SMTPAuthenticationError as e:    print(f"Auth failed: {e.smtp_code} {e.smtp_error!r}")except smtplib.SMTPResponseException as e:    print(f"SMTP error: {e.smtp_code} {e.smtp_error!r}")
```

### Send an email

```
<?phpuse PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';
$mail = new PHPMailer(true);$mail->isSMTP();$mail->Host       = 'smtp.mx.cloudflare.net';$mail->Port       = 465;$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;$mail->SMTPAuth   = true;$mail->Username   = 'api_token';$mail->Password   = getenv('CF_API_TOKEN');
$mail->setFrom('welcome@yourdomain.com', 'Acme');$mail->addAddress('recipient@example.com');$mail->Subject = 'Welcome to our service!';$mail->Body    = 'Thanks for signing up.';$mail->send();
```

## Next steps

* [SMTP reference](https://developers.cloudflare.com/email-service/api/send-emails/smtp/) — connection details, authentication, response codes, and troubleshooting.
* [Specify recipients](https://developers.cloudflare.com/email-service/examples/email-sending/recipients/) — multiple recipients, CC and BCC, and named addresses.
* [Limits](https://developers.cloudflare.com/email-service/platform/limits/) — account, message, and session limits.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/examples/email-sending/smtp/#page","headline":"Send email over SMTP · Cloudflare Email Service docs","description":"Send transactional emails through Cloudflare Email Service authenticated SMTP from curl, Node.js, Python, or PHP.","url":"https://developers.cloudflare.com/email-service/examples/email-sending/smtp/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/examples/email-sending/","name":"Email sending"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-service/examples/email-sending/smtp/","name":"Send email over SMTP"}}]}
```
