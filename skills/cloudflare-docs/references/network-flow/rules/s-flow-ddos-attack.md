---
title: sFlow DDoS attack rule
description: Create sFlow DDoS attack detection rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# sFlow DDoS attack rule

An sFlow DDoS attack rule (beta) alerts you when a DDoS attack is detected in your network traffic. Network Flow (formerly Magic Network Monitoring) uses the same DDoS detection rules that protect Cloudflare's global network to identify these attacks.

To use sFlow DDoS attack rules, you must send sFlow data to Cloudflare. You can only configure these rules through the [Network Flow Rules API](https://developers.cloudflare.com/api/resources/magic%5Fnetwork%5Fmonitoring/subresources/rules/) — they are not available in the dashboard.

## Send sFlow data from your network to Cloudflare

To send sFlow data to Cloudflare, your router must support sFlow exports. Refer to [Supported routers](https://developers.cloudflare.com/network-flow/routers/supported-routers/) to verify compatibility, and [Configure sFlow](https://developers.cloudflare.com/network-flow/routers/sflow-config/) for setup instructions.

## Rule configuration fields

| Field                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rule name**          | Must be unique and cannot contain spaces. Supports characters A-Z, a-z, 0-9, underscore (\_), dash (\-), period (.), and tilde (\~). Maximum of 256 characters.                                                                                                                                                                                                                                                                                                                                          |
| **Rule type**          | advanced\_ddos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Prefix Match**       | The field prefix\_match determines how IP matches are handled. **Subnet** (recommended): Automatically advertise if the attacked IPs are within a subnet of a public IP prefix that can be advertised by Magic Transit.**Exact**: Automatically advertise if the attacked IPs are an exact match with a public IP prefix that can be advertised by Magic Transit.**Supernet**: Automatically advertise if the attacked IPs are a supernet of a public IP prefix that can be advertised by Magic Transit. |
| **Auto-advertisement** | If you are a [Magic Transit On Demand](https://developers.cloudflare.com/magic-transit/on-demand) customer, you can enable this feature to automatically enable Magic Transit if the rule's dynamic threshold is triggered. To learn more, refer to [Auto-advertisement](https://developers.cloudflare.com/network-flow/rules/#rule-auto-advertisement).                                                                                                                                                 |
| **Rule IP prefix**     | The IP prefix associated with the rule for monitoring traffic volume. Must be a CIDR range such as 160.168.0.1/24. The maximum is 5,000 unique CIDR entries. To learn more and see an example, refer to [Rule IP prefixes](https://developers.cloudflare.com/network-flow/rules/#rule-ip-prefixes).                                                                                                                                                                                                      |

## API documentation

Refer to the [Rules API documentation](https://developers.cloudflare.com/api/resources/magic%5Fnetwork%5Fmonitoring/subresources/rules/) to review an example API configuration call using CURL and the expected output for a successful response.

## Tune the sFlow DDoS alert thresholds

You can tune the thresholds of your sFlow DDoS alerts in the dashboard and via the Cloudflare API by following the [Network-layer DDoS Attack Protection managed ruleset](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/) guide.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-flow/","name":"Network Flow"}},{"@type":"ListItem","position":3,"item":{"@id":"/network-flow/rules/","name":"Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/network-flow/rules/s-flow-ddos-attack/","name":"sFlow DDoS attack rule"}}]}
```
