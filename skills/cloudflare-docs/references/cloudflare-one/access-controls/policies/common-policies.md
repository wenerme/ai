---
title: Common policies
description: Commonly used Cloudflare Access policies for securing applications.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

# Common policies

The following Cloudflare Access policies are commonly used to secure applications.

Refer to the [Access policies page](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for a comprehensive list of available actions, rule types, and selectors. To learn how to create and manage policies, refer to [Manage Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/).

## Allow employees by email domain

The most basic Access policy grants access to anyone who authenticates with an email address belonging to your organization. This is a good starting point when you first protect an application with Access and want to restrict it to employees using your corporate [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/).

* [ Dashboard ](#tab-panel-5795)
* [ API ](#tab-panel-5796)
* [ Terraform ](#tab-panel-5797)

| Action | Rule type | Selector         | Value        |
| ------ | --------- | ---------------- | ------------ |
| Allow  | Include   | Emails ending in | @example.com |

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Allow employees by email domain",

    "decision": "allow",

    "include": [

        {

            "email_domain": {

                "domain": "example.com"

            }

        }

    ]

  }'


```

Explain Code

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:

```

resource "cloudflare_zero_trust_access_policy" "allow_employees_by_email_domain" {

  account_id = var.cloudflare_account_id

  name       = "Allow employees by email domain"

  decision   = "allow"

  include = [{

    email_domain = {

      domain = "example.com"

    }

  }]

}


```

Explain Code

You can add multiple email domains to the Include rule if your organization uses more than one domain (for example, `@example.com` and `@example.co.uk`).

## Allow employees from specific countries

Organizations that operate in specific regions or need to comply with data residency requirements can restrict application access to users in approved countries. This policy is useful when you want to limit where employees can connect from, while still allowing exceptions for individual users such as traveling executives.

Because Require rules use AND logic, you cannot add multiple countries directly to a single Require rule — that would require the user to be in all countries simultaneously. Instead, first create a [rule group](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/groups/) that lists the approved countries:

* [ Dashboard ](#tab-panel-5798)
* [ API ](#tab-panel-5799)
* [ Terraform ](#tab-panel-5800)

| Rule type | Selector | Value                   |
| --------- | -------- | ----------------------- |
| Include   | Country  | United States, Portugal |

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Organizations, Identity Providers, and Groups Write`

Create an Access group

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/groups" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Approved countries",

    "include": [

        {

            "geo": {

                "country_code": "US"

            }

        },

        {

            "geo": {

                "country_code": "PT"

            }

        }

    ]

  }'


```

Explain Code

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_group ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fgroup) resource:

```

resource "cloudflare_zero_trust_access_group" "approved_countries" {

  account_id = var.cloudflare_account_id

  name       = "Approved countries"

  include = [

    {

      geo = {

        country_code = "US"

      }

    },

    {

      geo = {

        country_code = "PT"

      }

    },

  ]

}


```

Explain Code

Then reference the rule group in your Access policy:

* [ Dashboard ](#tab-panel-5831)
* [ API ](#tab-panel-5832)
* [ Terraform ](#tab-panel-5833)

| Action  | Rule type  | Selector                               | Value        |
| ------- | ---------- | -------------------------------------- | ------------ |
| Allow   | Include    | Emails ending in                       | @example.com |
| Require | Rule group | Approved countries                     |              |
| Exclude | Email      | user-1@example.com, user-2@example.com |              |

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Allow employees from specific countries",

    "decision": "allow",

    "include": [

        {

            "email_domain": {

                "domain": "example.com"

            }

        }

    ],

    "require": [

        {

            "group": {

                "id": "<APPROVED_COUNTRIES_GROUP_ID>"

            }

        }

    ],

    "exclude": [

        {

            "email": {

                "email": "user-1@example.com"

            }

        },

        {

            "email": {

                "email": "user-2@example.com"

            }

        }

    ]

  }'


```

Explain Code

Replace `<APPROVED_COUNTRIES_GROUP_ID>` with the `id` returned when you created the rule group above. To look up existing groups, use the [List Access groups](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/groups/methods/list/) endpoint.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:

```

resource "cloudflare_zero_trust_access_policy" "allow_employees_from_specific_countries" {

  account_id = var.cloudflare_account_id

  name       = "Allow employees from specific countries"

  decision   = "allow"

  include = [{

    email_domain = {

      domain = "example.com"

    }

  }]

  require = [{

    group = {

      id = cloudflare_zero_trust_access_group.approved_countries.id

    }

  }]

  exclude = [

    {

      email = {

        email = "user-1@example.com"

      }

    },

    {

      email = {

        email = "user-2@example.com"

      }

    },

  ]

}


```

Explain Code

The `cloudflare_zero_trust_access_group.approved_countries` reference points to the [cloudflare\_zero\_trust\_access\_group ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fgroup) resource created above.

## Require device posture for sensitive applications

For applications that contain sensitive data, you can verify that users connect from managed devices that meet your organization's security baseline. The following example combines identity verification with [device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/) to ensure that the device is running a supported [OS version](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/os-version/) and is connected through the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/), which is enforced by the [Require Gateway check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/require-gateway/).

Note

Before creating this policy, [create device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/) for each requirement and [enable the Require Gateway posture check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/require-gateway/).

* [ Dashboard ](#tab-panel-5816)
* [ API ](#tab-panel-5817)
* [ Terraform ](#tab-panel-5818)

| Action  | Rule type  | Selector                  | Value               |
| ------- | ---------- | ------------------------- | ------------------- |
| Allow   | Include    | Okta Groups               | Full-Time Employees |
| Require | Gateway    | Gateway                   |                     |
| Require | OS Version | Latest version of Windows |                     |

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Require device posture for sensitive apps",

    "decision": "allow",

    "include": [

        {

            "okta": {

                "name": "Full-Time Employees",

                "identity_provider_id": "<OKTA_IDP_ID>"

            }

        }

    ],

    "require": [

        {

            "device_posture": {

                "integration_uid": "<GATEWAY_CHECK_ID>"

            }

        },

        {

            "device_posture": {

                "integration_uid": "<OS_VERSION_CHECK_ID>"

            }

        }

    ]

  }'


```

Explain Code

Replace the `okta` rule with the [appropriate rule for your identity provider](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/policies/methods/create/). To get your identity provider ID, use the [List Access identity providers](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/identity%5Fproviders/methods/list/) endpoint. To get the integration UIDs for your device posture checks, use the [List device posture checks](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/devices/subresources/posture/methods/list/) endpoint.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:

```

resource "cloudflare_zero_trust_access_policy" "require_device_posture" {

  account_id = var.cloudflare_account_id

  name       = "Require device posture for sensitive apps"

  decision   = "allow"

  include = [{

    okta = {

      name                 = "Full-Time Employees"

      identity_provider_id = cloudflare_zero_trust_access_identity_provider.okta.id

    }

  }]

  require = [

    {

      device_posture = {

        integration_uid = cloudflare_zero_trust_device_posture_rule.gateway_check.id

      }

    },

    {

      device_posture = {

        integration_uid = cloudflare_zero_trust_device_posture_rule.os_version_check.id

      }

    },

  ]

}


```

Explain Code

* Replace the `okta` rule with the appropriate [cloudflare\_zero\_trust\_access\_identity\_provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fidentity%5Fprovider) resource for your identity provider. To configure the identity provider resource, refer to [Identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/).
* To configure the [cloudflare\_zero\_trust\_device\_posture\_rule ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fposture%5Frule) resources referenced above, refer to [Device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

To reuse these device requirements across multiple applications, create a [rule group](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/groups/) called "Corporate device requirements" that contains the posture checks. You can then reference this rule group in the Require field of any policy.

## Require MFA for high-security applications

For applications that handle financial data, production infrastructure, or other high-value resources, you can require that users authenticate with multi-factor authentication (MFA) in addition to their identity provider credentials. This ensures that a compromised password alone is not sufficient to gain access.

Access supports two approaches to enforcing MFA:

### Identity provider-based MFA

If your identity provider reports the authentication method used during login, you can add an **Authentication method** selector to require a specific MFA method such as a hardware security key.

* [ Dashboard ](#tab-panel-5822)
* [ API ](#tab-panel-5823)
* [ Terraform ](#tab-panel-5824)

| Action  | Rule type             | Selector     | Value     |
| ------- | --------------------- | ------------ | --------- |
| Allow   | Include               | Okta Groups  | Employees |
| Require | Authentication method | Security key |           |
| Require | Gateway               | _(enabled)_  |           |

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Require MFA for high-security apps",

    "decision": "allow",

    "include": [

        {

            "okta": {

                "name": "Employees",

                "identity_provider_id": "<OKTA_IDP_ID>"

            }

        }

    ],

    "require": [

        {

            "auth_method": {

                "auth_method": "swk"

            }

        },

        {

            "device_posture": {

                "integration_uid": "<GATEWAY_CHECK_ID>"

            }

        }

    ]

  }'


```

Explain Code

The `auth_method` value uses [RFC 8176 ↗](https://datatracker.ietf.org/doc/html/rfc8176#section-2) authentication method reference values. For example, `swk` represents a software-secured key (security key). Replace the `okta` rule with the [appropriate rule for your identity provider](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/policies/methods/create/). To get your identity provider ID, use the [List Access identity providers](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/identity%5Fproviders/methods/list/) endpoint. To get `<GATEWAY_CHECK_ID>`, use the [List device posture checks](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/devices/subresources/posture/methods/list/) endpoint.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:

```

resource "cloudflare_zero_trust_access_policy" "require_mfa" {

  account_id = var.cloudflare_account_id

  name       = "Require MFA for high-security apps"

  decision   = "allow"

  include = [{

    okta = {

      name                 = "Employees"

      identity_provider_id = cloudflare_zero_trust_access_identity_provider.okta.id

    }

  }]

  require = [

    {

      auth_method = {

        auth_method = "swk"

      }

    },

    {

      device_posture = {

        integration_uid = cloudflare_zero_trust_device_posture_rule.gateway_check.id

      }

    },

  ]

}


```

Explain Code

The `auth_method` value uses [RFC 8176 ↗](https://datatracker.ietf.org/doc/html/rfc8176#section-2) authentication method reference values. For example, `swk` represents a software-secured key (security key).

* Replace the `okta` rule with the appropriate [cloudflare\_zero\_trust\_access\_identity\_provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fidentity%5Fprovider) resource for your identity provider. To configure the identity provider resource, refer to [Identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/).
* To configure the [cloudflare\_zero\_trust\_device\_posture\_rule ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fposture%5Frule) resource referenced above, refer to [Device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

### Independent MFA

If you want to enforce MFA directly in Access without relying on your IdP, you can use [independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/). Independent MFA is not configured through policy selectors. Instead, you first [turn on independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/#turn-on-independent-mfa) at the organization level, then enable it for specific applications or policies through a settings panel. Access will prompt users for a second factor (such as a security key, authenticator app, or biometrics) after they authenticate with your IdP.

For the full details on both approaches, refer to [Enforce MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/).

## Allow contractor access with email-based authentication

When you collaborate with external contractors or partners who are not part of your corporate identity provider, you can grant them access using a [one-time PIN (OTP)](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/). OTP sends a short-lived code to the contractor's email address, allowing them to authenticate without needing an account in your IdP.

Note

Before creating this policy, [enable OTP as a login method](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/#set-up-otp) in your identity provider settings.

* [ Dashboard ](#tab-panel-5825)
* [ API ](#tab-panel-5826)
* [ Terraform ](#tab-panel-5827)

| Action  | Rule type     | Selector         | Value                                |
| ------- | ------------- | ---------------- | ------------------------------------ |
| Allow   | Include       | Emails ending in | @contractor-a.com, @contractor-b.com |
| Require | Login methods | One-time PIN     |                                      |

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Allow contractor access with OTP",

    "decision": "allow",

    "include": [

        {

            "email_domain": {

                "domain": "contractor-a.com"

            }

        },

        {

            "email_domain": {

                "domain": "contractor-b.com"

            }

        }

    ],

    "require": [

        {

            "login_method": {

                "id": "<OTP_IDENTITY_PROVIDER_ID>"

            }

        }

    ]

  }'


```

Explain Code

To get the ID of your OTP identity provider, use the [List Access identity providers](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/identity%5Fproviders/methods/list/) endpoint.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:

```

resource "cloudflare_zero_trust_access_policy" "allow_contractor_access_with_otp" {

  account_id = var.cloudflare_account_id

  name       = "Allow contractor access with OTP"

  decision   = "allow"

  include = [

    {

      email_domain = {

        domain = "contractor-a.com"

      }

    },

    {

      email_domain = {

        domain = "contractor-b.com"

      }

    },

  ]

  require = [{

    login_method = {

      id = cloudflare_zero_trust_access_identity_provider.otp.id

    }

  }]

}


```

Explain Code

To configure the [cloudflare\_zero\_trust\_access\_identity\_provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fidentity%5Fprovider) resource for OTP (configured with `type = "onetimepin"`), refer to [One-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/).

Warning

Adding `Login Methods: One-time PIN` as an Include rule without restricting email domains allows anyone with any email address to receive a code and access the application. Always pair OTP with specific email domains or an email list in the Include rule.

## Isolate contractor access to internal applications

When contractors or other external users need to view internal applications but should not be able to download, copy, or transfer data to their unmanaged devices, you can serve the application in a [remote browser](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/). This gives external users read-only visibility into the application while keeping sensitive data from leaving your environment.

Note

Before creating this policy, you must turn on [Clientless Web Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/).

* [ Dashboard ](#tab-panel-5810)
* [ API ](#tab-panel-5811)
* [ Terraform ](#tab-panel-5812)

| Action | Rule type | Selector         | Value                                |
| ------ | --------- | ---------------- | ------------------------------------ |
| Allow  | Include   | Emails ending in | @contractor-a.com, @contractor-b.com |

**Additional settings**: Turn on **Isolate application**.

First, enable Clientless Web Isolation on your account if you have not already:

Patch Zero Trust account configuration

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/configuration" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "settings": {

        "browser_isolation": {

            "url_browser_isolation_enabled": true

        }

    }

  }'


```

Explain Code

Then, create the Access policy with `isolation_required` set to `true`:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Isolate contractor access",

    "decision": "allow",

    "include": [

        {

            "email_domain": {

                "domain": "contractor-a.com"

            }

        },

        {

            "email_domain": {

                "domain": "contractor-b.com"

            }

        }

    ],

    "isolation_required": true

  }'


```

Explain Code

First, configure the [cloudflare\_zero\_trust\_gateway\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fgateway%5Fsettings) resource to enable Clientless Web Isolation on your account if you have not already:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Zero Trust Write`

```

resource "cloudflare_zero_trust_gateway_settings" "gateway_settings" {

  account_id = var.cloudflare_account_id

  settings = {

    browser_isolation = {

      url_browser_isolation_enabled = true

    }

  }

}


```

Then, configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource with `isolation_required` set to `true`:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

```

resource "cloudflare_zero_trust_access_policy" "isolate_contractor_access" {

  account_id         = var.cloudflare_account_id

  name               = "Isolate contractor access"

  decision           = "allow"

  isolation_required = true

  include = [

    {

      email_domain = {

        domain = "contractor-a.com"

      }

    },

    {

      email_domain = {

        domain = "contractor-b.com"

      }

    },

  ]

}


```

Explain Code

To restrict what users can do inside the isolated session, create a companion [Gateway HTTP policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) that matches traffic to the application domain. Set the action to **Isolate** and disable interactive controls in the [policy settings](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/#policy-settings).

Example Gateway HTTP policy

| Selector | Operator | Value            | Action  |
| -------- | -------- | ---------------- | ------- |
| Domain   | in       | wiki.example.com | Isolate |

**Policy settings**:

| Setting        | Value        |
| -------------- | ------------ |
| Copy           | Do not allow |
| Paste          | Do not allow |
| Keyboard       | Do not allow |
| File downloads | Do not allow |
| File uploads   | Do not allow |
| Printing       | Do not allow |

For more information, refer to [Isolate self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/isolate-application/).

## Block requests from high-risk countries

If your organization restricts access from certain countries due to internal policy or regulatory requirements such as [OFAC sanctions ↗](https://orpa.princeton.edu/export-controls/sanctioned-countries) or [ITAR regulations ↗](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries), you can create a Block policy that denies access from those regions. Adding a corporate IP allowlist as an Exclude rule ensures that employees connecting through trusted office networks are not inadvertently blocked.

Note

Before creating this policy, [create a list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) with your approved IP ranges.

* [ Dashboard ](#tab-panel-5813)
* [ API ](#tab-panel-5814)
* [ Terraform ](#tab-panel-5815)

| Action  | Rule type | Selector               | Value              |
| ------- | --------- | ---------------------- | ------------------ |
| Block   | Include   | Country                | Russian Federation |
| Exclude | IP list   | Corporate IP allowlist |                    |

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Block requests from high-risk countries",

    "decision": "deny",

    "include": [

        {

            "geo": {

                "country_code": "RU"

            }

        }

    ],

    "exclude": [

        {

            "ip_list": {

                "id": "<CORPORATE_IP_ALLOWLIST_ID>"

            }

        }

    ]

  }'


```

Explain Code

To get the ID of your IP list, use the [List Zero Trust lists](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/lists/methods/list/) endpoint.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:

```

resource "cloudflare_zero_trust_access_policy" "block_high_risk_countries" {

  account_id = var.cloudflare_account_id

  name       = "Block requests from high-risk countries"

  decision   = "deny"

  include = [{

    geo = {

      country_code = "RU"

    }

  }]

  exclude = [{

    ip_list = {

      id = cloudflare_zero_trust_list.corporate_ip_allowlist.id

    }

  }]

}


```

Explain Code

To configure the [cloudflare\_zero\_trust\_list ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Flist) resource referenced above (configured with `type = "IP"`), refer to [Lists](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/).

Block policies are best used together with [Allow policies](#allow-employees-by-email-domain) to carve out exceptions. Because Access denies all requests by default, users who do not match a Block policy are still denied unless they match an Allow policy.

## Exclude high-risk users

If your organization uses [Cloudflare User Risk Scores](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/) to flag users with anomalous behavior, you can exclude high-risk users from accessing sensitive applications. This is useful as a dynamic safeguard that automatically restricts access when a user's behavior triggers a risk level change, without requiring manual intervention.

* [ Dashboard ](#tab-panel-5819)
* [ API ](#tab-panel-5820)
* [ Terraform ](#tab-panel-5821)

| Action  | Rule type       | Selector         | Value        |
| ------- | --------------- | ---------------- | ------------ |
| Allow   | Include         | Emails ending in | @example.com |
| Exclude | User risk score | _High_           |              |

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Exclude high-risk users",

    "decision": "allow",

    "include": [

        {

            "email_domain": {

                "domain": "example.com"

            }

        }

    ],

    "exclude": [

        {

            "user_risk_score": {

                "user_risk_score": [

                    "high"

                ]

            }

        }

    ]

  }'


```

Explain Code

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:

```

resource "cloudflare_zero_trust_access_policy" "exclude_high_risk_users" {

  account_id = var.cloudflare_account_id

  name       = "Exclude high-risk users"

  decision   = "allow"

  include = [{

    email_domain = {

      domain = "example.com"

    }

  }]

  exclude = [{

    user_risk_score = {

      user_risk_score = ["high"]

    }

  }]

}


```

Explain Code

In this example, any user scored as high risk is excluded even if they match the Include rule. To learn how risk scores are calculated and how to configure risk behaviors, refer to [User risk score](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/).

## Authenticate a service using a service token

Automated services such as CI/CD pipelines, monitoring systems, and backend APIs need to access protected applications without an interactive login. Service Auth policies allow machine-to-machine communication by authenticating requests that present valid [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) headers. For additional security, you can restrict the token to requests from specific IP ranges, ensuring the token can only be used from known infrastructure.

Note

Before creating this policy, [create a service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/#create-a-service-token).

* [ Dashboard ](#tab-panel-5828)
* [ API ](#tab-panel-5829)
* [ Terraform ](#tab-panel-5830)

| Action       | Rule type | Selector      | Value            |
| ------------ | --------- | ------------- | ---------------- |
| Service Auth | Include   | Service Token | My service token |
| Require      | IP ranges | 192.0.2.0/24  |                  |

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Authenticate service with service token",

    "decision": "non_identity",

    "include": [

        {

            "service_token": {

                "token_id": "<SERVICE_TOKEN_ID>"

            }

        }

    ],

    "require": [

        {

            "ip": {

                "ip": "192.0.2.0/24"

            }

        }

    ]

  }'


```

Explain Code

To get the ID of your service token, use the [List service tokens](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/service%5Ftokens/methods/list/) endpoint.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:

```

resource "cloudflare_zero_trust_access_policy" "authenticate_service_with_token" {

  account_id = var.cloudflare_account_id

  name       = "Authenticate service with service token"

  decision   = "non_identity"

  include = [{

    service_token = {

      token_id = cloudflare_zero_trust_access_service_token.my_service_token.id

    }

  }]

  require = [{

    ip = {

      ip = "192.0.2.0/24"

    }

  }]

}


```

Explain Code

To configure the [cloudflare\_zero\_trust\_access\_service\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fservice%5Ftoken) resource referenced above, refer to [Service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/).

## Authenticate a service using mutual TLS

For environments that require certificate-based authentication, you can use [mutual TLS (mTLS)](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/) to verify that a connecting client presents a valid certificate with an expected identity. mTLS is useful for authenticating automated systems and IoT devices that do not use an identity provider, or as an additional authentication factor for team members who also log in through an IdP.

Note

Before creating this policy, [upload a certificate authority (CA)](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#add-mtls-authentication-to-your-access-configuration) to your Access configuration.

To restrict access to a specific client, use the **Common Name** selector to match the identity in the client certificate:

* [ Dashboard ](#tab-panel-5804)
* [ API ](#tab-panel-5805)
* [ Terraform ](#tab-panel-5806)

| Action       | Rule type | Selector    | Value    |
| ------------ | --------- | ----------- | -------- |
| Service Auth | Include   | Common Name | John Doe |

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Authenticate service with mTLS",

    "decision": "non_identity",

    "include": [

        {

            "common_name": {

                "common_name": "John Doe"

            }

        }

    ]

  }'


```

Explain Code

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:

```

resource "cloudflare_zero_trust_access_policy" "authenticate_service_with_mtls" {

  account_id = var.cloudflare_account_id

  name       = "Authenticate service with mTLS"

  decision   = "non_identity"

  include = [{

    common_name = {

      common_name = "John Doe"

    }

  }]

}


```

Explain Code

To allow any client presenting a valid certificate signed by your CA, use the **Valid Certificate** selector. This selector is useful when you trust all certificates issued by your CA and do not need to check a specific Common Name.

* [ Dashboard ](#tab-panel-5801)
* [ API ](#tab-panel-5802)
* [ Terraform ](#tab-panel-5803)

| Action       | Rule type | Selector          |
| ------------ | --------- | ----------------- |
| Service Auth | Include   | Valid Certificate |

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Authenticate service with valid certificate",

    "decision": "non_identity",

    "include": [

        {

            "certificate": {}

        }

    ]

  }'


```

Explain Code

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:

```

resource "cloudflare_zero_trust_access_policy" "authenticate_service_with_valid_certificate" {

  account_id = var.cloudflare_account_id

  name       = "Authenticate service with valid certificate"

  decision   = "non_identity"

  include = [{

    certificate = {}

  }]

}


```

## Require purpose justification for sensitive applications

For applications such as database admin tools, production consoles, or HR systems, you can require users to provide a written reason each time they access the application. This creates an audit trail that helps security teams understand why access was requested. The justification prompt appears after the user authenticates and before they reach the application. For more information, refer to [Require purpose justification](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/require-purpose-justification/).

* [ Dashboard ](#tab-panel-5834)
* [ API ](#tab-panel-5835)
* [ Terraform ](#tab-panel-5836)

| Action  | Rule type  | Selector                  | Value             |
| ------- | ---------- | ------------------------- | ----------------- |
| Allow   | Include    | Okta Groups               | IT Administrators |
| Require | Gateway    | Gateway                   |                   |
| Require | OS Version | Latest version of Windows |                   |

**Additional settings**: Turn on **Purpose justification**.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Require purpose justification for sensitive apps",

    "decision": "allow",

    "include": [

        {

            "okta": {

                "name": "IT Administrators",

                "identity_provider_id": "<OKTA_IDP_ID>"

            }

        }

    ],

    "require": [

        {

            "device_posture": {

                "integration_uid": "<GATEWAY_CHECK_ID>"

            }

        },

        {

            "device_posture": {

                "integration_uid": "<WINDOWS_VERSION_CHECK_ID>"

            }

        }

    ],

    "purpose_justification_required": true,

    "purpose_justification_prompt": "Please enter a justification for accessing this application."

  }'


```

Explain Code

Replace the `okta` rule with the [appropriate rule for your identity provider](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/policies/methods/create/). To get your identity provider ID, use the [List Access identity providers](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/identity%5Fproviders/methods/list/) endpoint. To get the integration UIDs for your device posture checks, use the [List device posture checks](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/devices/subresources/posture/methods/list/) endpoint.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:

```

resource "cloudflare_zero_trust_access_policy" "require_purpose_justification" {

  account_id                      = var.cloudflare_account_id

  name                            = "Require purpose justification for sensitive apps"

  decision                        = "allow"

  purpose_justification_required  = true

  purpose_justification_prompt    = "Please enter a justification for accessing this application."

  include = [{

    okta = {

      name                 = "IT Administrators"

      identity_provider_id = cloudflare_zero_trust_access_identity_provider.okta.id

    }

  }]

  require = [

    {

      device_posture = {

        integration_uid = cloudflare_zero_trust_device_posture_rule.gateway_check.id

      }

    },

    {

      device_posture = {

        integration_uid = cloudflare_zero_trust_device_posture_rule.windows_version.id

      }

    },

  ]

}


```

Explain Code

* Replace the `okta` rule with the appropriate [cloudflare\_zero\_trust\_access\_identity\_provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fidentity%5Fprovider) resource for your identity provider. To configure the identity provider resource, refer to [Identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/).
* To configure the [cloudflare\_zero\_trust\_device\_posture\_rule ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fposture%5Frule) resources referenced above, refer to [Device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

You can combine purpose justification with [temporary authentication](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/temporary-auth/) to additionally require approval from a designated reviewer before granting access.

## Bypass a public endpoint

Some applications have endpoints that must be publicly reachable, such as OAuth callback URLs, webhook receivers, or health check paths. You can create a Bypass policy scoped to a specific [application path](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/) to disable Access enforcement for that endpoint only. For example, if your application is `app.example.com`, you could create a separate Access application for `app.example.com/oauth/callback` and apply the following Bypass policy:

* [ Dashboard ](#tab-panel-5807)
* [ API ](#tab-panel-5808)
* [ Terraform ](#tab-panel-5809)

| Action | Rule type | Selector | Value    |
| ------ | --------- | -------- | -------- |
| Bypass | Include   | Everyone | Everyone |

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Apps and Policies Write`

Create an Access reusable policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Bypass public endpoint",

    "decision": "bypass",

    "include": [

        {

            "everyone": {}

        }

    ]

  }'


```

Explain Code

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Access: Apps and Policies Write`

Configure the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:

```

resource "cloudflare_zero_trust_access_policy" "bypass_public_endpoint" {

  account_id = var.cloudflare_account_id

  name       = "Bypass public endpoint"

  decision   = "bypass"

  include = [{

    everyone = {}

  }]

}


```

Warning

Bypass disables all Access security controls and request logging for matching traffic. Scope Bypass policies as narrowly as possible and never use them as a persistent access mechanism for users or services. If you need to allow automated traffic while maintaining authentication and logging, use a [Service Auth](#authenticate-a-service-using-a-service-token) policy instead.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/policies/","name":"Policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/policies/common-policies/","name":"Common policies"}}]}
```
