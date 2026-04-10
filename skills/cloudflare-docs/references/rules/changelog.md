---
title: Rules changelog
description: Two new fields are now available in rule expressions that surface Layer 4 transport telemetry from the client connection. Together with the existing cf.timings.client_tcp_rtt_msec field, these fields give you a complete picture of connection quality for both TCP and QUIC traffic — enabling transport-aware rules without requiring any client-side changes.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/changelog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Rules changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/rules.xml) 

## 2026-04-01

  
**New QUIC RTT and delivery rate fields**   

Two new fields are now available in rule expressions that surface Layer 4 transport telemetry from the client connection. Together with the existing [cf.timings.client\_tcp\_rtt\_msec](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/) field, these fields give you a complete picture of connection quality for both TCP and QUIC traffic — enabling transport-aware rules without requiring any client-side changes.

Previously, QUIC RTT and delivery rate data was only available via the `Server-Timing: cfL4` response header. These new fields make the same data available directly in rule expressions, so you can use them in Transform Rules, WAF Custom Rules, and other phases that support dynamic fields.

#### New fields

| Field                              | Type    | Description                                                                                                                                                             |
| ---------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cf.timings.client\_quic\_rtt\_msec | Integer | The smoothed QUIC round-trip time (RTT) between Cloudflare and the client in milliseconds. Only populated for QUIC (HTTP/3) connections. Returns 0 for TCP connections. |
| cf.edge.l4.delivery\_rate          | Integer | The most recent data delivery rate estimate for the client connection, in bytes per second. Returns 0 when L4 statistics are not available for the request.             |

#### Example: Route slow connections to a lightweight origin

Use a request header transform rule to tag requests from high-latency connections, so your origin can serve a lighter page variant:

**Rule expression:**

```

cf.timings.client_tcp_rtt_msec > 200 or cf.timings.client_quic_rtt_msec > 200


```

**Header modifications:**

| Operation | Header name    | Value |
| --------- | -------------- | ----- |
| Set       | X-High-Latency | true  |

#### Example: Match low-bandwidth connections

```

cf.edge.l4.delivery_rate > 0 and cf.edge.l4.delivery_rate < 100000


```

