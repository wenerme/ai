---
date: "2023-05-24T16:00:00+00:00"
aliases:
  - /en-us/code-owners
  - /code-owners
---

# Code Owners

Gitea reads the first CODEOWNERS file found at these locations, in order:

- `./CODEOWNERS`
- `./docs/CODEOWNERS`
- `./.gitea/CODEOWNERS`

Pull requests use the base branch's rules. File views show owners from the commit
being viewed, including when browsing a branch, tag, or historical commit.

## Patterns and owners

Each rule contains a pattern followed by users or organization teams.

Patterns starting with `*` or containing `/*` are parsed as glob expressions.
General patterns are parsed as regular expressions.
A leading `!` inverts a match.

Special rule characters like space, backslash and `#` must be escaped with a backslash.
When using regexp, since backslash needs to be escaped in rule level, literal dot should be written as  `\\.`

Example file:

```text
*.js @alice @bob       # This is an inline comment
doc/*.md @charles      # Patterns starting with "*" or containing "/*" are parsed as glob
src/**/db*.py @david   # Use "**" to match any-level sub directories

.*\\.go @user1 @user2   # General patterns are parsed as regexp
test\\..*\\.js @user3   # !!! Do remeber: NOT "test.*.js", only regexp can be used for such cases

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

## Sections

A section heading can supply default owners for the rules that follow it:

```text
[Documentation] @org1/team-doc
*.md
README.md @alice

[Frontend] @bob
*.js
```

Owners on a rule replace the section's default owners. Section names are
case-insensitive; repeated headings belong to the same section. For each file, the
last matching rule in each named section applies. Matching rules outside named
sections retain Gitea's existing behavior: they all apply.

## Review request annotations

Use `## review-request=true` or `## review-request=false` to control automatic
review requests. A line annotation overrides a section annotation, which overrides
the global value. When none is set, individual code owners receive automatic review
requests only if they watch the repository and include pull requests in their watch
preferences. Team-level requests are enabled by default. An explicit `true` requests
a review regardless of the individual owner's watch preferences; `false` disables
automatic requests for the rule.

```text
## review-request=false # global default for following rules

*.js @alice ## review-request=true # only this rule

[Documentation] @org1/team-doc ## review-request=true
*.md
private/* @bob ## review-request=false
```

A standalone annotation changes the global default for subsequent rules.
Annotations on section headings apply until the next heading. Ordinary comments
start with `#`, including comments after annotations.

Disabling review requests keeps code owners visible when viewing a file and
does not waive approvals required by branch protection.

## Escaping

You need to escape characters `#`, ` ` (space) and `\` with backslash `\`, e.g.:

```text
dir/with\#hashtag @user1
path\ with\ space @user2
path/with\\backslash @user3
```

Some regexp characters (`.+*?()|[]{}^$\`) should be escaped with `\\`, e.g.:

```
path/\\.with\\.dots
path/with\\+plus
```

## Branch Protection Rules

When setting up branch protection rules, you may choose to enforce code owner approval of
modified files. This will block a PR from being merged until at least one code owner
has given approval for every applicable rule listed in the `CODEOWNERS` file.

For example, say you have the following `CODEOWNERS` file:

```text
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
