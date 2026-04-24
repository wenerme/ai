---
title: Android
description: Learn how to set up Cloudflare's 1.1.1.1 DNS resolver on Android devices. Encrypt DNS queries with DoT or DoH, and enable 1.1.1.1 for Families.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/1.1.1.1/setup/android.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Android

[1.1.1.1: Faster Internet ↗](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone) is the preferred method of setting up 1.1.1.1 DNS resolver and 1.1.1.1 for Families. It allows you to automatically configure your phone to use 1.1.1.1 on any network you connect to.

The app also allows you to enable encryption for DNS queries or enable [WARP mode](https://developers.cloudflare.com/warp-client/), which keeps all your HTTP traffic private and secure, including your DNS queries to 1.1.1.1.

You can select between the options available in the app settings. By default, 1.1.1.1: Faster Internet is configured to WARP mode.

## Set up 1.1.1.1: Faster Internet

1. Download [1.1.1.1: Faster Internet from Google Play ↗](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone) for free.
2. Launch 1.1.1.1: Faster Internet and accept the Terms of Service.
3. Toggle the **WARP** button to **Connected**.
4. Install the VPN profile that allows your phone to connect securely to 1.1.1.1.

Your connection to the Internet and your DNS queries are now protected.

### Enable 1.1.1.1 for Families

1. Open 1.1.1.1: Faster Internet.
2. Tap the **menu button**.
3. Select **Advanced** \> **Connection options**.
4. In **DNS settings** \> **1.1.1.1 for Families**, select the option you want to use.

## Configure 1.1.1.1 manually

### Android 11 or later

Android 11 or later versions support both DNS over TLS (DoT) and DNS over HTTPS (DoH).

1. Go to **Settings** \> **Network & internet**.
2. Select **Advanced** \> **Private DNS**.
3. Select the **Private DNS provider hostname** option.
4. Depending on what you want to configure, use one of the following DNS hostnames or [IP addresses](https://developers.cloudflare.com/1.1.1.1/ip-addresses/) and select **Save**.

Use 1.1.1.1 resolver

* `one.one.one.one`

Or the corresponding IP address if your device requires it:

* **IPv4**: `1.1.1.1` or `1.0.0.1`
* **IPv6**: `2606:4700:4700::1111` or `2606:4700:4700::1001`

Block malware with 1.1.1.1 for Families

* `security.cloudflare-dns.com`

Or the corresponding IP address if your device requires it:

* **IPv4**: `1.1.1.2` or `1.0.0.2`
* **IPv6**: `2606:4700:4700::1112` or `2606:4700:4700::1002`

Block malware and adult content with 1.1.1.1 for Families

* `family.cloudflare-dns.com`

Or the corresponding IP address if your device requires it:

* **IPv4**: `1.1.1.3` or `1.0.0.3`
* **IPv6**: `2606:4700:4700::1113` or `2606:4700:4700::1003`

### Android 9 or 10

Android 9 and Android 10 support DNS over TLS to secure your queries through encryption. In Android, this option is called Private DNS. It prevents your queries from being tracked, modified or surveilled by third-parties. Unlike previous versions of Android, this method also ensures 1.1.1.1 does not need to be configured for each new Wi-Fi network your smartphone joins.

1. Go to **Settings** \> **Network & internet**.
2. Select **Advanced** \> **Private DNS**.
3. Select the **Private DNS provider hostname** option.
4. Enter `one.one.one.one` and select **Save**. Or consider the following options if you want to use 1.1.1.1 for Families.

Block malware with 1.1.1.1 for Families

* `security.cloudflare-dns.com`

Or the corresponding IP address if your device requires it:

* **IPv4**: `1.1.1.2` or `1.0.0.2`
* **IPv6**: `2606:4700:4700::1112` or `2606:4700:4700::1002`

Block malware and adult content with 1.1.1.1 for Families

* `family.cloudflare-dns.com`

Or the corresponding IP address if your device requires it:

* **IPv4**: `1.1.1.3` or `1.0.0.3`
* **IPv6**: `2606:4700:4700::1113` or `2606:4700:4700::1003`

### Previous Android versions

Before making changes, take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.

1. Open **Settings** \> **Wi-Fi**.
2. Press down and hold the name of the network you are currently connected to.
3. Select **Modify Network**.
4. Select the checkbox **Show Advanced Options**.
5. Change the IP Settings to **Static**.
6. Depending on what you want to configure, choose one of the following DNS addresses for IPv4:  
Use 1.1.1.1 resolver  
```  
1.1.1.1  
1.0.0.1  
```  
Block malware with 1.1.1.1 for Families  
```  
1.1.1.2  
1.0.0.2  
```  
Block malware and adult content with 1.1.1.1 for Families  
```  
1.1.1.3  
1.0.0.3  
```
7. Depending on what you want to configure, choose one of the following DNS addresses for IPv6:  
Use 1.1.1.1 resolver  
```  
2606:4700:4700::1111  
2606:4700:4700::1001  
```  
Block malware with 1.1.1.1 for Families  
```  
2606:4700:4700::1112  
2606:4700:4700::1002  
```  
Block malware and adult content with 1.1.1.1 for Families  
```  
2606:4700:4700::1113  
2606:4700:4700::1003  
```
8. Select **Save**. You may need to disconnect from the Wi-Fi and reconnect for the changes to take place.

Note

Setting up a static IP address to configure a DNS server may prevent you from connecting to some public Wi-Fi networks that use captive portals — these are the web pages some wireless networks employ to let users log in and use their services.

If you are experiencing connectivity issues related to captive portals:

1. Remove the static IP addresses from the device or disable the 1.1.1.1 app.
2. Connect to the Wi-Fi network.
3. Once the connection has been established, re-add the static IP addresses or enable the 1.1.1.1 app.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/setup/","name":"Set up"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/setup/android/","name":"Android"}}]}
```
