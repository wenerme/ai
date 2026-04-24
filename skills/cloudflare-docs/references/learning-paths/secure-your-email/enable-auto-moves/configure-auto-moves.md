---
title: Configure auto-moves
description: Automate moving suspicious emails to folders.
image: https://developers.cloudflare.com/cf-twitter-card.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/secure-your-email/enable-auto-moves/configure-auto-moves.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Configure auto-moves

To configure auto-move events:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Settings**.
4. Select **Moves**.
5. Under **Auto-moves**, select **Configure**.
6. Assign actions based on malicious, spoof, suspicious, spam, and bulk dispositions. Select among:  
   * **Soft delete - user recoverable**: Moves the message to the user's **Recoverable Items - Deleted** folder. Messages can be recovered by the user.  
   * **Hard delete - admin recoverable**: Completely deletes messages from a user's inbox.  
   * **Move to trash**: Moves messages to the trash or deleted items email folder.  
   * **Move to junk**: Moves the message to the junk or spam folder.  
   * **No action**: Messages stay in the origin folder.
7. Select **Save**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/enable-auto-moves/","name":"Enable auto-moves"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/enable-auto-moves/configure-auto-moves/","name":"Configure auto-moves"}}]}
```
