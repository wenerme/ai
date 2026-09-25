---
description: Control whether Agent Lee appears in the dashboard, choose what it is allowed to read and change, and review the API tokens it holds.
title: Manage access and permissions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-lee/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage access and permissions

Last updated Sep 24, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agent-lee/manage-access/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Control whether Agent Lee appears in the dashboard, choose what it is allowed to read and change, and review the API tokens it holds.

Beta

Agent Lee is currently in beta. The controls described here may change, and not every control is available to every account yet.

Agent Lee acts on your account using an API token that it creates on your behalf, scoped to the permissions you grant. You decide whether the assistant appears at all, what it can read, and whether it can make changes.

## Open or hide Agent Lee

Select **Ask AI** in the upper-right corner of any dashboard page, or use a keyboard shortcut:

- `Cmd` + `/` on macOS, or `Ctrl` + `/` on Windows and Linux.
- Press `t` then `a` to toggle the sidebar.

### Turn Agent Lee off

If you do not want to use Agent Lee, you can hide it from the dashboard entirely.

1. In the Cloudflare dashboard, go to **Configurations** > **Preferences** for your account.
2. Find the **Cloudflare Agent** card and turn the setting off.

Note

The dashboard has not finished adopting the Agent Lee name. This preference is still labelled **Cloudflare Agent**.

Turning the setting off hides the **Ask AI** sidebar and disables the keyboard shortcuts, and the assistant loses its stored copy of your API token, so it can no longer reach your account. The dashboard also attempts to delete the underlying API token for you. To confirm the token is gone — or to remove it yourself — see [Review the tokens Agent Lee holds](#review-the-tokens-agent-lee-holds).

Turning the setting back on does not restore access automatically. You are asked to grant permissions again the next time you open the assistant.

Turning Agent Lee off does not delete your conversation history.

## Choose what Agent Lee can access

When you first grant access, you choose how much of your account the assistant can use. Depending on your account, you may see the following permission templates:

| Template | What it allows |
| --- | --- |
| **Full access** | Read your resources, and propose changes. Every write still requires your approval before it executes. |
| **Read only** | Read and inspect your resources. Agent Lee cannot change anything. |
| **Custom** | Choose individual permissions yourself. |

**Full access** does not mean unattended access. Agent Lee shows you exactly what it intends to do and waits for your confirmation before any change is made.

### Custom permissions

**Custom** opens a curated list of permissions grouped into categories such as Developer Platform, DNS and Zones, App Security, AI, Cloudflare One, Analytics and Logs, and Account. Each entry has independent read and write toggles, and you choose which accounts the grant applies to.

This list is a subset of everything a Cloudflare API token can express — it covers the products Agent Lee knows how to work with, not the entire API surface.

### What Agent Lee can never change

Some permissions are withheld no matter which template you pick or what you select under **Custom**. Agent Lee cannot write to:

- Account settings
- Account membership
- Billing
- API tokens

## When permission changes take effect

Changing permissions issues a new API token with the updated scope and replaces the one the assistant was using. The previous token is then deleted. Because the new token is created before the old one is removed, both may exist briefly.

Permission changes apply to your next message. Actions the assistant has already completed are not affected, and you do not need to start a new conversation for a change to take effect.

## Write access disabled by an administrator

An account administrator can prevent Agent Lee from making changes on your behalf. When this applies to you, the assistant shows a **Write off** indicator with a lock icon near the message box, and the tooltip reads:

> Write access has been disabled for your account by an administrator. You can still read and inspect resources.

In this state Agent Lee can still answer questions, run diagnostics, and inspect your configuration, but it cannot create, update, or delete anything. You cannot lift the restriction yourself — contact your account administrator.

The restriction applies only to the account where it was set. Your permissions on other accounts are unchanged.

## Review the tokens Agent Lee holds

Agent Lee's tokens appear alongside your own. To audit or remove them:

1. Go to **My Profile** > **API Tokens** in the Cloudflare dashboard.
2. Look for tokens named `Cloudflare Agent Token -` followed by a date.
3. Delete any token you no longer want. Deleting the token the assistant is currently using revokes its access immediately; you are asked to grant permissions again the next time you open it.

Reviewing this list is the reliable way to confirm that access has been removed after you turn Agent Lee off or narrow its permissions.

## Availability

Agent Lee is not available in the Cloudflare FedRAMP environment.

Availability is still rolling out, so the assistant and the controls on this page may not appear on every account yet.

## Related resources

- [Agent Lee overview](https://developers.cloudflare.com/agent-lee/)
- [Cloudflare API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-lee/manage-access/#page","headline":"Manage access and permissions","description":"Control whether Agent Lee appears in the dashboard, choose what it is allowed to read and change, and review the API tokens it holds.","url":"https://developers.cloudflare.com/agent-lee/manage-access/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
