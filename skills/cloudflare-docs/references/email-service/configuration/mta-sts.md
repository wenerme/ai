---
title: Configure MTA-STS
description: Enable MTA Strict Transport Security for your Email Service domain to protect against downgrade attacks.
image: https://developers.cloudflare.com/dev-products-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-service/configuration/mta-sts.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Configure MTA-STS

MTA Strict Transport Security ([MTA-STS ↗](https://datatracker.ietf.org/doc/html/rfc8461)) was introduced by email service providers including Microsoft, Google and Yahoo as a solution to protect against downgrade and man-in-the-middle attacks in SMTP sessions, as well as solving the lack of security-first communication standards in email.

Suppose that `example.com` is your domain and uses Email Service. Here is how you can enable MTA-STS for it.

1. In the Cloudflare dashboard, go to the **Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Create a new CNAME record with the name `_mta-sts` that points to Cloudflare’s record `_mta-sts.mx.cloudflare.net`. Make sure to disable the proxy mode.
![MTA-STS CNAME record](https://developers.cloudflare.com/_astro/mta-sts-record.DbwO-t_X_1Mbxza.webp) 
1. Confirm that the record was created:

Terminal window

```

dig txt _mta-sts.example.com


```

```

_mta-sts.example.com. 300 IN  CNAME _mta-sts.mx.cloudflare.net.

_mta-sts.mx.cloudflare.net. 300 IN  TXT "v=STSv1; id=20230615T153000;"


```

This tells the other end client that is trying to connect to us that we support MTA-STS.

Next you need an HTTPS endpoint at `mta-sts.example.com` to serve your policy file. This file defines the mail servers in the domain that use MTA-STS. The reason why HTTPS is used here instead of DNS is because not everyone uses DNSSEC yet, so we want to avoid another MITM attack vector.

To do this you need to deploy a Worker that allows email clients to pull Cloudflare’s Email Service policy file using the “well-known” URI convention.

1. Go to your **Account** \> **Workers & Pages** and select **Create**. Pick the default "Hello World" option button, and replace the sample worker code with the following:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    return await fetch(

      "https://mta-sts.mx.cloudflare.net/.well-known/mta-sts.txt",

    );

  },

};


```

This Worker proxies `https://mta-sts.mx.cloudflare.net/.well-known/mta-sts.txt` to your own domain.

1. After deploying it, go to the Worker configuration, then **Settings** \> **Domains & Routes** \> **+Add**. Type the subdomain `mta-sts.example.com`.
![MTA-STS Worker Custom Domain](https://developers.cloudflare.com/_astro/mta-sts-domain.UfZmAoBe_lkXVJ.webp) 

You can then confirm that your policy file is working with the following:

Terminal window

```

curl https://mta-sts.example.com/.well-known/mta-sts.txt


```

```

version: STSv1

mode: enforce

mx: *.mx.cloudflare.net

max_age: 86400


```

This says that you domain `example.com` enforces MTA-STS. Capable email clients will only deliver email to this domain over a secure connection to the specified MX servers. If no secure connection can be established the email will not be delivered.

Email Service also supports MTA-STS upstream, which greatly improves security when forwarding your emails to service providers like Gmail, Microsoft, and others.

---

For more information about domain security and email authentication, refer to [Email authentication](https://developers.cloudflare.com/email-service/concepts/email-authentication/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/configuration/mta-sts/","name":"Configure MTA-STS"}}]}
```
