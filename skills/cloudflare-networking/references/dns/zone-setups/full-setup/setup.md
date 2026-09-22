---
description: If you want to use Cloudflare as your primary DNS provider and manage your DNS records, your domain should be using a full setup.
title: Set up a primary zone (Full setup)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up a primary zone (Full setup)

Last updated Jul 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare DNS offers a few different [setup options](https://developers.cloudflare.com/dns/zone-setups/). A primary setup (also known as full) is the most common and the only one available for Free or Pro plans. For details, refer to [About](https://developers.cloudflare.com/dns/zone-setups/full-setup/). For more introductory context, refer to [Concepts](https://developers.cloudflare.com/dns/concepts/).

## Before you begin

Make sure that you:

- Create a Cloudflare account — If you have not already, [sign up for a Cloudflare account](https://developers.cloudflare.com/fundamentals/account/create-account/).
- Own a domain name — You need a registered domain (for example, `example.com`). If you do not have one, you can [register a domain at-cost through Cloudflare Registrar ↗](https://dash.cloudflare.com/?to=/:account/domains/register). Domains purchased through Cloudflare Registrar automatically use Cloudflare for authoritative DNS, so you can skip the rest of this tutorial.

## 1. Add your domain to Cloudflare

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com). [Go to **Domains** ↗](https://dash.cloudflare.com/?to=/:account/domains/overview)
2. Select **Onboard a domain**.
3. Enter your apex domain (for example, `example.com`) and choose how you would like to add your DNS records.
4. Select **Continue** and choose a [plan ↗](https://www.cloudflare.com/plans/#compare-features).

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zone Zone Edit</code>
- <code>Zone DNS Edit</code>

</details>

*Create Zonebash*

```bash
curl "https://api.cloudflare.com/client/v4/zones" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "<YOUR_DOMAIN>",
		"account": {
				"id": "<YOUR_ACCOUNT_ID>"
		}
	}'
```

Note

If Cloudflare is unable to identify your domain as a registered domain, make sure you are using an existing [top-level domain ↗](https://www.cloudflare.com/learning/dns/top-level-domain/) (`.com`, `.net`, `.biz`, or others).

Cloudflare requires your apex domain to be one level below a valid TLD defined in the [Public Suffix List (PSL) ↗](https://github.com/publicsuffix/list/blob/master/public_suffix_list.dat). Enterprise customers can onboard lower-level subdomains using [Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/).

<details>

<summary>

DNS records quick scan

</summary>

Cloudflare can <a href="https://developers.cloudflare.com/dns/zone-setups/reference/dns-quick-scan/">automatically scan for your records</a> and add them to the <a href="https://developers.cloudflare.com/dns/concepts/#zone">DNS zone</a> for you, or you can add records manually. These records show up under your domain on the <a href="https://dash.cloudflare.com/?to=/:account/:zone/dns/records">**DNS Records** ↗</a> page of the dashboard.

Note

If you add a zone via the <a href="https://developers.cloudflare.com/api/resources/zones/methods/create/">API</a>, you can manually invoke the quick scan with the <a href="https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/scan_trigger/">Trigger DNS Records Scan endpoint</a>.

</details>

## 2. Review your DNS records

Your DNS records must be accurate for your domain to work properly. If you don't know what DNS records are, consider the video below for a quick explanation.

Note

If you activate your domain on Cloudflare *without* setting up the correct DNS records for your domain, your visitors may experience [DNS\_PROBE\_FINISHED\_NXDOMAIN](https://developers.cloudflare.com/dns/troubleshooting/dns-probe-finished-nxdomain/) errors.

### Common records

Since the quick scan is not guaranteed to find all existing DNS records, you need to review your records, paying special attention to the following:

- [Zone apex records ( `example.com`)](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/)<details><summary>

  More about zone apex records</summary>

Zone apex refers to the domain or subdomain that you are <a href="https://developers.cloudflare.com/dns/concepts/#zone">adding to Cloudflare</a>.

  Usually, the zone apex record makes your domain accessible by visitors. In this case, the necessary record type (<a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#ip-address-resolution">A, AAAA, or CNAME</a>) and its content will depend on the provider that <a href="https://developers.cloudflare.com/fundamentals/manage-domains/#host-your-domain">hosts</a> your website or application.

  If you are using Cloudflare Workers, refer to <a href="https://developers.cloudflare.com/workers/configuration/routing/custom-domains/">Custom domains</a>.

  If you are using other providers, look for their guidance on how to connect domains managed on external DNS services. Then, make sure you have the records required by your hosting provider on your <a href="https://developers.cloudflare.com/dns/manage-dns-records/#dns-records-table">DNS records table</a> at Cloudflare.</details>

- [Subdomain records ( `www.example.com` or `blog.example.com`)](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/)<details><summary>

  More about subdomain records</summary>

Most subdomains serve a specific purpose within the overall context of your website. For example, <code>blog.example.com</code> might be your blog, <code>support.example.com</code> could be your customer help portal, and <code>store.example.com</code> would be your e-commerce site.

  Even if you do not require specific subdomains, you might want to set up at least a subdomain record on <code>www</code>. It will usually point to the same content as what you have on the apex domain (<code>example.com</code>) or use a <a href="https://developers.cloudflare.com/fundamentals/manage-domains/manage-subdomains/#redirect-a-subdomain-to-the-apex-domain">redirect</a>. Having a subdomain DNS record on <code>www</code> helps guarantee that a visitor who types <code>www.</code> in front of your domain address can still find your website or application.</details>

- [Email records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/)<details><summary>

  More about email records</summary>

Depending on your business needs, you can configure DNS records so that you can use your domain to receive emails, receive and send emails from your domain, or prevent others from sending emails on your behalf (spoofing).

  Below are some examples of what those DNS records might look like. The exact values for your DNS mail records depend on your email provider. If you have issues, review the <a href="https://developers.cloudflare.com/dns/troubleshooting/email-issues/">Troubleshooting</a> and contact your email service provider to confirm your DNS records are correct.

  | Type | Name | Content | Proxy status | TTL |
  | --- | --- | --- | --- | --- |
  | A | <code>mail</code> | <code>192.0.2.1</code> | DNS Only | Auto |
  | MX | <code>example.com</code> | <code>5 john.mx.example-server.test</code> | DNS Only | Auto |
  | TXT | <code>_dmarc</code> | <code>"v=DMARC1; p=reject; sp=...</code> | DNS Only | Auto |
  | TXT | <code>*._domainkey</code> | <code>"v=DKIM1; k=rsa; p=..."</code> | DNS Only | Auto |
  | TXT | <code>example.com</code> | <code>"v=spf1 ip4:..."</code> | DNS Only | Auto |</details>

### Proxy status

Each A, AAAA, and CNAME record has a [proxy status](https://developers.cloudflare.com/dns/proxy-status/) toggle:

- **Proxied** (orange cloud): web traffic goes through the Cloudflare network, which provides caching, DDoS protection, and other security features.
- **DNS only** (gray cloud): Cloudflare returns the DNS record value but does not proxy traffic. Use this for CNAME records that verify your domain for third-party services.

## 3. Change your nameservers

Your domain will be assigned two authoritative Cloudflare nameservers. Nameservers are specialized servers that store your domain's DNS records and "answer" requests from browsers by providing the specific IP address needed to connect to your website.

Caution

If your domain is particularly sensitive to downtime, review our suggestions to [minimize downtime](https://developers.cloudflare.com/fundamentals/performance/minimize-downtime/).

### 3.1. Get nameserver names

Your assigned nameservers are displayed as part of the onboarding flow. If you need to find them once again, go the zone **Overview** page.

[Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/:zone/)

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Trust and Safety Write</code>
- <code>Trust and Safety Read</code>
- <code>Zero Trust: PII Read</code>
- <code>Zaraz Edit</code>
- <code>Zaraz Read</code>
- <code>Zaraz Admin</code>
- <code>Access: Apps and Policies Revoke</code>
- <code>Access: Apps and Policies Write</code>
- <code>Access: Apps and Policies Read</code>
- <code>Access: Apps and Policies Revoke</code>
- <code>Access: Mutual TLS Certificates Write</code>
- <code>Access: Organizations, Identity Providers, and Groups Write</code>
- <code>Zone Settings Write</code>
- <code>Zone Settings Read</code>
- <code>Zone Read</code>
- <code>DNS Read</code>
- <code>Workers Scripts Write</code>
- <code>Workers Scripts Read</code>
- <code>Zone Write</code>
- <code>Workers Routes Write</code>
- <code>Workers Routes Read</code>
- <code>Stream Write</code>
- <code>Stream Read</code>
- <code>SSL and Certificates Write</code>
- <code>SSL and Certificates Read</code>
- <code>Logs Write</code>
- <code>Logs Read</code>
- <code>Cache Purge</code>
- <code>Page Rules Write</code>
- <code>Page Rules Read</code>
- <code>Load Balancers Write</code>
- <code>Load Balancers Read</code>
- <code>Firewall Services Write</code>
- <code>Firewall Services Read</code>
- <code>DNS Write</code>
- <code>Apps Write</code>
- <code>Analytics Read</code>
- <code>Access: Apps and Policies Write</code>
- <code>Access: Apps and Policies Read</code>

</details>

*Zone Detailsbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Note

Cloudflare automatically assigns nameservers to a domain and these assignments cannot be changed. For more details, refer to [Nameserver assignments](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#assignment-method).

### 3.2. Log in to your registrar

Log in to the admin account for your domain registrar. If you do not know your provider, use [ICANN Lookup ↗](https://lookup.icann.org/).

Note

Depending on your use case, you may have to perform this step on the DNS records management of your domain parent zone, or at a domain reseller, instead. Refer to [Nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/#specific-processes) for details.

### 3.3. Turn off DNSSEC

If your domain has [DNSSEC](https://developers.cloudflare.com/dns/dnssec/)<sup>[1](#user-content-fn-1)</sup> active, you must [turn it off](https://developers.cloudflare.com/dns/dnssec/#disable-dnssec) at your registrar before replacing nameservers. Changing nameservers while DNSSEC is active can cause your domain to become unreachable. You can [re-enable DNSSEC through Cloudflare](https://developers.cloudflare.com/dns/dnssec/#enable-dnssec) after your domain is active.

<details>

<summary>

Provider-specific DNSSEC instructions

</summary>

This is not an exhaustive list, but the following links may be helpful:

- <a href="https://support.dnsimple.com/articles/cloudflare-ds-record/">DNSimple ↗</a>
- <a href="https://support.domaindiscount24.com/hc/articles/4409759478161">Domaindiscount24 ↗</a>
- <a href="https://help.dreamhost.com/hc/en-us/articles/219539467">DreamHost ↗</a>
- <a href="https://www.dynadot.com/help/question/set-DNSSEC">Dynadot ↗</a>
- <a href="https://support.enom.com/support/solutions/articles/201000065386">Enom ↗</a>
- <a href="https://docs.gandi.net/en/domain_names/advanced_users/dnssec.html">Gandi ↗</a>
- <a href="https://www.godaddy.com/help/add-a-ds-record-23865">GoDaddy ↗</a>
- <a href="https://www.hostinger.com/support/3667267-how-to-use-dnssec-records-at-hostinger/">Hostinger ↗</a>
- <a href="https://support.hover.com/support/solutions/articles/201000064716">Hover ↗</a>
- <a href="https://faq.infomaniak.com/2187">Infomaniak ↗</a>
- <a href="https://www.inmotionhosting.com/support/edu/cpanel/enable-dnssec-cloudflare/">InMotion Hosting ↗</a>
- <a href="https://kb.inwx.com/en-us/3-nameserver/131">INWX ↗</a>
- <a href="https://joker.com/faq/books/jokercom-faq-en/page/dnssec">Joker.com ↗</a>
- <a href="https://www.name.com/support/articles/205439058-managing-dnssec">Name.com ↗</a>
- <a href="https://www.namecheap.com/support/knowledgebase/article.aspx/9722/2232/managing-dnssec-for-domains-pointed-to-custom-dns/">Namecheap ↗</a>
- <a href="https://support.nameisp.com/knowledgebase/dns">NameISP ↗</a>
- <a href="https://www.namesilo.com/support/v2/articles/domain-manager/ds-records">Namesilo ↗</a>
- <a href="https://help.ovhcloud.com/csm/en-dns-secure-domain-dnssec?id=kb_article_view&amp;sysparm_article=KB0051637">OVH ↗</a>
- <a href="https://support.squarespace.com/hc/articles/4404183898125-Nameservers-and-DNSSEC-for-Squarespace-managed-domains#toc-dnssec">Squarespace ↗</a>
- <a href="https://registro.br/tecnologia/dnssec/?secao=tutoriais-dns">Registro.br ↗</a>
- <a href="https://kb.porkbun.com/article/93-how-to-install-dnssec">Porkbun ↗</a> (do not fill out **keyData**)
- <a href="https://www.transip.eu/knowledgebase/150-secure-domains-custom-nameservers-dnssec/">TransIP ↗</a>

</details>

Note

If your previous provider allows you to add DNSKEY records on the zone apex and use these records in responses to DNS queries, refer to this [migration tutorial](https://developers.cloudflare.com/dns/dnssec/dnssec-active-migration/) to learn how to migrate a zone with DNSSEC enabled.

### 3.4. Update your registrar

1. Remove your existing authoritative nameservers.
2. Add the nameservers provided by Cloudflare. If their names are not **copied exactly**, your DNS will not resolve correctly.

<details>

<summary>

Provider-specific instructions

</summary>

This is not an exhaustive list of provider-specific instructions, but the following links may be helpful:

- <a href="https://www.ionos.com/help/domains/using-your-own-name-servers/using-your-own-name-servers-for-a-domain/">Ionos ↗</a>
- <a href="https://help.101domain.com/kb/managing-name-server-records">101Domain ↗</a>
- <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-name-servers-glue-records.html#domain-name-servers-glue-records-adding-changing">Amazon ↗</a>
- <a href="https://help.blacknight.com/hc/articles/4413036322321-How-do-I-change-the-nameservers-for-my-domain">Blacknight ↗</a>
- <a href="https://www.bluehost.com/help/article/custom-nameservers">BlueHost ↗</a>
- <a href="https://directnic.com/knowledge/article/33:how%2Bdo%2Bi%2Bmodify%2Bname%2Bservers%2Bfor%2Bmy%2Bdomain%2Bname%253F">DirectNIC ↗</a>
- <a href="http://www.dnsmadeeasy.com/support/faq/">DNSMadeEasy ↗</a>
- <a href="https://www.domain.com/help/article/domain-management-how-to-update-nameservers">Domain.com ↗</a>
- <a href="https://www.dotster.com/help/article/domain-management-how-to-update-nameservers">Dotster ↗</a>
- <a href="https://help.dreamhost.com/hc/en-us/articles/360038897151">DreamHost ↗</a>
- <a href="https://kb.easydns.com/knowledge/settingchanging-nameservers/">EasyDNS ↗</a>
- <a href="https://help.enom.com/hc/en-us/articles/115000486451-Nameservers-NS">Enom ↗</a>
- <a href="https://www.fastdomain.com/hosting/help/transfer_client_start">Fast Domain ↗</a>
- <a href="https://billing.flokinet.is/index.php?rp=/knowledgebase/57/Nameserver-and-DNS-records.html">FlokiNET ↗</a>
- <a href="https://docs.gandi.net/en/domain_names/common_operations/changing_nameservers.html">Gandi ↗</a>
- <a href="https://www.godaddy.com/help/change-nameservers-for-your-domain-names-664">GoDaddy ↗</a>
- <a href="https://www.hostgator.com/help/article/changing-name-servers">HostGator ↗</a>
- <a href="https://hostico.ro/docs/setarea-nameserverelor-din-contul-de-client-hostico/">Hostico ↗</a>
- <a href="https://my.hostmonster.com/cgi/help/222">HostMonster ↗</a>
- <a href="https://support.hover.com/support/solutions/articles/201000064742-changing-your-domain-nameservers">Hover ↗</a>
- <a href="https://faq.internetbs.net/hc/en-gb/articles/4516921367837-How-to-update-Nameservers-for-a-domain">Internetdbs ↗</a>
- <a href="https://www.ipage.com/help/article/domain-management-how-to-update-nameservers">iPage ↗</a>
- <a href="https://support.melbourneit.au/docs/how-do-i-manage-my-dns-on-cpanel">MelbourneIT ↗</a>
- <a href="https://support.moniker.com/hc/en-gb/articles/10101271418653-How-to-update-Nameservers-for-a-domain">Moniker ↗</a>
- <a href="https://www.name.com/support/articles/205934457-registering-custom-nameservers">Name.com ↗</a>
- <a href="https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-can-i-change-the-nameservers-for-my-domain">Namecheap ↗</a>
- <a href="https://www.networksolutions.com/manage-it/edit-nameservers.jsp">Network Solutions ↗</a>
- <a href="https://docs.ovh.com/gb/en/domains/web_hosting_general_information_about_dns_servers/#step-2-edit-your-domains-dns-servers">OVH ↗</a>
- <a href="https://kb.porkbun.com/article/22-how-to-change-your-nameservers">Porkbun ↗</a>
- <a href="https://support.rackspace.com/how-to/rackspace-name-servers/">Rackspace ↗</a>
- <a href="https://www.register.com/knowledge">Register ↗</a>
- <a href="https://support.squarespace.com/hc/articles/4404183898125-Nameservers-and-DNSSEC-for-Squarespace-managed-domains#toc-open-the-domain-s-advanced-settings">Squarespace ↗</a>
- <a href="https://kb.site5.com/dns-2/custom-nameservers/">Site5 ↗</a>
- <a href="https://cloud.ibm.com/docs/dns?topic=dns-add-edit-or-delete-custom-name-servers-for-a-domain">Softlayer ↗</a>
- <a href="https://helpcenter.yola.com/hc/articles/360012492660-Changing-your-name-servers">Yola ↗</a>

</details>

To avoid common issues, refer to our [Nameserver replacement checklist](https://developers.cloudflare.com/dns/zone-setups/full-setup/troubleshooting/).

### 3.5. Verify changes

Wait up to 24 hours while your registrar updates your nameservers.

When your domain is **Active**:

- You will receive an email from Cloudflare.
- Your domain will have a [status](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) of **Active** on the **Domains** page of your account.
- Online tools such as [https://www.whatsmydns.net/ ↗](https://www.whatsmydns.net/) will show your Cloudflare-assigned nameservers (most of these tools use cached query results, so it may take longer for them to show the updated nameservers).
- CLI commands will show your Cloudflare-assigned nameservers

```txt
*macOS/Linux*

whois <DOMAIN_NAME>
dig ns <DOMAIN_NAME> @1.1.1.1
dig ns <DOMAIN_NAME> @8.8.8.8
dig <DOMAIN_NAME> +trace

*Windows*

nslookup -type=ns <DOMAIN_NAME> 1.1.1.1
nslookup -type=ns <DOMAIN_NAME> 8.8.8.8
```

Note

If you see unexpected results, refer to our [troubleshooting suggestions](https://developers.cloudflare.com/dns/zone-setups/full-setup/troubleshooting/) and check with your domain registrar. If your zone is stuck in **Pending Nameserver Update**, refer to [Zone stuck in Pending Nameserver Update](https://developers.cloudflare.com/dns/zone-setups/troubleshooting/pending-nameservers/) for how to verify the delegation at the parent zone.

## 4. Re-enable DNSSEC

If you turned off DNSSEC before updating your nameservers, you can now [re-enable DNSSEC through Cloudflare](https://developers.cloudflare.com/dns/dnssec/) to protect your domain from spoofing.

## Footnotes

1. A security feature that protects DNS records from spoofing [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#page","headline":"Set up a primary zone (Full setup)","description":"If you want to use Cloudflare as your primary DNS provider and manage your DNS records, your domain should be using a full setup.","url":"https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
