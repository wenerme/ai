---
title: Gateway
description: Review recent changes to Cloudflare Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/changelog/gateway.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Gateway

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/gateway.xml) 

## 2026-03-24

  
**OIDC Claims filtering now available in Gateway Firewall, Resolver, and Egress policies**   

Cloudflare Gateway now supports [OIDC Claims](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#oidc-claims) as a selector in Firewall, Resolver, and Egress policies. Administrators can use custom OIDC claims from their identity provider to build fine-grained, identity-based traffic policies across all Gateway policy types.

With this update, you can:

* Filter traffic in [DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/), [HTTP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/), and [Network](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) firewall policies based on OIDC claim values.
* Apply custom [resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) to route DNS queries to specific resolvers depending on a user's OIDC claims.
* Control [egress policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/) to assign dedicated egress IPs based on OIDC claim attributes.

For example, you can create a policy that routes traffic differently for users with `department=engineering` in their OIDC claims, or restrict access to certain destinations based on a user's role claim.

To get started, configure [custom OIDC claims](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) on your identity provider and use the **OIDC Claims** selector in the Gateway policy builder.

For more information, refer to [Identity-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/).

## 2026-02-27

  
**New protocols added for Gateway Protocol Detection (Beta)**   

Gateway [Protocol Detection](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/) now supports seven additional protocols in beta:

| Protocol     | Notes                                              |
| ------------ | -------------------------------------------------- |
| IMAP         | Internet Message Access Protocol — email retrieval |
| POP3         | Post Office Protocol v3 — email retrieval          |
| SMTP         | Simple Mail Transfer Protocol — email sending      |
| MYSQL        | MySQL database wire protocol                       |
| RSYNC-DAEMON | rsync daemon protocol                              |
| LDAP         | Lightweight Directory Access Protocol              |
| NTP          | Network Time Protocol                              |

These protocols join the existing set of detected protocols (HTTP, HTTP2, SSH, TLS, DCERPC, MQTT, and TPKT) and can be used with the _Detected Protocol_ selector in [Network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) to identify and filter traffic based on the application-layer protocol, without relying on port-based identification.

If protocol detection is enabled on your account, these protocols will automatically be logged when detected in your Gateway network traffic.

For more information on using Protocol Detection, refer to the [Protocol detection documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/).

## 2025-12-17

  
**Shadow IT - domain level SaaS analytics**   

Zero Trust has again upgraded its **Shadow IT analytics**, providing you with unprecedented visibility into your organizations use of SaaS tools. With this dashboard, you can review who is using an application and volumes of data transfer to the application.

With this update, you can review data transfer metrics at the domain level, rather than just the application level, providing more granular insight into your data transfer patterns.

![New Domain Level Metrics](https://developers.cloudflare.com/_astro/shadow-it-domain.DoZnGAtf_Z1mHw4r.webp) 

These metrics can be filtered by all available filters on the dashboard, including user, application, or content category.

Both the analytics and policies are accessible in the Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/), empowering organizations with better visibility and control.

## 2025-11-06

  
**Applications to be remapped to the new categories**   

We have previously added new application categories to better reflect their content and improve HTTP traffic management: refer to [Changelog](https://developers.cloudflare.com/cloudflare-one/changelog/gateway/#2025-10-28). While the new categories are live now, we want to ensure you have ample time to review and adjust any existing rules you have configured against old categories. The remapping of existing applications into these new categories will be completed by January 30, 2026\. This timeline allows you a dedicated period to:

* Review the new category structure.
* Identify any policies you have that target the older categories.
* Adjust your rules to reference the new, more precise categories before the old mappings change. Once the applications have been fully remapped by January 30, 2026, you might observe some changes in the traffic being mitigated or allowed by your existing policies. We encourage you to use the intervening time to prepare for a smooth transition.

**Applications being remappedd**

| Application Name                | Existing Category | New Category                 |
| ------------------------------- | ----------------- | ---------------------------- |
| Google Photos                   | File Sharing      | Photography & Graphic Design |
| Flickr                          | File Sharing      | Photography & Graphic Design |
| ADP                             | Human Resources   | Business                     |
| Greenhouse                      | Human Resources   | Business                     |
| myCigna                         | Human Resources   | Health & Fitness             |
| UnitedHealthcare                | Human Resources   | Health & Fitness             |
| ZipRecruiter                    | Human Resources   | Business                     |
| Amazon Business                 | Human Resources   | Business                     |
| Jobcenter                       | Human Resources   | Business                     |
| Jobsuche                        | Human Resources   | Business                     |
| Zenjob                          | Human Resources   | Business                     |
| DocuSign                        | Legal             | Business                     |
| Postident                       | Legal             | Business                     |
| Adobe Creative Cloud            | Productivity      | Photography & Graphic Design |
| Airtable                        | Productivity      | Development                  |
| Autodesk Fusion360              | Productivity      | IT Management                |
| Coursera                        | Productivity      | Education                    |
| Microsoft Power BI              | Productivity      | Business                     |
| Tableau                         | Productivity      | Business                     |
| Duolingo                        | Productivity      | Education                    |
| Adobe Reader                    | Productivity      | Business                     |
| AnpiReport                      | Productivity      | Travel                       |
| ビズリーチ                           | Productivity      | Business                     |
| doda (デューダ)                     | Productivity      | Business                     |
| 求人ボックス                          | Productivity      | Business                     |
| マイナビ2026                        | Productivity      | Business                     |
| Power Apps                      | Productivity      | Business                     |
| RECRUIT AGENT                   | Productivity      | Business                     |
| シフトボード                          | Productivity      | Business                     |
| スタンバイ                           | Productivity      | Business                     |
| Doctolib                        | Productivity      | Health & Fitness             |
| Miro                            | Productivity      | Photography & Graphic Design |
| MyFitnessPal                    | Productivity      | Health & Fitness             |
| Sentry Mobile                   | Productivity      | Travel                       |
| Slido                           | Productivity      | Photography & Graphic Design |
| Arista Networks                 | Productivity      | IT Management                |
| Atlassian                       | Productivity      | Business                     |
| CoderPad                        | Productivity      | Business                     |
| eAgreements                     | Productivity      | Business                     |
| Vmware                          | Productivity      | IT Management                |
| Vmware Vcenter                  | Productivity      | IT Management                |
| AWS Skill Builder               | Productivity      | Education                    |
| Microsoft Office 365 (GCC)      | Productivity      | Business                     |
| Microsoft Exchange Online (GCC) | Productivity      | Business                     |
| Canva                           | Sales & Marketing | Photography & Graphic Design |
| Instacart                       | Shopping          | Food & Drink                 |
| Wawa                            | Shopping          | Food & Drink                 |
| McDonald's                      | Shopping          | Food & Drink                 |
| Vrbo                            | Shopping          | Travel                       |
| American Airlines               | Shopping          | Travel                       |
| Booking.com                     | Shopping          | Travel                       |
| Ticketmaster                    | Shopping          | Entertainment & Events       |
| Airbnb                          | Shopping          | Travel                       |
| DoorDash                        | Shopping          | Food & Drink                 |
| Expedia                         | Shopping          | Travel                       |
| EasyPark                        | Shopping          | Travel                       |
| UEFA Tickets                    | Shopping          | Entertainment & Events       |
| DHL Express                     | Shopping          | Business                     |
| UPS                             | Shopping          | Business                     |

For more information on creating HTTP policies, refer to [Applications and app types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/).

## 2025-10-28

  
**New Application Categories added for HTTP Traffic Management**   

To give you precision and flexibility while creating policies to block unwanted traffic, we are introducing new, more granular application categories in the Gateway product.

We have added the following categories to provide more precise organization and allow for finer-grained policy creation, designed around how users interact with different types of applications:

* Business
* Education
* Entertainment & Events
* Food & Drink
* Health & Fitness
* Lifestyle
* Navigation
* Photography & Graphic Design
* Travel

The new categories are live now, but we are providing a transition period for existing applications to be fully remapped to these new categories.

The full remapping will be completed by January 30, 2026.

We encourage you to use this time to:

* Review the new category structure.
* Identify and adjust any existing HTTP policies that reference older categories to ensure a smooth transition.

For more information on creating HTTP policies, refer to [Applications and app types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/).

## 2025-10-20

  
**Schedule DNS policies from the UI**   

Admins can now create [scheduled DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/timed-policies/) directly from the Zero Trust dashboard, without using the API. You can configure policies to be active during specific, recurring times, such as blocking social media during business hours or gaming sites on school nights.

* **Preset Schedules**: Use built-in templates for common scenarios like Business Hours, School Days, Weekends, and more.
* **Custom Schedules**: Define your own schedule with specific days and up to three non-overlapping time ranges per day.
* **Timezone Control**: Choose to enforce a schedule in a specific timezone (for example, US Eastern) or based on the local time of each user.
* **Combined with Duration**: Policies can have both a schedule and a duration. If both are set, the duration's expiration takes precedence.

You can see the flow in the demo GIF:

![Schedule DNS policies demo](https://developers.cloudflare.com/_astro/gateway-dns-scheduled-policies-ui.Cf4l1OTE_Z9szVM.webp) 

This update makes time-based DNS policies accessible to all Gateway customers, removing the technical barrier of the API.

## 2025-10-10

  
**New domain categories added**   

We have added three new domain categories under the Technology parent category, to better reflect online content and improve DNS filtering.

**New categories added**

| Parent ID | Parent Name | Category ID | Category Name       |
| --------- | ----------- | ----------- | ------------------- |
| 26        | Technology  | 194         | Keep Awake Software |
| 26        | Technology  | 192         | Remote Access       |
| 26        | Technology  | 193         | Shareware/Freeware  |

Refer to [Gateway domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) to learn more.

## 2025-09-30

  
**Application granular controls for operations in SaaS applications**   

Gateway users can now apply granular controls to their file sharing and AI chat applications through [HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies).

The new feature offers two methods of controlling SaaS applications:

* **Application Controls** are curated groupings of Operations which provide an easy way for users to achieve a specific outcome. Application Controls may include _Upload_, _Download_, _Prompt_, _Voice_, and _Share_ depending on the application.
* **Operations** are controls aligned to the most granular action a user can take. This provides a fine-grained approach to enforcing policy and generally aligns to the SaaS providers API specifications in naming and function.

Get started using [Application Granular Controls](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/granular-controls) and refer to the list of [supported applications](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/granular-controls/#compatible-applications).

## 2025-09-25

  
**Refine DLP Scans with New Body Phase Selector**   

You can now more precisely control your HTTP DLP policies by specifying whether to scan the request or response body, helping to reduce false positives and target specific data flows.

In the Gateway HTTP policy builder, you will find a new selector called _Body Phase_. This allows you to define the direction of traffic the DLP engine will inspect:

* _Request Body_: Scans data sent from a user's machine to an upstream service. This is ideal for monitoring data uploads, form submissions, or other user-initiated data exfiltration attempts.
* _Response Body_: Scans data sent to a user's machine from an upstream service. Use this to inspect file downloads and website content for sensitive data.

For example, consider a policy that blocks Social Security Numbers (SSNs). Previously, this policy might trigger when a user visits a website that contains example SSNs in its content (the response body). Now, by setting the **Body Phase** to _Request Body_, the policy will only trigger if the user attempts to upload or submit an SSN, ignoring the content of the web page itself.

All policies without this selector will continue to scan both request and response bodies to ensure continued protection.

For more information, refer to [Gateway HTTP policy selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#body-phase).

## 2025-09-11

  
**DNS filtering for private network onramps**   

[Magic WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/#dns-filtering) and [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/warp-connector/site-to-internet/#configure-dns-resolver-on-devices) users can now securely route their DNS traffic to the Gateway resolver without exposing traffic to the public Internet.

Routing DNS traffic to the Gateway resolver allows DNS resolution and filtering for traffic coming from private networks while preserving source internal IP visibility. This ensures Magic WAN users have full integration with our Cloudflare One features, including [Internal DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#internal-dns) and [hostname-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#selector-prerequisites).

To configure DNS filtering, change your Magic WAN or WARP Connector DNS settings to use Cloudflare's shared resolver IPs, `172.64.36.1` and `172.64.36.2`. Once you configure DNS resolution and filtering, you can use _Source Internal IP_ as a traffic selector in your [resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) for routing private DNS traffic to your [Internal DNS](https://developers.cloudflare.com/dns/internal-dns/).

## 2025-08-27

  
**Shadow IT - SaaS analytics dashboard**   

Zero Trust has significantly upgraded its **Shadow IT analytics**, providing you with unprecedented visibility into your organizations use of SaaS tools. With this dashboard, you can review who is using an application and volumes of data transfer to the application.

You can review these metrics against application type, such as Artificial Intelligence or Social Media. You can also mark applications with an approval status, including **Unreviewed**, **In Review**, **Approved**, and **Unapproved** designating how they can be used in your organization.

![Cloudflare One Analytics Dashboards](https://developers.cloudflare.com/_astro/shadow-it-analytics.BLNnG72w_Z1vDznE.webp) 

These application statuses can also be used in Gateway HTTP policies, so you can block, isolate, limit uploads and downloads, and more based on the application status.

Both the analytics and policies are accessible in the Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/), empowering organizations with better visibility and control.

## 2025-08-21

  
**Gateway BYOIP Dedicated Egress IPs now available.**   

Enterprise Gateway users can now use Bring Your Own IP (BYOIP) for dedicated egress IPs.

Admins can now onboard and use their own IPv4 or IPv6 prefixes to egress traffic from Cloudflare, delivering greater control, flexibility, and compliance for network traffic.

Get started by following the [BYOIP onboarding process](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/#bring-your-own-ip-address-byoip). Once your IPs are onboarded, go to **Gateway** \> **Egress policies** and select or create an egress policy. In **Select an egress IP**, choose _Use dedicated egress IPs (Cloudflare or BYOIP)_, then select your BYOIP address from the dropdown menu.

![Screenshot of a dropdown menu adding a BYOIP IPv4 address as a dedicated egress IP in a Gateway egress policy](https://developers.cloudflare.com/_astro/Gateway-byoip-dedicated-egress-ips.D0pzLAbV_8yK6N.webp) 

For more information, refer to [BYOIP for dedicated egress IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/#bring-your-own-ip-address-byoip).

## 2025-07-28

  
**Scam domain category introduced under Security Threats**   

We have introduced a new Security Threat category called **Scam**. Relevant domains are marked with the Scam category. Scam typically refers to fraudulent websites and schemes designed to trick victims into giving away money or personal information.

**New category added**

| Parent ID | Parent Name      | Category ID | Category Name |
| --------- | ---------------- | ----------- | ------------- |
| 21        | Security Threats | 191         | Scam          |

Refer to [Gateway domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) to learn more.

## 2025-07-24

  
**Gateway HTTP Filtering on all ports available in open BETA**   

[Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) can now apply [HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) to all proxied HTTP requests, not just traffic on standard HTTP (`80`) and HTTPS (`443`) ports. This means all requests can now be filtered by [A/V scanning](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/), [file sandboxing](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/file-sandboxing/), [Data Loss Prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/#data-in-transit), and more.

You can turn this [setting](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/#inspect-on-all-ports) on by going to **Settings** \> **Network** \> **Firewall** and choosing _Inspect on all ports_.

![HTTP Inspection on all ports setting](https://developers.cloudflare.com/_astro/Gateway-Inspection-all-ports.CCmwX6D0_OoDoS.webp) 

To learn more, refer to [Inspect on all ports (Beta)](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/#inspect-on-all-ports).

## 2025-07-22

  
**Google Bard Application replaced by Gemini**   

The **Google Bard** application (ID: 1198) has been deprecated and fully removed from the system. It has been replaced by the **Gemini** application (ID: 1340). Any existing Gateway policies that reference the old Google Bard application will no longer function. To ensure your policies continue to work as intended, you should update them to use the new Gemini application. We recommend replacing all instances of the deprecated Bard application with the new Gemini application in your Gateway policies. For more information about application policies, please see the [Cloudflare Gateway documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/).

## 2025-06-18

  
**Gateway will now evaluate Network policies before HTTP policies from July 14th, 2025**   

[Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) will now evaluate [Network (Layer 4) policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) **before** [HTTP (Layer 7) policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/). This change preserves your existing security posture and does not affect which traffic is filtered — but it may impact how notifications are displayed to end users.

This change will roll out progressively between **July 14–18, 2025**. If you use HTTP policies, we recommend reviewing your configuration ahead of rollout to ensure the user experience remains consistent.

#### Updated order of enforcement

**Previous order:**

1. DNS policies
2. HTTP policies
3. Network policies

**New order:**

1. DNS policies
2. **Network policies**
3. **HTTP policies**

#### Action required: Review your Gateway HTTP policies

This change may affect block notifications. For example:

* You have an **HTTP policy** to block `example.com` and display a block page.
* You also have a **Network policy** to block `example.com` silently (no client notification).

With the new order, the Network policy will trigger first — and the user will no longer see the HTTP block page.

To ensure users still receive a block notification, you can:

* Add a client notification to your Network policy, or
* Use only the HTTP policy for that domain.

---

#### Why we’re making this change

This update is based on user feedback and aims to:

* Create a more intuitive model by evaluating network-level policies before application-level policies.
* Minimize [526 connection errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-526/#error-526-in-the-zero-trust-context) by verifying the network path to an origin before attempting to establish a decrypted TLS connection.

---

To learn more, visit the [Gateway order of enforcement documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/).

## 2025-05-29

  
**New Gateway Analytics in the Cloudflare One Dashboard**   

Users can now access significant enhancements to Cloudflare Gateway analytics, providing you with unprecedented visibility into your organization's DNS queries, HTTP requests, and Network sessions. These powerful new dashboards enable you to go beyond raw logs and gain actionable insights into how your users are interacting with the Internet and your protected resources.

You can now visualize and explore:

* Patterns Over Time: Understand trends in traffic volume and blocked requests, helping you identify anomalies and plan for future capacity.
* Top Users & Destinations: Quickly pinpoint the most active users, enabling better policy enforcement and resource allocation.
* Actions Taken: See a clear breakdown of security actions applied by Gateway policies, such as blocks and allows, offering a comprehensive view of your security posture.
* Geographic Regions: Gain insight into the global distribution of your traffic.
![Gateway Analytics](https://developers.cloudflare.com/_astro/gateway-analytics.BdSwbIBb_1WTkQL.webp) 

To access the new overview, log in to your Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/) and go to Analytics in the side navigation bar.

## 2025-05-27

  
**Gateway Protocol Detection Now Available for PAYGO and Free Plans**   

All Cloudflare One Gateway users can now use Protocol detection logging and filtering, including those on Pay-as-you-go and Free plans.

With Protocol Detection, admins can identify and enforce policies on traffic proxied through Gateway based on the underlying network protocol (for example, HTTP, TLS, or SSH), enabling more granular traffic control and security visibility no matter your plan tier.

This feature is available to enable in your account network settings for all accounts. For more information on using Protocol Detection, refer to the [Protocol detection documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/).

## 2025-05-14

  
**Domain Categories improvements**   

**New categories added**

| Parent ID | Parent Name           | Category ID | Category Name                 |
| --------- | --------------------- | ----------- | ----------------------------- |
| 1         | Ads                   | 66          | Advertisements                |
| 3         | Business & Economy    | 185         | Personal Finance              |
| 3         | Business & Economy    | 186         | Brokerage & Investing         |
| 21        | Security Threats      | 187         | Compromised Domain            |
| 21        | Security Threats      | 188         | Potentially Unwanted Software |
| 6         | Education             | 189         | Reference                     |
| 9         | Government & Politics | 190         | Charity and Non-profit        |

**Changes to existing categories**

| Original Name | New Name                |
| ------------- | ----------------------- |
| Religion      | Religion & Spirituality |
| Government    | Government/Legal        |
| Redirect      | URL Alias/Redirect      |

Refer to [Gateway domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) to learn more.

## 2025-05-13

  
**New Applications Added for DNS Filtering**   

You can now create DNS policies to manage outbound traffic for an expanded list of applications. This update adds support for 273 new applications, giving you more control over your organization's outbound traffic.

With this update, you can:

* Create DNS policies for a wider range of applications
* Manage outbound traffic more effectively
* Improve your organization's security and compliance posture

For more information on creating DNS policies, see our [DNS policy documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/).

## 2025-04-28

  
**FQDN Filtering For Gateway Egress Policies**   

Cloudflare One administrators can now control which egress IP is used based on a destination's fully qualified domain name (FDQN) within Gateway Egress policies.

* Host, Domain, Content Categories, and Application selectors are now available in the Gateway Egress policy builder in beta.
* During the beta period, you can use these selectors with traffic on-ramped to Gateway with the WARP client, proxy endpoints (commonly deployed with PAC files), or Cloudflare Browser Isolation.  
   * For WARP client support, additional configuration is required. For more information, refer to the [WARP client configuration documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#limitations).
![Egress by FQDN and Hostname](https://developers.cloudflare.com/_astro/Gateway-Egress-FQDN-Policy-preview.Civon5p8_Z2hcuQE.webp) 

This will help apply egress IPs to your users' traffic when an upstream application or network requires it, while the rest of their traffic can take the most performant egress path.

## 2025-04-11

  
**HTTP redirect and custom block page redirect**   

You can now use more flexible redirect capabilities in Cloudflare One with Gateway.

* A new **Redirect** action is available in the HTTP policy builder, allowing admins to redirect users to any URL when their request matches a policy. You can choose to preserve the original URL and query string, and optionally include policy context via query parameters.
* For **Block** actions, admins can now configure a custom URL to display when access is denied. This block page redirect is set at the account level and can be overridden in DNS or HTTP policies. Policy context can also be passed along in the URL.

Learn more in our documentation for [HTTP Redirect](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#redirect) and [Block page redirect](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#redirect-to-a-block-page).

## 2025-03-21

  
**Secure DNS Locations Management User Role**   

We're excited to introduce the [**Cloudflare Zero Trust Secure DNS Locations Write role**](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/#secure-dns-locations), designed to provide DNS filtering customers with granular control over third-party access when configuring their Protective DNS (PDNS) solutions.

Many DNS filtering customers rely on external service partners to manage their DNS location endpoints. This role allows you to grant access to external parties to administer DNS locations without overprovisioning their permissions.

**Secure DNS Location Requirements:**

* Mandate usage of [Bring your own DNS resolver IP addresses ↗](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#bring-your-own-dns-resolver-ip) if available on the account.
* Require source network filtering for IPv4/IPv6/DoT endpoints; token authentication or source network filtering for the DoH endpoint.

You can assign the new role via Cloudflare Dashboard (`Manage Accounts > Members`) or via API. For more information, refer to the [Secure DNS Locations documentation ↗](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/#secure-dns-locations).

## 2025-02-03

  
**Block files that are password-protected, compressed, or otherwise unscannable.**   

Gateway HTTP policies can now block files that are password-protected, compressed, or otherwise unscannable.

These unscannable files are now matched with the [Download and Upload File Types traffic selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#download-and-upload-file-types) for HTTP policies:

* Password-protected Microsoft Office document
* Password-protected PDF
* Password-protected ZIP archive
* Unscannable ZIP archive

To get started inspecting and modifying behavior based on these and other rules, refer to [HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/).

## 2025-02-12

**Upload/Download File Size selectors for HTTP policies**

Gateway and DLP users can now create HTTP policies with the [Download and Upload File Size (MiB)](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#download-and-upload-file-size) traffic selectors. This update allows users to block uploads or downloads based on file size.

## 2025-02-02

**The default global Cloudflare root certificate expired on 2025-02-02 at 16:05 UTC**

If you installed the default Cloudflare certificate before 2024-10-17, you must generate a new certificate and activate it for your Zero Trust organization to avoid inspection errors. Refer to [Troubleshooting](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/#browser-and-certificate-issues) for instructions and troubleshooting steps.

## 2025-01-08

**Bring your own resolver IP (BYOIP) for DNS locations**

Enterprise users can now [provide an IP address](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#bring-your-own-dns-resolver-ip) for a private DNS resolver to use with [DNS locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/). Gateway supports bringing your own IPv4 and IPv6 addresses.

## 2024-11-20

**Category filtering in the network policy builder**

Gateway users can now create network policies with the [Content Categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#content-categories) and [Security Risks](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#security-risks) traffic selectors. This update simplifies malicious traffic blocking and streamlines network monitoring for improved security management.

## 2024-10-17

**Per-account Cloudflare root certificate**

Gateway users can now generate [unique root CAs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) for their Zero Trust account. Both generated certificate and custom certificate users must [activate a root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/#activate-a-root-certificate) to use it for inspection. Per-account certificates replace the default Cloudflare certificate, which is set to expire on 2025-02-02.

## 2024-10-10

**Time-based policy duration**

Gateway now offers [time-based DNS policy duration](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/timed-policies/#time-based-policy-duration). With policy duration, you can configure a duration of time for a policy to turn on or set an exact date and time to turn a policy off.

## 2024-10-04

**Expanded Gateway log fields**

Gateway now offers new fields in [activity logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/gateway-logs/) for DNS, network, and HTTP policies to provide greater insight into your users' traffic routed through Gateway.

## 2024-09-30

**File sandboxing**

Gateway users on Enterprise plans can create HTTP policies with [file sandboxing](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/file-sandboxing/) to quarantine previously unseen files downloaded by your users and scan them for malware.

## 2024-07-30

**UK NCSC indicator feed publicly available in Gateway**

Gateway users on any plan can now use the [PDNS threat intelligence feed](https://developers.cloudflare.com/security-center/indicator-feeds/#publicly-available-feeds) provided by the UK National Cyber Security Centre (NCSC) in DNS policies.

## 2024-07-14

**Gateway DNS filter non-authenticated queries**

Gateway users can now select which endpoints to use for a given DNS location. Available endpoints include IPv4, IPv6, DNS over HTTPS (DoH), and DNS over TLS (DoT). Users can protect each configured endpoint by specifying allowed source networks. Additionally, for the DoH endpoint, users can filter traffic based on source networks and/or authenticate user identity tokens.

## 2024-06-25

**Gateway DNS policy setting to ignore CNAME category matches**

Gateway now offers the ability to selectively ignore CNAME domain categories in DNS policies via the [**Ignore CNAME domain categories** setting](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#ignore-cname-domain-categories) in the policy builder and the [ignore\_cname\_category\_matches setting](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/create/) in the API.

## 2024-04-05

**Gateway file type control improvements**

Gateway now offers a more extensive, categorized [list of files](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#download-and-upload-file-types) to control uploads and downloads.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/changelog/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/changelog/gateway/","name":"Gateway"}}]}
```
