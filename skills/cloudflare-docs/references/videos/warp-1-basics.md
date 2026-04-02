---
title: WARP - Understand Cloudflare WARP basics
description: In this episode, we explain the core features of the Cloudflare WARP client and how to troubleshoot common issues. After watching, you will have an understanding of the GUI, the differences between the consumer and corporate WARP, device profiles, the various operating modes of WARP, split tunneling, and more.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# WARP - Understand Cloudflare WARP basics

In this episode, we explain the core features of the Cloudflare WARP client and how to troubleshoot common issues. After watching, you will have an understanding of the GUI, the differences between the consumer and corporate WARP, device profiles, the various operating modes of WARP, split tunneling, and more.

Chapters

* ![Introduction and WARP GUI Basics](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=0s)  
 **Introduction and WARP GUI Basics** 0s
* ![Consumer vs Corporate WARP](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=57s)  
 **Consumer vs Corporate WARP** 57s
* ![Device Profiles Explained](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=95s)  
 **Device Profiles Explained** 01m35s
* ![WARP Operating Modes](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=132s)  
 **WARP Operating Modes** 02m12s
* ![Split Tunneling](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=184s)  
 **Split Tunneling** 03m4s
* ![Conclusion](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=296s)  
 **Conclusion** 04m56s

  
Transcript

Hi, I'm Jess from Cloudflare.

Welcome. In this video,you'll learn the basics of Cloudflare WARP.

Our support team will always be here to help,

but this guide is all about empowering you tounderstand and solve issues faster on your

own. We will learn the Cloudflare WARP clientand how it differs from the consumer version

the different operating modes of WARP,split tunneling exclude versus include modes,

and the WARP GUI and its intended versusactual state.

These are the basic concepts that willprepare you to troubleshoot any issues you

may encounter. Let's get started with What isthe Cloudflare WARP client?

Cloudflare WARP client allows you to protectcorporate devices by securely and privately

sending traffic from those devices toCloudflare's global network,

where Cloudflare Gateway can apply advancedweb filtering.

is available to the public for free.

The corporate version integrates withCloudflare Zero Trust,

giving your IT team the ability to managesecurity policies,

control traffic routing,and monitor usage.

If you're not sure which version of WARPyou're currently using,

you can tell them apart easily by its color.

The consumer version will display WARP inred,

whereas the corporate version will displayZero Trust in blue.

If your intention is to use the corporateversion,

make sure you're seeing a blue Zero TrustWARP banner by authenticating with your

Cloudflare Zero Trust organization.

Next, what is the device profile?

A device profile represents a different setof parameters assigned to your device,

based on its relationship with the policyattributes.

You can create multiple profiles and applydifferent settings based on your user's

identity, the device location,and other criteria.

IT administrators can assign different deviceprofiles to their users.

For example, depending on office locations,teams,

device types, operating systems,or other attributes,

users might have different routes that needto be excluded from their WARP Tunnel,

or different DNS settings to accommodatelocal development services.

All right, it's important to know that WARPclient can operate in different modes,

because each mode controls the types oftraffic sent to Cloudflare Gateway

differently. The WARP mode determines whichZero Trust features are available on the

device. Selecting the right mode depends onyour organization's needs.

For example, for Internet security or remoteaccess gateway with WARP or Secure Web

Gateway without DNS filtering would be ideal,

and the latter should only be used in caseswhere Cloudflare cannot control DNS

resolution on the device.

Both Gateway with DoH and Proxy Mode are usedfor Internet filtering.

Gateway with DoH is only DNS traffic,while Proxy Mode is only HTTP traffic.

Lastly, Device Information Only mode would beuseful for clientless access or browser based

remote access to use device posture withoutproxying traffic to Cloudflare.

If you encounter a problem,understanding which mode you're in will help

you narrow down where the problem might be.

And that's because WARP modes arecombinations or absences of particular

features. For example,Gateway with WARP includes both DNS and

Tunnel components. So when you'retroubleshooting,

you have to look at both the DNS and Tunnelcomponents as opposed to Gateway with DoH

where you will only have to look at the DNScomponent.

But don't worry, you don't have to memorizeall of this.

You can always refer to our documentation.

Next up, split tunneling,a feature that allows you to control what IP

traffic goes through the WARP virtualinterface or tunnel.

There are two ways to configure it.

The first mode is exclude IPs and domains.

This is the default setting.

All traffic will be sent to CloudflareGateway except for IPs and domains you

specify. The second mode is include IPs anddomains.

Only traffic destined to IPs or domains youspecify will be sent to Cloudflare Gateway.

All other traffic will bypass Gateway andwill no longer be filtered by your network or

HTTP policies. Secure Web Gateway without DNSfiltering and Device Information Only mode

will automatically disable domain based splittunneling.

So if you're experiencing issues related todomains,

it's good to check your WARP mode.

And lastly, here's a common point ofconfusion.

The toggle button in the WARP GUI shows theintended state,

not the actual state. For example,if the toggle is on,

it means that the client intends to connect,but the actual status may show disconnected

if there's an issue. So always check themessage below the toggle for the current

connection state. You now understand thefoundation of WARP client components.

If you want to learn more,we also have additional resources on

Cloudflare docs. Thanks for watching and seeyou soon!