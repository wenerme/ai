---
title: SASE - The evolution of corporate networks
description: In this video, we discuss Cloudflare One, our Secure Access Service Edge (SASE) platform and how it has been designed to revolutionize the corporate network and enable companies with their Zero Trust strategy. Legacy network design is struggling to address today's challenges of security, performance, and monitoring needs. Many IT teams are trying to evolve their corporate network with point solutions and finding the lack of integration and performance an issue.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# SASE - The evolution of corporate networks

In this video, we discuss Cloudflare One, our Secure Access Service Edge (SASE) platform and how it has been designed to revolutionize the corporate network and enable companies with their Zero Trust strategy. Legacy network design is struggling to address today's challenges of security, performance, and monitoring needs. Many IT teams are trying to evolve their corporate network with point solutions and finding the lack of integration and performance an issue.

Chapters

* ![Introduction to SASE and Modern Corporate Networking](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/a4ede34e937c81781575af6494828b5b/thumbnails/thumbnail.jpg?fit=crop&time=0s)  
 **Introduction to SASE and Modern Corporate Networking** 0s
* ![The Evolution of Corporate Networks and Security Challenges](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/a4ede34e937c81781575af6494828b5b/thumbnails/thumbnail.jpg?fit=crop&time=68s)  
 **The Evolution of Corporate Networks and Security Challenges** 01m08s
* ![Why Legacy Solutions Like VPNs and SD-WAN Are Insufficient](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/a4ede34e937c81781575af6494828b5b/thumbnails/thumbnail.jpg?fit=crop&time=185s)  
 **Why Legacy Solutions Like VPNs and SD-WAN Are Insufficient** 03m05s
