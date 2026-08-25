---
description: Send custom HTTP headers with every crawl request so AI Search can index pages that sit behind authentication.
title: Authentication headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication headers

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/data-source/website/authentication-headers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can only crawl domains that you have onboarded onto the same Cloudflare account. Refer to [Onboard a domain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) for more information on adding a domain to your Cloudflare account.

If your website has pages behind authentication or pages that are only visible to logged-in users, you can configure custom HTTP headers to allow the AI Search crawler to access this protected content. You can add up to five custom HTTP headers to the requests AI Search sends when crawling your site.

This setting is labeled **Extra headers** in the dashboard, under **Parser options**. In the [REST API](https://developers.cloudflare.com/ai-search/api/instances/rest-api/) and in Wrangler, it is the `source_params.web_crawler.parse_options.include_headers` field.

## Configure in the dashboard

1. In the Cloudflare dashboard, go to the **AI Search** page.
[Go to **AI Search** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select **Create**, then select **Website** as your data source. To add headers to an existing instance, select the instance and open the **Settings** tab.
3. Under **Parser options**, locate **Extra headers**.
4. Add a header, entering the header name in **Key** and the header value in **Value**. For example, **Key** `Authorization` and **Value** `Bearer <TOKEN>`.
5. Repeat for each header you need, up to five.
6. Save your changes.

The crawler sends every header you configure with each request it makes to your site. Adding or changing headers on an existing instance starts a new indexing job that reindexes every item.

## Indexing your site protected by Cloudflare Access

To allow AI Search to crawl a site protected by [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/), you need to create service token credentials and configure them as custom headers.

Service tokens bypass user authentication, so ensure your Access policies are configured appropriately for the content you want to index. The service token will allow the AI Search crawler to access all content covered by the Service Auth policy.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), [create a service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/#create-a-service-token). Once the Client ID and Client Secret are generated, save them for the next steps. For example they can look like:
```plaintext
CF-Access-Client-Id: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.access
CF-Access-Client-Secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
2. [Create a policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/#create-a-policy) with the following configuration:

  * Add an **Include** rule with **Selector** set to **Service token**.
  * In **Value**, select the Service Token you created in step 1.
3. [Add your self-hosted application to Access](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) with the following configuration:

  * In Access policies, click **Select existing policies**.
  * Select the policy that you have just created and select **Confirm**.
4. In the Cloudflare dashboard, go to the **AI Search** page.
[Go to **AI Search** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
5. Select **Create**.
6. Select **Website** as your data source.
7. Under **Parser options**, locate **Extra headers** and add the following two headers using your saved credentials:

  * Header 1:
    * **Key**: `CF-Access-Client-Id`
    * **Value**: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.access`
  * Header 2:
    * **Key**: `CF-Access-Client-Secret`
    * **Value**: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
8. Complete the AI Search setup process to create your search instance.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/data-source/website/authentication-headers/#page","headline":"Authentication headers · Cloudflare AI Search docs","description":"Send custom HTTP headers with every crawl request so AI Search can index pages that sit behind authentication.","url":"https://developers.cloudflare.com/ai-search/configuration/data-source/website/authentication-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
