# Password maintenance Rake tasks

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed

GitLab provides Rake tasks for managing passwords.

## Reset passwords

To reset a password using a Rake task, see [reset user passwords](../../security/reset_user_password.md#use-a-rake-task).

## Check password hashes

Starting with GitLab 17.11, the salts of password hashes on FIPS instances
are increased when a user signs in.

Non FIPS instances started to use a updated bcrypt work factor in
GitLab 17.9.

You can check how many users have a unmigrated password hashes:

```shell
# omnibus-gitlab
sudo gitlab-rake gitlab:password:check_hashes:[true]

# installation from source
bundle exec rake gitlab:password:check_hashes:[true] RAILS_ENV=production
```

> [!note]
> Prior to GitLab 18.6, this task was available as `gitlab:password:fips_check_salts`
> and was limited to FIPS/PBKDF2 hash validation. The task has been renamed to `:check_hashes`
> and now checks for all password migrations, while the old name remains as an alias.
