---
title: '`glab token rotate`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Rotate user, group, or project access tokens.

## Synopsis

If multiple tokens share the same name, specify the token ID to select the correct one.

The token expires at 00:00 UTC on a date calculated by adding the duration to today's date.
The default duration is 30 days. You can specify a different duration in days (`d`),
weeks (`w`), or hours (`h`).
The `--duration` and `--expires-at` flags are mutually exclusive.

Administrators can rotate personal access tokens that belong to other users.

```plaintext
glab token rotate <token-name|token-id> [flags]
```

## Aliases

```plaintext
rot
```

## Examples

```console
# Rotate project access token of current project (default 30 days)
glab token rotate my-project-token

# Rotate project access token with explicit expiration date
glab token rotate --repo user/repo my-project-token --expires-at 2025-08-08

# Rotate group access token with 7 day lifetime
glab token rotate --group group/sub-group my-group-token --duration 7d

# Rotate personal access token with 2 week lifetime
glab token rotate --user @me my-personal-token --duration 2w

# Rotate a personal access token of another user (administrator only)
glab token rotate --user johndoe johns-personal-token --duration 90d
```

## Options

```plaintext
  -D, --duration duration   Sets the token lifetime in days. Accepts: days (30d), weeks (4w), or hours in multiples of 24 (24h, 168h, 720h). Maximum: 365d. The token expires at 00:00 UTC on the calculated date. (default 30d)
  -E, --expires-at DATE     Sets the token's expiration date and time, in YYYY-MM-DD format. If not specified, --duration is used. (default 0001-01-01)
  -g, --group string        Rotate group access token. Ignored if a user or repository argument is set.
  -F, --output string       Format output as: text, json. 'text' provides the new token value; 'json' outputs the token with metadata. (default "text")
  -R, --repo OWNER/REPO     Select another repository. Can use either OWNER/REPO or `GROUP/NAMESPACE/REPO` format. Also accepts full URL or Git URL.
  -U, --user string         Rotate personal access token. Use @me for the current user.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
