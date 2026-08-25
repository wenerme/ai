---
description: Verify a signed request using the HMAC and SHA-256 algorithms or return a 403.
title: Sign requests
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Sign requests

Verify a signed request using the HMAC and SHA-256 algorithms or return a 403.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/signing-requests/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/signing-requests)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

Note

This example Worker makes use of the [Node.js Buffer API](https://developers.cloudflare.com/workers/runtime-apis/nodejs/buffer/), which is available as part of the Workers runtime [Node.js compatibility mode](https://developers.cloudflare.com/workers/runtime-apis/nodejs/). To run this Worker, you will need to [enable the nodejs\_compat compatibility flag](https://developers.cloudflare.com/workers/runtime-apis/nodejs/#get-started).

You can both verify and generate signed requests from within a Worker using the [Web Crypto APIs ↗](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle).

The following Worker will:

* For request URLs beginning with `/generate/`, replace `/generate/` with `/`, sign the resulting path with its timestamp, and return the full, signed URL in the response body.
* For all other request URLs, verify the signed URL and allow the request through.

```js
import { Buffer } from "node:buffer";

const encoder = new TextEncoder();

// How long an HMAC token should be valid for, in seconds
const EXPIRY = 60;

export default {
	/**
	 *
	 * @param {Request} request
	 * @param {{SECRET_DATA: string}} env
	 * @returns
	 */
	async fetch(request, env) {
		// You will need some secret data to use as a symmetric key. This should be
		// attached to your Worker as an encrypted secret.
		// Refer to https://developers.cloudflare.com/workers/configuration/secrets/
		const secretKeyData = encoder.encode(
			env.SECRET_DATA ?? "my secret symmetric key",
		);

		// Import your secret as a CryptoKey for both 'sign' and 'verify' operations
		const key = await crypto.subtle.importKey(
			"raw",
			secretKeyData,
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["sign", "verify"],
		);

		const url = new URL(request.url);

		// This is a demonstration Worker that allows unauthenticated access to /generate
		// In a real application you would want to make sure that
		// users could only generate signed URLs when authenticated
		if (url.pathname.startsWith("/generate/")) {
			url.pathname = url.pathname.replace("/generate/", "/");

			const timestamp = Math.floor(Date.now() / 1000);

			// This contains all the data about the request that you want to be able to verify
			// Here we only sign the timestamp and the pathname, but often you will want to
			// include more data (for instance, the URL hostname or query parameters)
			const dataToAuthenticate = `${url.pathname}${timestamp}`;

			const mac = await crypto.subtle.sign(
				"HMAC",
				key,
				encoder.encode(dataToAuthenticate),
			);

			// Refer to https://developers.cloudflare.com/workers/runtime-apis/nodejs/
			// for more details on using Node.js APIs in Workers
			const base64Mac = Buffer.from(mac).toString("base64");

			url.searchParams.set("verify", `${timestamp}-${base64Mac}`);

			return new Response(`${url.pathname}${url.search}`);
			// Verify all non /generate requests
		} else {
			// Make sure you have the minimum necessary query parameters.
			if (!url.searchParams.has("verify")) {
				return new Response("Missing query parameter", { status: 403 });
			}

			const [timestamp, hmac] = url.searchParams.get("verify").split("-");

			const assertedTimestamp = Number(timestamp);

			const dataToAuthenticate = `${url.pathname}${assertedTimestamp}`;

			const receivedMac = Buffer.from(hmac, "base64");

			// Use crypto.subtle.verify() to guard against timing attacks. Since HMACs use
			// symmetric keys, you could implement this by calling crypto.subtle.sign() and
			// then doing a string comparison -- this is insecure, as string comparisons
			// bail out on the first mismatch, which leaks information to potential
			// attackers.
			const verified = await crypto.subtle.verify(
				"HMAC",
				key,
				receivedMac,
				encoder.encode(dataToAuthenticate),
			);

			if (!verified) {
				return new Response("Invalid MAC", { status: 403 });
			}

			// Signed requests expire after one minute. Note that this value should depend on your specific use case
			if (Date.now() / 1000 > assertedTimestamp + EXPIRY) {
				return new Response(
					`URL expired at ${new Date((assertedTimestamp + EXPIRY) * 1000)}`,
					{ status: 403 },
				);
			}
		}

		return fetch(new URL(url.pathname, "https://example.com"), request);
	},
};
```

```ts
import { Buffer } from "node:buffer";

const encoder = new TextEncoder();

// How long an HMAC token should be valid for, in seconds
const EXPIRY = 60;

interface Env {
	SECRET_DATA: string;
}
export default {
	async fetch(request, env): Promise<Response> {
		// You will need some secret data to use as a symmetric key. This should be
		// attached to your Worker as an encrypted secret.
		// Refer to https://developers.cloudflare.com/workers/configuration/secrets/
		const secretKeyData = encoder.encode(
			env.SECRET_DATA ?? "my secret symmetric key",
		);

		// Import your secret as a CryptoKey for both 'sign' and 'verify' operations
		const key = await crypto.subtle.importKey(
			"raw",
			secretKeyData,
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["sign", "verify"],
		);

		const url = new URL(request.url);

		// This is a demonstration Worker that allows unauthenticated access to /generate
		// In a real application you would want to make sure that
		// users could only generate signed URLs when authenticated
		if (url.pathname.startsWith("/generate/")) {
			url.pathname = url.pathname.replace("/generate/", "/");

			const timestamp = Math.floor(Date.now() / 1000);

			// This contains all the data about the request that you want to be able to verify
			// Here we only sign the timestamp and the pathname, but often you will want to
			// include more data (for instance, the URL hostname or query parameters)
			const dataToAuthenticate = `${url.pathname}${timestamp}`;

			const mac = await crypto.subtle.sign(
				"HMAC",
				key,
				encoder.encode(dataToAuthenticate),
			);

			// Refer to https://developers.cloudflare.com/workers/runtime-apis/nodejs/
			// for more details on using NodeJS APIs in Workers
			const base64Mac = Buffer.from(mac).toString("base64");

			url.searchParams.set("verify", `${timestamp}-${base64Mac}`);

			return new Response(`${url.pathname}${url.search}`);
			// Verify all non /generate requests
		} else {
			// Make sure you have the minimum necessary query parameters.
			if (!url.searchParams.has("verify")) {
				return new Response("Missing query parameter", { status: 403 });
			}

			const [timestamp, hmac] = url.searchParams.get("verify").split("-");

			const assertedTimestamp = Number(timestamp);

			const dataToAuthenticate = `${url.pathname}${assertedTimestamp}`;

			const receivedMac = Buffer.from(hmac, "base64");

			// Use crypto.subtle.verify() to guard against timing attacks. Since HMACs use
			// symmetric keys, you could implement this by calling crypto.subtle.sign() and
			// then doing a string comparison -- this is insecure, as string comparisons
			// bail out on the first mismatch, which leaks information to potential
			// attackers.
			const verified = await crypto.subtle.verify(
				"HMAC",
				key,
				receivedMac,
				encoder.encode(dataToAuthenticate),
			);

			if (!verified) {
				return new Response("Invalid MAC", { status: 403 });
			}

			// Signed requests expire after one minute. Note that this value should depend on your specific use case
			if (Date.now() / 1000 > assertedTimestamp + EXPIRY) {
				return new Response(
					`URL expired at ${new Date((assertedTimestamp + EXPIRY) * 1000)}`,
					{ status: 403 },
				);
			}
		}

		return fetch(new URL(url.pathname, "https://example.com"), request);
	},
} satisfies ExportedHandler<Env>;
```

```ts
import { Buffer } from "node:buffer";
import { Hono } from "hono";
import { proxy } from "hono/proxy";

const encoder = new TextEncoder();

// How long an HMAC token should be valid for, in seconds
const EXPIRY = 60;

interface Env {
	SECRET_DATA: string;
}

const app = new Hono();

// Handle URL generation requests
app.get("/generate/*", async (c) => {
	const env = c.env;

	// You will need some secret data to use as a symmetric key
	const secretKeyData = encoder.encode(
		env.SECRET_DATA ?? "my secret symmetric key",
	);

	// Import the secret as a CryptoKey for both 'sign' and 'verify' operations
	const key = await crypto.subtle.importKey(
		"raw",
		secretKeyData,
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign", "verify"],
	);

	// Replace "/generate/" prefix with "/"
	let pathname = c.req.path.replace("/generate/", "/");

	const timestamp = Math.floor(Date.now() / 1000);

	// Data to authenticate: pathname + timestamp
	const dataToAuthenticate = `${pathname}${timestamp}`;

	// Sign the data
	const mac = await crypto.subtle.sign(
		"HMAC",
		key,
		encoder.encode(dataToAuthenticate),
	);

	// Convert the signature to base64
	const base64Mac = Buffer.from(mac).toString("base64");

	// Add verification parameter to URL
	url.searchParams.set("verify", `${timestamp}-${base64Mac}`);

	return c.text(`${pathname}${url.search}`);
});

// Handle verification for all other requests
app.all("*", async (c) => {
	const env = c.env;
	const url = c.req.url;

	// You will need some secret data to use as a symmetric key
	const secretKeyData = encoder.encode(
		env.SECRET_DATA ?? "my secret symmetric key",
	);

	// Import the secret as a CryptoKey for both 'sign' and 'verify' operations
	const key = await crypto.subtle.importKey(
		"raw",
		secretKeyData,
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign", "verify"],
	);

	// Make sure the request has the verification parameter
	if (!c.req.query("verify")) {
		return c.text("Missing query parameter", 403);
	}

	// Extract timestamp and signature
	const [timestamp, hmac] = c.req.query("verify")!.split("-");
	const assertedTimestamp = Number(timestamp);

	// Recreate the data that should have been signed
	const dataToAuthenticate = `${c.req.path}${assertedTimestamp}`;

	// Convert base64 signature back to ArrayBuffer
	const receivedMac = Buffer.from(hmac, "base64");

	// Verify the signature
	const verified = await crypto.subtle.verify(
		"HMAC",
		key,
		receivedMac,
		encoder.encode(dataToAuthenticate),
	);

	// If verification fails, return 403
	if (!verified) {
		return c.text("Invalid MAC", 403);
	}

	// Check if the signature has expired
	if (Date.now() / 1000 > assertedTimestamp + EXPIRY) {
		return c.text(
			`URL expired at ${new Date((assertedTimestamp + EXPIRY) * 1000)}`,
			403,
		);
	}

	// If verification passes, proxy the request to example.com
	return proxy(`https://example.com/${c.req.path}`, ...c.req);
});

