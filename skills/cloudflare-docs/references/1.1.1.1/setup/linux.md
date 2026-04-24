---
title: Linux
description: Learn how to set up 1.1.1.1 as your DNS resolver on a Linux system.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/1.1.1.1/setup/linux.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Linux

Before you begin, take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

Consider the sections below to set up 1.1.1.1 using either the [command line interface (CLI)](#use-command-line-interface-cli) or a [graphical user interface (GUI)](#use-graphical-user-interface-gui) of your preference.

## Use command line interface (CLI)

Choose whether you want to use 1.1.1.1 or 1.1.1.1 For Families, and replace `1.1.1.1` with the corresponding [IPv4 or IPv6 address](https://developers.cloudflare.com/1.1.1.1/ip-addresses/) accordingly.

### `resolv.conf`

Usually, `/etc/resolv.conf` is where you can configure the resolver IPs that your system is using.

In that case, you can use the following one-line command to specify `1.1.1.1` as your DNS resolver and `1.0.0.1` as backup:

Terminal window

```

echo -e "nameserver 1.1.1.1\nnameserver 1.0.0.1" | sudo tee /etc/resolv.conf


```

Warning

Note that other systems, such as dynamic host configuration protocol (DHCP), may automatically write to `/etc/resolv.conf` and change that configuration. In those cases, consider changing your network settings or DHCP to use `1.1.1.1`.

Alternatively, you can use an editor (`nano` or `vim`, for example) to manually edit the file.

### `systemd-resolved`

If you use `systemd-resolved` utility and the resolver IPs configuration is in `/etc/systemd/resolved.conf`, consider the steps below:

1. Run the following command, replacing `<EDITOR>` with your preferred editor.

Terminal window

```

sudo <EDITOR> /etc/systemd/resolved.conf


```

1. In the editor, add or edit the following lines:

```

[Resolve]

DNS=1.1.1.1


```

To use DNS over TLS, add `#one.one.one.one` and set `DNSOverTLS` to `yes`, as in the following example:

```

[Resolve]

DNS=1.1.1.1#one.one.one.one

DNSOverTLS=yes


```

## Use graphical user interface (GUI)

### GNOME

1. Go to **Show Applications** \> **Settings** \> **Network**.
2. Select the adapter you want to configure — like your Ethernet adapter or Wi-Fi card — and select the **Settings** button.
3. On the **IPv4** tab > **DNS** section, disable the **Automatic** toggle.
4. Depending on what you want to configure, choose one of the following DNS addresses for IPv4:  
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
5. Go to **IPv6**.
6. Depending on what you want to configure, choose one of the following DNS addresses for IPv6:  
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
7. Select **Apply**.

### KDE Plasma

1. Go to **System Settings** \> **Wi-Fi & Internet** \> **Wi-Fi & Networking**. (or **Connections**, if on Plasma 5)
2. Select the connection you want to configure - like your current connected network.
3. On the **IPv4** tab, select the **Method** drop-down menu > _Automatic (Only addresses)_.
4. Select the text box next to **DNS servers**.
5. Depending on what you want to configure, choose one of the following DNS addresses for IPv4:  
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
6. On the **IPv6** tab, select the **Method** drop-down menu > _Automatic (Only addresses)_.
7. Select the text box next to **DNS servers**.
8. Depending on what you want to configure, choose one of the following DNS addresses for IPv6:  
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
9. Select **Apply**.

Note

Setting up a static IP address to configure a DNS server may prevent you from connecting to some public Wi-Fi networks that use captive portals — these are the web pages some wireless networks employ to let users log in and use their services.

If you are experiencing connectivity issues related to captive portals:

1. Remove the static IP addresses from the device or disable the 1.1.1.1 app.
2. Connect to the Wi-Fi network.
3. Once the connection has been established, re-add the static IP addresses or enable the 1.1.1.1 app.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/setup/","name":"Set up"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/setup/linux/","name":"Linux"}}]}
```
