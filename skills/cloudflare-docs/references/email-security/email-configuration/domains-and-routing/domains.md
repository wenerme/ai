---
title: Domains
description: Email security works through a system of domain-based routing, where Cloudflare receives and evaluates incoming email from a domain.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/domains-and-routing/domains.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Domains

Email security works through a system of domain-based routing, where Cloudflare receives and evaluates incoming email from a domain.

## Create a domain

To create a new domain in Email security:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** \> **Domains & Routing** \> **Domains**.
4. Select **New Domain**.
5. Enter the following information:  
   * **Domain**: The domain name receiving email traffic.  
   * **Configured As**: Choose **MX Records** or specify a number of **Hops** (depending on your email architecture).  
   * **Forwarding To**: Enter the hostname of your email provider.  
   * **IP Restrictions** (optional): Restrict incoming traffic to the IP addresses of your mail servers.  
   * **Inbound TLS** (only available for non-MX domains): Applies TLS to incoming traffic.  
   * **Outbound TLS**: Choose between **Forward all messages over TLS** (recommended) or **Forward all messages using opportunistic TLS**.  
   * **Quarantine Policy**: Choose the [dispositions](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/) you want to send to [Admin quarantine](https://developers.cloudflare.com/email-security/email-configuration/admin-quarantine/).
6. Select **Publish Domain**.

---

## Edit a domain

To edit an existing domain:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** \> **Domains & Routing** \> **Domains**.
4. On a specific domain, select **...** \> **Edit**.
5. Make changes as needed.
6. Select **Update Domain**.

---

## Delete a domain

To delete a domain:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** \> **Domains & Routing** \> **Domains**.
4. On a specific domain, select **...** \> **Delete**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/domains-and-routing/","name":"Domains and routing"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/domains-and-routing/domains/","name":"Domains"}}]}
```
