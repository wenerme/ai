# Compliance features for users

Compliance features.

- Tier: Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

GitLab compliance features for users ensure your GitLab groups and projects meet common compliance standards.

## Compliant workflow automation

It is important for compliance teams to be confident that their controls and
requirements are set up correctly, but also that they stay set up correctly.
One way of doing this is manually checking settings periodically, but this is
error prone and time consuming. A better approach is to use single-source-of-truth
settings and automation to ensure that whatever a compliance team has configured,
stays configured and working correctly. These features can help you automate
compliance:

| Feature                                                                                                                                  | Instances                            | Groups                               | Projects                             | Description |
|:-----------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------|:-------------------------------------|:-------------------------------------|:------------|
| [Compliance frameworks](compliance_frameworks/_index.md)                                                                      | No | Yes | No | Describe the type of compliance requirements projects must follow. |
| [Compliance pipelines](compliance_pipelines.md)                                                                                 | No | Yes | No | Define a pipeline configuration to run for any projects with a given compliance framework. |
| [Merge request approval policy approval settings](../application_security/policies/merge_request_approval_policies.md#approval_settings) | Yes | Yes | Yes | Enforce a merge request approval policy enforcing multiple approvers and override various project settings in all enforced groups or projects across your GitLab instance or group. |

## Audit management

An important part of any compliance program is being able to go back and understand
what happened, when it happened, and who was responsible. You can use this in audit
situations as well as for understanding the root cause of issues when they occur.

It is helpful to have both low-level, raw lists of audit data as well as high-level,
summary lists of audit data. Between these two, compliance teams can quickly
identify if problems exist and then drill down into the specifics of those issues.
These features can help provide visibility into GitLab and audit what is happening:

| Feature                                           | Instances                            | Groups                               | Projects                             | Description |
|:--------------------------------------------------|:-------------------------------------|:-------------------------------------|:-------------------------------------|:------------|
| [Audit events](audit_events.md)                   | Yes | Yes | Yes | To maintain the integrity of your code, audit events give administrators the ability to view any modifications made in the GitLab server in an advanced audit events system, so you can control, analyze, and track every change. |
| [Audit reports](audit_events.md)                  | Yes | Yes | Yes | Create and access reports based on the audit events that have occurred. Use pre-built GitLab reports or the API to build your own. |
| [Audit event streaming](audit_event_streaming.md) | Yes | Yes | Yes | Stream GitLab audit events to an HTTP endpoint or third party service, such as AWS S3 or GCP Logging. |
| [Compliance center](compliance_center/_index.md)  | No | Yes | Yes | Quickly get visibility into the compliance posture of your organization through compliance standards adherence reporting and violations reports. Manage your groups compliance frameworks centrally. |

## Policy management

Organizations have unique policy requirements, either due to organizational
standards or mandates from regulatory bodies. The following features help you
define rules and policies to adhere to workflow requirements, separation of duties,
and secure supply chain best practices:

| Feature                                                                                                                                                                                                                                                                | Instances                            | Groups                               | Projects                             | Description |
|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------|:-------------------------------------|:-------------------------------------|:------------|
| [Granular user rolesand flexible permissions](../permissions.md)                                                                                                                                                                                                  | Yes | Yes | Yes | Manage access and permissions with five different user roles and settings for external users. Set permissions according to people's role, rather than either read or write access to a repository. Don't share the source code with people that only need access to the issue tracker. |
| [Merge request approvals](../project/merge_requests/approvals/_index.md)                                                                                                                                                                                               | Yes | Yes | Yes | Configure approvals required for merge requests. |
| [Push rules](../project/repository/push_rules.md)                                                                                                                                                                                                                      | Yes | Yes | Yes | Control pushes to your repositories. |
| Separation of duties using[protected branches](../project/repository/branches/protected.md#require-code-owner-approval) and[custom CI/CD configuration paths](../../ci/pipelines/settings.md#specify-a-custom-cicd-configuration-file) | No | No | Yes | Leverage the GitLab cross-project YAML configurations to define deployers of code and developers of code. See how to use this setup to define these roles in the [Separation of Duties deploy project](https://gitlab.com/guided-explorations/separation-of-duties-deploy/blob/master/README.md) and the [Separation of Duties project](https://gitlab.com/guided-explorations/separation-of-duties/blob/master/README.md). |
| [Security policies](../application_security/policies/_index.md)                                                                                                                                                                                                        | Yes | Yes | Yes | Configure customizable policies that require merge request approval based on policy rules, or enforce security scanners to execute in project pipelines for compliance requirements. Policies can be enforced granularly against specific projects, or all projects in a group or subgroup. |

## Other compliance features

These features can also help with compliance requirements:

| Feature                                                                                                                        | Instances                            | Groups                               | Projects                             | Description |
|:-------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------|:-------------------------------------|:-------------------------------------|:------------|
| [External status checks](../project/merge_requests/status_checks.md)                                                           | No | No | Yes | Interface with third-party systems you already use during development to ensure you remain compliant. |
| [License approval policies](license_approval_policies.md)                                                                      | No | No | Yes | Search dependencies for their licenses. This lets you determine if the licenses of your project's dependencies are compatible with your project's license. |
| [Lock project membership to group](../group/access_and_permissions.md#prevent-members-from-being-added-to-projects-in-a-group) | No | Yes | No | Group owners can prevent new members from being added to projects in a group. |

## Related topics

- [Software Compliance with GitLab](https://about.gitlab.com/solutions/compliance/)
- [Secure GitLab](../../security/_index.md)
- [Compliance features for administrators](../../administration/compliance/compliance_features.md)
