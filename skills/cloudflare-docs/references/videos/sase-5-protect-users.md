---
title: SASE - Protect your users from Internet risks
description: The Internet has become part of your corporate network; however, browsing the web comes with hidden risks including malware, phishing attacks, and malicious websites. In this video, we will explore how Cloudflare's Secure Web Gateway (SWG) helps keep users safe by filtering and inspecting Internet traffic in real time. Whether you are protecting a remote workforce or securing an entire organization, Cloudflare ensures that users can access the web securely — without sacrificing speed or productivity.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# SASE - Protect your users from Internet risks

The Internet has become part of your corporate network; however, browsing the web comes with hidden risks including malware, phishing attacks, and malicious websites. In this video, we will explore how Cloudflare's Secure Web Gateway (SWG) helps keep users safe by filtering and inspecting Internet traffic in real time. Whether you are protecting a remote workforce or securing an entire organization, Cloudflare ensures that users can access the web securely — without sacrificing speed or productivity.

Chapters

* ![Introduction to Cloudflare's SASE and the Importance of Secure Corporate Networking](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/48a3b49b7cdfaef0b3044d1530c82c19/thumbnails/thumbnail.jpg?fit=crop&time=1s)  
 **Introduction to Cloudflare's SASE and the Importance of Secure Corporate Networking** 1s
* ![Using Secure Web Gateway to Inspect and Control Internet Traffic](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/48a3b49b7cdfaef0b3044d1530c82c19/thumbnails/thumbnail.jpg?fit=crop&time=66s)  
 **Using Secure Web Gateway to Inspect and Control Internet Traffic** 01m06s
* ![Protecting Users with DNS Filtering and Threat Intelligence](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/48a3b49b7cdfaef0b3044d1530c82c19/thumbnails/thumbnail.jpg?fit=crop&time=124s)  
 **Protecting Users with DNS Filtering and Threat Intelligence** 02m04s
* ![Implementing Network-Level Security Policies for Private and Public Traffic](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/48a3b49b7cdfaef0b3044d1530c82c19/thumbnails/thumbnail.jpg?fit=crop&time=217s)  
 **Implementing Network-Level Security Policies for Private and Public Traffic** 03m37s
* ![Advanced HTTP Filtering and Data Loss Prevention with Cloudflare](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/48a3b49b7cdfaef0b3044d1530c82c19/thumbnails/thumbnail.jpg?fit=crop&time=263s)  
 **Advanced HTTP Filtering and Data Loss Prevention with Cloudflare** 04m23s
* ![Isolating Risky Websites and Preventing Data Leaks with Browser Isolation](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/48a3b49b7cdfaef0b3044d1530c82c19/thumbnails/thumbnail.jpg?fit=crop&time=348s)  
 **Isolating Risky Websites and Preventing Data Leaks with Browser Isolation** 05m48s

  
Transcript

Cloudflare's Connectivity Cloud hosts acomplete Secure Access Service Edge,

or SASE platform, which allows organizationsto create a new corporate network leveraging

the latest in zero trust security approachesand cloud based networking.

Many companies start by connectingapplications,

networks and user devices to Cloudflare touse Zero Trust Network Access,

or ZTNA to authorize users to connect toself-hosted applications and private

networks. But connecting devices and networksinto Cloudflare can also help secure public

Internet access and increase visibility andcontrol over company data.

Let's take a look at an example of a companythat has already connected its corporate HQ

network, along with a few branch offices andmany remote user devices.

You can see that all these methods of onramping traffic to Cloudflare result in user

traffic flowing through our network.

Sometimes the traffic is destined for aprivate application or network,

but a lot of the traffic is just heading forthe public Internet.

Cloudflare has the ability to inspect thattraffic using another part of our SASE

platform, the Secure Web Gateway.

It can examine traffic either at the DNSrequest,

the network level, or we can even inspect thecontents of a HTTP request.

Do you want to deny users from accessingwebsites known to be part of a phishing

campaign or ransomware attack,or only allow users coming from IP addresses

in the US to access your Workday instance?

Or more seriously, do you want to preventemployees from sending sensitive information

like financial data or source code to AIsites like ChatGPT?

Policies in the Secure Web Gateway allow youto achieve this,

and they can be written using a wide varietyof attributes.

We can even isolate a website by running notin the user's browser,

but by rendering it in our headless browser,running on our own network.

And then we send the results down to the userdevice,

and this protects them from any nasty coderunning in that website.

Let's take a look at the different ways ourSecure Web Gateway can help protect your

organization. The first method to protect anyuser or device is to look at their DNS

requests. Some of the most common policiesare simply designed to prevent access to

known high risk websites.

To make your life easier,Cloudflare manages large lists of sites that

are known to be dangerous.

Either they've been found to distributemalware or they're part of a phishing

campaign. All you need to do is include thatcategory in the deny policy,

and users will be blocked from visiting them.

Cloudflare keeps the sites in each categoryup to date.

So we have an amazing view into what's badout there on the Internet.

You could never maintain this amount of datayourself.

Policies can be applied at the user level orbe based on network location.

You might wish to implement a policy thatlimits certain websites depending on the

country the network request is coming from.

You can even subscribe to government cyberdefense lists of known malicious websites.

You can also use a DNS policy to simplifysome of your IT infrastructure.

A policy can override the IP address returnedfrom a DNS request and point to a service

that might be local. For example,you might configure all employee laptops to

use a single hostname for connecting to theoffice printer.

Let's say it's printer dot company dot local.

Then, if a user is attempting to print in theSeattle office,

Cloudflare will replace the IP address forthat host with the local office printer.

But if the same user then travels to theLondon office,

the same laptop makes the same request toprint and Cloudflare replaces the IP address

now for the London printer.

The second method of protection is by usingnetwork policies.

So for all your networks connected CloudflareSASE platform,

it's possible to write simplefirewall-like-rules.

These are often used to allow access tospecific services on private IP addresses.

Say for example, you have a lot of windowsservers running in your corporate network and

you want to ensure only IT admins are allowedto connect to them over RDP.

How? Well, when users access Cloudflare usingour device agent,

network access policies can use identityinformation such as the method of

authentication, what groups the user is in aspart of the policy.

Device security posture can also be takenfrom that device agent,

making sure that IT admins access Windowsservers only using secured company managed

devices. The third and the one with the mostcontrol is HTTP policies,

since it allows you to inspect the actualHTTP traffic.

For devices where a Cloudflare certificatehas been deployed,

the TLS and SSL connection terminates atCloudflare,

where you can inspect the traffic and applyyour policies.

You can build policies that limit theuploading or downloading of files based on

their file type, or prevent HTTP POST or PUTto prevent the certain upload of content to

any websites. We also have a sandboxingfeature where we can use AV scanning to

examine certain files being downloaded andquarantine them if they contain malicious

content. But the true power of inspectingHTTP traffic is when it's combined with our

DLP policies. Here, we can match any part ofthe HTTP request,

either the body of the request or if a filecontains specific content,

and then protect that data from leaving yourorganization or being downloaded to insecure

devices. We have built-in DLP profiles formatching common data,

such as health or financial information,source code or privately identifiable

information such as social security or taxidentifiers.

You can also create your own DLP profiles byeither defining patterns to match sensitive

data, or just by uploading a list of knowncustomer accounts.

Now, when users attempt to download or uploadany content that matches these profiles,

you have the ability to block it.

Sometimes the risk for a website isn't wellknown.

For example, you might deem social mediawebsites to be a little risky,

but your marketing department still requiresaccess.

Newly registered domains might sometimes bepart of a phishing campaign,

or they might just be a legitimate newwebsite.

In these examples, Cloudflare has a reallycool capability.

You can write a policy that when a user makesa request for a website you think is a little

risky, instead of their machine receiving allthe content directly,

we spin up a headless browser on our networkand render the content first.

Here we isolate any potential bad behavior ina secure,

isolated environment. We then send theresults of the render page down to the user's

device, and you can optionally turn on andoff certain capabilities,

such as the ability to enter text into theweb page or download files.

We call this Remote Browser Isolation.

You can also use this service to limit accessto SaaS application data for a certain set of

users. You might, for example,want to allow contractors or partners to have

access to your Salesforce instance,and you can use our Browser Isolation to

prevent copy and paste,printing or downloading of Salesforce data.

So in summary, Cloudflare has a powerfulrange of capabilities to protect users from

the threat of bad actors on the Internet,while also identifying company data and

protecting its use. You can ensure safebrowsing by blocking known malicious

websites, detect when company data is beinguploaded to unapproved cloud storage,

or downloaded to insecure devices.

You can even isolate the entire website sothat users are protected from any dangerous

activity. Well, thanks for watching!

This video is part of a series which explainshow to build your new corporate network using

Cloudflare SASE platform.

Watch the other videos in this series tolearn more.

Hi, I'm Simon from Cloudflare.

Congrats on finding this video!

We also cover a wide variety of topicsincluding application security,

corporate networking,and all the developer content the Internet

can hold. Follow us online and thanks forwatching!