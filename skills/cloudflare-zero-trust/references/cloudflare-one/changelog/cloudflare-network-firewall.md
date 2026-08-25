---
description: Track updates and changes to Cloudflare One features.
title: Cloudflare Network Firewall
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Network Firewall

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/changelog/cloudflare-network-firewall/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/changelog/rss/cloudflare-network-firewall.xml)

## 2026-07-08


**IP lists, IDS, and SIP rules supported in Unified Routing**

[Cloudflare Advanced Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) IP lists, IDS, and SIP rules are now supported for accounts using [Unified Routing](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#unified-routing-mode-beta) mode. These features require a Cloudflare Advanced Network Firewall subscription.

Support for additional features - Threat Intel Lists, Rate Limiting, and Managed Rulesets - is planned.

For the full list of current beta limitations, refer to [Traffic steering beta limitations](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#beta-limitations).

## 2026-04-21


**Country rules supported in Unified Routing**

[Cloudflare Advanced Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) Country rules are now supported for accounts using [Unified Routing](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#unified-routing-mode-beta) mode. This feature requires a Cloudflare Advanced Network Firewall subscription.

You can create firewall rules that match traffic based on source or destination country to enforce geographic access policies across your network.

This is the first of the Cloudflare Advanced Network Firewall features to become available in Unified Routing. Support for additional features - IP Lists, ASN Lists, Threat Intel Lists, IDS, Rate Limiting, SIP, and Managed Rulesets - is planned.

For the full list of current beta limitations, refer to [Traffic steering beta limitations](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#beta-limitations).

## 2026-02-17


**Cloudflare One Product Name Updates**

We are updating naming related to some of our Networking products to better clarify their place in the Zero Trust and Secure Access Service Edge (SASE) journey.

We are retiring some older brand names in favor of names that describe exactly what the products do within your network. We are doing this to help customers build better, clearer mental models for comprehensive SASE architecture delivered on Cloudflare.

#### What's changing

* **Magic WAN** → **Cloudflare WAN**
* **Magic WAN IPsec** → **Cloudflare IPsec**
* **Magic WAN GRE** → **Cloudflare GRE**
* **Magic WAN Connector** → **Cloudflare One Appliance**
* **Magic Firewall** → **Cloudflare Network Firewall**
* **Magic Network Monitoring** → **Network Flow**
* **Magic Cloud Networking** → **Cloudflare One Multi-cloud Networking**

**No action is required by you** — all functionality, existing configurations, and billing will remain exactly the same.

For more information, visit the [Cloudflare One documentation](https://developers.cloudflare.com/cloudflare-one/).

## 2026-01-15


**Network Services navigation update**

The Network Services menu structure in Cloudflare's dashboard has been updated to reflect solutions and capabilities instead of product names. This will make it easier for you to find what you need and better reflects how our services work together.

Your existing configurations will remain the same, and you will have access to all of the same features and functionality.

The changes visible in your dashboard may vary based on the products you use. Overall, changes relate to [Magic Transit ↗](https://developers.cloudflare.com/magic-transit/), [Magic WAN ↗](https://developers.cloudflare.com/magic-wan/), and [Magic Firewall ↗](https://developers.cloudflare.com/cloudflare-network-firewall/).

**Summary of changes:**

* A new **Overview** page provides access to the most common tasks across Magic Transit and Magic WAN.
* Product names have been removed from top-level navigation.
* Magic Transit and Magic WAN configuration is now organized under **Routes** and **Connectors**. For example, you will find IP Prefixes under **Routes**, and your GRE/IPsec Tunnels under **Connectors.**
* Magic Firewall policies are now called **Firewall Policies.**
* Magic WAN Connectors and Connector On-Ramps are now referenced in the dashboard as **Appliances** and **Appliance profiles.** They can be found under **Connectors > Appliances.**
* Network analytics, network health, and real-time analytics are now available under **Insights.**
* Packet Captures are found under **Insights > Diagnostics.**
* You can manage your Sites from **Insights > Network health.**
* You can find Magic Network Monitoring under **Insights > Network flow**.

If you would like to provide feedback, complete [this form ↗](https://forms.gle/htWyjRsTjw1usdis5). You can also find these details in the January 7, 2026 email titled **\[FYI\] Upcoming Network Services Dashboard Navigation Update**.

Preview: ![Networking Navigation](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=3000,height=1052,format=webp/_astro/networking-overview-and-navigation.CeMgEFaZ.png)

## 2025-03-13


**Cloudflare IP Ranges List**

Magic Firewall now supports a new managed list of Cloudflare IP ranges. This list is available as an option when creating a Magic Firewall policy based on IP source/destination addresses. When selecting "is in list" or "is not in list", the option "**Cloudflare IP Ranges**" will appear in the dropdown menu.

This list is based on the IPs listed in the Cloudflare [IP ranges ↗](https://www.cloudflare.com/en-gb/ips/). Updates to this managed list are applied automatically.

![Cloudflare IPs Managed List](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1102,height=677,format=webp/_astro/cloudflare-ips.DetyOndL.png)

Note: IP Lists require a Cloudflare Advanced Network Firewall subscription. For more details about Cloudflare Network Firewall plans, refer to [Plans](https://developers.cloudflare.com/cloudflare-network-firewall/plans).

## 2024-10-02


**Search for custom rules using rule name and/or ID**

The Magic Firewall dashboard now allows you to search custom rules using the rule name and/or ID.

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to **Analytics & Logs** \> **Network Analytics**.
3. Select **Magic Firewall**.
4. Add a filter for **Rule ID**.
![Search for firewall rules with rule IDs](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1032,height=801,format=webp/_astro/search-with-rule-id.DJgzqgKk.png)

Additionally, the rule ID URL link has been added to Network Analytics.

## 2024-09-12

**New UI improvements**

The dashboard now displays the order number of custom rules, and improved drag and drop functionality. You can also preview rules on a side panel without leaving the current page.

## 2024-08-16

**Cloudflare Network Firewall Analytics Rule Log Enhancement**

Customers who create a rule in a disabled mode will see the rule as **Log (rule disabled)**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/cloudflare-one/changelog/cloudflare-network-firewall/#page","headline":"Cloudflare Network Firewall · Cloudflare One docs","description":"Track updates and changes to Cloudflare One features.","url":"https://developers.cloudflare.com/cloudflare-one/changelog/cloudflare-network-firewall/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