* ![How Cloudflare's Global Network Powers SASE Solutions](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/a4ede34e937c81781575af6494828b5b/thumbnails/thumbnail.jpg?fit=crop&time=253s)  
 **How Cloudflare's Global Network Powers SASE Solutions** 04m13s
* ![The Role of Cloudflare's Connectivity Cloud in Securing Enterprises](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/a4ede34e937c81781575af6494828b5b/thumbnails/thumbnail.jpg?fit=crop&time=328s)  
 **The Role of Cloudflare's Connectivity Cloud in Securing Enterprises** 05m28s
* ![Simplified Security, Network Optimization, and Cost Savings with Cloudflare](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/a4ede34e937c81781575af6494828b5b/thumbnails/thumbnail.jpg?fit=crop&time=375s)  
 **Simplified Security, Network Optimization, and Cost Savings with Cloudflare** 06m15s

  
Transcript

Hi, I'm Simon here at Cloudflare,and I'm going to talk about our SASE platform

to help you modernize your corporate network.

Many company networks have been built ontechnology that simply can't cope with

today's security, performance and monitoringneeds.

The demands on a corporate network haveevolved dramatically over the past few years.

Those working in IT and networking are reallystruggling with the fact that users,

their devices, and the applications and datathey need to access are distributed all over

the place, beyond the perimeter of theclassic corporate network.

They're trying to address this problem withlegacy approaches, which increase cost and

complexity, and can result in a solution thatdoesn't perform that well,

leading to really irritated users.

So in response to these challenges,the concept of SASE has evolved.

It stands for Secure Access Service Edge.

It's a new approach to networking andsecurity,

which reduces complexity,as well as bringing stronger access controls

and improved performance for the protectionof applications,

users, devices and your company data.

But how does it work? First,let's go back and let's look at how

networking and security solutions used to bedesigned.

Decades ago, employees would travel into anoffice and use the company's local network,

which was made up of that network,plus also connections to branch offices,

maybe a data center, and various otherlocations via private leased lines using

technologies such as MultiProtocol LabelSwitching or MPLS.

You are paying for expensive privateconnectivity with dedicated bandwidth,

and typically all Internet access wasbackhauled through these connections to a

single data center, where firewalls andproxies would then inspect the traffic and

apply the security controls.

But over time, as the available Internetbandwidth increased for less cost,

the need for these dedicated lines diminishedand software defined networks,

commonly known as SD-WAN became popular,helping businesses better manage traffic and

optimize usage of cheaper Internet basedIPsec tunnels versus these expensive leased

lines. However, SD-WAN still left businessesmanaging complex on premises appliances and

having to deal with configuration changes andsoftware updates.

Also, firewalls associated with these SD-WANappliances were relatively limited and often

paired with extra hardware for a morecomplete security solution.

While all this was going on,the proliferation of devices such as laptops

and smartphones were allowing employees towork from anywhere,

so VPNs were added into the mix,where people could dial up to the VPN and

access their company network. Often all theirInternet access was also funneled through

these VPN connections,so the same security policies office users

had would also be applied to the remote usertraffic and it all came back through that

company data center. And this approach isreally hard to manage with multiple vendors

and different appliances and differentdashboards to configure the policies across

all these technologies,and they're not really designed to work well

in the modern distributed workplace.

But today, it's not just users and devicesthat have left the office and company

network, but the applications and data liveall over the place as well.

They've migrated out of the data center intocloud infrastructure such as AWS,

Azure and Google. Some applications have beencompletely reimagined as SaaS apps,

where companies no longer run the servers,but just rent access to tenants in large

software deployments,you know, such as Salesforce or Workday and

Zoom. And users are not just taking a shorttrip away from the office anymore.

Some people don't even visit one.

They're working from home,in coffee shops, even on airplanes.

And sometimes they might visit an office,yet the same needs still exist:

the right person should get access to theright applications and data.

Latency or the performance of the applicationshould be really high quality and all while

using secure devices and being protected fromInternet threats such as phishing campaigns

and ransomware attacks.

Because of this constant need for everyone toaccess anything from anywhere,

SASE architectures evolved where theintelligence in the network has migrated out

of these on premises appliances and now intomassively scalable global cloud networks.

So how does Cloudflare SASE platform work?

Well, first, and probably most importantly,we've built a massive network spread all over

the globe. We've deployed thousands ofservers in data centers in hundreds of

cities, creating peering relationships withthousands of other networks.

On top of all of that,we've ensured that we have connectivity in

all the important Internet exchanges.

These are places where all the bigconnectivity of the Internet is shared.

To give you an idea of the scale of this hugenetwork,

and it can deal with the largest denial ofservice attacks that have ever been seen.

The scale and performance of this network isreally important because from a SASE

perspective, you're going to be routing allyour user,

device and network traffic into it.

Every server in our network runs all thecapabilities you need to inspect and secure

traffic. So access controls,traffic routing,

caching, all run on the server that your useror network is connecting to.

So now, instead of all the security controlsand network logic spread across a variety of

different vendors and appliances and servicesthat you're having to maintain,

it's centralized in a cloud service thatoperates and points all over the globe,

so that each user or network is connected toa fast local data center.

And Cloudflare SASE platform is part of agreater connectivity cloud.

So what's a connectivity cloud?

It's a unified platform of cloud nativeservices that spans networking,

security and application performance,and it's designed to help companies regain

control over their technology infrastructure.

Our connectivity cloud goes way beyond justprotecting employees and their access to

company resources. It's also used to protectpublic assets like websites and APIs.

In fact, we run one of the world's fastestDNS servers.

We've even exposed the underlying componentsof our platform,

letting developers write and run their codedirectly on our network.

Then they can extend our existing services orbuild entirely new applications,

leading you to an infinite amount of thingsyou can build.

So to summarize Cloudflare SASE platform,which runs in our connectivity cloud,

allows companies to reimagine their companynetwork.

Users connect to Cloudflare's global networkvia a data center that's close to them,

and that server then ensures that they don'taccess phishing sites on the Internet, or it

gives them secure access to an internalcompany application.

All of this is happening in millisecondsacross our vast network.

Because we can deliver all these capabilitiesin a single platform instead of different

vendor solutions, it means that companies cancentralize all that management into a single,

well-integrated dashboard.

This ultimately drives down your cost lesstime used to manage the services,

less or often no hardware to purchase andmaintain,

and it's cheaper to purchase the actual finalsolution.

Well, thanks for watching.

This video is part of a series which explainshow to build your new corporate network using

Cloudflare SASE platform.

Watch other videos in this series to learnmore.

Hi, I'm Simon from Cloudflare.

Congrats on finding this video.

We also cover a wide variety of topicsincluding application security,

corporate networking,and all the developer content the Internet

can hold. Follow us online and thanks forwatching!