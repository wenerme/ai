---
description: Manage cloud on-ramp resources and connections.
title: Manage resources
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/multi-cloud-networking/llms.txt
> Use this file to discover all available pages before exploring further.

#  Manage resources

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/multi-cloud-networking/manage-resources/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Cloud resource catalog

Your cloud environment is built from individual cloud resources, like virtual private clouds (VPCs), subnets, virtual machines (VMs), route tables, and routes. Cloudflare One Multi-Cloud Networking (formerly Magic Cloud Networking) (beta) discovers all of your cloud resources and stores their configuration and status in the Cloud resource catalog, a read-only snapshot of your cloud environment. Discovery runs regularly in the background, keeping your catalog up to date as your environment changes.

To browse the resources in your catalog:

1. Go to the **Connectors** page.
[ Go to **Connectors** ↗ ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
2. Select the **Cloud (beta)** tab.
3. In **Cloud resources**, select a resource to inspect its details.

## Edit Cloud integrations

You can change which cloud account the integration is linked to or delete the integration.

1. Go to **Cloud integrations**.
[ Go to **Cloud integrations** ↗ ](https://dash.cloudflare.com/?to=/:account/mcn/integrations)
2. Select your integration > **Edit**.
3. In **Linked account details**, select **Link integration to a different cloud account**.
4. Select **Save** when you are finished.
5. (Optional) You can also select **Delete** to delete your cloud integration.

## Download cloud resource catalog

You can download a JSON file containing metadata and configuration for all your cloud resources:

1. Go to the **Connectors** page.
[ Go to **Connectors** ↗ ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
2. Select the **Cloud (beta)** tab.
3. In **Cloud resources**, select **Download catalog**.

After your browser finishes downloading the ZIP file, expand it to access the JSON with the information about your cloud resources.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/multi-cloud-networking/manage-resources/#page","headline":"Manage resources · Cloudflare Multi-Cloud Networking docs","description":"Manage cloud on-ramp resources and connections.","url":"https://developers.cloudflare.com/multi-cloud-networking/manage-resources/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
