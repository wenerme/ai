---
title: WARP - Understand Cloudflare WARP through diagnostic logs
description: In this more advanced episode, we explain how to use warp-diag files to identify and resolve connection issues with the WARP client. You will learn how to locate and interpret three key files - warp-status, warp-settings, and daemonlog. The video also provides troubleshooting tips, including specific keyword searches and guidance on how to cross-reference logs to identify a bigger picture of the problem.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/videos/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# WARP - Understand Cloudflare WARP through diagnostic logs

In this more advanced episode, we explain how to use warp-diag files to identify and resolve connection issues with the WARP client. You will learn how to locate and interpret three key files - warp-status, warp-settings, and daemonlog. The video also provides troubleshooting tips, including specific keyword searches and guidance on how to cross-reference logs to identify a bigger picture of the problem.

Chapters

* ![00:00 Introduction"](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=0s)  
 **00:00 Introduction"** 0s
* ![What are warp-diag files?](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=44s)  
 **What are warp-diag files?** 44s
* ![How to download and navigate warp-diag files](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=76s)  
 **How to download and navigate warp-diag files** 01m16s
* ![warp-statustxt](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=126s)  
 **warp-statustxt** 02m06s
* ![warp-settingstxt](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=149s)  
 **warp-settingstxt** 02m29s
* ![daemonlog](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=217s)  
 **daemonlog** 03m37s
* ![Additonal tips](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=487s)  
 **Additonal tips** 08m07s
* ![Conclusion](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=523s)  
 **Conclusion** 08m43s

  
Transcript

Hi, I'm Jess from Cloudflare.

Welcome. This is a WARP troubleshooting videowhere you'll learn how to interpret warp-diag

files. This is a more advanced episode,so if you come across any concepts you aren't

fully familiar with, we also have a WARPbasics video that brings you up to speed.

And as always, our support team will be hereto help.

Here's what we will go through.

What are warp-diag files?

How to download and navigate the warp-diagfiles,

warp-status file, warp-settings file,daemon.log file,

and a few additional tips for analyzing them.

Let's get started. So what are warp-diagfiles?

They contain valuable information about thedevice connection status,

configuration, and WARP logs.

These files are your first line of defensewhen troubleshooting any issues.

Each of these files serves different purposesand contains specific information,

such as combination of logs and outputscreated when warp-diag runs.

Now where are the WARP files?

When WARP is installed,a command line tool called warp-diag is also

installed. Simply running the commandwarp-diag in a terminal will generate a zip

file and place it on the user's desktop.

Each time warp-diag is run,a new set of logs will be generated,

and now we can start by unzipping the fileproduced by warp-diag and opening its content

in a text editor. I'm using VS Code here,but any other text editor will also work.

In this video, we'll only look at threeparticularly useful ones for initial

troubleshooting: warp-status,warp-settings,

and daemon.log. So now I'll walk you througheach of these files and tell you why they're

useful for troubleshooting.

First, let's take a look at warp-status.

This file is straightforward.

It contains the status of the client whenwarp-diag was executed.

The connection status is useful to know whenyou're analyzing any files that are outputs

of common command line tools such as listinginterfaces,

printing the routing table,and current DNS configuration.

And that's it! On to warp-settings.

This file contains all of the currentlyactive settings configured for the device,

such as the modes and device profile.

This file can help verify if the settingsyou're making in a dashboard are actually

being applied locally.

We should always check this file to see ifthere are any unexpected values.

For example, let's say the user you'retroubleshooting for is expected to have a

specific device profile like office users,meaning their devices should be connected to

a corporate network. First,confirm that warp -settings has the correct

profile ID. If the profile ID is not theexpected value,

this might be an indication that the userisn't matching the rules you've defined in

your Cloudflare device profile settings.

Also, if any specific changes have been madeto the device profile settings,

you can use this file to ensure the user isreceiving those updates.

For example, if you've updated a deviceprofile to use the MASQUE tunneling type

instead of WireGuard,you can verify that the user has received

that update and will indeed attempt toconnect via MASQUE.

Daemon.log is a fairly detailed file thatcontains everything going on in WARP,

such as the debug logs.

But before we open the file,what is the WARP daemon?

It's the background process of WARP,also known as service,

depending on your operating system.

When WARP is installed,it's installed as both daemon,

the background process,and as a GUI, which is the interface you see

here. The GUI, warp-diag and warp-cli can allcommunicate with the Daemon.

There are multiple Daemon.log files and theirname chronologically.

Let's go over the file now.

Line by line, we'll look at how daemon.logshould look like when WARP connects as

expected. When WARP starts,it prints out its version information,

so we'll start there. Search for the string"warp \_ service :

Version :" and look for the most recententry.

That should be your current session.

Our team is optimizing warp-diag constantly,so the string we mentioned in this video

might change slightly in the future.

The registration contains all the necessaryinformation to connect the WARP client,

which is stored securely on the machine.

If the GUI detects a missing registration,it may attempt to obtain one if configured to

do so. Otherwise, it'll display missingregistration.

Once the registration is loaded,WARP will attempt to connect,

but only if configured to do soautomatically.

Otherwise, it will only attempt to connect ifit was previously connected.

After registration, WARP will then retrievethe device profile remotely via an API.

This includes the device configurations andmode that will be used.

It's very important to be aware that thedevice profile can be further influenced by a

local configuration file,which is used by an MDM provider,

such as Intune or Kandji.

For more information on Cloudflare MDMconfiguration,

you can refer to our documentation.

At this point, which components connect isdetermined by the mode.

If the mode contains the Tunnel component,for example Secure web gateway without DNS

filtering, we'll see "Initiate WARP." if themode contains the DNS component like Gateway

with DoH, we'll see "Initiate DNS".

If it contains both, like Gateway with WARPwill eventually see both.

Let's now review each.

Starting with initiate WARP for modes withthe Tunnel component.

The Tunnel component includes a firewall.

It starts off by allowing the tunnel endpointthrough the firewall and attempting to

This makes sure the end user will beconnected as fast as possible,

and this process is called Happy Eyeballs.

Once connected, a network interface iscreated and it begins the task of updating

the routing table and the firewall accordingto the exclude or include split tunnel

entries. These entries can be either domainsor IPs.

WARP will update the routing tableimmediately for any IPs,

but for domains, it will rely on a DNSresolution for these domains and will update

the routing table upon completion.

Once that's completed,WARP performs two connectivity tests,

one in the tunnel and one out of the tunnel.

Moving on to initiate DNS and this is formodes with DNS component.

For DNS, WARP will set itself as the defaultDNS global provider,

and forward all DNS requests to Cloudflarevia DNS over HTTPS or DoH.

And in order to do that,the following sequence needs to complete

successfully. First, attempt to connect tothe DoH endpoint.

Second, receive a DNS response from that DoHendpoint.

Fourth, update the system to use these IP'sas the DNS provider.

If all four steps happen without error,WARP then performs a series of DNS

connectivity checks. These are end to endtests which confirm that WARP is successfully

receiving DNS requests,forwarding them to Cloudflare for resolution,

and receiving a valid response.

Here are some additional tips to maketroubleshooting easier.

You should use the search function in yourtext editor to quickly locate terms like

error, DNS, or disconnected.

Also look for patterns such as repeatedentries.

These can point to specific issues.

And finally cross-referencing files from warp-settings,

warp-s tatus and daemon.log can revealinsights and a bigger picture.

For example, if warp -status showsdisconnected,

check daemon.log for error details and warp-settings for potential misconfigurations.

There are other files that provide morespecific information depending on your issue.

Our team is optimizing warp-diag constantly,so you might find more files in the future.

For an updated view on what you can find inwhich file,

check out our troubleshooting guide. You nowunderstand the basics of warp-diag .

If you're still experiencing issues afterfollowing these steps,

don't hesitate to reach out to our supportteam.

We're always here to help.

Thanks for watching and see you soon.