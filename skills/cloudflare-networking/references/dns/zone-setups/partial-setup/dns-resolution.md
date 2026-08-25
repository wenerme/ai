---
description: How DNS resolution works for partial CNAME setups.
title: DNS resolution
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# DNS resolution

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/zone-setups/partial-setup/dns-resolution/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you have a partial zone ([CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)), Cloudflare handles DNS records a bit differently from primary zones (full setup) in order to internally resolve the origin server where proxied HTTP requests are sent to.

## Records within the same zone

When you [create a new DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) in a partial zone, Cloudflare automatically checks whether any of your CNAME records point to existing A, AAAA, or CNAME records within the same zone.

For example, Cloudflare would show a warning if you had the following records in your partial zone:

```txt
sub1.partialzone.com   CNAME   sub2.partialzone.com
sub2.partialzone.com   A       192.0.2.1
```

Since Cloudflare contains both the CNAME and its target, our DNS resolution will send incoming HTTP requests to `sub1.partialzone.com` to the origin `192.0.2.1`.

This can cause issues if you already have DNS records for `sub2.partialzone.com` at your authoritative DNS provider. These records may point to `192.0.2.4`, another IP address, or another domain but - because Cloudflare contains the initial record and the target - it never queries your authoritative DNS provider for the record for `sub2.partialzone.com`.

    flowchart TD
      accTitle: DNS resolution flow with CNAME target in same partial zone
      A[Request to <code>sub1.partialzone.com</code>] --> B[<code>CNAME</code> record for <code>sub1.partialzone.com</code> to <code>sub2.partialzone.com</code>]
      subgraph Cloudflare
        B --> C[<code>A</code> record for <code>sub2.partialzone.com</code> to <code>192.0.2.1</code>]
      end
      C --> D[<code>192.0.2.1</code>]
      subgraph Authoritative DNS
      E[<code>A</code> record for <code>sub2.partialzone.com</code> to <code>192.0.2.4</code>]
      end


When you avoid this situation - meaning you do not have the **target** of the CNAME record within your partial zone - this DNS resolution would happen differently.

    flowchart TD
      accTitle: DNS resolution flow with CNAME target not in partial zone
      A[Request to <code>sub1.partialzone.com</code>] --> B[<code>CNAME</code> record for <code>sub1.partialzone.com</code> to <code>sub2.partialzone.com</code>]
      B --> C[<code>A</code> record for <code>sub2.partialzone.com</code> to <code>192.0.2.4</code>]
      C --> D[<code>192.0.2.4</code>]
      subgraph Cloudflare
        B
      end
      subgraph Authoritative DNS
        C
      end

---

## Records pointing to a partial zone within the same account

You could also [create a CNAME record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) in a zone (partial or full) that points to a record in another partial zone within your account.

In this case, Cloudflare will always resolve the CNAME target based on the value at your authoritative DNS provider of the CNAME target zone.

    flowchart TD
      accTitle: DNS resolution flow with CNAME target in a zone within the same account
      A[Request to <code>www\.alice.com</code>] --> B[<code>CNAME</code> record for <code>www\.alice.com</code> to <code>www\.partialzone.com</code>]
      B --> C[<code>A</code> record for <code>www\.partialzone.com</code> to <code>192.0.2.4</code>]
      C --> D[<code>192.0.2.4</code>]
      subgraph Cloudflare account
        subgraph Cloudflare zone 1
          B
        end
        subgraph Cloudflare zone 2
        E[<code>A</code> record for <code>www\.partialzone.com</code> to <code>203.0.113.1</code>]
        end
      end
      subgraph Authoritative DNS
      C
      end

### Auth DNS points to `cdn.cloudflare.net`

Considering the following scenario:

* The target zone (Cloudflare zone 2 in this example) is a partial zone and the DNS record on the partial zone is proxied.
* The DNS record on the authoritative DNS server points to `cdn.cloudflare.net`

If such setup is in place, the subdomain (`www.partialzone.com` in this example) will resolve to a Cloudflare proxy IP, which will ultimately result in an error. Consider using [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/) and [O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/) setup instead.

    flowchart TD
      accTitle: DNS resolution flow with CNAME target in a zone within the same account and auth DNS pointing to cdn.cloudflare.net
      A[Request to <code>www\.alice.com</code>] --> B[<code>CNAME</code> record for <code>www\.alice.com</code> to <code>www\.partialzone.com</code>]
      B --> C[<code>CNAME</code> record for <code>www\.partialzone.com</code> to <code>www\.partialzone.com.cdn.cloudflare.net</code>]
      C --> D[<code>Cloudflare proxy IP</code>]
      subgraph Cloudflare account
        subgraph Cloudflare zone 1
          B
        end
        subgraph Cloudflare zone 2
        E[Proxied <code>A</code> record for <code>www\.partialzone.com</code> to <code>203.0.113.1</code>]
        end
      end
      subgraph Authoritative DNS
      C
      end

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/partial-setup/dns-resolution/#page","headline":"DNS resolution in partial zones · Cloudflare DNS docs","description":"How DNS resolution works for partial CNAME setups.","url":"https://developers.cloudflare.com/dns/zone-setups/partial-setup/dns-resolution/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
