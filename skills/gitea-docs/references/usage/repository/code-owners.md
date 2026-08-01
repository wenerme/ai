---
date: "2023-05-24T16:00:00+00:00"
aliases:
  - /en-us/code-owners
  - /code-owners
---

# Code Owners

Gitea maintains code owner files. It looks for it in the following locations in this order:

- `./CODEOWNERS`
- `./docs/CODEOWNERS`
- `./.gitea/CODEOWNERS`

And stops at the first found file.

File format: `<regexp rule> <@user or @org/team> [@user or @org/team]...`

Regexp specified in golang Regex format.
Regexp can start with `!` for negative rules - match all files except specified.

Example file:

```bash
.*\\.go @user1 @user2 # This is comment

# Comment too
# You can assigning code owning for users or teams
frontend/src/.*\\.js @org1/team1 @org1/team2 @user3

# You can use negative pattern
!frontend/src/.* @org1/team3 @user5

# You can use power of go regexp
docs/(aws|google|azure)/[^/]*\\.(md|txt) @user8 @org1/team4
!/assets/.*\\.(bin|exe|msi) @user9
```

Code owners listed in this file will automatically be requested to review pull requests
that modify files matching at least one corresponding rule.

### Escaping

You can escape characters `#`, ` ` (space) and `\` with `\`, like:

```
dir/with\#hashtag @user1
path\ with\ space @user2
path/with\\backslash @user3
```

Some character (`.+*?()|[]{}^$\`) should be escaped with `\\` inside regexp, like:

```
path/\\.with\\.dots
path/with\\+plus
```

### Branch Protection Rules

When setting up branch protection rules, you may choose to enforce code owner approval of
modified files. This will block a PR from being merged until at least one code owner
has given approval for every applicable rule listed in the `CODEOWNERS` file.

For example, say you have the following `CODEOWNERS` file:

```bash
.*\\.go @Bob
.*\\.md @Sally @Chris
migrations/.* @Alice
```

This means that:

- If your PR modifies any `.go` files, it will require approval from Bob.
- If your PR modifies any `.md` files, it will require approval from _either_ Sally _or_ Chris.
- If your PR modifies any file in the `migrations` directory, it will require approval from Alice.

These rules are composable. So, for example, if your PR modifies some `.go` files, as well as
some `.md` files, this means it will require approval from Bob, in addition to approval from
one of either Sally or Chris.
