---
title: Create an Access application
description: Add an application to Cloudflare Access.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create an Access application

Cloudflare Access allows you to securely publish internal tools and applications to the Internet by providing an authentication layer between the end user and your origin server. You can use signals from your existing identity providers (IdPs), device posture providers, and [other rules](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#selectors) to control who can access your application.

Each application can have multiple policies with different constraints depending on what user group is accessing the application. For example, you can create one policy that requires corporate users to present specific device posture checks or mutual TLS authentication events, and a second policy for contractors which does not require these attributes.

## Add your application to Access

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Access controls** \> **Applications**.
2. Select **Add an application**.
3. Select **Self-hosted**.
4. Enter any name for the application.
5. In **Session Duration**, choose how often the user's [application token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/) should expire.  
Cloudflare checks every HTTP request to your application for a valid application token. If the user's application token (and global token) has expired, they will be prompted to reauthenticate with the IdP. For more information, refer to [Session management](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/).
1. Select **Add public hostname**.
2. In the **Domain** dropdown, select the domain that will represent the application. Domains must belong to an active zone in your Cloudflare account. You can use [wildcards](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/) to protect multiple parts of an application that share a root path.  
Alternatively, to use a [Cloudflare for SaaS custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/secure-with-access/), set **Input method** to _Custom_ and enter your custom hostname.
3. (Optional) Configure **Browser rendering settings**:  
   * [Automatic cloudflared authentication](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/automatic-cloudflared-authentication/)  
   * [Browser rendering for SSH, VNC, or RDP](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/browser-rendering/)
4. Add [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to control who can connect to your application. All Access applications are deny by default -- a user must match an Allow policy before they are granted access.
5. Configure how users will authenticate:  
   1. Select the [**Identity providers**](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) you want to enable for your application.  
   2. (Recommended) If you plan to only allow access via a single IdP, turn on **Instant Auth**. End users will not be shown the [Cloudflare Access login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/). Instead, Cloudflare will redirect users directly to your SSO login event.  
   3. (Optional) Under **Device authentication identity**, allow users to authenticate to the application using their [ Cloudflare One Client session identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/).
6. Select **Next**.
7. (Optional) Configure [App Launcher settings](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) for the application.
8. (Optional) Configure [independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#configure-independent-mfa-for-an-application) for the application.
9. Under **Block page**, choose what end users will see when they are denied access to the application:  
   * **Cloudflare default**: Reload the [login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/) and display a block message below the Cloudflare Access logo. The default message is `That account does not have access`, or you can enter a custom message.  
   * **Redirect URL**: Redirect to the specified website.  
   * **Custom page template**: Display a [custom block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-block-page/) hosted in Cloudflare One.
10. Select **Next**.
11. (Optional) Configure advanced settings:  
   * [**Cross-Origin Resource Sharing (CORS) settings**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/cors/)  
   * [**Cookie settings**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#cookie-settings)  
   * **401 Response for Service Auth policies**: Return a `401` response code when a user (or machine) makes a request to the application without the correct [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/).
12. Select **Save**.

When users go to the application, they will be prompted to login with your identity provider.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/access-application/","name":"Secure your applications"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/access-application/create-access-app/","name":"Create an Access application"}}]}
```
