---
description: Review Cloud Workload Security Beta availability, resource limits, proxy deployment options, and traffic and certificate requirements.
title: Platform
image: https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/platform/og.png?v=d30c5ac81c9f6488
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Platform

Last updated Oct 19, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/platform/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Availability

Cloud Workload Security (CWS) is available in Beta. Manage CWS resources in the Cloudflare dashboard after selecting your account.

Your account must have a Zero Trust subscription. The Zero Trust Free plan is sufficient.

You need permission to manage the resources you change. The proxy also needs a Cloudflare API credential for the same account. Refer to [API connection and authentication](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/configuration/#api-connection-and-authentication) for API token and Global API Key setup.

## Limits

CWS applies these standard resource and relationship limits.

### Entity quotas

Quotas apply per account unless otherwise indicated:

| Entity | Standard limit |
| --- | --- |
| Deployments | 5 |
| Policy sets | 10 |
| Workloads | 10 |
| Domain ACLs | 10 |
| Basic Auth credentials | 10 |
| Policies | 50 |
| Rego modules — shared libraries | 10 |
| Rego metadata documents | 10 |
| Tenant structures | 5 |
| Tenant nodes per structure | 100 |

### Per-entity and relationship limits

The following limits apply to individual resources and relationships:

| Constraint | Standard limit |
| --- | --- |
| Policy sets attached to a deployment | 10 |
| Basic Auth credentials attached to a deployment | 10 |
| Policies in a policy set | 50 |
| Included workloads in a policy set | 10 |
| Excluded workloads in a policy set | 10 |
| Entries in a domain ACL | 100 |
| Stored secrets per Basic Auth credential, including expired secrets | 10 |
| Tags per deployment, policy, policy set, or workload | 10 |
| Domain ACLs attached to a deployment | 1 |
| Roots in a tenant structure | 1 |

## Proxy deployment options

You run the CWS proxy in your environment. Choose a location that your cloud API clients can reach, and install the `cws-proxy` package using APT or DNF.

### Local machine

Run the proxy and client on the same Linux machine or Linux virtual machine (VM) to test a guardrail. Follow [Set up the proxy locally](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/get-started/#set-up-the-proxy-locally) for the empty-R2-bucket walkthrough.

### CI/CD runner

Run the proxy alongside jobs in a continuous integration and continuous delivery (CI/CD) pipeline. This applies guardrails to cloud API requests made by applications and deployment scripts.

For this pattern, the runner needs:

- A proxy process that is ready before jobs make cloud API requests. After starting the proxy, check the proxy logs for `remote_config_loaded` and `action_mapper_loaded` to confirm startup.
- The API credential supplied through the CI secret store, and a certificate authority (CA) certificate and private key available to the proxy process.
- Client tools configured to use the proxy endpoint and trust its CA certificate. Apply client proxy settings to the cloud-request steps, separately from the proxy process.

Manage proxy startup and cleanup through your runner's process or service lifecycle. For the `cf` client settings, refer to [Route the CLI through the proxy](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/get-started/#route-the-cli-through-the-proxy).

### Application host or container

Run the installed proxy as a managed process on a Linux VM or application host. For containers, use a Linux environment with APT or DNF and provide the proxy's configuration, credentials, and CA files.

Configure your application to use the proxy through its supported proxy and CA trust settings. Keep the proxy running while the application makes cloud API requests.

### Shared proxy host

Run a proxy on a host reachable by multiple applications or pipeline jobs. Set `proxy.listen_addr` to a private IP address and port on that host, then configure clients with the corresponding proxy URL.

Restrict network access to the intended clients. Each client needs the CA certificate for trust. Keep the matching private key on the proxy host.

For package installation, refer to [Get started](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/get-started/). For listener, authentication, upstream proxy, and cache settings, refer to [Proxy configuration](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/configuration/).

## Traffic requirements

Policies evaluate API requests routed through your CWS proxy. Creating a deployment does not route application traffic automatically.

Clients must use the proxy and trust its CA certificate. Keep the matching private key on the proxy host.

Clients on other hosts or in separate containers need a reachable proxy address. A loopback address such as `127.0.0.1` only reaches processes in the same network namespace.

Domain ACLs control destination access separately from request policies. An allowed destination does not bypass policy checks.

## Configuration refresh

The proxy refreshes its deployment configuration at the interval configured in `cws.api_poll_interval_secs`. The minimum interval is `30` seconds.

After saving policy, policy set, or deployment changes, allow a refresh interval before verifying their effect. Restart the proxy after changing its local configuration file.

If changes do not affect requests, follow [Saved changes do not affect requests](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/troubleshooting/#saved-changes-do-not-affect-requests).

## Request authentication

Cloud provider authentication still applies to requests sent through the proxy. The proxy uses its Cloudflare API credential to load deployment configuration. Clients still need their own cloud provider credentials.

To identify the source of a block response, follow [Requests receive an unexpected 403](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/troubleshooting/#requests-receive-an-unexpected-403).

## Licenses

For the proxy's Beta terms, license notices, and acknowledgments, refer to [Legal](https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/legal/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/platform/#page","headline":"Platform","description":"Review Cloud Workload Security Beta availability, resource limits, proxy deployment options, and traffic and certificate requirements.","url":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/platform/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/cloud-workload-security/platform/og.png?v=d30c5ac81c9f6488","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
