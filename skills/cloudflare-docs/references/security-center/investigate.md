---
title: Investigate
description: Look up threat intelligence for IPs, domains, URLs, and AS numbers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/security-center/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Investigate

User permission

Investigate is available to all users. Every user can view existing URL scanner reports and initiate new URL scans.

However, advanced intelligence features, including searching for IP and domain intelligence and passive DNS records, are restricted to users with the following roles: Super Admin, Administrator, Brand Protection, Cloudforce One Admin.

Investigate allows you to view a domain’s category, the IP it belongs to, and whether the category has changed before. You can also see which records it points to, including the country of origin and passive DNS records. After searching with Investigate, you will get an API curl to retrieve the same search results.

You can learn more about the IP addresses in your logs by searching via the IP address to view its category and threat data. Enter any IP address, domain name, and hostname to see how it has been categorized from a threat perspective.

Investigate also shows [Web Application Firewall ↗](https://developers.cloudflare.com/waf/) analytics for your websites behind Cloudflare to help you discover what your vulnerabilities are, where attacks come from, and what to do about it.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security-center/","name":"Security Center"}},{"@type":"ListItem","position":3,"item":{"@id":"/security-center/investigate/","name":"Investigate"}}]}
```
