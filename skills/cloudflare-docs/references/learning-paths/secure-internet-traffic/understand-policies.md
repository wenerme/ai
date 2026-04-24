---
title: Understand and streamline policy creation
description: Secure Internet traffic and SaaS apps.
image: https://developers.cloudflare.com/cf-twitter-card.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/secure-internet-traffic/understand-policies/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Understand and streamline policy creation

Before you begin building security policies, there are a few key details about Gateway to review.

The next few modules will cover the breadth of types of policies and actions that can be accomplished by sending traffic through the Cloudflare Gateway inspection engine. This implementation guide assumes that your goals are to block threat actors from using attack vectors on your user base (such as malware, complex phishing attempts, and credential theft), as well as detection and prevention of threats to your corporate data (data loss prevention). These security threats may take internal and external forms. Separately, we will detail building threat prevention that uses our Remote Browser Isolation technology to maximally reduce the theoretical attack surface for your users.

This guide will provide you with a baseline of recommended policies to build and address common questions about policy building and accomplishing explicit outcomes.

## Objectives

By the end of this module, you will be able to:

* Understand the order Gateway enforces policies for filtering traffic.
* Create reusable lists for Gateway policies.
* Subscribe to indicator feeds for advanced threat intelligence.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/understand-policies/","name":"Understand and streamline policy creation"}}]}
```
