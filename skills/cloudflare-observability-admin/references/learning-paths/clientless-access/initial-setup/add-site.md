---
description: Add your domain to Cloudflare DNS.
title: Add a site
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Add a site

Last updated Apr 23, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/add-site/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

In clientless access deployments, users connect to internal applications via public hostnames. You will need to own a domain, add it to Cloudflare, and configure Cloudflare as the [authoritative DNS provider](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#34-update-your-registrar) for that domain. Enterprise customers who cannot change their authoritative DNS provider have the option to configure a [CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/).

You only need to add one domain to Cloudflare, since you can create an infinite number of subdomains to manage all of your private applications.

## Add a site to Cloudflare

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login).
2. Select **Onboard a domain**.
3. Enter your website's apex domain ( `example.com`).
4. Select a [plan ↗](https://www.cloudflare.com/plans/#compare-features) for this website. Everything you need to do with the domain in Cloudflare Zero Trust is available on the **Free** plan.
5. Select **Continue**. Cloudflare will scan your website for any configured DNS records.

Note

If Cloudflare is unable to identify your domain as a registered domain, make sure you are using an existing [top-level domain ↗](https://www.cloudflare.com/learning/dns/top-level-domain/) (`.com`, `.net`, `.biz`, or others).

Additionally, Cloudflare requires your `apex domain` to be one level below a valid TLD defined in the [Public Suffix List (PSL) ↗](https://github.com/publicsuffix/list/blob/master/public_suffix_list.dat).

5. Review your DNS records and select **Continue**.
6. Before your domain can begin using Cloudflare for DNS resolution, you need to [add these nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) at your registrar. Make sure [DNSSEC](https://developers.cloudflare.com/dns/dnssec/) is turned off before proceeding.<details><summary>

   Provider-specific instructions</summary>

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
   - <a href="https://helpcenter.yola.com/hc/articles/360012492660-Changing-your-name-servers">Yola ↗</a></details>

If you cannot change your domain nameservers, you can still use Cloudflare on your website by activating Cloudflare through a [certified hosting partner ↗](https://www.cloudflare.com/en-gb/partners/technology-partners/).
7. (Optional) Follow the **Quick Start Guide** to configure security and performance settings.

Registrars can take up to 24 hours to process nameserver changes. Your domain must be in an **Active** status before you can use it for clientless access.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/add-site/#page","headline":"Add a site","description":"Add your domain to Cloudflare DNS.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/add-site/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
