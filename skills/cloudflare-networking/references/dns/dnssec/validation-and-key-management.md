---
description: DNSSEC key types, rotation, and validation behavior.
title: Validation and keys
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Validation and keys

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/dnssec/validation-and-key-management/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Refer to the sections below for an overview of some technical concepts and how they apply to Cloudflare DNSSEC. For broader content on DNSSEC, refer to [How DNSSEC works ↗](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/).

## Chain of trust

DNSSEC validation follows a chain of trust from the root DNS servers to your zone:

1. A resolver queries your parent registry (for example, `.com`) for your DS record.
2. The DS record contains a hash of your Key Signing Key (KSK).
3. The resolver expects all Zone Signing Keys (ZSK) to be signed by that specific KSK.
4. If Cloudflare uses a different KSK, validation fails when resolvers query Cloudflare nameservers.

This is why you cannot simply keep your existing DS record when migrating to Cloudflare. The cryptographic chain of trust requires either:

* [Disabling DNSSEC](https://developers.cloudflare.com/dns/dnssec/) before migration and re-enabling it on Cloudflare
* Using the [multi-signer DNSSEC](https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/about/) approach to coordinate keys between providers.

---

## Automatic DS record updates

When you enable DNSSEC, Cloudflare automatically publishes **CDS** (Child Delegation Signer) and **CDNSKEY** (Child DNSKEY) records in your zone. These records automate the chain of trust management between your domain and the Top-Level Domain registry.

| Record      | Purpose                | Contents                                                                           |
| ----------- | ---------------------- | ---------------------------------------------------------------------------------- |
| **CDS**     | High-level instruction | A hashed version of the public key (same data as a DS record)                      |
| **CDNSKEY** | Public key instruction | The full public Key Signing Key (KSK) for the parent to generate its own DS record |

Registrars that support [RFC 8078 ↗](https://www.rfc-editor.org/rfc/rfc8078.html) periodically scan your domain for these records and automatically update the DS record at the registry level. This eliminates manual DS record management and ensures seamless key rollovers.

Note

Not all registrars support automatic CDS/CDNSKEY scanning. If your registrar does not support RFC 8078, you must manually add the DS record.

---

## DNSKEY flags

* **ZSKs (Zone Signing Keys)**: flag `256`
* **KSKs (Key Signing Keys)**: flag `257`

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/dnssec/validation-and-key-management/#page","headline":"Validation and keys · Cloudflare DNS docs","description":"DNSSEC key types, rotation, and validation behavior.","url":"https://developers.cloudflare.com/dns/dnssec/validation-and-key-management/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
