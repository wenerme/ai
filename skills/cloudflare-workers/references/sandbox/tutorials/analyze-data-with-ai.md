---
description: Upload CSV files, generate analysis code with Claude, and return visualizations.
title: Analyze data with AI
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Analyze data with AI

Last updated May 13, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/tutorials/analyze-data-with-ai/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Build an AI-powered data analysis system that accepts CSV uploads, uses Claude to generate Python analysis code, executes it in sandboxes, and returns visualizations.

**Time to complete**: 25 minutes

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You'll also need:

* An [Anthropic API key ↗](https://console.anthropic.com/) for Claude
* [Docker ↗](https://www.docker.com/) running locally

## 1\. Create your project

Create a new Sandbox SDK project:

npmyarnpnpm

```
npm create cloudflare@latest -- analyze-data --template=cloudflare/sandbox-sdk/examples/minimal
```

```
yarn create cloudflare analyze-data --template=cloudflare/sandbox-sdk/examples/minimal
```

```
pnpm create cloudflare@latest analyze-data --template=cloudflare/sandbox-sdk/examples/minimal
```

```sh
cd analyze-data
```

## 2\. Install dependencies

npmyarnpnpmbun

```
npm i @anthropic-ai/sdk
```

```
yarn add @anthropic-ai/sdk
```

```
pnpm add @anthropic-ai/sdk
```

```
bun add @anthropic-ai/sdk
```

## 3\. Build the analysis handler

Replace `src/index.ts`:

```typescript
import { getSandbox, proxyToSandbox, type Sandbox } from "@cloudflare/sandbox";
import Anthropic from "@anthropic-ai/sdk";

export { Sandbox } from "@cloudflare/sandbox";

interface Env {
	Sandbox: DurableObjectNamespace<Sandbox>;
	ANTHROPIC_API_KEY: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const proxyResponse = await proxyToSandbox(request, env);
		if (proxyResponse) return proxyResponse;

		if (request.method !== "POST") {
			return Response.json(
				{ error: "POST CSV file and question" },
				{ status: 405 },
			);
		}

		try {
			const formData = await request.formData();
			const csvFile = formData.get("file") as File;
			const question = formData.get("question") as string;

			if (!csvFile || !question) {
				return Response.json(
					{ error: "Missing file or question" },
					{ status: 400 },
				);
			}

			// Upload CSV to sandbox
			const sandbox = getSandbox(env.Sandbox, `analysis-${Date.now()}`);
			const csvPath = "/workspace/data.csv";
			await sandbox.writeFile(csvPath, await csvFile.text());

			// Analyze CSV structure
			const structure = await sandbox.exec(
				`python3 -c "import pandas as pd; df = pd.read_csv('${csvPath}'); print(f'Rows: {len(df)}'); print(f'Columns: {list(df.columns)[:5]}')"`,
			);

			if (!structure.success) {
				return Response.json(
					{ error: "Failed to read CSV", details: structure.stderr },
					{ status: 400 },
				);
			}

			// Generate analysis code with Claude
			const code = await generateAnalysisCode(
				env.ANTHROPIC_API_KEY,
				csvPath,
				question,
				structure.stdout,
			);

			// Write and execute the analysis code
			await sandbox.writeFile("/workspace/analyze.py", code);
			const result = await sandbox.exec("python /workspace/analyze.py");

			if (!result.success) {
				return Response.json(
					{ error: "Analysis failed", details: result.stderr },
					{ status: 500 },
				);
			}

			async function streamToBase64(stream) {
			  const blob = await new Response(stream).blob();
			  const buffer = await blob.arrayBuffer();
			  const bytes = new Uint8Array(buffer);

			  // Convert to base64
			  let binary = '';
			  for (let i = 0; i < bytes.length; i++) {
			    binary += String.fromCharCode(bytes[i]);
			  }
			  return btoa(binary);
			}

			// Check for generated chart
			let chart = null;
			try {
				const { content, mimeType } = await sandbox.readFile("/workspace/chart.png", {
					encoding: "none"
				});
				chart = `data:${mimeType};base64,${await streamToBase64(content)}`;
			} catch {
				// No chart generated
			}

			await sandbox.destroy();

			return Response.json({
				success: true,
				output: result.stdout,
				chart,
				code,
			});
		} catch (error: any) {
			return Response.json({ error: error.message }, { status: 500 });
		}
	},
};

async function generateAnalysisCode(
	apiKey: string,
	csvPath: string,
	question: string,
	csvStructure: string,
): Promise<string> {
	const anthropic = new Anthropic({ apiKey });

	const response = await anthropic.messages.create({
		model: "claude-sonnet-4-5",
		max_tokens: 2048,
		messages: [
			{
				role: "user",
				content: `CSV at ${csvPath}:
${csvStructure}

Question: "${question}"

Generate Python code that:
- Reads CSV with pandas
- Answers the question
- Saves charts to /workspace/chart.png if helpful
- Prints findings to stdout

Use pandas, numpy, matplotlib.`,
			},
		],
		tools: [
			{
				name: "generate_python_code",
				description: "Generate Python code for data analysis",
				input_schema: {
					type: "object",
					properties: {
						code: { type: "string", description: "Complete Python code" },
					},
					required: ["code"],
				},
			},
		],
	});

	for (const block of response.content) {
		if (block.type === "tool_use" && block.name === "generate_python_code") {
			return (block.input as { code: string }).code;
		}
	}

	throw new Error("Failed to generate code");
}
```

## 4\. Set up local environment variables

Create a `.dev.vars` file in your project root for local development:

```sh
echo "ANTHROPIC_API_KEY=your_api_key_here\nSANDBOX_TRANSPORT=rpc" > .dev.vars
```

Replace `your_api_key_here` with your actual API key from the [Anthropic Console ↗](https://console.anthropic.com/).

The `SANDBOX_TRANSPORT` is required to use the new file streaming APIs.

Note

The `.dev.vars` file is automatically gitignored and only used during local development with `npm run dev`.

## 5\. Test locally

Download a sample CSV:

```sh
# Create a test CSV
echo "year,rating,title
2020,8.5,Movie A
2021,7.2,Movie B
2022,9.1,Movie C" > test.csv
```

Start the dev server:

```sh
npm run dev
```

Test with curl:

```sh
curl -X POST http://localhost:8787 \
  -F "file=@test.csv" \
  -F "question=What is the average rating by year?"
```

Response:

```json
{
	"success": true,
	"output": "Average ratings by year:\n2020: 8.5\n2021: 7.2\n2022: 9.1",
	"chart": "data:image/png;base64,...",
	"code": "import pandas as pd\nimport matplotlib.pyplot as plt\n..."
}
```

## 6\. Deploy

Deploy your Worker:

```sh
npx wrangler deploy
```

Then set your Anthropic API key as a production secret:

```sh
npx wrangler secret put ANTHROPIC_API_KEY
```

Paste your API key from the [Anthropic Console ↗](https://console.anthropic.com/) when prompted.

Caution

Wait 2-3 minutes after first deployment for container provisioning.

## What you built

An AI data analysis system that:

* Uploads CSV files to sandboxes
* Uses Claude's tool calling to generate analysis code
* Executes Python with pandas and matplotlib
* Returns text output and visualizations

## Next steps

* [Code Interpreter API](https://developers.cloudflare.com/sandbox/api/interpreter/) \- Use the built-in code interpreter
* [File operations](https://developers.cloudflare.com/sandbox/guides/manage-files/) \- Advanced file handling
* [Streaming output](https://developers.cloudflare.com/sandbox/guides/streaming-output/) \- Real-time progress updates

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/tutorials/analyze-data-with-ai/#page","headline":"Analyze data with AI · Cloudflare Sandbox SDK docs","description":"Upload CSV files, generate analysis code with Claude, and return visualizations.","url":"https://developers.cloudflare.com/sandbox/tutorials/analyze-data-with-ai/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
