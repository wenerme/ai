---
title: China network - CDN global acceleration for Mainland China
description: In this video, Jess Liu discusses Cloudflares CDN Global Acceleration (formerly China Express), including solutions for high latency on dynamic content, accelerating API calls, accessing Cloudflare One services like WARP and Magic WAN from within mainland China, and securely connecting private enterprise networks.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/videos/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# China network - CDN global acceleration for Mainland China

In this video, Jess Liu discusses Cloudflares CDN Global Acceleration (formerly China Express), including solutions for high latency on dynamic content, accelerating API calls, accessing Cloudflare One services like WARP and Magic WAN from within mainland China, and securely connecting private enterprise networks.

Chapters

* ![Introduction and overview of Cloudflare solutions for China](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/18457868eb13222051618b0d138e0225/thumbnails/thumbnail.jpg?fit=crop&time=0s)  
 **Introduction and overview of Cloudflare solutions for China** 0s
* ![Dynamic content outside of Mainland China](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/18457868eb13222051618b0d138e0225/thumbnails/thumbnail.jpg?fit=crop&time=38s)  
 **Dynamic content outside of Mainland China** 38s
* ![Access to global services](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/18457868eb13222051618b0d138e0225/thumbnails/thumbnail.jpg?fit=crop&time=103s)  
 **Access to global services** 01m43s
* ![Private network connectivity](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/18457868eb13222051618b0d138e0225/thumbnails/thumbnail.jpg?fit=crop&time=174s)  
 **Private network connectivity** 02m54s
* ![China Network use case and solution overview](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/18457868eb13222051618b0d138e0225/thumbnails/thumbnail.jpg?fit=crop&time=223s)  
 **China Network use case and solution overview** 03m43s

  
Transcript

In the last video, we discussed that if your origin is outside of mainland China and has

dynamic content that cannot be cashed within China,

your users may still encounter increased latency,

leading to poor user experience.

In this video, we'll go over three main use cases that we can help address dynamic

content outside of mainland China.

Access to global services and private network connectivity.

So depending on your use case, you can choose what best suits your needs.

Hello, I'm Jez from Cloudflare here to teach you about our Cloudflare solutions for

mainland China. If your origin is outside of mainland China and has dynamic content that

cannot be cached within China, CN Global Acceleration,

formerly known as China Express, can help you with this by leveraging

dedicated private tunnels established through our trusted local partners including JD

cloud, CME and CBC tech, we ensure seamless and efficient content

delivery. Here's how it works.

Traffic received from our China Network data centers is routed to our premium data

centers, which have global acceleration privileges that are designed to handle

dynamic traffic with ease.

This includes typical use cases like web API calls,

as well as more complex scenarios such as dynamic traffic management or multi origin

configurations. For example, customers using Cloudflare SaaS features like

Once processed, the traffic is transferred through a partner's dedicated private tunnel

to the global public internet, ensuring high performance and reliability.

Besides accelerating dynamic content, you can also reliably access Cloudflare One

services like Warp, Magic WAN, and travel SIM cards.

With Warp Global acceleration, Warp client can be extended to China for your

users under Pre-signed agreements to access the same Zero Trust Network access services,

just as the rest of your global users, while experiencing stable connectivity

anywhere within China, no matter if you're at home or a coffee shop.

Once you receive our dedicated China IPS through Cloudflare and have Warp setup up,

all you need to do is override the following.

Warp endpoints for each device.

Warp endpoint API endpoint and endpoint.

Verify the colocation center is your desired location under Warp preferences.

And now you should be able to access global services.

As for users who are temporarily in China, we can offer travel SIM cards,

which connect to our Warp client for a seamless and secure mobile acceleration

abroad. By inserting the SIM card or applying the eSIM to an employee's phone,

corporate devices, whether it be laptops or tablets,

can then connect to their organization's Warp client through mobile hotspot.

Lastly, if your goal is to scale and accelerate private enterprise networks from

China, Magic WAN Global Acceleration can help you with that.

You can securely connect to any traffic source,

such as offices and data centers to Cloudflare network,

while configuring routing policies tailored to your corporate networking needs from

China. To extend Magic WAN into China, we provide a customer premises equipment or a

CPE device which will be shipped to your China based location once the CPE is

connected to the internet in your physical location.

Traffic from users who are using the same internet in that location will be routed

through our dedicated private tunnel to any resource or service to make the process

effortless. Our team will help you in configuring the CPE.

To sum up. Our solutions are designed to meet your specific needs and can be selected a la

carte if you need to optimize dynamic data delivery,

whether it's API calls or to integrations or special use cases within a China network

zone. Cdn global acceleration is the ideal choice.

Looking to connect to global services across China with company enforced policies?

Choose Warp Global Acceleration for managing Enterprise networking or accessing global

services from your China based offices.

Magic WAN global acceleration is your go to solution.

Thanks for watching. You can reach out to our sales team to learn more.