---
title: iOS
description: Configure 1.1.1.1 on iOS devices.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/1.1.1.1/setup/ios.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# iOS

[1.1.1.1: Faster Internet ↗](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627) is the preferred method of setting up 1.1.1.1 DNS resolver and 1.1.1.1 for Families in iOS devices. It allows you to automatically configure your phone to use 1.1.1.1 on any network you connect to, and solves iOS inability of using an alternative DNS resolver in cellular connections.

The app also allows you to enable encryption for DNS queries or enable [WARP mode](https://developers.cloudflare.com/warp-client/), which keeps all your HTTP traffic private and secure, including your DNS queries to 1.1.1.1.

You can select between the options available in the app's settings. By default, 1.1.1.1: Faster Internet is configured to WARP mode.

## Set up 1.1.1.1: Faster Internet

1. Download [1.1.1.1: Faster Internet from the App Store ↗](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627) for free.
2. Launch 1.1.1.1: Faster Internet and accept the Terms of Service.
3. Install the VPN profile that allows your phone to connect securely to 1.1.1.1.
4. Toggle the **WARP** button to **Connected**.

### Enable 1.1.1.1 for Families

1. Open 1.1.1.1: Faster Internet.
2. Tap the **menu button**.
3. Select **Advanced** \> **Connection options**.
4. In **DNS settings** \> **1.1.1.1 for Families**, select the option you want to use.

## Configure 1.1.1.1 manually

Note

If you configure 1.1.1.1 manually, you will have to do it for every Wi-Fi network your device connects to. This method does not work for cellular connections.

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

1. Go to **Settings** \> **Wi-Fi**.
2. Select the **'i'** icon next to the Wi-Fi network you are connected to.
3. Scroll down and select **Configure DNS**.
4. Change the configuration from **Automatic** to **Manual**.
5. Select **Add Server**.
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
8. Select **Save**.

Note

Setting up a static IP address to configure a DNS server may prevent you from connecting to some public Wi-Fi networks that use captive portals — these are the web pages some wireless networks employ to let users log in and use their services.

If you are experiencing connectivity issues related to captive portals:

1. Remove the static IP addresses from the device or disable the 1.1.1.1 app.
2. Connect to the Wi-Fi network.
3. Once the connection has been established, re-add the static IP addresses or enable the 1.1.1.1 app.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/setup/","name":"Set up"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/setup/ios/","name":"iOS"}}]}
```
