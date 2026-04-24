---
title: Work with Git
description: Clone repositories, manage branches, and automate Git operations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/sandbox/guides/git-workflows.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Work with Git

This guide shows you how to clone repositories, manage branches, and automate Git operations in the sandbox.

## Clone repositories

* [  JavaScript ](#tab-panel-8852)
* [  TypeScript ](#tab-panel-8853)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

## Clone private repositories

Use a personal access token in the URL:

* [  JavaScript ](#tab-panel-8842)
* [  TypeScript ](#tab-panel-8843)

JavaScript

```

const token = env.GITHUB_TOKEN;

const repoUrl = `https://${token}@github.com/user/private-repo.git`;


await sandbox.gitCheckout(repoUrl);


```

TypeScript

```

const token = env.GITHUB_TOKEN;

const repoUrl = `https://${token}@github.com/user/private-repo.git`;


await sandbox.gitCheckout(repoUrl);


```

More secure alternative

Embedding a token in the URL passes the credential directly into the sandbox. For better access control, use a Worker proxy that validates a short-lived JWT and injects the real token at request time — the sandbox never holds the credential. Refer to [Proxy requests to external APIs](https://developers.cloudflare.com/sandbox/guides/proxy-requests/).

## Clone and build

Clone a repository and run build steps:

* [  JavaScript ](#tab-panel-8844)
* [  TypeScript ](#tab-panel-8845)

JavaScript

```

await sandbox.gitCheckout("https://github.com/user/my-app");


const repoName = "my-app";


// Install and build

await sandbox.exec(`cd ${repoName} && npm install`);

await sandbox.exec(`cd ${repoName} && npm run build`);


console.log("Build complete");


```

TypeScript

```

await sandbox.gitCheckout('https://github.com/user/my-app');


const repoName = 'my-app';


// Install and build

await sandbox.exec(`cd ${repoName} && npm install`);

await sandbox.exec(`cd ${repoName} && npm run build`);


console.log('Build complete');


```

## Work with branches

* [  JavaScript ](#tab-panel-8846)
* [  TypeScript ](#tab-panel-8847)

JavaScript

```

await sandbox.gitCheckout("https://github.com/user/repo");


// Switch branches

await sandbox.exec("cd repo && git checkout feature-branch");


// Create new branch

await sandbox.exec("cd repo && git checkout -b new-feature");


```

TypeScript

```

await sandbox.gitCheckout('https://github.com/user/repo');


// Switch branches

await sandbox.exec('cd repo && git checkout feature-branch');


// Create new branch

await sandbox.exec('cd repo && git checkout -b new-feature');


```

## Make changes and commit

* [  JavaScript ](#tab-panel-8854)
* [  TypeScript ](#tab-panel-8855)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

## Best practices

* **Use shallow clones** \- Faster for large repos with `depth: 1`
* **Store credentials securely** \- Use environment variables for tokens
* **Clean up** \- Delete unused repositories to save space

## Troubleshooting

### Authentication fails

Verify your token is set:

* [  JavaScript ](#tab-panel-8850)
* [  TypeScript ](#tab-panel-8851)

JavaScript

```

if (!env.GITHUB_TOKEN) {

  throw new Error("GITHUB_TOKEN not configured");

}


const repoUrl = `https://${env.GITHUB_TOKEN}@github.com/user/private-repo.git`;

await sandbox.gitCheckout(repoUrl);


```

TypeScript

```

if (!env.GITHUB_TOKEN) {

  throw new Error('GITHUB_TOKEN not configured');

}


const repoUrl = `https://${env.GITHUB_TOKEN}@github.com/user/private-repo.git`;

await sandbox.gitCheckout(repoUrl);


```

### Large repository timeout

Use shallow clone:

* [  JavaScript ](#tab-panel-8848)
* [  TypeScript ](#tab-panel-8849)

JavaScript

```

await sandbox.gitCheckout("https://github.com/user/large-repo", {

  depth: 1,

});


```

TypeScript

```

await sandbox.gitCheckout('https://github.com/user/large-repo', {

  depth: 1

});


```

## Related resources

* [Files API reference](https://developers.cloudflare.com/sandbox/api/files/) \- File operations after cloning
* [Execute commands guide](https://developers.cloudflare.com/sandbox/guides/execute-commands/) \- Run git commands
* [Manage files guide](https://developers.cloudflare.com/sandbox/guides/manage-files/) \- Work with cloned files

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/guides/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/guides/git-workflows/","name":"Work with Git"}}]}
```
