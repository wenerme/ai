# OpenTofu integration in merge requests

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

Collaborating around Infrastructure as Code (IaC) changes requires both code changes and expected infrastructure changes to be checked and approved. GitLab provides a solution to help collaboration around OpenTofu code changes and their expected effects using the merge request pages. This way users don't have to build custom tools or rely on third-party solutions to streamline their IaC workflows.

## Output OpenTofu Plan information into a merge request

Using the [GitLab Terraform/OpenTofu Report artifact](../../../ci/yaml/artifacts_reports.md#artifactsreportsterraform),
you can expose details from `tofu plan` runs directly into a merge request widget,
enabling you to see statistics about the resources that OpenTofu creates,
modifies, or destroys.

> [!warning]
> OpenTofu plan data is a job artifact.
> Who can view it depends on the
> [`artifacts:access`](../../../ci/yaml/_index.md#artifactsaccess) setting of the job that creates it.
> Neither OpenTofu nor GitLab encrypts the plan file by default.
> If your OpenTofu `plan.json` or `plan.cache` files include sensitive data like passwords,
> access tokens, or certificates, you should encrypt the plan output or restrict access
> to the artifacts with `artifacts:access`.
> You should also disable
> [public pipelines](../../../ci/pipelines/settings.md#change-pipeline-visibility-for-non-project-members-in-public-projects).

### Permissions to view OpenTofu plan information

- [Changed](https://about.gitlab.com/releases/2026/10/12/patch-release-gitlab-19-4-2-released/) to show only the reports you can download in GitLab 19.2.8, 19.3.5, 19.4.2, and 19.5.

The merge request widget shows plan information only from OpenTofu report artifacts
that you can download.
The `artifacts:access` setting of the plan job controls who can download them.
If the job doesn't set `artifacts:access`, the default is `all`.

| `artifacts:access` | Who can see the artifacts                           |
|--------------------|-----------------------------------------------------|
| `all`              | Users who can view the pipeline                     |
| `developer`        | Users with the Developer, Maintainer, or Owner role |
| `maintainer`       | Users with the Maintainer or Owner role             |
| `none`             | No users                                            |

If you can't download any of the OpenTofu report artifacts in the pipeline,
the widget shows `0 Terraform reports failed to generate` and no plan information.

The OpenTofu CI/CD component sets `artifacts:access` to `none` for plan jobs by default.
To show plan information in merge requests, set the access input of the component
to `developer` or `maintainer`.
For example, with the `validate-plan-apply` template:

```yaml
include:
  - component: $CI_SERVER_FQDN/components/opentofu/validate-plan-apply@<VERSION>
    inputs:
      opentofu_version: <OPENTOFU_VERSION>
      plan_artifacts_access: developer
```

The input name depends on the template.
For example, `validate-plan-apply` and `job-templates` use `plan_artifacts_access`,
and `plan` and `validate-plan` use `artifacts_access`.
The access setting also applies to the `plan.cache` file, which can contain sensitive data.

## Configure OpenTofu report artifacts

GitLab [integrates with OpenTofu](_index.md#quickstart-an-opentofu-project-in-pipelines)
through the OpenTofu CI/CD component. This component uses GitLab-managed OpenTofu state to display OpenTofu changes on merge requests.

### Automatically configure OpenTofu report artifacts

You should use the [OpenTofu CI/CD component](https://gitlab.com/components/opentofu), which automatically configures the OpenTofu report artifacts in the `plan` jobs.

### Manually configure OpenTofu report artifacts

For a quick setup, you should customize the pre-built image and rely on the `gitlab-tofu` helper.

To manually configure a GitLab OpenTofu Report artifact:

1. Define reusable variables to
   refer to these files multiple times:

   ```yaml
   variables:
     PLAN: plan.cache
     PLAN_JSON: plan.json
   ```

1. Install `jq`, a
   [lightweight and flexible command-line JSON processor](https://stedolan.github.io/jq/).
1. Create an alias for a specific `jq` command that parses out the information you
   want to extract from the `tofu plan` output:

   ```yaml
   before_script:
     - apk --no-cache add jq
     - alias convert_report="jq -r '([.resource_changes[]?.change.actions?]|flatten)|{\"create\":(map(select(.==\"create\"))|length),\"update\":(map(select(.==\"update\"))|length),\"delete\":(map(select(.==\"delete\"))|length)}'"
   ```

   > [!note]
   > In distributions that use Bash (for example, Ubuntu), `alias` statements are not
   > expanded in non-interactive mode. If your pipelines fail with the error
   > `convert_report: command not found`, alias expansion can be activated explicitly
   > by adding a `shopt` command to your script:

   ```yaml
   before_script:
     - shopt -s expand_aliases
     - alias convert_report="jq -r '([.resource_changes[]?.change.actions?]|flatten)|{\"create\":(map(select(.==\"create\"))|length),\"update\":(map(select(.==\"update\"))|length),\"delete\":(map(select(.==\"delete\"))|length)}'"
   ```

1. Define a `script` that runs `tofu plan` and `tofu show`. These commands
   pipe the output and convert the relevant bits into a store variable `PLAN_JSON`.
   This JSON is used to create a
   [GitLab OpenTofu Report artifact](../../../ci/yaml/artifacts_reports.md#artifactsreportsterraform).
   The OpenTofu report obtains an OpenTofu `tfplan.json` file. The collected
   OpenTofu plan report is uploaded to GitLab as an artifact, and is shown in merge requests.

   ```yaml
   plan:
     stage: build
     script:
       - terraform plan -out=$PLAN
       - terraform show -json $PLAN | convert_report > $PLAN_JSON
     artifacts:
       reports:
         terraform: $PLAN_JSON
   ```

1. Run the pipeline to display the widget in the merge request, like this:

   [merge request Terraform widget]

   > [!note]
   > The maximum number of changes reported by the widget is 999,999 for
   > each action. This limitation is only for display purposes, plans that
   > change a higher number of resources can be applied as intended.

1. In the widget, select **View Full Log** to go to the
   plan output present in the pipeline logs:

   [Terraform plan logs]
