---
title: DNS over Tor
description: If you do not want to disclose your IP address to the resolver, you can use our Tor onion service. Resolving DNS queries through the Tor network guarantees a significantly higher level of anonymity than making the requests directly.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNS over Tor

Warning

The hidden resolver (Cloudflare's DNS resolver accessible through Tor) is still an experimental service and should not be used in production or for other critical uses.

When you send a standard DNS query, both your ISP and the DNS resolver can see your IP address and the domains you look up. Cloudflare's Tor onion service routes your DNS queries through the Tor network, which guarantees a significantly higher level of anonymity than making requests directly. The resolver never sees your IP address, and your ISP cannot determine that you attempted to resolve a domain name.

Read more about this service in [this blog post ↗](https://blog.cloudflare.com/welcome-hidden-resolver/).

## Setting up a Tor client

Unlike standard DNS modes where traffic is sent directly to an IP address, the Tor network routes traffic without exposing IP addresses. This means all connections to the hidden resolver must go through a Tor client.

Before you start, head to the [Tor Project website ↗](https://www.torproject.org/download/download.html.en) to download and install a Tor client. If you use the Tor Browser, it will automatically start a [SOCKS proxy ↗](https://en.wikipedia.org/wiki/SOCKS) at `127.0.0.1:9150`.

If you use Tor from the command line, create the following configuration file:

```

SOCKSPort 9150


```

Then you can run tor with:

Terminal window

```

tor -f tor.conf


```

Also, if you use the Tor Browser, you can head to the resolver's address to see the usual 1.1.1.1 page:

```

https://dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion/


```

Note

The HTTPS certificate indicator should say "Cloudflare, Inc. (US)." This confirms you are connected to Cloudflare's resolver and not an impersonating service.

If you ever forget 1.1.1.1's address, use cURL to retrieve it:

Terminal window

```

curl -sI https://tor.cloudflare-dns.com | grep -i alt-svc


```

```

alt-svc: h2="dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion:443"; ma=315360000; persist=1


```

## Setting up a local DNS proxy using socat

Not all DNS clients support connecting to the Tor network directly. The [socat ↗](http://www.dest-unreach.org/socat/) utility bridges this gap by forwarding local ports through the Tor proxy, so any DNS-speaking software can reach the hidden resolver.

### DNS over TCP, TLS, and HTTPS

The hidden resolver listens on TCP port 53 (DNS over TCP) and port 853 (DNS over TLS). After setting up a Tor proxy, run the following `socat` command as a privileged user, setting `PORT` to 53 or 853 depending on your protocol:

Terminal window

```

PORT=853; socat TCP4-LISTEN:${PORT},reuseaddr,fork SOCKS4A:127.0.0.1:dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion:${PORT},socksport=9150


```

From here, you can follow the regular guide for [setting up 1.1.1.1](https://developers.cloudflare.com/1.1.1.1/setup/), except you should always use `127.0.0.1` instead of `1.1.1.1`. If you need to access the proxy from another device, replace `127.0.0.1` in the `socat` command with your local IP address.

### DNS over HTTPS

[As explained in the blog post ↗](https://blog.cloudflare.com/welcome-hidden-resolver/), the preferred method is DNS over HTTPS (DoH), which encrypts the entire DNS query within an HTTPS connection. To set it up:

1. Download `cloudflared` by following the guide for [connecting to 1.1.1.1 using DNS over HTTPS clients](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/dns-over-https-client/).
2. Start a Tor SOCKS proxy and use `socat` to forward port TCP:443 to localhost:

Terminal window

```

socat TCP4-LISTEN:443,reuseaddr,fork SOCKS4A:127.0.0.1:dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion:443,socksport=9150


```

1. Instruct your machine to treat the `.onion` address as localhost:

Terminal window

```

cat << EOF >> /etc/hosts

127.0.0.1 dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion

EOF


```

If you run this command more than once, remove duplicate entries from `/etc/hosts` to avoid conflicts.

1. Finally, start a local DNS over UDP daemon:

Terminal window

```

cloudflared proxy-dns --upstream "https://dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion/dns-query"


```

```

INFO[0000] Adding DNS upstream                           url="https://dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion/dns-query"

INFO[0000] Starting DNS over HTTPS proxy server          addr="dns://localhost:53"

INFO[0000] Starting metrics server                       addr="127.0.0.1:35659"


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/additional-options/","name":"Other ways to use 1.1.1.1"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/additional-options/dns-over-tor/","name":"DNS over Tor"}}]}
```
