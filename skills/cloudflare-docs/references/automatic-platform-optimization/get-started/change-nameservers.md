---
title: Change nameservers
description: Update your domain nameservers to Cloudflare for APO to work.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/automatic-platform-optimization/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Change nameservers

After you [confirm your DNS records](https://developers.cloudflare.com/automatic-platform-optimization/get-started/confirm-dns-records/), change your nameservers.

Updating your domain to use Cloudflare's nameservers is a critical step to ensure Cloudflare can optimize and protect your site. Nameservers are your primary DNS controller and identify the location of your domain on the Internet.

Domain registrars can take up to 24 hours to process the nameserver updates. You will receive an email from Cloudflare once your site is activated.

## Lookup domain name registration

1. Visit [WHOIS ↗](https://lookup.icann.org/) to look up your domain name registration.
2. In the text field, enter your domain name without `https://www.` and select **Lookup**.
3. From **Domain Information**, make note of the nameserver information that displays. You will update those nameservers to point to Cloudflare.

We recommend keeping this browser tab or window open and opening a new tab or window for the next section.

## Update your nameserver with your domain registrar

1. Log in to the administrator account for your domain registrar.
2. Navigate to DNS Management.
3. Locate your nameserver information. Your nameservers should match the information from Step 3 of Lookup domain name registration.
4. Replace the existing nameserver information with the Cloudflare nameservers from Step 4 of Create the custom nameserver with Cloudflare.

Note

You may be prompted to confirm the nameserver change with your domain registrar. Confirm or continue after making the update.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/automatic-platform-optimization/","name":"Automatic Platform Optimization"}},{"@type":"ListItem","position":3,"item":{"@id":"/automatic-platform-optimization/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/automatic-platform-optimization/get-started/change-nameservers/","name":"Change nameservers"}}]}
```
