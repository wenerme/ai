---
description: A screenshot-by-screenshot guide to connecting Visual Studio Code to the Cloudflare API through the Cloudflare MCP server, then creating, verifying, and deleting a DNS record with natural language.
title: Visual Studio Code detailed walkthrough
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-setup/llms.txt
> Use this file to discover all available pages before exploring further.

# Visual Studio Code detailed walkthrough

Last updated Jul 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agent-setup/visual-studio-code/detailed-walkthrough/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This walkthrough connects Visual Studio Code directly to the Cloudflare API using the [Cloudflare MCP server ↗](https://github.com/cloudflare/mcp-server-cloudflare). By the end, you can create a DNS record by typing a sentence, without leaving the editor.

The Cloudflare MCP server at `mcp.cloudflare.com` exposes the Cloudflare API to any MCP-capable agent. The Visual Studio Code Copilot agent connects to it, and you run API calls from natural language.

For the condensed version, refer to the [Visual Studio Code quick start](https://developers.cloudflare.com/agent-setup/visual-studio-code/).

## Before you start

* Visual Studio Code, fully up to date. A version mismatch between the editor and the Copilot extension is the most common source of agent-mode errors.
* GitHub Copilot. Any GitHub account works, and the free tier is enough.
* A Cloudflare account you are comfortable pointing an agent at. Use a demo account. The reason becomes clear at the authorization step.

## Connect Visual Studio Code to the Cloudflare API

1. **Confirm your Visual Studio Code version**
Open Visual Studio Code and select **Help** \> **About**. Confirm you are on a current build. If an **Update** button appears in the title bar, select it and let Visual Studio Code restart before continuing.
![Visual Studio Code Help menu showing the About dialog used to confirm the installed version](https://developers.cloudflare.com/_astro/vscode-help-about.DZbAxRm2_Z1DNcjb.webp)
2. **Sign in to Copilot**
Select the Copilot icon in the Status Bar, select **Use AI Features**, then sign in with a GitHub account. Visual Studio Code opens your browser to authorize.
![Visual Studio Code prompt to enable AI features and sign in with GitHub](https://developers.cloudflare.com/_astro/vscode-pilot-signin.C0VZ3V6j_Z1E0xW7.webp)
3. **Authenticate to Copilot**
Follow the browser pages to authenticate to GitHub.
![GitHub sign-in page for authorizing GitHub Copilot](https://developers.cloudflare.com/_astro/vscode-copilot-login.BLqMAZ3V_Z1z2n6T.webp)
4. **Create a folder and open it**
Create an empty folder for this project, then open it in Visual Studio Code with **File** \> **Open Folder**. For example, `~/cloudflare-api-mcp/`.
![Visual Studio Code Open Folder dialog selecting an empty project folder](https://developers.cloudflare.com/_astro/vscode-open-folder.myi5RNpK_2eXBRz.webp)
5. **Create the configuration file**
Inside the folder, create one file: `.vscode/mcp.json`. Typing `.vscode/mcp.json` in the Explorer creates the folder and file together.
![Visual Studio Code Explorer creating the .vscode/mcp.json configuration file](https://developers.cloudflare.com/_astro/vscode-create-mcp-json.Dfhk6e7P_2dgHwP.webp)
Paste the following into the file, then save:
```json
{
  "servers": {
    "cloudflare-api": {
      "type": "http",
      "url": "https://mcp.cloudflare.com/mcp"
    }
  }
}
```
Note
The root key in Visual Studio Code is `servers`. Configurations written for Cursor or Claude Desktop use `mcpServers`, which does nothing here.
6. **Start the server**
After you save the file, a **Start** link appears on the `cloudflare-api` server definition. It looks like a comment, but it is a button (a [CodeLens ↗](https://learn.microsoft.com/en-us/visualstudio/ide/find-code-changes-and-other-history-with-codelens)). Select it, then allow the authentication prompt. Your browser opens the Cloudflare authorization page.
![Visual Studio Code showing the Start CodeLens on the Cloudflare MCP server definition in mcp.json](https://developers.cloudflare.com/_astro/vscode-start-cloudflare-mcp.CFgXmbiP_m7aJF.webp)
7. **Choose an access template**
The authorization page is where you decide what the agent can access. This example selects **Full access** to modify DNS records. You can also start with **Read only** or build a **Custom** permission set. Scope the grant to a single account, then review what you are granting.
![Cloudflare MCP authorization page showing access templates and account scope options](https://developers.cloudflare.com/_astro/cloudflare-mcp-access-template.BuSG8Wod_Z1gsJBf.webp)
Before you authorize, know two things. **Full access** lets the agent create and delete real resources, which is why this belongs on a demo account. You can revoke the grant at any time from the dashboard under **My Profile** \> **Access Management** \> **Connected Applications**, which is also the page to visit if a re-authorization behaves unexpectedly.
8. **Verify permissions and authorize**
Review the list of permissions, then select **Authorize** to let the Cloudflare API interact with your account.
![Cloudflare MCP authorization page listing the requested permission groups before authorizing](https://developers.cloudflare.com/_astro/cloudflare-mcp-confirm-authorization.BiEdoNbZ_Z2lQVQn.webp)
Note
You may see 401 errors in the Visual Studio Code logs. This is expected until you select **Allow in this Session** in the authorization prompt.
![Visual Studio Code Copilot prompt to allow the Cloudflare MCP server in the current session](https://developers.cloudflare.com/_astro/vscode-chat-allow-in-this-session.B1JRX2iR_Z1HERuj.webp)
9. **Open Copilot Chat**
If Copilot is minimized, open it with **View** \> **Chat**.
![Visual Studio Code View menu opening the Copilot Chat panel](https://developers.cloudflare.com/_astro/vscode-open-copilot-chat.q2eWZZ8B_1m2Dle.webp)
10. **Confirm the server is running**
The server now shows as running. The CodeLens reads **Running | 3 tools**. Three tools is correct, not a broken install: the server uses a search-and-execute pattern instead of registering thousands of individual endpoints.
![Visual Studio Code CodeLens showing the Cloudflare MCP server running with three tools](https://developers.cloudflare.com/_astro/vscode-cloudflare-mcp-status.B1n7i2kW_1bom0A.webp)
11. **List your zones**
In Copilot Chat, set the mode to **Agent**, then ask it to list your zones. The agent requests your approval before running the call and returns a live list of every domain in the account.
![Copilot Chat returning a list of Cloudflare zones from the account](https://developers.cloudflare.com/_astro/cloudflare-mcp-list-available-zones.By3y10Td_Z1yLo0K.webp)
```txt
List zones in my account
```
```txt
Ran Cloudflare API Code Executor

- Zones returned: 1
- Zone: cloudflaredemo.net — id: <ZONE_ID> — status: active
```
12. **Create a DNS record**
Ask the agent to create a DNS AAAA record and turn on the Cloudflare proxy. This example points `test.cloudflaredemo.net` at `100::`, a reserved placeholder address from the IPv6 discard prefix `0100::/64` ([RFC 6666 ↗](https://www.rfc-editor.org/rfc/rfc6666)). Because the record is proxied, Cloudflare intercepts requests before they reach this address. Approve the tool call (**Always Allow**), and the agent reports the record created.
![Copilot Chat creating a proxied AAAA DNS record through the Cloudflare MCP server](https://developers.cloudflare.com/_astro/cloudflare-mcp-create-aaaa-record.9y7YCmFb_15i0VI.webp)
```txt
Create a AAAA record for test.cloudflaredemo.net pointing to 100:: and enable the proxy.
```
```txt
Ran Cloudflare API Code Executor

- Record created: test.cloudflaredemo.net
- Type: AAAA
- Value: 100::
- Proxied: true
- Record ID: <RECORD_ID>
```
Do not rely on the agent's report alone. Open the dashboard and check the zone.
![Cloudflare dashboard DNS records page confirming the new AAAA record exists](https://developers.cloudflare.com/_astro/cloudflare-dash-verify-dns-record.fsKq8sUx_2tCq65.webp)
13. **Verify DNS propagation**
Ask the Cloudflare MCP server to verify that the record propagated.
![Copilot Chat verifying DNS propagation across public resolvers](https://developers.cloudflare.com/_astro/cloudflare-mcp-verify-dns-propagation.Bj4T6fcx_Z23qGFP.webp)
```txt
Verify DNS propagation for test.cloudflaredemo.net
```
```txt
Ran: dig @1.1.1.1 test.cloudflaredemo.net AAAA +short

- Result: DNS resolves to Cloudflare IPv6 addresses (proxy active).
- Resolvers returning AAAA: 1.1.1.1, 8.8.8.8, 9.9.9.9
  - 2606:4700::6812:2f3
  - 2606:4700::6812:3f3
```
Note
Because you turned on the proxy, the response returns Cloudflare-owned IP addresses rather than the origin `100::` address.
14. **Delete the DNS record**
You can delete the record as easily as you created it.
![Copilot Chat deleting the test DNS record through the Cloudflare MCP server](https://developers.cloudflare.com/_astro/cloudflare-mcp-delete-dns-record.DahKGny6_f6TDm.webp)
```txt
Delete test.cloudflaredemo.net
```
```txt
Ran Cloudflare API Code Executor
Deleted the DNS record for test.cloudflaredemo.net.
```

You now have an AI agent with read and write access to Cloudflare services in the account, driven entirely from Visual Studio Code.

## Related resources

* [Visual Studio Code quick start](https://developers.cloudflare.com/agent-setup/visual-studio-code/) — condensed setup, tips, FAQ, and troubleshooting.
* [Cloudflare MCP server ↗](https://github.com/cloudflare/mcp-server-cloudflare) — domain-specific MCP servers.
* [Cloudflare API](https://developers.cloudflare.com/api/) — the full REST API reference.

Was this helpful?

YesNo

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-setup/visual-studio-code/detailed-walkthrough/#page","headline":"Visual Studio Code detailed walkthrough · Agent setup docs","description":"A screenshot-by-screenshot guide to connecting Visual Studio Code to the Cloudflare API through the Cloudflare MCP server, then creating, verifying, and deleting a DNS record with natural language.","url":"https://developers.cloudflare.com/agent-setup/visual-studio-code/detailed-walkthrough/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
