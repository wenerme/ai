---
description: Resolve common IPFS Gateway issues including 523 and 524 errors.
title: Troubleshooting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshooting

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web3/ipfs-gateway/troubleshooting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Cloudflare-specific

### No link named "ipfs"

If you get a `no link named "ipfs" under <<CID>>` error message when trying to access content through Cloudflare's IPFS gateway, that means you have created a gateway without a value for the [DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink).

Since Cloudflare currently only supports restricted gateways - and not [universal gateways](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/universal-gateway/) \- these requests will continue to fail until you specify a DNSLink value.

### Check Cloudflare's status

It is worth checking for recent incidents on Cloudflare's [status dashboard ↗](https://www.cloudflarestatus.com/) that may have affected our gateway, but the best place to get up-to-date information about issues facing IPFS is the [IPFS Discussion Forum ↗](https://discuss.ipfs.io/).

## Generic IPFS

IPFS is still a developing protocol and content is often unavailable or slow to load for reasons outside of Cloudflare's control. Usually, this happens for one of the following reasons.

### The content was uploaded to a free/anonymous pinning service.

Free and anonymous pinning services can often be used to get content on IPFS in a pinch, but they'll often stop pinning content soon after it's uploaded. Running your own server or using a pinning service are the recommended alternatives, and will keep your content online more reliably.

### No node with the requested content is online.

Content will only stay on the IPFS network as long as there's at least one node that's serving it. If all of the nodes that were serving a given piece of content go offline, the content will be inaccessible until one of them comes back online.

### The nodes with the requested content are not publicly addressable.

It's common for people who run an IPFS node on their home Wi-Fi to have very long wait times or a high rate of request failure. This is because the rest of the nodes in the IPFS network have difficulty connecting to them through their NAT (Internet router). This can be solved by setting up Port Forwarding on the router, to direct external connections to port 4001 to the host with the IPFS node, or by moving the node to a hosted server/VM.

### The nodes with the requested content are not pinning it.

If several minutes have passed since files were uploaded to an IPFS node and they're still not discoverable by other gateways, it's possible the node is having trouble announcing the files to the rest of the network. You can make sure the node with the content has pinned it by running:

```txt
ipfs pin -r <content id>
```

And you can force the actual announcement by running:

```txt
ipfs dht provide -rv <content id>
```

The second command will run indefinitely and has quite complicated output, so you may want to run it in the background and omit the `-v` flag.

### The nodes with the requested content are too old.

IPFS issues mandatory updates from time to time that introduce breaking protocol changes. Cloudflare tries to say ahead of these updates and may, as a result, lose connectivity with older nodes.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/ipfs-gateway/troubleshooting/#page","headline":"Troubleshooting · Cloudflare Web3 docs","description":"Resolve common IPFS Gateway issues including 523 and 524 errors.","url":"https://developers.cloudflare.com/web3/ipfs-gateway/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
```
