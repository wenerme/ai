---
date: "2026-10-29T00:00:00+00:00"
---

# Code Search

Search code in a single repository with the search box on the repository's code tab. To search across repositories, use the **Code** tab on the explore page or on a user or organization profile. Searching across repositories requires the [repository indexer](../administration/repo-indexer.md).

## Query syntax

A file is found when every term matches its content or its path. Matching ignores case and also finds terms inside longer words, so `port` matches `import`.

| Syntax | Example | Finds files that |
| --- | --- | --- |
| `term` | `getUser` | contain `getUser` |
| `term term` | `user cache` | contain both `user` and `cache` |
| `"phrase"` | `"func main()"` | contain the exact text, including spaces |
| `/regexp/` | `/get\w+User/` | have a line matching the regular expression |
| `path:DIR` | `path:src/utils` | are inside the `src/utils` directory |
| `language:NAME` | `language:go` | are written in Go |
| `repo:OWNER/NAME` | `repo:gitea/tea` | are in the `gitea/tea` repository |
| `user:NAME`, `org:NAME` | `org:gitea` | are in a repository owned by `gitea` |

- `repo:`, `user:` and `org:` only work when searching across repositories. Repeat them to search several, for example `repo:gitea/tea repo:gitea/act`.
- Regular expressions only work when the repository indexer is not enabled. They match one line at a time, so use `\s` for spaces, as a space separates terms.
- `language:` only works with the repository indexer.
- `AND`, `OR`, `NOT`, negated qualifiers like `-path:`, and qualifiers like `content:` or `extension:` are not supported and show an error.

## Results

Each file shows up to 10 snippets with the matches highlighted. Binary files are only found by their path.

Without the repository indexer, a search stops after 50 files and shows a notice. Narrow the query with more terms or `path:` to see the rest.

## API

- `GET /api/v1/repos/{owner}/{repo}/code/search?q=...` searches one repository. Set `ref` to search a branch, tag or commit other than the default branch. It always supports regular expressions, but not `language:`.
- `GET /api/v1/search/code?q=...` searches the default branches of all repositories you can read. It requires the repository indexer and does not support regular expressions.

Both return results in GitHub's format, including `text_matches` with the match positions. Results can be paged up to the 1000th file.
