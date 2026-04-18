---
title: Traceroute test
description: Reference information for Traceroute test in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Windows ](https://developers.cloudflare.com/search/?tags=Windows)[ MacOS ](https://developers.cloudflare.com/search/?tags=MacOS)[ Android ](https://developers.cloudflare.com/search/?tags=Android) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/insights/dex/tests/traceroute.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Traceroute test

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Traffic and DNS mode  Traffic only mode                                                                                            | All plans                                                       |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2023.5.587             |
| macOS    | ✅            | 2023.5.589             |
| Linux    | ❌            |                        |
| iOS      | ❌            |                        |
| Android  | ✅            | 1.0                    |
| ChromeOS | ✅            | 1.0                    |

A traceroute test measures the network path of an IP packet from an end-user device to a server. You can use the test results to troubleshoot network issues. For example, increased latency may indicate a problem with connectivity along the network path.

## Create a test

To set up a traceroute test for an application:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Insights** \> **Digital experience**.
2. Select the **Tests** tab.
3. Select **Add a Test**.
4. Fill in the following fields:  
   * **Name**: Enter any name for the test.  
   * **Target**: Enter the IP address of the server you want to test (for example, `192.0.2.0`). You can test either a public-facing endpoint or a private endpoint you have connected to Cloudflare.  
   * **Source device profiles**: (Optional) Select the [device profiles](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) that you want to run the test on. If no profiles are selected, the test will run on all supported devices connected to your Zero Trust organization.  
   * **Test type**: Select _Traceroute_.  
   * **Test frequency**: Specify how often the test will run. Input a minute value between 5 and 60.
5. Select **Add test**.

Next, [view the results](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/) of your test.

## Test results

A traceroute test measures the following data:

| Data            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Network path    | IP address, average response time, and packet loss for each hop between the device and the target.                                                                                                                                                                                                                                                                                                                                               |
| Round trip time | Time between sending out a packet and receiving a response from the target.                                                                                                                                                                                                                                                                                                                                                                      |
| Number of hops  | Number of routers encountered between the device and the target.                                                                                                                                                                                                                                                                                                                                                                                 |
| Packet loss     | Percentage of IP packets that failed to receive a response.                                                                                                                                                                                                                                                                                                                                                                                      |
| Availability    | Percentage of tests where at least one packet reached the destination.                                                                                                                                                                                                                                                                                                                                                                           |
| Last seen ISP   | The Internet Service Provider that is managing the connection from the device to Cloudflare. (Only available on macOS and Windows.)  DEX looks up the IP address of the ISP in a geolocation database and returns the corresponding [ASO and ASN ↗](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/). If the ASO and ASN are Unknown, it means this information is unavailable in the geolocation data provider. |

## Export DEX application test logs

The log data for all [DEX application tests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fapplication%5Ftests/) (including HTTP tests) can be exported to [R2](https://developers.cloudflare.com/r2/), a cloud bucket, or a SIEM via [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

## Related resources

* [DEX rules](https://developers.cloudflare.com/cloudflare-one/insights/dex/rules/) \- Specify the target group of a test.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/tests/","name":"Synthetic tests"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/dex/tests/traceroute/","name":"Traceroute test"}}]}
```
