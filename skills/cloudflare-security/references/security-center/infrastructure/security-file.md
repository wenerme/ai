---
description: Manage your security.txt file via the dashboard or the API.
title: Set up your security.txt file
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security-center/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up your security.txt file

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/security-center/infrastructure/security-file/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can manage your [security.txt ↗](https://en.wikipedia.org/wiki/Security.txt) file via the dashboard or the [API](https://developers.cloudflare.com/api/resources/security%5Ftxt/).

Note

When using the API, the preferred languages field name is `preferred_languages` (snake\_case). For example: `"preferred_languages": "en, de"`.

To manage your security.txt file via the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), select your account and domain.
2. Go to **Security** \> **Settings** and filter by **Web application exploits**.
3. Under **Security.txt** \> **Configurations**, select the edit icon.

From here, you can create and manage your `security.txt` file to provide the security research team with a standardized way to report vulnerabilities.

Fill in the following information:

* **(Required) Contact**: You can enter one of the following to contact you about security issues:

  * An email address: The email address must start with `mailto:` (for example, `mailto:help@example.com`).
  * A phone number: The phone number must start with `tel:` (for example, `tel:+1 1234567890`).
  * A URL link: The URL link must start with `https://` (for example, `https://example.com`).
Select **Add more** to add multiple contacts.
* **(Required) Expires at**: Enter the expiration date and time of the `security.txt` file.
* **Encryption**: A link to a key which security researchers can use to communicate with you.
* **Acknowledgements**: A link to your acknowledgements page.
* **Canonical**: Links to your `security.txt` file.
* **Hiring**: A link to your security-related job openings.
* **Policy**: A link to a policy describing what security researchers should do when searching for or reporting security issues.
* **Preferred languages**: A list of language codes that your security team speaks.

Once you have entered the necessary information, select **Save**.

To edit your security.txt file:

1. Go to **Security** \> **Settings** and filter by **Web application exploits**.
2. Under **Security.txt** \> **Configurations**, select the edit icon.

To download your security.txt file:

1. Go to **Security** \> **Settings** and filter by **Web application exploits**.
2. Under **Security.txt** \> **Configurations**, select the download icon.

To delete your security.txt file:

1. Select **Security** \> **Settings** and filter by **Web application exploits**.
2. Under **Security.txt** \> **Configurations**, select the edit icon.
3. Select **Delete**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security-center/infrastructure/security-file/#page","headline":"Set up your security.txt file · Cloudflare Security Center docs","description":"Manage your security.txt file via the dashboard or the API.","url":"https://developers.cloudflare.com/security-center/infrastructure/security-file/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
