---
title: Control traffic egress with source IP anchoring and allowlisting
description: Secure Internet traffic and SaaS apps.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Control traffic egress with source IP anchoring and allowlisting

Now that you have created firewall policies to secure your organization, you can begin creating egress policies to control what IP address your users egress to the Internet with.

Note

The following module requires [egress policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/), a feature only available on Enterprise plans. If you are not an Enterprise user, you can skip ahead to [Secure SaaS applications](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/secure-saas-applications/).

For more information on egress policies, contact your account team.

## Objectives

By the end of this module, you will be able to:

* Understand when your organization may need source IP anchoring.
* Create egress policies to make use of dedicated egress IPs.
* Follow best practices for deploying egress IPs.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-egress-policies/","name":"Control traffic egress with source IP anchoring and allowlisting"}}]}
```
