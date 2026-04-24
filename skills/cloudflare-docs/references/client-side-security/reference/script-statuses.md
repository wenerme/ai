---
title: Script and connection statuses
description: Status classifications for scripts and connections detected by client-side security.
image: https://developers.cloudflare.com/core-services-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-side-security/reference/script-statuses.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Script and connection statuses

Cloudflare classifies scripts and connections (also known as resources) according to the following:

* The number of times a script/connection was reported.
* Whether the script/connection is considered malicious or not.

Use client-side security's dashboards to review the scripts loaded in your domain and the connections they make. For more information, refer to [Monitor resources and cookies](https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/).

## Available statuses

* **Infrequent**: There are less than three reports for the script/connection. If there are no reports for a script/connection with _Infrequent_ status for five days, then Cloudflare will delete all the information about the script/connection. Scripts with _Infrequent_ status appear only in the All Reported Scripts dashboard, and connections with _Infrequent_ status appear only in the All Reported Connections dashboard.
* **Active**: There are more than three reports for the script/connection.
* **Inactive**: A previously active script/connection was not reported in the last seven days. If the script/connection is reported again later, its status will change back to _Active_. If the script/connection is not reported for 30 days, Cloudflare will delete all the information about it. Scripts with _Inactive_ status appear only in the All Reported Scripts dashboard, and connections with _Inactive_ status appear only in the All Reported Connections dashboard.

Note

All scripts and connections considered malicious will appear in the Monitors dashboard, regardless of their status.

Malicious script detection is only available to customers with Client-Side Security Advanced.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/client-side-security/reference/script-statuses/","name":"Script and connection statuses"}}]}
```
