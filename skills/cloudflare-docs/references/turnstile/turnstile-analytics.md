---
title: Turnstile Analytics
description: Use Turnstile Analytics to view the number of challenges issued, the challenge solve rate, and the metrics of issued challenges.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/turnstile/turnstile-analytics/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Turnstile Analytics

Turnstile Analytics provides you with a view of the top widget statistics across different metadata dimensions to understand where your traffic is coming from, which environments have the highest challenge activity, and whether certain sources are disproportionately failing or bypassing challenges, allowing you to fine-tune your security settings, apply more granular mitigations, and proactively respond to evolving threats.

## Available statistics

* **Top Hostnames**: If the Turnstile widget is placed across multiple hostnames, this will display the highest traffic hostnames where challenges are being issued.
* **Top Browsers**: A breakdown of browsers that are most commonly encountering Turnstile challenges, helping customers spot trends in visitor traffic.
* **Top Countries**: View the top originating countries for visitors completing challenges, which can help identify regional traffic anomalies.
* **Top User Agents**: Identify which user agents are generating the most Turnstile challenge requests.
* [**Top ASNs** ↗](https://cloudflare.com/learning/network-layer/what-is-an-autonomous-system): Displays the highest volume of challenges issued from specific Autonomous System Numbers (ASNs), helping customers detect potential bot activity.
* **Top Operating Systems**: Shows which operating systems are most common among visitors passing or failing challenges.
* [**Top Source IPs** ↗](https://cloudflare.com/learning/ddos/glossary/ip-spoofing): Identify the highest-volume IP addresses issuing Turnstile challenges, which can be useful in identifying attack sources or repeated challenge failures.

## View widget metrics

To see an overview of your widget analytics:

[ Go to **Turnstile** ](https://dash.cloudflare.com/?to=/:account/turnstile) ![Turnstile Analytics overview](https://developers.cloudflare.com/_astro/top-actions.Bxq-7U4T_1hlQDM.webp) 

The metrics show changes in the solve rate, widget traffic, and top actions for your widget.

Refer to the pages below for more information about Turnstile Analytics:

* [ Challenge outcome ](https://developers.cloudflare.com/turnstile/turnstile-analytics/challenge-outcomes/)
* [ Token validation ](https://developers.cloudflare.com/turnstile/turnstile-analytics/token-validation/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/turnstile-analytics/","name":"Turnstile Analytics"}}]}
```
