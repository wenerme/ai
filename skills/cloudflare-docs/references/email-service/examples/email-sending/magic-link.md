---
title: Magic link authentication
description: Passwordless login system using magic links sent via email with JWT tokens and session management.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-service/examples/email-sending/magic-link.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Magic link authentication

Implement passwordless authentication by sending secure, time-limited login links via email.

This example demonstrates how to send a magic link email for passwordless authentication using Cloudflare Email Service.

TypeScript

```

interface Env {

  EMAIL: SendEmail;

  DOMAIN: string;

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const url = new URL(request.url);


    if (url.pathname === "/send-magic-link" && request.method === "POST") {

      return handleSendMagicLink(request, env);

    }


    return new Response("Not Found", { status: 404 });

  },

};


async function handleSendMagicLink(

  request: Request,

  env: Env,

): Promise<Response> {

  const { email } = await request.json();


  if (!email || !isValidEmail(email)) {

    return new Response(JSON.stringify({ error: "Invalid email" }), {

      status: 400,

    });

  }


  // Generate a simple secure token (you would implement proper JWT/token handling)

  const token = crypto.randomUUID();

  const magicUrl = `https://${env.DOMAIN}/login?token=${token}`;


  // Send magic link email

  await env.EMAIL.send({

    to: email,

    from: `noreply@${env.DOMAIN}`,

    subject: "Your login link",

    html: `

      <h1>Login to your account</h1>

      <p>Click the link below to log in:</p>

      <p><a href="https://developers.cloudflare.com/email-service/examples/email-sending/magic-link/%3C/span%3E%3Cspan%20style="--0:#89DDFF;--1:#007474">${magicUrl}">Login Now</a></p>

      <p>This link expires in 15 minutes.</p>

    `,

    text: `

      Login to your account


      Click this link to log in: ${magicUrl}


      This link expires in 15 minutes.

    `,

  });


  return new Response(

    JSON.stringify({

      success: true,

      message: "Magic link sent to your email",

    }),

  );

}


function isValidEmail(email: string): boolean {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/examples/email-sending/","name":"Email sending"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-service/examples/email-sending/magic-link/","name":"Magic link authentication"}}]}
```
