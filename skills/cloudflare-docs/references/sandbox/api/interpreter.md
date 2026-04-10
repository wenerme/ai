---
title: Code Interpreter
description: Execute Python, JavaScript, and TypeScript code with support for data visualizations, tables, and rich output formats. Contexts maintain state (variables, imports, functions) across executions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/sandbox/api/interpreter.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Code Interpreter

Execute Python, JavaScript, and TypeScript code with support for data visualizations, tables, and rich output formats. Contexts maintain state (variables, imports, functions) across executions.

## Methods

### `createCodeContext()`

Create a persistent execution context for running code.

TypeScript

```

const context = await sandbox.createCodeContext(options?: CreateContextOptions): Promise<CodeContext>


```

**Parameters**:

* `options` (optional):  
   * `language` \- `"python" | "javascript" | "typescript"` (default: `"python"`)  
   * `cwd` \- Working directory (default: `"/workspace"`)  
   * `envVars` \- Environment variables  
   * `timeout` \- Request timeout in milliseconds (default: 30000)

**Returns**: `Promise<CodeContext>` with `id`, `language`, `cwd`, `createdAt`, `lastUsed`

* [  JavaScript ](#tab-panel-6195)
* [  TypeScript ](#tab-panel-6196)

JavaScript

```

const ctx = await sandbox.createCodeContext({

  language: "python",

  envVars: { API_KEY: env.API_KEY },

});


```

TypeScript

```

const ctx = await sandbox.createCodeContext({

  language: 'python',

  envVars: { API_KEY: env.API_KEY }

});


```

### `runCode()`

Execute code in a context and return the complete result.

TypeScript

```

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

* [  JavaScript ](#tab-panel-6197)
* [  TypeScript ](#tab-panel-6198)

JavaScript

```

const ctx = await sandbox.createCodeContext({ language: "python" });


await sandbox.runCode("import math; radius = 5", { context: ctx });

const result = await sandbox.runCode("math.pi * radius ** 2", { context: ctx });


console.log(result.results[0].text); // "78.53981633974483"


```

TypeScript

```

const ctx = await sandbox.createCodeContext({ language: 'python' });


await sandbox.runCode('import math; radius = 5', { context: ctx });

const result = await sandbox.runCode('math.pi * radius ** 2', { context: ctx });


console.log(result.results[0].text); // "78.53981633974483"


```

Default context behavior

If no `context` is provided, a default context is automatically created/reused for the specified `language`. While convenient for quick tests, **explicitly creating contexts is recommended** for production use to maintain predictable state.

* [  JavaScript ](#tab-panel-6203)
* [  TypeScript ](#tab-panel-6204)

JavaScript

```

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

Explain Code

TypeScript

```

const result = await sandbox.runCode(`

data = [1, 2, 3, 4, 5]

print(f"Sum: {sum(data)}")

sum(data)

`, { language: 'python' });


console.log(result.logs.stdout); // ["Sum: 15"]

console.log(result.results[0].text); // "15"


```

**Error handling**:

* [  JavaScript ](#tab-panel-6199)
* [  TypeScript ](#tab-panel-6200)

JavaScript

```

const result = await sandbox.runCode("x = 1 / 0", { language: "python" });


if (result.error) {

  console.error(result.error.name); // "ZeroDivisionError"

  console.error(result.error.value); // "division by zero"

  console.error(result.error.traceback); // Stack trace array

}


```

TypeScript

```

const result = await sandbox.runCode('x = 1 / 0', { language: 'python' });


if (result.error) {

  console.error(result.error.name);      // "ZeroDivisionError"

  console.error(result.error.value);     // "division by zero"

  console.error(result.error.traceback); // Stack trace array

}


```

**JavaScript and TypeScript features**:

JavaScript and TypeScript code execution supports top-level `await` and persistent variables across executions within the same context.

* [  JavaScript ](#tab-panel-6209)
* [  TypeScript ](#tab-panel-6210)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

Variables declared with `const`, `let`, or `var` persist across executions, enabling multi-step workflows:

* [  JavaScript ](#tab-panel-6205)
* [  TypeScript ](#tab-panel-6206)

JavaScript

```

const ctx = await sandbox.createCodeContext({ language: "javascript" });


await sandbox.runCode("const x = 10", { context: ctx });

await sandbox.runCode("let y = 20", { context: ctx });

const result = await sandbox.runCode("x + y", { context: ctx });


console.log(result.results[0].text); // "30"


```

TypeScript

```

const ctx = await sandbox.createCodeContext({ language: 'javascript' });


await sandbox.runCode('const x = 10', { context: ctx });

await sandbox.runCode('let y = 20', { context: ctx });

const result = await sandbox.runCode('x + y', { context: ctx });


console.log(result.results[0].text); // "30"


```

### `listCodeContexts()`

List all active code execution contexts.

TypeScript

```

const contexts = await sandbox.listCodeContexts(): Promise<CodeContext[]>


```

* [  JavaScript ](#tab-panel-6201)
* [  TypeScript ](#tab-panel-6202)

JavaScript

```

const contexts = await sandbox.listCodeContexts();

console.log(`Found ${contexts.length} contexts`);


```

TypeScript

```

const contexts = await sandbox.listCodeContexts();

console.log(`Found ${contexts.length} contexts`);


```

### `deleteCodeContext()`

Delete a code execution context and free its resources.

TypeScript

```

await sandbox.deleteCodeContext(contextId: string): Promise<void>


```

* [  JavaScript ](#tab-panel-6207)
* [  TypeScript ](#tab-panel-6208)

JavaScript

```

const ctx = await sandbox.createCodeContext({ language: "python" });

await sandbox.runCode('print("Hello")', { context: ctx });

await sandbox.deleteCodeContext(ctx.id);


```

TypeScript

```

const ctx = await sandbox.createCodeContext({ language: 'python' });

await sandbox.runCode('print("Hello")', { context: ctx });

await sandbox.deleteCodeContext(ctx.id);


```

## Rich Output Formats

Results include: `text`, `html`, `png`, `jpeg`, `svg`, `latex`, `markdown`, `json`, `chart`, `data`

**Charts (matplotlib)**:

* [  JavaScript ](#tab-panel-6213)
* [  TypeScript ](#tab-panel-6214)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

**Tables (pandas)**:

* [  JavaScript ](#tab-panel-6211)
* [  TypeScript ](#tab-panel-6212)

JavaScript

```

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

Explain Code

TypeScript

```

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

Explain Code

## Related resources

* [Build an AI Code Executor](https://developers.cloudflare.com/sandbox/tutorials/ai-code-executor/) \- Complete tutorial
* [Commands API](https://developers.cloudflare.com/sandbox/api/commands/) \- Lower-level command execution
* [Files API](https://developers.cloudflare.com/sandbox/api/files/) \- File operations

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/api/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/api/interpreter/","name":"Code Interpreter"}}]}
```
