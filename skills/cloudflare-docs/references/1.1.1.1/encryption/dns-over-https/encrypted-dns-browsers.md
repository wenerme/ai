---
title: Configure DoH on your browser
description: Configure DNS over HTTPS in your browser.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Configure DoH on your browser

Several browsers support DNS over HTTPS (DoH), a protocol that encrypts your connection to 1.1.1.1 to protect your DNS queries from privacy intrusions and tampering.

Some browsers might already have this setting enabled.

Note

To use 1.1.1.1 For Families, follow the steps below but, instead of choosing the default 1.1.1.1 option, refer to [Set up](https://developers.cloudflare.com/1.1.1.1/setup/#dns-over-https-doh) and specify the URL you want to use.

## Mozilla Firefox

1. Select the menu button > **Settings**.
2. In the **Privacy & Security** menu, scroll down to the **Enable secure DNS using:** section.
3. Select **Increased Protection** or **Max Protection**. By default, it will use the **Cloudflare** provider.
4. If this is not the case, select **Cloudflare** in the **Choose Provider** dropdown.

## Google Chrome

1. Select the three-dot menu in your browser > **Settings**.
2. Select **Privacy and security** \> **Security**.
3. Scroll down and enable **Use secure DNS**.
4. Select the **With** option, and from the drop-down menu choose _Cloudflare (1.1.1.1)_.

## Microsoft Edge

1. Select the three-dot menu in your browser > **Settings**.
2. Select **Privacy, Search, and Services**, and scroll down to **Security**.
3. Enable **Use secure DNS**.
4. Select **Choose a service provider**.
5. Select the **Enter custom provider** drop-down menu and choose _Cloudflare (1.1.1.1)_.

## Brave

1. Select the menu button in your browser > **Settings**.
2. Select **Privacy and security** \> **Security**.
3. Under **Advanced**, enable **Use secure DNS**.
4. From the **Select DNS provider** drop-down menu, choose _Cloudflare (1.1.1.1)_.

## Check if the browser is configured correctly

Visit [1.1.1.1 help page ↗](https://one.one.one.one/help) and check if `Using DNS over HTTPS (DoH)` shows `Yes`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/encryption/","name":"Encryption"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/","name":"DNS over HTTPS"}},{"@type":"ListItem","position":5,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers/","name":"Configure DoH on your browser"}}]}
```
