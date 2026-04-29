---
title: Onboard your domain to Cloudflare
description: Learn how Cloudflare secures and accelerates your website using its global network and reverse proxy technology. In this video, we explain how connecting your domain to Cloudflare protects your origin server, enhances performance, and keeps your site online—even during attacks. You'll see how DNS, nameservers, and proxy status work together to route and safeguard traffic. Whether you're self-hosting or using serverless platforms like Cloudflare Workers, this guide helps you understand the onboarding process and why Cloudflare is essential for modern web infrastructure.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/videos/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Onboard your domain to Cloudflare

Learn how Cloudflare secures and accelerates your website using its global network and reverse proxy technology. In this video, we explain how connecting your domain to Cloudflare protects your origin server, enhances performance, and keeps your site online—even during attacks. You'll see how DNS, nameservers, and proxy status work together to route and safeguard traffic. Whether you're self-hosting or using serverless platforms like Cloudflare Workers, this guide helps you understand the onboarding process and why Cloudflare is essential for modern web infrastructure.

Chapters

* ![How Cloudflare Works](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/980c8494f2403b95473d2ed687b4f402/thumbnails/thumbnail.jpg?fit=crop&time=0s)  
 **How Cloudflare Works** 0s
* ![Getting Started: Domain Onboarding](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/980c8494f2403b95473d2ed687b4f402/thumbnails/thumbnail.jpg?fit=crop&time=55s)  
 **Getting Started: Domain Onboarding** 55s
* ![DNS and Reverse Proxy Explained](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/980c8494f2403b95473d2ed687b4f402/thumbnails/thumbnail.jpg?fit=crop&time=84s)  
 **DNS and Reverse Proxy Explained** 01m24s
* ![Request Lifecycle and Performance Optimization](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/980c8494f2403b95473d2ed687b4f402/thumbnails/thumbnail.jpg?fit=crop&time=200s)  
 **Request Lifecycle and Performance Optimization** 03m20s

  
Transcript

Cloudflare operates a global network thatmakes your online presence faster and protect

it from cyber attacks.

When you connect a website or app toCloudflare,

we act as both the authoritative DNS providerand a reverse proxy that sits between your

visitors and your origin servers.

When a visitor or an attacker tries to reachyour website,

those requests are first routed to theCloudflare network instead of your origin

server. Cloudflare processes those requests,mitigating malicious traffic while speeding

up legitimate traffic.

Our services are customizable to give yougranular control over your traffic.

You can write rules to cache,load, balance and redirect requests,

modify headers, execute code,and more.

Many of our services are on by default,such as DDoS protection and caching,

so your traffic will automatically be saferand faster.

To make this possible,you need to onboard your domain to

Cloudflare. The most common way to onboardyour domain is to update your DNS name

servers to the Cloudflare name servers weprovide you,

which makes Cloudflare your authoritative DNSprovider.

You do this at the provider you purchase yourdomain name from,

such as a registrar. If you need a newdomain,

you can purchase one at cost from theCloudflare registrar,

which is automatically configured to use ourname servers.

Let's review the basics of name servers andDNS.

A name server is a service operated by yourauthoritative DNS provider that acts as a

source of truth for your domain's DNSrecords.

Dns records map a human readable hostname,such as example.com,

to machine readable IP addresses or data.

The IP address listed in a DNS recordidentifies where your origin server is

hosted. These DNS records tell yourauthoritative DNS provider how to respond to

DNS queries for your domain.

So altogether, DNS allows internet browserssuch as Google Chrome to find the correct

content. Then the browser can make HTTPrequests to load the content for your

visitors. If you're not using a reverse proxysuch as Cloudflare.

The browser makes HTTP requests directly tothe IP address of your origin server.

This is not secure because your origin isexposed to the internet without protection.

When Cloudflare is in front of your origin,we act as both your authoritative DNS

provider and a reverse proxy for your HTTPrequests.

We respond to DNS queries with Cloudflare IPaddresses,

which makes your HTTP traffic go throughCloudflare instead of directly to your

origin. This process is called reverseProxying,

which allows us to hide and therefore protectyour origin server.

Furthermore, we highly recommend blockingtraffic that doesn't come through Cloudflare

by configuring your origins firewall to onlyallow Cloudflare IP addresses or using

Cloudflare Tunnel. You can identify whichtraffic is proxy in the DNS records table in

the Cloudflare dashboard.

If the proxy status is set to proxy,requests for those hostname will flow through

the Cloudflare network.

This will start happening once you updateyour nameservers.

If the status is as DNS only.

Requests for those hostnames will only useCloudflare for DNS resolution.

Let's follow an HTTP request as it getsprocessed by Cloudflare when someone visits

or tries to attack your website or app.

That request will be routed to the Cloudflaredata center that's closest to that visitor.

If a request is from a legitimate user,we check if it's for a resource that's in the

Cloudflare cache. If we don't have it cached,

we proxy the request to your origin server.

We then cache the origins response.

So the next time Cloudflare sees a requestfor the same resource,

we can deliver it straight away.

We block suspicious requests from reachingyour origin,

only allowing legitimate users and speedingup their experience.

So you will always have the most up to datesecurity posture,

including protection from Sierra devulnerabilities,

advanced DDoS attacks,and more.

Cloudflare is an extension of yourinfrastructure,

keeping your site safe and highly available.

Get started with onboarding your domaintoday.