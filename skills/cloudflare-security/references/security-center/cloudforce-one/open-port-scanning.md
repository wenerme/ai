---
description: Scan your IP ranges for open ports and receive daily notifications about changes.
title: Open Port Scanning
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security-center/llms.txt
> Use this file to discover all available pages before exploring further.

# Open Port Scanning

Last updated Apr 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/security-center/cloudforce-one/open-port-scanning/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Open Port Scanning allows [Magic Transit](https://developers.cloudflare.com/magic-transit/) and [Bring your Own IPs](https://developers.cloudflare.com/byoip/) users to efficiently monitor IP ranges for security vulnerabilities. This API enables users to scan their designated IP ranges, detect any open ports, and receive daily notifications regarding newly opened ports.

You can access this feature via the [API](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans/subresources/config/).

## Prerequisites

- Cloudforce One Administrator, Administrator and Super Administrator roles.
- Account token: **Custom API Token** > **Cloudforce One:Edit**.

To create a custom API token:

1. From the [Cloudflare dashboard ↗](https://dash.cloudflare.com/profile/api-tokens/), go to **My Profile** > **API Tokens** for user tokens. Go to **Create Custom Token** > **Get started**.
2. Enter a **Token name**, for example, `Open Port Scanning`.
3. In **Permissions**:
   - Choose **Account**.
   - Select **Cloudforce One** as the account.
   - Choose **Edit** access.
4. In Client IP Address Filtering:
   - In **Operator**, select `is in`.
   - In **Value**, enter a valid IP address.
5. Select **Continue to summary**.
6. Review the token, then select **Create Token**.

Note

The Open Port Scanner will run from a predetermined set of IPs. The Cloudforce One team recommends you to allowlist these IPs in your rules.

## Configure Open Port Scanning

To configure Open Port Scanning, follow these steps:

1. **Create a new scan config**:
   - **IPs**: Enter the IP ranges you wish to monitor. Ensure that the ranges are correctly formatted to avoid scanning errors. The API will validate if the IPs requested are onboarded to Cloudflare and associated to the account belonging to the API token used.
   - **Frequency**: Enter the scan frequency in days.
   - **Ports**: Select the ports to scan. Choose among:
     - All
     - Default (refer to [Default ports](https://developers.cloudflare.com/security-center/cloudforce-one/open-port-scanning/#default-ports) for a comprehensive list)
     - List of specific ports
2. **Scan IPs**: Initiate the scanning process. The system will analyze the specified IP ranges to identify any open ports.
3. **Generate list of open ports**: Once the scan is complete, the API will generate a list of detected open ports for review and action.
4. **Select open ports to list**: Choose which open ports you would like to be notified about. You can exclude any ports that do not require immediate attention.
5. **View differences from previous scan**: The API will highlight any changes in open ports since the last scan, allowing you to quickly assess new vulnerabilities.
6. **Stop scanning**: If necessary, you can stop the scanning process at any time.
7. **Set up alerts**: Configure alerts for specific ports of interest. You will be notified immediately via email or webhook if any of these designated ports become newly open.

Beta feature notice

Open Port Scanning feature is currently in closed beta. The Cloudforce One team appreciates your feedback as the team works to enhance its functionality and user experience. If you want to subscribe to this feature or participate in the beta program, [join our closed beta for Port Scanning ↗](https://www.cloudflare.com/lp/open-port-scanning-beta/).

## Default ports

<details>

<summary>

List of default ports

</summary>

- <code>80</code>
- <code>631</code>
- <code>161</code>
- <code>137</code>
- <code>123</code>
- <code>138</code>
- <code>1434</code>
- <code>445</code>
- <code>135</code>
- <code>67</code>
- <code>23</code>
- <code>53</code>
- <code>443</code>
- <code>21</code>
- <code>139</code>
- <code>22</code>
- <code>500</code>
- <code>68</code>
- <code>520</code>
- <code>1900</code>
- <code>25</code>
- <code>4500</code>
- <code>514</code>
- <code>49152</code>
- <code>162</code>
- <code>69</code>
- <code>5353</code>
- <code>111</code>
- <code>49154</code>
- <code>3389</code>
- <code>110</code>
- <code>1701</code>
- <code>998</code>
- <code>996</code>
- <code>997</code>
- <code>999</code>
- <code>3283</code>
- <code>49153</code>
- <code>445</code>
- <code>1812</code>
- <code>136</code>
- <code>139</code>
- <code>143</code>
- <code>53</code>
- <code>2222</code>
- <code>135</code>
- <code>3306</code>
- <code>2049</code>
- <code>32768</code>
- <code>5060</code>
- <code>8080</code>
- <code>1025</code>
- <code>1433</code>
- <code>3456</code>
- <code>80</code>
- <code>1723</code>
- <code>111</code>
- <code>995</code>
- <code>993</code>
- <code>20031</code>
- <code>1026</code>
- <code>7</code>
- <code>5900</code>
- <code>1646</code>
- <code>1645</code>
- <code>593</code>
- <code>1025</code>
- <code>518</code>
- <code>2048</code>
- <code>626</code>
- <code>1027</code>
- <code>587</code>
- <code>177</code>
- <code>1719</code>
- <code>427</code>
- <code>497</code>
- <code>8888</code>
- <code>4444</code>
- <code>1023</code>
- <code>65024</code>
- <code>199</code>
- <code>19</code>
- <code>9</code>
- <code>49193</code>
- <code>1029</code>
- <code>1720</code>
- <code>49</code>
- <code>465</code>
- <code>88</code>
- <code>1028</code>
- <code>17185</code>
- <code>1718</code>
- <code>49186</code>
- <code>548</code>
- <code>113</code>
- <code>81</code>
- <code>6001</code>
- <code>2000</code>
- <code>10000</code>
- <code>31337</code>

</details>

## Frequently Asked Questions

1. What IPs will the scan come from?
   - `2a09:bac0:1008:5000:1000:0000:0000:0050/104.30.128.13`
   - `2a09:bac0:1008:5000:1000:0000:0000:0048/104.30.129.33`
   - `2001:19f0:1000:2941:5400:4ff:fe70:2a7a/140.82.60.241`
2. Can the Port Scanner bypass other security rules configured?
   - The Cloudforce One team asks customers to ensure they allow the IPs for the scanner to run correctly.
3. How long do scans take?
   - Depending on the number of IP addresses and number of ports scanned, scans can take between a few minutes and up to 10 hours.
4. Can I stop automatic scanning?
   - Yes, you can decide at any point to stop scan and restart scans when it is convenient for you.
5. What are the limitations for the scans?
   - Scans are limited to ranges of up to 5,000 IPs.
   - The API scans both IPv4 and IPv6 IP addresses.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security-center/cloudforce-one/open-port-scanning/#page","headline":"Open Port Scanning · Cloudflare Security Center docs","description":"Scan your IP ranges for open ports and receive daily notifications about changes.","url":"https://developers.cloudflare.com/security-center/cloudforce-one/open-port-scanning/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
