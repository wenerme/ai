---
title: Enable
description: Enable Version Management in the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/version-management/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable

By default, Version Management is not enabled on a zone.

To enable [Version Management ↗](https://dash.cloudflare.com/?to=/:account/:zone/versioning):

1. Log in to the Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Select your account and zone.
3. Go to **Version Management**.
4. Select **Enable versioning**.

Note

If you cannot enable Version Management, make sure your zone, account, and user meet the [requirements](https://developers.cloudflare.com/version-management/#requirements).

Once you [enable](https://developers.cloudflare.com/version-management/how-to/enable/) Version Management, Cloudflare will automatically create:

* **Version Zero**, think about this as the configuration of your current zone. Once default environments are created, Version Zero is automatically deployed to them, guaranteeing no disruption in your live traffic. This Version is also permanently editable. In case you decide to disable Zone Versioning, Version Zero will become your zone again.
* **Global Configuration**, you can find all the configurations here that are not supported by Version Management.

Important

Any changes made to the **Global Configuration** will immediately apply to your zone and all versions of your zone, affecting live traffic.

On the Environments page, you can create default environments for **Production**, **Staging**, and **Development**.

## Disable Version Management

Warning

When you disable Zone Versioning, all your zone configurations will revert to those in your **Version Zero**.

When deleting the production environment, all traffic will default to Version 0\. The action of deleting an environment does not impact any versions configuration.

To disable Zone Versioning:

1. Confirm that **Version Zero** has the correct configurations for your zone:  
   1. Use the [comparison feature](https://developers.cloudflare.com/version-management/how-to/compare-versions/) to view the differences between your current **Production** version and **Version Zero**.  
   2. If there are differences, make changes to **Version Zero** so it matches your current **Production** version.  
   3. [Promote](https://developers.cloudflare.com/version-management/how-to/environments/#promote-a-version) **Version Zero** to your **Production** environment.  
   4. Confirm that your new **Production** environment functions as expected.
2. Send a `GET` request to the `/zones/{zone_id}/environments` endpoint.  
Terminal window  
```  
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/environments" \  
--header "X-Auth-Email: <EMAIL>" \  
--header "X-Auth-Key: <API_KEY>"  
```  
In the response, save the following values:  
   * The environment `ref` of every rule
3. Using the `ref` of those environments, send a `DELETE` request to the `/zones/{zone_id}/environments/{ref}` endpoint for each environment.  
Terminal window  
```  
curl --request DELETE \  
"https://api.cloudflare.com/client/v4/zones/{zone_id}/environments/{ref}" \  
--header "X-Auth-Email: <EMAIL>" \  
--header "X-Auth-Key: <API_KEY>"  
```
4. Then, send a `GET` request to find all HTTP applications (or versions of your zone).  
Terminal window  
```  
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/http_applications" \  
--header "X-Auth-Email: <EMAIL>" \  
--header "X-Auth-Key: <API_KEY>"  
```  
Save the `id` of each HTTP application.
5. Using the `id` of those HTTP applications, send `DELETE` requests for every application.  
Terminal window  
```  
curl --request DELETE \  
"https://api.cloudflare.com/client/v4/zones/{zone_id}/http_applications/{http_application_id}" \  
--header "X-Auth-Email: <EMAIL>" \  
--header "X-Auth-Key: <API_KEY>"  
```

Once all these steps are completed, Zone Versioning will go back to its original landing page.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/version-management/","name":"Version Management"}},{"@type":"ListItem","position":3,"item":{"@id":"/version-management/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/version-management/how-to/enable/","name":"Enable"}}]}
```
