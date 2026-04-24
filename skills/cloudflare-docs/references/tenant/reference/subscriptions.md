---
title: Available subscriptions
description: Zone plan and account subscription values available to Cloudflare Tenant partners.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/tenant/reference/subscriptions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Available subscriptions

When [provisioning services for an account](https://developers.cloudflare.com/tenant/how-to/manage-subscriptions/), you need to include certain values with each API call to specify a particular service.

The subscriptions available to you will vary depending on your current partner program ([Agency Partner Program ↗](https://www.cloudflare.com/cloudflare-partners-self-serve-program-closed-beta/) or [Enterprise Resellers and MSP Program ↗](https://portal.cloudflarepartners.com)).

The following values are samples and not exhaustive. For the complete list of subscription values available to you, make an API call to the [zone subscriptions](https://developers.cloudflare.com/api/resources/zones/subresources/rate%5Fplans/methods/get/) or [account subscriptions](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/get/) endpoints.

## Zone plans

When creating or updating a [zone plan](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/get/), Partners can use one of the following values for the `id` of the `rate_plan` field (which controls the zone-level plan subscription).

| Partner program                     | Available subscriptions                                     |
| ----------------------------------- | ----------------------------------------------------------- |
| Enterprise and self-serve resellers | PARTNERS\_FREE, PARTNERS\_PRO, PARTNERS\_BIZ, PARTNERS\_ENT |
| Agency partners                     | CF\_FREE, CF\_PRO\_20\_20, CF\_BIZ                          |
| MSP partners                        | msp\_biz                                                    |

## Other subscriptions

When you [create an account subscription](https://developers.cloudflare.com/tenant/how-to/manage-subscriptions/#account-subscriptions), it provisions an add-on service for that account.

### Zero Trust subscriptions

The following table lists sample values for various Zero Trust subscriptions.

| Feature                                                                                     | Subscription IDs                                                                                             |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [Access](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) | PARTNERS\_ACCESS\_BASIC, PARTNERS\_ACCESS\_ENT, PARTNERS\_ACCESS\_PREMIUM, TEAMS\_ACCESS\_ENT, TEAMS\_ACCESS |
| [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)               | TEAMS\_GATEWAY\_ENT, TEAMS\_GATEWAY                                                                          |
| [Cloudflare Zero Trust](https://developers.cloudflare.com/cloudflare-one/)                  | TEAMS\_ENT, TEAMS\_FREE, TEAMS\_STANDARD                                                                     |

### Developer subscriptions

The following table lists sample values for various Developer platform subscriptions.

| Feature                                                                                                  | Subscription IDs                                                                       |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [Images](https://developers.cloudflare.com/images/)                                                      | IMAGES\_ENT,IMAGES\_BASIC                                                              |
| [Image transformations](https://developers.cloudflare.com/images/optimization/transformations/overview/) | IMAGE\_RESIZING\_ENT, IMAGE\_RESIZING\_BASIC                                           |
| [Stream](https://developers.cloudflare.com/stream/)                                                      | PARTNERS\_STREAM\_ENT, PARTNERS\_STREAM\_BASIC, STREAM\_BASIC                          |
| [Workers](https://developers.cloudflare.com/workers)                                                     | PARTNERS\_WORKERS\_ENT, WORKERS\_PAID, PARTNERS\_WORKERS\_SS, PARTNERS\_WORKERS\_BASIC |

### Application performance and security

The following table lists sample values for various application performance and security subscriptions.

| Feature                                                                                                               | Subscription IDs                                                                        |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [API Shield](https://developers.cloudflare.com/api-shield/)                                                           | API\_SHIELD\_ZONE                                                                       |
| [Advanced certificate manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) | ADVANCED\_CERT\_MANAGER\_FREE, ADVANCED\_CERT\_MANAGER                                  |
| [Argo smart routing](https://developers.cloudflare.com/argo-smart-routing/)                                           | PARTNERS\_ZONE\_ARGO, ARGO\_ZONE\_BASIC                                                 |
| [Ethereum gateway](https://developers.cloudflare.com/web3/ethereum-gateway/)                                          | WEB3\_ETHEREUM\_ENT, WEB3\_ETHEREUM\_ENT\_CONTRACT, WEB3\_ETHEREUM\_ENT\_PAYGO          |
| [IPFS gateway](https://developers.cloudflare.com/web3/ipfs-gateway/)                                                  | WEB3\_IPFS\_ENT, WEB3\_IPFS\_ENT\_CONTRACT, WEB3\_IPFS\_ENT\_PAYGO                      |
| [Load balancing](https://developers.cloudflare.com/load-balancing/)                                                   | PARTNERS\_LOAD\_BALANCING, PARTNERS\_LOAD\_BALANCING\_ENT, LOAD\_BALANCING\_BASIC\_PLUS |
| [Rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/)                                           | PARTNERS\_RATE\_LIMITING                                                                |
| [Spectrum](https://developers.cloudflare.com/spectrum/)                                                               | PARTNERS\_SPECTRUM                                                                      |
| [Waiting Room](https://developers.cloudflare.com/waiting-room/)                                                       | WAITING\_ROOMS\_BASIC, WAITING\_ROOMS\_ADV                                              |

### Network services

The following table lists sample values for various network services subscriptions.

| Feature                                                                                       | Subscription IDs                                  |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) | MAGIC\_FIREWALL\_BASIC, MAGIC\_FIREWALL\_ADVANCED |
| [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/)                           | MAGIC\_WAN                                        |

## Getting new subscriptions

If your reseller plan does not have access to a specific subscription, you will receive the following error when making an API call:

```

"errors": [

        {

            "code": 1225,

            "message": "Your account does not have access to this product. Contact billing@cloudflare.com for assistance."

        }

]


```

To change your program or - in some cases - get a specific subscription added to your reseller plan, contact `partners@cloudflare.com`. Agency Partners should contact [agency@cloudflare.com](mailto:agency@cloudflare.com)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tenant/","name":"Tenant"}},{"@type":"ListItem","position":3,"item":{"@id":"/tenant/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/tenant/reference/subscriptions/","name":"Available subscriptions"}}]}
```
