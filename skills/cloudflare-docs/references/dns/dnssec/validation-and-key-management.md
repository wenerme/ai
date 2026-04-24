---
title: Validation and keys
description: DNSSEC key types, rotation, and validation behavior.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/dnssec/validation-and-key-management.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Validation and keys

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/dnssec/","name":"DNSSEC"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/dnssec/validation-and-key-management/","name":"Validation and keys"}}]}
```
