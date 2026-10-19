---
description: Control domain access for Cloud Workload Security deployments and create or rotate Basic Auth credential secrets.
title: Manage traffic scope
image: https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/manage-traffic-scope/og.png?v=23e090d53d1bde2e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage traffic scope

Last updated Oct 19, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/manage-traffic-scope/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Domain access control lists (ACLs) control which destinations a deployment can reach. Use the Basic Auth page to manage credentials and their secrets. To understand how these controls relate to request policies, refer to [Request Validation](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/concepts/request-validation/).

You need access to manage Cloud Workload Security in your account.

## Create a domain ACL

A domain ACL contains domain-specific actions and a default action. The default action applies when no domain entry matches.

1. In the Cloudflare dashboard, select your account and go to **Cloud Workload Security** > **Traffic scope** > **Domain ACLs**. [Go to **Domain ACLs** ↗](https://dash.cloudflare.com/?to=/:account/one/cloud-workload-security/domain-acls)
2. Select **Add a domain ACL** and enter a **Name**.
3. Choose **Allow** or **Block** for **Default action**.
4. In **Domains**, select **Add domain**. Enter a **Domain** and choose its **Action**. For example, block `api.example.com` with a default action of **Allow**.
5. Select **Add a domain ACL** to save the list.

Use `example.com` for an exact domain match. Use `.example.com` to match the parent domain and its subdomains.

## Attach a domain ACL

1. In the Cloudflare dashboard, go to **Cloud Workload Security** > **Deployments** and open the deployment. [Go to **Deployments** ↗](https://dash.cloudflare.com/?to=/:account/one/cloud-workload-security/deployments)
2. In **Domain ACL**, select from the list and select **Save**.
3. After the proxy refreshes its configuration, test an allowed destination and a blocked destination through it.

An ACL allow decision permits the connection. CWS policies can still block API requests on that connection.

To detach the list, select **None** in **Domain ACL** and select **Save**. Detach an ACL from its deployments before deleting it.

## Create a Basic Auth credential

Basic Auth credentials are separate from the Cloudflare API token used in your proxy configuration.

1. In the Cloudflare dashboard, go to **Cloud Workload Security** > **Traffic scope** > **Credentials** > **Basic Auth**. [Go to **Basic Auth credentials** ↗](https://dash.cloudflare.com/?to=/:account/one/cloud-workload-security/credentials/basic-auth)
2. Select **Create credential** and enter a **Username**. Use printable characters without spaces or colons.
3. In **Secrets**, select **Add a secret**. Enter **Password** and **Confirm password**. Optionally, set an **Expiration**.
4. In the dialog, select **Add a secret**, then select **Create credential** to save the credential and its initial secret.

The username is read-only after creation. Open the credential to manage its secrets.

## Rotate a secret

Use this procedure for a credential your clients already use.

1. In **Basic Auth**, open the credential.
2. In **Secrets**, select **Add a secret**. Enter and confirm the new password, set an optional expiration, and select **Add a secret**.
3. Allow the deployment configuration to refresh before updating clients to use the new password. Verify requests from those clients before deleting the old secret.
4. For the old secret, select **Delete** and confirm the deletion.

The secret list displays creation and expiration information. It does not display stored passwords.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/manage-traffic-scope/#page","headline":"Manage traffic scope","description":"Control domain access for Cloud Workload Security deployments and create or rotate Basic Auth credential secrets.","url":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/manage-traffic-scope/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/manage-traffic-scope/og.png?v=23e090d53d1bde2e","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
