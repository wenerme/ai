---
title: Test a waiting room
description: Follow this tutorial to test your waiting room behavior in response to load. To accurately simulate traffic, run your test script or planner for a period of time longer than a minute, ideally more than 2-3 minutes.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waiting-room/additional-options/test-waiting-room.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Test a waiting room

Follow this tutorial to test your waiting room behavior in response to load. To accurately simulate traffic through your waiting room with a load test, run your test script or planner for a period of time longer than a minute, ideally more than 2-3 minutes. You can run a load test using a variety of tools including [loader.io ↗](http://loader.io), [jmeter ↗](http://jmeter.apache.org), and [postman.com ↗](http://postman.com). You can also write a plain shell script to simulate user requests (each representing a distinct user).

Warning

This tutorial uses an open-sourced load testing tool that is not created or supported by Cloudflare.

---

## Before you begin

Before you start this tutorial, ensure you have:

* Reviewed the [About](https://developers.cloudflare.com/waiting-room/about/) Waiting Room page.
* For this tutorial, we will use an open source tool from Apache, [JMeter ↗](https://jmeter.apache.org/). You can download the binary from [JMeter's website ↗](https://jmeter.apache.org/download%5Fjmeter.cgi).

---

## 1\. Download sample script

First, download the [sample ↗](https://github.com/yj7o5/cf-waiting-room-testing/blob/main/plan.jmx) JMeter plan (configuration file) from GitHub.

This sample plan simulates 200 active users visiting the site, slowly ramping up traffic within the first minute and then maintaining 200 active users for the next three minutes. The test plan for this tutorial follows the setup outlined in the next steps.

## 2\. Edit and run the sample plan

Before running the sample plan, edit the waiting room in the test plan to point to your own waiting room.

1. Select **Waiting Room Simulation** to expand the test plan and then select **Request origin with waiting room** to update the test configuration.
![Select Request origin with waiting room in the Waiting Room Simulation panel](https://developers.cloudflare.com/_astro/simulation-panel.BOynNfQl_20776m.webp) 
1. In the **HTTP Request** section update the **Protocol**, **Server Name or IP**, and **Path** fields to point to your test URL with waiting room enabled. For example, if your full URL looks like `https://www.example.com/deals/summer`, then the fields should match as the following:

| Field             | Value                                       |
| ----------------- | ------------------------------------------- |
| Protocol          | https                                       |
| Server Name or IP | [www.example.com ↗](http://www.example.com) |
| Path              | deals/summer                                |

![Update the HTTP Request section](https://developers.cloudflare.com/_astro/http-request-section.DlSKTrFb_Z4WyLu.webp) 

Then, select the **play** button to get the test started. This should take roughly around 3-4 minutes.

![Select the play button](https://developers.cloudflare.com/_astro/navigation.CqQsxXoC_Z1zxoei.webp) 
* Each simulated user has the following attributes:  
   * Contains a Cookie jar for cookies persistence.  
   * Repeats for 20 times.  
         * Makes a request to the origin site with waiting room enabled.  
         * Logs request details.  
         * Pauses for 10 seconds before refreshing the page to make another request to the origin site.
![User attributes](https://developers.cloudflare.com/_astro/user-attributes.CMfB7b6L_6qoKz.webp) 

Per the plan above, each [Thread Group ↗](https://jmeter.apache.org/usermanual/test%5Fplan.html#thread%5Fgroup) performs the above action once. The user traffic ramps up within the first minute and keeps a sustained traffic for the next three minutes before users leave the site. You can send more or less traffic than what is being sent in this example by updating these properties.

![Visualizing number of threads](https://developers.cloudflare.com/_astro/threads.BTLucBgH_fTIip.webp) 

## 3\. Analyze results

To analyze the results of your test, you can query Waiting Room Analytics (Beta) via Cloudflare’s GraphQL API to check Total Active Users and Queued Users for each minute of your load test.

Example Curl Statement

Terminal window

```

echo '{

  "operationName": "UsersQueuedOverTimeQuery",

  "variables": {

    "filter": {

      "datetime_geq": "2022-10-17T15:34:00Z",

      "datetime_leq": "2022-10-17T15:40:00Z",

      "waitingRoomId": "<YOUR_WAITING_ROOM_ID>"

    },

    "zoneId": "<YOUR_ZONE_ID>"

  },

  "query": "query UsersQueuedOverTimeQuery($zoneId: string, $filter: ZoneWaitingRoomAnalyticsAdaptiveGroupsFilter_InputObject) {\n  viewer {\n    zones(filter: {zoneTag: $zoneId}) {\n      timeseries: waitingRoomAnalyticsAdaptiveGroups(limit: 5000, filter: $filter, orderBy: [datetimeMinute_ASC]) {\n        avg {\n          totalActiveUsers\n          totalActiveUsersConfig\n          totalQueuedUsers\n          __typename\n        }\n        max {\n          totalQueuedUsers\n          totalActiveUsers\n          totalActiveUsersConfig\n          __typename\n        }\n        min {\n          totalActiveUsersConfig\n          __typename\n        }\n        dimensions {\n          ts: datetimeMinute\n          __typename\n        }\n        __typename\n      }\n      total: waitingRoomAnalyticsAdaptiveGroups(limit: 1, filter: $filter) {\n        max {\n          totalQueuedUsers\n          totalActiveUsers\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"

}' | tr -d '\n' | curl \

  -X POST


```

Explain Code

From our test, we got the following results (these are extracted from results of the query for readability):

* 15:35:00 UTC  
   * `"totalActiveUsers": 137,`  
   * `"totalActiveUsersConfig": 300,`  
   * `"totalQueuedUsers": 0`
* 15:36:00 UTC  
   * `"totalActiveUsers": 200,`  
   * `"totalActiveUsersConfig": 300,`  
   * `"totalQueuedUsers": 0`
* 15:37:00 UTC  
   * `"totalActiveUsers": 200,`  
   * `"totalActiveUsersConfig": 300,`  
   * `"totalQueuedUsers": 0`
* 15:38:00 UTC  
   * `"totalActiveUsers": 200,`  
   * `"totalActiveUsersConfig": 300,`  
   * `"totalQueuedUsers": 0`

The first minute mark, 15:35:00 UTC, shows 137 active users past the waiting room. This is because our traffic was set to gradually ramp up within the first minute and the test did not start exactly at the minute mark. When data was aggregated for the following minute, 15:36:00 UTC, the waiting room reported the total 200 users active we expected on the site as each “user” made subrequests. The active user count remained stable at 200 as long as it received subrequests from the traffic sent by the load test.

Note

Obtain your API token from the dashboard. Make sure your API token grants access to the **Analytics** resource. For more information on how to get the API token, follow the [Configure Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/) guide.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waiting-room/","name":"Waiting Room"}},{"@type":"ListItem","position":3,"item":{"@id":"/waiting-room/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":4,"item":{"@id":"/waiting-room/additional-options/test-waiting-room/","name":"Test a waiting room"}}]}
```
