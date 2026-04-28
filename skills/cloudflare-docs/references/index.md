---
title: Welcome to Cloudflare
description: Explore guides and tutorials to start building on Cloudflare's platform
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

![](https://developers.cloudflare.com/_astro/Dev-Docs-Header-Illustration-Dark-Mode-cropped.DDWqKYx5_1cIhMB.svg) ![](https://developers.cloudflare.com/_astro/Dev-Docs-Header-Illustration-Light-Mode-cropped.COpWJJAy_ZaWBfS.svg) 

[Directory](https://developers.cloudflare.com/directory/) [Resources](https://developers.cloudflare.com/resources/) [API](https://developers.cloudflare.com/api/) [Agent setup](https://developers.cloudflare.com/agent-setup/) [Use cases](https://developers.cloudflare.com/use-cases/) [Docs for agents](https://developers.cloudflare.com/docs-for-agents/) [Changelog](https://developers.cloudflare.com/changelog/) 

# Welcome to Cloudflare

Explore guides and tutorials to start building on Cloudflare's platform

Featured 

* [ Docs for agents ](https://developers.cloudflare.com/docs-for-agents/)
* [ Troubleshoot errors ](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/)
* [ Register a domain ](https://developers.cloudflare.com/registrar/)
* [ Setup 1.1.1.1 ](https://developers.cloudflare.com/1.1.1.1/setup/)
* [ Get started with Cloudflare ](https://developers.cloudflare.com/learning-paths/get-started/concepts/)

**[View all docs](https://developers.cloudflare.com/directory/)** 

Developer Products 

* [ Workers ](https://developers.cloudflare.com/workers/)
* [ Pages ](https://developers.cloudflare.com/pages/)
* [ R2 ](https://developers.cloudflare.com/r2/)
* [ Images ](https://developers.cloudflare.com/images/)
* [ Stream ](https://developers.cloudflare.com/stream/)

**[View all developer products](https://developers.cloudflare.com/directory/?product-group=Developer+platform)** 

AI Products 

* [ AI Search ](https://developers.cloudflare.com/ai-search/)
* [ Workers AI ](https://developers.cloudflare.com/workers-ai/)
* [ AI Crawl Control ](https://developers.cloudflare.com/ai-crawl-control/)
* [ AI Gateway ](https://developers.cloudflare.com/ai-gateway/)
* [ AI Agents ](https://developers.cloudflare.com/agents/)

**[View all AI products](https://developers.cloudflare.com/directory/?product-group=AI)** 

Zero Trust 

* [ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)
* [ Tunnel ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)
* [ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)
* [ Browser Isolation ](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/)
* [ Replace your VPN ](https://developers.cloudflare.com/learning-paths/replace-vpn/concepts/)

**[View all Cloudflare One products](https://developers.cloudflare.com/directory/?product-group=Cloudflare+One)** 

---

![AI agents illustration](https://developers.cloudflare.com/_astro/agents.P_8QDHqc_Z1P1F3A.svg) 

## Build with your favorite AI agent

Paste into any AI coding agent to install Cloudflare agent tooling:

`Fetch https://developers.cloudflare.com/agent-setup/prompt.md ` 

Or [read more about Cloudflare agent tools and setup guides →](https://developers.cloudflare.com/agent-setup/) 

[ ![Claude Code](https://developers.cloudflare.com/icons/agents/claude/light.svg) ![Claude Code](https://developers.cloudflare.com/icons/agents/claude/dark.svg) ](https://developers.cloudflare.com/agent-setup/claude-code/ "Claude Code") [ ![Codex](https://developers.cloudflare.com/icons/agents/codex/light.svg) ![Codex](https://developers.cloudflare.com/icons/agents/codex/dark.svg) ](https://developers.cloudflare.com/agent-setup/codex/ "Codex") [ ![Cursor](https://developers.cloudflare.com/icons/agents/cursor/light.svg) ![Cursor](https://developers.cloudflare.com/icons/agents/cursor/dark.svg) ](https://developers.cloudflare.com/agent-setup/cursor/ "Cursor") [ ![OpenCode](https://developers.cloudflare.com/icons/agents/opencode/light.svg) ![OpenCode](https://developers.cloudflare.com/icons/agents/opencode/dark.svg) ](https://developers.cloudflare.com/agent-setup/opencode/ "OpenCode") [ ![GitHub Copilot](https://developers.cloudflare.com/icons/agents/copilot/light.svg) ![GitHub Copilot](https://developers.cloudflare.com/icons/agents/copilot/dark.svg) ](https://developers.cloudflare.com/agent-setup/github-copilot/ "GitHub Copilot") [ ![Windsurf](https://developers.cloudflare.com/icons/agents/windsurf/light.svg) ![Windsurf](https://developers.cloudflare.com/icons/agents/windsurf/dark.svg) ](https://developers.cloudflare.com/agent-setup/windsurf/ "Windsurf") 

---

![Developer Platform section image](https://developers.cloudflare.com/_astro/developer-platform-light.CZoHB6oh_eLF9R.svg) ![Developer Platform section image](https://developers.cloudflare.com/_astro/developer-platform-dark.ChPufHpV_Z1n8xct.svg) 

## Developer Platform

The Cloudflare Developer Platform provides a serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.

[ Explore our Developer Platform ](https://developers.cloudflare.com/directory/?product-group=Developer+platform) 

---

Install the WARP Client 

The Cloudflare WARP client allows individuals and organizations to have a faster, more secure, and more private experience online.

  
[ Get started ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/warp/) 

Set up a tunnel 

Cloudflare Tunnel provides you with a secure way to connect your resources to Cloudflare without a publicly routable IP address.

  
[ Set up a tunnel ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) 

![Zero Trust section image](https://developers.cloudflare.com/_astro/zero-trust-light.BvZ3bzoV_5tUAY.svg) ![Zero Trust section image](https://developers.cloudflare.com/_astro/zero-trust-dark.Dary5ape_5tUAY.svg) 

## Zero Trust

Cloudflare Zero Trust replaces legacy security perimeters with our global network, making the Internet faster and safer for teams around the world.

---

## Build with Cloudflare

**Return HTML** **Return JSON** **Fetch HTML** **Redirect** **Respond with another site** 

JavaScript

```

export default {

  async fetch(request) {

    const html = `<!DOCTYPE html>

    <body>

      <h1>Hello World</h1>

      <p>This markup was generated by a Cloudflare Worker.</p>

    </body>`;


    return new Response(html, {

      headers: {

        "content-type": "text/html;charset=UTF-8",

      },

    });

  },

};


```

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBmAEwB2QQA4AbAFYAnIICMwgFwsWbYBzhcafASInT5S1QFgAUAGF0VCAFMH2ACJQAzjHQeo0e2ok2ngExCRUcMCODABEUDSOAB4AdABWHjGkqFBgzpHRcQkp6THWdg7OENgAKnQwjoFwMDBgfARQ9sipcABucB68CLAQANTA6LjgjtbWSd5IJLiOqHDgECQA3lYkJP10VLxBjhC8ABYAFAiOAI4gjh4QAJSb2zskvPYPJKcQwGAkDBIAAMADwAQlcAHkbNUAJoABQAot9fmAAHyvHYgii4OgYt5vEGnZRogASjjAYHQJAA6pgwLgQchifiCSQQTA0dVTp4SMBEABrEAwEgAd36JAA5s5HAgCI5cOQ6LsSDYqSBcKgwIhHLTMALZckmZzMezkDi8UCiFZTVcICAEFRwo5RSQAEr3bxUDyOc4-P4AGhebO+jjgSwQHkCWxDOxiHwqLggdUcMUCMSciRQ-rARDOiB9EAYAFVqgAxbBSGIB007AC+NYJdce1vrNbrRGsmmY2l0+h4-CEYkkskUKmEZXsThc7i8Pj8HSogWCulIESisSihF0mSCOTyG5iZCpZFKtinlRqKcazVavHanXS9hmVg2MX58QA+uNJrk04UlmKDI6y7bte1CftDCHExR3MYRmGsIA)

JavaScript

```

export default {

  async fetch(request) {

    const data = {

      hello: "world",

    };


    return Response.json(data);

  },

};


```

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAOYQGYA7ACYpARgBsYgJxSAXCxZtgHOFxp8BI8dLmKVAWABQAYXRUIAU3vYAIlADOMdO6jQ7qki08AmISKjhgBwYAIigaBwAPADoAK3do0lQoMCcIqNj45LToq1t7JwhsABU6GAcAuBgYMD4CKDtkFLgANzh3XgRYCABqYHRccAcrK0SvJBJcB1Q4cAgSAG9LEhI+uipeQIcIXgALAAoEBwBHEAd3CABKDa3tkl47e4WQkgZn19eTg4wGB0AFogB3TBgXDRAA0L22AF8iJYESRLhAQAgqCQAEp3LxUdwOVLuOxnHQPFFI+HIqwaZhaHR6Hj8ISiSQyBTKKSlOyOZxuTzeXztKgBII6UjhSIxSKEHQZQLZXKy6JkEFkEo2fkVaq1eo7JotXhtDppOzTSzraLAOBxAD6YwmOWiqgKiyK6UR9IZTJCLIM7OMXLMUmYViAA)

JavaScript

```

export default {

  async fetch(request) {

    /**

     * Replace `remote` with the host you wish to send requests to

     */

    const remote = "https://example.com";


    return await fetch(remote, request);

  },

};


```

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwB2AKyiAnADZRAJgDMg+QA4AXCxZtgHOFxp8BI8dLmKVAWABQAYXRUIAU3vYAIlADOMdO6jQ7qki08AmISKjhgBwYAIigaBwAPADoAK3do0lQoMCcIqNj45LToq1t7JwhsABU6GAcAuBgYMD4CKDtkFLgANzh3XgRYCABqYHRccAcrK0SvJBJcB1Q4cAgSAG9LEhI+uipeQIcIXgALAAoEBwBHEAd3CABKDa3tkmQAKneX1-eSACUHM04LwHCQAAaXMaOMEkADuvhOJAgJ1BJ28azolDhHkREHQJHcTlwJEuNzuEHcSPQ32272QNN4dnuJIcUNBDBI0ROEAgMHcqmQyESEWaDiSjOAGUsNMuEBACCoO1hcF8h2O50h6EcABoWWT7g8iC8AL7ayzGohWDTMLQ6PQ8fhCMSSGQKJTKUp2RzONyeby+dpUAJBHSkcKRGKRQg6DKBbK5CPRMhgdBkEo2L0Vaq1eo7JotXhtDppOzTSzraLAFVUAD6YwmOWiqgKiyK6WNVuttpC9oMTuMrrMymYViAA)

JavaScript

```

export default {

  async fetch(request) {

    const destinationURL = "https://example.com";

    const statusCode = 301;

    return Response.redirect(destinationURL, statusCode);

  },

};


```

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAOEYIAsAVkEBmGQE4AjAC4WLNsA5wuNPgLGipshYoCwAKADC6KhACmt7ABEoAZxjpXUaDeUkNeATEJFRwwHYMAERQNHYAHgB0AFaukaSoUGAOYRHRsYkpkRbWtg4Q2AAqdDB2fnAwMGB8BFA2yElwAG5wrrwIsBAA1MDouOB2FhbxHkgkuHaocOAQJADe5iQkPXRUvP52ELwAFgAUCHYAjiB2rhAAlGsbmyS8NrdzN9ChPlQAqgBKABkSAwSJEjhAIDBXMpkMh4mFGnYEq9gGknptXlR3rcCCBXNZ5iCSDJBIoiBiSOcICAEFQSP8bh5scjzjxzrwICd5rcYi0bADAQAaEi4mkE0Z2O4UzYAXyF5llRAsamYGi0Oh4-CEokM0jkSmKNnsjhc7k83laVD8AS0pFC4Si4UIWjS-ky2UdkTIYHQZCKVmNZUq1VqWwaTV4-Ko7VcNkm5lWkWAcBiAH0RmMspFlHl5gVUrKVar1UFNXodWIjAbFMwLEA)

JavaScript

```

export default {

  async fetch(request) {

    function MethodNotAllowed(request) {

      return new Response(`Method ${request.method} not allowed.`, {

        status: 405,

        headers: {

          Allow: "GET",

        },

      });

    }

    // Only GET requests work with this proxy.

    if (request.method !== "GET") return MethodNotAllowed(request);

    return fetch(`https://example.com`);

  },

};


```

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAyCAjAFYAzAHYpYqQCYpIgFwsWbYBzhcafAcPHTZCpQFgAUAGF0VCAFNb2ACJQAzjHSuo0G8pIa8AmISKjhgOwYAIigaOwAPADoAK1dI0lQoMAcwiOjYxJTIi2tbBwhsABU6GDs-OBgYMD4CKBtkJLgANzhXXgRYCABqYHRccDsLC3iPJBJcO1Q4cAgSAG9zEhIeuipefzsIXgALAAoEOwBHEDtXCABKNY3N-2peHyoSAFkDo9GAOXQEAAgmAwOgAO52XBnS7XW4PdbPZ7nCAgBAfKh2cEkABKNw8VFcdhOAANvhBfrgSAASVbnK43CAJcIU0YAXxCgK2oIhUISJIANI8kUjbgQQK4-AAWQRiAVPEUkI52ODzBCS4WK54gsHgvyRADiAFEKpF5VqSGzzSK2XciArLQ7kMgSAB5KhgOgkY0VEj0uEQVwkcGYADWwe8RxIFLcJBgCHQcToCQdUFQJBhDNuzJ+oxIAEIGAwSIaTZEHii0R9yZSAcCeZDof7GXaHZX0ftDqcSUcIBAYJLnfEwo07AleOhgCTW5sreY2UQLGpmBotDoePwhKJJDI5IoRMUbPZHC53J5vK0qH4AlpSKFwlEWaqgml-Jlsg-ImQwWQilYj2UlTVLUWwNE0vAtG0KQ2JM5irJEwBwDEAD6IxjFkkTKHk8wFKkbJLsuq5BOuehboYu4mCIzAWEAA)

[ Learn more about Workers ](https://developers.cloudflare.com/workers/) 

---

## Other docs you might also like

Install an Origin CA certificate 

Use Origin Certificate Authority (CA) certificates to encrypt traffic between Cloudflare and your origin web server and reduce origin bandwidth.

  
[ Install Origin CA ](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/) 

Change your nameservers 

Make Cloudflare your primary DNS provider by updating your authoritative nameservers at your domain registrar.

  
[ Update nameservers ](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/) 

SSL/TLS Encryption mode 

Your domain's encryption mode controls how Cloudflare connects to your origin server and how SSL certificates at your origin will be validated.

  
[ Set encryption mode ](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) 

Allow traffic from specific countries only 

Block requests based on a list of allowed countries by configuring a custom rule in the Web Application Firewall (WAF).

  
[ Allow traffic from specific countries only ](https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-specific-countries/) 

---

**Community** 

Share ideas, answers, code and compare notes with the Cloudflare community.

* [ Discord ](https://discord.cloudflare.com/)
* [ Twitter ](https://x.com/CloudflareDev)
* [ Community forum ](https://community.cloudflare.com/)

**Open source** 

Cloudflare contributes to the open-source ecosystem in a variety of ways, including:

* [ GitHub projects ](https://github.com/cloudflare)
* [ Sponsorship projects ](https://developers.cloudflare.com/sponsorships/)
* [ Style guide ](https://developers.cloudflare.com/style-guide/)

**Blog** 

Get the latest news on Cloudflare products, technologies, and culture.

* [ Read the blog ](https://blog.cloudflare.com/)