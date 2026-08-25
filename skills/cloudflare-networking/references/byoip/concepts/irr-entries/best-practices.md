---
description: Create and maintain IRR entries for your IP prefixes.
title: Manage IRR entries
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage IRR entries

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/byoip/concepts/irr-entries/best-practices/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You must keep your [Internet Routing Registry (IRR)](https://developers.cloudflare.com/byoip/concepts/irr-entries/) entries up to date so that it is public information that Cloudflare has permission to advertise your prefix or prefixes, and to ensure that your traffic can be properly routed on the Internet.

## Configure an IRR entry

You can add or update an IRR entry by following the directions of your routing registry. Each routing registry has its own set of instructions to configure an IRR entry.

The recommended registries are AFRINIC, APNIC, ARIN, LACNIC, and RIPE. Refer to the table below for more information.

| Route registry | URL                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AFRINIC        | [https://afrinic.net/internet-routing-registry#guide ↗](https://afrinic.net/internet-routing-registry#guide)                                                                               |
| APNIC          | [https://www.apnic.net/manage-ip/apnic-services/routing-registry/ ↗](https://www.apnic.net/manage-ip/apnic-services/routing-registry/)                                                     |
| ARIN           | [https://www.arin.net/resources/manage/irr/quickstart/ ↗](https://www.arin.net/resources/manage/irr/quickstart/)                                                                           |
| LACNIC         | [https://lacnic.zendesk.com/hc/articles/360038667154-What-are-a-route-and-a-route-6-objects ↗](https://lacnic.zendesk.com/hc/articles/360038667154-What-are-a-route-and-a-route-6-objects) |
| RIPE           | [https://www.ripe.net/manage-ips-and-asns/db/support/managing-route-objects-in-the-irr ↗](https://www.ripe.net/manage-ips-and-asns/db/support/managing-route-objects-in-the-irr)           |

## Verify an IRR entry

Verify your Internet Routing Registry (IRR) entries to ensure that the IP prefixes Cloudflare advertises for you match the correct autonomous system numbers (ASNs).

Each IRR entry record must include the following information:

* **Route**: Each IP prefix Cloudflare advertises for you.
* **Origin ASN**: The Cloudflare ASN (AS13335) or your own ASN.
* **Source**: The name of the routing registry (for example, ARIN).

Add or update IRR entries when they meet any of these criteria:

* The entry is missing.
* The entry is incomplete or inaccurate — for example, when the route object does not show the correct origin.
* The entry is complete but requires updating — for example, when they correspond to supernets but need to correspond to subnets used in Magic Transit.

### Subnet prefix verification

Use [IRR Explorer ↗](https://irrexplorer.nlnog.net) to verify which ASN is associated with a subnet prefix.

**Method:** Search for the subnet prefix IP, for example, `162.211.156.0/24`.

**Output:** List of ASN numbers, source (route registry), and any associated errors.

### ASN verification

Use [IRR Explorer ↗](https://irrexplorer.nlnog.net) to verify which prefixes are associated with an ASN.

**Method:** Search for the ASN, for example `AS13335`.

**Output:** List of prefixes, source, and any associated errors.

### WHOIS lookup

Use WHOIS lookup to verify your origin ASN and routing data.

**Method:** In a terminal, use the following `whois` command, replacing `<NETWORK_PREFIX>` with your network prefix. The host `rr.ntt.net` is the primary server for the Global IP network.

```sh
whois -h rr.ntt.net <NETWORK_PREFIX>
```

**Output:** IRR route, origin, and source information.

WHOIS output example

The `<IRR entry section>` in the WHOIS output shows the correct IRR entry information for the specified network. In this example, the network prefix is `1.1.1.0/24`, and the output includes the route, origin ASN, and route registry, which in this example is APNIC:

```txt
user@xxt32z conduit-qs-config % whois -h rr.ntt.net 1.1.1.0/24
route:          1.1.1.0/24
<RPKI section>
descr:          RPKI ROA for 1.1.1.0/24
remarks:        This route object represents routing data retrieved from the RPKI
remarks:        The original data can be found here: https://rpki.gin.ntt.net/r/AS13335/1.1.1.0/24
remarks:        This route object is the result of an automated RPKI-to-IRR conversion process.
remarks:        maxLength 24
origin:         AS13335
mnt-by:         MAINT-NTTCOM-RPKI
changed:        job@ntt.net 20200913
source:         RPKI  # Trust Anchor: apnic

<IRR entry section>
route:          1.1.1.0/24
origin:         AS13335
descr:          APNIC Research and Development
                6 Cordelia St
mnt-by:         MAINT-AU-APNIC-GM85-AP
last-modified:  2018-03-16T16:58:06Z
source:         APNIC
```

Note

WHOIS output also shows the RPKI entry information for prefix IP addresses. When your WHOIS output only contains an RPKI entry, you must add the IRR entry.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/byoip/concepts/irr-entries/best-practices/#page","headline":"Manage IRR entries · Cloudflare BYOIP docs","description":"Create and maintain IRR entries for your IP prefixes.","url":"https://developers.cloudflare.com/byoip/concepts/irr-entries/best-practices/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
