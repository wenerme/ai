---
title: Programmable Flow Protection (Beta)
description: Configure Programmable Flow Protection rules and thresholds using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Programmable Flow Protection (Beta)

Use the [Cloudflare API](https://developers.cloudflare.com/api/) to configure Programmable Flow Protection via API.

For examples of API calls, refer to the [Programmable Flow Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/programmable-flow-protection/) documentation.

## Endpoints

To obtain the complete endpoint, append the Programmable Flow Protection API endpoints listed below to the Cloudflare API base URL:

```

https://api.cloudflare.com/client/v4


```

The `{account_id}` argument is the [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The following table summarizes the available operations.

### Program API endpoints

| Operation           | Verb + Endpoint                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| Upload a program    | POST /accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programs                 |
| Update a program    | PATCH /accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programs/{program\_id}  |
| List programs       | GET /accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programs                  |
| Delete a program    | DELETE /accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programs/{program\_id} |
| Delete all programs | DELETE /accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programs               |

### Rule API endpoints

| Operation        | Verb + Endpoint                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------- |
| Create a rule    | POST /accounts/{account\_id}/magic/programmable\_flow\_protection/configs/rules              |
| Update a rule    | PATCH /accounts/{account\_id}/magic/programmable\_flow\_protection/configs/rules/{rule\_id}  |
| List rules       | GET /accounts/{account\_id}/magic/programmable\_flow\_protection/configs/rules               |
| Delete a rule    | DELETE /accounts/{account\_id}/magic/programmable\_flow\_protection/configs/rules/{rule\_id} |
| Delete all rules | DELETE /accounts/{account\_id}/magic/programmable\_flow\_protection/configs/rules            |

### Debug Packet CAPture (PCAP) API endpoint

| Operation                   | Verb + Endpoint                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| Debug Packet CAPture (PCAP) | POST /accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programs/{program\_id}/pcap |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/","name":"API configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/","name":"Programmable Flow Protection (Beta)"}}]}
```
