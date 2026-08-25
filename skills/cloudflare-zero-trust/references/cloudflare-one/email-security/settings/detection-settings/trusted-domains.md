---
description: Trusted domains in Email Security.
title: Trusted domains
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Trusted domains

Last updated Aug 12, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/trusted-domains/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Email security allows you to exempt known partner and internal domains from typical detection scanning. Adding trusted domains helps to reduce false positives on malicious, suspicious, and spoof [dispositions](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/). Email security only checks the date when the domain is created.

## How trusted domains work

Trusted domains are not for the email message itself, but for entire domains.

By default, Email security automatically detects lookalike domains. Lookalike domains can be something like this: `thisisdomain.com` and `thisisadomain.com`. Both domains almost look identical.

If an email is received from a domain that looks like a configured domain, this will trigger a detection. Trusted domain is configured to ignore this detection.

In [Additional detections](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/additional-detections/), you can configure malicious domain and suspicious [domain age](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/additional-detections/#configure-domain-age).

Malicious domain age means that someone may create a domain today, similar to a target, and start sending emails with that domain. This is usually how many phish campaigns start. In this case, the domain is usually marked as Malicious. Malicious domain age is usually set to 7 days.

Suspicious domain age means that after 7 days (this number corresponds to the Malicious domain age), a domain may not be malicious, but it can still be suspicious. Email security will mark these domains as Suspicious. It is recommended to configure the **Suspicious domain age** between 30 and 45 days.

To view whether a domain is malicious or suspicious:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Investigation**.
2. Run a screen. For example, select **Run screen** for **Malicious emails**, then select **Run screen**.
3. Under **Your matching messages**, if any message displays **Domain Age** under **Threat types**, that means that the domain age is too low, and therefore the disposition assigned is Malicious. If the domain is legitimate, you can add it as a trusted domain:
  * Go to **Settings** \> **Trusted Domains**.
  * Under **Domain Info**, add the domain, and select **New Domain**. This will mark the domain whose age is low as a trusted domain.

## Configure trusted domains

To configure a trusted domain:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Settings**, go to **Detection settings** \> **Trusted domains**.
4. On the **Detection settings** page, select **Add a domain**.
5. Select the **Input method**: Choose between **Manual input**, and **Upload trusted domain list**:
  * **Manual input**:
    * **Domain info**: Enter a valid domain name.
    * **Domain type**: Select one or both options:
      * **Proximity domain**: Domains with similar spelling to your existing domain.
      * **Recent domain**: Domains created recently.
    * **Notes**: Provide additional information about the trusted domain list.
  * **Upload trusted domain list**: You can upload a file no larger than 150 KB of multiple trusted domains. The file can only contain `Domain`, `Proximity`, `New` and `Notes` fields. The first row must be a header row. Refer to [CSV uploads](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/trusted-domains/#csv-uploads) for an example file.
6. Select **Save**.

### CSV uploads

You can upload a file no larger than 150 KB of multiple trusted domains. The file can only contain `Domain`, `Proximity`, `New` and `Notes` fields. The first row must be a header row.

An example file would look like this:

```txt
Domain, Proximity, New, Notes
mydomain.com, true, true, First Person
testdomain.com, false, true, New Hire
```

## Export trusted domains

To export all trusted domains:

1. On the **Detection settings** page, select **Domain**. Selecting **Domain** will select all trusted domains.
2. Select **Export to CSV**.

To export specific trusted domains:

1. On the **Detection settings** page, select the trusted domains you want to export.
2. Select **Export to CSV**.

## Edit trusted domains

To edit a trusted domain:

1. On the **Detection settings** page, select the trusted domains you want to edit.
2. Select the three dots > Edit.
3. Edit the trusted domain.
4. Select **Save**.

## Delete trusted domains

To delete trusted domains:

1. On the **Detection settings** page, select the trusted domain you want to delete.
2. Select the three dots > **Delete**.
3. On the pop up message, select **Delete**.

To delete multiple trusted domains at once:

1. On the **Detection settings** page, select the trusted domains you want to delete.
2. Select **Action**.
3. Select **Delete**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/trusted-domains/#page","headline":"Trusted domains · Cloudflare One docs","description":"Trusted domains in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/trusted-domains/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
