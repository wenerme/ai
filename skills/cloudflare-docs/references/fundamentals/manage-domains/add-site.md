---
title: Onboard a domain
description: Learn how to onboard your domain to Cloudflare, to speed up and protect your website or application.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/manage-domains/add-site.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Onboard a domain

After you onboard your domain, Cloudflare will act as the [reverse proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-reverse-proxy) and [DNS provider](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-dns-provider) for your site.

This guide applies to existing domains that were purchased from another provider, and will use a [full DNS setup](https://developers.cloudflare.com/dns/zone-setups/full-setup), which is the most common configuration. To set this up, you will have to complete a few steps at Cloudflare, but also update some settings at your domain registrar[1](#user-content-fn-1), and at your previous DNS provider (if you were using one).

Cloudflare Registrar

If you need a new domain, you can [buy one from Cloudflare](https://developers.cloudflare.com/registrar/get-started/register-domain/) without markup fees. We will complete the rest of this setup for you.

## Before you begin

* Log in to your registrar and find its DNS settings. If you do not know who your registrar is, you can use a Whois search, such as [ICANN Lookup ↗](https://lookup.icann.org/).
* Make sure you [turn off DNSSEC](https://developers.cloudflare.com/dns/dnssec/#disable-dnssec) before proceeding. You can [activate DNSSEC through Cloudflare](https://developers.cloudflare.com/dns/dnssec/#enable-dnssec) at the end of the onboarding process, to continue protecting your domain from spoofing.  
Provider-specific DNSSEC instructions  
This is not an exhaustive list, but the following links may be helpful:  
   * [DNSimple ↗](https://support.dnsimple.com/articles/cloudflare-ds-record/)  
   * [Domaindiscount24 ↗](https://support.domaindiscount24.com/hc/articles/4409759478161)  
   * [DreamHost ↗](https://help.dreamhost.com/hc/en-us/articles/219539467)  
   * [Dynadot ↗](https://www.dynadot.com/help/question/set-DNSSEC)  
   * [Enom ↗](https://support.enom.com/support/solutions/articles/201000065386)  
   * [Gandi ↗](https://docs.gandi.net/en/domain%5Fnames/advanced%5Fusers/dnssec.html)  
   * [GoDaddy ↗](https://www.godaddy.com/help/add-a-ds-record-23865)  
   * [Hostinger ↗](https://www.hostinger.com/support/3667267-how-to-use-dnssec-records-at-hostinger/)  
   * [Hover ↗](https://support.hover.com/support/solutions/articles/201000064716)  
   * [Infomaniak ↗](https://faq.infomaniak.com/2187)  
   * [InMotion Hosting ↗](https://www.inmotionhosting.com/support/edu/cpanel/enable-dnssec-cloudflare/)  
   * [INWX ↗](https://kb.inwx.com/en-us/3-nameserver/131)  
   * [Joker.com ↗](https://joker.com/faq/books/jokercom-faq-en/page/dnssec)  
   * [Name.com ↗](https://www.name.com/support/articles/205439058-managing-dnssec)  
   * [Namecheap ↗](https://www.namecheap.com/support/knowledgebase/article.aspx/9722/2232/managing-dnssec-for-domains-pointed-to-custom-dns/)  
   * [NameISP ↗](https://support.nameisp.com/knowledgebase/dns)  
   * [Namesilo ↗](https://www.namesilo.com/support/v2/articles/domain-manager/ds-records)  
   * [OVH ↗](https://help.ovhcloud.com/csm/en-dns-secure-domain-dnssec?id=kb%5Farticle%5Fview&sysparm%5Farticle=KB0051637)  
   * [Squarespace ↗](https://support.squarespace.com/hc/articles/4404183898125-Nameservers-and-DNSSEC-for-Squarespace-managed-domains#toc-dnssec)  
   * [Registro.br ↗](https://registro.br/tecnologia/dnssec/?secao=tutoriais-dns)  
   * [Porkbun ↗](https://kb.porkbun.com/article/93-how-to-install-dnssec) (do not fill out **keyData**)  
   * [TransIP ↗](https://www.transip.eu/knowledgebase/150-secure-domains-custom-nameservers-dnssec/)

Note

If you purchased your domain through Cloudflare Registrar, [ICANN ↗](https://www.icann.org/) requires you to verify your registrant email address. If your email is unverified or if the verification has expired, ICANN places a hold on the domain and replaces your nameservers with parking server nameservers (NS). Once you complete verification, your nameservers are automatically restored.

## 1\. Onboard a domain in Cloudflare

1. Log in to the Cloudflare dashboard.  
[ Go to **Domains** ](https://dash.cloudflare.com/?to=/:account/domains/overview)
2. Select **Onboard a domain**.
3. Enter your website's apex domain (for example, `example.com`), choose how you would like to add your [DNS records](https://developers.cloudflare.com/dns/manage-dns-records/), and select **Continue**.  
Note  
If Cloudflare is unable to identify your domain as a registered domain, make sure you are using an existing [top-level domain ↗](https://www.cloudflare.com/learning/dns/top-level-domain/) (`.com`, `.net`, `.biz`, or others).  
Cloudflare requires your apex domain to be one level below a valid TLD defined in the [Public Suffix List (PSL) ↗](https://github.com/publicsuffix/list/blob/master/public%5Fsuffix%5Flist.dat). For instance, `example.com` is valid but `level2.example.com`[2](#user-content-fn-2) or `example.home` are not.
4. Select a [plan ↗](https://www.cloudflare.com/plans/#compare-features).
5. Review your DNS records to ensure none are missing. Your DNS records must be accurate for your domain to work properly. You can do this by comparing the list of records in Cloudflare to the list of records at your previous provider.  
Cloudflare can [automatically scan for your records](https://developers.cloudflare.com/dns/zone-setups/reference/dns-quick-scan/) and add them to the [DNS zone](https://developers.cloudflare.com/dns/concepts/#zone) for you, or you can add records manually. These records show up under your domain on the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page of the dashboard.  
    
   1. Since the quick scan is not guaranteed to find all existing DNS records, you need to review your records, paying special attention to the following:  
         * [Zone apex records (example.com)](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/)  
         More about zone apex records  
         Zone apex refers to the domain or subdomain that you are [adding to Cloudflare](https://developers.cloudflare.com/dns/concepts/#zone).  
         Usually, the zone apex record makes your domain accessible by visitors. In this case, the necessary record type ([A, AAAA, or CNAME](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#ip-address-resolution)) and its content will depend on the provider that [hosts](https://developers.cloudflare.com/fundamentals/manage-domains/#host-your-domain) your website or application.  
         If you are using Cloudflare Pages, refer to [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).  
         If you are using other providers, look for their guidance on how to connect domains managed on external DNS services. Then, make sure you have the records required by your hosting provider on your [DNS records table](https://developers.cloudflare.com/dns/manage-dns-records/#dns-records-table) at Cloudflare.  
         * [Subdomain records (www.example.com or blog.example.com)](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/)  
         More about subdomain records  
         Most subdomains serve a specific purpose within the overall context of your website. For example, `blog.example.com` might be your blog, `support.example.com` could be your customer help portal, and `store.example.com` would be your e-commerce site.  
         Even if you do not require specific subdomains, you might want to set up at least a subdomain record on `www`. It will usually point to the same content as what you have on the apex domain (`example.com`) or use a [redirect](https://developers.cloudflare.com/fundamentals/manage-domains/manage-subdomains/#redirect-a-subdomain-to-the-apex-domain). Having a subdomain DNS record on `www` helps guarantee that a visitor who types `www.` in front of your domain address can still find your website or application.  
         * [Email records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/)  
         More about email records  
         Depending on your business needs, you can configure DNS records so that you can use your domain to receive emails, receive and send emails from your domain, or prevent others from sending emails on your behalf (spoofing).  
         Below are some examples of what those DNS records might look like. The exact values for your DNS mail records depend on your email provider. If you have issues, review the [Troubleshooting](https://developers.cloudflare.com/dns/troubleshooting/email-issues/) and contact your email service provider to confirm your DNS records are correct.  
         | Type | Name           | Content                       | Proxy status | TTL  |  
         | ---- | -------------- | ----------------------------- | ------------ | ---- |  
         | A    | mail           | 192.0.2.1                     | DNS Only     | Auto |  
         | MX   | example.com    | 5 john.mx.example-server.test | DNS Only     | Auto |  
         | TXT  | \_dmarc        | "v=DMARC1; p=reject; sp=...   | DNS Only     | Auto |  
         | TXT  | \*.\_domainkey | "v=DKIM1; k=rsa; p=..."       | DNS Only     | Auto |  
         | TXT  | example.com    | "v=spf1 ip4:..."              | DNS Only     | Auto |  
   Note  
   If you activate your domain on Cloudflare _without_ setting up the correct DNS records for your domain and subdomain, your visitors may experience [DNS\_PROBE\_FINISHED\_NXDOMAIN](https://developers.cloudflare.com/dns/troubleshooting/dns-probe-finished-nxdomain/) errors.  
   2. If you find any missing records, [manually add](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) those records.  
   3. Depending on your site setup, you may want to adjust the [proxy status](https://developers.cloudflare.com/dns/proxy-status/) for certain `A`, `AAAA`, or `CNAME` records.  
   Review CNAME records  
   In general, CNAME records being used to verify your domain for third-party services should not be proxied. For details, refer to [Proxied CNAME records](https://developers.cloudflare.com/dns/proxy-status/#cname-records).  
   4. Select **Continue**.

## 2\. Update nameservers

Warning

If your domain is particularly sensitive to downtime, review our suggestions to [minimize downtime](https://developers.cloudflare.com/fundamentals/performance/minimize-downtime/).

Your domain will be assigned two authoritative Cloudflare nameservers. Nameservers are specialized servers that store your domain's DNS records and "answer" requests from browsers by providing the specific IP address needed to connect to your website.

Before your domain can begin using Cloudflare for DNS resolution, you need to [add these nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) at your registrar. DNSSEC should still be **disabled** at this point.

Provider-specific instructions

This is not an exhaustive list of provider-specific instructions, but the following links may be helpful:

* [Ionos ↗](https://www.ionos.com/help/domains/using-your-own-name-servers/using-your-own-name-servers-for-a-domain/)
* [101Domain ↗](https://help.101domain.com/kb/managing-name-server-records)
* [Amazon ↗](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-name-servers-glue-records.html#domain-name-servers-glue-records-adding-changing)
* [Blacknight ↗](https://help.blacknight.com/hc/articles/4413036322321-How-do-I-change-the-nameservers-for-my-domain)
* [BlueHost ↗](https://www.bluehost.com/help/article/custom-nameservers)
* [DirectNIC ↗](https://directnic.com/knowledge/article/33:how%2Bdo%2Bi%2Bmodify%2Bname%2Bservers%2Bfor%2Bmy%2Bdomain%2Bname%253F)
* [DNSMadeEasy ↗](http://www.dnsmadeeasy.com/support/faq/)
* [Domain.com ↗](https://www.domain.com/help/article/domain-management-how-to-update-nameservers)
* [Dotster ↗](https://www.dotster.com/help/article/domain-management-how-to-update-nameservers)
* [DreamHost ↗](https://help.dreamhost.com/hc/en-us/articles/360038897151)
* [EasyDNS ↗](https://kb.easydns.com/knowledge/settingchanging-nameservers/)
* [Enom ↗](https://help.enom.com/hc/en-us/articles/115000486451-Nameservers-NS)
* [Fast Domain ↗](https://www.fastdomain.com/hosting/help/transfer%5Fclient%5Fstart)
* [FlokiNET ↗](https://billing.flokinet.is/index.php?rp=/knowledgebase/57/Nameserver-and-DNS-records.html)
* [Gandi ↗](https://docs.gandi.net/en/domain%5Fnames/common%5Foperations/changing%5Fnameservers.html)
* [GoDaddy ↗](https://www.godaddy.com/help/change-nameservers-for-your-domain-names-664)
* [HostGator ↗](https://www.hostgator.com/help/article/changing-name-servers)
* [Hostico ↗](https://hostico.ro/docs/setarea-nameserverelor-din-contul-de-client-hostico/)
* [HostMonster ↗](https://my.hostmonster.com/cgi/help/222)
* [Hover ↗](https://support.hover.com/support/solutions/articles/201000064742-changing-your-domain-nameservers)
* [Internetdbs ↗](https://faq.internetbs.net/hc/en-gb/articles/4516921367837-How-to-update-Nameservers-for-a-domain)
* [iPage ↗](https://www.ipage.com/help/article/domain-management-how-to-update-nameservers)
* [MelbourneIT ↗](https://support.melbourneit.au/docs/how-do-i-manage-my-dns-on-cpanel)
* [Moniker ↗](https://support.moniker.com/hc/en-gb/articles/10101271418653-How-to-update-Nameservers-for-a-domain)
* [Name.com ↗](https://www.name.com/support/articles/205934457-registering-custom-nameservers)
* [Namecheap ↗](https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-can-i-change-the-nameservers-for-my-domain)
* [Network Solutions ↗](https://www.networksolutions.com/manage-it/edit-nameservers.jsp)
* [OVH ↗](https://docs.ovh.com/gb/en/domains/web%5Fhosting%5Fgeneral%5Finformation%5Fabout%5Fdns%5Fservers/#step-2-edit-your-domains-dns-servers)
* [Porkbun ↗](https://kb.porkbun.com/article/22-how-to-change-your-nameservers)
* [Rackspace ↗](https://support.rackspace.com/how-to/rackspace-name-servers/)
* [Register ↗](https://www.register.com/knowledge)
* [Squarespace ↗](https://support.squarespace.com/hc/articles/4404183898125-Nameservers-and-DNSSEC-for-Squarespace-managed-domains#toc-open-the-domain-s-advanced-settings)
* [Site5 ↗](https://kb.site5.com/dns-2/custom-nameservers/)
* [Softlayer ↗](https://cloud.ibm.com/docs/dns?topic=dns-add-edit-or-delete-custom-name-servers-for-a-domain)
* [Yola ↗](https://helpcenter.yola.com/hc/articles/360012492660-Changing-your-name-servers)

If you cannot change your domain nameservers, you can still use Cloudflare on your website by activating Cloudflare through a [certified hosting partner ↗](https://www.cloudflare.com/en-gb/partners/technology-partners/).

## 3\. Complete SSL/TLS setup

To prevent insecure connections and visitor browser errors, review your [SSL/TLS certificates](https://developers.cloudflare.com/ssl/get-started/). Many Cloudflare services will automatically protect and speed up your web traffic after your nameservers are updated and your DNS records are proxied. For further guidance, refer to [Proxy status](https://developers.cloudflare.com/dns/proxy-status/).

If you encounter unexpected results when changing your nameservers, refer to the [DNS Full Setup troubleshooting](https://developers.cloudflare.com/dns/zone-setups/full-setup/troubleshooting/).

## Other setup options

* To use Cloudflare as a reverse proxy but maintain your DNS provider, refer to [partial setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/).
* To use one or more DNS providers, refer to [DNS Zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/).
* Enterprise customers can onboard lower-level subdomains using [Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/).

## Footnotes

1. The provider you purchased your domain from. [↩](#user-content-fnref-1)
2. Enterprise customers can onboard these using [Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/). [↩](#user-content-fnref-2)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/manage-domains/","name":"Domains"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/manage-domains/add-site/","name":"Onboard a domain"}}]}
```
