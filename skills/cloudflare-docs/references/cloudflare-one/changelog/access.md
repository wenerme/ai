---
title: Access
description: Review recent changes to Cloudflare Access.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/changelog/access.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Access

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/access.xml) 

## 2026-03-26

  
**Code mode for MCP server portals**   

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) support [code mode](https://developers.cloudflare.com/agents/api-reference/codemode/), a technique that reduces context window usage by replacing individual tool definitions with a single code execution tool. Code mode is turned on by default on all portals.

To turn it off, edit the portal in **Access controls** \> **AI controls** and turn off **Code mode** under **Basic information**.

When code mode is active, the portal exposes a single `code` tool instead of listing every tool from every upstream MCP server. The connected AI agent writes JavaScript that calls typed `codemode.*` methods for each upstream tool. The generated code runs in an isolated [Dynamic Worker](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/) environment, keeping authentication credentials and environment variables out of the model context.

To use code mode, append `?codemode=search_and_execute` to your portal URL when connecting from an MCP client:

```

https://<subdomain>.<domain>/mcp?codemode=search_and_execute


```

For more information, refer to [code mode](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#code-mode).

## 2026-03-20

  
**Managed OAuth for Cloudflare Access**   

Cloudflare Access supports managed OAuth, which allows non-browser clients — such as CLIs, AI agents, SDKs, and scripts — to authenticate with Access-protected applications using a standard OAuth 2.0 authorization code flow.

Previously, non-browser clients that attempted to access a protected application received a `302` redirect to a login page they could not complete. The established workaround was `cloudflared access curl`, which required installing additional tooling.

With managed OAuth, clients instead receive a `401` response with a `WWW-Authenticate` header that points to Access's OAuth discovery endpoints ([RFC 8414 ↗](https://datatracker.ietf.org/doc/html/rfc8414) and [RFC 9728 ↗](https://datatracker.ietf.org/doc/html/rfc9728)). The client opens the end user's browser to the Access login page. The end user authenticates with their identity provider, and the client receives an OAuth access token for subsequent requests.

Access enforces the same policies as a browser login; the OAuth layer is a new transport mechanism, not a separate authentication path.

Managed OAuth can be enabled on any self-hosted Access application or [MCP server portal](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/). It is opt-in for existing applications to avoid interfering with those that run their own OAuth servers and rely on their own `WWW-Authenticate` headers.

Note

For MCP server portals, managed OAuth is enabled by default on new portals. It remains opt-in for self-hosted applications.

To enable managed OAuth, go to **Zero Trust** \> **Access controls** \> **Applications**, edit the application, and turn on **Managed OAuth** under **Advanced settings**.

You can also enable it via the API by setting `oauth_configuration.enabled` to `true` on the [Access applications endpoint](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/update/).

![Managed OAuth settings in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/managed-oauth.BirLnBpy_Zjg97R.webp) 

For setup instructions, refer to [Enable managed OAuth](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/).

## 2025-09-22

  
**Access Remote Desktop Protocol (RDP) destinations securely from your browser — now generally available!**   

[Browser-based RDP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/) with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) is now generally available for all Cloudflare customers. It enables secure, remote Windows server access without VPNs or RDP clients.

Since we announced our [open beta](https://developers.cloudflare.com/changelog/access/#2025-06-30), we've made a few improvements:

* Support for targets with IPv6.
* Support for [Magic WAN](https://developers.cloudflare.com/cloudflare-wan/) and [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) as on-ramps.
* More robust error messaging on the login page to help you if you encounter an issue.
* Worldwide keyboard support. Whether your day-to-day is in Portuguese, Chinese, or something in between, your browser-based RDP experience will look and feel exactly like you are using a desktop RDP client.
* Cleaned up some other miscellaneous issues, including but not limited to enhanced support for Entra ID accounts and support for usernames with spaces, quotes, and special characters.

As a refresher, here are some benefits browser-based RDP provides:

* **Control how users authenticate to internal RDP resources** with single sign-on (SSO), multi-factor authentication (MFA), and granular access policies.
* **Record who is accessing which servers and when** to support regulatory compliance requirements and to gain greater visibility in the event of a security event.
* **Eliminate the need to install and manage software on user devices**. You will only need a web browser.
* **Reduce your attack surface** by keeping your RDP servers off the public Internet and protecting them from common threats like credential stuffing or brute-force attacks.
![Example of a browser-based RDP Access application](https://developers.cloudflare.com/_astro/browser-based-rdp-access-app.BNXce1JL_1TDoUX.webp) 

To get started, refer to [Connect to RDP in a browser](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/).

## 2025-02-12

**Access policies support filtering**

You can now filter Access policies by their action, selectors, rule groups, and assigned applications.

## 2025-02-11

**Private self-hosted applications and reusable policies GA**

[Private self-hosted applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) and [reusable Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/) are now generally available (GA) for all customers.

## 2025-01-21

**Access Applications support private hostnames/IPs and reusable Access policies.**

Cloudflare Access self-hosted applications can now be defined by [private IPs](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/), [private hostnames](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) (on port 443) and [public hostnames](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/). Additionally, we made Access policies into their own object which can be reused across multiple applications. These updates involved significant updates to the overall Access dashboard experience. The updates will be slowly rolled out to different customer cohorts. If you are an Enterprise customer and would like early access, reach out to your account team.

## 2025-01-15

**Logpush for SSH command logs**

Enterprise customers can now use Logpush to export SSH command logs for Access for Infrastructure targets.

## 2024-12-04

**SCIM GA for Okta and Microsoft Entra ID**

Cloudflare's SCIM integrations with [Okta](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta/#synchronize-users-and-groups) and [Microsoft Entra ID](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#synchronize-users-and-groups) (formerly AzureAD) are now out of beta and generally available (GA) for all customers. These integrations can be used for Access and Gateway policies and Zero Trust user management. Note: This GA release does not include [Dashboard SSO SCIM](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/) support.

## 2024-10-23

**SSH with Access for Infrastructure**

Admins can now use [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) to manage privileged access to SSH servers. Access for Infrastructure provides improved control and visibility over who accessed what service and what they did during their SSH session. Access for Infrastructure also eliminates the risk and overhead associated with managing SSH keys by using short-lived SSH certificates to access SSH servers.

## 2024-08-26

**Reduce automatic seat deprovisioning minimum to 1 month, down from 2 months.**

Admins can now configure Zero Trust seats to [automatically expire](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/#enable-seat-expiration) after 1 month of user inactivity. The previous minimum was 2 months.

## 2024-06-06

**Scalability improvements to the App Launcher**

Applications now load more quickly for customers with a large number of applications or complex policies.

## 2024-04-28

**Add option to bypass CORS to origin server**

Access admins can [defer all CORS enforcement to their origin server](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/cors/#bypass-options-requests-to-origin) for specific Access applications.

## 2024-04-15

**Zero Trust User identity audit logs**

All user identity changes via SCIM or Authentication events are logged against a user's registry identity.

## 2024-02-22

**Access for SaaS OIDC Support**

Access for SaaS applications can be setup with OIDC as an authentication method. OIDC and SAML 2.0 are now both fully supported.

## 2024-02-22

**WARP as an identity source for Access**

Allow users to log in to Access applications with their WARP session identity. Users need to reauthenticate based on default session durations. WARP authentication identity must be turned on in your device enrollment permissions and can be enabled on a per application basis.

## 2023-12-20

**Unique Entity IDs in Access for SaaS**

All new Access for SaaS applications have unique Entity IDs. This allows for multiple integrations with the same SaaS provider if required. The unique Entity ID has the application audience tag appended. Existing apps are unchanged.

## 2023-12-15

**Default relay state support in Access for SaaS**

Allows Access admins to set a default relay state on Access for SaaS apps.

## 2023-09-15

**App launcher supports tags and filters**

Access admins can now tag applications and allow users to filter by those tags in the App Launcher.

## 2023-09-15

**App launcher customization**

Allow Access admins to configure the App Launcher page within Zero Trust.

## 2023-09-15

**View active Access user identities in the dashboard and API**

Access admins can now view the full contents of a user's identity and device information for all active application sessions.

## 2023-09-08

**Custom OIDC claims for named IdPs**

Access admins can now add custom claims to the existing named IdP providers. Previously this was locked to the generic OIDC provider.

## 2023-08-02

**Azure AD authentication contexts**

Support Azure AD authentication contexts directly in Access policies.

## 2023-06-23

**Custom block pages for Access applications**

Allow Access admins to customize the block pages presented by Access to end users.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/changelog/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/changelog/access/","name":"Access"}}]}
```
