---
description: Client-side, session-based verification that continuously evaluates visitor behavior to identify automation.
title: Precursor
image: https://developers.cloudflare.com/cloudflare-challenges/precursor/og.png?v=eeb7ed32dcc9431a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt
> Use this file to discover all available pages before exploring further.

# Precursor

Last updated Oct 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-challenges/precursor/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Precursor is a client-side, session-based verification system. It continuously evaluates visitor behavior instead of relying on a single Challenge event. This helps detect automation that appears legitimate in individual requests but exhibits non-human patterns across a session.

## How it works

Precursor operates as a continuous client-side verification loop:

- A client-side script is injected into the page
- The script continuously collects signals and performs verification
- Each execution produces signals that are evaluated by Cloudflare
- In Armed mode, results can update session state stored in the `cf_clearance` cookie
- The process repeats throughout the session

This enables Cloudflare to continuously evaluate session behavior over time.

### Precursor modes

The selected mode controls how Precursor uses its signals:

| Mode | Behavior |
| --- | --- |
| **Off** | Precursor does not run. |
| **Monitor** | Precursor collects signals. Its signals do not change bot score or Challenge clearance. |
| **Armed** | Precursor signals can affect bot score and Challenge clearance. |

### Precursor Interstitial

The Precursor Interstitial is a lightweight Challenge shown before a visitor continues to your site. It establishes a verified Precursor session and grants Challenge clearance if the visitor does not already have one.

## Get started

To configure Precursor for your zone:

1. In the Cloudflare dashboard, select your zone and go to **Security** > **Settings**. [Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic** or **Precursor** to locate **Precursor**.
3. From the **Status** dropdown, select *Monitor* or *Arm*.
4. In the Precursor card, select the settings icon to set the default Precursor Interstitial behavior across your site. This setting is not available when Precursor is Off.
   - **Show Interstitial On:** Present an interstitial Challenge when a visitor does not have a verified session. This establishes a valid session before they continue, but may add friction.
   - **Show Interstitial Off:** Establish session state in the background. This reduces interruptions, but cannot guarantee that every session is fully verified.
   - Add **Interstitial Rules** to customize the sitewide interstitial default for specific requests. For example, you do not show an interstitial Challenge across most of your site but require one on `/checkout` to enforce a valid session before purchase.

## Use Precursor with APIs

If your zone serves both browser pages and API endpoints, use **Interstitial Rules** to customize the sitewide **Show Interstitial** default for API traffic. This setting is available in both Monitor and Armed modes.

When **Show Interstitial** is on, visitors without a verified Precursor session must complete an interstitial Challenge before continuing. This can affect:

- API endpoints called by non-browser clients (for example, `curl`, mobile backends, server-to-server jobs)
- Browser API calls that do not send cookies

For mixed browser and API traffic, use one of these patterns:

- Keep **Show Interstitial** off by default, then use **Interstitial Rules** to require it on sensitive browser pages or paths, such as `/checkout`.
- Turn **Show Interstitial** on by default, then use **Interstitial Rules** to turn it off for API hostnames or paths.

For browser XHR/fetch requests to endpoints that show an interstitial Challenge, ensure cookies are included:

```js
fetch("/api/search", {
	credentials: "include",
});
```

```js
axios.get("/api/search", {
	withCredentials: true,
});
```

Turning off the interstitial for an API endpoint does not turn off Precursor on browser pages. Browser sessions continue to be evaluated according to the selected Precursor mode.

## Relationship to JavaScript Detections

Precursor supersedes JavaScript Detections (JSD). Both collect client-side signals, but Precursor evaluates them throughout a session rather than only once.

- Precursor moves from one-time execution to continuous verification
- Precursor introduces session-based state
- Precursor enables dynamic runtime control

When either JSD or Precursor contributes to bot score, Cloudflare exposes the source as **JavaScript Fingerprinting**. Precursor signals do not contribute to bot score in Monitor mode.

**If you already use JSD**

In Armed mode, Cloudflare disables JSD to avoid running both features on the same traffic. Precursor includes the detections previously covered by JSD, and JSD-driven Security Rules still apply.

In Monitor mode, Cloudflare continues to run JSD, so there is no gap in coverage while you test Precursor.

**If you do not use JSD**

If you use Armed mode without previously using JSD, you may see more traffic with a bot score below 30.

## Relationship to Challenges

Precursor and Challenges serve different roles:

- Challenges provide point-in-time verification
- Precursor provides continuous, session-level verification

In Armed mode, Precursor can strengthen Challenges by:

- determining when additional Challenges should be required
- re-evaluating visitors after they have already passed a Challenge
- identifying automation that emerges over time

## Relationship to the `cf_clearance` cookie

Precursor is tightly integrated with [`cf_clearance`](https://developers.cloudflare.com/cloudflare-challenges/concepts/clearance/#cf_clearance-cookies). In Armed mode:

- effective clearance may be reduced or invalidated
- additional Challenges may be triggered
- the visitor may be re-verified during the same session

## Visibility in Security Analytics

Once Precursor runs on a zone, its detections appear in the zone's Analytics view. To open it, select your zone in the Cloudflare dashboard, then go to **Security** > **Analytics** > **Traffic** > **Bot analysis**. The bot score distribution and WAF rule-match counts now include Precursor's detections.

For more information, refer to [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-challenges/precursor/#page","headline":"Precursor","description":"Client-side, session-based verification that continuously evaluates visitor behavior to identify automation.","url":"https://developers.cloudflare.com/cloudflare-challenges/precursor/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-challenges/precursor/og.png?v=eeb7ed32dcc9431a","dateModified":"2026-10-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
