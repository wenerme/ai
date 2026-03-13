---
date: "2025-04-05T00:00:00+08:00"
slug: "markdown"
aliases:
  - /markdown
sidebar_position: 4
---

# Markdown

Gitea uses MarkDown structured text in many places, you can recognise it by the `.md` file extension.
Markdown is plain text format for writing structured documents, allowing one to write
"plain" text files that nonetheless have _"fancy"_ **formatting**, while still keeping the plain-text version readable.

Unfortunately, due to historical implementation differences, many subtle dialects exist.
To avoid adding to the confusion, Gitea tries to follow "[GitHub Flavoured Markdown (GFM)](https://help.github.com/articles/github-flavored-markdown/)" as close as possible.
"GFM" is an extension on top of the rigorously-specified [CommonMark](https://commonmark.org/) standard.
CommonMark flavours are used by most major web platforms (e.g. Reddit, Stack Overflow, Discourse)
and git forges (GitHub, GitLab and our very own Gitea), thus you shouldn't run into any surprises with Gitea.

For a quick introduction to the syntax and features of GitHub Flavoured Markdown, see the GitHub documentation:
- [Basic formatting](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [Advanced formatting](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting)

For a deeper history about CommonMark, its spec, and its reason for existence, see [CommonMark.org](https://commonmark.org/).

## Rendering options

Some Gitea's markdown rendering behaviors can be fine-tuned by global config options, see the `[markdown]` config section in the `app.example.ini`


## Link path resolving

When rendering links for `<a href>`, `<img src>` and `<video src>`, Gitea resolves the link paths in the rendering context.

- If the link is an absolute path with scheme, the link is kept as-is.
- If the link is an URL path, it is resolved with the base path of current rendering context.
  - In a comment-like context (issues, pull-requests, commit message), the base path is current repository's home link: `/owner-name/repo-name`.
  - In a repository file context (markdown files in the repository), the base path is current git ref path.

### Special link tokens

To make users easier to resolve a link to the Gitea instance's root path, Gitea has a special `/:root` path syntax.
This will always resolve to Gitea's ROOT_URL.

Gitea also supports GitHub's `?raw=1` query parameter.
A request to `/owner-name/repo-name/src/branch/main/file?raw=1` will be redirected to
`/owner-name/repo-name/raw/branch/main/file`. This makes it possible to target raw contents from relative links
(normally, the `src/` section of the path is provided automatically by Gitea and cannot be overriden).

### Link handling examples

For example, when rendering a markdown file in `/owner-name/repo-name/src/branch/main/dir`:
  1) Absolute with scheme: Link `https://example.org` will be rendered as-is.
  2) Relative from current file: Link `sub/file`is resolved to `/owner-name/repo-name/src/branch/main/dir/sub/file`
  3) Relative from repo root: Link `/sub/file` (note leading slash) is resolved to `/owner-name/repo-name/src/branch/main/sub/file`
  4) Raw media: If the link is used as `src` of an image or video, then it is resolved to `/owner-name/repo-name/raw/...`
  5) Raw relative: `sub/file?raw=1` will resolve to `/owner-name/repo-name/src/branch/main/dir/sub/file?raw=1`,
    which will redirect to `/owner-name/repo-name/raw/branch/main/dir/sub/file`.
  6) explicit root: Link `/:root/any-path` is always resolved to `$ROOT_URL/any-path` without any further processing.


## Issue and pull-request reference

Using issue/pull-request numbers in a list:

```
* #123
* #456
```

It will be rendered with issue titles to:

```
* the issue title (#123)
* the other issue title (#456)
```

## Math expressions

Gitea supports GitHub-like math expression formatting.

### Inline expression

  - ``` $\alpha$ ```: quoted by single-dollar `$`
  - ``` $$\alpha$$ ```: quoted by double-dollar `$$`
  - ``` $`\alpha`$ ```: quoted by dollar with backquotes, the backquotes could repeat like normal code blocks.

### Block expression

Using `$$`:

````
$$
\alpha
$$
````

Using code-block with language:

````
```math
\alpha
```
````

## Frontmatter

Gitea supports frontmatter and Table of Contents (TOC) rendering. By default, frontmatter rendering is enabled, and TOC rendering is disabled.

### Enabling TOC rendering

To enable TOC rendering for a markdown file, add `include_toc: true` to its frontmatter section.

### Disabling frontmatter

To disable frontmatter rendering for a markdown file, add `gitea: none` to its frontmatter section.

### Example

```yaml
---
include_toc: true
gitea: none
---
```

Then, when you preview this markdown file in Gitea, the frontmatter section will not be rendered, and a Table of Contents will be generated at the top of the content.