export default app;
```

```py
from workers import WorkerEntrypoint
from pyodide.ffi import to_js as _to_js
from js import Response, URL, TextEncoder, Buffer, fetch, Object, crypto

def to_js(x):
    return _to_js(x, dict_converter=Object.fromEntries)

encoder = TextEncoder.new()

# How long an HMAC token should be valid for, in seconds
EXPIRY = 60

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        # Get the secret key
        secret_key_data = encoder.encode(getattr(self.env, "SECRET_DATA", None) or "my secret symmetric key")

        # Import the secret as a CryptoKey for both 'sign' and 'verify' operations
        key = await crypto.subtle.importKey(
            "raw",
            secret_key_data,
            to_js({"name": "HMAC", "hash": "SHA-256"}),
            False,
            ["sign", "verify"]
        )

        url = URL.new(request.url)

        if url.pathname.startswith("/generate/"):
            url.pathname = url.pathname.replace("/generate/", "/", 1)

            timestamp = int(Date.now() / 1000)

            # Data to authenticate
            data_to_authenticate = f"{url.pathname}{timestamp}"

            # Sign the data
            mac = await crypto.subtle.sign(
                "HMAC",
                key,
                encoder.encode(data_to_authenticate)
            )

            # Convert to base64
            base64_mac = Buffer.from(mac).toString("base64")

            # Set the verification parameter
            url.searchParams.set("verify", f"{timestamp}-{base64_mac}")

            return Response.new(f"{url.pathname}{url.search}")
        else:
            # Verify the request
            if not "verify" in url.searchParams:
                return Response.new("Missing query parameter", status=403)

            verify_param = url.searchParams.get("verify")
            timestamp, hmac = verify_param.split("-")

            asserted_timestamp = int(timestamp)

            data_to_authenticate = f"{url.pathname}{asserted_timestamp}"

            received_mac = Buffer.from(hmac, "base64")

            # Verify the signature
            verified = await crypto.subtle.verify(
                "HMAC",
                key,
                received_mac,
                encoder.encode(data_to_authenticate)
            )

            if not verified:
                return Response.new("Invalid MAC", status=403)

            # Check expiration
            if Date.now() / 1000 > asserted_timestamp + EXPIRY:
                expiry_date = Date.new((asserted_timestamp + EXPIRY) * 1000)
                return Response.new(f"URL expired at {expiry_date}", status=403)

        # Proxy to example.com if verification passes
        return fetch(URL.new(f"https://example.com{url.pathname}"), request)
```

## Validate signed requests using the WAF

The provided example code for signing requests is compatible with the [is\_timed\_hmac\_valid\_v0()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#hmac-validation) Rules language function. This means that you can verify requests signed by the Worker script using a [custom rule](https://developers.cloudflare.com/waf/custom-rules/use-cases/configure-token-authentication/#option-2-configure-using-custom-rules).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/signing-requests/#page","headline":"Sign requests · Cloudflare Workers docs","description":"Verify a signed request using the HMAC and SHA-256 algorithms or return a 403.","url":"https://developers.cloudflare.com/workers/examples/signing-requests/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Security","WebCrypto","JavaScript","TypeScript","Python"]}
```
