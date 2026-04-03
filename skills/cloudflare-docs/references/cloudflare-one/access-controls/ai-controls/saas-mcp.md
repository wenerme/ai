---
title: Secure MCP servers with Access for SaaS
description: You can secure Model Context Protocol (MCP) servers by using Cloudflare Access as an OAuth Single Sign-On (SSO) provider.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ MCP ](https://developers.cloudflare.com/search/?tags=MCP) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/access-controls/ai-controls/saas-mcp.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Secure MCP servers with Access for SaaS

You can secure [Model Context Protocol (MCP) servers ↗](https://www.cloudflare.com/learning/ai/what-is-model-context-protocol-mcp/) by using Cloudflare Access as an OAuth Single Sign-On (SSO) provider.

This guide walks through how to deploy a remote MCP server on [Cloudflare Workers](https://developers.cloudflare.com/workers/) that requires Cloudflare Access for authentication. When users connect to the MCP server using an MCP client, they will be prompted to log in to your [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) and are only granted access if they pass your [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#selectors).

## Prerequisites

* Create a [Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization).
* Configure [One-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) or connect a third-party [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/).

## 1\. Deploy an example MCP server

To deploy our [example MCP server ↗](https://github.com/cloudflare/ai/tree/main/demos/remote-mcp-cf-access) to your Cloudflare account:

* [ Dashboard ](#tab-panel-3416)
* [ CLI ](#tab-panel-3417)

1. Select the following button to launch the quickstart flow:  
[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/ai/tree/main/demos/remote-mcp-cf-access)
2. Select the account that contains your Zero Trust organization.
3. On the **Create an application** page, configure the following fields:  
   * **Git account**: Select an existing account or connect a new GitHub or GitLab account.  
   * **Create private Git repository**: Choose whether the project repository should be public or private.  
   * **Project name**: `mcp-server-cf-access`  
   * **Select KV namespace**: _Create new_  
   * **Name your KV namespace**: `OAUTH_KV`  
We will configure `ACCESS_CLIENT_ID` and the other secret values in a later step.
4. Select **Create and deploy**.

The MCP server will be deployed to your `*.workers.dev` subdomain at `mcp-server-cf-access.<YOUR_SUBDOMAIN>.workers.dev`. A new git repository will be set up on your GitHub or GitLab account for your MCP server, configured to automatically deploy to Cloudflare each time you push a change or merge a pull request to the main branch of the repository.

You can use the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler) to create the MCP server on your local machine and deploy it to Cloudflare.

Prerequisites

* Install [npm ↗](https://docs.npmjs.com/getting-started)
* Install [Node.js ↗](https://nodejs.org/en/)

1. Open a terminal and clone our example project:  
Terminal window  
```  
npm create cloudflare@latest -- mcp-server-cf-access --template=cloudflare/ai/demos/remote-mcp-cf-access  
```  
During setup, select the following options:  
   * For _Do you want to add an AGENTS.md file to help AI coding tools understand Cloudflare APIs?_, choose `No`.  
   * For _Do you want to use git for version control?_, choose `No`.  
   * For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).
2. Go to the project directory:  
Terminal window  
```  
cd mcp-server-cf-access  
```
3. Create a [Workers KV namespace](https://developers.cloudflare.com/kv/concepts/kv-namespaces/) to store the key. The binding name should be `OAUTH_KV` if you want to run the example as written.  
Terminal window  
```  
npx wrangler kv namespace create "OAUTH_KV"  
```  
The command will output the binding name and KV namespace ID:  
```  
{  
  "kv_namespaces": [  
    {  
      "binding": "OAUTH_KV",  
      "id": "<YOUR_KV_NAMESPACE_ID>"  
    }  
  ]  
}  
```
4. Open `wrangler.jsonc` in an editor and insert your `OAUTH_KV` namespace ID:  
```  
"kv_namespaces": [  
  {  
    "binding": "OAUTH_KV",  
    "id": "<YOUR_KV_NAMESPACE_ID>"  
  }  
],  
```
5. You can now deploy the Worker to Cloudflare's global network:  
Terminal window  
```  
npx wrangler deploy  
```

The Worker will be deployed to your `*.workers.dev` subdomain at `mcp-server-cf-access.<YOUR_SUBDOMAIN>.workers.dev`.

## 2\. Create an Access for SaaS app

* [ Dashboard ](#tab-panel-3420)
* [ API ](#tab-panel-3421)

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Access controls** \> **Applications**.
2. Select **Add an application**.
3. Select **SaaS**.
4. In **Application**, enter a custom name (for example, `MCP server`) and select the textbox that appears below.
5. Select **OIDC** as the authentication protocol.
6. Select **Add application**.
7. In **Redirect URLs**, enter the authorization callback URL for your MCP server. The callback URL for our [example MCP server](#1-deploy-an-example-mcp-server) is`https://mcp-server-cf-access.<YOUR_SUBDOMAIN>.workers.dev/callback`.
8. Copy the following values to input into our example MCP server. Other MCP servers may require different sets of input values.  
   * **Client secret**  
   * **Client ID**  
   * **Token endpoint**  
   * **Authorization endpoint**  
   * **Key endpoint**
9. (Optional) Under **Advanced settings**, turn on [**Refresh tokens**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/generic-oidc-saas/#advanced-settings) if you want to reduce the number of times a user needs to log in to the identity provider.
10. Configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to define the users who can access the MCP server.
11. Configure how users will authenticate:  
   1. Select the [**Identity providers**](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) you want to enable for your application.  
   2. (Recommended) If you plan to only allow access via a single IdP, turn on **Instant Auth**. End users will not be shown the [Cloudflare Access login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/). Instead, Cloudflare will redirect users directly to your SSO login event.  
   3. (Optional) Under **Device authentication identity**, allow users to authenticate to the application using their [ Cloudflare One Client session identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/).
12. Save the application.

1. Make a `POST` request to the [Access applications](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/create/) endpoint:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
Add an Access application  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "MCP server",  
    "type": "saas",  
    "saas_app": {  
        "auth_type": "oidc",  
        "redirect_uris": [  
            "https://mcp-server-cf-access.<YOUR_SUBDOMAIN>.workers.dev/callback"  
        ],  
        "grant_type": [  
            "authorization_code",  
            "refresh_tokens"  
        ],  
        "refresh_token_options": {  
            "lifetime": "90d"  
        }  
    },  
    "policies": [  
        "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"  
    ],  
    "allowed_idps": []  
  }'  
```
2. Copy the `client_id` and `client_secret` returned in the response.
3. Build the OAuth endpoint URLs using your team name and the `client_id` returned in the response:  
| Endpoint               | URL                                                                                          |  
| ---------------------- | -------------------------------------------------------------------------------------------- |  
| Token endpoint         | https://<TEAM\_NAME>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<CLIENT\_ID>/token         |  
| Authorization endpoint | https://<TEAM\_NAME>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<CLIENT\_ID>/authorization |  
| Key endpoint           | https://<TEAM\_NAME>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<CLIENT\_ID>/jwks          |

## 3\. Configure your MCP server

Your MCP server needs to perform an OAuth 2.0 authorization flow to get an `access_token` from the SaaS app created in [Step 1](#1-create-an-access-for-saas-app). When setting up the OAuth client on your MCP server, you will need to paste in the OAuth endpoints and credentials from the Access for SaaS app.

To add OAuth endpoints and credentials to our [example MCP server](#1-deploy-an-example-mcp-server):

* [ Dashboard ](#tab-panel-3418)
* [ CLI ](#tab-panel-3419)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select the `mcp-server-cf-access` Worker.
3. Go to **Settings**.
4. Under **Variables and Secrets**, update each secret with the corresponding value obtained from the [Access for SaaS app](#2-create-an-access-for-saas-app).  
| Workers secret             | SaaS app field         |  
| -------------------------- | ---------------------- |  
| ACCESS\_CLIENT\_ID         | Client ID              |  
| ACCESS\_CLIENT\_SECRET     | Client secret          |  
| ACCESS\_TOKEN\_URL         | Token endpoint         |  
| ACCESS\_AUTHORIZATION\_URL | Authorization endpoint |  
| ACCESS\_JWKS\_URL          | Key endpoint           |  
Note  
Use the Client ID, Client secret, and OAuth endpoints copied from the Cloudflare One dashboard. Do not use the OAuth values from your [third-party identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/).
5. For `COOKIE_ENCRYPTION_KEY`, you can use the following command to generate a random string:  
Terminal window  
```  
openssl rand -hex 32  
```  
Enter the output of this command into `COOKIE_ENCRYPTION_KEY`.

1. Create the following [Workers secrets](https://developers.cloudflare.com/workers/configuration/secrets/):  
Terminal window  
```  
npx wrangler secret put ACCESS_CLIENT_ID  
npx wrangler secret put ACCESS_CLIENT_SECRET  
npx wrangler secret put ACCESS_TOKEN_URL  
npx wrangler secret put ACCESS_AUTHORIZATION_URL  
npx wrangler secret put ACCESS_JWKS_URL  
```
2. When prompted to enter a secret value, paste the corresponding values obtained from the [Access for SaaS app](#2-create-an-access-for-saas-app).  
| Workers secret             | SaaS app field         |  
| -------------------------- | ---------------------- |  
| ACCESS\_CLIENT\_ID         | Client ID              |  
| ACCESS\_CLIENT\_SECRET     | Client secret          |  
| ACCESS\_TOKEN\_URL         | Token endpoint         |  
| ACCESS\_AUTHORIZATION\_URL | Authorization endpoint |  
| ACCESS\_JWKS\_URL          | Key endpoint           |  
Note  
Use the Client ID, Client secret, and OAuth endpoints copied from the Cloudflare One dashboard. Do not use the OAuth values from your [third-party identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/).
3. Generate a random string for the cookie encryption key:  
Terminal window  
```  
openssl rand -hex 32  
```  
Store the output of this command in a Workers secret:  
Terminal window  
```  
npx wrangler secret put COOKIE_ENCRYPTION_KEY  
```

## 4\. Test the connection

You can now connect to your MCP server at `https://mcp-server-cf-access.<YOUR_SUBDOMAIN>.workers.dev/mcp` using [Workers AI Playground ↗](https://playground.ai.cloudflare.com/), [MCP inspector ↗](https://github.com/modelcontextprotocol/inspector), or [other MCP clients](https://developers.cloudflare.com/agents/guides/remote-mcp-server/#connect-your-mcp-server-to-claude-and-other-mcp-clients) that support remote MCP servers.

To test in Workers AI Playground:

1. Go to [Workers AI Playground ↗](https://playground.ai.cloudflare.com/).
2. Under **MCP Servers**, enter `https://mcp-server-cf-access.<YOUR_SUBDOMAIN>.workers.dev/mcp` for the MCP server URL.
3. Select **Connect**.
4. A popup window will appear requesting access to the MCP server. Select **Approve**.
5. Follow the prompts to log in to your identity provider.

Workers AI Playground will show a **Connected** status. The MCP server should successfully obtain an `access_token` from Cloudflare Access.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/ai-controls/","name":"AI controls"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/ai-controls/saas-mcp/","name":"Secure MCP servers with Access for SaaS"}}]}
```
