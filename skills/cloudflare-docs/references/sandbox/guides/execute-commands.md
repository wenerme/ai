---
title: Execute commands
description: Run commands with streaming output, error handling, and shell access.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/sandbox/guides/execute-commands.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Execute commands

This guide shows you how to execute commands in the sandbox, handle output, and manage errors effectively.

## Choose the right method

The SDK provides multiple approaches for running commands:

* **`exec()`** \- Run a command and wait for complete result. Best for one-time commands like builds, installations, and scripts.
* **`execStream()`** \- Stream output in real-time. Best for long-running commands where you need immediate feedback.
* **`startProcess()`** \- Start a background process. Best for web servers, databases, and services that need to keep running.

Note

For **web servers, databases, or services that need to keep running**, use `startProcess()` instead. See the [Background processes guide](https://developers.cloudflare.com/sandbox/guides/background-processes/).

## Execute basic commands

Use `exec()` for simple commands that complete quickly:

* [  JavaScript ](#tab-panel-6361)
* [  TypeScript ](#tab-panel-6362)

JavaScript

```

import { getSandbox } from "@cloudflare/sandbox";


const sandbox = getSandbox(env.Sandbox, "my-sandbox");


// Execute a single command

const result = await sandbox.exec("python --version");


console.log(result.stdout); // "Python 3.11.0"

console.log(result.exitCode); // 0

console.log(result.success); // true


```

Explain Code

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';


const sandbox = getSandbox(env.Sandbox, 'my-sandbox');


// Execute a single command

const result = await sandbox.exec('python --version');


console.log(result.stdout);   // "Python 3.11.0"

console.log(result.exitCode); // 0

console.log(result.success);  // true


```

Explain Code

## Pass arguments safely

When passing user input or dynamic values, avoid string interpolation to prevent injection attacks:

* [  JavaScript ](#tab-panel-6363)
* [  TypeScript ](#tab-panel-6364)

JavaScript

```

// Unsafe - vulnerable to injection

const filename = userInput;

await sandbox.exec(`cat ${filename}`);


// Safe - use proper escaping or validation

const safeFilename = filename.replace(/[^a-zA-Z0-9_.-]/g, "");

await sandbox.exec(`cat ${safeFilename}`);


// Better - write to file and execute

await sandbox.writeFile("/tmp/input.txt", userInput);

await sandbox.exec("python process.py /tmp/input.txt");


```

Explain Code

TypeScript

```

// Unsafe - vulnerable to injection

const filename = userInput;

await sandbox.exec(`cat ${filename}`);


// Safe - use proper escaping or validation

const safeFilename = filename.replace(/[^a-zA-Z0-9_.-]/g, '');

await sandbox.exec(`cat ${safeFilename}`);


// Better - write to file and execute

await sandbox.writeFile('/tmp/input.txt', userInput);

await sandbox.exec('python process.py /tmp/input.txt');


```

Explain Code

## Handle errors

Commands can fail in two ways:

1. **Non-zero exit code** \- Command ran but failed (result.success === false)
2. **Execution error** \- Command couldn't start (throws exception)

* [  JavaScript ](#tab-panel-6377)
* [  TypeScript ](#tab-panel-6378)

JavaScript

```

try {

  const result = await sandbox.exec("python analyze.py");


  if (!result.success) {

    // Command failed (non-zero exit code)

    console.error("Analysis failed:", result.stderr);

    console.log("Exit code:", result.exitCode);


    // Handle specific exit codes

    if (result.exitCode === 1) {

      throw new Error("Invalid input data");

    } else if (result.exitCode === 2) {

      throw new Error("Missing dependencies");

    }

  }


  // Success - process output

  return JSON.parse(result.stdout);

} catch (error) {

  // Execution error (couldn't start command)

  console.error("Execution failed:", error.message);

  throw error;

}


```

Explain Code

TypeScript

```

try {

  const result = await sandbox.exec('python analyze.py');


  if (!result.success) {

    // Command failed (non-zero exit code)

    console.error('Analysis failed:', result.stderr);

    console.log('Exit code:', result.exitCode);


    // Handle specific exit codes

    if (result.exitCode === 1) {

      throw new Error('Invalid input data');

    } else if (result.exitCode === 2) {

      throw new Error('Missing dependencies');

    }

  }


  // Success - process output

  return JSON.parse(result.stdout);


} catch (error) {

  // Execution error (couldn't start command)

  console.error('Execution failed:', error.message);

  throw error;

}


```

Explain Code

## Execute shell commands

The sandbox supports shell features like pipes, redirects, and chaining:

* [  JavaScript ](#tab-panel-6367)
* [  TypeScript ](#tab-panel-6368)

JavaScript

```

// Pipes and filters

const result = await sandbox.exec('ls -la | grep ".py" | wc -l');

console.log("Python files:", result.stdout.trim());


// Output redirection

await sandbox.exec("python generate.py > output.txt 2> errors.txt");


// Multiple commands

await sandbox.exec("cd /workspace && npm install && npm test");


```

TypeScript

```

// Pipes and filters

const result = await sandbox.exec('ls -la | grep ".py" | wc -l');

console.log('Python files:', result.stdout.trim());


// Output redirection

await sandbox.exec('python generate.py > output.txt 2> errors.txt');


// Multiple commands

await sandbox.exec('cd /workspace && npm install && npm test');


```

## Execute Python scripts

* [  JavaScript ](#tab-panel-6375)
* [  TypeScript ](#tab-panel-6376)

JavaScript

```

// Run inline Python

const result = await sandbox.exec('python -c "print(sum([1, 2, 3, 4, 5]))"');

console.log("Sum:", result.stdout.trim()); // "15"


// Run a script file

await sandbox.writeFile(

  "/workspace/analyze.py",

  `

import sys

print(f"Argument: {sys.argv[1]}")

`,

);


await sandbox.exec("python /workspace/analyze.py data.csv");


```

Explain Code

TypeScript

```

// Run inline Python

const result = await sandbox.exec('python -c "print(sum([1, 2, 3, 4, 5]))"');

console.log('Sum:', result.stdout.trim()); // "15"


// Run a script file

await sandbox.writeFile('/workspace/analyze.py', `

import sys

print(f"Argument: {sys.argv[1]}")

`);


await sandbox.exec('python /workspace/analyze.py data.csv');


```

Explain Code

## Timeouts

Set a maximum execution time for commands to prevent long-running operations from blocking indefinitely.

### Per-command timeout

Pass `timeout` in the options to set a timeout for a single command:

* [  JavaScript ](#tab-panel-6365)
* [  TypeScript ](#tab-panel-6366)

JavaScript

```

const result = await sandbox.exec("npm run build", {

  timeout: 30000, // 30 seconds

});


```

TypeScript

```

const result = await sandbox.exec('npm run build', {

  timeout: 30000 // 30 seconds

});


```

### Session-level timeout

Set a default timeout for all commands in a session with `commandTimeoutMs`:

* [  JavaScript ](#tab-panel-6371)
* [  TypeScript ](#tab-panel-6372)

JavaScript

```

const session = await sandbox.createSession({

  commandTimeoutMs: 10000, // 10s default for all commands

});


await session.exec("npm install"); // Times out after 10s

await session.exec("npm run build"); // Times out after 10s


// Per-command timeout overrides the session default

await session.exec("npm test", { timeout: 60000 }); // 60s for this command


```

TypeScript

```

const session = await sandbox.createSession({

  commandTimeoutMs: 10000 // 10s default for all commands

});


await session.exec('npm install');    // Times out after 10s

await session.exec('npm run build');  // Times out after 10s


// Per-command timeout overrides the session default

await session.exec('npm test', { timeout: 60000 }); // 60s for this command


```

### Global timeout

Set the `COMMAND_TIMEOUT_MS` [environment variable](https://developers.cloudflare.com/sandbox/configuration/environment-variables/#command%5Ftimeout%5Fms) to define a global default timeout for every `exec()` call across all sessions.

### Timeout precedence

When multiple timeouts are configured, the most specific value wins:

1. **Per-command** `timeout` on `exec()` (highest priority)
2. **Session-level** `commandTimeoutMs` on `createSession()`
3. **Global** `COMMAND_TIMEOUT_MS` environment variable (lowest priority)

If none are set, commands run without a timeout.

### Timeout does not kill the process

Warning

When a command times out, the SDK raises an error and closes the connection. The underlying process **continues running** inside the container. To stop a timed-out process, delete the session with [deleteSession()](https://developers.cloudflare.com/sandbox/api/sessions/#deletesession) or destroy the sandbox with [destroy()](https://developers.cloudflare.com/sandbox/api/lifecycle/#destroy).

## Best practices

* **Check exit codes** \- Always verify `result.success` and `result.exitCode`
* **Validate inputs** \- Escape or validate user input to prevent injection
* **Use streaming** \- For long operations, use `execStream()` for real-time feedback
* **Use background processes** \- For services that need to keep running (web servers, databases), use the [Background processes guide](https://developers.cloudflare.com/sandbox/guides/background-processes/) instead
* **Handle errors** \- Check stderr for error details

## Troubleshooting

### Command not found

Verify the command exists in the container:

* [  JavaScript ](#tab-panel-6369)
* [  TypeScript ](#tab-panel-6370)

JavaScript

```

const check = await sandbox.exec("which python3");

if (!check.success) {

  console.error("python3 not found");

}


```

TypeScript

```

const check = await sandbox.exec('which python3');

if (!check.success) {

  console.error('python3 not found');

}


```

### Working directory issues

Use absolute paths or change directory:

* [  JavaScript ](#tab-panel-6373)
* [  TypeScript ](#tab-panel-6374)

JavaScript

```

// Use absolute path

await sandbox.exec("python /workspace/my-app/script.py");


// Or change directory

await sandbox.exec("cd /workspace/my-app && python script.py");


```

TypeScript

```

// Use absolute path

await sandbox.exec('python /workspace/my-app/script.py');


// Or change directory

await sandbox.exec('cd /workspace/my-app && python script.py');


```

## Related resources

* [Commands API reference](https://developers.cloudflare.com/sandbox/api/commands/) \- Complete method documentation
* [Background processes guide](https://developers.cloudflare.com/sandbox/guides/background-processes/) \- Managing long-running processes
* [Streaming output guide](https://developers.cloudflare.com/sandbox/guides/streaming-output/) \- Advanced streaming patterns
* [Code Interpreter guide](https://developers.cloudflare.com/sandbox/guides/code-execution/) \- Higher-level code execution

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/guides/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/guides/execute-commands/","name":"Execute commands"}}]}
```
