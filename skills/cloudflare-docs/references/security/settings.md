---
title: Security settings
description: Configure different Cloudflare security features that protect your web applications, APIs, and resources.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/security/settings.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Security settings

This page describes the security settings available in the new security dashboard for a given domain.

To access security settings in the new security dashboard, go to the **Settings** page.

[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings) 

## Security setting categories

Security settings and detection tools are categorized by the type of threat that they detect and mitigate.

### Web application exploits

In the **Web application exploits** security category you can manage the following settings:

* Detection tools:  
   * [Leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/)  
   * [Malicious uploads detection](https://developers.cloudflare.com/waf/detections/malicious-uploads/)  
   * [Sensitive data detection](https://developers.cloudflare.com/waf/managed-rules/reference/sensitive-data-detection/)  
   * [Cloudflare managed ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/)  
   * [OWASP Core](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/) ruleset  
   * [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/)
* [Under Attack mode](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/) in Security Level
* Managed [security.txt](https://developers.cloudflare.com/security-center/infrastructure/security-file/)

Refer to each linked page for details.

Note

The web application exploits security category includes features and settings from the [Cloudflare WAF](https://developers.cloudflare.com/waf/) in the previous dashboard navigation structure.

### DDoS attacks

The **DDoS attacks** security category shows the multiple mitigation services against DDoS attacks provided by Cloudflare.

You can create rules to override DDoS attack protection tools. DDoS attack protection overrides are only available to Enterprise customers with the Advanced DDoS Protection subscription.

To learn more about DDoS protection overrides, refer to the following resources:

* [HTTP DDoS attack protection overrides](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/)
* [Network-layer DDoS attack protection overrides](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/)

Note

You define overrides for the Network-layer DDoS attack protection managed ruleset at the account level in Account Home > **L3/4 DDoS** \> **Network-layer DDoS Protection**.

Additionally, you can manage the following settings:

* [Block AI Bots](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots)
* [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) (depending on your Enterprise subscriptions)
* [Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/)
* [Challenge Passage](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/challenge-passage/)
* [Cloudflare managed ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/)
* [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/)
* [Schema learning](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/)
* [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/) (requires you to upload a schema or apply a learned schema)
* [Under Attack mode](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/) (under Security Level)
* SSL/TLS DDoS attack protection

### Bot traffic

In the **Bot traffic** security category you can manage the following settings:

* [AI Labyrinth](https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/)
* [Block AI Bots](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots)
* [Bot fight mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) (depending on your Cloudflare plan)
* [Super Bot fight mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) (depending on your Cloudflare plan)
* [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) (depending on your Enterprise subscriptions)
* AI bot traffic management with [robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)
* API [sequence detection](https://developers.cloudflare.com/api-shield/security/sequence-analytics/) (requires you to configure a session identifier)

Note

The bot traffic security category includes features and settings from [Bots](https://developers.cloudflare.com/bots/) in the previous dashboard navigation structure.

### API abuse

In the **API abuse** security category you can manage the following settings:

* [Developer portal](https://developers.cloudflare.com/api-shield/management-and-monitoring/developer-portal/) creation
* Web asset discovery (always enabled if included in your Enterprise subscriptions. For Enterprise subscriptions, [API endpoint discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/) is also included, which requires you to configure a [session identifier](https://developers.cloudflare.com/api-shield/management-and-monitoring/session-identifiers/))
* [Endpoint labels](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/)
* [JWT validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/) (requires you to add a [JWT configuration](https://developers.cloudflare.com/api-shield/security/jwt-validation/api/#token-configurations))

Note

The API abuse security category includes features and settings from [API Shield](https://developers.cloudflare.com/api-shield/) in the previous dashboard navigation structure.

### Client-side abuse

In the **Client-side abuse** security category you can manage the following settings:

* [Continuous script monitoring](https://developers.cloudflare.com/client-side-security/how-it-works/):  
   * [Reporting endpoint](https://developers.cloudflare.com/client-side-security/reference/settings/#reporting-endpoint) to use your hostname instead of a Cloudflare-owned endpoint (only for Enterprise customers with a paid add-on)  
   * [Data logged in client-side abuse reports](https://developers.cloudflare.com/client-side-security/reference/settings/#connection-target-details) (only the hostname or the full URI)
* [Email Address Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/)
* [Hotlink Protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/)

Note

The client-side abuse security category includes features and settings from [client-side security](https://developers.cloudflare.com/client-side-security/) (formerly known as Page Shield) and [Scrape Shield](https://developers.cloudflare.com/waf/tools/scrape-shield/) in the previous dashboard navigation structure.

## All settings

The following table links to additional information about each available setting:

| Setting                                                                                                                                                | Location in previous dashboard navigation                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AI Labyrinth](https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/)                                                         | **Security** \> **Bots** \> **Configure Bot Fight ModeSecurity** \> **Bots** \> **Configure Super Bot Fight ModeSecurity** \> **Bots** \> **Configure Bot Management** |
| [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/)                                                         | _N/A_                                                                                                                                                                  |
| [Block AI Bots](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots)                                                                          | **Security** \> **Bots** \> **Configure Bot Fight ModeSecurity** \> **Bots** \> **Configure Super Bot Fight ModeSecurity** \> **Bots** \> **Configure Bot Management** |
| [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/):                                                                  | **Security** \> **Bots**                                                                                                                                               |
| — [JS detections](https://developers.cloudflare.com/bots/additional-configurations/javascript-detections/)                                             | **Security** \> **Bots** \> **Configure Super Bot Fight ModeSecurity** \> **Bots** \> **Configure Bot Management**                                                     |
| — [Auto-update machine learning](https://developers.cloudflare.com/bots/reference/machine-learning-models/)                                            | **Security** \> **Bots** \> **Configure Bot Management**                                                                                                               |
| [Browser integrity check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/)                                                        | **Security** \> **Settings**                                                                                                                                           |
| Challenge Passage: [Timeout](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/challenge-passage/)               | **Security** \> **Settings**                                                                                                                                           |
| [Client certificates](https://developers.cloudflare.com/ssl/client-certificates/)                                                                      | **SSL** \> **Client Certificates**                                                                                                                                     |
| [Cloudflare managed ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/)                                | **Security** \> **WAF** \> **Managed rules** tab                                                                                                                       |
| [Continuous script monitoring](https://developers.cloudflare.com/client-side-security/how-it-works/):                                                  | **Security** \> **Client-side security**                                                                                                                               |
| — [Reporting endpoint](https://developers.cloudflare.com/client-side-security/reference/settings/#reporting-endpoint)                                  | **Security** \> **Client-side security** \> **Settings**                                                                                                               |
| — [Data processing](https://developers.cloudflare.com/client-side-security/reference/settings/#connection-target-details)                              | **Security** \> **Client-side security** \> **Settings**                                                                                                               |
| — [Alerts](https://developers.cloudflare.com/client-side-security/alerts/configure/)                                                                   | **Security** \> **Client-side security** \> **Settings**Account Home > **Notifications**                                                                               |
| [Create a developer portal](https://developers.cloudflare.com/api-shield/management-and-monitoring/developer-portal/)                                  | **Security** \> **API Shield** \> **Settings**                                                                                                                         |
| [Custom fallthrough rules](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-adding-a-fallthrough-rule)       | **Security** \> **API Shield** \> **Settings**                                                                                                                         |
| [Email Address Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/)                                      | **Scrape Shield**                                                                                                                                                      |
| [API endpoint discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/):                                                        | **API Shield** \> **Discovery**                                                                                                                                        |
| — [Session identifiers](https://developers.cloudflare.com/api-shield/management-and-monitoring/session-identifiers/)                                   | **Security** \> **API Shield** \> **Settings**                                                                                                                         |
| [Endpoint labels](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/)                                             | **Security** \> **Settings** \> **Labels**                                                                                                                             |
| [Hotlink Protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/)                                                    | **Scrape Shield**                                                                                                                                                      |
| [HTTP DDoS attack protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/):                                               | **Security** \> **DDoS**                                                                                                                                               |
| — [Configure overrides](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/configure-dashboard/)                   | **Security** \> **DDoS**                                                                                                                                               |
| [Instruct AI bot traffic with robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)                        | **Security** \> **Bots** \> **Configure Bot Fight ModeSecurity** \> **Bots** \> **Configure Super Bot Fight ModeSecurity** \> **Bots** \> **Configure Bot Management** |
| [IP access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/)                                                                        | **Security** \> **WAF** \> **Tools** tab**Security** \> **WAF** \> **Custom rules** tab                                                                                |
| [IP lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists)                                                                   | Account Home > **Manage Account** \> **Configurations**                                                                                                                |
| [JWT validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/):                                                               | **Security** \> **API Shield** \> **Settings**                                                                                                                         |
| — [JWT validation rules](https://developers.cloudflare.com/api-shield/security/jwt-validation/#add-a-jwt-validation-rule)                              | **Security** \> **API Shield** \> **API Rules**                                                                                                                        |
| — [Token configurations](https://developers.cloudflare.com/api-shield/security/jwt-validation/#add-a-token-validation-configuration)                   | **Security** \> **API Shield** \> **Settings**                                                                                                                         |
| [Leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/):                                                  | **Security** \> **Settings**                                                                                                                                           |
| — [Custom username and password location](https://developers.cloudflare.com/waf/detections/leaked-credentials/#custom-detection-locations)             | **Security** \> **Settings**                                                                                                                                           |
| [Malicious uploads detection](https://developers.cloudflare.com/waf/detections/malicious-uploads/):                                                    | **Security** \> **Settings**                                                                                                                                           |
| — [Custom content location](https://developers.cloudflare.com/waf/detections/malicious-uploads/#custom-scan-expressions)                               | **Security** \> **Settings**                                                                                                                                           |
| [mTLS rules](https://developers.cloudflare.com/api-shield/security/mtls/configure/)                                                                    | **SSL/TLS** \> **Client Certificates**                                                                                                                                 |
| [Network-layer DDoS attack protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/)                                    | Account Home > **L3/4 DDoS** \> **Network-layer DDoS Protection**                                                                                                      |
| [OWASP Core](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/) ruleset                                                | **Security** \> **WAF** \> **Managed rules** tab                                                                                                                       |
| Rate limit authentication requests                                                                                                                     | **Security** \> **WAF** \> **Rate limiting rules** tab                                                                                                                 |
| [Replace insecure JavaScript libraries](https://developers.cloudflare.com/waf/tools/replace-insecure-js-libraries/)                                    | **Security** \> **Settings**                                                                                                                                           |
| [Schema learning](https://developers.cloudflare.com/api-shield/security/schema-validation/):                                                           | **Security** \> **API Shield** \> **Schema Validation**                                                                                                                |
| — [Session identifiers](https://developers.cloudflare.com/api-shield/management-and-monitoring/session-identifiers/)                                   | **Security** \> **API Shield** \> **Settings**                                                                                                                         |
| [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/)                                                          | **Security** \> **API Shield** \> **Schema Validation**                                                                                                                |
| — [Endpoints](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/)                                             | **Security** \> **API Shield**                                                                                                                                         |
| — [Active schemas](https://developers.cloudflare.com/api-shield/security/schema-validation/#view-active-schemas)                                       | **Security** \> **API Shield** \> **Schema Validation**                                                                                                                |
| — [Default action](https://developers.cloudflare.com/api-shield/security/schema-validation/#change-the-global-default-action-of-schema-validation)     | **Security** \> **API Shield** \> **Schema Validation**                                                                                                                |
| [Security level: I'm under attack mode](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/)                                   | **Security** \> **Settings**                                                                                                                                           |
| [Security.txt](https://developers.cloudflare.com/security-center/infrastructure/security-file/)                                                        | **Security** \> **Settings**                                                                                                                                           |
| [Sensitive data detection](https://developers.cloudflare.com/waf/managed-rules/reference/sensitive-data-detection/#configure-in-the-dashboard) ruleset | **Security** \> **Sensitive Data**                                                                                                                                     |
| [Sequence detection](https://developers.cloudflare.com/api-shield/security/sequence-analytics/):                                                       | **Security** \> **API Shield** \> **API Rules**                                                                                                                        |
| — [Endpoints](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/)                                             | **Security** \> **API Shield**                                                                                                                                         |
| — [Session identifiers](https://developers.cloudflare.com/api-shield/management-and-monitoring/session-identifiers/)                                   | **Security** \> **API Shield** \> **Settings**                                                                                                                         |
| [Session identifiers](https://developers.cloudflare.com/api-shield/management-and-monitoring/session-identifiers/)                                     | **Security** \> **API Shield** \> **Settings**                                                                                                                         |
| [SSL/TLS DDoS attack protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/)                                                  | **Security** \> **DDoS**                                                                                                                                               |
| [Token configurations](https://developers.cloudflare.com/api-shield/security/jwt-validation/)                                                          | **Security** \> **API Shield** \> **Settings**                                                                                                                         |
| [User agent blocking](https://developers.cloudflare.com/waf/tools/user-agent-blocking/)                                                                | **Security** \> **WAF** \> **Tools** tab**Security** \> **WAF** \> **Custom rules** tab                                                                                |
| [Zone lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/)                                                                            | **Security** \> **WAF** \> **Tools** tab**Security** \> **WAF** \> **Custom rules** tab                                                                                |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security/","name":"Security dashboard"}},{"@type":"ListItem","position":3,"item":{"@id":"/security/settings/","name":"Security settings"}}]}
```
