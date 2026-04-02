---
title: Troubleshoot prefix validation
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/byoip/troubleshooting/prefix-validation.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Troubleshoot prefix validation

1. Use the [Prefix Details endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/get/) to check if any issues were found during validation.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Magic Transit Read`  
   * `Magic Transit Write`  
   * `IP Prefixes: Write`  
   * `IP Prefixes: Read`  
   * `IP Prefixes: BGP On Demand Write`  
   * `IP Prefixes: BGP On Demand Read`  
Prefix Details  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID" \  
  --request GET \  
  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \  
  --header "X-Auth-Key: $CLOUDFLARE_API_KEY"  
```  
Response  
```  
 "result": {  
    "id": "72823e95d6c64d48a8111fec81179816",  
    "created_at": "2025-02-25T00:34:11.423722Z",  
    "modified_at": "2025-02-25T00:34:11.423722Z",  
    "cidr": "203.0.113.0/24",  
    "account_id": "654c5f71c324478cc9f68d60065d4620",  
    "description": "",  
    "approved": "P",  
    "on_demand_enabled": false,  
    "on_demand_locked": false,  
    "advertised": null,  
    "advertised_modified_at": null,  
    "loa_document_id": "b9ff4afe312246a8b2e7324d98f40b23",  
    "asn": 13335,  
    "ownership_validation_token": "<OWNERSHIP_VALIDATION_TOKEN>",  
    "delegate_loa_creation" : true,  
    "irr_validation_state": "valid",  
    "rpki_validation_state": "valid",  
    "ownership_validation_state": "missing",  
  }  
```
2. Consider the states returned in the API response (for example, `missing`, `invalid`, `mismatch_asn`) and review your IRR record, ROA, and ownership validation method accordingly.  
   * Information in the IRR and ROA records should meet the [onboarding prerequisites](https://developers.cloudflare.com/byoip/get-started/#before-you-begin).  
   * [Ownership validation](https://developers.cloudflare.com/byoip/get-started/#validate-prefix-ownership) requires a matching ROA and the correct validation token found in all DNS TXT records or in the IRR record.
3. After applying the necessary changes, use the Validate Prefix endpoint to trigger the validation checks.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Magic Transit Write`  
   * `IP Prefixes: Write`  
Validate Prefix  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/validate" \  
  --request POST \  
  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \  
  --header "X-Auth-Key: $CLOUDFLARE_API_KEY"  
```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/byoip/troubleshooting/prefix-validation/","name":"Troubleshoot prefix validation"}}]}
```
