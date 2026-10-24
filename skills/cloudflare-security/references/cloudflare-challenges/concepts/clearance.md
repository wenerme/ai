---
description: How cf_clearance cookies prove a visitor passed a Cloudflare Challenge.
title: Clearance
image: https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/og.png?v=cf5fe1a7dd960f75
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt
> Use this file to discover all available pages before exploring further.

# Clearance

Last updated Oct 23, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## `cf_clearance` cookies

A `cf_clearance` cookie proves to Cloudflare that the visitor is a verified human and has passed Cloudflare's client-side verifications.

The cookie contains **two types of clearance** that work together:

- **Challenge clearance**: Granted when a visitor solves a Challenge (for example, Interstitial Challenge Pages or Turnstile with pre-clearance enabled).
- **Precursor clearance**: Continuously updated based on session behavior.

The cookie is securely tied to the specific visitor and device it was issued to, preventing reuse across machines.

As an additional layer of security, customers with Advanced Rate Limiting can [add a rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/) using the **Clearance UUID** (`http.request.clearance.uuid`) characteristic. This stable identifier lets the rule keep using the same counter when Cloudflare refreshes the encrypted `cf_clearance` cookie value, including updates from JavaScript Detections or Precursor.

Use the counting expression `http.request.clearance.uuid ne ""` so that requests without a valid clearance cookie do not share an empty-value counter. If those requests also require rate limiting, create a separate rule with an appropriate characteristic, such as the source IP address.

### Challenge clearance

Challenge clearance is granted when a visitor successfully completes a Challenge.

Each Challenge type sets a clearance level. A higher-level clearance bypasses all Challenges at or below that level. A lower-level clearance only bypasses Challenges at the same level.

| Clearance level | Bypasses |
| --- | --- |
| Interactive (high) | Interactive, Managed, and Non-Interactive Challenges |
| Managed (medium) | Managed and Non-Interactive Challenges |
| Non-Interactive (low) | Non-Interactive Challenges only |

If a visitor passes an Interactive Challenge (highest security level), they can bypass all other Challenges for as long as the clearance remains valid.

If a visitor receives clearance at a lower level (Managed or Non-Interactive) and later encounters a higher-level Challenge, they must solve the higher-level Challenge again.

The original clearance is replaced if a higher-level Challenge is later solved.

Challenge clearance remains valid for the duration configured by the customer (Challenge Passage), **unless Precursor in Armed mode determines the session is suspicious**.

### Precursor clearance

In Armed mode, Precursor continuously re-evaluates clearance throughout a visitor's session. It uses ongoing behavior instead of a single Challenge event. As Precursor observes new signals, it updates clearance to reflect the current level of trust in the session. In Monitor mode, Precursor does not change Challenge clearance.

If Precursor determines that a session is suspicious:

- The visitor’s effective Challenge clearance may be **reduced or invalidated**.
- The visitor may be **re-challenged**, even if the cookie has not expired.

This creates a model where clearance is both **time-bound (Interstitial)** and **behavior-bound (Precursor)**.

## Pre-clearance support in Turnstile

Pre-clearance in [Turnstile](https://developers.cloudflare.com/turnstile/) allows websites to streamline user experiences by using `cf_clearance` cookies. The `cf_clearance` cookie enables visitors to bypass WAF Challenges on all subsequent requests on the zone, including API requests, based on the security clearance level set by the customer. This can be particularly useful for trusted visitors, enhancing usability while maintaining security.

By default, Turnstile issues a one-time use token to the visitor when they solve a Challenge via the widget. You must [validate the token](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) by making a server-side call to the Siteverify API.

Warning

It is critical to enforce Turnstile tokens with the Siteverify API. The Turnstile token could be invalid, expired, or already redeemed. Not verifying the token will leave major vulnerabilities in your implementation.

You **must** call Siteverify to complete your Turnstile configuration. Otherwise, it is incomplete and will result in zeroes for token validation when viewing your metrics in [Turnstile Analytics](https://developers.cloudflare.com/turnstile/turnstile-analytics/).

Note

The clearance token cannot be used again.

| Challenge type | Issued clearance |
| --- | --- |
| Challenge Page | `cf_clearance` cookie (default) |
| Turnstile widget | Token (default) <br> `cf_clearance` cookie (optional addition) |

When you enable pre-clearance support on Turnstile, a `cf_clearance` cookie is issued to the visitor in addition to the default Turnstile token.

You can integrate Cloudflare Challenges by allowing Turnstile to issue a `cf_clearance` cookie as pre-clearance to your visitor. The pre-clearance level is set upon widget creation or widget modification using the Turnstile API's clearance\_level. Possible values for the configuration are:

- `interactive`
- `managed`
- `jschallenge`
- `no_clearance`

All widgets have pre-clearance mode set to `false` and the security clearance is set to `no_clearance` by default.

For Enterprise customers eligible to enable widgets without any pre-configured hostnames, Cloudflare recommends issuing pre-clearance cookies on widgets where at least one hostname is specified and is the same as the zone that you want to integrate with Turnstile.

Refer to the [blog post ↗︎](https://blog.cloudflare.com/integrating-turnstile-with-the-cloudflare-waf-to-challenge-fetch-requests) for more details on how pre-clearance works with WAF.

### Pre-clearance level options

**Interactive** (High) `interactive`

Allows a user with a clearance cookie to not be challenged by Non-Interactive Challenge, Managed Challenge, or Interactive Challenge Firewall Rules.

**Managed** (Medium) `managed`

Allows a user with a clearance cookie to not be challenged by Non-Interactive Challenge or Managed Challenge Firewall Rules.

**Non-interactive** (Low) `jschallenge`

Allows a user with a clearance cookie to not be challenged by Non-Interactive Challenge Firewall Rules.

### Clearance cookie duration

Clearance cookies generated by the Turnstile widget will be valid for the time specified by the zone-level Challenge Passage value. To configure the Challenge Passage setting, refer to [Challenge Passage](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/challenge-passage/).

### Setup

To enable pre-clearance, you must ensure that the hostname of the Turnstile widget matches the zone with the WAF rules. During the Turnstile configuration setup in the Cloudflare dashboard, you have access to a list of registered zones. Select the appropriate hostname from this list.

The prerequisite is crucial for pre-clearance to function properly. If set up correctly, visitors who successfully solve Turnstile will receive a cookie with the security clearance level set by the customer. When encountering a WAF Challenge on the same zone, they will bypass additional Challenges for the configured clearance level and below.

For more details on managing hostnames, refer to the [Hostname Management documentation](https://developers.cloudflare.com/turnstile/additional-configuration/hostname-management/).

Note

[JavaScript detections](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/) are stored in the `cf_clearance` cookie.

The `cf_clearance` cookie cannot exceed the maximum size of 4096 bytes.

#### Enable pre-clearance on a new site

1. In the Cloudflare dashboard, go to **Turnstile**. [Go to **Turnstile** ↗](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Select **Add widget**.
3. Under **Would you like to opt for pre-clearance for this site?**, select **Yes**.
4. Choose a **pre-clearance level**.
5. Select **Create**.

#### Enable pre-clearance on an existing site

1. In the Cloudflare dashboard, go to **Turnstile**. [Go to **Turnstile** ↗](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Select an existing widget and open **Settings**.
3. Under **Would you like to opt for pre-clearance for this site?**, select **Yes**.
4. Choose a **pre-clearance level**.
5. Select **Update**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/#page","headline":"Clearance","description":"How cf_clearance cookies prove a visitor passed a Cloudflare Challenge.","url":"https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/og.png?v=cf5fe1a7dd960f75","dateModified":"2026-10-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Cookies"]}
```
