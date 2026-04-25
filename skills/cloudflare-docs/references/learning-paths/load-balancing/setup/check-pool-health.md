---
title: Check pool health
description: Verify pool and server health status.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Check pool health

Before directing any traffic to your pools, make sure that your pools and monitors are set up correctly. The status of your health check will be _unknown_ until the results of the first check are available.

* [ Dashboard ](#tab-panel-7607)
* [ API ](#tab-panel-7608)

To confirm pool health using the dashboard:

1. Go to **Load Balancing**.
2. Select the **Pools** tab.
3. For pools and individual endpoints, review the values in the **Health** and **Endpoint Health** columns.

For more information on pool and endpoint health statuses, refer to [How a pool becomes unhealthy](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/#how-a-pool-becomes-unhealthy).

To fetch the latest health status of all pools, use the [List Pools](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/list/) command, paying attention to the `healthy` value for pools and origins (endpoints).

For troubleshooting a specific pool's health, use the [Pool Health Details](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/subresources/health/methods/get/) command.

## Unexpected health status

If you notice that healthy pools are being marked unhealthy:

* Review [how endpoints and pools become unhealthy](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/).
* Refer to the [Troubleshooting section](https://developers.cloudflare.com/load-balancing/troubleshooting/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/setup/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/load-balancing/setup/check-pool-health/","name":"Check pool health"}}]}
```
