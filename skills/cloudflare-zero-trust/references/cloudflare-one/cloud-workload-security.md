---
description: Prevent risky changes to your cloud environments by applying policy controls to API requests with Cloud Workload Security.
title: Cloud Workload Security
image: https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/og.png?v=6cec82e3cb406036
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloud Workload Security

Last updated Oct 19, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloud Workload Security (CWS) helps you prevent risky cloud changes. Apply policy controls to API requests before they reach your cloud provider.

Zero Trust subscription required

Your account must have a [Zero Trust subscription](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization). The Zero Trust Free plan is sufficient.

Use CWS to:

- Define policies to allow approved operations and block risky requests.
- Inspect request content, including parameters and request-body fields.
- Enforce guardrails across the cloud resources your policies cover.

For example, block requests that would make an R2 bucket public. Allow requests that keep the bucket private.

[Get started](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/get-started/)

## How it works

You manage CWS resources in the Cloudflare dashboard. A proxy you run in your environment loads a deployment's configuration and evaluates requests routed through it.

Workloads select requests, policies check them, and policy sets group those checks for a deployment.

To understand how these entities validate requests, refer to [Request Validation](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/concepts/request-validation/).

## CWS entities

### Workloads

A [workload](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/configure-policies/#create-a-workload) is a reusable filter that selects a group of requests. For example, select Cloudflare API traffic or requests for production accounts. Include or exclude workloads in a policy set to choose where its policies apply.

### Policies

A [policy](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/configure-policies/#create-a-policy) combines a request filter with a Rego check. Rego is the language used to write the check. Its Boolean `valid` rule determines whether a request passes. For example, reject a request that would make an R2 bucket public.

### Policy sets

A [policy set](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/configure-policies/#create-a-policy-set) groups policies and defines their workload scope. Include or exclude workloads to choose which requests it covers. Each policy's own filter still applies.

Turn on **Enforce** for policies that should block failed checks. Attach the policy set to a deployment to apply it.

### Deployments

A [deployment](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/get-started/#create-a-deployment) is the configuration that a proxy loads. It references policy sets and can include a domain ACL and Basic Auth credentials. Its **Default mode** applies when no policy matches a request. Its **On error action** configures policy error handling.

### Proxies

A [CWS proxy](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/get-started/#set-up-the-proxy-locally) is the process that enforces a deployment's configuration. Run it in your environment using a deployment ID and Cloudflare API credential. Route client API requests through it to apply your controls. The proxy refreshes its configuration and records request decisions.

### Domain ACLs

A [domain access control list (ACL)](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/manage-traffic-scope/#create-a-domain-acl) controls which destinations a deployment can reach. It uses domain-specific allow or block rules and a default action. Allowing a destination does not bypass request policies.

### Basic Auth credentials

A [Basic Auth credential](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/manage-traffic-scope/#create-a-basic-auth-credential) identifies a client using the proxy. It has a username and uses password secrets for authentication. Workload and policy filters can match this identity.

These credentials are separate from the proxy's Cloudflare API credential and the client's cloud-provider credentials.

### Credential secrets

A [secret](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/manage-traffic-scope/#rotate-a-secret) is a password associated with a Basic Auth credential. A credential can have multiple secrets with optional expiration times. Use overlapping secrets so clients can switch passwords before the old one expires or is removed.

### Rego modules

A [Rego module](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/policy-reference/#create-a-rego-module) stores reusable policy logic under a `lib.` package. Policies import its rules instead of duplicating the same checks. For example, share a private-bucket check across several policies.

### Rego metadata

[Rego metadata](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/policy-reference/#create-rego-metadata) stores shared JSON data that policies can read. Use it for settings such as whether buckets must remain private. Update the shared value without rewriting each policy.

### Tenant structures

A [tenant structure](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/policy-reference/#create-a-tenant-structure) describes the hierarchy of your cloud resources. Amazon Web Services (AWS) structures contain roots, organizational units, and accounts. Cloudflare structures contain organizations, accounts, and zones. Give the structure a package path to let Rego policies read its nodes.

## Target security profiles with workloads

Use workloads to apply different security profiles to different environments. For example, production accounts can require stricter policies than non-production accounts.

Create separate policy sets for production and non-production. Use workload filters to target AWS accounts or organizational units, or Cloudflare accounts or organizations.

Include the matching workload in each policy set. Attach both policy sets to the same deployment.

## Next steps

- [Configure policies](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/configure-policies/) to define workloads and attach policy sets.
- [Manage traffic scope](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/manage-traffic-scope/) to configure domain access control lists and Basic Auth credentials.
- [Manage policy reference resources](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/guides/policy-reference/) to reuse Rego code, metadata, and cloud hierarchies.
- [Proxy configuration](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/configuration/) to choose authentication, connection, and caching settings.
- [Troubleshooting](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/troubleshooting/) to diagnose proxy, client, and policy issues.

For availability, proxy deployment options, and connection requirements, refer to [Platform](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/platform/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/#page","headline":"Cloud Workload Security","description":"Prevent risky changes to your cloud environments by applying policy controls to API requests with Cloud Workload Security.","url":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/og.png?v=6cec82e3cb406036","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
