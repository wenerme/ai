---
title: Migrate to Email security
description: This page aims at showing you how to perform Area 1 actions in Zero Trust Email security, and new terminology introduced in Email security.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/migrate-to-email-security.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Migrate to Email security

This page aims at showing you how to perform Area 1 actions in [Zero Trust Email security](https://developers.cloudflare.com/cloudflare-one/email-security/), and new terminology introduced in Email security.

Note

Your Area 1 data and configuration settings are available in Email security.

Access to Area 1

Beginning October 1, 2025, access and support for Email Security (formerly Area 1) will only be available through the Cloudflare dashboard. Your Email Security protection will not change, but you will no longer be able to access the Area 1 dashboard or send support requests to `@area1security.com` email addresses. For help accessing the Cloudflare dashboard, reach out to [successteam@cloudflare.com](mailto:successteam@cloudflare.com).

## Contact support

In Area 1, you can reach out to support via the following email addresses:

* [support@area1security.com](mailto:support@area1security.com)
* [phishguard@area1security.com](mailto:phishguard@area1security.com) (for PhishGuard customers only)

In Email security, you can raise a ticket by contacting [technical support ↗](https://dash.cloudflare.com/?to=/:account/support) on the Cloudflare dashboard:

1. Select your account and choose **Technical support**.
2. In **Solve your issue**, answer the following questions:  
   * What type of question do you have? Select **Technical - Other Products**  
   * In what area can we help you? Select **Email security**  
   * What feature, service or problem is this related to? Choose among **Configuration**, **Detections** or **PhishGuard**.

## Invite users

In Area 1, you [invite users](https://developers.cloudflare.com/email-security/account-setup/manage-account-members/#add-user) by logging in to the Area 1 portal and inviting members.

To invite users in Zero Trust Email security:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Go to **Manage Account**.
3. Select **Members** \> **Invite** \> [Add account members](https://developers.cloudflare.com/fundamentals/manage-members/manage/#add-account-members).

Once you have added new account members, you will have to assign each member an [Email security role](https://developers.cloudflare.com/cloudflare-one/roles-permissions/#email-security-roles).

| Area 1              | Email security                                                            | Description                                                                                                                                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N/A                 | Cloudflare Zero Trust                                                     | Can edit Cloudflare [Zero Trust](https://developers.cloudflare.com/cloudflare-one/). Has administrator access to all Zero Trust products including Access, Gateway, the Cloudflare One Client, Tunnel, Browser Isolation, CASB, DLP, DEX, and Email security. |
| Super Admin         | Email security Analyst + Email security Configuration Admin = Super Admin | Has full access to all admin features in Email security                                                                                                                                                                                                       |
| Configuration Admin | Email security Configuration Admin                                        | Has administrator access. Cannot take actions on emails, or read emails                                                                                                                                                                                       |
| SOC Analyst         | Email security Analyst                                                    | Has analyst access. Can take action on emails and read emails.                                                                                                                                                                                                |
| Viewer              | Email security Reporting                                                  | Can read metrics                                                                                                                                                                                                                                              |
| N/A                 | Cloudflare Zero Trust PII                                                 | Can read PII in Zero Trust (this includes Email security)                                                                                                                                                                                                     |
| N/A                 | Email security Policy Admin                                               | Can read all settings, but only write allow policies, trusted domains, and blocked senders                                                                                                                                                                    |

## Create webhooks

Note

Starting from October 1, 2025, Area 1 webhooks will be visible in Zero Trust Email security, but non-configurable. Use [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/enable-logs/#enable-user-action-logs) to create new webhooks or configure webhooks.

In Area 1, you can [create alert webhooks](https://developers.cloudflare.com/email-security/email-configuration/domains-and-routing/alert-webhooks/#create-an-alert-webhook).

In Zero Trust Email security, webhooks are instead referred to as logs. You can enable [detection logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/enable-logs/#enable-detection-logs) and/or [user action logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/enable-logs/#enable-user-action-logs). Additionally, you can enable [Outbound Data Loss Prevention](https://developers.cloudflare.com/cloudflare-one/email-security/outbound-dlp/) to protect sensitive information in outbound emails.

## Set up system alerts

You can check the Area 1 and Email security status in the [Cloudflare System Status ↗](https://www.cloudflarestatus.com/).

To view Area 1 status:

* Search for **Email security (Area1)** and check that the status is set to **Operational**. This means that emails are being processed.
* Search for **Area 1 - Dash** to check the status of the Area 1 dashboard.
* Search for **Area 1 - API** to check the status of the API endpoints.

To view Email security status:

* Search for **Email security (Zero Trust)** and check that the status is set to **Operational**. This means that emails are being processed.
* Search for **Zero Trust Dashboard** to check the status of the Zero Trust dashboard.
* Search for **API** to check the status of the API endpoints.

You can also check the status of APIs through the [Cloudflare Status API ↗](https://www.cloudflarestatus.com/api) and configure [Cloudflare Notifications](https://developers.cloudflare.com/notifications/get-started/#configure-notifications).

## Email reports

Note

Starting from October 1, 2025, weekly and daily email reports will no longer be available. Go to [Monitoring](https://developers.cloudflare.com/cloudflare-one/email-security/monitoring/) in Email security to monitor your inbox.

In Area 1, you receive daily or weekly updates of the number of emails dispositioned.

In Email security, you can view [email monitoring](https://developers.cloudflare.com/cloudflare-one/email-security/monitoring/) over the last 90, 30, 7, 3, 1 day(s).

## Email alerts for detections

Note

Starting from October 1, 2025, emails alerts for detections will no longer be available. As an alternative, use [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/enable-logs/#enable-detection-logs).

In Area 1, you receive an email when an email is assigned a disposition.

In Email security, you enable [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/enable-logs/#enable-detection-logs) to enable detection logs.

## Search emails

In Area 1, you can perform two types of search: [Fielded Search](https://developers.cloudflare.com/email-security/reporting/search/#fielded-search) and [Freeform Search](https://developers.cloudflare.com/email-security/reporting/search/#freeform-search).

In Email security, the ability to search emails has been expanded. You can use three different [screen criteria](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#screen-criteria) to search emails:

* [Advanced screen](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#advanced-screen)
* [Regular screen](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#regular-screen)
* [Popular screen](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#popular-screen)

## Check metrics

In Area 1, you can check [statistics](https://developers.cloudflare.com/email-security/reporting/statistics-overview/) in your Home section.

In Email security, you can check your metrics in the [Monitoring](https://developers.cloudflare.com/cloudflare-one/email-security/monitoring/) section in the dashboard.

## Move messages to a specific folder

Area 1 allows you to set up [message retraction](https://developers.cloudflare.com/email-security/email-configuration/retract-settings/) to move messages to specific folders. This is known as **retraction**.

Moving messages to a specific folder is known as [auto-moves](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/) in Zero Trust Email security.

## Create policies

This table displays the difference in terminology used when creating policies:

| Area 1                                                                                                                         | Email security                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [Allowed patterns](https://developers.cloudflare.com/email-security/email-configuration/lists/allowed-patterns/)               | [Allow policies](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/allow-policies/)               |
| [Block lists](https://developers.cloudflare.com/email-security/email-configuration/lists/block-list/)                          | [Blocked senders](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/blocked-senders/)             |
| [Trusted domains](https://developers.cloudflare.com/email-security/email-configuration/lists/trusted-domains/)                 | [Trusted domains](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/trusted-domains/)             |
| [Text add-ons](https://developers.cloudflare.com/email-security/email-configuration/email-policies/text-addons/)               | [Text add-ons](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/configure-text-add-ons/)         |
| [Link actions](https://developers.cloudflare.com/email-security/email-configuration/email-policies/link-actions/)              | [Link actions](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/configure-link-actions/)         |
| [Added detections](https://developers.cloudflare.com/email-security/email-configuration/enhanced-detections/added-detections/) | [Additional detections](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/additional-detections/) |

## Submissions

This table displays the difference in terminology used when finding emails whose disposition is incorrect:

| Area 1                                                                                                                                                                                                                                                     | Email security                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Report [false negative](https://developers.cloudflare.com/email-security/email-configuration/phish-submissions/#false-negatives)/[false positive](https://developers.cloudflare.com/email-security/email-configuration/phish-submissions/#false-positives) | [Submit messages for review](https://developers.cloudflare.com/cloudflare-one/email-security/submissions/#submit-messages-for-review) |
| N/A                                                                                                                                                                                                                                                        | Escalate user submissions                                                                                                             |
| [Team submission](https://developers.cloudflare.com/email-security/email-configuration/phish-submissions/#how-to-submit-phish)                                                                                                                             | [Team submissions](https://developers.cloudflare.com/cloudflare-one/email-security/submissions/team-submissions/)                     |
| [User submission](https://developers.cloudflare.com/email-security/email-configuration/phish-submissions/#how-to-submit-phish)                                                                                                                             | [User submissions](https://developers.cloudflare.com/cloudflare-one/email-security/submissions/user-submissions/)                     |

## Business Email Compromise

In Area 1, you can set up a [Business email compromise (BEC)](https://developers.cloudflare.com/email-security/email-configuration/enhanced-detections/business-email-compromise/) list to protect against attackers who try to impersonate executives.

In Email security, this feature is known as [impersonation registry](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/impersonation-registry/).

## Synchronize directories

In Area 1, you can [integrate directories](https://developers.cloudflare.com/email-security/email-configuration/enhanced-detections/business-email-compromise/#integrating-a-directory) in your email provider.

In Email security, you can add and sync [directories](https://developers.cloudflare.com/cloudflare-one/email-security/directories/).

## API

Note

Area 1 API endpoints will deprecate on December 18, 2025\. Use the [Email security API ↗](https://developers.cloudflare.com/api/resources/email%5Fsecurity/) endpoints to prevent interruption to your normal operations.

To access Area 1 API, go to the [API Documentation ↗](https://developers.cloudflare.com/email-security/static/api%5Fdocumentation%5F1.38.1.pdf). You can set up a [service account ↗](https://developers.cloudflare.com/email-security/api/service-accounts/) to configure API tokens.

To access Email security API, go to [Email security API ↗](https://developers.cloudflare.com/api/resources/email%5Fsecurity/). You can set up an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) to use the Email security API.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/migrate-to-email-security/","name":"Migrate to Email security"}}]}
```
