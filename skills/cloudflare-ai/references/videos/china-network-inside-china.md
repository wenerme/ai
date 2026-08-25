---
description: In this video, Jess Liu walks us through the main features of Cloudflares China Network. They cover how the China Network works, including integrated caching, in-country China name servers, and compliance with ICP regulations. They also briefly discuss Cloudflare's CDN Global Acceleration (formerly China Express), an option for accelerating dynamic content that cannot be cached.
title: China network - How to speed up your web traffic inside mainland China
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

In this video, Jess Liu walks us through the main features of Cloudflares China Network. They cover how the China Network works, including integrated caching, in-country China name servers, and compliance with ICP regulations. They also briefly discuss Cloudflare's CDN Global Acceleration (formerly China Express), an option for accelerating dynamic content that cannot be cached.

Chapters

* ![Introduction](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/b7933a5b3636ca29f834128ca92665b3/thumbnails/thumbnail.jpg?fit=crop&time=0s)

**Introduction**0s
* ![How does it work?](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/b7933a5b3636ca29f834128ca92665b3/thumbnails/thumbnail.jpg?fit=crop&time=50s)

**How does it work?**50s
* ![ICP Regulations](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/b7933a5b3636ca29f834128ca92665b3/thumbnails/thumbnail.jpg?fit=crop&time=95s)

**ICP Regulations**1m35s
* ![China Express](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/b7933a5b3636ca29f834128ca92665b3/thumbnails/thumbnail.jpg?fit=crop&time=120s)

**China Express**2m

Transcript

Do you have users in mainland China who are experiencing high latency accessing your

services? Cloudflare China network solution can help you solve this easily.

Hello, I'm Jess from Cloudflare here to teach you about our China network products.

Sometimes when the internet users in mainland China visit your website on Cloudflare global

network. They are connected to data centers outside of mainland China,

and these longer distances will lead to high latency and low availability,

creating a slow and poor user experience.

We can speed up these web services easily with Cloudflare China network solution,

How first Cloudflare China network provides caching in mainland China through our partner

This means for your users in mainland China, their requests will go to the nearest data

center inside of mainland China instead of any external Cloudflare data center.

Shorter distance means faster content delivery.

These data centers are fully integrated with Cloudflare global network.

You'll have access to the same configuration tools for cache WAF origin rules and other

settings, all within a single dashboard.

The same goes for name servers in Mainland China.

If the majority of your users are located within Mainland China,

we offer the option of an Inchina name server that will help speed up DNS resolution.

Second, the China network is designed to follow mainland China's ICP regulations.

This means we can guarantee your web service will always remain accessible to users in

mainland China, without interruptions from local internet service providers or ISPs.

If you're not sure how ICP works, our China based partners can help you with

the ICP filing and maintenance.

Third, for dynamic content that cannot be cached in the data centers within mainland

China, such as API calls or web apps, users may still experience increased latency

if your origin is located outside of mainland China.

So for these cases, we offer the option of China Express,

which will accelerate both DNS resolution and traffic for origin content.

Watch our video on China Express to learn more.

Thus, the China network solutions sound like something that will help you reach out to our

sales team to learn more.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/videos/china-network-inside-china/#page","headline":"China network - How to speed up your web traffic inside mainland China | Cloudflare Docs","description":"In this video, Jess Liu walks us through the main features of Cloudflares China Network. They cover how the China Network works, including integrated caching, in-country China name servers, and compliance with ICP regulations. They also briefly discuss Cloudflare's CDN Global Acceleration (formerly China Express), an option for accelerating dynamic content that cannot be cached.","url":"https://developers.cloudflare.com/videos/china-network-inside-china/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
