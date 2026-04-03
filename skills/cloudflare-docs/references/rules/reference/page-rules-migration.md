---
title: Page Rules migration guide
description: Cloudflare is continuously improving its platform to deliver more powerful and scalable tools for managing your configurations. To help you take full advantage of these improvements, we recommend using modern Rules features for new implementations. These products address the limitations of Page Rules while providing greater flexibility, scalability, and ease of use.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/reference/page-rules-migration.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Page Rules migration guide

Cloudflare is continuously improving its platform to deliver more powerful and scalable tools for managing your configurations. To help you take full advantage of these improvements, we recommend using [modern Rules features](https://developers.cloudflare.com/rules/) for new implementations. These products address the limitations of Page Rules while providing greater flexibility, scalability, and ease of use.

For a quick start, explore the one-click templates available in the Cloudflare dashboard in **Rules** \> **Overview**. These templates simplify common configurations like redirects, rewrites and header modifications, making setup faster and easier.

## Page Rules migration

To make the transition seamless, Cloudflare will handle the migration of your existing Page Rules automatically. This process is planned for late 2025 or beyond, with no action required on your part. You will receive advance notification before any changes are made.

If you wish to explore the benefits of modern Rules features sooner, you can begin adopting them today. Doing so allows you to:

* Take advantage of modern features and capabilities sooner.
* Customize and refine your rules to match your evolving needs.

To assist with this process, we provide you with a comprehensive mapping between Page Rules settings and modern Rules products in this guide.

## Why transition?

Cloudflare Page Rules has several fundamental limitations, such as triggering solely based on URL patterns and being limited to 125 rules per zone for performance reasons. These rules are also complex to debug when multiple page rules apply to the same incoming request.

In 2022, we announced in our blog post [The future of Page Rules ↗](https://blog.cloudflare.com/future-of-page-rules) that Page Rules would be replaced with a suite of dedicated products, each built to be best-of-breed and put more power into the hands of our users. The new Rules products — [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/), [Compression Rules](https://developers.cloudflare.com/rules/compression-rules/), [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/), [Redirects](https://developers.cloudflare.com/rules/url-forwarding/), and [Transform Rules](https://developers.cloudflare.com/rules/transform/) — are now generally available (GA) and have already been adopted by tens of thousands of Cloudflare customers.

Improvements in modern Rules features include:

* **New engine**: New Rules features are powered by the [Ruleset Engine](https://developers.cloudflare.com/ruleset-engine/), which offers versatile configuration with a robust language that supports many HTTP request and response fields.
* **Improved scalability**: Thanks to the improved scalability, Cloudflare plans now have increased quotas.
* **Easier troubleshooting**: Rule execution is more predictable, since each rule operates independently, simplifying troubleshooting. Additionally, [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) helps understand rule interactions.
* **Improved consistency**: New Rules features also ensure consistency, with common fields and capabilities shared across products, offering a seamless experience and predictable Terraform configurations.

## Key differences

The evaluation and execution order of Rules features is different from Page Rules:

* **Rule matching logic**: Page Rules apply the first matching rule (first match wins). In contrast, modern Rules are stackable, meaning multiple matching rules can combine and apply to the same request (last match wins). For example, if multiple cache rules match the same URL, the features in those rules will all apply in order.
* **Action separation**: A Page Rule may include multiple actions for different products that are applied in a sequence selected by the customer within the Page Rule itself. Modern Rules features are evaluated [in a fixed sequence](https://developers.cloudflare.com/rules/origin-rules/#execution-order), with customers defining the rule order within a product [phase](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/).
* **Precedence**: Modern Rules features take precedence over Page Rules. For instance, if both define caching settings for the same path, Cache Rules will override Page Rules.
* **Caching behavior**: In Cache Rules, selecting **Eligible for cache** automatically enables **Cache Everything** by default. To maintain the exact behavior of Page Rules, you may need to [adjust your configuration](https://developers.cloudflare.com/cache/how-to/cache-rules/page-rules-migration/).
* **Interactions with Workers**: Requests handled by Workers will suppress Page Rules actions, but they will not suppress actions from modern Rules features.

## Convert Page Rules URLs to filter expressions

Modern Rules use filter expressions instead of URL patterns. These expressions, built with the Rules language, allow greater precision by leveraging [fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/), [functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/), and [operators](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/).

The following example demonstrates the use of the [http.request.full\_uri](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.full%5Furi/) field and the `wildcard` operator for [wildcard matching](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#wildcard-matching):

A **Page Rules URL** like:

`example.com/*/downloads/*.txt`

becomes a **filter expression** such as:

`http.request.full_uri wildcard "http*://example.com/*/downloads/*.txt*"`

[Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) and [URL Rewrite Rules](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/) also offer a simplified view called **Wildcard pattern**, allowing you to specify URL patterns (`http*://example.com/*/downloads/*.txt*`) without specifying the full filter expression (`http.request.full_uri wildcard "http*://example.com/*/downloads/*.txt*"`).

### Important considerations

* **Protocol scheme**: Page Rules URL matching does not include the URI scheme (for example, `http://` or `https://`) unless explicitly included in the rule. Filter expressions using `http.request.full_uri` field, however, require matching the full URI, including the protocol scheme. To make your filter expression scheme-agnostic, use `http*://` as a wildcard for both `http://` and `https://`.
* **Query strings**: Page Rules ignore query strings unless they are part of the rule URL. Filter expressions include the query string automatically, as part of the `http.request.full_uri` field. To ensure query strings do not affect your matching, append a `*` wildcard at the end of your filter expression, such as `.txt*`.

## Feature correspondence table

To help you map existing Page Rules to modern Rules products, this table outlines how Page Rules settings translate to modern Rules and provides examples for common configurations.

Also, to streamline common configurations, the Cloudflare dashboard now includes dozens of one-click templates, available in **Rules** \> **Overview**. These templates enable you to deploy commonly used features — such as redirects, rewrites, and header modifications — instantly, with pre-filled filter expressions and actions. Explore these templates in the dashboard for a faster setup.

| Page Rules setting          | New implementation uses...           | Migration/Replacement instructions                                          |
| --------------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| Always Use HTTPS            | Redirect Rules (Single Redirects)    | [Migrate Always Use HTTPS](#migrate-always-use-https)                       |
| Browser Cache TTL           | Cache Rules                          | [Migrate Browser Cache TTL](#migrate-browser-cache-ttl)                     |
| Browser Integrity Check     | Configuration Rules                  | [Migrate Browser Integrity Check](#migrate-browser-integrity-check)         |
| Bypass Cache on Cookie      | Cache Rules                          | [Migrate Bypass Cache on Cookie](#migrate-bypass-cache-on-cookie)           |
| Cache By Device Type        | Cache Rules                          | [Migrate Cache By Device Type](#migrate-cache-by-device-type)               |
| Cache Deception Armor       | Cache Rules                          | [Migrate Cache Deception Armor](#migrate-cache-deception-armor)             |
| Cache Level                 | Cache Rules                          | [Migrate Cache Level](#migrate-cache-level-cache-everything)                |
| Cache on Cookie             | Cache Rules                          | [Migrate Cache on Cookie](#migrate-cache-on-cookie)                         |
| Cache TTL by status code    | Cache Rules                          | [Migrate Cache TTL by status code](#migrate-cache-ttl-by-status-code)       |
| Custom Cache Key            | Cache Rules                          | [Migrate Custom Cache Key](#migrate-custom-cache-key)                       |
| Disable Apps                | Configuration Rules                  | [Migrate Disable Apps](#migrate-disable-apps)                               |
| Disable Performance         | N/A (deprecated)                     | [Replace Disable Performance](#replace-disable-performance)                 |
| Disable Railgun             | N/A (deprecated)                     | N/A                                                                         |
| Disable Security            | N/A (deprecated)                     | [Replace Disable Security](#replace-disable-security)                       |
| Disable Zaraz               | Configuration Rules                  | [Migrate Disable Zaraz](#migrate-disable-zaraz)                             |
| Edge Cache TTL              | Cache Rules                          | [Migrate Edge Cache TTL](#migrate-edge-cache-ttl)                           |
| Email Obfuscation           | Configuration Rules                  | [Migrate Email Obfuscation](#migrate-email-obfuscation)                     |
| Forwarding URL              | Redirect Rules (Single Redirects)    | [Migrate Forwarding URL](#migrate-forwarding-url)                           |
| Host Header Override        | Origin Rules                         | [Migrate Host Header Override](#migrate-host-header-override)               |
| IP Geolocation Header       | Transform Rules (Managed Transforms) | [Migrate IP Geolocation Header](#migrate-ip-geolocation-header)             |
| Opportunistic Encryption    | Configuration Rules                  | [Migrate Opportunistic Encryption](#migrate-opportunistic-encryption)       |
| Origin Cache Control        | Cache Rules                          | [Migrate Origin Cache Control](#migrate-origin-cache-control)               |
| Origin Error Page Pass-thru | Cache Rules                          | [Migrate Origin Error Page Pass-thru](#migrate-origin-error-page-pass-thru) |
| Polish                      | Configuration Rules                  | [Migrate Polish](#migrate-polish)                                           |
| Query String Sort           | Cache Rules                          | [Migrate Query String Sort](#migrate-query-string-sort)                     |
| Resolve Override            | Origin Rules                         | [Migrate Resolve Override](#migrate-resolve-override)                       |
| Respect Strong ETags        | Cache Rules                          | [Migrate Respect Strong ETags](#migrate-respect-strong-etags)               |
| Response Buffering          | N/A (deprecated)                     | N/A                                                                         |
| Rocket Loader               | Configuration Rules                  | [Migrate Rocket Loader](#migrate-rocket-loader)                             |
| Security Level              | Configuration Rules                  | [Migrate Security Level](#migrate-security-level)                           |
| True Client IP Header       | Transform Rules (Managed Transforms) | [Migrate True Client IP Header](#migrate-true-client-ip-header)             |
| SSL                         | Configuration Rules                  | [Migrate SSL](#migrate-ssl)                                                 |
| Web Application Firewall    | N/A (deprecated)                     | N/A                                                                         |

### Migrate Always Use HTTPS

* [ Dashboard ](#tab-panel-6016)
* [ Visual guide ](#tab-panel-6017)

**Context:**

You configured a Page Rule to perform an automatic redirect from HTTP to HTTPS for all subdomains of `example.com` and the `example.com` domain itself:

* **URL** `*example.com/*`
* **Setting**: _Always Use HTTPS_

**How to migrate**:

1. [Create a single redirect](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) to always redirect HTTP requests to HTTPS. You can select the **Redirect from HTTP to HTTPS** rule template or enter the following rule configuration:  
   * **If incoming requests match**: Wildcard pattern  
         * **Request URL**: `http://*`  
   * **Then**:  
         * **Target URL**: `https://${1}`  
         * **Status code**: _301_  
         * **Preserve query string**: Enabled
2. Turn off your existing Page Rule and validate the behavior of the redirect you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                | Migrate to a single redirect                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Always Use HTTPS' setting](https://developers.cloudflare.com/_astro/pr-always-use-https.CUl_pNfb_ZwfSLG.webp) | ![Single redirect matching the 'Always Use HTTPS' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-always-use-https-new.BOryxIv0_jNt3t.webp) |

### Migrate Automatic HTTPS Rewrites

* [ Dashboard ](#tab-panel-6018)
* [ Visual guide ](#tab-panel-6019)

**Context:**

You configured a Page Rule turning on Automatic HTTPS Rewrites for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Automatic HTTPS Rewrites_
* **Value**: On

**How to migrate**:

1. [Create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to always rewrite HTTP links to HTTPS for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then the settings are**:  
         * **Setting**: Automatic HTTPS Rewrites  
         * **Value**: On
2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                                 | Migrate to a configuration rule                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Automatic HTTPS Rewrites' setting](https://developers.cloudflare.com/_astro/pr-automatic-https-rewrites.CLJyVtYV_Z26qFhi.webp) | ![Configuration rule matching the 'Automatic HTTPS Rewrites' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-automatic-https-rewrites-new.Bkd1FpXw_ZpdWVq.webp) |

### Migrate Browser Cache TTL

* [ Dashboard ](#tab-panel-6048)
* [ Visual guide ](#tab-panel-6049)

**Context:**

You configured a Page Rule adjusting browser cache TTL to one day for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Browser Cache TTL_
* **Enter Browser Cache TTL**: _a day_

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to adjust browser cache TTL for caching resources in the browser to one day for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then**:  
         * **Cache eligibility**: Eligible for cache  
         * **Browser TTL**: Override origin and use this TTL  
         * **Input time-to-live (TTL)**: _1 day_  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                   | Migrate to a cache rule                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Browser Cache TTL' setting](https://developers.cloudflare.com/_astro/pr-browser-cache-ttl.BsUhcEXO_Z15nk2E.webp) | ![Cache rule matching the 'Browser Cache TTL' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-browser-cache-ttl-new.CFYgSIfM_28xvmr.webp) |

### Migrate Browser Integrity Check

* [ Dashboard ](#tab-panel-6020)
* [ Visual guide ](#tab-panel-6021)

**Context:**

You configured a Page Rule turning on Browser Integrity Check for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Browser Integrity Check_
* **Value**: On

**How to migrate**:

1. [Create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to turn on Browser Integrity Check for protecting against bots and threats for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then the settings are**:  
         * **Setting**: Browser Integrity Check  
         * **Value**: On
2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                               | Migrate to a configuration rule                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Browser Integrity Check' setting](https://developers.cloudflare.com/_astro/pr-browser-integrity-check.0TsdxTXD_Z1Wutmk.webp) | ![Configuration rule matching the 'Browser Integrity Check' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-browser-integrity-check-new.DABehTnG_ZCT1QP.webp) |

### Migrate Bypass Cache on Cookie

* [ Dashboard ](#tab-panel-6050)
* [ Visual guide ](#tab-panel-6051)

**Context:**

You configured a Page Rule turning on Bypass Cache on Cookie for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Bypass Cache on Cookie_
* **Enter value**: `test_cookie`

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to bypass cache for requests containing cookie `test_cookie` for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com" AND Cookie contains "test-cookie"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com" and http.cookie contains "test-cookie")`  
   * **Then**:  
         * **Cache eligibility**: Bypass cache  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                            | Migrate to a cache rule                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Bypass Cache on Cookie' setting](https://developers.cloudflare.com/_astro/pr-bypass-cache-on-cookie.h4Mq0pkO_ZS1hzt.webp) | ![Cache rule matching the 'Bypass Cache on Cookie' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-bypass-cache-on-cookie-new.BeJb7-Bu_Z1vl7rE.webp) |

### Migrate Cache By Device Type

* [ Dashboard ](#tab-panel-6052)
* [ Visual guide ](#tab-panel-6053)

**Context:**

You configured a Page Rule turning on Cache By Device Type for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Cache By Device Type_
* **Value**: On

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to cache content based on user agent or device type for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then**:  
         * **Cache eligibility**: Eligible for cache  
         * **Setting**: Cache key  
                  * **Cache by device type**: On  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                        | Migrate to a cache rule                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Cache By Device Type' setting](https://developers.cloudflare.com/_astro/pr-cache-by-device-type.D_TlBAdc_1ORjXt.webp) | ![Cache rule matching the 'Cache By Device Type' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-cache-by-device-type-new.j6a5kEn__kmLw1.webp) |

### Migrate Cache Deception Armor

* [ Dashboard ](#tab-panel-6054)
* [ Visual guide ](#tab-panel-6055)

**Context:**

You configured a Page Rule turning on Cache Deception Armor for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: Cache Deception Armor

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to protect against cache deception attacks for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then**:  
         * **Cache eligibility**: Eligible for cache  
         * **Setting**: Cache key  
                  * **Cache deception armor**: On  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                          | Migrate to a cache rule                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Cache Deception Armor' setting](https://developers.cloudflare.com/_astro/pr-cache-deception-armor.CAh-wrs4_ZaMxP1.webp) | ![Cache rule matching the 'Cache Deception Armor' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-cache-deception-armor-new.BT9l5EUw_Z1UI9gA.webp) |

### Migrate Cache Level (Cache Everything)

* [ Dashboard ](#tab-panel-6056)
* [ Visual guide ](#tab-panel-6057)

**Context:**

You configured a Page Rule turning on caching of all assets for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Cache Level_
* **Select Cache Level**: _Cache Everything_

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to adjust cache level for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then**:  
         * **Cache eligibility**: Eligible for cache  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                                    | Migrate to a cache rule                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Cache Level' set to 'Cache Everything'](https://developers.cloudflare.com/_astro/pr-cache-level-everything.DdVHSP6R_Z1SVoGM.webp) | ![Cache rule matching the 'Cache Level: Cache Everything' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-cache-level-everything-new.CWHQUlgp_Z1GCIwi.webp) |

### Migrate Cache on Cookie

* [ Dashboard ](#tab-panel-6058)
* [ Visual guide ](#tab-panel-6059)

**Context:**

You configured a Page Rule turning on caching for responses that contained cookie `test-cookie` for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Cache on Cookie_
* **Enter value**: `test-cookie`

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to cache responses containing cookie `test_cookie` for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com" AND Cookie contains "test-cookie"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com" and http.cookie contains "test-cookie")`  
   * **Then**:  
         * **Cache eligibility**: Eligible for cache  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                             | Migrate to a cache rule                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Cache on Cookie' setting](https://developers.cloudflare.com/_astro/pr-cache-on-cookie.ByvIqgIj_NLhPm.webp) | ![Cache rule matching the 'Cache on Cookie' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-cache-on-cookie-new.PWLmyHmb_Z61apS.webp) |

### Migrate Cache TTL by status code

* [ Dashboard ](#tab-panel-6060)
* [ Visual guide ](#tab-panel-6061)

**Context:**

You configured a Page Rule turning on caching of every response with status code between `200` and `599` for one day, for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Cache TTL by status code_
* **Status code or enter range**: `200-599`
* **Select option**: _a day_

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to cache responses with status code between `200` and `599` for one day for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
         * **Then**:  
                  * **Cache eligibility**: Eligible for cache  
                  * **Setting**: Edge TTL  
                              * Use cache-control header if present, use default Cloudflare caching behavior if not  
                              * **Status code TTL**:  
                                             * **Scope**: _Range_  
                                             * **From**: _200_  
                                             * **To**: _599_  
                                             * **Duration**: _1 day_  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                                   | Migrate to a cache rule                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with the 'Cache TTL by status code' setting](https://developers.cloudflare.com/_astro/pr-cache-ttl-by-status-code.BEFPIQlk_gCwHH.webp) | ![Cache rule matching the 'Cache TTL by status code' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-cache-ttl-by-status-code-new.D7fRKD4K_Zkzrqq.webp) |

### Migrate Custom Cache Key

* [ Dashboard ](#tab-panel-6062)
* [ Visual guide ](#tab-panel-6063)

**Context:**

You configured a Page Rule setting a custom cache key for all query string parameters, for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Custom Cache Key_  
   * **Query String**: All query string parameters

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to set a custom cache key for all query string parameters, for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then**:  
         * **Cache eligibility**: Eligible for cache  
         * **Setting**: Cache key  
                  * **Query string**: All query string parameters  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                    | Migrate to a cache rule                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with the 'Custom Cache Key' setting](https://developers.cloudflare.com/_astro/pr-custom-cache-key.B4mIYhPL_ZxFokH.webp) | ![Cache rule matching the 'Custom Cache Key' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-custom-cache-key-new.Cgx92M0b_1hvSHD.webp) |

### Migrate Disable Apps

* [ Dashboard ](#tab-panel-6022)
* [ Visual guide ](#tab-panel-6023)

**Context:**

You configured a Page Rule turning off Cloudflare Apps (deprecated) for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Disable Apps_

**How to migrate**:

1. [Create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to disable Cloudflare Apps (deprecated) for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then the settings are**:  
         * **Setting**: Disable Apps
2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                       | Migrate to a configuration rule                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Disable Apps' setting](https://developers.cloudflare.com/_astro/pr-disable-apps.DtWuKgu3_mB9kP.webp) | ![Configuration rule matching the 'Disable Apps' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-disable-apps-new.D0ZGFzGR_Z2cSCu2.webp) |

### Replace Disable Performance

Warning

The **Disable Performance** setting is deprecated. Any Page Rules with this setting will not be migrated.

This Page Rules setting turned off Polish and Rocket Loader. You can still turn on or off relevant Cloudflare features one by one using Configuration Rules.

* [ Dashboard ](#tab-panel-6024)
* [ Visual guide ](#tab-panel-6025)

**Context:**

You configured a Page Rule with **Disable Performance** (deprecated) for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Disable Performance_

**How to replace**:

1. [Create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to disable Polish and Rocket Loader for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then the settings are**:  
         * **Polish**: _Off_  
         * **Rocket Loader**: Off
2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                     | Migrate to a configuration rule                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Disable Performance' setting](https://developers.cloudflare.com/_astro/pr-disable-performance.Q-fOmuUU_2xk0b.webp) | ![Configuration rule partially matching the 'Disable Performance' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-disable-performance-new.DL9beJ7__2cPCxI.webp) |

### Replace Disable Security

Warning

The **Disable Security** setting is deprecated. Any Page Rules with this setting will not be migrated.

This Page Rules setting turns off Email Obfuscation, Rate Limiting (previous version), Scrape Shield, URL (Zone) Lockdown, and WAF managed rules (previous version). You can still turn on or off relevant Cloudflare features one by one using Configuration Rules and WAF custom rules.

* [ Dashboard ](#tab-panel-6015)

**Context:**

You configured a Page Rule with **Disable Security** (deprecated) for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Disable Security_

This setting turned off a subset of Cloudflare security features: Email Obfuscation, Rate Limiting (previous version), Scrape Shield, URL (Zone) Lockdown, and WAF managed rules (previous version).

**How to replace**:

1. [Create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to turn off one or more security features:  
   * [Email Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/)  
   * [Hotlink Protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/)
2. If required, [create a WAF exception](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/define-dashboard/) to skip one or more rules of WAF managed rulesets for requests coming from IP addresses in an allowlist.
3. Turn off your existing Page Rule and validate the behavior of the rules you created.
4. If your tests succeed, delete the existing Page Rule.

Warning

If you are still using [WAF managed rules (previous version)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/) or [Rate Limiting (previous version)](https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/), consider upgrading to the new versions of these products. It is not possible to turn off these older products using modern Rules features.

### Migrate Disable Zaraz

* [ Dashboard ](#tab-panel-6026)
* [ Visual guide ](#tab-panel-6027)

**Context:**

You configured a Page Rule turning off [Zaraz](https://developers.cloudflare.com/zaraz/) for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Disable Zaraz_

**How to migrate**:

1. [Create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to turn off Zaraz for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then the settings are**:  
         * **Setting**: Disable Zaraz
2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                           | Migrate to a configuration rule                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Disable Zaraz' setting](https://developers.cloudflare.com/_astro/pr-disable-zaraz.BO7qA0TE_Z1JU8so.webp) | ![Configuration rule matching the 'Disable Zaraz' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-disable-zaraz-new.Cc92OsIN_1gBdti.webp) |

### Migrate Edge Cache TTL

* [ Dashboard ](#tab-panel-6064)
* [ Visual guide ](#tab-panel-6065)

**Context:**

You configured a Page Rule adjusting Edge Cache TTL for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Edge Cache TTL_
* **Enter Edge Cache TTL**: _a day_

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to adjust edge cache TTL for caching resources on Cloudflare edge to one day, for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then**:  
         * **Cache eligibility**: Eligible for cache  
         * **Setting**: Edge TTL  
                  * Ignore cache-control header and use this TTL  
                  * **Input time-to-live (TTL)**: _1 day_  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                | Migrate to a cache rule                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with the 'Edge Cache TTL' setting](https://developers.cloudflare.com/_astro/pr-edge-cache-ttl.DdpuJjjM_1nFprQ.webp) | ![Cache rule matching the 'Edge Cache TTL' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-edge-cache-ttl-new.CASDurRT_DBFBY.webp) |

### Migrate Email Obfuscation

* [ Dashboard ](#tab-panel-6028)
* [ Visual guide ](#tab-panel-6029)

**Context:**

You configured a Page Rule turning off [Email Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/) for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Email Obfuscation_
* **Value**: Off

**How to migrate**:

1. [Create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to turn off Email Obfuscation for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then the settings are**:  
         * **Setting**: Email Obfuscation  
                  * **Value**: Off
2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                  | Migrate to a configuration rule                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Email Obfuscation' setting](https://developers.cloudflare.com/_astro/pr-email-obfuscation.B5bsi7dl_ZmPA2p.webp) | ![Configuration rule matching the 'Email Obfuscation > Off' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-email-obfuscation-new.CV0JNmIj_1a6Vq6.webp) |

### Migrate Forwarding URL

**Example #1: Redirect `www` to root domain**

* [ Dashboard ](#tab-panel-6074)
* [ Visual guide ](#tab-panel-6075)

**Context:**

You configured a Page Rule permanently redirecting `www.example.com` to `example.com` on all URI paths:

* **URL**: `www.example.com/*`
* **Setting**: _Forwarding URL_
* **Select Status code**: _301 - Permanent Redirect_
* **Destination URL**: `https://example.com/$1`

**How to migrate**:

1. [Create a single redirect](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) to permanently redirect requests from `https://www.example.com` to `https://example.com`. You can select the **Redirect from WWW to Root** rule template or enter the following rule configuration:  
   * **If incoming requests match**: Wildcard pattern  
         * **Request URL**: `https://www.example.com/*`  
   * **Then**:  
         * **Target URL**: `https://example.com/${1}`  
         * **Status code**: _301_  
         * **Preserve query string**: Enabled
2. Turn off your existing Page Rule and validate the behavior of the redirect you created.
3. If your tests succeed, delete the existing Page Rule.

Notes about the rule equivalence

The provided example using Single Redirects is not an exact match for the previously existing Page Rule in the same example.

The exact equivalent would need to match both HTTP and HTTPS incoming requests, which you could achieve using a wildcard pattern like the following (notice the extra `*` after `http`):

* **Request URL**: `http*://www.example.com/*`

This would require you to also change the **Target URL** to use the second wildcard capture group instead of the first one (corresponding to the text captured by second `*` in the wildcard pattern above):

* **Target URL**: `https://example.com/${2}`

| Page Rules configuration                                                                                                                | Migrate to a single redirect                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule #1 with 'Forwarding URL' setting](https://developers.cloudflare.com/_astro/pr-forwarding-url.DyV2zs8N_Z1PQuiN.webp) | ![Single redirect matching the 'Forwarding URL' setting of the example Page Rule #1](https://developers.cloudflare.com/_astro/pr-forwarding-url-new.FfZIMpof_ZfVgYH.webp) |

**Example #2: Redirect all pages under old path to new path**

* [ Dashboard ](#tab-panel-6076)
* [ Visual guide ](#tab-panel-6077)

**Context:**

You configured a Page Rule permanently redirecting `example.com/old-path` to `example.com/new-path`:

* **URL**: `example.com/old-path/*`
* **Setting**: _Forwarding URL_
* **Select Status code**: _301 - Permanent Redirect_
* **Destination URL**: `https://example.com/new-path/$1`

**How to migrate**:

1. [Create a single redirect](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) to permanently redirect requests for `example.com/old-path` to `example.com/new-path`:  
   * **If incoming requests match**: Wildcard pattern  
         * **Request URL**: `https://example.com/old-path/*`  
   * **Then**:  
         * **Target URL**: `https://example.com/new-path/${1}`  
         * **Status code**: _301_  
         * **Preserve query string**: Enabled
2. Turn off your existing Page Rule and validate the behavior of the redirect you created.
3. If your tests succeed, delete the existing Page Rule.

Notes about the rule equivalence

The provided example using Single Redirects is not an exact match for the previously existing Page Rule in the same example.

The exact equivalent would need to match both HTTP and HTTPS incoming requests, which you could achieve using a wildcard pattern like the following (notice the extra `*` after `http`):

* **Request URL**: `http*://example.com/old-path/*`

This would require you to also change the **Target URL** to use the second wildcard capture group instead of the first one (corresponding to the text captured by second `*` in the wildcard pattern above):

* **Target URL**: `https://example.com/new-path/${2}`

| Page Rules configuration                                                                                                                 | Migrate to a single redirect                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule #2 with 'Forwarding URL' setting](https://developers.cloudflare.com/_astro/pr-forwarding-url-2.CNt6YZ_U_ZJCQKH.webp) | ![Single redirect matching the 'Forwarding URL' setting of the example Page Rule #2](https://developers.cloudflare.com/_astro/pr-forwarding-url-2-new.CP3zl46U_W8inj.webp) |

### Migrate Host Header Override

* [ Dashboard ](#tab-panel-6030)
* [ Visual guide ](#tab-panel-6031)

**Context:**

You configured a Page Rule changing the `Host` HTTP header to `example.saas-provider.com`, for all requests addressed at any subdomain of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Host Header Override_
* **Enter value**: `example.saas-provider.com`

**How to migrate**:

1. [Create an origin rule](https://developers.cloudflare.com/rules/origin-rules/create-dashboard/) changing the `Host` header to `example.saas-provider.com` for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then**:  
         * **Set origin parameters**:  
                  * **Host Header** \> **Rewrite to**: `example.saas-provider.com`
2. Turn off your existing Page Rule and validate the behavior of the origin rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                         | Migrate to an origin rule                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Host Header Override' setting](https://developers.cloudflare.com/_astro/pr-host-header-override.BXq8XNIs_Z2j1cOS.webp) | ![Origin rule matching the 'Host Header Override' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-host-header-override-new.DUASGBHN_Z2fFGfr.webp) |

### Migrate IP Geolocation Header

* [ Dashboard ](#tab-panel-6032)
* [ Visual guide ](#tab-panel-6033)

**Context:**

You configured a Page Rule adding a `CF-IPCountry` HTTP header, for all requests addressed at any subdomain of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _IP Geolocation Header_
* **Value**: On

**How to migrate**:

1. [Turn on the **Add visitor location headers** Managed Transform](https://developers.cloudflare.com/rules/transform/managed-transforms/configure/) — a Transform Rules feature — to add the `CF-IPCountry` and other location headers to all requests.
2. Turn off your existing Page Rule and validate the behavior of the Managed Transform.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                           | Migrate to a Managed Transform                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'IP Geolocation Header' setting](https://developers.cloudflare.com/_astro/pr-ip-geolocation-header._es904nB_Z1kVGHd.webp) | ![The 'Add visitor location headers' Managed Transform matching the 'IP Geolocation Header' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-ip-geolocation-header-new.D3CE9V7z_Z22BvhB.webp) |

### Migrate Opportunistic Encryption

* [ Dashboard ](#tab-panel-6034)
* [ Visual guide ](#tab-panel-6035)

**Context:**

You configured a Page Rule turning off Opportunistic Encryption for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Opportunistic Encryption_
* **Value**: Off

**How to migrate**:

1. [Create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to turn off Opportunistic Encryption for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then the settings are**:  
         * **Setting**: Opportunistic Encryption  
                  * **Value**: Off
2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                                | Migrate to a configuration rule                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Opportunistic Encryption' setting](https://developers.cloudflare.com/_astro/pr-opportunistic-encryption.BcbwaI0m_2qECYg.webp) | ![Configuration rule matching the 'Opportunistic Encryption > Off' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-opportunistic-encryption-new.LwpNCqst_Z235yOw.webp) |

### Migrate Origin Cache Control

* [ Dashboard ](#tab-panel-6066)
* [ Visual guide ](#tab-panel-6067)

**Context:**

You configured a Page Rule turning off Origin Cache Control for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: Origin Cache Control
* **Value**: Off

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to determine edge cache behavior for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then**:  
         * **Cache eligibility**: Eligible for cache  
         * **Setting**: Origin Cache Control  
                  * **Enable Origin Cache Control**: Off  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                         | Migrate to a cache rule                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Origin Cache Control' setting](https://developers.cloudflare.com/_astro/pr-origin-cache-control.DCUWJE-U_Z2k59Gp.webp) | ![Cache rule matching the 'Origin Cache Control' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-origin-cache-control-new.DqpXz-FD_ZDbSey.webp) |

### Migrate Origin Error Page Pass-thru

* [ Dashboard ](#tab-panel-6068)
* [ Visual guide ](#tab-panel-6069)

**Context:**

You configured a Page Rule turning on Origin Error Page Pass-thru for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Origin Error Page Pass-thru_
* **Value**: On

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to determine edge cache behavior for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then**:  
         * **Cache eligibility**: Eligible for cache  
         * **Setting**: Origin error page pass-thru  
                  * **Use Origin error page pass-thru**: On  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                                      | Migrate to a cache rule                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Origin Error Page Pass-thru' setting](https://developers.cloudflare.com/_astro/pr-origin-error-page-pass-thru.CaO5dguv_ZTxuQ5.webp) | ![Cache rule matching the 'Origin Error Page Pass-thru > On' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-origin-error-page-pass-thru-new.CEumhpfw_ARQAy.webp) |

### Migrate Polish

* [ Dashboard ](#tab-panel-6036)
* [ Visual guide ](#tab-panel-6037)

**Context:**

You configured a Page Rule turning off [Polish](https://developers.cloudflare.com/images/polish/) for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: Polish
* **Value**: Off

**How to migrate**:

1. [Create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to turn off Polish for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then the settings are**:  
         * **Setting**: Polish  
                  * **Select value**: _Off_
2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                             | Migrate to a configuration rule                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Polish' setting](https://developers.cloudflare.com/_astro/pr-polish.BMjezHuI_Z2nbLxT.webp) | ![Configuration rule matching the 'Polish > Off' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-polish-new.BPVnKGv2_Z1vqj8p.webp) |

### Migrate Query String Sort

* [ Dashboard ](#tab-panel-6070)
* [ Visual guide ](#tab-panel-6071)

**Context:**

You configured a Page Rule turning on Query String Sort for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Query String Sort_
* **Value**: On

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to sort query string parameters for caching purposes, for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then**:  
         * **Cache eligibility**: Eligible for cache  
         * **Setting**: Cache key  
                  * **Sort query string**: On  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                   | Migrate to a cache rule                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Query String Sort' setting](https://developers.cloudflare.com/_astro/pr-query-string-sort.C01G9KtA_Z1y5BVz.webp) | ![Cache rule matching the 'Query String Sort > On' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-query-string-sort-new.DhEB-zV8_Z1HxHes.webp) |

### Migrate Resolve Override

* [ Dashboard ](#tab-panel-6038)
* [ Visual guide ](#tab-panel-6039)

**Context:**

You configured a Page Rule changing the origin to `example.saas-provider.com`, for all requests addressed at any subdomain of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Resolve Override_
* **Enter value**: `example.saas-provider.com`

**How to migrate**:

1. [Create an origin rule](https://developers.cloudflare.com/rules/origin-rules/create-dashboard/) overriding the origin to `example.saas-provider.com` for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then**:  
         * **DNS Record** \> **Override to**: `example.saas-provider.com`
2. Turn off your existing Page Rule and validate the behavior of the origin rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                | Migrate to an origin rule                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Resolve Override' setting](https://developers.cloudflare.com/_astro/pr-resolve-override.B4LoxPLL_1wNJPY.webp) | ![Origin rule matching the 'Resolve Override' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-resolve-override-new.CqsoTaU3_ZEBJqh.webp) |

### Migrate Respect Strong ETags

* [ Dashboard ](#tab-panel-6072)
* [ Visual guide ](#tab-panel-6073)

**Context:**

You configured a Page Rule turning on byte-for-byte equivalency checks for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Respect Strong ETags_
* **Value**: On

**How to migrate**:

1. [Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to respect strong ETags for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then**:  
         * **Cache eligibility**: Eligible for cache  
         * **Setting**: Respect strong ETags  
                  * **Use strong ETag headers**: On  
Warning  
The default behavior of Cache Rules is different from Page Rules. Refer to [Key differences](#key-differences) for more information.
2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                        | Migrate to a cache rule                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Respect Strong ETags' setting](https://developers.cloudflare.com/_astro/pr-respect-strong-etags.CUOv_EvP_Z3LXqt.webp) | ![Cache rule matching the 'Respect Strong ETags > On' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-respect-strong-etags-new.BnNZFkL6_Z1oczSf.webp) |

### Migrate Rocket Loader

* [ Dashboard ](#tab-panel-6040)
* [ Visual guide ](#tab-panel-6041)

**Context:**

You configured a Page Rule turning off Rocket Loader for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Rocket Loader_
* **Value**: Off

**How to migrate**:

1. [Create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to turn off Rocket Loader for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then the settings are**:  
         * **Setting**: Rocket Loader  
                  * **Value**: Off
2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                          | Migrate to a configuration rule                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Rocket Loader' setting](https://developers.cloudflare.com/_astro/pr-rocket-loader.DOfWWA3Z_1LhMmq.webp) | ![Configuration rule matching the 'Rocket Loader > Off' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-rocket-loader-new.CPlD3EdY_PllsY.webp) |

### Migrate Security Level

* [ Dashboard ](#tab-panel-6042)
* [ Visual guide ](#tab-panel-6043)

**Context:**

You configured a Page Rule setting Security Level to _I'm Under Attack_ for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _Security Level_
* **Select Security Level**: _I'm Under Attack_

**How to migrate**:

1. [Create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to set Security Level to _I'm Under Attack_, for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then the settings are**:  
         * **Setting**: I'm Under Attack  
         * **Value**: On
2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                             | Migrate to a configuration rule                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'Security Level' setting](https://developers.cloudflare.com/_astro/pr-security-level.YzQR-68G_Z1bMy81.webp) | ![Configuration rule matching the "Security Level > I'm Under Attack" setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-security-level-new.DP1C5HJ8_1BGLyi.webp) |

### Migrate True Client IP Header

* [ Dashboard ](#tab-panel-6044)
* [ Visual guide ](#tab-panel-6045)

**Context:**

You configured a Page Rule adding a `True-Client-IP` HTTP header for all requests addressed at any subdomain of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _True Client IP Header_
* **Value**: On

**How to migrate**:

1. [Turn on the **Add "True-Client-IP" header** Managed Transform](https://developers.cloudflare.com/rules/transform/managed-transforms/configure/) — a Transform Rules feature — to add the `True-Client-IP` header to all requests.
2. Turn off your existing Page Rule and validate the behavior of the Managed Transform.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                                                         | Migrate to a Managed Transform                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'True Client IP Header' setting](https://developers.cloudflare.com/_astro/pr-true-client-ip-header.h51QIhp7_7UCm4.webp) | ![The 'Add "True-Client-IP" header' Managed Transform matching the 'True Client IP Header' setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-true-client-ip-header-new.DKFw6CYO_Z1SyD08.webp) |

### Migrate SSL

* [ Dashboard ](#tab-panel-6046)
* [ Visual guide ](#tab-panel-6047)

**Context:**

You configured a Page Rule setting SSL to _Strict_ for all subdomains of `example.com` and the `example.com` domain itself:

* **URL**: `*example.com/*`
* **Setting**: _SSL_
* **Select SSL/TLS encryption mode**: _Strict_

**How to migrate**:

1. [Create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to set SSL to _Strict_, for any hostname containing `example.com`:  
   * **When incoming requests match**: Custom filter expression  
         * Using the Expression Builder:  
         `Hostname contains "example.com"`  
         * Using the Expression Editor:  
         `(http.host contains "example.com")`  
   * **Then the settings are**:  
         * **Setting**: SSL  
                  * **Select SSL/TLS encryption mode**: _Strict_
2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

| Page Rules configuration                                                                                      | Migrate to a configuration rule                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Example Page Rule with 'SSL' setting](https://developers.cloudflare.com/_astro/pr-ssl.pGEGjIS-_ZBAt4W.webp) | ![Configuration rule matching the "SSL" setting of the example Page Rule](https://developers.cloudflare.com/_astro/pr-ssl-new.DjFLYHwZ_1IeMdx.webp) |

## Settings that will not be migrated

The following Page Rules settings will not be migrated to other types of rules:

* **Disable Performance** (this setting is deprecated)
* **Disable Railgun** (this setting is deprecated, since Railgun is no longer available)
* **Disable Security** (this setting is deprecated)
* **Response Buffering** (this setting is deprecated)
* **Web Application Firewall** (this setting is deprecated, since the previous version of WAF managed rules is deprecated)

All other Page Rules settings will be migrated during 2025.

## More resources

If you have feedback to share, refer to our [Community thread ↗](https://community.cloudflare.com/t/important-page-rules-deprecation/656021).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/reference/page-rules-migration/","name":"Page Rules migration guide"}}]}
```
