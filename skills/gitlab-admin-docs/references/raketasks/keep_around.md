# Keep-around orphaned reference Rake task

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed

- Improvements to Rake task [introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/475246) in GitLab 18.4.

`gitlab:keep_around:orphaned` generates a CSV report of every keep-around reference in the project repository and every database reference to a Git commit.

The CSV report has three columns:

- The type of reference. Either `keep` for a keep-around reference or `usage` for a database reference.
- The Git commit ID.
- The source of the reference if known. For example, `Pipeline`.

## Run orphaned reference report

### Linux package (Omnibus)

```shell
sudo gitlab-rake gitlab:keep_around:orphaned PROJECT_PATH=project/path FILENAME=/tmp/report.csv
```

### Self-compiled (source)

```shell
bundle exec rake gitlab:keep_around:orphaned RAILS_ENV=production PROJECT_PATH=project/path FILENAME=/tmp/report.csv
```
