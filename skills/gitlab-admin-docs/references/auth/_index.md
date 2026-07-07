# User identity

Authentication methods such as LDAP, OmniAuth, SAML, SCIM, OIDC, and OAuth

GitLab integrates with a number of third party tools and protocols to better support authentication and authorization.

Connect GitLab to your organization's existing identity infrastructure to centralize user
management and enforce security policies. You can integrate with LDAP, SAML, OAuth, or SCIM
identity providers and directory services for authentication and authorization.

On GitLab Self-Managed and GitLab Dedicated, administrators can integrate with identity providers
like Active Directory, Google Workspace, or Azure AD to automatically provision users, sync group
memberships, and enable single sign-on. GitLab.com groups can also integrate with SAML identity
providers for centralized authentication and user provisioning.

Choose from multiple integration methods based on your organization's needs:

- LDAP for directory synchronization
- SAML for single sign-on
- OAuth for third-party authentication
- SCIM for automated user provisioning and deprovisioning

## Core concepts

- [LDAP](ldap/_index.md)
- [OmniAuth](../../integration/omniauth.md)
- [SAML](../../integration/saml.md)
- [SAML Group Sync](../../user/group/saml_sso/group_sync.md)
- [SCIM](../settings/scim_setup.md)

## GitLab.com compared to GitLab Self-Managed

The external authentication and authorization providers may support the following capabilities.
For more information, see the links shown on this page for each external provider.

| Capability                                      | GitLab.com                              | GitLab Self-Managed                       |
|-------------------------------------------------|-----------------------------------------|------------------------------------|
| **User Provisioning**                           | SCIMSAML <sup>1</sup> | LDAP <sup>1</sup>SAML <sup>1</sup>[OmniAuth Providers](../../integration/omniauth.md#supported-providers) <sup>1</sup>SCIM  |
| **User Detail Updating** (not group management) | Not Available                           | LDAP Sync                          |
| **Authentication**                              | SAML at top-level group (1 provider)    | LDAP (multiple providers)Generic OAuth 2.0SAML (only 1 permitted per unique provider)KerberosJWTSmart card[OmniAuth Providers](../../integration/omniauth.md#supported-providers) (only 1 permitted per unique provider) |
| **Provider-to-GitLab Role Sync**                | SAML Group Sync                         | LDAP Group SyncSAML Group Sync ([GitLab 15.1](https://gitlab.com/gitlab-org/gitlab/-/issues/285150) and later) |
| **User Removal**                                | SCIM (remove user from top-level group) | LDAP (remove user from groups and block from the instance)SCIM |

**Footnotes**:

1. Using Just-In-Time (JIT) provisioning, user accounts are created when the user first signs in.
