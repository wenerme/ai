---
title: Application Security - Dashboard walkthrough
description: In this video, learn how to navigate the Cloudflare Application Security dashboard and how to use each page to monitor, investigate, and manage security protections.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Application Security - Dashboard walkthrough

In this video, learn how to navigate the Cloudflare Application Security dashboard and how to use each page to monitor, investigate, and manage security protections.

  
Transcript

Cloudflare Application Security dashboard for individual domains allows you to manage

application security features that protect the domain from various web attacks and

threats. I'll walk you through the interface,

show you what goes under them and how to use each page to monitor,

investigate, and manage your security protections.

First, select the domain you would like to manage your application security on.

Once you have selected a domain, open up the Application Security dashboard by

clicking security on the navigation bar here.

Now on the overview page.

The Security Overview page gives you a high level summary of your security posture for

this domain. You'll find alerts for Misconfigurations detected threats and

suggested actions on how to improve your security posture.

This is a good place to start and review what needs attention across your environment.

Under analytics, you can analyze security data across two different views traffic and

events. Use this page to understand what kind of traffic your domain is receiving and how

Cloudflare is securing your domain based on the detection tools that are enabled.

This page also serves as a starting point to identify how you may want to configure your

application security settings based on the patterns of traffic you're receiving.

The traffic tab shows data on incoming HTTP requests to your domain,

including ones that have not been affected by any security tools.

The events tab shows data on security actions that have been performed by Cloudflare

Security tools on incoming requests.

Under web assets, you can manage and monitor the security of various types of web related

assets. For example, use the endpoints tab to get recommendations and insights about your

endpoint usage. Use the Schema Validation tab to protect your origin from invalid API

requests and malicious payloads.

Schema validation works by validating requests against your own API schema.

The Client Side Resources tab is used to monitor resources such as scripts,

connections, and cookies that are running on your visitor's web browsers for your domain.

If you notice unexpected scripts or connections on the dashboard.

Check them here for signs of malicious activity.

Security rules is where you manage and define what security actions are.

Perform on incoming requests.

Under the Security Rules tab.

You can manage and create different types of rules to secure your domain.

You can create your own custom security rules from scratch or use predefined templates to

help you get started. Under the DDoS protection tab,

you'll find a DDoS rulesets that mitigate DDoS attacks on your domain.

The DDoS Attack Protection rule sets are automatically managed and updated by

Cloudflare, so you only need to use this tab if you want to create an override rule that

changes how Cloudflare DDoS protection functions.

In settings, you can configure Cloudflare detection tools and your domain security

posture. Security settings and detection tools are categorized by the type of threat

they detect and mitigate.

Use the filters on this page to find detection tools and settings that are

relevant to your security needs.

Thank you for choosing Cloudflare.

For more information, please refer to our developer documentation.