---
date: "2019-08-17T10:20:00+01:00"
slug: "signing"
sidebar_position: 50
aliases:
  - /en-us/signing
---

# GPG/SSH Commit Signatures

Gitea will verify gpg/ssh commit signatures in the provided tree by
checking if the commits are signed by a key within the Gitea database,
or if the commit matches the default key for Git.

Additionally Gitea will verify commits signed by ssh keys, which public keys are part of [`TRUSTED_SSH_KEYS`](#general-configuration).

Keys are not checked to determine if they have expired or revoked.
Keys are also not checked with keyservers.

A commit will be marked with a grey unlocked icon if no key can be
found to verify it. If a commit is marked with a red unlocked icon,
it is reported to be signed with a key with an id.

:::note
The signer of a commit does not have to be an author or
committer of a commit.
:::

## Automatic Signing

There are a number of places where Gitea will generate commits itself:

- Repository Initialisation
- Wiki Changes
- CRUD actions using the editor or the API
- Merges from Pull Requests

Depending on configuration and server trust you may want Gitea to
sign these commits.

## Installing and generating a GPG key for Gitea

It is up to a server administrator to determine how best to install
a signing key. Gitea generates all its commits using the server `git`
command at present - and therefore the server `gpg` will be used for
signing (if configured.) Administrators should review best-practices
for GPG - in particular it is probably advisable to only install a
signing secret subkey without the master signing and certifying secret
key.

## Installing and generating a SSH key for Gitea

You can run `ssh-keygen -t ed25519 -f gitea-signing-key` to generate the private/public keypair for commit signing without any password. Usually you would store the key next to the gitea configuration, then point `SIGNING_KEY` to the generated public key `/path/to/gitea-signing-key.pub`. Gitea generates all its commits using the server `git` command at present - and therefore the server `ssh-keygen` will be used for
signing (if configured.)

## General Configuration

Gitea's configuration for signing can be found with the
`[repository.signing]` section of `app.ini`:

```ini
...
[repository.signing]
SIGNING_KEY = default
SIGNING_NAME =
SIGNING_EMAIL =
INITIAL_COMMIT = always
CRUD_ACTIONS = pubkey, twofa, parentsigned
WIKI = never
MERGES = pubkey, twofa, basesigned, commitssigned

...
```

---

For SSH commit signing, you need to specify the `SIGNING_FORMAT` to `ssh` instead of the default `openpgp`. `SIGNING_NAME` and `SIGNING_EMAIL` are required for verifing the signatures.

This looks like this:

```ini
...
[repository.signing]
SIGNING_KEY = /path/to/gitea-signing-key.pub
SIGNING_NAME =
SIGNING_EMAIL =
SIGNING_FORMAT = ssh
INITIAL_COMMIT = always
CRUD_ACTIONS = pubkey, twofa, parentsigned
WIKI = never
MERGES = pubkey, twofa, basesigned, commitssigned
...
```

- `/path/to/gitea-signing-key` is expected to be the private key for `/path/to/gitea-signing-key.pub` [see here how to generate a new ssh keypair](#installing-and-generating-a-ssh-key-for-gitea).
- `TRUSTED_SSH_KEYS = ssh-<algorithm> <key>` or `TRUSTED_SSH_KEYS = ssh-<algorithm> <key1>, ssh-<algorithm> <key2>` can be used for rotating the global ssh signing key to continue verifying commits signed by the previous keys.

### `SIGNING_KEY`

The first option to discuss is the `SIGNING_KEY`. There are three main
options:

- `none` - this prevents Gitea from signing any commits
- `default` - Gitea will default to the gpg key configured within `git config`
- `KEYID` - Gitea will sign commits with the gpg key with the ID
  `KEYID`. In this case you should provide a `SIGNING_NAME` and
  `SIGNING_EMAIL` to be displayed for this key.
- `/path/to/gitea-signing-key.pub` - Gitea will sign commits with the ssh key without the `.pub` suffix `/path/to/gitea-signing-key`. In this case you should provide a `SIGNING_NAME` and
  `SIGNING_EMAIL` to be displayed for this key and set `SIGNING_FORMAT` to `ssh`.

The `default` option will interrogate `git config` for
`commit.gpgsign` option - if this is set, then it will use the results
of the `user.signingkey`, `user.name` and `user.email` as appropriate.

By adjusting Git's `config` file within Gitea's
repositories, `SIGNING_KEY=default` could be used to provide different
signing keys on a per-repository basis. However, this is clearly not an
ideal UI and therefore subject to change.

:::warning
**Since 1.17**, Gitea runs git in its own home directory `[git].HOME_PATH` (default to `%(APP_DATA_PATH)/home`)
and uses its own config `{[git].HOME_PATH}/.gitconfig`.

If you have your own customized git config for Gitea, you should set these configs in system git config (aka `/etc/gitconfig`)
or the Gitea internal git config `{[git].HOME_PATH}/.gitconfig`.

Related home files for git command (like `.gnupg`) should also be put in Gitea's git home directory `[git].HOME_PATH`.

If you like to keep the `.gnupg` directory outside of `{[git].HOME_PATH}/`, consider setting the `$GNUPGHOME` environment variable to your preferred location, otherwise Gitea will use the gpg keys only under `{[git].HOME_PATH}/.gnupg`.
:::

:::warning
The default option and repository specific signing keys are not supported for ssh keys
:::

### `INITIAL_COMMIT`

This option determines whether Gitea should sign the initial commit
when creating a repository. The possible values are:

- `never`: Never sign
- `pubkey`: Only sign if the user has a public key
- `twofa`: Only sign if the user logs in with two factor authentication
- `always`: Always sign

Options other than `never` and `always` can be combined as a comma
separated list. The commit will be signed if all selected options are true.

### `WIKI`

This options determines if Gitea should sign commits to the Wiki.
The possible values are:

- `never`: Never sign
- `pubkey`: Only sign if the user has a public key
- `twofa`: Only sign if the user logs in with two-factor authentication
- `parentsigned`: Only sign if the parent commit is signed.
- `always`: Always sign

Options other than `never` and `always` can be combined as a comma
separated list. The commit will be signed if all selected options are true.

### `CRUD_ACTIONS`

This option determines if Gitea should sign commits from the web
editor or API CRUD actions. The possible values are:

- `never`: Never sign
- `pubkey`: Only sign if the user has a public key
- `twofa`: Only sign if the user logs in with two-factor authentication
- `parentsigned`: Only sign if the parent commit is signed.
- `always`: Always sign

Options other than `never` and `always` can be combined as a comma
separated list. The change will be signed if all selected options are true.

### `MERGES`

This option determines if Gitea should sign merge commits from PRs.
The possible options are:

- `never`: Never sign
- `pubkey`: Only sign if the user has a public key
- `twofa`: Only sign if the user logs in with two-factor authentication
- `basesigned`: Only sign if the parent commit in the base repo is signed.
- `headsigned`: Only sign if the head commit in the head branch is signed.
- `commitssigned`: Only sign if all the commits in the head branch to the merge point are signed.
- `approved`: Only sign approved merges to a protected branch.
- `always`: Always sign

Options other than `never` and `always` can be combined as a comma
separated list. The merge will be signed if all selected options are true.

## Obtaining the Public Key of the Signing Key

The public key used to sign Gitea's commits can be obtained from the API at:

```sh
/api/v1/signing-key.gpg
```

In cases where there is a repository specific key this can be obtained from:

```sh
/api/v1/repos/:username/:reponame/signing-key.gpg
```

For ssh commit signing the default ssh public key can be obtained via the API at:

```sh
/api/v1/signing-key.pub
```
