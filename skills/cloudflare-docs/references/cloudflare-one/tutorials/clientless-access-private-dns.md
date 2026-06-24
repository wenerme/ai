---
title: Access a web application via its private hostname without the Cloudflare One Client
description: With Cloudflare Browser Isolation and resolver policies, users can connect to private web-based applications via their private hostnames.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Access a web application via its private hostname without the Cloudflare One Client

**Last reviewed:**  over 2 years ago 

With Cloudflare Browser Isolation and resolver policies, users can connect to private web-based applications via their private hostnames without needing to install the Cloudflare One Client. By the end of this tutorial, users who pass your Gateway DNS and network policies will be able to access your private application at `https://<your-team-name>.cloudflareaccess.com/browser/https://internalrecord.com`.

## Before you begin

Make sure you have:

* [Cloudflare Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) enabled on your account
* [Resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) enabled on your account
* An HTTP or HTTPS application that users access through a browser

## Create a Cloudflare Tunnel

First, install `cloudflared` on a server in your private network:

1. Log in to the Cloudflare dashboard and go to **Networking** \> **Tunnels**.  
[ Go to **Tunnels** ](https://dash.cloudflare.com/?to=/:account/tunnels)
2. Select **Create a tunnel**.
3. Enter a name for your tunnel. We suggest choosing a name that reflects the type of resources you want to connect through this tunnel (for example, `enterprise-VPC-01`).
4. Select **Create Tunnel**.
5. Choose your operating system, then copy the installation command and run it in a terminal on your origin server.
6. Wait for the tunnel to connect. Once the connection is established, select **Continue**.

## Add private network routes

1. In the Cloudflare dashboard, go to **Networking** \> **Routes**.  
[ Go to **Routes** ](https://dash.cloudflare.com/?to=/:account/magic-networks/routes)
2. Select **Create route** \> **Tunnel CIDR**. Select the tunnel you just created, enter the private IP/CIDR of your application server (for example, `10.128.0.175/32`), and select **Create route**.
3. Repeat to create a second route for the private IP/CIDR of your DNS server.

The application and DNS server are now connected to Cloudflare.

## Enable Clientless Web Isolation

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Browser isolation** \> **Browser isolation settings**.
2. Turn on **Allow users to open a remote browser without the device client**.
1. For **Permissions**, select **Manage**.
2. Select **Add a rule**.
3. Create an expression that defines who can open the Clientless Web Isolation browser. For example,

| Rule action | Rule type | Selector         | Value        | Action           |
| ----------- | --------- | ---------------- | ------------ | ---------------- |
| Allow       | Include   | Emails ending in | @example.com | Select **Save**. |

To test, open a browser and go to `https://<team-name>.cloudflareaccess.com/browser/https://<private-IP-of-application>`.

## Create a Gateway resolver policy

1. Go to **Traffic policies** \> **Resolver policies**.
2. Select **Add a policy**.
3. Create an expression to match against the private [domain](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#domain) or [hostname](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#host) of the application:

| Selector | Operator | Value              |
| -------- | -------- | ------------------ |
| Domain   | in       | internalrecord.com |
4. In **Select DNS resolver**, select _Configure custom DNS resolvers_.
5. Enter the private IP address of your DNS server.
6. In the dropdown menu, select _`<IP-address> - Private`_.
7. (Optional) Enter a custom port.
8. Select **Create policy**.

To test, open a browser and go to `https://<team-name>.cloudflareaccess.com/browser/https://internalrecord.com`.

## Create a Gateway network policy (recommended)

1. Go to **Traffic policies** \> **Firewall policies** \> **Network**.
2. Add a [network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) that targets the private IP address of your application. You can optionally include any ports or protocols relevant for application access. For example,

| Selector         | Operator      | Value          | Logic | Action |
| ---------------- | ------------- | -------------- | ----- | ------ |
| Destination IP   | in            | 10.128.0.175   | And   | Allow  |
| Destination Port | in            | 80             | Or    |        |
| User Email       | matches regex | .\*example.com |       |        |

Note

Device posture checks are not supported because they require the Cloudflare One Client.

For best practices on securing private applications, refer to [Build secure access policies](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/).

## Connect as a user

Users can now access the application at the following URL:

`https://<team-name>.cloudflareaccess.com/browser/https://internalrecord.com`

The application will load in an isolated browser. You can optionally [configure remote browser controls](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/#policy-settings) such as disabling copy/paste, printing, or keyboard input.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/clientless-access-private-dns/#page","headline":"Access a web application via its private hostname without the Cloudflare One Client · Cloudflare One docs","description":"With Cloudflare Browser Isolation and resolver policies, users can connect to private web-based applications via their private hostnames.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/clientless-access-private-dns/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS","Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/clientless-access-private-dns/","name":"Access a web application via its private hostname without the Cloudflare One Client"}}]}
```
