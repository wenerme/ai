---
description: Execute Python, JavaScript, and TypeScript code with rich output formats in Sandbox SDK.
title: Code interpreter
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Code interpreter

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/api/interpreter/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Execute Python, JavaScript, and TypeScript code with support for data visualizations, tables, and rich output formats. Contexts maintain state (variables, imports, functions) across executions.

Coming soon: Sandbox SDK 1.0

This page documents interpreter methods on today's stable `@cloudflare/sandbox` package.

In the **1.0 preview** (`@next`), attach `withInterpreter` from `@cloudflare/sandbox/interpreter`. Refer to [Code interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/) and the [Interpreter API](https://developers.cloudflare.com/sandbox/1-0-preview/api/interpreter/).

## Methods

### `createCodeContext()`

Create a persistent execution context for running code.

```ts
const context = await sandbox.createCodeContext(options?: CreateContextOptions): Promise<CodeContext>
```

**Parameters**:

* `options` (optional):
  * `language` \- `"python" | "javascript" | "typescript"` (default: `"python"`)
  * `cwd` \- Working directory (default: `"/workspace"`)
  * `envVars` \- Environment variables
  * `timeout` \- Request timeout in milliseconds (default: 30000)

**Returns**: `Promise<CodeContext>` with `id`, `language`, `cwd`, `createdAt`, `lastUsed`

```js
const ctx = await sandbox.createCodeContext({
	language: "python",
	envVars: { API_KEY: env.API_KEY },
});
```

```plaintext
const ctx = await sandbox.createCodeContext({
  language: 'python',
  envVars: { API_KEY: env.API_KEY }
});
```

### `runCode()`

Execute code in a context and return the complete result.

```ts
const result = await sandbox.runCode(code: string, options?: RunCodeOptions): Promise<ExecutionResult>
```

**Parameters**:

* `code` \- The code to execute (required)
* `options` (optional):
  * `context` \- Context to run in (recommended - see below)
  * `language` \- `"python" | "javascript" | "typescript"` (default: `"python"`)
  * `timeout` \- Execution timeout in milliseconds (default: 60000)
  * `onStdout`, `onStderr`, `onResult`, `onError` \- Streaming callbacks

**Returns**: `Promise<ExecutionResult>` with:

* `code` \- The executed code
* `logs` \- `stdout` and `stderr` arrays
* `results` \- Array of rich outputs (see [Rich Output Formats](#rich-output-formats))
* `error` \- Execution error if any
* `executionCount` \- Execution counter

**Recommended usage - create explicit context**:

```js
const ctx = await sandbox.createCodeContext({ language: "python" });

await sandbox.runCode("import math; radius = 5", { context: ctx });
const result = await sandbox.runCode("math.pi * radius ** 2", { context: ctx });

console.log(result.results[0].text); // "78.53981633974483"
```

```plaintext
const ctx = await sandbox.createCodeContext({ language: 'python' });

await sandbox.runCode('import math; radius = 5', { context: ctx });
const result = await sandbox.runCode('math.pi * radius ** 2', { context: ctx });

console.log(result.results[0].text); // "78.53981633974483"
```

Default context behavior

If no `context` is provided, a default context is automatically created/reused for the specified `language`. While convenient for quick tests, **explicitly creating contexts is recommended** for production use to maintain predictable state.

```js
const result = await sandbox.runCode(
	`
data = [1, 2, 3, 4, 5]
print(f"Sum: {sum(data)}")
sum(data)
`,
	{ language: "python" },
);

console.log(result.logs.stdout); // ["Sum: 15"]
console.log(result.results[0].text); // "15"
```

```plaintext
const result = await sandbox.runCode(`
data = [1, 2, 3, 4, 5]
print(f"Sum: {sum(data)}")
sum(data)
`, { language: 'python' });

console.log(result.logs.stdout); // ["Sum: 15"]
console.log(result.results[0].text); // "15"
```

**Error handling**:

```js
const result = await sandbox.runCode("x = 1 / 0", { language: "python" });

if (result.error) {
	console.error(result.error.name); // "ZeroDivisionError"
	console.error(result.error.value); // "division by zero"
	console.error(result.error.traceback); // Stack trace array
}
```

```plaintext
const result = await sandbox.runCode('x = 1 / 0', { language: 'python' });

if (result.error) {
  console.error(result.error.name);      // "ZeroDivisionError"
  console.error(result.error.value);     // "division by zero"
  console.error(result.error.traceback); // Stack trace array
}
```

**JavaScript and TypeScript features**:

JavaScript and TypeScript code execution supports top-level `await` and persistent variables across executions within the same context.

```js
const ctx = await sandbox.createCodeContext({ language: "javascript" });

// Execution 1: Fetch data with top-level await
await sandbox.runCode(
	`
const response = await fetch('https://api.example.com/data');
const data = await response.json();
`,
	{ context: ctx },
);

// Execution 2: Use the data from previous execution
const result = await sandbox.runCode("console.log(data)", { context: ctx });
console.log(result.logs.stdout); // Data persists across executions
```

```plaintext
const ctx = await sandbox.createCodeContext({ language: 'javascript' });

// Execution 1: Fetch data with top-level await
await sandbox.runCode(`
const response = await fetch('https://api.example.com/data');
const data = await response.json();
`, { context: ctx });

// Execution 2: Use the data from previous execution
const result = await sandbox.runCode('console.log(data)', { context: ctx });
console.log(result.logs.stdout); // Data persists across executions
```

Variables declared with `const`, `let`, or `var` persist across executions, enabling multi-step workflows:

```js
const ctx = await sandbox.createCodeContext({ language: "javascript" });

await sandbox.runCode("const x = 10", { context: ctx });
await sandbox.runCode("let y = 20", { context: ctx });
const result = await sandbox.runCode("x + y", { context: ctx });

console.log(result.results[0].text); // "30"
```

```plaintext
const ctx = await sandbox.createCodeContext({ language: 'javascript' });

await sandbox.runCode('const x = 10', { context: ctx });
await sandbox.runCode('let y = 20', { context: ctx });
const result = await sandbox.runCode('x + y', { context: ctx });

console.log(result.results[0].text); // "30"
```

### `listCodeContexts()`

List all active code execution contexts.

```ts
const contexts = await sandbox.listCodeContexts(): Promise<CodeContext[]>
```

```js
const contexts = await sandbox.listCodeContexts();
console.log(`Found ${contexts.length} contexts`);
```

```plaintext
const contexts = await sandbox.listCodeContexts();
console.log(`Found ${contexts.length} contexts`);
```

### `deleteCodeContext()`

Delete a code execution context and free its resources.

```ts
await sandbox.deleteCodeContext(contextId: string): Promise<void>
```

```js
const ctx = await sandbox.createCodeContext({ language: "python" });
await sandbox.runCode('print("Hello")', { context: ctx });
await sandbox.deleteCodeContext(ctx.id);
```

```plaintext
const ctx = await sandbox.createCodeContext({ language: 'python' });
await sandbox.runCode('print("Hello")', { context: ctx });
await sandbox.deleteCodeContext(ctx.id);
```

## Rich Output Formats

Results include: `text`, `html`, `png`, `jpeg`, `svg`, `latex`, `markdown`, `json`, `chart`, `data`

**Charts (matplotlib)**:

```js
const result = await sandbox.runCode(
	`
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
plt.plot(x, np.sin(x))
plt.show()
`,
	{ language: "python" },
);

if (result.results[0]?.png) {
	const imageBuffer = Buffer.from(result.results[0].png, "base64");
	return new Response(imageBuffer, {
		headers: { "Content-Type": "image/png" },
	});
}
```

```plaintext
const result = await sandbox.runCode(`
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
plt.plot(x, np.sin(x))
plt.show()
`, { language: 'python' });

if (result.results[0]?.png) {
  const imageBuffer = Buffer.from(result.results[0].png, 'base64');
  return new Response(imageBuffer, {
    headers: { 'Content-Type': 'image/png' }
  });
}
```

**Tables (pandas)**:

```js
const result = await sandbox.runCode(
	`
import pandas as pd
df = pd.DataFrame({'Name': ['Alice', 'Bob'], 'Age': [25, 30]})
df
`,
	{ language: "python" },
);

if (result.results[0]?.html) {
	return new Response(result.results[0].html, {
		headers: { "Content-Type": "text/html" },
	});
}
```

```plaintext
const result = await sandbox.runCode(`
import pandas as pd
df = pd.DataFrame({'Name': ['Alice', 'Bob'], 'Age': [25, 30]})
df
`, { language: 'python' });

if (result.results[0]?.html) {
  return new Response(result.results[0].html, {
    headers: { 'Content-Type': 'text/html' }
  });
}
```

## Related resources

* [Build an AI Code Executor](https://developers.cloudflare.com/sandbox/tutorials/ai-code-executor/) \- Complete tutorial
* [Commands API](https://developers.cloudflare.com/sandbox/api/commands/) \- Lower-level command execution
* [Files API](https://developers.cloudflare.com/sandbox/api/files/) \- File operations

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/api/interpreter/#page","headline":"Code interpreter · Cloudflare Sandbox SDK docs","description":"Execute Python, JavaScript, and TypeScript code with rich output formats in Sandbox SDK.","url":"https://developers.cloudflare.com/sandbox/api/interpreter/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
