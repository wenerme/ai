---
description: Troubleshoot Cloudflare with third-party load balancers.
title: Third-party load balancers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Third-party load balancers

Last updated Jun 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/third-party-load-balancers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide explains how to troubleshoot common issues when using Cloudflare in front of third-party load balancers.

---

## F5 BIG-IP cookie persistence

When using Cloudflare as a reverse proxy ([orange-clouded](https://developers.cloudflare.com/dns/proxy-status/#benefits)) in front of F5 BIG-IP load balancers, you may encounter session affinity issues due to how Cloudflare maintains persistent connections.

### The problem

F5 BIG-IP load balancers typically set a session cookie at the beginning of a TCP connection (if none exists) and then ignore all cookies from subsequent HTTP requests on the same TCP connection. This breaks session affinity because Cloudflare sends multiple HTTP sessions on the same TCP connection due to HTTP keep-alive.

Symptoms include:

* Users being logged out or experiencing authentication flow issues.
* Shopping carts showing empty at checkout.
* Other session-dependent inconsistencies.

#### 1\. Identify F5 session cookies

F5 session cookies can have arbitrary names but typically follow a specific format:

* Without encryption (trivially decoded to show origin server IP and port):
```txt
BIGipCookie=16908480.16415.0000;path=/; Httponly; Secure
```
* With encryption:
```txt
BIGipCookie=TS019a202c=01625f1893a7d6e4b2c1a0f98e7d6c5b4a3f2e1d; path=/; Httponly; Secure
```

#### 2\. Test for the issue

You can test for this issue using curl. Run multiple requests and check if the session cookie is set consistently:

```sh
for i in {1..100}; do curl -sI https://example.com; done 2>&1 | grep "<COOKIE_NAME>" | wc -l
```

If the count is significantly less than 100 when proxied through Cloudflare but equals 100 when connecting directly to the origin, you are experiencing this issue.

### Solution: configure F5 OneConnect profile

The recommended solution is to configure an F5 OneConnect profile with a single host (`/32`) mask on your F5 BIG-IP load balancer.

#### How OneConnect helps

* The client is not fixed to a backend server by a TCP connection
* HTTP requests are load balanced individually
* Different cookies with different persistence information are honored within the same TCP session
* Cookies are set with each HTTP response

#### Important considerations

1. Validate that OneConnect is compatible with your version of TMOS (Traffic Management OS).
2. Test this configuration in staging or test Virtual IP (VIP) first, as it changes how the F5 device behaves.
3. The `/32` mask is critical for proper operation with Cloudflare.

---

## Related resources

* [Session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/)
* [TCP connections and keep-alives](https://developers.cloudflare.com/fundamentals/reference/tcp-connections/)
* [F5 K7208: Overview of the OneConnect profile ↗](https://my.f5.com/manage/s/article/K7208)
* [F5 K7964: The BIG-IP system may appear to ignore persistence information for Keep-Alive connections ↗](https://my.f5.com/manage/s/article/K7964)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/third-party-load-balancers/#page","headline":"Third-party load balancers · Cloudflare Support docs","description":"Troubleshoot Cloudflare with third-party load balancers.","url":"https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/third-party-load-balancers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
