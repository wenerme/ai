---
description: Clone repositories, manage branches, and automate Git operations.
title: Work with Git
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Work with Git

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/guides/git-workflows/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide shows you how to clone repositories, manage branches, and automate Git operations in the sandbox.

## Clone repositories

```js
import { getSandbox } from "@cloudflare/sandbox";

const sandbox = getSandbox(env.Sandbox, "my-sandbox");

// Basic clone
await sandbox.gitCheckout("https://github.com/user/repo");

// Clone specific branch
await sandbox.gitCheckout("https://github.com/user/repo", {
	branch: "develop",
});

// Shallow clone (faster for large repos)
await sandbox.gitCheckout("https://github.com/user/large-repo", {
	depth: 1,
});

// Clone to specific directory
await sandbox.gitCheckout("https://github.com/user/my-app", {
	targetDir: "/workspace/project",
});
```

```plaintext
import { getSandbox } from '@cloudflare/sandbox';

const sandbox = getSandbox(env.Sandbox, 'my-sandbox');

// Basic clone
await sandbox.gitCheckout('https://github.com/user/repo');

// Clone specific branch
await sandbox.gitCheckout('https://github.com/user/repo', {
  branch: 'develop'
});

// Shallow clone (faster for large repos)
await sandbox.gitCheckout('https://github.com/user/large-repo', {
  depth: 1
});

// Clone to specific directory
await sandbox.gitCheckout('https://github.com/user/my-app', {
  targetDir: '/workspace/project'
});
```

## Clone private repositories

Use a personal access token in the URL:

```js
const token = env.GITHUB_TOKEN;
const repoUrl = `https://${token}@github.com/user/private-repo.git`;

await sandbox.gitCheckout(repoUrl);
```

```plaintext
const token = env.GITHUB_TOKEN;
const repoUrl = `https://${token}@github.com/user/private-repo.git`;

await sandbox.gitCheckout(repoUrl);
```

More secure alternative

Embedding a token in the URL passes the credential directly into the sandbox. For better access control, use an outbound handler that injects the real token at request time — the sandbox never holds the credential. Refer to [Handle outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/).

## Clone and build

Clone a repository and run build steps:

```js
await sandbox.gitCheckout("https://github.com/user/my-app");

const repoName = "my-app";

// Install and build
await sandbox.exec(`cd ${repoName} && npm install`);
await sandbox.exec(`cd ${repoName} && npm run build`);

console.log("Build complete");
```

```plaintext
await sandbox.gitCheckout('https://github.com/user/my-app');

const repoName = 'my-app';

// Install and build
await sandbox.exec(`cd ${repoName} && npm install`);
await sandbox.exec(`cd ${repoName} && npm run build`);

console.log('Build complete');
```

## Work with branches

```js
await sandbox.gitCheckout("https://github.com/user/repo");

// Switch branches
await sandbox.exec("cd repo && git checkout feature-branch");

// Create new branch
await sandbox.exec("cd repo && git checkout -b new-feature");
```

```plaintext
await sandbox.gitCheckout('https://github.com/user/repo');

// Switch branches
await sandbox.exec('cd repo && git checkout feature-branch');

// Create new branch
await sandbox.exec('cd repo && git checkout -b new-feature');
```

## Make changes and commit

```js
await sandbox.gitCheckout("https://github.com/user/repo");

// Modify a file
const readme = await sandbox.readFile("/workspace/repo/README.md");
await sandbox.writeFile(
	"/workspace/repo/README.md",
	readme.content + "\n\n## New Section",
);

// Commit changes
await sandbox.exec('cd repo && git config user.name "Sandbox Bot"');
await sandbox.exec('cd repo && git config user.email "bot@example.com"');
await sandbox.exec("cd repo && git add README.md");
await sandbox.exec('cd repo && git commit -m "Update README"');
```

```plaintext
await sandbox.gitCheckout('https://github.com/user/repo');

// Modify a file
const readme = await sandbox.readFile('/workspace/repo/README.md');
await sandbox.writeFile('/workspace/repo/README.md', readme.content + '\n\n## New Section');

// Commit changes
await sandbox.exec('cd repo && git config user.name "Sandbox Bot"');
await sandbox.exec('cd repo && git config user.email "bot@example.com"');
await sandbox.exec('cd repo && git add README.md');
await sandbox.exec('cd repo && git commit -m "Update README"');
```

## Best practices

* **Use shallow clones** \- Faster for large repos with `depth: 1`
* **Store credentials securely** \- Use environment variables for tokens
* **Clean up** \- Delete unused repositories to save space

## Troubleshooting

### Authentication fails

Verify your token is set:

```js
if (!env.GITHUB_TOKEN) {
	throw new Error("GITHUB_TOKEN not configured");
}

const repoUrl = `https://${env.GITHUB_TOKEN}@github.com/user/private-repo.git`;
await sandbox.gitCheckout(repoUrl);
```

```plaintext
if (!env.GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN not configured');
}

const repoUrl = `https://${env.GITHUB_TOKEN}@github.com/user/private-repo.git`;
await sandbox.gitCheckout(repoUrl);
```

### Large repository timeout

Use shallow clone:

```js
await sandbox.gitCheckout("https://github.com/user/large-repo", {
	depth: 1,
});
```

```plaintext
await sandbox.gitCheckout('https://github.com/user/large-repo', {
  depth: 1
});
```

## Related resources

* [Files API reference](https://developers.cloudflare.com/sandbox/api/files/) \- File operations after cloning
* [Execute commands guide](https://developers.cloudflare.com/sandbox/guides/execute-commands/) \- Run git commands
* [Manage files guide](https://developers.cloudflare.com/sandbox/guides/manage-files/) \- Work with cloned files

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/git-workflows/#page","headline":"Work with Git · Cloudflare Sandbox SDK docs","description":"Clone repositories, manage branches, and automate Git operations.","url":"https://developers.cloudflare.com/sandbox/guides/git-workflows/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
