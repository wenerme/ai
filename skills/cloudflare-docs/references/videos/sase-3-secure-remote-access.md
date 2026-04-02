---
title: SASE - Secure remote access to your critical infrastructure
description: In this video, learn how Cloudflare's SASE platform can provide highly secure access to your critical infrastructure by leveraging a modern ZTNA service to implement Zero Trust principles Applications, databases and their servers are running in a variety of locations from on-premises data centers to cloud hyperscalers, making the need to secure administrative access more important than ever.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# SASE - Secure remote access to your critical infrastructure

In this video, learn how Cloudflare's SASE platform can provide highly secure access to your critical infrastructure by leveraging a modern ZTNA service to implement Zero Trust principles Applications, databases and their servers are running in a variety of locations from on-premises data centers to cloud hyperscalers, making the need to secure administrative access more important than ever.

Chapters

* ![Introduction to SASE and Securing Access to Critical Infrastructure](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/f13b085ed4d28a9dbb8faf19ae986125/thumbnails/thumbnail.jpg?fit=crop&time=0s)  
 **Introduction to SASE and Securing Access to Critical Infrastructure** 0s
* ![Connecting and Securing Private Servers with Cloudflare Tunnels](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/f13b085ed4d28a9dbb8faf19ae986125/thumbnails/thumbnail.jpg?fit=crop&time=50s)  
 **Connecting and Securing Private Servers with Cloudflare Tunnels** 50s
* ![Using Internal DNS to Securely Resolve Private Network Resources](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/f13b085ed4d28a9dbb8faf19ae986125/thumbnails/thumbnail.jpg?fit=crop&time=132s)  
 **Using Internal DNS to Securely Resolve Private Network Resources** 02m12s
* ![Connecting User Devices Securely with Cloudflare's Device Agent](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/f13b085ed4d28a9dbb8faf19ae986125/thumbnails/thumbnail.jpg?fit=crop&time=181s)  
 **Connecting User Devices Securely with Cloudflare's Device Agent** 03m01s
* ![Enforcing Access Control with Identity, Network and Device Based Security Policies](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/f13b085ed4d28a9dbb8faf19ae986125/thumbnails/thumbnail.jpg?fit=crop&time=228s)  
 **Enforcing Access Control with Identity, Network and Device Based Security Policies** 03m48s
* ![Auditing and Logging Access to Critical Infrastructure](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/f13b085ed4d28a9dbb8faf19ae986125/thumbnails/thumbnail.jpg?fit=crop&time=303s)  
 **Auditing and Logging Access to Critical Infrastructure** 05m03s

  
Transcript

Secure Access Service Edge or SASE solutionsincorporate Zero Trust Network Access or ZTNA

to provide access to applications such as aninternal wiki or a HR system.

But what about critical high risk servicessuch as a database administration tool or

service requiring access via SSH or RDP?

In these cases, it's important to be able toensure tight security from the device all the

way to the application and allow authorizedusers who are using strong authentication on

trusted devices. Let's say we need to secureaccess to a database admin app such as

pgAdmin, a common web interface for Postgresdatabases,

and also access to SSH on the same server.

Imagine we have an example environment,and in it we've already created connectivity

from the server to Cloudflare,using a software agent that maintains a

secure tunnel from the private network wherethe Pgadmin server is running back to the

Cloudflare network. No private server IPaddresses are going to be exposed to the

Internet. We're essentially connecting thisserver to our new corporate network managed

by Cloudflare. Once connected,there are two methods by which we can access

our private server. Method one is to create apublic hostname which resolves to Cloudflare,

which in turn proxies and routes the trafficfor that specific hostname to that

application at the end of our tunnel.

And this method allows anyone,anywhere, on any device to easily access the

application. But that's not enough.

In this scenario we want to implement eventighter security.

So method two is to configure the tunnel toproxy access only to the server IP with no

public DNS record, and only for trusted userswith managed devices that are connected to

the Cloudflare network.

So none of this server has any publicexposure.

Now, to provide access to only databaseadmins,

there are a few things we need to do.

We need to use an internal hostname thatresolves to our server.

We need to connect to the user device to theCloudflare managed network.

And we need to identify who the user is andif their device has a good security posture.

So let's first look at how we do the internalDNS resolution.

Because nobody likes using IP addresses toaccess services with the exception of

So we really should always be usinghostnames.

With Cloudflare, it's as simple as connectinga private DNS service to the network,

and then building a policy that says anyrequest from a user or a network,

anywhere on the Cloudflare network,for an internal domain,

should be answered by that specific DNSservice.

In this example, we're going to connect it toCloudflare using exactly the same tunnel

software that we're using for the databaseserver.

So at this point we have our database admintool that's connected to Cloudflare and we

have an ability to resolve the IP address ofthat private network using an internal

hostname. Next, we need to securely connectthe user device to Cloudflare so that all

traffic destined for our database server isover secure channels.

We do this using a similar piece of softwarewe used on the server,

but one that's designed for user devices.

It supports macOS, windows,Linux, iOS and Android and connects the

device to Cloudflare using a secure tunnel.

But the agent can actually provideinformation about the security posture of the

device, and we'll talk about that later whenwe look at the policy itself.

So once the user device is connected toCloudflare,

requests for private applications areresolved using the internal DNS service,

and traffic is routed from the device throughCloudflare through secure tunnels down to the

private IP the application is running on.

Now we have secured connectivity all the wayfrom the device to the server.

The last thing we need to do is actuallywrite a policy which enforces access only to

users that you authorize,and that the device they're on meets a

certain level of security.

We use information from our device agent,and also leverage your existing identity and

device services to help build that policy.

Cloudflare is typically integrated with oneor more identity providers.

Usually, your company has a central directoryfor employees,

but you can also add more.

For example, you might manage contractors ina different directory.

Cloudflare can also integrate with XDRplatforms such as CrowdStrike and

SentinelOne, and these give us information wecan use in the policy regards to the security

posture of the device,such as if the device is free of malware.

For our own agent, we can provide informationabout the device,

such as is the hard disk encrypted or if thelocal firewall is enabled.

So now we have all the information about theuser,

their device, and how they're connected toCloudflare.

A policy can be created which only allowsusers who have authenticated using a strong

factor, such as MFA using a hard token,that they also exist in a group such as IT

administrators, and they're using a securedevice free of malware.

This policy sits in front of access to boththe database admin tool and the SSH service.

Finally, because you might want to record ofall access to the database administration

tool, you can optionally inject a page afterauthentication asking for justification for

access to the app and that gets audited andlogged in Cloudflare.

So in summary, you've seen an example of howCloudflare can protect access to some of your

critical infrastructure using our SASEplatform.

We can help lock down access to servers onlyfrom highly authenticated users on tightly

managed devices that must be connected toyour new corporate network or managed by

Cloudflare. Well, thanks for watching.

This video is part of a series which explainshow to build your new corporate network using

Cloudflare SASE platform.

You can watch the other videos in this seriesto learn more.

Hi, I'm Simon from Cloudflare.

Congrats on finding this video!

We also cover a wide variety of topicsincluding application security,

corporate networking,and all the developer content the Internet

can hold. Follow us online and thanks forwatching!