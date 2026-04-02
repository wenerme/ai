---
title: User Guide
description: Network Time Protocol (NTP) is an Internet protocol designed to synchronize time between computer systems communicating over unreliable and variable-latency network paths. Cloudflare offers its version of NTP for free so you can use our global anycast network to synchronize time from our closest server.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/time-services/ntp/usage.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# User Guide

[Network Time Protocol ↗](https://tools.ietf.org/html/rfc1305) (NTP) is an Internet protocol designed to synchronize time between computer systems communicating over unreliable and variable-latency network paths. Cloudflare offers its version of NTP for free so you can use our [global anycast network ↗](https://www.cloudflare.com/network/) to synchronize time from our closest server.

To use our NTP server, change the time configuration in your device to point to `time.cloudflare.com`.

## macOS

To have your Mac to synchronize time from `time.cloudflare.com`:

1. Go to **System Settings**.
2. Go to **General** \> **Date & Time**.
3. Enable **Set date and time automatically**.
4. For **Source**, select **Set...** and enter `time.cloudflare.com` in the text field that appears.
![Screenshot of updating the Date & Time settings on machine running macOS](https://developers.cloudflare.com/_astro/mactime.DBCp2s9r_Rw5nr.webp) 

## Windows

To have your Windows machine synchronize time from `time.cloudflare.com`:

1. Go to **Control Panel**.
2. Go to **Clock and Region**.
3. Click **Date and Time**.
4. Go to the **Internet Time** tab.
5. Click **Change settings..**
6. For **Server:**, type `time.cloudflare.com` and click **Update now**.
7. Click **OK**.
![Screenshot of updating the Date and Time settings on machine running Windows](https://developers.cloudflare.com/_astro/window.g3wVkbhY_Z1SBzSp.webp) 

## Linux

Cloudflare's time servers are included in [pool.ntp.org ↗](https://www.ntppool.org/en/) which is the default time service for many Linux distributions and network appliances. If your NTP client is synchronizing from one of the below servers, you are already using Cloudflare's time services.

* [162.159.200.1 ↗](https://www.ntppool.org/scores/162.159.200.1)
* [162.159.200.123 ↗](https://www.ntppool.org/scores/162.159.200.123)
* [2606:4700:f1::1 ↗](https://www.ntppool.org/scores/2606:4700:f1::1)
* [2606:4700:f1::123 ↗](https://www.ntppool.org/scores/2606:4700:f1::123)

To manually configure your NTP client to use our time service, please first refer to the documentation for your Linux distribution to determine which NTP client you are using and where the configuration files are stored.

For example:

* [Ubuntu ↗](https://ubuntu.com/server/docs/about-time-synchronisation)
* [Debian ↗](https://wiki.debian.org/NTP)
* [RHEL ↗](https://access.redhat.com/documentation/en-us/red%5Fhat%5Fenterprise%5Flinux/7/html/system%5Fadministrators%5Fguide/ch-configuring%5Fntp%5Fusing%5Fthe%5Fchrony%5Fsuite)

Exact configuration will vary by Linux distribution, but below are some example configurations for popular clients:

### [chrony ↗](https://chrony-project.org)

1. Add `time.cloudflare.com` as a server in the configuration file on your system (e.g., `/etc/chrony/chrony.conf`)  
```  
server time.cloudflare.com iburst  
```
2. Restart the chronyd service.  
```  
systemctl restart chronyd  
```

### [systemd-timesyncd ↗](https://man7.org/linux/man-pages/man5/timesyncd.conf.5.html)

1. Add `time.cloudflare.com` to the `[Time]` section of the configuration file on your system (e.g., `/etc/systemd/timesyncd.conf`)  
```  
[Time]  
NTP=time.cloudflare.com  
```
2. Restart the systemd-timesyncd service.  
```  
systemctl restart systemd-timesyncd  
```

### [ntpd ↗](https://linux.die.net/man/5/ntp.conf)

1. Add `time.cloudflare.com` as a server in the configuration file on your system (e.g., `/etc/ntp.conf`)  
```  
server time.cloudflare.com iburst  
```
2. Restart the ntpd service.  
```  
systemctl restart ntpd  
```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/time-services/","name":"Time Services"}},{"@type":"ListItem","position":3,"item":{"@id":"/time-services/ntp/","name":"Network Time Protocol"}},{"@type":"ListItem","position":4,"item":{"@id":"/time-services/ntp/usage/","name":"User Guide"}}]}
```
