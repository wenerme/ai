---
description: Replace @cloudflare/sandbox 0.12 exec(), execStream(), sessions, and command timeouts with container.exec() in your Durable Object.
title: Change command calls
image: https://developers.cloudflare.com/sandbox/sdk/migrate/commands/og.png?v=90c2757a3d000943
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Change command calls

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/sdk/migrate/commands/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Replace 0.12 command calls with [`exec()`](https://developers.cloudflare.com/containers/api/durable-object-container/#exec) on the container. In Sandbox SDK 0.12, `exec()` runs each command string in a long-lived `bash` session that starts in `/workspace`. In 1.0, each call starts one process, and nothing carries over from one call to the next.

## Before you start

Your 1.0 class replaces the 0.12 `Sandbox` class, and has the `container` getter, the `ensureRunning()` method, and the `ENV` constant from [Replace the Sandbox class](https://developers.cloudflare.com/sandbox/sdk/migrate/replace-the-sandbox-class/). Call `ensureRunning()` at the start of each method that runs a command.

This page replaces `exec()`, `execStream()`, `createSession()`, `getSession()`, `deleteSession()`, and the `timeout` and `commandTimeoutMs` options. For file calls, refer to [Change file calls](https://developers.cloudflare.com/sandbox/sdk/migrate/files/). For `startProcess()`, refer to [Move background processes](https://developers.cloudflare.com/sandbox/sdk/migrate/background-processes/).

## Run commands

Pass the command as an array of arguments, with the working directory and variables that 0.12 gave it:

*src/index.ts (0.12)ts*

```ts
const result = await sandbox.exec("npm test");

if (!result.success) {
	console.error(result.stderr);
}
```

*src/index.ts (1.0)ts*

```ts
const process = await this.container.exec(["npm", "test"], {
	cwd: "/workspace",
	env: ENV,
});
const result = await process.output();

if (result.exitCode !== 0) {
	console.error(new TextDecoder().decode(result.stderr));
}
```

`exec()` starts in `/`, even when the image sets `WORKDIR`. It does not inherit the variables that `start()` sets, except `PATH`. `output()` waits for the process to exit, and returns its output as bytes. As in 0.12, a non-zero exit code does not throw.

`exec()` runs the command without a shell. For pipes, redirects, and variables, run the 0.12 string with `bash`:

*src/index.tsts*

```ts
const process = await this.container.exec(
	["bash", "-c", "npm test 2>&1 | tee /tmp/test.log"],
	{ cwd: "/workspace", env: ENV },
);
```

When the executable does not exist, `exec()` throws an error such as ``Command `npm` was not found in the container``. 0.12 `bash` returned exit code `127` instead. A command that runs through `bash -c` still returns `127`.

## Stream output

To replace `execStream()`, or `exec()` with `stream: true` and `onOutput`, return `stdout` from the process as a response body:

*src/index.ts (0.12)ts*

```ts
const stream = await sandbox.execStream("npm test");

return new Response(stream, {
	headers: { "Content-Type": "text/event-stream" },
});
```

*src/index.ts (1.0)ts*

```ts
const process = await this.container.exec(["npm", "test"], {
	cwd: "/workspace",
	env: ENV,
	stderr: "combined",
});

return new Response(process.stdout, {
	headers: { "Content-Type": "text/event-stream" },
});
```

`stderr: "combined"` sends standard error in the same stream. When the command writes to both streams at nearly the same time, lines can arrive out of order. To keep the order, redirect in a shell instead, such as `["sh", "-c", "npm test 2>&1"]`. Keep `Content-Type: text/event-stream`. With other content types, the response can arrive all at once when the process exits.

0.12 sent JSON events that `parseSSEStream()` decoded. The 1.0 body holds the output of the command. Read it with `fetch()` and a stream reader instead of `EventSource`. To send each line as a server-sent event, refer to [Stream command output](https://developers.cloudflare.com/sandbox/commands/stream-command-output/).

## Replace sessions

A 0.12 session kept a working directory and variables across calls. Keep them in an object, and pass it to each call:

*src/index.ts (0.12)ts*

```ts
const build = await sandbox.createSession({
	cwd: "/workspace/app",
	env: { CI: "1" },
});

await build.exec("npm ci");
await build.exec("npm test");
```

*src/index.ts (1.0)ts*

```ts
const build = { cwd: "/workspace/app", env: { ...ENV, CI: "1" } };

const install = await this.container.exec(["npm", "ci"], build);
await install.exitCode;

const test = await this.container.exec(["npm", "test"], build);
const result = await test.output();
```

`exec()` resolves when the process starts, so wait for `exitCode` before the next step.

In 0.12, a `cd` or `export` in one `exec()` call carried into the next call, including in the default session. In 1.0, it lasts until its command exits. Run steps that depend on each other in one command, such as `["bash", "-c", "cd app && npm ci && npm test"]`.

`ExecutionSession` methods map like the top-level methods. Remove `deleteSession()`, which has nothing to delete. To keep the work of two sessions apart, as the `isolation` option did, give each one its own sandbox name.

## Replace timeouts

Start the command with GNU coreutils `timeout`, which [stops the command and every process it started](https://developers.cloudflare.com/containers/guides/execute-commands/#stop-the-processes-a-command-starts):

*src/index.ts (0.12)ts*

```ts
const result = await sandbox.exec("npm test", { timeout: 60_000 });
```

*src/index.ts (1.0)ts*

```ts
const process = await this.container.exec(
	["timeout", "--kill-after=5", "60", "bash", "-c", "npm test"],
	{ cwd: "/workspace", env: ENV },
);
const result = await process.output();
// Exit code 124 means the command ran longer than 60 seconds
const timedOut = result.exitCode === 124;
```

0.12 threw `CommandError` with the message `Command timeout after 60000ms`, and the command kept running. In 1.0, a command that times out stops, so it cannot change files after the error.

To cancel a command from your code instead, pass an `AbortSignal`. For how to clear its timer, refer to [`exec()`](https://developers.cloudflare.com/containers/api/durable-object-container/#exec).

## Check the commands

Run a command with and without the options, from a method on your class:

*src/index.tsts*

```ts
const command = [
	"sh",
	"-c",
	'echo "pwd=$(pwd) NODE_ENV=${NODE_ENV:-unset}"',
];

const bare = await this.container.exec(command);
const withOptions = await this.container.exec(command, {
	cwd: "/workspace",
	env: ENV,
});
```

The output of `bare` shows the defaults, and the output of `withOptions` shows what 0.12 gave each command:

```txt
pwd=/ NODE_ENV=unset
pwd=/workspace NODE_ENV=test
```

## Related resources

- [`exec()`](https://developers.cloudflare.com/containers/api/durable-object-container/#exec)
- [Stream command output](https://developers.cloudflare.com/sandbox/commands/stream-command-output/)
- [Change file calls](https://developers.cloudflare.com/sandbox/sdk/migrate/files/)
- [Move background processes](https://developers.cloudflare.com/sandbox/sdk/migrate/background-processes/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/sdk/migrate/commands/#page","headline":"Change command calls","description":"Replace @cloudflare/sandbox 0.12 exec(), execStream(), sessions, and command timeouts with container.exec() in your Durable Object.","url":"https://developers.cloudflare.com/sandbox/sdk/migrate/commands/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/sdk/migrate/commands/og.png?v=90c2757a3d000943","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
