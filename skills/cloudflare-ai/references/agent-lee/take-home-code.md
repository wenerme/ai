---
description: Take the source code Agent Lee generates with you by exporting it to a temporary, Git-cloneable repository.
title: Export generated code
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-lee/llms.txt
> Use this file to discover all available pages before exploring further.

# Export generated code

Last updated Sep 24, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agent-lee/take-home-code/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Take the source code Agent Lee generates with you by exporting it to a temporary, Git-cloneable repository.

Beta

Code export is part of the Agent Lee beta. Behaviors and limits described here may change.

When Agent Lee generates a small project for you — for example, a starter static site or a Worker — you can export the source so you can keep working on it locally. Agent Lee packages the generated files into a temporary repository and gives you a one-time command to clone it to your machine.

This is a **take-home** flow: the repository is short-lived and lives in Cloudflare-managed storage, not in your account. It is meant for getting generated code onto your own machine, after which you push it to a Git host of your choice. You do not need to connect a GitHub or GitLab account.

## How it works

- **Temporary repository.** When you export, Agent Lee writes the generated files to a repository that expires about 36 hours after it is created. Once it expires, the export card disables the copy button and the code can no longer be cloned.
- **On-demand clone command.** Agent Lee does not put a clone command or credential in the chat transcript. Instead, the export card shows a **Copy clone command** button that fetches a fresh command when you select it. The command embeds a read credential that is valid for about one hour.
- **Export card.** The card shows the project name, the list of exported files, and a countdown to expiry so you know how long you have to clone.

## Export and clone your code

1. Ask Agent Lee to build something that produces code, then ask it to export the code. For example: "Export this project so I can clone it."
2. In the export card that appears, review the file list and the expiry countdown.
3. Select **Copy clone command**. Agent Lee fetches a fresh command and copies it to your clipboard.
4. Paste the command into your terminal and run it. What you copied is already a complete `git clone` invocation, so do not add anything to it. It has the following shape, where the credential is embedded in the remote URL and the final argument is the local directory to create:

   ```sh
   git clone https://<credential>@<host>/<repository>.git <project-name>
   ```


5. Change into the new directory, point the repository at your own Git host, and push it there to keep it:

   ```sh
   cd <project-name>
   git remote set-url origin https://your-git-host.example/you/your-repo.git
   git push -u origin main
   ```



## Security and privacy

- **No credential in chat.** The clone command and its read credential are delivered only when you select **Copy clone command** — never in the message text, conversation history, or model context. Agent Lee will not type the clone command into the chat, so do not ask it to.
- **Short-lived access.** The read credential expires about an hour after it is issued. If the command stops working before the repository expires, return to the export card and copy a fresh one.
- **Nothing is written to your account.** The temporary repository lives in Cloudflare-managed storage. Agent Lee does not create repositories, tokens, or other resources in your Cloudflare account to perform an export.
- **Automatic cleanup.** The temporary repository is deleted automatically once it expires. Clone and push to your own host before then.

## Limitations

- Exported repositories are temporary and are not backed up. Once a repository expires, it cannot be recovered.
- The clone credential is read-only and single-purpose. You cannot push back to the temporary repository — push to your own Git host instead.
- Code export is intended for small, self-contained projects that Agent Lee generates during a conversation. A single export can include:
  - up to 50 files
  - up to 100 KB per file
  - up to 2 MB in total

  Agent Lee tells you if a project is too large to export. If that happens, ask it for a smaller subset of the project.

## Related resources

- [Agent Lee overview](https://developers.cloudflare.com/agent-lee/)
- [Workers](https://developers.cloudflare.com/workers/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-lee/take-home-code/#page","headline":"Export generated code","description":"Take the source code Agent Lee generates with you by exporting it to a temporary, Git-cloneable repository.","url":"https://developers.cloudflare.com/agent-lee/take-home-code/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
