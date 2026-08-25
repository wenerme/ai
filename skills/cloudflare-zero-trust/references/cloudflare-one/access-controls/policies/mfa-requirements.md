---
description: Enforce MFA in Access.
title: Enforce MFA
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Enforce MFA

Last updated Aug 13, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Access supports two methods of enforcing multi-factor authentication (MFA):

* **[Identity provider-based MFA](#identity-provider-based-mfa)** — Require specific MFA methods reported by your identity provider (IdP).
* **[Independent MFA](#independent-mfa)** — Prompt users for a second factor directly in Access, without relying on a third-party identity provider.

For SSH connections to [infrastructure applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/), Access also supports [independent MFA with PIV and FIDO2 keys](#infrastructure-applications).

## Identity provider-based MFA

You can require that users log in with specific MFA methods provided by their identity provider. For example, you can create rules that only allow users to reach a given application if they authenticate with a security key through their IdP.

IdP-based MFA enforcement is only available with the following identity providers:

* [Okta](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta/)
* [Microsoft Entra ID (formerly Azure AD)](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/)
* [Generic OIDC](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/)
* [Generic SAML 2.0](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/)

To enforce an IdP MFA requirement on an application:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Find the application for which you want to enforce MFA and select **Configure**. Alternatively, [create a new application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/).
3. Go to **Policies**.
4. If your application already has a policy containing an identity requirement, find it and select **Configure**.
Note
The policy should contain an Include rule that uses identity-based selectors. For example, the Include rule could allow users who are part of a [rule group](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/groups/), email domain, or identity provider group.
5. Add the following rule to the policy:

| Rule type | Selector              | Value                                |
| --------- | --------------------- | ------------------------------------ |
| Require   | Authentication method | mfa - multiple-factor authentication |
6. Save the policy.

Important

If the user fails to present the required MFA method, Cloudflare Access rejects the user, even if they successfully log in to the identity provider with an alternative method.

### Authentication methods in the JWT

When users authenticate with their identity provider, the IdP shares their username with Cloudflare Access. Access writes that value into the JSON Web Token (JWT) generated for the user.

Certain identity providers also share the MFA method presented by the user. Access can add these values into the JWT. For example, if the user authenticated with their password and a security key, the IdP can send a confirmation to Cloudflare Access. Access then stores that method in the JWT issued to the user.

Cloudflare Access follows [RFC 8176 ↗](https://tools.ietf.org/html/rfc8176), Authentication Method Reference Values, to define authentication methods.

## Independent MFA

Independent MFA prompts users for a second factor directly in Access. This allows you to enforce MFA requirements without relying on your IdP's MFA configuration.

You can configure MFA requirements at three levels:

| Level                                                                                                             | Description                                                    |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [Organization](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/) | Enforce MFA by default for all applications in your account.   |
| [Application](#configure-independent-mfa-for-an-application)                                                      | Require or turn off MFA for a specific application.            |
| [Policy](#configure-independent-mfa-for-a-policy)                                                                 | Require or turn off MFA for users who match a specific policy. |

MFA settings use this precedence: **Policy** \> **Application** \> **Organization**.

### Prerequisites

Before you configure independent MFA on applications or policies, you must [turn on independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/) at the organization level.

Tip

At the organization level, you can also [restrict which authenticators can be enrolled using AAGUIDs](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/#restrict-authenticators-by-aaguid) and \[skip independent MFA when the identity provider already performed MFA\](/cloudflare-one/access-controls/access-settings/independent-mfa/#use-identity-provider-mfa.

### Configure independent MFA for an application

Each application has three MFA options:

| Option                                 | Behavior                                                                                                                                                                                                                                                                                |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Respect global enforcement setting** | Uses the [organization-level](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/) MFA configuration. If MFA is required globally, users must complete MFA. If MFA is not required globally, users are not prompted. This is the default. |
| **Custom MFA settings**                | Overrides the organization setting with application-specific allowed authenticators and session duration.                                                                                                                                                                               |
| **Disable MFA**                        | Users are not prompted for independent MFA when accessing this application, even if MFA is required globally.                                                                                                                                                                           |

To configure MFA for an application:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Find the application you want to configure and select **Configure**.
3. Scroll down to **Authentication** and select the **MFA**.tab.
4. Select one of the following options:
  * To inherit the organization setting, select **Respect global enforcement setting**.
  * To set custom requirements, select **Custom MFA settings**, then configure the [allowed MFA methods](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/#supported-mfa-methods) and [authentication duration](#mfa-session-duration).
  * To exempt the application from MFA, select **Disable MFA**.
5. Select **Save**.

To configure MFA for an infrastructure application, refer to [Infrastructure applications](#infrastructure-applications).

### Configure independent MFA for a policy

Each policy has the same three MFA options described in [Configure independent MFA for an application](#configure-independent-mfa-for-an-application). Policy-level settings override application-level settings.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Policies**.
2. Choose an **Allow** policy and select **Configure**.
3. Under **Multi-factor authentication (MFA)**, select an option:
  * To inherit the application or organization setting, select **Respect global enforcement setting**.
  * To set custom requirements for users who match this policy, select **Custom MFA settings**, then configure the [allowed MFA methods](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/#supported-mfa-methods) and [authentication duration](#mfa-session-duration).
  * To exempt users who match this policy from MFA, select **Disable MFA**.
4. Select **Save**.

To configure MFA for an infrastructure application policy, refer to [Infrastructure applications](#infrastructure-applications).

### MFA session duration

The MFA session duration determines how long a successful MFA authentication remains valid. After the MFA session expires, the user must complete MFA again on their next Cloudflare Access login in addition to completing IdP authentication. You can require users to complete MFA on each Access login or set a custom duration. MFA session durations are only checked during the login flow and do not affect a user's existing session.

Access checks MFA sessions from most specific to least specific:

1. **Policy MFA session duration** — If set, applies to users who match the policy.
2. **Application MFA session duration** — If set, applies to all users accessing the application.
3. **Global MFA session duration** — The default for all applications that do not specify their own duration.

#### Require MFA on every login

To require MFA every time a user logs in to an application, set the authentication duration to **Require every login**. This prevents Access from caching a successful MFA session.

* **Organization** — Go to **Zero Trust** \> **Access controls** \> **Access settings** \> **Allow multi-factor authentication (MFA)**. Set **Authentication duration** to **Require every login**. This applies to all applications unless overridden at the application or policy level. For more details, refer to [independent MFA settings](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/).
* **Application** — Go to **Zero Trust** \> **Access controls** \> **Applications** \> select your application > **Configure** \> **Authentication** \> **MFA** tab. Select **Custom MFA settings** and set **Authentication duration** to **Require every login**.
* **Policy** — Go to **Zero Trust** \> **Access controls** \> **Policies** \> select your policy > **Configure**. Under **Multi-factor authentication (MFA)**, select **Custom MFA settings** and set **Authentication duration** to **Require every login**.

To configure this for an application via the API, first send a `GET` request to retrieve the full application configuration, then send a `PUT` request with the complete application body including the updated `mfa_config`. Set `session_duration` to `"0m"`:

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/accounts/{account_id}/access/apps/{app_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "mfa_config": {
    "mfa_disabled": false,
    "session_duration": "0m"
  }
}'
```

### Precedence example

Consider the following configuration:

flowchart TD
    subgraph org["Organization"]
        orgSettings["**Apply global MFA settings by default**, <br/>**MFA methods**: Authenticator app + Security key, <br/>**Authentication duration**: 24 hours"]
    end

    subgraph appA["Application A"]
        appASettings["**Respect global enforcement setting**<br/>(inherits organization settings)"]
        subgraph policies["Policies"]
            policy1["Policy 1<br/>**Custom MFA settings**,<br/>**MFA methods**: Security keys only,<br/>**Authentication duration**: 1 hour"]
            policy2["Policy 2<br/>**Disable MFA**"]
        end
    end

    subgraph appB["Application B"]
        appBSettings["**Disable MFA**"]
    end

    orgSettings --> appASettings
    orgSettings -.->|"overridden"| appBSettings
    appASettings -.->|"overridden by"| policy1
    appASettings -.->|"overridden by"| policy2

In this example:

* Users who access Application A and match Policy 1 must use a security key and re-authenticate every hour.
* Users who access Application A and match Policy 2 are not prompted for MFA.
* Users who access Application A and match neither policy must use an authenticator application or a security key, with a 24-hour session.
* Users who access Application B are not prompted for MFA.

## Infrastructure applications

Infrastructure applications that use SSH support two infrastructure-only MFA methods. `piv_key` uses an enrolled Personal Identity Verification (PIV) key. `ssh_fido2_key` uses an enrolled FIDO2 key. Neither method applies to other Access application types or browser WebAuthn authentication.

You can configure MFA for infrastructure apps at the application level or at the policy level.

### Configure MFA for an infrastructure application

Select PIV key, FIDO2 key, or both when configuring custom MFA. The corresponding API arrays are `["piv_key"]`, `["ssh_fido2_key"]`, and `["piv_key", "ssh_fido2_key"]`.

Note

**PIV and FIDO2 key authenticators only work with infrastructure applications.**

Non-infrastructure applications: If PIV and FIDO2 keys are the only allowed MFA methods in your global settings, users cannot log in to non-infrastructure applications. To fix this, add at least one other authenticator type to your global settings (for example, TOTP or biometrics), or configure custom MFA settings for non-infrastructure applications.

Infrastructure applications: If MFA is globally required but your global settings do not include the infrastructure authenticator you want to use, users cannot access infrastructure applications that require MFA. To fix this, add the authenticator to your global MFA settings, or disable MFA for the specific application or policy.

Dashboard

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Find your infrastructure application and select **Configure**.
3. Go to the **Authentication** tab and select **MFA**.
4. Select one of the following options:
  * **Respect global enforcement setting** — Uses the [organization-level](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/) MFA configuration. This is the default.
  * **Custom MFA settings** — Override the global setting for this application. Select **PIV key**, **FIDO2 key**, or both as the allowed authenticators, then set a custom MFA session duration.
  * **Disable MFA** — Users are not prompted for MFA when accessing this application.
5. Select **Save**.

API

To update MFA settings for an infrastructure application, first send a `GET` request to retrieve the full application configuration, then send a `PUT` request with the complete application body including the `mfa_config` object. The `PUT` request must contain all fields returned by the `GET` to avoid overwriting existing settings.

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/accounts/{account_id}/access/apps/{app_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "mfa_config": {
    "mfa_disabled": false,
    "session_duration": "12h",
    "allowed_authenticators": ["piv_key", "ssh_fido2_key"]
  }
}'
```

| Field                   | Type    | Description                                                                                                                           |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| mfa\_disabled           | Boolean | If true, MFA is not required for this application, even if global settings enforce MFA.                                               |
| session\_duration       | String  | Duration before the user must re-authenticate with MFA (for example, 30m, 1h, 24h). Set to 0m to require MFA on every SSH connection. |
| allowed\_authenticators | Array   | Use \["piv\_key"\], \["ssh\_fido2\_key"\], or \["piv\_key", "ssh\_fido2\_key"\].                                                      |

### Configure MFA for an infrastructure policy

You can set different MFA requirements for different SSH usernames by configuring MFA at the policy level. Policy-level MFA settings override application-level settings.

Dashboard

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Find your infrastructure application and select **Configure**.
3. Go to **Policies** and select the policy you want to configure.
4. Under **Multi-factor authentication (MFA)**, select an option:
  * **Respect global enforcement setting** — Inherits the application or organization setting.
  * **Custom MFA settings** — Select **PIV key**, **FIDO2 key**, or both as the allowed authenticators and set a custom MFA session duration for users who match this policy.
  * **Disable MFA** — Users who match this policy are not prompted for MFA.
5. Select **Save**.

API

To update MFA settings for a policy, first send a `GET` request to retrieve the full policy configuration, then send a `PUT` request with the complete policy body including the `mfa_config` object. The `mfa_config` object uses the same fields as the [application-level configuration](#configure-mfa-for-an-infrastructure-application).

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/accounts/{account_id}/access/policies/{policy_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "name": "Require MFA for root",
  "decision": "allow",
  "include": [
    {
      "email": {
        "email": "jdoe@company.com"
      }
    }
  ],
  "mfa_config": {
    "mfa_disabled": false,
    "session_duration": "1h",
    "allowed_authenticators": ["piv_key", "ssh_fido2_key"]
  },
  "connection_rules": {
    "ssh": {
      "usernames": ["root"],
      "allow_email_alias": false
    }
  }
}'
```

### MFA session duration for SSH

The MFA session duration determines how long users can open new SSH connections without another MFA prompt. Set the duration to `0m` to require MFA for every new connection. Expiration does not terminate an active connection.

MFA sessions are bound to the user's device. If a user switches to a different device, they must re-authenticate regardless of the remaining session duration.

Session duration is evaluated in the following order:

1. **Policy-level duration** — If set, applies to users who match the policy.
2. **Application-level duration** — If no policy-level duration is set, uses the application setting.
3. **Organization-level duration** — If neither policy nor application defines a duration, uses the global setting.

When a user matches multiple policies that each define a session duration, Access uses the **shortest** duration across all matching policies.

### Precedence and conflict resolution

MFA configuration is evaluated from most specific to least specific: **policy** \> **application** \> **organization**.

| Organization MFA | Application MFA | Policy MFA | Result                                      |
| ---------------- | --------------- | ---------- | ------------------------------------------- |
| Required         | Required        | Required   | MFA required                                |
| Required         | Required        | Disabled   | MFA not required (policy wins)              |
| Required         | Disabled        | (not set)  | MFA not required (application wins)         |
| Required         | (not set)       | (not set)  | MFA required (organization setting applies) |

Organization-level MFA must be enabled for users to enroll PIV keys. Explicit settings at a lower level (policy or application) override higher levels. If no explicit setting exists at a level, the next higher level applies.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#page","headline":"Enforce MFA · Cloudflare One docs","description":"Enforce MFA in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML","JSON web token (JWT)","Authentication"]}
```
