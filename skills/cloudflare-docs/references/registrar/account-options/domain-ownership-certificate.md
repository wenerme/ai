---
title: Domain ownership certificate
description: Generate a domain ownership certificate (WHOIS ownership letter) for a domain registered with Cloudflare Registrar.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/registrar/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Domain ownership certificate

A domain ownership certificate is a PDF letter that certifies Cloudflare is the registrar of record for your domain and lists the domain's current registration data. You can use it as proof of ownership when a third party (such as a bank, marketplace, or legal entity) requires written confirmation that you control the domain.

The certificate is generated on demand and is automatically populated with your domain's current WHOIS information and the date it was generated. It includes:

* A certification statement confirming that Cloudflare, an ICANN-accredited registrar, is the registrar for the domain.
* **Exhibit A**, containing the domain's registration data:  
   * Creation date and registry expiry date.  
   * Registrant, administrative, technical, and billing contacts.  
   * Name servers.

The contact details shown on the certificate reflect the authoritative contact information Cloudflare has on file, not the redacted values published in public WHOIS. To review or update this information, refer to [Registrant contact updates](https://developers.cloudflare.com/registrar/account-options/domain-contact-updates/).

## Generate a certificate

To download a domain ownership certificate:

1. In the Cloudflare dashboard, go to the **Registrations** page.  
[ Go to **Registrations** ](https://dash.cloudflare.com/?to=/:account/domains/registrations)
2. Find the domain you want a certificate for, and select **Manage**.
3. Select the **Contacts** tab.
4. Select **Download ownership certificate**.

Your browser downloads a PDF named `<domain>_ownership_letter.pdf`.

## Prerequisites and restrictions

You can only generate a certificate when:

* The domain is registered with (sponsored by) Cloudflare Registrar.
* You have permission to view the domain's contact information.
* The domain has registrant contact information on file.

If any of these conditions are not met, the certificate cannot be generated.

Note

Domains that are pending transfer or have not yet completed registration with Cloudflare Registrar are not eligible until the registration is finalized.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/registrar/account-options/domain-ownership-certificate/#page","headline":"Domain ownership certificate · Cloudflare Registrar docs","description":"Generate a domain ownership certificate (WHOIS ownership letter) for a domain registered with Cloudflare Registrar.","url":"https://developers.cloudflare.com/registrar/account-options/domain-ownership-certificate/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/registrar/","name":"Registrar"}},{"@type":"ListItem","position":3,"item":{"@id":"/registrar/account-options/","name":"Registration options"}},{"@type":"ListItem","position":4,"item":{"@id":"/registrar/account-options/domain-ownership-certificate/","name":"Domain ownership certificate"}}]}
```
