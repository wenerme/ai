---
description: Reference information for Known limitations in Browser Isolation.
title: Known limitations
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Known limitations

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/known-limitations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Below, you will find information regarding the current limitations for Browser Isolation.

## Website compatibility

Our Network Vector Rendering (NVR) technology sends drawing instructions to the user's browser instead of streaming video of the page. This allows us to deliver a secure remote computing experience without the bandwidth limitations of video streams. While we expect most websites to work perfectly, some browser features and web technologies are unsupported and will be implemented in the future:

* Webcam and microphone support is unavailable.
* Websites that use WebGL (a browser technology for rendering 3D graphics) may not function. To turn off WebGL in the browser, refer to [WebGL Rendering Error](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/troubleshooting/#webgl-rendering-error).
* Netflix and Spotify Web Player are unavailable.
* H.265/HEVC (a video compression format) is not a supported video format at this time.

## Browser compatibility

| Browser                                      | Compatibility |
| -------------------------------------------- | ------------- |
| Google Chrome                                | ✅             |
| Mozilla Firefox                              | ✅             |
| Safari                                       | ✅             |
| Microsoft Edge (Chromium-based)              | ✅             |
| Other Chromium-based browsers (Opera, Brave) | ✅             |
| Internet Explorer 11 and below               | ❌             |

### Brave

Browser Isolation uses [WebRTC](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/network-dependencies/#webrtc-channel) for low-latency communication between the local and remote browser. Brave's WebRTC IP Handling Policy can impact how Cloudflare RBI loads and functions. If the WebRTC IP Handling Policy is configured to **Disable Non-Proxied UDP**, RBI may fail to load correctly because Brave blocks the UDP connections that WebRTC requires.

To ensure RBI loads correctly, go to `brave://settings/privacy` in your Brave browser window, find **WebRTC IP Handling Policy**, and change the setting from **Disable Non-Proxied UDP** to one of the following:

* **Default**
* **Default Public and Private Interfaces**
* **Default Public Interface Only**

## Protocol support

Browser Isolation requires HTTPS. Websites served over unencrypted HTTP cannot be isolated.

## Virtual machines

Browser Isolation is not supported in virtualized environments (VMs).

## Gateway selectors

Certain selectors for Gateway HTTP policies bypass Browser Isolation, including:

* [Destination Continent IP Geolocation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#destination-continent)
* [Destination Country IP Geolocation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#destination-country)
* [Destination IP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#destination-ip)

You cannot use these selectors to isolate traffic and isolation matches for these selectors will not appear in your Gateway logs. Additionally, you cannot apply other policies based on these selectors while in isolation. For example, if you have a Block policy that matches traffic based on destination IP, Gateway will not block the matching traffic if it is already isolated by an Isolate policy.

## File download size

When a user downloads a file within the remote browser, the file is held in memory and destroyed at the end of the remote browser session. Therefore, the total size of files downloaded per session is shared with the amount of memory available to the remote browser. We recommend a maximum individual file size of 512 MB.

## Multifactor authentication

[Clientless Web Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/) does not support Yubikey or WebAuthN (hardware security key authentication). These authentication technologies require the isolated website to use the same domain name as the non-isolated website. Clientless Web Isolation changes the URL by adding a prefix, which breaks this requirement. Therefore, Yubikey and WebAuthN will not work with prefixed Clientless Web Isolation URLs but will work normally for [in-line deployments](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/) such as [isolated Access applications](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/isolate-application/).

## SAML applications

Cloudflare Remote Browser Isolation now [supports SAML applications that use HTTP-POST bindings](https://developers.cloudflare.com/cloudflare-one/changelog/browser-isolation/#2025-05-13). SAML is a protocol used for single sign-on (SSO), and some SAML implementations send login data via an HTTP POST request (HTTP-POST bindings). This resolves previous issues such as `405` errors and login loops during SSO authentication flows.

You no longer need to isolate both the Identity Provider (IdP) and Service Provider (SP), or switch to HTTP-Redirect bindings, to use Browser Isolation with POST-based SSO. Users can log in to internal or SaaS applications in the isolated browser securely and seamlessly.

[Clientless Web Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/) may still be preferred in some deployment models. Clientless Web Isolation implicitly isolates all traffic (both IdP and SP) and supports HTTP-POST SAML bindings.

## Browser Isolation is not compatible with private apps on non-`443` ports

Browser Isolation is not compatible with [self-hosted private applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) that use private IPs or hostnames on ports other than `443`. Trying to access self-hosted applications on non-`443` ports will result in a Gateway block page.

To use Browser Isolation for an application on a private IP address with a non-`443` port, configure a [private network application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/legacy-private-network-app/) instead.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/known-limitations/#page","headline":"Known limitations - Browser Isolation · Cloudflare One docs","description":"Reference information for Known limitations in Browser Isolation.","url":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/known-limitations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
```
