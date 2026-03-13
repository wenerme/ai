---
date: "2019-04-05T16:00:00+02:00"
slug: "faq"
sidebar_position: 5
aliases:
  - /en-us/faq
---

# FAQ

This page contains some common questions and answers.

For more help resources, check all [Support Options](help/support.md).

## Difference between 1.x and 1.x.x downloads, how can I get latest stable release with bug fixes?

Version 1.20.x will be used for this example.

On our [downloads page](https://dl.gitea.com/gitea/) you will see a 1.20 directory, as well as directories for 1.20.0, 1.20.1.

The 1.20 directory is the nightly build, which is built on each merged commit to the [`release/v1.20`](https://github.com/go-gitea/gitea/tree/release/v1.20) branch.

The 1.20.0 directory is a release build that was created when the [`v1.20.0`](https://github.com/go-gitea/gitea/releases/tag/v1.20.0) tag was created.

The nightly builds (1.x) downloads will change as commits are merged to their respective branch, they contain the latest changes/fixes before a tag release is built.

If a bug fix is targeted on 1.20.1 but 1.20.1 is not released yet, you can get the "1.20-nightly" build to get the bug fix.

## How to find the config file "app.ini"

It depends on how you installed Gitea. If you didn't set a path for custom path or config file manually,
then the config file (app.ini) should exists in the "custom/conf" directory of your Gitea's working path.
Some package vendors might use "/etc/gitea" to store the config file, while some others don't.

You could manually find the config file (app.ini) by checking Gitea's startup logs
or reading the Gitea Web's Site Administrator -> Confugiraton Summary.

If you are using some isolated enviroments like container (docker),
the path you see usually is not what it is in the host's filesystem.
In this case you need to check the container's filesystem volume mapping
and figure out the real path of the config file on the host.

## Where does Gitea store what file

- _`AppWorkPath`_
  - The `WORK_PATH` option in `app.ini`
  - Else the `--work-path` flag
  - Else Environment variable `GITEA_WORK_DIR`
  - Else a built-in value set at build time
  - Else the directory that contains the Gitea binary
- `AppDataPath` (default for database, indexers, etc.)
  - `APP_DATA_PATH` from `app.ini`
  - Else _`AppWorkPath`_`/data`
- _`CustomPath`_ (custom templates)
  - The `--custom-path` flag
  - Else Environment variable `GITEA_CUSTOM`
  - Else a built-in value set at build time
  - Else _`AppWorkPath`_`/custom`
- HomeDir
  - Unix: Environment variable `HOME`
  - Windows: Environment variable `USERPROFILE`, else environment variables `HOMEDRIVE`+`HOMEPATH`
- RepoRootPath
  - `ROOT` in the \[repository] section of `app.ini` if absolute
  - Else _`AppWorkPath`_`/ROOT` if `ROOT` in the \[repository] section of `app.ini` if relative
  - Default `%(APP_DATA_PATH)/gitea-repositories`
- INI (config file)
  - `--config` flag
  - A possible built-in value set a build time
  - Else _`CustomPath`_`/conf/app.ini`
- SQLite Database
  - `PATH` in `database` section of `app.ini`
  - Else `%(APP_DATA_PATH)/gitea.db`

## Not seeing a clone URL or the clone URL being incorrect

There are a few places that could make this show incorrectly.

1. If using a reverse proxy, make sure you have followed the correction directions in the [reverse proxy guide](../administration/reverse-proxies.md)
2. Make sure you have correctly set `ROOT_URL` in the `server` section of your `app.ini`

If certain clone options aren't showing up (HTTP/S or SSH), the following options can be checked in your `app.ini`

- `DISABLE_HTTP_GIT`: if set to true, there will be no HTTP/HTTPS link
- `DISABLE_SSH`: if set to true, there will be no SSH link
- `SSH_EXPOSE_ANONYMOUS`: if set to false, SSH links will be hidden for anonymous users

## File upload fails with: 413 Request Entity Too Large

This error occurs when the reverse proxy limits the file upload size.

See the [reverse proxy guide](../administration/reverse-proxies.md) for a solution with nginx.

## Custom Templates not loading or working incorrectly

Gitea's custom templates must be added to the correct location or Gitea will not find and use them.

The correct path for the template(s) will be relative to the `CustomPath`

1. To find `CustomPath`, look for Custom File Root Path in Site Administration -> Configuration
2. If you are still unable to find a path, the default can be [calculated above](#where-does-gitea-store-what-file)
3. Once you have figured out the correct custom path, you can refer to the [customizing Gitea](../administration/customizing-gitea.md) page to add your template to the correct location.

## Does Gitea have a "GitHub/GitLab pages" feature?

Gitea doesn't provide a built-in Pages server. You need a dedicated domain to serve static pages to avoid CSRF security risks.

For simple usage, you can use a reverse proxy to rewrite & serve static contents from Gitea's raw file URLs.

And there are already available third-party services, like a standalone [pages server](https://codeberg.org/Codeberg/pages-server) or a [caddy plugin](https://github.com/42wim/caddy-gitea), that can provide the required functionality.

## Active user vs login prohibited user

In Gitea, an "active" user refers to a user that has activated their account via email.

A "login prohibited" user is a user that is not allowed to log in to Gitea anymore


## What is Swagger?

[Swagger](https://swagger.io/) is what Gitea uses for its API documentation.

All Gitea instances have the built-in API and there is no way to disable it completely.
You can, however, disable showing its documentation by setting `ENABLE_SWAGGER` to `false` in the `api` section of your `app.ini`.
For more information, refer to Gitea's [API docs](development/api-usage.md).

You can see the latest API (for example) on https://gitea.com/api/swagger

You can also see an example of the `swagger.json` file at https://gitea.com/swagger.v1.json

## Adjusting your server for public/private use

### Preventing spammers

There are multiple things you can combine to prevent spammers.

1. By whitelisting or blocklisting certain email domains
2. By only whitelisting certain domains with OpenID (see below)
3. Setting `ENABLE_CAPTCHA` to `true` in your `app.ini` and properly configuring `RECAPTCHA_SECRET` and `RECAPTCHA_SITEKEY`
4. Settings `DISABLE_REGISTRATION` to `true` and creating new users via the [CLI](../administration/command-line.md), [API](development/api-usage.md), or Gitea's Admin UI

### Only allow/block certain email domains

You can configure `EMAIL_DOMAIN_WHITELIST` or `EMAIL_DOMAIN_BLOCKLIST` in your app.ini under `[service]`

### Only allow/block certain OpenID providers

You can configure `WHITELISTED_URIS` or `BLACKLISTED_URIS` under `[openid]` in your `app.ini`

:::note
Whitelisted takes precedence, so if it is non-blank then blacklisted is ignored.
:::

### Issue only users

The current way to achieve this is to create/modify a user with a max repo creation limit of 0.

### Restricted users

Restricted users are limited to a subset of the content based on their organization/team memberships and collaborations, ignoring the public flag on organizations/repos etc.\_\_

Example use case: A company runs a Gitea instance that requires login. Most repos are public (accessible/browsable by all co-workers).

At some point, a customer or third party needs access to a specific repo and only that repo. Making such a customer account restricted and granting any needed access using team membership(s) and/or collaboration(s) is a simple way to achieve that without the need to make everything private.

### Enable Fail2ban

Use [Fail2Ban](../administration/fail2ban-setup.md) to monitor and stop automated login attempts or other malicious behavior based on log patterns

## SSHD vs built-in SSH

SSHD is the built-in SSH server on most Unix systems.

Gitea also provides its own SSH server, for usage when SSHD is not available.

## Translation is incorrect/how to add more translations

Our translations are currently crowd-sourced on our [Crowdin project](https://crowdin.com/project/gitea)

Whether you want to change a translation or add a new one, it will need to be there as all translations are overwritten in our CI via the Crowdin integration.

## Push Hook / Webhook / Actions aren't running

If you can push but can't see push activities on the home dashboard, or the push doesn't trigger webhook and Actions workflows, it's likely that the git hooks are not working.

There are a few possibilities:

1. The git hooks are out of sync. Run the following actions on the site admin panel:
- "Sync missed branches from git data to databases"
- "Sync tags from git data to database"
- "Resynchronize pre-receive, update and post-receive hooks of all repositories"
2. The git repositories (and hooks) are stored on some filesystems (ex: mounted by NAS) which don't support script execution, make sure the filesystem supports `chmod a+x any-script`. Also make sure that the filesystem of the repositories is not mounted with the `noexec` option.
3. If you are using docker, make sure Docker Server (not the client) >= 20.10.6

## SSH issues

If you cannot reach repositories over `ssh`, but `https` works fine, consider looking into the following.

First, make sure you can access Gitea via SSH.

`ssh git@myremote.example`

If the connection is successful, you should receive an error message like the following:

```
Hi there, You've successfully authenticated, but Gitea does not provide shell access.
If this is unexpected, please log in with password and setup Gitea under another user.
```

If you do not get the above message but still connect, it means your SSH key is **not** being managed by Gitea. This means hooks won't run, among other potential problems.

If you cannot connect at all, your SSH key may not be configured correctly locally.
This is specific to SSH and not Gitea, so will not be covered here.

### SSH Common Errors

```
Permission denied (publickey).
fatal: Could not read from remote repository.
```

This error signifies that the server rejected a log in attempt, check the
following things:

- On the client:
  - Ensure the public and private ssh keys are added to the correct Gitea user.
  - Make sure there are no issues in the remote url. In particular, ensure the name of the
    Git user (before the `@`) is spelled correctly.
  - Ensure public and private ssh keys are correct on client machine.
- On the server:
  - Make sure the repository exists and is correctly named.
  - Check the permissions of the `.ssh` directory in the system user's home directory.
  - Verify that the correct public keys are added to `.ssh/authorized_keys`.

    Try to run `Rewrite '.ssh/authorized_keys' file (for Gitea SSH keys)` on the
    Gitea admin panel.
  - Read Gitea logs.
  - Read /var/log/auth (or similar).
  - Check permissions of repositories.

The following is an example of a missing public SSH key where authentication
succeeded, but some other setting is preventing SSH from reaching the correct
repository.

```
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

In this case, look into the following settings:

- On the server:
  - Make sure that the `git` system user has a usable shell set
    - Verify this with `getent passwd git | cut -d: -f7`
    - `usermod` or `chsh` can be used to modify this.
  - Ensure that the `gitea serv` command in `.ssh/authorized_keys` uses the
    correct configuration file.

## Missing releases after migrating repository with tags

To migrate an repository _with_ all tags, you need to do two things:

- Push tags to the repository:

```
 git push --tags
```

- (Re-)sync tags of all repositories within Gitea:

```
gitea admin repo-sync-releases
```

## How can I create users before starting Gitea

Gitea provides a sub-command `gitea migrate` to initialize the database, after which you can use the [admin CLI commands](../administration/command-line.md#admin) to add users like normal.

## How can I enable password reset

There is no setting for password resets. It is enabled when a [mail service](../administration/email-setup.md) is configured, and disabled otherwise.

## How can a user's password be changed

- As an **admin**, you can change any user's password (and optionally force them to change it on next login)...
  - By navigating to your `Site Administration -> User Accounts` page and editing a user.
  - By using the [admin CLI commands](../administration/command-line.md#admin).

    Keep in mind most commands will also need a [global flag](../administration/command-line.md#global-options) to point the CLI at the correct configuration.
- As a **user** you can change it...
  - In your account `Settings -> Account` page (this method **requires** you to know your current password).
  - By using the `Forgot Password` link.

    If the `Forgot Password/Account Recovery` page is disabled, please contact your administrator to configure a [mail service](../administration/email-setup.md).

## Warnings about struct defaults during database startup

Sometimes when there are migrations the old columns and default values may be left
unchanged in the database schema. This may lead to warning such as:

```
2020/08/02 11:32:29 ...rm/session_schema.go:360:Sync() [W] Table user Column keep_activity_private db default is , struct default is 0
```

These can safely be ignored, but you are able to stop these warnings by getting Gitea to recreate these tables using:

```
gitea doctor recreate-table user
```

This will cause Gitea to recreate the user table and copy the old data into the new table
with the defaults set appropriately.

You can ask Gitea to recreate multiple tables using:

```
gitea doctor recreate-table table1 table2 ...
```

And if you would like Gitea to recreate all tables simply call:

```
gitea doctor recreate-table
```

It is highly recommended to back-up your database before running these commands.

## How to adopt repositories from disk

- Add your (bare) repositories to the correct spot for your configuration (`repository.ROOT`), ensuring they are in the correct layout `<REPO_ROOT>/[user]/[repo].git`.
  - **Note:** the directory names must be lowercase.
  - You can also check `<ROOT_URL>/-/admin/config` for the repository root path.
- Ensure that the user/org exists that you want to adopt repositories for.
- As an admin, go to `<ROOT_URL>/-/admin/repos/unadopted` and search.
  - Users can also be given similar permissions via config [`ALLOW_ADOPTION_OF_UNADOPTED_REPOSITORIES`](../administration/config-cheat-sheet.md#repository-repository).
- If the above steps are done correctly, you should be able to select repositories to adopt.
  - If no repositories are found, enable [debug logging](../administration/config-cheat-sheet.md#repository-repository) to check for any specific errors.

## Gitea can't start on NFS

In most cases, it's caused by broken NFS lock system. You can try to stop Gitea process and
run `flock -n /data-nfs/gitea/queues/LOCK echo 'lock acquired'` to see whether the lock can be acquired immediately.
If the lock can't be acquired, NFS might report some errors like `lockd: cannot monitor node-3, statd: server rpc.statd not responding, timed out` in its server logs.

Then the NFS lock could be reset by:

```bash
# /etc/init.d/nfs stop
# rm -rf /var/lib/nfs/sm/*
# /etc/init.d/nfs start
```
