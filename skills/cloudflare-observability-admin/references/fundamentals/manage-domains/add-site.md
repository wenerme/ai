---
description: Learn how to onboard your domain to Cloudflare, to speed up and protect your website or application.
title: Onboard a domain
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Onboard a domain

Last updated May 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

After you onboard your domain, Cloudflare will act as the [reverse proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-reverse-proxy) and [DNS provider](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-dns-provider) for your site.

This guide applies to existing domains that were purchased from another provider, and will use a [full DNS setup](https://developers.cloudflare.com/dns/zone-setups/full-setup), which is the most common configuration. To set this up, you will have to complete a few steps at Cloudflare, but also update some settings at your domain registrar<sup>[1](#user-content-fn-1)</sup>, and at your previous DNS provider (if you were using one).

Cloudflare Registrar

If you need a new domain, you can [buy one from Cloudflare](https://developers.cloudflare.com/registrar/get-started/register-domain/) without markup fees. We will complete the rest of this setup for you.

## 1. Add your domain

1. Log in to the Cloudflare dashboard. [Go to **Domains** ↗](https://dash.cloudflare.com/?to=/:account/domains/overview)
2. Select **Onboard a domain**.
3. Enter your website's apex domain (for example, `example.com`), choose how you would like to add your DNS records, and select **Continue**.

   Note

   If Cloudflare is unable to identify your domain as a registered domain, make sure you are using an existing [top-level domain ↗](https://www.cloudflare.com/learning/dns/top-level-domain/) ( `.com`, `.net`, `.biz`, or others).

   Cloudflare requires your apex domain to be one level below a valid TLD defined in the [Public Suffix List (PSL) ↗](https://github.com/publicsuffix/list/blob/master/public_suffix_list.dat). For instance, `example.com` is valid but `level2.example.com`<sup>[2](#user-content-fn-2)</sup> or `example.home` are not.
4. Select a [plan ↗](https://www.cloudflare.com/plans/#compare-features).

## 2. Review DNS records

Your DNS records must be accurate for your domain to work properly. If you don't know what DNS records are, consider the video below for a quick explanation.

1. Since the quick scan is not guaranteed to find all existing DNS records, you need to review your records, paying special attention to the following:
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

Note

   If you activate your domain on Cloudflare *without* setting up the correct DNS records for your domain, your visitors may experience [DNS\_PROBE\_FINISHED\_NXDOMAIN](https://developers.cloudflare.com/dns/troubleshooting/dns-probe-finished-nxdomain/) errors.
2. If you find any missing records, [manually add](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) those records.
3. Depending on your site setup, you may want to adjust the [proxy status](https://developers.cloudflare.com/dns/proxy-status/) for certain `A`, `AAAA`, or `CNAME` records. Each record has a proxy status toggle:
   - **Proxied** (orange cloud): web traffic goes through the Cloudflare network, which provides caching, DDoS protection, and other security features.
   - **DNS only** (gray cloud): Cloudflare returns the DNS record value but does not proxy traffic. Use this for CNAME records that verify your domain for third-party services.
4. Select **Continue**.

## 3. Update nameservers

Your domain will be assigned two authoritative Cloudflare nameservers. Nameservers are specialized servers that store your domain's DNS records and "answer" requests from browsers by providing the specific IP address needed to connect to your website.

Usually, you need to add these nameservers at your registrar. Refer to [Update nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) for more information.

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

DNSSEC

If your domain uses [DNSSEC](https://developers.cloudflare.com/dns/dnssec/), you must turn it off at your registrar before changing nameservers. Changing nameservers while DNSSEC is active can cause your domain to become unreachable. You can [re-enable DNSSEC through Cloudflare](https://developers.cloudflare.com/dns/dnssec/#enable-dnssec) after your domain is active.

## 4. Complete SSL/TLS setup

To prevent insecure connections and visitor browser errors, review your [SSL/TLS certificates](https://developers.cloudflare.com/ssl/get-started/). Many Cloudflare services will automatically protect and speed up your web traffic after your nameservers are updated and your DNS records are proxied. For further guidance, refer to [Proxy status](https://developers.cloudflare.com/dns/proxy-status/).

If you encounter unexpected results when changing your nameservers, refer to the [DNS Full Setup troubleshooting](https://developers.cloudflare.com/dns/zone-setups/full-setup/troubleshooting/).

## Further options

### Other DNS setups

- To use Cloudflare as a reverse proxy but maintain your DNS provider, refer to [partial setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/).
- To use one or more DNS providers, refer to [DNS Zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/).
- Enterprise customers can onboard lower-level subdomains using [Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/).

### Minimize downtime

- If your domain is particularly sensitive to downtime, review our suggestions to [minimize downtime](https://developers.cloudflare.com/fundamentals/performance/minimize-downtime/).

## Footnotes

1. The provider you purchased your domain from [↩](#user-content-fnref-1)
2. Enterprise customers can onboard these using [Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/). [↩](#user-content-fnref-2)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/manage-domains/add-site/#page","headline":"Onboard a domain","description":"Learn how to onboard your domain to Cloudflare, to speed up and protect your website or application.","url":"https://developers.cloudflare.com/fundamentals/manage-domains/add-site/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
