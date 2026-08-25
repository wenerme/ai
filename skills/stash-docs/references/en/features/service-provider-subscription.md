---
description: "Stash supports configurations managed by a service provider, updating them on a schedule and showing remaining traffic and expiry information."
---

# Service Provider Subscription

Stash supports configurations managed by service providers, which can be updated periodically and display information about remaining service traffic and expiration.

## Scheduled Configuration Updates

Add the following comment at the **top line** of the configuration file. Stash will recognize it as a configuration managed by a service provider, and it will periodically fetch the new version from the specified URL. Currently, the interval for checking updates is 12 hours, but users can change this setting on the configuration page.

```yaml
#SUBSCRIBED https://proxy.service/stash/config
```

## Displaying Service Information

Service providers can provide service information through HTTP response headers, including: upload traffic, download traffic, total traffic, and expiration time. The format is as follows:

```
Subscription-Userinfo: upload=%f; download=%f; total=%f; expire=%f
```

Stash will parse the service information and display it on the app's homepage.

Stash will first use the service information from the scheduled configuration update URL. If there is no scheduled update URL, it will use the `url` in the `proxy-providers` field of the configuration file, which can be set on the visual editing page.

> [!NOTE]
> Stash will prioritize using the HEAD method to retrieve service information to
> reduce traffic consumption.
