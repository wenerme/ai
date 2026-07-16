# SAML

Customers can opt to enable SAML for their workspace to manage logins through an Identity Provider.

> [!NOTE]
> Available to workspaces on our [Enterprise](https://linear.app/pricing) plan

![Login screen on the Linear desktop app](https://webassets.linear.app/images/ornj730p/production/8f3cc06f38271644cc9bbe3868f3c18e66b09807-2160x1327.png?q=95&auto=format&dpr=2)

## Overview

We support most identity providers (Okta, Entra, OneLogin, LastPass, Auth0, Bitum, etc.)

Once SAML is enabled, members on SAML-approved domains will be required to login via SAML by default, while you can allow other login types for users on other domains.

User sessions won't be logged out or notified at the time of enabling, but affected users will need to sign in with SAML from that point on.

Members can login via your identity provider's website or by clicking the option to **Continue with SAML SSO** on the login page.

Guests who are invited directly to a workspace can sign in using email or another authentication method available to them. Authentication requirements differ for guests managed through an identity provider. Guests provisioned through SCIM must sign in using that provider; they cannot use email-based authentication to access the workspace.

Login method restrictions do not apply to guests invited directly to the workspace. Guests managed through an identity provider remain subject to that provider's authentication requirements.

> [!NOTE]
> Admins and Owners may be able to log in through other methods to prevent lockouts, depending on the workspace's authentication settings.

## Configure

1. Navigate to [Settings > Administration > Security](https://linear.app/settings/security)_._
2. Under the "Authentication methods" section, click **Configure** next to "SAML & SCIM".
3. Enter the requested details from Linear into your IdP and press "Continue"
4. You can paste in an XML URL or the raw XML text to complete the configuration with your identity provider. If you're not sure where to find this in your identity provider, take a look at their documentation or reach out to us for help.

You can make changes to your configuration later on from `...` > **Edit Configuration** within the SAML authentication & SCIM provisioning settings page.

If you need to update the XML URL or metadata from your IdP, just press `Continue` past the Linear-side configuration details to reach this page.

![The second page of Linear's SAML Configuration steps where the XML data can be added or replaced](https://webassets.linear.app/images/ornj730p/production/7e23e9cf4438fc46f0b07cf5b8896480d24a619e-1058x670.png?q=95&auto=format&dpr=2)

If you want to add our logo in your Identity Provider, our Brand Assets are available for download [here](https://linear.app/brand).

### Okta

* [Okta Documentation](https://support.okta.com/help/s/article/How-To-Configure-A-Custom-SAML-App)
* In the Okta Admin page, navigate to Applications > Create App Integration >  SAML 2.0 and enter the name and optional logo for your Linear application.
* Ensure to enter the ACS URL from Linear as the Single sign-on URL in Okta - this URL ends with /acs
* Copy Metadata URL from the Sign on settings to paste into Linear’s metadata URL field

### Microsoft Entra ID

* [Entra ID Documentation](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal)
* From Microsoft Entra ID, select Enterprise Applications > New Application > Create your own application and give it a name > Set up single sign on to enter the data from Linear
* Edit “Attributes & Claims” to set the NameID to Email Address format for Linear
* Download the Federation Metadata XML file and copy the contents to paste into Linear’s metadata XML field

### Google Workspace

* [Google Documentation](https://support.google.com/a/answer/6087519?hl=en)
* Navigate to Apps > Web and mobile apps > Add app > Add custom SAML app to create the application
* Download Metadata from the left-hand sidebar and copy the contents to paste into Linear’s metadata XML field

### OneLogin

* [OneLogin Documentation](https://onelogin.service-now.com/support?id=kb_article&sys_id=ae7b78451b6606509a47ec29b04bcb15&kb_category=50984e84db738300d5505eea4b961913)
* OneLogin Admin > **Applications** > Add App > choose a **SAML connector** (e.g. SAML Custom Connector) > Configure

## Multi-SAML Setup

If you're working with multiple IdPs, you can add additional configurations from the `+` Icon beside Connected identity providers in your SAML settings. Each IdP can be associated with one or more domains to determine which IdP each user needs to authenticate with.

## Just-in-Time Provisioning

When a new user signs in via SAML for the first time, Linear creates the account using the data provided by your IdP. After the account exists, later SAML logins won't overwrite profile details.

**The following properties are set during account creation:**

* **Name**: taken from `name` attribute if it exists. If not, created from `firstName` and `lastName` attributes combined or else drawn from `displayName`.
* **Email:** taken from the SAML `NameID` which must be a valid email address
* **Avatar (profile image):** taken from any of  `avatarurl || photo || picture || profilepicture || profilephoto`
* **Username:** Generated from the supplied Name (as detailed above) or email address if no name is provided. This value must be unique and numbers will be appended if an existing user has this username already.

> [!NOTE]
> User profile fields are only populated **during initial account creation**. Subsequent SAML logins do **not** update the user’s profile automatically; changes can be made in Linear or via SCIM provisioning if enabled.

## Domain Management

### Allowed domains

Once you have configured your settings for an IdP, you'll need to add approved domains for this IdP under the settings for **SAML-approved email domains**. You will need to add a TXT code to your DNS record to claim this domain.

Please reach out to support@linear.app if you have any trouble claiming a domain, or if you are working across multiple workspaces.

### Other auth methods for other domains

You can choose to allow non-SAML logins only for other email domains, if you are working with contractors or other members that don't have accounts in your IdP.

### Disable new workspace creation

Once SAML is enabled, you have the option to prevent non-admins from creating new Linear workspaces with their email credential from the domain you claimed during setup. This can be useful to make sure all work is consolidated in a single Linear workspace.

## FAQ

<details>
<summary>I get an error when logging in. Can you help?</summary>
If SAML is enabled for your workspace, some users may be required to sign in through SAML. If you see **Login method not allowed**, you should try signing in through the workspace's SAML identity provider using **Continue with SAML SSO**.

If you get repeated errors, please [contact support](https://linear.app/docs/tutorials#contact-us).
</details>

<details>
<summary>How can I add new users?</summary>
For [SAML-enabled Workspaces](https://linear.app/docs/saml-and-access-control), you can still invite Members as normal from Linear's side. However, you'll need to make sure that members are given access in your identity provider (IdP) in order to log in.

New members who login successfully with SSO will be automatically provisioned using Just-In-Time (JIT) provisioning and an account will be created for them.
</details>

<details>
<summary>Do you support SCIM? (System for Cross-domain Identity Management)</summary>
We support enabling SCIM 2.0 for you on the Enterprise plan if you have SAML enabled. More details [here](https://linear.app/docs/scim).
</details>

<details>
<summary>How can I add Guests?</summary>
Even when SAML is enabled, Guests may be invited to Linear manually. Guests invited directly to the workspace can sign in with email or another available sign-in method. Guests managed through an identity provider must sign in through that provider if this is required for their domain.

![Security > Allow other authentication methods for all additional email domains > On](https://webassets.linear.app/images/ornj730p/production/c85fef522711eac3e180daedcb57d89c4767625b-797x528.png?q=95&auto=format&dpr=2)
</details>
