---
title: Block user agents and lock zones
description: Block user agents and restrict zone access.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Block user agents and lock zones

[User Agent (UA) Blocking](https://developers.cloudflare.com/waf/tools/user-agent-blocking/) rules match against specific User-Agent request headers sent by the browser or application accessing your site. UA rules are applied against the entire domain, and after a rule is triggered, you can decide which action to take against the visitor.

Actions:

* Block: Ensures that an IP address will never be allowed to access your site
* Interactive Challenge: Visitors will be shown an interactive challenge before allowed access
* Non-Interactive Challenge: Visitors will be shown a non-interactive challenge before allowed access

## Zone Lockdown

[Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/) rules allow you to define paths and only allow specific, trusted IPs to those paths. Any requests to those paths from non-whitelisted IPs will be automatically blocked with an 1106 HTTP code. This ability is particularly useful for locking down administrative or staging portions of your application.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/surge-readiness/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/surge-readiness/security/block-agents-lock-zones/","name":"Block user agents and lock zones"}}]}
```
