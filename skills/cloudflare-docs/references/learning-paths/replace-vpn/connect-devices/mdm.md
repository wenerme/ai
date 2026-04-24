---
title: MDM deployment
description: Deploy the device client via MDM.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/replace-vpn/connect-devices/mdm.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# MDM deployment

Organizations can deploy the Cloudflare One Client (formerly WARP) automatically to their fleet of devices in a single operation. The Cloudflare One Client is compatible with the vast majority of managed deployment workflows, including [mobility management solutions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/) such as Intune or JAMF, or by executing an `.msi` file on desktop machines.

## MDM policy file

Refer to our [managed deployment instructions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/) and create a `.plist`, `mdm.xml`, or `.msi` policy file based on your organization's software management tool.

[MDM parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/) that you specify in a local policy file will overrule any [device client settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/) configured in the dashboard.

 Therefore, we recommend that your policy file only contain the organization name and potentially the onboarding flag, [relying on the dashboard](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/device-profiles/) to configure the remaining device settings. 

```

<dict>

  <key>organization</key>

  <string>your-team-name</string>

  <key>onboarding</key>

  <false/>

</dict>


```

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), select **Zero Trust**.  
[ Go to **Zero Trust** ](https://one.dash.cloudflare.com/)
2. On the onboarding screen, choose a team name. The team name is a unique, internal identifier for your Zero Trust organization. Users will enter this team name when they enroll their device manually, and it will be the subdomain for your App Launcher (as relevant). Your business name is the typical entry.  
You can find your team name in [Cloudflare One ↗](https://one.dash.cloudflare.com) by going to **Settings**.
3. Complete your onboarding by selecting a subscription plan and entering your payment details. If you chose the **Zero Trust Free plan**, this step is still needed but you will not be charged.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/connect-devices/","name":"Connect user devices"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/connect-devices/mdm/","name":"MDM deployment"}}]}
```
