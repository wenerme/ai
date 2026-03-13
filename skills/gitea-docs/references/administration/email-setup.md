---
date: "2019-10-15T10:10:00+05:00"
slug: "email-setup"
sidebar_position: 12
aliases:
  - /en-us/email-setup
---

# Email setup

Gitea has mailer functionality for sending transactional emails (such as registration confirmation). It can be configured to either use Sendmail (or compatible MTAs like Postfix and msmtp) or directly use SMTP server.

:::note
Be sure to set ENABLE_NOTIFY_MAIL=true to allow Gitea to send email notifications. Check the [Config Cheat Sheet](../administration/config-cheat-sheet.md#service-service) for details.
:::

## Using Sendmail

Use `sendmail` command as mailer.

:::note
For use in the official Gitea Docker image, please configure with the SMTP version (see the following section).
:::

:::note
For Internet-facing sites consult documentation of your MTA for instructions to send emails over TLS. Also set up SPF, DMARC, and DKIM DNS records to make emails sent be accepted as legitimate by various email providers.
:::

```ini title="app.ini"
[mailer]
ENABLED       = true
FROM          = gitea@mydomain.com
PROTOCOL      = sendmail
SENDMAIL_PATH = /usr/sbin/sendmail
SENDMAIL_ARGS = "--" ; most "sendmail" programs take options, "--" will prevent an email address being interpreted as an option.
```

## Using SMTP

Directly use SMTP server as relay. This option is useful if you don't want to set up MTA on your instance but you have an account at email provider.

```ini title="app.ini"
[mailer]
ENABLED        = true
FROM           = gitea@mydomain.com
PROTOCOL       = smtps
SMTP_ADDR      = mail.mydomain.com
SMTP_PORT      = 465
USER           = gitea@mydomain.com
PASSWD         = `password`
```

Restart Gitea for the configuration changes to take effect.

To send a test email to validate the settings, go to Gitea > Site Administration > Configuration > Summary -> Mailer Configuration.

For the full list of options check the [Config Cheat Sheet](../administration/config-cheat-sheet.md)

:::note
Authentication is only supported when the SMTP server communication is encrypted with TLS or `HOST=localhost`. TLS encryption can be through:
:::

- STARTTLS (also known as Opportunistic TLS) via port 587 with `PROTOCOL=smtp+starttls`. Initial connection is done over cleartext, but then be upgraded over TLS if the server supports it.
- SMTPS connection (SMTP over TLS) via the default port 465. Connection to the server use TLS from the beginning.
- Forced SMTPS connection with `PROTOCOL=smtps`. (These are both known as Implicit TLS.)
This is due to protections imposed by the Go internal libraries against STRIPTLS attacks.

Note that Implicit TLS is recommended by [RFC8314](https://tools.ietf.org/html/rfc8314#section-3) since 2018.

### Gmail

The following configuration should work with GMail's SMTP server:

```ini title="app.ini"
[mailer]
ENABLED        = true
HOST           = smtp.gmail.com:465 ; Remove this line for Gitea >= 1.18.0
SMTP_ADDR      = smtp.gmail.com
SMTP_PORT      = 465
FROM           = example.user@gmail.com
USER           = example.user
PASSWD         = `***`
PROTOCOL       = smtps
```

Note that you'll need to create and use an [App password](https://support.google.com/accounts/answer/185833?hl=en) by enabling 2FA on your Google
account. You won't be able to use your Google account password directly.

### ProtonMail

This feature is currently only available for select Proton for Business customers and those with Visionary and Family plans with custom domain addresses. See [ProtonMail's SMTP documentation](https://proton.me/support/smtp-submission) for more information. This limitation can be circumvented by using the ProtonMail Bridge application.

Note that emails sent using SMTP are not [end-to-end encrypted](https://proton.me/support/proton-mail-encryption-explained). However, they’re still stored with zero-access encryption like any other emails in your Proton Mail inbox.

The following configuration should work with ProtonMail's SMTP server:

1. In your browser (or desktop application), sign in to your Proton Mail account and select **Settings → All settings → Proton Mail → IMAP/SMTP → SMTP tokens**.
2. Click **Generate token**.
3. Enter the following details to create a new SMTP token:
    - **Token name**: Select a name for your token. This is for your reference only and does not affect the token's functionality.
    - **Email address**: Select one of your active custom domain addresses to pair with your token. Copy this email address and use it for the `FROM` and `USER` configuration in `app.ini`.
4. Click **Generate**.
5. Enter your Proton Mail Account password.

Your SMTP username and SMTP token (password) will be generated. You can now enter them as the `USER` and `PASSWD` in your `app.ini` configuration.

```ini title="app.ini"
[mailer]
ENABLED        = true
FROM           = example.user@customdomain.tld
PROTOCOL       = smtp+starttls
SMTP_ADDR      = smtp.protonmail.ch
SMTP_PORT      = 587
USER           = example.user@customdomain.tld
PASSWD         = `TOKEN`
```

After closing the popup, you will not be able to see this SMTP token (password) again for security reasons. You can always generate more tokens if you need to rotate passwords.

Note: Your Proton Mail login or mailbox passwords will not work with SMTP
