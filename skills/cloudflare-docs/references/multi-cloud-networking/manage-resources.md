---
title: Manage resources
description: Manage cloud on-ramp resources and connections.
image: https://developers.cloudflare.com/zt-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/multi-cloud-networking/manage-resources.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Manage resources

## Cloud resource catalog

Your cloud environment is built from individual cloud resources, like virtual private clouds (VPCs), subnets, virtual machines (VMs), route tables, and routes. Cloudflare One Multi-Cloud Networking (formerly Magic Cloud Networking) (beta) discovers all of your cloud resources and stores their configuration and status in the Cloud resource catalog, a read-only snapshot of your cloud environment. Discovery runs regularly in the background, keeping your catalog up to date as your environment changes.

To browse the resources in your catalog:

1. Go to the **Connectors** page.  
[ Go to **Connectors** ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
2. Select the **Cloud (beta)** tab.
3. In **Cloud resources**, select a resource to inspect its details.

## Edit Cloud integrations

You can change which cloud account the integration is linked to or delete the integration.

1. Go to **Cloud integrations**.  
[ Go to **Cloud integrations** ](https://dash.cloudflare.com/?to=/:account/mcn/integrations)
2. Select your integration > **Edit**.
3. In **Linked account details**, select **Link integration to a different cloud account**.
4. Select **Save** when you are finished.
5. (Optional) You can also select **Delete** to delete your cloud integration.

## Download cloud resource catalog

You can download a JSON file containing metadata and configuration for all your cloud resources:

1. Go to the **Connectors** page.  
[ Go to **Connectors** ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
2. Select the **Cloud (beta)** tab.
3. In **Cloud resources**, select **Download catalog**.

After your browser finishes downloading the ZIP file, expand it to access the JSON with the information about your cloud resources.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/multi-cloud-networking/","name":"Multi-Cloud Networking"}},{"@type":"ListItem","position":3,"item":{"@id":"/multi-cloud-networking/manage-resources/","name":"Manage resources"}}]}
```
