---
date: "2019-11-28:00:00+02:00"
slug: "template-repositories"
sidebar_position: 44
aliases:
  - /en-us/template-repositories
  - /template-repositories
---

# Template Repository

Since Gitea `1.11`, you can create template repositories.
When creating a repo based on a template, you can copy most of its content, and even auto-inject variables into it.

By default, variables will not be expanded in any file.
Only files contained in a pattern inside the `.gitea/template` file will be checked for if they contain variables.
When creating the template, all files are included except for this `.gitea/template` file.

Gitea uses [gobwas/glob](https://github.com/gobwas/glob) for its glob syntax.
It closely resembles a traditional `.gitignore`, however there may be slight differences.

## Example `.gitea/template` file

All paths are relative to the base of the repository

```gitignore
# Expand all .go files, anywhere in the repository
**.go

# All text files in the text directory
text/*.txt

# A specific file
a/b/c/d.json

# Batch files in both upper or lower case can be matched
**.[bB][aA][tT]
```

## Variable Expansion

In any file matched by the above globs, the variables below will be expanded.

Matching filenames and paths can also be expanded, and are conservatively sanitized to support cross-platform filesystems.

You can use variables by prefixing them with `$` or surrounding them with `${}`, so both `$VAR` and `${VAR}` insert the value of `VAR` at this location.
To escape an expansion, use `$$`, such as `$$VAR` or `$${VAR}`.

These are the variables Gitea currently recognizes:

| Variable             | Expands To                                          | Transformable |
| -------------------- | --------------------------------------------------- | ------------- |
| YEAR                 | The year of generating the repository (i.e. `2024`) | ✘             |
| MONTH                | The month of generating the repository (i.e. `03`)  | ✘             |
| MONTH_ENGLISH        | The month but in English (i.e. `March`)             | ✓             |
| DAY                  | The day of generating the repository (i.e. `02`)    | ✘             |
| REPO_NAME            | The name of the generated repository                | ✓             |
| TEMPLATE_NAME        | The name of the template repository                 | ✓             |
| REPO_DESCRIPTION     | The description of the generated repository         | ✘             |
| TEMPLATE_DESCRIPTION | The description of the template repository          | ✘             |
| REPO_OWNER           | The owner of the generated repository               | ✓             |
| TEMPLATE_OWNER       | The owner of the template repository                | ✓             |
| REPO_LINK            | The URL to the generated repository                 | ✘             |
| TEMPLATE_LINK        | The URL to the template repository                  | ✘             |
| REPO_HTTPS_URL       | The HTTP(S) clone link for the generated repository | ✘             |
| TEMPLATE_HTTPS_URL   | The HTTP(S) clone link for the template repository  | ✘             |
| REPO_SSH_URL         | The SSH clone link for the generated repository     | ✘             |
| TEMPLATE_SSH_URL     | The SSH clone link for the template repository      | ✘             |

## Transformers :robot:

Since Gitea `1.12.0`, variables marked as transformable in the table above also have alternative versions where the given transformer has been applied.

Transformed variables can be called by appending the transformer name to the variable name.
For example, to get `REPO_NAME` in `PASCAL`-case, you should use the variable `${REPO_NAME_PASCAL}`.

The following transformers are available (assuming `go-sdk` is the input):

| Transformer | Effect |
| ----------- | ------ |
| SNAKE       | go_sdk |
| KEBAB       | go-sdk |
| CAMEL       | goSdk  |
| PASCAL      | GoSdk  |
| LOWER       | go-sdk |
| UPPER       | GO-SDK |
| TITLE       | Go-Sdk |