For more information, refer to [Request Header Transform Rules](https://developers.cloudflare.com/rules/transform/request-header-modification/) and the [fields reference](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/).

## 2026-03-25

  
**New mTLS certificate fields for Transform Rules**   

Cloudflare now exposes four new fields in the Transform Rules phase that encode client certificate data in [RFC 9440 ↗](https://www.rfc-editor.org/rfc/rfc9440) format. Previously, forwarding client certificate information to your origin required custom parsing of PEM-encoded fields or non-standard HTTP header formats. These new fields produce output in the standardized `Client-Cert` and `Client-Cert-Chain` header format defined by RFC 9440, so your origin can consume them directly without any additional decoding logic.

Each certificate is DER-encoded, Base64-encoded, and wrapped in colons. For example, `:MIIDsT...Vw==:`. A chain of intermediates is expressed as a comma-separated list of such values.

#### New fields

| Field                                                 | Type    | Description                                                                                                                                                      |
| ----------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cf.tls\_client\_auth.cert\_rfc9440                    | String  | The client leaf certificate in RFC 9440 format. Empty if no client certificate was presented.                                                                    |
| cf.tls\_client\_auth.cert\_rfc9440\_too\_large        | Boolean | true if the leaf certificate exceeded 10 KB and was omitted. In practice this will almost always be false.                                                       |
| cf.tls\_client\_auth.cert\_chain\_rfc9440             | String  | The intermediate certificate chain in RFC 9440 format as a comma-separated list. Empty if no intermediate certificates were sent or if the chain exceeded 16 KB. |
| cf.tls\_client\_auth.cert\_chain\_rfc9440\_too\_large | Boolean | true if the intermediate chain exceeded 16 KB and was omitted.                                                                                                   |

The chain encoding follows the same ordering as the TLS handshake: the certificate closest to the leaf appears first, working up toward the trust anchor. The root certificate is not included.

#### Example: Forwarding client certificate headers to your origin server

Add a request header transform rule to set the `Client-Cert` and `Client-Cert-Chain` headers on requests forwarded to your origin server. For example, to forward headers for verified, non-revoked certificates:

**Rule expression:**

```

cf.tls_client_auth.cert_verified and not cf.tls_client_auth.cert_revoked


```

**Header modifications:**

| Operation | Header name       | Value                                     |
| --------- | ----------------- | ----------------------------------------- |
| Set       | Client-Cert       | cf.tls\_client\_auth.cert\_rfc9440        |
| Set       | Client-Cert-Chain | cf.tls\_client\_auth.cert\_chain\_rfc9440 |

To get the most out of these fields, upload your client CA certificate to Cloudflare so that Cloudflare validates the client certificate at the edge and populates `cf.tls_client_auth.cert_verified` and `cf.tls_client_auth.cert_revoked`.

Prevent header injection

You should ensure that `Client-Cert` and `Client-Cert-Chain` headers received by your origin server can only originate from this transform rule — any client could send these headers directly.

* **If you use WAF custom rules to block requests with invalid mTLS connections:** The transform rule is sufficient. For all requests that reach your origin server, the rule will overwrite any existing `Client-Cert` and `Client-Cert-Chain` headers.
* **If you do not enforce mTLS at the WAF:** Add another transform rule that removes any incoming `Client-Cert` and `Client-Cert-Chain` headers from all requests (use expression `true`), ordered before the rule above. This ensures your origin server cannot receive client-supplied values for these HTTP headers.

For more information, refer to [Mutual TLS authentication](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/), [Request Header Transform Rules](https://developers.cloudflare.com/rules/transform/request-header-modification/), and the [fields reference](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/).

## 2026-03-18

  
**Worker execution timing field now available in Rules**   

The `cf.timings.worker_msec` field is now available in the Ruleset Engine. This field reports the wall-clock time that a Cloudflare Worker spent handling a request, measured in milliseconds.

You can use this field to identify slow Worker executions, detect performance regressions, or build rules that respond differently based on Worker processing time, such as logging requests that exceed a latency threshold.

#### Field details

| Field                   | Type    | Description                                                                                       |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| cf.timings.worker\_msec | Integer | The time spent executing a Cloudflare Worker in milliseconds. Returns 0 if no Worker was invoked. |

Example filter expression:

```

cf.timings.worker_msec > 500


```

For more information, refer to the [Fields reference](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.timings.worker%5Fmsec/).

## 2026-01-27

  
**Control request and response body buffering in Configuration Rules**   

You can now control how Cloudflare buffers HTTP request and response bodies using two new settings in [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/).

#### Request body buffering

Controls how Cloudflare buffers HTTP request bodies before forwarding them to your origin server:

| Mode                   | Behavior                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Standard** (default) | Cloudflare can inspect a prefix of the request body for enabled functionality such as WAF and Bot Management. |
| **Full**               | Buffers the entire request body before sending to origin.                                                     |
| **None**               | No buffering — the request body streams directly to origin without inspection.                                |

#### Response body buffering

Controls how Cloudflare buffers HTTP response bodies before forwarding them to the client:

| Mode                   | Behavior                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Standard** (default) | Cloudflare can inspect a prefix of the response body for enabled functionality.     |
| **None**               | No buffering — the response body streams directly to the client without inspection. |

Warning

Setting body buffering to **None** may break security functionality that requires body inspection, including the Web Application Firewall (WAF) and Bot Management. Ensure that any paths where you disable buffering do not require security inspection.

Availability

These settings only take effect on zones running Cloudflare's [latest CDN proxy ↗](https://blog.cloudflare.com/20-percent-internet-upgrade/). Enterprise customers can contact their account team to enable the latest proxy on their zones.

#### API example

```

{

  "action": "set_config",

  "action_parameters": {

    "request_body_buffering": "standard",

    "response_body_buffering": "none"

  }

}


```

For more information, refer to [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/).

## 2026-01-22

  
**New cryptographic functions — encode\_base64() and sha256()**   

Cloudflare Rulesets now includes `encode_base64()` and `sha256()` functions, enabling you to generate signed request headers directly in rule expressions. These functions support common patterns like constructing a canonical string from request attributes, computing a SHA256 digest, and Base64-encoding the result.

---

#### New functions

| Function                     | Description                                                                                                                                                                                                                                             | Availability                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| encode\_base64(input, flags) | Encodes a string to Base64 format. Optional flags parameter: u for URL-safe encoding, p for padding (adds \= characters to make the output length a multiple of 4, as required by some systems). By default, output is standard Base64 without padding. | All plans (in header transform rules) |
| sha256(input)                | Computes a SHA256 hash of the input string.                                                                                                                                                                                                             | Requires enablement                   |

Note

The `sha256()` function is available as an Enterprise add-on and requires a specific entitlement. Contact your account team to enable it.

---

#### Examples

**Encode a string to Base64 format:**

```

encode_base64("hello world")


```

Returns: `aGVsbG8gd29ybGQ`

**Encode a string to Base64 format with padding:**

```

encode_base64("hello world", "p")


```

Returns: `aGVsbG8gd29ybGQ=`

**Perform a URL-safe Base64 encoding of a string:**

```

encode_base64("hello world", "u")


```

Returns: `aGVsbG8gd29ybGQ`

**Compute the SHA256 hash of a secret token:**

```

sha256("my-token")


```

Returns a hash that your origin can validate to authenticate requests.

**Compute the SHA256 hash of a string and encode the result to Base64 format:**

```

encode_base64(sha256("my-token"))


```

Combines hashing and encoding for systems that expect Base64-encoded signatures.

For more information, refer to the [Functions reference](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/).

## 2026-01-20

  
**New functions for array and map operations**   

#### New functions for array and map operations

Cloudflare Rulesets now include new functions that enable advanced expression logic for evaluating arrays and maps. These functions allow you to build rules that match against lists of values in request or response headers, enabling use cases like country-based blocking using custom headers.

---

#### New functions

| Function                 | Description                                                                   |
| ------------------------ | ----------------------------------------------------------------------------- |
| split(source, delimiter) | Splits a string into an array of strings using the specified delimiter.       |
| join(array, delimiter)   | Joins an array of strings into a single string using the specified delimiter. |
| has\_key(map, key)       | Returns true if the specified key exists in the map.                          |
| has\_value(map, value)   | Returns true if the specified value exists in the map.                        |

---

#### Example use cases

**Check if a country code exists in a header list:**

```

has_value(split(http.response.headers["x-allow-country"][0], ","), ip.src.country)


```

**Check if a specific header key exists:**

```

has_key(http.request.headers, "x-custom-header")


```

**Join array values for logging or comparison:**

```

join(http.request.headers.names, ", ")


```

For more information, refer to the [Functions reference](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/).

## 2026-01-12

  
**Metro code field now available in Rules**   

The `ip.src.metro_code` field in the Ruleset Engine is now populated with DMA (Designated Market Area) data.

You can use this field to build rules that target traffic based on geographic market areas, enabling more granular location-based policies for your applications.

#### Field details

| Field              | Type           | Description                                                                                                                   |
| ------------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| ip.src.metro\_code | String \| null | The metro code (DMA) of the incoming request's IP address. Returns the designated market area code for the client's location. |

Example filter expression:

```

ip.src.metro_code eq "501"


```

For more information, refer to the [Fields reference](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.metro%5Fcode/).

## 2025-10-30

  
**New TCP-based fields available in Rulesets**   

#### Build rules based on TCP transport and latency

Cloudflare now provides two new request fields in the Ruleset engine that let you make decisions based on whether a request used TCP and the measured TCP round-trip time between the client and Cloudflare. These fields help you understand protocol usage across your traffic and build policies that respond to network performance. For example, you can distinguish TCP from QUIC traffic or route high latency requests to alternative origins when needed.

---

#### New fields

| Field                             | Type    | Description                                                                                                                                                          |
| --------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cf.edge.client\_tcp               | Boolean | Indicates whether the request used TCP. A value of true means the client connected using TCP instead of QUIC.                                                        |
| cf.timings.client\_tcp\_rtt\_msec | Number  | Reports the smoothed TCP round-trip time between the client and Cloudflare in milliseconds. For example, a value of 20 indicates roughly twenty milliseconds of RTT. |

Example filter expression:

```

cf.edge.client_tcp && cf.timings.client_tcp_rtt_msec < 100


```

More information can be found in the Rules language [fields reference](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/).

## 2025-06-09

  
**More flexible fallback handling — Custom Errors now support fetching assets returned with 4xx or 5xx status codes**   

[Custom Errors](https://developers.cloudflare.com/rules/custom-errors/) can now fetch and store [assets](https://developers.cloudflare.com/rules/custom-errors/create-rules/#create-a-custom-error-asset-dashboard) and [error pages](https://developers.cloudflare.com/rules/custom-errors/#error-pages) from your origin even if they are served with a 4xx or 5xx HTTP status code — previously, only 200 OK responses were allowed.

**What’s new:**

* You can now upload error pages and error assets that return error status codes (for example, 403, 500, 502, 503, 504) when fetched.
* These assets are stored and minified at the edge, so they can be reused across multiple Custom Error rules without triggering requests to the origin.

This is especially useful for retrieving error content or downtime banners from your backend when you can’t override the origin status code.

Learn more in the [Custom Errors](https://developers.cloudflare.com/rules/custom-errors/) documentation.

## 2025-06-09

  
**Match Workers subrequests by upstream zone — cf.worker.upstream\_zone now supported in Transform Rules**   

You can now use the [cf.worker.upstream\_zone](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.worker.upstream%5Fzone/) field in [Transform Rules](https://developers.cloudflare.com/rules/transform/) to control rule execution based on whether a request originates from [Workers](https://developers.cloudflare.com/workers/), including subrequests issued by Workers in other zones.

![Match Workers subrequests by upstream zone in Transform Rules](https://developers.cloudflare.com/_astro/transform-rule-subrequest-matching.BeUBEN67_wWefn.webp) 

**What's new:**

* `cf.worker.upstream_zone` is now supported in Transform Rules expressions.
* Skip or apply logic conditionally when handling [Workers subrequests](https://developers.cloudflare.com/workers/platform/limits/#subrequests).

For example, to add a header when the subrequest comes from another zone:

Text in **Expression Editor** (replace `myappexample.com` with your domain):

```

(cf.worker.upstream_zone != "" and cf.worker.upstream_zone != "myappexample.com")


```

Selected operation under **Modify request header**: _Set static_

**Header name**: `X-External-Workers-Subrequest`

**Value**: `1`

This gives you more granular control in how you handle incoming requests for your zone.

Learn more in the [Transform Rules](https://developers.cloudflare.com/rules/transform/) documentation and [Rules language fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/) reference.

## 2025-05-30

  
**Fine-tune image optimization — WebP now supported in Configuration Rules**   

You can now enable [Polish](https://developers.cloudflare.com/images/polish/activate-polish/) with the `webp` format directly in [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/), allowing you to optimize image delivery for specific routes, user agents, or A/B tests — without applying changes zone-wide.

**What’s new:**

* [WebP](https://developers.cloudflare.com/images/polish/compression/#webp) is now a supported [value](https://developers.cloudflare.com/rules/configuration-rules/settings/#polish) in the **Polish** setting for Configuration Rules.

This gives you more precise control over how images are compressed and delivered, whether you're targeting modern browsers, running experiments, or tailoring performance by geography or device type.

Learn more in the [Polish](https://developers.cloudflare.com/images/polish/) and [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/) documentation.

## 2025-05-09

  
**More ways to match — Snippets now support Custom Lists, Bot Score, and WAF Attack Score**   

You can now use IP, Autonomous System (AS), and Hostname [custom lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/) to route traffic to [Snippets](https://developers.cloudflare.com/rules/snippets/) and [Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/), giving you greater precision and control over how you match and process requests at the edge.

In Snippets, you can now also match on [Bot Score](https://developers.cloudflare.com/bots/concepts/bot-score/) and [WAF Attack Score](https://developers.cloudflare.com/waf/detections/attack-score/), unlocking smarter edge logic for everything from request filtering and mitigation to [tarpitting](https://developers.cloudflare.com/rules/snippets/examples/slow-suspicious-requests/) and logging.

**What’s new:**

* [Custom lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/) matching – Snippets and Cloud Connector now support user-created IP, AS, and Hostname lists via dashboard or [Lists API](https://developers.cloudflare.com/api/resources/rules/subresources/lists/methods/list/). Great for shared logic across zones.
* [Bot Score](https://developers.cloudflare.com/bots/concepts/bot-score/) and [WAF Attack Score](https://developers.cloudflare.com/waf/detections/attack-score/) – Use Cloudflare’s intelligent traffic signals to detect bots or attacks and take advanced, tailored actions with just a few lines of code.
![New fields in Snippets](https://developers.cloudflare.com/_astro/snippets-lists-scores.D05l6zgc_ZG4Rof.webp) 

These enhancements unlock new possibilities for building smarter traffic workflows with minimal code and maximum efficiency.

Learn more in the [Snippets](https://developers.cloudflare.com/rules/snippets/) and [Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/) documentation.

## 2025-04-24

  
**Custom Errors are now Generally Available**   

[Custom Errors](https://developers.cloudflare.com/rules/custom-errors/) are now generally available for all paid plans — bringing a unified and powerful experience for customizing error responses at both the zone and account levels.

You can now manage **Custom Error Rules**, **Custom Error Assets**, and redesigned **Error Pages** directly from the Cloudflare dashboard. These features let you deliver tailored messaging when errors occur, helping you maintain brand consistency and improve user experience — whether it’s a 404 from your origin or a security challenge from Cloudflare.

What's new:

* **Custom Errors are now GA** – Available on all paid plans and ready for production traffic.
* **UI for Custom Error Rules and Assets** – Manage your zone-level rules from the Rules > Overview and your zone-level assets from the Rules > Settings tabs.
* **Define inline content or upload assets** – Create custom responses directly in the rule builder, upload new or reuse previously stored assets.
* **Refreshed UI and new name for Error Pages** – Formerly known as “Custom Pages,” Error Pages now offer a cleaner, more intuitive experience for both zone and account-level configurations.
* **Powered by Ruleset Engine** – Custom Error Rules support [conditional logic](https://developers.cloudflare.com/ruleset-engine/rules-language/) and override Error Pages for 500 and 1000 class errors, as well as errors originating from your origin or [other Cloudflare products](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/). You can also configure [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/) to add, change, or remove HTTP headers from responses returned by Custom Error Rules.

Learn more in the [Custom Errors documentation](https://developers.cloudflare.com/rules/custom-errors/).

## 2025-04-09

  
**Cloudflare Snippets are now Generally Available**   
![Cloudflare Snippets are now GA](https://developers.cloudflare.com/_astro/snippets-ga.BJr3csvv_Z2q49jT.webp) 

[Cloudflare Snippets](https://developers.cloudflare.com/rules/snippets/) are now generally available at no extra cost across all paid plans — giving you a fast, flexible way to programmatically control HTTP traffic using lightweight JavaScript.

You can now use Snippets to modify HTTP requests and responses with confidence, reliability, and scale. Snippets are production-ready and deeply integrated with Cloudflare Rules, making them ideal for everything from quick dynamic header rewrites to advanced routing logic.

What's new:

* **Snippets are now GA** – Available at no extra cost on all Pro, Business, and Enterprise plans.
* **Ready for production** – Snippets deliver a production-grade experience built for scale.
* **Part of the Cloudflare Rules platform** – Snippets inherit request modifications from other Cloudflare products and support sequential execution, allowing you to run multiple Snippets on the same request and apply custom modifications step by step.
* **Trace integration** – Use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to see which Snippets were triggered on a request — helping you understand traffic flow and debug more effectively.  
![Snippets shown in Cloudflare Trace results](https://developers.cloudflare.com/_astro/snippets-ga-trace.WlCshaFo_1WNo07.webp)

Learn more in the [launch blog post ↗](https://blog.cloudflare.com/snippets/).

## 2025-02-12

  
**Increased Cloudflare Rules limits**   

We have upgraded and streamlined [Cloudflare Rules](https://developers.cloudflare.com/rules/) limits across all plans, simplifying rule management and improving scalability for everyone.

**New limits by product:**

* [Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/)  
   * Free: **20** → **10,000** URL redirects across lists  
   * Pro: **500** → **25,000** URL redirects across lists  
   * Business: **500** → **50,000** URL redirects across lists  
   * Enterprise: **10,000** → **1,000,000** URL redirects across lists
* [Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/)  
   * Free: **5** → **10** connectors  
   * Enterprise: **125** → **300** connectors
* [Custom Errors](https://developers.cloudflare.com/rules/custom-errors/)  
   * Pro: **5** → **25** error assets and rules  
   * Business: **20** → **50** error assets and rules  
   * Enterprise: **50** → **300** error assets and rules
* [Snippets](https://developers.cloudflare.com/rules/snippets/)  
   * Pro: **10** → **25** code snippets and rules  
   * Business: **25** → **50** code snippets and rules  
   * Enterprise: **50** → **300** code snippets and rules
* [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/), [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/), [Compression Rules](https://developers.cloudflare.com/rules/compression-rules/), [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/), [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/), and [Transform Rules](https://developers.cloudflare.com/rules/transform/)  
   * Enterprise: **125** → **300** rules

Gradual rollout

Limits are updated gradually. Some customers may still see previous limits until the rollout is fully completed in the first half of 2025.

## 2025-02-11

  
**Custom Errors (beta): Stored Assets & Account-level Rules**   

We're introducing [Custom Errors](https://developers.cloudflare.com/rules/custom-errors/) (beta), which builds on our existing Custom Error Responses feature with new asset storage capabilities.

This update allows you to store externally hosted error pages on Cloudflare and reference them in custom error rules, eliminating the need to supply inline content.

This brings the following new capabilities:

* **Custom error assets** – Fetch and store external error pages at the edge for use in error responses.
* **Account-Level custom errors** – Define error handling rules and assets at the account level for consistency across multiple zones. Zone-level rules take precedence over account-level ones, and assets are not shared between levels.

You can use Cloudflare API to upload your existing assets for use with Custom Errors:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_pages/assets" \

--header "Authorization: Bearer <API_TOKEN>" \

--header 'Content-Type: application/json' \

--data '{

  "name": "maintenance",

  "description": "Maintenance template page",

  "url": "https://example.com/"

}'


```

You can then reference the stored asset in a Custom Error rule:

Terminal window

```

curl --request PUT \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_custom_errors/entrypoint" \

--header "Authorization: Bearer <API_TOKEN>" \

--header 'Content-Type: application/json' \

--data '{

  "rules": [

    {

      "action": "serve_error",

      "action_parameters": {

        "asset_name": "maintenance",

        "content_type": "text/html",

        "status_code": 503

      },

      "enabled": true,

      "expression": "http.request.uri.path contains \"error\""

    }

  ]

}'


```

Explain Code

## 2025-01-29

  
**New Snippets Code Editor**   

The new [Snippets](https://developers.cloudflare.com/rules/snippets/) code editor lets you edit Snippet code and rule in one place, making it easier to test and deploy changes without switching between pages.

![New Snippets code editor](https://developers.cloudflare.com/_astro/snippets-new-editor.CaoIu2_-_Z2rsmyM.webp) 

What’s new:

* **Single-page editing for code and rule** – No need to jump between screens.
* **Auto-complete & syntax highlighting** – Get suggestions and avoid mistakes.
* **Code formatting & refactoring** – Write cleaner, more readable code.

Try it now in [Rules > Snippets ↗](https://dash.cloudflare.com/?to=/:account/:zone/rules/snippets).

## 2025-01-09

  
**New Rules Overview Interface**   

**Rules Overview** gives you a single page to manage all your [Cloudflare Rules](https://developers.cloudflare.com/rules/).

What you can do:

* **See all your rules in one place** – No more clicking around.
* **Find rules faster** – Search by name.
* **Understand execution order** – See how rules run in sequence.
* **Debug easily** – Use [Trace](https://developers.cloudflare.com/rules/trace-request/) without switching tabs.

Check it out in [Rules > Overview ↗](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview).

## 2024-12-11

  
**Terraform Support for Snippets**   

Now, you can manage [Cloudflare Snippets](https://developers.cloudflare.com/rules/snippets/) with [Terraform](https://developers.cloudflare.com/terraform/). Use infrastructure-as-code to deploy and update Snippet code and rules without manual changes in the dashboard.

Example Terraform configuration:

```

resource "cloudflare_snippet" "my_snippet" {

  zone_id  = "<ZONE_ID>"

  name = "my_test_snippet_1"

  main_module = "file1.js"

  files {

    name = "file1.js"

    content = file("file1.js")

  }

}


resource "cloudflare_snippet_rules" "cookie_snippet_rule" {

  zone_id  = "<ZONE_ID>"

  rules {

    enabled = true

    expression = "http.cookie eq \"a=b\""

    description = "Trigger snippet on specific cookie"

    snippet_name = "my_test_snippet_1"

  }

  depends_on = [cloudflare_snippet.my_snippet]

}


```

Explain Code

Learn more in the [Configure Snippets using Terraform](https://developers.cloudflare.com/rules/snippets/create-terraform/) documentation.

## 2024-11-22

  
**Cloud Connector Now Supports R2**   

Now, you can use [Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/) to route traffic to your [R2 buckets](https://developers.cloudflare.com/r2/) based on URLs, headers, geolocation, and more.

Example setup:

Terminal window

```

curl --request PUT \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/cloud_connector/rules" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '[

  {

    "expression": "http.request.uri.path wildcard \"/images/*\"",

    "provider": "cloudflare_r2",

    "description": "Connect to R2 bucket containing images",

    "parameters": {

      "host": "mybucketcustomdomain.example.com"

    }

  }

]'


```

Explain Code

Get started using [Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/) documentation.

## 2024-10-23

  
**Simplified UI for URL Rewrites**   

It’s now easy to create **wildcard-based [URL Rewrites](https://developers.cloudflare.com/rules/transform/url-rewrite/)**. No need for complex functions—just define your patterns and go.

![Rules Overview Interface](https://developers.cloudflare.com/_astro/create-url-rewrite-rule.DIgpB8IB_ZNTjfK.webp) 

What’s improved:

* **Full wildcard support** – Create rewrite patterns using intuitive interface.
* **Simplified rule creation** – No need for complex functions.

Try it via [creating a Rewrite URL rule in the dashboard](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/#wildcard-pattern-parameters).

## 2024-09-20

**Automatic DNS Validation for Cloudflare Rules**

The Cloudflare dashboard now automatically validates [DNS records ↗](https://developers.cloudflare.com/dns/proxy-status/) and [Cloudflare for SaaS custom hostnames ↗](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/) for rules targeting specific hostnames or URLs. To prevent misconfigured rules and ensure smoother deployments, you will get proactive warnings for missing or misconfigured DNS records and custom hostnames.

## 2024-09-17

**Compression Rules available to all plans with Zstandard support**

[Compression Rules ↗](https://developers.cloudflare.com/rules/compression-rules/) now support Zstandard compression and are available in all Cloudflare plans. Users in the Free plan will gradually get access throughout 2024.

## 2024-09-13

**Snippets now available in beta**

[Cloudflare Snippets ↗](https://developers.cloudflare.com/rules/snippets/) have transitioned from alpha to beta.

## 2024-09-10

**wildcard\_replace() function now supported in URL rewrites**

You can now use the [wildcard\_replace() ↗](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#wildcard%5Freplace) function in rewrite expressions of [URL rewrites ↗](https://developers.cloudflare.com/rules/transform/url-rewrite/).

## 2024-09-05

**New Rules Templates for one-click rule creation**

The new **Rules** \> **Templates** page in the Cloudflare dashboard allows you to create common rules with a single click, featuring dozens of pre-built templates. You can also access these templates directly from each product's rule builder. Also, explore the [Examples gallery ↗](https://developers.cloudflare.com/rules/examples/) in the developer docs for real-world use cases and inspiration.

## 2024-08-22

**Simplified UI for Single Redirects with wildcard support**

The simplified UI for [Single Redirects ↗](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/) is now available to all users, making URL redirects easier and more intuitive. This update builds on the recent [wildcard support ↗](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#wildcard%5Freplace) in Ruleset Engine products. Access the new UI under **Rules > Redirect Rules**. Learn more about wildcard support and our open-source Rust crate in the [blog post ↗](https://blog.cloudflare.com/wildcard-rules).

## 2024-08-20

**Cloud Connector now available to all customers**

Cloud Connector (beta) is now available to all customers. For setup details, refer to the [documentation ↗](https://developers.cloudflare.com/rules/cloud-connector/), explore [examples ↗](https://developers.cloudflare.com/rules/cloud-connector/examples/), and check out the [blog post ↗](https://blog.cloudflare.com/cloud-connector).

## 2024-08-16

**Cloud Connector now available to all free customers**

Cloud Connector (beta) is now available to all free and a subset of paid customers. This rollout will be [gradually extended ↗](https://developers.cloudflare.com/rules/cloud-connector/#availability) to all Cloudflare users, simplifying multi-cloud management and enhancing integration with Cloudflare's Connectivity Cloud. For more information, refer to the [blog post ↗](https://blog.cloudflare.com/cloud-connector).

## 2024-08-12

**Cloudflare Snippets limits have been upgraded**

Cloudflare Snippets (alpha) now allow multiple subrequests depending on your plan. For more information, refer to the [Availability ↗](https://developers.cloudflare.com/rules/snippets/#availability).

## 2024-07-31

**Wildcard support added to Ruleset Engine products**

Wildcards are now supported across our Ruleset Engine-based products, including Single Redirects, Cache Rules, Transform Rules, WAF, Waiting Room, and more:

* You can now use the `wildcard` and `strict wildcard` operators with any string field in the Ruleset Engine, such as full URI, host, headers, cookies, user-agent, and country. For more details, refer to [Operators ↗](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/) and [Wildcard matching ↗](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#wildcard-matching).
* In [Single Redirects ↗](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/), the `wildcard_replace()` function allows you to use segments matched by the `wildcard` and `strict wildcard` operators in redirect URL targets. For more information, refer to [Functions ↗](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#wildcard%5Freplace).

## 2024-07-01

**Cloudflare Snippets now available to all paid customers**

Cloudflare Snippets (alpha) are now available to all paid customers.

## 2024-06-03

**Cloudflare Snippets now available to all Enterprise customers**

Cloudflare Snippets (alpha) are now available to all Enterprise customers. Customers in other paid plans will gradually get access throughout 2024.

## 2024-05-14

**Page Rules migration**

The [Page Rules migration guide ↗](https://developers.cloudflare.com/rules/reference/page-rules-migration/) is now available for users interested in transitioning to modern Rules features instead of Page Rules. Explore the guide for detailed instructions on migrating your configurations.

## 2024-05-13

**New Configuration Rules setting for Web Analytics (RUM)**

You can now turn off Cloudflare Web Analytics, also known as Real User Monitoring (RUM), for specific requests using a configuration rule.

## 2024-04-29

**New Configuration Rules setting for Cloudflare Fonts**

You can now turn on or off Cloudflare Fonts for specific requests using a configuration rule.

## 2024-03-22

**New TLS fields in rule expressions**

Customers can now use new fields `cf.tls_client_hello_length` (the length of the client hello message sent in a TLS handshake), `cf.tls_client_random` (the value of the 32-byte random value provided by the client in a TLS handshake), and `cf.tls_client_extensions_sha1` (the SHA-1 fingerprint of TLS client extensions) in various products built on Ruleset Engine.

## 2024-03-20

**Origin Rules now allow port numbers in Host Header Override**

Customers can now use arbitrary port numbers in Host Header Override in Origin Rules. Previously, only hostname was allowed as a value (for example, `example.com`). Now, you can set the value to `hostname:port` (for example, `example.com:1234`) as well.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/changelog/","name":"Rules changelog"}}]}
```
