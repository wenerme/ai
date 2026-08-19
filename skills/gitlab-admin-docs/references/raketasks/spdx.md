# SPDX license list import Rake task

Import the SPDX license list into GitLab, enabling accurate license matching for compliance policies

- Tier: Ultimate
- Offering: GitLab Self-Managed

GitLab provides a Rake task for uploading a fresh copy of the [SPDX license list](https://spdx.org/licenses/)
to a GitLab instance. This list is needed for matching the names of [license approval policies](../../user/compliance/license_approval_policies.md).

To import a fresh copy of the SPDX license list, run:

```shell
# omnibus-gitlab
sudo gitlab-rake gitlab:spdx:import

# source installations
bundle exec rake gitlab:spdx:import RAILS_ENV=production
```

To perform this task in the [offline environment](../../user/application_security/offline_deployments/_index.md#defining-offline-environments),
an outbound connection to [`licenses.json`](https://spdx.org/licenses/licenses.json) should be
allowed.
