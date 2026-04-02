---
title: SASE - Connect and secure from any network to anywhere
description: Build your new corporate network with Cloudflare, connecting any network into our modern SASE platform and secure applications, users, devices and your company data. In this video, you will learn all of the different methods of connecting networks to Cloudflare and what services can be used to improve security and performance.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# SASE - Connect and secure from any network to anywhere

Build your new corporate network with Cloudflare, connecting any network into our modern SASE platform and secure applications, users, devices and your company data. In this video, you will learn all of the different methods of connecting networks to Cloudflare and what services can be used to improve security and performance.

Chapters

* ![Introduction to SASE and the Need for Modern, Secure Corporate Networking](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/86f22d1f760b77cdc349f89b25b63c3e/thumbnails/thumbnail.jpg?fit=crop&time=0s)  
 **Introduction to SASE and the Need for Modern, Secure Corporate Networking** 0s
* ![Using Cloudflare to Unify and Secure Corporate Networks Across Multiple Locations](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/86f22d1f760b77cdc349f89b25b63c3e/thumbnails/thumbnail.jpg?fit=crop&time=117s)  
 **Using Cloudflare to Unify and Secure Corporate Networks Across Multiple Locations** 01m57s
* ![Enabling Secure Remote Access for Distributed Teams with Cloudflare's Zero Trust Approach](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/86f22d1f760b77cdc349f89b25b63c3e/thumbnails/thumbnail.jpg?fit=crop&time=167s)  
 **Enabling Secure Remote Access for Distributed Teams with Cloudflare's Zero Trust Approach** 02m47s
* ![Integrating Private Networks and Data Centers using various methods](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/86f22d1f760b77cdc349f89b25b63c3e/thumbnails/thumbnail.jpg?fit=crop&time=257s)  
 **Integrating Private Networks and Data Centers using various methods** 04m17s
* ![Cloudflare's Connectivity Cloud: Security, Performance, and Simplified Network Management](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/86f22d1f760b77cdc349f89b25b63c3e/thumbnails/thumbnail.jpg?fit=crop&time=317s)  
 **Cloudflare's Connectivity Cloud: Security, Performance, and Simplified Network Management** 05m17s

  
Transcript

When looking at Secure Access Service Edge orSASE platforms,

we often talk about a user getting remoteaccess into some privately hosted

application. The focus is often user toapplication,

where the goal is network micro-segmentation,

and a user can only access an applicationover a specific address and port.

But corporate networks exist to carry trafficin many other ways.

Let's take, for example,a retail coffee company with many coffee

shops each providing customers free access tothe Internet with their guest Wi-Fi,

but also connecting employees to internalapplications.

Each shop also houses point of sale devices,security cameras,

and other network enabled equipment that needaccess to the Internet,

but also might require access to otherprivate networks to back up data or be

monitored by internal tools.

IT staff also need to remotely access thesedevices from a corporate office network.

A lot of this traffic is private and shouldonly remain on the corporate network.

This is where Cloudflare's Connectivity Cloudreally comes into its own.

The ability to mesh together differentnetworks,

applications and users no matter where theyare.

Let's dive deeper into our coffee companyexample.

Right. First, they have their mainheadquarters in Seattle.

Most HQ employees live locally and about halftravel into the office,

with the other half working remote at home.

each with a few employees in each.

And then they have an internal company wiki,which is running in a virtual environment in

Amazon Web Services with its own virtualprivate network.

And then finally, the security cameras at alltheir coffee shops need to back up data to a

central service that you've got running onservers that you run and host in a rack in a

data center in San Jose.

You see how these network locations are allquite different.

Cloudflare has a variety of ways all thesenetworks can be connected together.

Let's start by connecting the headquartersnetwork in Seattle.

We can use something called Magic WAN,which is our service that creates IPsec

tunnels from the headquarters office back tothe Cloudflare network and assign a private

network range to it. This is using regularstandard IPsec protocols and can easily

leverage functionality in a network,router or firewall that exists at

headquarters. Next, let's look at each coffeeshop.

You can ship out to each location a physicaldevice running Cloudflare's Magic WAN

connector. It's essentially a lightweightappliance that can be plugged into the local

ISP router. Each connector creates an IPsecconnection back to Cloudflare,

and each device can be administered remotelyvia the Cloudflare dashboard private network.

Ranges can then be assigned to each coffeeshop.

And now we have the beginnings of a newmodern corporate network.

So IT admins in the Seattle office can nowremotely access point of sale devices in each

coffee shop location. Also,because we want to provide customers in each

shop free Internet access using the guestWiFi,

all traffic from that location is now routedthrough Cloudflare,

and we can use our secure web gateway toblock any access to malicious websites,

and this keeps customers safe while they siptheir cappuccinos.

But what about the IT staff working fromhome?

They're not connected to any of thesenetworks. No worries!

They can use our device agent,which connects them to Cloudflare,

and in turn gives them access to this newcorporate network as if they were connected

in headquarters. Now it can manage thedevices in each coffee shop,

no matter if they're on a plane,sitting in an office,

or in a coffee shop. When each network oruser connects,

it does so to the nearest Cloudflare datacenter,

which is a key feature of our network wherewe use Anycast IP networking to ensure secure

connections to users and offices are made tothe geographically nearest Cloudflare data

center, so that traffic is then secured andoptimized as close as possible to the user or

peering relationships,allowing us to ensure fast connectivity from

user to the network. Think of it like havinga coffee shop in every neighborhood so

everyone doesn't have to walk far to get acup of coffee.

But what about those camera backups?

Remember, the backup service is running in adata center in San Jose.

Most likely than not. Cloudflare is alsorunning our own servers in the same data

center, and you can offer direct connectionsfrom Cloudflare to your network switches,

further extending your corporate network.

And even if your servers are not in the exactsame data center,

we can create a virtual connection directlyfrom your rack to the nearest Cloudflare data

center. Now we've got everything connected.

Let's add a new application into the mix.

Let's say the company is launching a newinternal company wiki,

and they're running the service in AWS,Amazon Web Services.

We don't need to connect the entire AWSprivate network.

We just install a software agent on the wikiserver that creates a secure tunnel back to

Cloudflare, and connects that application tothe network,

that anyone on that network can now accessthe application policies and Cloudflare

control who can access the wiki,ensuring users authenticate with valid

credentials and are using secured devices.

You can see that Cloudflare is able toconnect to a wide variety of networks,

from the physical office locations to virtualapplication networks in the cloud,

as well as direct your servers running inyour data centers.

So much of the complexity from legacy networkarchitectures is abstracted into our

Connectivity Cloud , making life much easierfor IT and network admins.

And once connected to Cloudflare,it's not just about routing traffic.

Firewalling, DNS, Load Balancing,protecting from denial of service attacks,

content caching, and a lot more are alleasily enabled.

Any traffic destined for the Internet canalso be filtered to ensure only access to

legitimate sites, and blocking any unsafetransfer of company data.

The flexibility of Cloudflare's ConnectivityCloud allows you to connect all sorts of

networks and applications and users.

It's possible to recreate your classiccorporate network and then apply on top of it

all the modern Zero Trust services to ensurehigh security without compromising the user

experience. Well, thanks for watching.

This video is part of a series which explainshow to build your new corporate network using

Cloudflare SaaS platform.

Watch the other videos in this series tolearn more.

Hi, I'm Simon from Cloudflare.

Congrats on finding this video.

We also cover a wide variety of topicsincluding application security,

corporate networking,and all the developer content the Internet

can hold. Follow us online and thanks forwatching!