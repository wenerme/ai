---
description: Detect and investigate account abuse on login and registration endpoints.
title: Account Abuse Protection (Early Access)
image: https://developers.cloudflare.com/bots/account-abuse-protection/og.png?v=9d30dd9cfa06989c
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# Account Abuse Protection (Early Access)

Last updated Nov 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/bots/account-abuse-protection/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Identify and mitigate attacks on your customer and user accounts.

Account abuse — bulk account creation and account takeover attacks — can cause financial losses and erode user trust. Fraud detection allows you to detect and mitigate these attacks among your traffic. You can use fraud signals to [update or create new rules](https://developers.cloudflare.com/waf/custom-rules/) for suspicious account activity, or pass signals to your origin to integrate into authentication and authorization systems.

---

## Availability

Account Abuse Protection is available in Early Access for any [Bot Management Enterprise](https://developers.cloudflare.com/bots/get-started/bot-management) customer. You can use these features at no additional cost for a limited period until they are generally available.

Contact your Cloudflare account team to request access.

---

## Concepts

### User ID

User ID is a cryptographically hashed, per-zone identifier that customers can use in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/), [Security Rules](https://developers.cloudflare.com/waf/custom-rules/), and [Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/). Hashed User IDs are created by encrypting the primary credentials your users provide, converting them into opaque identifiers unique to your zone. This allows traffic analysis while protecting user privacy.

Each login or sign up adds the event to that account's history, along with the network and device signals Cloudflare observes at the edge. Over time, this history shows what normal activity looks like for the account, so meaningful changes are easier to spot. With access to hashed User ID, website owners can:

- Review which users have the most activity on your website.
- Find the details on a specific user's characteristics and activity patterns.
- Mitigate traffic based on the user, such as blocking a user with historically suspicious activity.
- Combine fields to see when accounts are being targeted with leaked credentials.
- Manage network patterns or signals associated with specific users.

Data privacy

User ID was created with privacy in mind. Its design and engineering align with our privacy and compliance programs and contain technical controls that protect the privacy of users. Hashed User IDs are created by encrypting the primary credentials your users use to access your applications, such as an email address, username, or phone number.

Other Cloudflare customers cannot access your user profiles. They are unique to your zone.

**Roles**

The **Account Abuse Protection** role grants fraud teams access to the dashboard. The **Account Abuse Protection PII** role also grants access to account-level personally identifiable information (PII), such as associated email addresses. Only team members with the **Account Abuse Protection PII** role can create or edit Logpush jobs that include PII. Team members without either role cannot access the Account Abuse Protection dashboard.

To assign either role, in the Cloudflare dashboard, go to **Manage Account** > **Members** and select **Invite Members**. Under **Permission policies**, select **Add a policy**.

User ID is an opt-in feature that can be enabled in Security Settings.

To enable, edit, or disable the setting:

1. In the Cloudflare dashboard, go to the **Security Settings** page. [Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Go to the **Fraud** section.
3. Go to **User ID**.
4. Turn **User ID** on or off.

### AI assistants

Some users ask AI assistants to log in or sign up on their behalf. When Cloudflare recognizes the assistant that made a login or sign up request, Account Abuse Protection records which assistant it was against that account's Hashed User ID. This lets site owners and fraud teams see which account each assistant acts for.

- **Population overview:** View which AI assistants are active across your users and how many accounts use them.
- **AI assistant filters:** Filter accounts by number of AI assistant events or number of AI assistants.
- **Individual account overview:** View the assistants that acted for a single account, the number of events, and its overall behavior.

You can use this to:

- **Act on one account.** If an assistant's activity on one account looks suspicious, investigate and mitigate that account without blocking the assistant for everyone else who relies on it.
- **Tune your agent policies with evidence.** Use what you see for each assistant to set per-agent access in [AI Crawler and Agent access policies](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/).

Note

AI assistant visibility covers login and sign up events only. Requests from assistants that Cloudflare does not recognize appear as ordinary traffic.

### Ephemeral IDs

Customers using Cloudflare [Turnstile](https://developers.cloudflare.com/turnstile/) can utilize ephemeral IDs for Fraud detection.

Refer to [Fraud detection with ephemeral IDs](https://developers.cloudflare.com/turnstile/tutorials/fraud-detection-with-ephemeral-ids/) for more information.

### Account takeover detections

Cloudflare Bot Management includes dedicated detection IDs for account takeover attacks.

Refer to [Account takeover detections](https://developers.cloudflare.com/bots/additional-configurations/detection-ids/account-takeover-detections/) for more information.

Note

Account takeover (ATO) detections are not available for accounts using the [Data Localization Suite](https://developers.cloudflare.com/data-localization/) with [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/) in the EU region. ATO detections rely on zone logs to identify suspicious activity, and Cloudflare does not ingest logs for these accounts to comply with General Data Protection (GDPR).

---

## Get started

### Prerequisites

Fraud detection requires the following configurations and settings to be enabled to properly identify suspicious behavior.

#### Security settings

Turn on **User ID** and tell Cloudflare where the user's identifier, such as an email address or username, appears in each login and sign up request.

| Request format | Example username location |
| --- | --- |
| URL-encoded form | `url_decode(http.request.body.form["username"][0])` |
| JSON body | `lookup_json_string(http.request.body.raw, "username")` |
| Query parameter | `http.request.uri.args["username"][0]` |

Use the field name that your application sends in place of `username`. Supported expressions can use request body, header, and query fields with [`lookup_json_string()`](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#lookup_json_string) and [`url_decode()`](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#url_decode).

Cloudflare hashes this value to create a Hashed User ID for each account. Requests without the identifier are not linked to an account.

If your endpoints do not return `2XX` status codes for success and `4XX` for failure, configure custom success and failure criteria so Cloudflare records each outcome correctly.

#### Verify the User ID configuration

After traffic reaches your labeled login or sign-up endpoints, go to **Security** > **Account Abuse Protection** and confirm that accounts appear in the dashboard. Data may not appear immediately.

| Result | Recommended action |
| --- | --- |
| Accounts and activity appear | The User ID configuration is working. |
| Events appear, but accounts do not | Verify that the username location expression matches the account identifier in the request. |
| No events or accounts appear | Verify your assigned role, endpoint labels, selected date range, and whether traffic has reached the configured endpoints. |

#### Label login and sign-up endpoints

Cloudflare automatically identifies certain login and sign-up traffic on your applications and runs these detections without any additional configurations.

- Sign-ups: Cloudflare automatically monitors traffic on endpoints that match common sign-up endpoints.
- Login: Cloudflare automatically monitors traffic on endpoints that match common login endpoints.

To verify endpoint labels, go to **Security** > **Web Assets** > **Endpoints** and confirm that login endpoints have the `cf-log-in` label and sign-up endpoints have the `cf-sign-up` label.

Login or sign up endpoints

Not all login or sign-up endpoints are automatically detected.

Cloudflare evaluates and automatically detects your website or application's login or sign-up endpoint, but non-traditional login or sign-up endpoints may not be recognized.

For example, if you have a non-traditional login endpoint, you should label it with `cf-log-in` using the [endpoint labeling service](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/). Once you have applied the `cf-log-in` label, Cloudflare will use the labeled endpoint for account takeover detection decisions.

To manually label a login or sign-up endpoint:

1. In the Cloudflare dashboard, go to **Security** > **Web Assets** > **Endpoints**.
2. Find your login or sign-up endpoint and select **Edit endpoint labels**.
3. Under **Managed labels**, select the appropriate label:
   - For login endpoints, select `cf-log-in`.
   - For sign-up endpoints, select `cf-sign-up`.
4. Select **Save labels**.

Enhanced with leaked credential detections

Cloudflare also recommends enabling [Leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) to help identify compromised credentials across your users.

---

## Analytics dashboard

The dashboard is organized as an investigative funnel. Start with your whole account population, narrow down to the accounts that need review, then investigate each one.

### Population overview

The population overview summarizes login and sign up activity on your zone for a selected time range:

- Total events, unique accounts, unique IPs, and unique devices.
- Events over time, split into login and sign up, with the share of events made by AI assistants.
- AI assistant events: which known assistants made login and sign up requests, how many events each made, and across how many accounts.
- Top countries and top ASNs by events.
- Leaked credential checks: how many events had a leaked username and password, a leaked username, a leaked password, or clean credentials.

The **Accounts** table lists each Hashed User ID with its total events, AI assistant events, leaked credential events, unique IPs, top country, and top IP. Use filters to narrow the list for investigation.

### Individual account overview

Selecting a Hashed User ID from the **Accounts** table opens its individual account summary and detailed activity log.

- **Account overview:** A summary of the account's login and sign up activity, its login success rate, leaked credential matches, and the networks, locations, and devices most often seen with a specific user.
- **AI assistants:** The assistants that acted for this account, with the number of events and event types for each.
- **Activity log:** Every event for the account, with its timestamp, Ray ID, event type, AI assistant (if any), location, network, device, and any mitigation applied. Filter the log by AI assistant to review one assistant's activity.

Use the Ray ID to look up the full request in Security Events.

When reviewing an account, consider:

- Was this a single event or part of a series of repeated attempts?
- Did a login introduce a new country, network, IP address, device, or AI assistant?
- What happened before and after the suspicious event?
- Did a burst of logins follow shortly after sign up, from different networks or devices?

### Respond to an account

If your review confirms that an account was compromised or is abusive:

- Start your own recovery or enforcement process for the account.
- Select **Mitigate account** to create a Security Rule for its Hashed User ID, or create the rule manually with `cf.fraud.user_profile.id` equal to the impacted Hashed User ID. Choose *Managed Challenge* to add friction, or *Block* to stop the account's requests. Only this account is affected, including when it uses an AI assistant that other users rely on.

### Security Analytics

You can also filter [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) by User ID to review requests for a single account. To review AI assistant traffic across all requests on your zone, not only logins and sign ups, select **Personal assistants** in **Bot analysis**.

[Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)

Fraud fields can be used as filters to identify suspicious patterns in your traffic.

---

## Detections

Fraud detections focus on account abuse attacks such as account takeover, bulk account creation, and credential quality. These detections run on all eligible traffic and can be used across [Cloudflare Rules](https://developers.cloudflare.com/rules/) to log, challenge, and/or block requests to your sign up and login endpoints.

### Bulk account creation

Bulk account creation detection identifies patterns that indicate automated or repeated creation of fake accounts. Detection runs on account-creation endpoints labeled with `cf-sign-up`.

### Account creation

Disposable Email Checks detect when users sign up with throwaway email addresses commonly used for promotion abuse and fake account creation. These disposable email services allow attackers to create thousands of unique accounts without maintaining real infrastructure.

You can use `cf.fraud_detection.disposable_email` to block disposable emails or issue a [challenge](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/) to anyone attempting to create an account with a disposable email.

### Suspicious emails

Cloudflare checks email domains used during sign up against lists of known temporary or disposable email services. Cloudflare runs the same check on login requests when the extracted username is an email address.

This check also determines the value of `cf.fraud.email_risk` in Security Rules and Security Analytics. Refer to [prerequisites](#prerequisites) to ensure your traffic is eligible for detections.

| Detection tag | Description |
| --- | --- |
| `cf.fraud_detection.disposable_email` | Identifies emails with domains that are commonly found in lists of temporary or disposable email services. |
| `cf.fraud.email_risk` | Returns `high` when Cloudflare identifies the email domain as temporary or disposable. Returns `unknown` otherwise. |

---

## Mitigations

The following Fraud detection fields can be used in Security Rules to help identify and mitigate suspicious traffic.

### Security Rules

The following fields can be used in new and existing Security Rules.

| Field | Description | Values |
| --- | --- | --- |
| `cf.fraud_detection.disposable_email` | Flags whether a domain for a given email is included in a known list of temporary email providers. | `True` or `False` |
| `cf.fraud.email_risk` | Indicates whether Cloudflare identifies an email domain as temporary or disposable. | `high` when Cloudflare identifies the domain as temporary or disposable. <br>`unknown` otherwise. |
| `cf.fraud.detection_ids` | Contains the IDs of fraud detections that matched the request. | For bulk account creation, use `201326594`, `201326595`, `201326596`, or `201326597`. |
| `cf.fraud.user_profile.id` | The Hashed User ID for the request. | String of hashed user IDs. |

### Other rules

You can use Fraud detection data in Request Header [Transform Rules](https://developers.cloudflare.com/rules/transform/managed-transforms/) to pass information down to the origin.

### Logpush

You can add Fraud detection fields to existing or new [Logpush](https://developers.cloudflare.com/logs/logpush/) jobs.

---

## Troubleshooting

### Account Abuse Protection is not visible

- Confirm that the team member has the **Account Abuse Protection** or **Account Abuse Protection PII** role.
- Confirm that Account Abuse Protection Early Access is enabled for the account. Contact your Cloudflare account team if you need access.

### The dashboard has no data

- Confirm that the selected date range contains login or sign-up activity.
- Confirm that traffic has reached the configured endpoints since Account Abuse Protection was enabled. Historical traffic is not backfilled.
- Go to **Security** > **Web Assets** > **Endpoints** and verify that login endpoints have the `cf-log-in` label and sign-up endpoints have the `cf-sign-up` label.

### Events appear, but accounts do not

Verify that the username location expression matches the account identifier in an actual request. Requests without the configured identifier are not associated with a Hashed User ID.

### Login outcomes are incorrect

Verify the configured success and failure criteria. By default, successful requests should return `2XX` response codes and failed requests should return `4XX` response codes.

If an application returns a successful response code for a failed login, configure custom criteria so Cloudflare records the outcome correctly.

### Personally identifiable information is hidden

Confirm that the team member has the **Account Abuse Protection PII** role. The base **Account Abuse Protection** role does not grant access to account-level personally identifiable information.

### Leaked credential results show **Not checked**

- Confirm that leaked credentials detection is turned on for the zone.
- Verify that Cloudflare can extract the credentials from the configured request locations.
- Confirm that the request is within the supported detection scope.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/account-abuse-protection/#page","headline":"Account Abuse Protection (Early Access)","description":"Detect and investigate account abuse on login and registration endpoints.","url":"https://developers.cloudflare.com/bots/account-abuse-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/bots/account-abuse-protection/og.png?v=9d30dd9cfa06989c","dateModified":"2026-11-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Account takeover","Fake account creation"]}
```
