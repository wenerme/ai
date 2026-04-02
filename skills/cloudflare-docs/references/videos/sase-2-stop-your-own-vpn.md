---
title: SASE - Stop hosting your VPN service
description: Cloudflare's SASE platform can replace your traditional, expensive VPN appliances, which deliver poor performance for users and create more security risks than solve them. Cloudflare's Zero Trust Network Access (ZTNA) service is a more secure, highly scalable cloud solution. In this video, we look at how easily you can deploy Cloudflare to secure access to internal resources.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# SASE - Stop hosting your VPN service

Cloudflare's SASE platform can replace your traditional, expensive VPN appliances, which deliver poor performance for users and create more security risks than solve them. Cloudflare's Zero Trust Network Access (ZTNA) service is a more secure, highly scalable cloud solution. In this video, we look at how easily you can deploy Cloudflare to secure access to internal resources.

Chapters

* ![Introduction to Corporate Network Security and Access Challenges](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/0410c73fe3fdd36142ec08bac77e8f97/thumbnails/thumbnail.jpg?fit=crop&time=0s)  
 **Introduction to Corporate Network Security and Access Challenges** 0s
* ![Cloudflare's SASE Approach to Securing Internal Applications](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/0410c73fe3fdd36142ec08bac77e8f97/thumbnails/thumbnail.jpg?fit=crop&time=75s)  
 **Cloudflare's SASE Approach to Securing Internal Applications** 01m15s
* ![Connecting Internal Applications to Cloudflare with Secure Tunnels](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/0410c73fe3fdd36142ec08bac77e8f97/thumbnails/thumbnail.jpg?fit=crop&time=114s)  
 **Connecting Internal Applications to Cloudflare with Secure Tunnels** 01m54s
* ![Implementing Identity-Based, Clientless Access Control Access Control](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/0410c73fe3fdd36142ec08bac77e8f97/thumbnails/thumbnail.jpg?fit=crop&time=162s)  
 **Implementing Identity-Based, Clientless Access Control Access Control** 02m42s
* ![Leveraging Anycast Networking for Faster and More Secure Application Access](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/0410c73fe3fdd36142ec08bac77e8f97/thumbnails/thumbnail.jpg?fit=crop&time=336s)  
 **Leveraging Anycast Networking for Faster and More Secure Application Access** 05m36s
* ![Enhancing Security with Micro-Segmentation and Cloudflare's Global Network](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/0410c73fe3fdd36142ec08bac77e8f97/thumbnails/thumbnail.jpg?fit=crop&time=419s)  
 **Enhancing Security with Micro-Segmentation and Cloudflare's Global Network** 06m59s

  
Transcript

Corporate networks are often used to allowemployees to access sensitive information in

private, self-hosted applications,such as an internal wiki,

a HR system, or a source code repository.

While some applications have migrated intothe cloud as SaaS apps,

there are still applications that are run andmaintained by IT.

These days, most of these self-hostedapplications run in a web server and are

deployed either in a private data center orin a public cloud such as AWS,

Azure, or Google. Access to theseapplications is usually limited to internal

employees, but it's common to allow some formof restricted access to partners or

contractors. The old way of doing things wasto have users either come into a physical

office or connect remotely via a VPN,giving them access to that corporate network

so they could access the application.

But these VPN solutions use on premiseshardware appliances through which every user

request passes, creating a bottleneck and asecurity risk.

In fact, recently, many on premises VPNvendors such as Cisco,

Checkpoint, and Fortinet have reported a widerange of vulnerabilities which requires IT

and security teams to scramble to updatetheir systems.

But there's another way to do this.

Did you know that Cloudflare can be used toeasily create secure access to these

self-hosted applications using our SASEplatform?

That's part of our connectivity cloud?

Well, similar to how a legacy VPN works,but using a much,

much more modern cloud approach.

Let's take a look at how we improve on theold way of doing things,

and create greater security for applicationaccess.

The first objective is to create connectivitybetween the user's browser and the

application. Right. So there are two parts tothis. The connection from Cloudflare to the

app and the connection between the user andCloudflare.

Cloudflare is going to sit in the middle andapply security policies and use its vast

network to protect the application andimprove response times.

For the first part, to create connectivityfrom Cloudflare to the app,

we use tunnels that a variety of differentmethods you can use.

You can connect on premises networks toCloudflare via IPsec or GRE tunnels,

typically using your existing networkhardware,

or if your applications are running at a datacenter where Cloudflare already has its

servers, we can connect directly from yourservers to our servers inside that data

center. But for this example,we're going to talk about using a software

agent. It's just a small daemon that isinstalled either directly on the application

server or runs on a dedicated server on thesame local network.

The software then creates a secure tunnelback to Cloudflare.

This tunnel maintains a constant connectionto two Cloudflare data centers,

so it's always available,and now your traffic can flow between your

Cloudflare network and the application.

Now for the second part,we need to connect your users to Cloudflare,

which we're going to do in this example usingpublic DNS.

We'll associate a public hostname with theapplication.

Request to this hostname will resolve toCloudflare,

which in turn proxies and routes traffic downthe tunnel to the application,

but hold on a second. A public DNS record anda tunnel directly to the server?

If we didn't take this any further,we could now access this internal application

from anywhere just by heading to the newpublic hostname.

What we need to do is add authentication andauthorization into the mix.

Because Cloudflare is now in front of accessto the application,

we can integrate with your existing companyidentity providers.

So anyone attempting to access is firstredirected to your identity provider to

authenticate. Now this is where it getsinteresting because you can add multiple

identity providers in front of the sameapplication.

So for example, you might use your maincompany directory where all your employee

accounts reside, but you might also integratea separate identity service just for

contractors, partners and other third partyusers.

We also support consumer identity providerssuch as Facebook,

Google or GitHub. In fact,any SAML or OAuth identity service can be

used. Now, these identity integrations don'tjust provide authentication.

It's possible to import user and groupinformation.

Which brings us on to the next step.

Now that we've ensured a user hasauthenticated,

we can start to leverage their identityinformation and other data to create an

access policy that defines who should andshould not get access to the application.

Let's build a policy here in real time.

A range of different attributes can be usedthat define who is allowed or denied access.

We started by adding an identity provider,so users first need to authenticate.

Let's take it a little further and leveragegroup information from the same identity

service. We can say only users in the fulltime employees group have access to the

internal wiki. The identity service can alsotell us how they authenticated.

So let's add that to our policy.

The requirement that they must haveauthenticated using MFA or multi-factor

authentication. In fact,let's say that they have to specifically use

a hard token such as a FIDO certified key.

Finally, we only want users working fromCanada,

the US or Germany to access the application.

So let's add to the policy that only trafficcoming from IP addresses geolocated in those

countries is allowed. Now,full time employees working from somewhere in

Canada who have authenticated using a strongset of credentials will be able to access the

company wiki. Let's take a look at this inaction.

The user just needs to navigate to the publichostname,

authenticate, and bingo!

They have access from anywhere in the worldwith only a browser to our privately hosted

application. Simple. What a difference fromthe old way of doing things.

Also, it's important to note that all trafficfrom browser to application is secured using

standard TLS and SSL encryption,keeping the application data safe.

Let's turn our attention a little bit toperformance.

We already mentioned that Cloudflare is a lotmore efficient than a traditional VPN.

Let's think about somebody in Germany tryingto access the wiki.

Cloudflare uses something called Anycastnetworking,

which means that a request to the hostnamewill resolve to the nearest Cloudflare data

allowing us to ensure fast connectivity fromuser to application.

So our user in Germany might on ramp toCloudflare at a data center in Berlin,

whereas our Canadian user might on ramp inVancouver,

and their requests are authenticated and thepolicy evaluated all close to the end user

and if authorized, their request is thenrouted via the most efficient network path to

the Cloudflare data center that is thennearest the application.

To further improve performance,there are many more things we can do.

Any of Cloudflare's existing performanceservices and network benefits apply to your

application traffic. So,for example, we can leverage Cloudflare's

caching technologies so that any static datafrom the wiki such as images,

files, videos is all cached locally at thedata center that the user is accessing.

Something your old VPN could never do.

Setting up access like this can be typicallydone in less than an hour,

and it doesn't take long to migrate an entirecompany's internal application

infrastructure. Unlike your VPN,access to each application only exposes that

specific service. You don't need to worryabout firewalling off SSH and RDP,

because Cloudflare is only allowing access tothe specific application over HTTPS.

This is called network micro-segmentation andreally reduces concerns of access gained by

lateral movement. Changes to authenticationpolicies can easily be made in our dashboard

and in just a matter of seconds,the entire global network is updated.

Well, thanks for watching.

This video is part of a series which explainshow to build your new corporate network using

Cloudflare SASE platform.

Watch the other videos in this series tolearn more.

Hi, I'm Simon from Cloudflare.

Congrats on finding this video.

We also cover a wide variety of topicsincluding application security,

corporate networking,and all the developer content the Internet

can hold. Follow us online and thanks forwatching!