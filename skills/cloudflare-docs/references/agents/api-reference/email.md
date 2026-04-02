---
title: Email routing
description: Agents can receive and process emails using Cloudflare Email Routing. This guide covers how to route inbound emails to your Agents and handle replies securely.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/api-reference/email.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Email routing

Agents can receive and process emails using Cloudflare [Email Routing](https://developers.cloudflare.com/email-routing/email-workers/). This guide covers how to route inbound emails to your Agents and handle replies securely.

## Prerequisites

1. A domain configured with [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/).
2. An Email Worker configured to receive emails.
3. An Agent to process emails.

## Quick start

* [  JavaScript ](#tab-panel-2354)
* [  TypeScript ](#tab-panel-2355)

JavaScript

```

import { Agent, routeAgentEmail } from "agents";

import { createAddressBasedEmailResolver } from "agents/email";


// Your Agent that handles emails

export class EmailAgent extends Agent {

  async onEmail(email) {

    console.log("Received email from:", email.from);

    console.log("Subject:", email.headers.get("subject"));


    // Reply to the email

    await this.replyToEmail(email, {

      fromName: "My Agent",

      body: "Thanks for your email!",

    });

  }

}


// Route emails to your Agent

export default {

  async email(message, env) {

    await routeAgentEmail(message, env, {

      resolver: createAddressBasedEmailResolver("EmailAgent"),

    });

  },

};


```

TypeScript

```

import { Agent, routeAgentEmail } from "agents";

import { createAddressBasedEmailResolver, type AgentEmail } from "agents/email";


// Your Agent that handles emails

export class EmailAgent extends Agent {

  async onEmail(email: AgentEmail) {

    console.log("Received email from:", email.from);

    console.log("Subject:", email.headers.get("subject"));


    // Reply to the email

    await this.replyToEmail(email, {

      fromName: "My Agent",

      body: "Thanks for your email!",

    });

  }

}


// Route emails to your Agent

export default {

  async email(message, env) {

    await routeAgentEmail(message, env, {

      resolver: createAddressBasedEmailResolver("EmailAgent"),

    });

  },

} satisfies ExportedHandler<Env>;


```

## Resolvers

Resolvers determine which Agent instance receives an incoming email. Choose the resolver that matches your use case.

### `createAddressBasedEmailResolver`

Recommended for inbound mail. Routes emails based on the recipient address.

* [  JavaScript ](#tab-panel-2344)
* [  TypeScript ](#tab-panel-2345)

JavaScript

```

import { createAddressBasedEmailResolver } from "agents/email";


const resolver = createAddressBasedEmailResolver("EmailAgent");


```

TypeScript

```

import { createAddressBasedEmailResolver } from "agents/email";


const resolver = createAddressBasedEmailResolver("EmailAgent");


```

**Routing logic:**

| Recipient Address                     | Agent Name           | Agent ID |
| ------------------------------------- | -------------------- | -------- |
| support@example.com                   | EmailAgent (default) | support  |
| sales@example.com                     | EmailAgent (default) | sales    |
| NotificationAgent+user123@example.com | NotificationAgent    | user123  |

The sub-address format (`agent+id@domain`) allows routing to different agent namespaces and instances from a single email domain.

### `createSecureReplyEmailResolver`

For reply flows with signature verification. Verifies that incoming emails are authentic replies to your outbound emails, preventing attackers from routing emails to arbitrary agent instances.

* [  JavaScript ](#tab-panel-2346)
* [  TypeScript ](#tab-panel-2347)

JavaScript

```

import { createSecureReplyEmailResolver } from "agents/email";


const resolver = createSecureReplyEmailResolver(env.EMAIL_SECRET);


```

TypeScript

```

import { createSecureReplyEmailResolver } from "agents/email";


const resolver = createSecureReplyEmailResolver(env.EMAIL_SECRET);


```

When your agent sends an email with `replyToEmail()` and a `secret`, it signs the routing headers with a timestamp. When a reply comes back, this resolver verifies the signature and checks that it has not expired before routing.

**Options:**

* [  JavaScript ](#tab-panel-2350)
* [  TypeScript ](#tab-panel-2351)

JavaScript

```

const resolver = createSecureReplyEmailResolver(env.EMAIL_SECRET, {

  // Maximum age of signature in seconds (default: 30 days)

  maxAge: 7 * 24 * 60 * 60, // 7 days


  // Callback for logging/debugging signature failures

  onInvalidSignature: (email, reason) => {

    console.warn(`Invalid signature from ${email.from}: ${reason}`);

    // reason can be: "missing_headers", "expired", "invalid", "malformed_timestamp"

  },

});


```

TypeScript

```

const resolver = createSecureReplyEmailResolver(env.EMAIL_SECRET, {

  // Maximum age of signature in seconds (default: 30 days)

  maxAge: 7 * 24 * 60 * 60, // 7 days


  // Callback for logging/debugging signature failures

  onInvalidSignature: (email, reason) => {

    console.warn(`Invalid signature from ${email.from}: ${reason}`);

    // reason can be: "missing_headers", "expired", "invalid", "malformed_timestamp"

  },

});


```

**When to use:** If your agent initiates email conversations and you need replies to route back to the same agent instance securely.

### `createCatchAllEmailResolver`

For single-instance routing. Routes all emails to a specific agent instance regardless of the recipient address.

* [  JavaScript ](#tab-panel-2348)
* [  TypeScript ](#tab-panel-2349)

JavaScript

```

import { createCatchAllEmailResolver } from "agents/email";


const resolver = createCatchAllEmailResolver("EmailAgent", "default");


```

TypeScript

```

import { createCatchAllEmailResolver } from "agents/email";


const resolver = createCatchAllEmailResolver("EmailAgent", "default");


```

**When to use:** When you have a single agent instance that handles all emails (for example, a shared inbox).

### Combining resolvers

You can combine resolvers to handle different scenarios:

* [  JavaScript ](#tab-panel-2366)
* [  TypeScript ](#tab-panel-2367)

JavaScript

```

export default {

  async email(message, env) {

    const secureReplyResolver = createSecureReplyEmailResolver(

      env.EMAIL_SECRET,

    );

    const addressResolver = createAddressBasedEmailResolver("EmailAgent");


    await routeAgentEmail(message, env, {

      resolver: async (email, env) => {

        // First, check if this is a signed reply

        const replyRouting = await secureReplyResolver(email, env);

        if (replyRouting) return replyRouting;


        // Otherwise, route based on recipient address

        return addressResolver(email, env);

      },


      // Handle emails that do not match any routing rule

      onNoRoute: (email) => {

        console.warn(`No route found for email from ${email.from}`);

        email.setReject("Unknown recipient");

      },

    });

  },

};


```

TypeScript

```

export default {

  async email(message, env) {

    const secureReplyResolver = createSecureReplyEmailResolver(

      env.EMAIL_SECRET,

    );

    const addressResolver = createAddressBasedEmailResolver("EmailAgent");


    await routeAgentEmail(message, env, {

      resolver: async (email, env) => {

        // First, check if this is a signed reply

        const replyRouting = await secureReplyResolver(email, env);

        if (replyRouting) return replyRouting;


        // Otherwise, route based on recipient address

        return addressResolver(email, env);

      },


      // Handle emails that do not match any routing rule

      onNoRoute: (email) => {

        console.warn(`No route found for email from ${email.from}`);

        email.setReject("Unknown recipient");

      },

    });

  },

} satisfies ExportedHandler<Env>;


```

## Handling emails in your Agent

### The AgentEmail interface

When your agent's `onEmail` method is called, it receives an `AgentEmail` object:

TypeScript

```

type AgentEmail = {

  from: string; // Sender's email address

  to: string; // Recipient's email address

  headers: Headers; // Email headers (subject, message-id, etc.)

  rawSize: number; // Size of the raw email in bytes


  getRaw(): Promise<Uint8Array>; // Get the full raw email content

  reply(options): Promise<void>; // Send a reply

  forward(rcptTo, headers?): Promise<void>; // Forward the email

  setReject(reason): void; // Reject the email with a reason

};


```

### Parsing email content

Use a library like [postal-mime ↗](https://www.npmjs.com/package/postal-mime) to parse the raw email:

* [  JavaScript ](#tab-panel-2356)
* [  TypeScript ](#tab-panel-2357)

JavaScript

```

import PostalMime from "postal-mime";


class MyAgent extends Agent {

  async onEmail(email) {

    const raw = await email.getRaw();

    const parsed = await PostalMime.parse(raw);


    console.log("Subject:", parsed.subject);

    console.log("Text body:", parsed.text);

    console.log("HTML body:", parsed.html);

    console.log("Attachments:", parsed.attachments);

  }

}


```

TypeScript

```

import PostalMime from "postal-mime";


class MyAgent extends Agent {

  async onEmail(email: AgentEmail) {

    const raw = await email.getRaw();

    const parsed = await PostalMime.parse(raw);


    console.log("Subject:", parsed.subject);

    console.log("Text body:", parsed.text);

    console.log("HTML body:", parsed.html);

    console.log("Attachments:", parsed.attachments);

  }

}


```

### Detecting auto-reply emails

Use `isAutoReplyEmail()` to detect auto-reply emails and avoid mail loops:

* [  JavaScript ](#tab-panel-2360)
* [  TypeScript ](#tab-panel-2361)

JavaScript

```

import { isAutoReplyEmail } from "agents/email";

import PostalMime from "postal-mime";


class MyAgent extends Agent {

  async onEmail(email) {

    const raw = await email.getRaw();

    const parsed = await PostalMime.parse(raw);


    // Detect auto-reply emails to avoid sending duplicate responses

    if (isAutoReplyEmail(parsed.headers)) {

      console.log("Skipping auto-reply email");

      return;

    }


    // Process the email...

  }

}


```

TypeScript

```

import { isAutoReplyEmail } from "agents/email";

import PostalMime from "postal-mime";


class MyAgent extends Agent {

  async onEmail(email: AgentEmail) {

    const raw = await email.getRaw();

    const parsed = await PostalMime.parse(raw);


    // Detect auto-reply emails to avoid sending duplicate responses

    if (isAutoReplyEmail(parsed.headers)) {

      console.log("Skipping auto-reply email");

      return;

    }


    // Process the email...

  }

}


```

This checks for standard RFC 3834 headers (`Auto-Submitted`, `X-Auto-Response-Suppress`, `Precedence`) that indicate an email is an auto-reply.

### Replying to emails

Use `this.replyToEmail()` to send a reply:

* [  JavaScript ](#tab-panel-2362)
* [  TypeScript ](#tab-panel-2363)

JavaScript

```

class MyAgent extends Agent {

  async onEmail(email) {

    await this.replyToEmail(email, {

      fromName: "Support Bot", // Display name for the sender

      subject: "Re: Your inquiry", // Optional, defaults to "Re: "

      body: "Thanks for contacting us!", // Email body

      contentType: "text/plain", // Optional, defaults to "text/plain"

      headers: {

        // Optional custom headers

        "X-Custom-Header": "value",

      },

      secret: this.env.EMAIL_SECRET, // Optional, signs headers for secure reply routing

    });

  }

}


```

TypeScript

```

class MyAgent extends Agent {

  async onEmail(email: AgentEmail) {

    await this.replyToEmail(email, {

      fromName: "Support Bot", // Display name for the sender

      subject: "Re: Your inquiry", // Optional, defaults to "Re: "

      body: "Thanks for contacting us!", // Email body

      contentType: "text/plain", // Optional, defaults to "text/plain"

      headers: {

        // Optional custom headers

        "X-Custom-Header": "value",

      },

      secret: this.env.EMAIL_SECRET, // Optional, signs headers for secure reply routing

    });

  }

}


```

### Forwarding emails

* [  JavaScript ](#tab-panel-2352)
* [  TypeScript ](#tab-panel-2353)

JavaScript

```

class MyAgent extends Agent {

  async onEmail(email) {

    await email.forward("admin@example.com");

  }

}


```

TypeScript

```

class MyAgent extends Agent {

  async onEmail(email: AgentEmail) {

    await email.forward("admin@example.com");

  }

}


```

### Rejecting emails

* [  JavaScript ](#tab-panel-2358)
* [  TypeScript ](#tab-panel-2359)

JavaScript

```

class MyAgent extends Agent {

  async onEmail(email) {

    if (isSpam(email)) {

      email.setReject("Message rejected as spam");

      return;

    }

    // Process the email...

  }

}


```

TypeScript

```

class MyAgent extends Agent {

  async onEmail(email: AgentEmail) {

    if (isSpam(email)) {

      email.setReject("Message rejected as spam");

      return;

    }

    // Process the email...

  }

}


```

## Secure reply routing

When your agent sends emails and expects replies, use secure reply routing to prevent attackers from forging headers to route emails to arbitrary agent instances.

### How it works

1. **Outbound:** When you call `replyToEmail()` with a `secret`, the agent signs the routing headers (`X-Agent-Name`, `X-Agent-ID`) using HMAC-SHA256.
2. **Inbound:** `createSecureReplyEmailResolver` verifies the signature before routing.
3. **Enforcement:** If an email was routed via the secure resolver, `replyToEmail()` requires a secret (or explicit `null` to opt-out).

### Setup

1. Add a secret to your `wrangler.jsonc`:  
   * [  wrangler.jsonc ](#tab-panel-2342)  
   * [  wrangler.toml ](#tab-panel-2343)  
```  
{  
  "vars": {  
    "EMAIL_SECRET": "change-me-in-production",  
  },  
}  
```  
```  
[vars]  
EMAIL_SECRET = "change-me-in-production"  
```  
For production, use Wrangler secrets instead:  
Terminal window  
```  
npx wrangler secret put EMAIL_SECRET  
```
2. Use the combined resolver pattern:  
   * [  JavaScript ](#tab-panel-2368)  
   * [  TypeScript ](#tab-panel-2369)  
JavaScript  
```  
export default {  
  async email(message, env) {  
    const secureReplyResolver = createSecureReplyEmailResolver(  
      env.EMAIL_SECRET,  
    );  
    const addressResolver = createAddressBasedEmailResolver("EmailAgent");  
    await routeAgentEmail(message, env, {  
      resolver: async (email, env) => {  
        const replyRouting = await secureReplyResolver(email, env);  
        if (replyRouting) return replyRouting;  
        return addressResolver(email, env);  
      },  
    });  
  },  
};  
```  
TypeScript  
```  
export default {  
  async email(message, env) {  
    const secureReplyResolver = createSecureReplyEmailResolver(  
      env.EMAIL_SECRET,  
    );  
    const addressResolver = createAddressBasedEmailResolver("EmailAgent");  
    await routeAgentEmail(message, env, {  
      resolver: async (email, env) => {  
        const replyRouting = await secureReplyResolver(email, env);  
        if (replyRouting) return replyRouting;  
        return addressResolver(email, env);  
      },  
    });  
  },  
} satisfies ExportedHandler<Env>;  
```
3. Sign outbound emails:  
   * [  JavaScript ](#tab-panel-2364)  
   * [  TypeScript ](#tab-panel-2365)  
JavaScript  
```  
class MyAgent extends Agent {  
  async onEmail(email) {  
    await this.replyToEmail(email, {  
      fromName: "My Agent",  
      body: "Thanks for your email!",  
      secret: this.env.EMAIL_SECRET, // Signs the routing headers  
    });  
  }  
}  
```  
TypeScript  
```  
class MyAgent extends Agent {  
  async onEmail(email: AgentEmail) {  
    await this.replyToEmail(email, {  
      fromName: "My Agent",  
      body: "Thanks for your email!",  
      secret: this.env.EMAIL_SECRET, // Signs the routing headers  
    });  
  }  
}  
```

### Enforcement behavior

When an email is routed via `createSecureReplyEmailResolver`, the `replyToEmail()` method enforces signing:

| secret value        | Behavior                                                     |
| ------------------- | ------------------------------------------------------------ |
| "my-secret"         | Signs headers (secure)                                       |
| undefined (omitted) | **Throws error** \- must provide secret or explicit opt-out  |
| null                | Allowed but not recommended - explicitly opts out of signing |

## Complete example

Here is a complete email agent with secure reply routing:

* [  JavaScript ](#tab-panel-2370)
* [  TypeScript ](#tab-panel-2371)

JavaScript

```

import { Agent, routeAgentEmail } from "agents";

import {

  createAddressBasedEmailResolver,

  createSecureReplyEmailResolver,

} from "agents/email";

import PostalMime from "postal-mime";


export class EmailAgent extends Agent {

  async onEmail(email) {

    const raw = await email.getRaw();

    const parsed = await PostalMime.parse(raw);


    console.log(`Email from ${email.from}: ${parsed.subject}`);


    // Store the email in state

    const emails = this.state.emails || [];

    emails.push({

      from: email.from,

      subject: parsed.subject,

      receivedAt: new Date().toISOString(),

    });

    this.setState({ ...this.state, emails });


    // Send auto-reply with signed headers

    await this.replyToEmail(email, {

      fromName: "Support Bot",

      body: `Thanks for your email! We received: "${parsed.subject}"`,

      secret: this.env.EMAIL_SECRET,

    });

  }

}


export default {

  async email(message, env) {

    const secureReplyResolver = createSecureReplyEmailResolver(

      env.EMAIL_SECRET,

      {

        maxAge: 7 * 24 * 60 * 60, // 7 days

        onInvalidSignature: (email, reason) => {

          console.warn(`Invalid signature from ${email.from}: ${reason}`);

        },

      },

    );

    const addressResolver = createAddressBasedEmailResolver("EmailAgent");


    await routeAgentEmail(message, env, {

      resolver: async (email, env) => {

        // Try secure reply routing first

        const replyRouting = await secureReplyResolver(email, env);

        if (replyRouting) return replyRouting;

        // Fall back to address-based routing

        return addressResolver(email, env);

      },

      onNoRoute: (email) => {

        console.warn(`No route found for email from ${email.from}`);

        email.setReject("Unknown recipient");

      },

    });

  },

};


```

TypeScript

```

import { Agent, routeAgentEmail } from "agents";

import {

  createAddressBasedEmailResolver,

  createSecureReplyEmailResolver,

  type AgentEmail,

} from "agents/email";

import PostalMime from "postal-mime";


interface Env {

  EmailAgent: DurableObjectNamespace;

  EMAIL_SECRET: string;

}


export class EmailAgent extends Agent {

  async onEmail(email: AgentEmail) {

    const raw = await email.getRaw();

    const parsed = await PostalMime.parse(raw);


    console.log(`Email from ${email.from}: ${parsed.subject}`);


    // Store the email in state

    const emails = this.state.emails || [];

    emails.push({

      from: email.from,

      subject: parsed.subject,

      receivedAt: new Date().toISOString(),

    });

    this.setState({ ...this.state, emails });


    // Send auto-reply with signed headers

    await this.replyToEmail(email, {

      fromName: "Support Bot",

      body: `Thanks for your email! We received: "${parsed.subject}"`,

      secret: this.env.EMAIL_SECRET,

    });

  }

}


export default {

  async email(message, env: Env) {

    const secureReplyResolver = createSecureReplyEmailResolver(

      env.EMAIL_SECRET,

      {

        maxAge: 7 * 24 * 60 * 60, // 7 days

        onInvalidSignature: (email, reason) => {

          console.warn(`Invalid signature from ${email.from}: ${reason}`);

        },

      },

    );

    const addressResolver = createAddressBasedEmailResolver("EmailAgent");


    await routeAgentEmail(message, env, {

      resolver: async (email, env) => {

        // Try secure reply routing first

        const replyRouting = await secureReplyResolver(email, env);

        if (replyRouting) return replyRouting;

        // Fall back to address-based routing

        return addressResolver(email, env);

      },

      onNoRoute: (email) => {

        console.warn(`No route found for email from ${email.from}`);

        email.setReject("Unknown recipient");

      },

    });

  },

} satisfies ExportedHandler<Env>;


```

## API reference

### `routeAgentEmail`

TypeScript

```

function routeAgentEmail<Env>(

  email: ForwardableEmailMessage,

  env: Env,

  options: {

    resolver: EmailResolver;

    onNoRoute?: (email: ForwardableEmailMessage) => void | Promise<void>;

  },

): Promise<void>;


```

Routes an incoming email to the appropriate Agent based on the resolver's decision.

| Option    | Description                                                                                                                                                                             |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resolver  | Function that determines which agent to route the email to                                                                                                                              |
| onNoRoute | Optional callback invoked when no routing information is found. Use this to reject the email or perform custom handling. If not provided, a warning is logged and the email is dropped. |

### `createSecureReplyEmailResolver`

TypeScript

```

function createSecureReplyEmailResolver(

  secret: string,

  options?: {

    maxAge?: number;

    onInvalidSignature?: (

      email: ForwardableEmailMessage,

      reason: SignatureFailureReason,

    ) => void;

  },

): EmailResolver;


type SignatureFailureReason =

  | "missing_headers"

  | "expired"

  | "invalid"

  | "malformed_timestamp";


```

Creates a resolver for routing email replies with signature verification.

| Option             | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| secret             | Secret key for HMAC verification (must match the key used to sign)       |
| maxAge             | Maximum age of signature in seconds (default: 30 days / 2592000 seconds) |
| onInvalidSignature | Optional callback for logging when signature verification fails          |

### `signAgentHeaders`

TypeScript

```

function signAgentHeaders(

  secret: string,

  agentName: string,

  agentId: string,

): Promise<Record<string, string>>;


```

Manually sign agent routing headers. Returns an object with `X-Agent-Name`, `X-Agent-ID`, `X-Agent-Sig`, and `X-Agent-Sig-Ts` headers.

Useful when sending emails through external services while maintaining secure reply routing. The signature includes a timestamp and will be valid for 30 days by default.

## Next steps

[ HTTP and SSE ](https://developers.cloudflare.com/agents/api-reference/http-sse/) Handle HTTP requests in your Agent. 

[ Webhooks ](https://developers.cloudflare.com/agents/guides/webhooks/) Receive events from external services. 

[ Agents API ](https://developers.cloudflare.com/agents/api-reference/agents-api/) Complete API reference for the Agents SDK. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/email/","name":"Email routing"}}]}
```
