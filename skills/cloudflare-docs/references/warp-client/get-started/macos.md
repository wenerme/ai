---
title: macOS
description: WARP is now running and protecting your Internet connection.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/warp-client/get-started/macOS.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# macOS

Looking for Zero Trust?

This documentation is for the consumer version of WARP (1.1.1.1 with WARP). If you are using WARP for Zero Trust security, refer to the [Cloudflare One Client documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/).

1. [Download ↗](https://downloads.cloudflareclient.com/v1/download/macos/ga) Cloudflare WARP for macOS.
2. Go to your predefined download folder and open the `.pkg` file.
3. Follow the instructions to complete installation. Cloudflare WARP will automatically launch and appear in your menu bar with the Cloudflare logo.
4. Select **Next** and **Accept** Cloudflare's privacy policy.
5. Turn on the toggle to enable WARP.

WARP is now running and protecting your Internet connection.

## WARP modes

The WARP app has two main modes of operation: WARP and 1.1.1.1.

In WARP mode, all traffic leaving your computer is encrypted and sent over WARP, including DNS traffic. In 1.1.1.1 mode, the WARP app only encrypts DNS traffic to the 1.1.1.1 resolver.

WARP mode is the default and the recommended mode of operation. However, if you only want to use the 1.1.1.1 resolver mode:

1. Select the WARP app icon.
2. Select the cog icon, and choose your preferred mode of operation for WARP.

## WARP options

Beyond the two modes of operation, the WARP app lets you configure additional options to better suit your needs. You can change the protocol used to connect to Cloudflare or enable [1.1.1.1 for Families](https://developers.cloudflare.com/1.1.1.1/setup/#1111-for-families), for example. To access these options:

1. Select the WARP app icon.
2. Select the **cog icon** \> **Preferences**.

The following is a list of options you can configure in the **Connection** tab:

* **Disable for all Wi-Fi / wired networks**: Check the box corresponding to the network where you want to prevent WARP from working on.
* **DNS Protocol**: The available options depend on the WARP mode you have enabled:  
   * **WARP**: Only available when you have the WARP mode enabled. All DNS traffic encrypted and [sent to Cloudflare's global network](https://developers.cloudflare.com/warp-client/warp-modes/#1111-with-warp).  
   * **HTTPS**: All DNS traffic is sent outside the tunnel via [DNS over HTTPS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/).  
   * **TLS**: All DNS traffic is sent outside the tunnel via [encrypted TLS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-tls/).
* **1.1.1.1 for Families**: Allows you to [enable 1.1.1.1 for Families](https://developers.cloudflare.com/1.1.1.1/setup/#1111-for-families) and choose between blocking malware, or blocking malware and adult content.

For the **Advanced** options, refer to [Exclude or include network traffic with WARP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/) for more information.

## What Cloudflare places on your device

### Cloudflare WARP.app

This is the main GUI application that you interact with. You can find it in`/Applications/Cloudflare WARP.app`.

### Cloudflare WARP Daemon

This is the daemon service responsible for establishing the wireguard tunnel and all interaction between our service endpoint and the Cloudflare WARP application. Here is where you can find:

* **Service**: `/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP`
* **Definition**: `/Library/LaunchDaemons/com.cloudflare.1dot1dot1dot1.macos.warp.daemon.plist`

### Log files

The macOS application places log files in two locations based on what part of the app is logging information. These logs are included with a feedback submission, when you select the checkbox in **Feedback** \> **Share debug information**.

* **Daemon and install logs**: `/Library/Application Support/Cloudflare`.
* **Application GUI logs**: `/Users/<your local username>/Library/Logs/Cloudflare`.

## How to remove the application

We include an uninstall script as part of the macOS package you install. Type the following in a terminal window to uninstall WARP:

Terminal window

```

cd /Applications/Cloudflare\ WARP.app/Contents/Resources

./uninstall.sh


```

Note

You may be prompted to provide your credentials while removing the application.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/warp-client/","name":"WARP Client"}},{"@type":"ListItem","position":3,"item":{"@id":"/warp-client/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/warp-client/get-started/macos/","name":"macOS"}}]}
```
