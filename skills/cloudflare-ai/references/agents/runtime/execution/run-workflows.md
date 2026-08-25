---
description: Integrate Cloudflare Workflows with Agents for durable, multi-step background processing and failure recovery.
title: Run Workflows
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Run Workflows

Last updated Jun 26, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/runtime/execution/run-workflows/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Integrate [Cloudflare Workflows](https://developers.cloudflare.com/workflows/) with Agents for durable, multi-step background processing while Agents handle real-time communication.

Agents vs. Workflows

Agents excel at real-time communication and state management. Workflows excel at durable execution with automatic retries, failure recovery, and waiting for external events.

Use Agents alone for chat, messaging, and quick API calls. Use Agent + Workflow for long-running tasks (over 30 seconds), multi-step pipelines, and human approval flows.

## Quick start

### 1\. Define a Workflow

Extend `AgentWorkflow` for typed access to the originating Agent:

```js
import { AgentWorkflow } from "agents/workflows";

export class ProcessingWorkflow extends AgentWorkflow {
	async run(event, step) {
		const params = event.payload;

		const result = await step.do("process-data", async () => {
			return processData(params.data);
		});

		// Non-durable: progress reporting (may repeat on retry)
		await this.reportProgress({
			step: "process",
			status: "complete",
			percent: 0.5,
		});

		// Broadcast to connected WebSocket clients
		this.broadcastToClients({ type: "update", taskId: params.taskId });

		await step.do("save-results", async () => {
			// Call Agent methods via RPC
			await this.agent.saveResult(params.taskId, result);
		});

		// Durable: idempotent, won't repeat on retry
		await step.reportComplete(result);
		return result;
	}
}
```

```ts
import { AgentWorkflow } from "agents/workflows";
import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";
import type { MyAgent } from "./agent";

type TaskParams = { taskId: string; data: string };

export class ProcessingWorkflow extends AgentWorkflow<MyAgent, TaskParams> {
	async run(event: AgentWorkflowEvent<TaskParams>, step: AgentWorkflowStep) {
		const params = event.payload;

		const result = await step.do("process-data", async () => {
			return processData(params.data);
		});

		// Non-durable: progress reporting (may repeat on retry)
		await this.reportProgress({
			step: "process",
			status: "complete",
			percent: 0.5,
		});

		// Broadcast to connected WebSocket clients
		this.broadcastToClients({ type: "update", taskId: params.taskId });

		await step.do("save-results", async () => {
			// Call Agent methods via RPC
			await this.agent.saveResult(params.taskId, result);
		});

		// Durable: idempotent, won't repeat on retry
		await step.reportComplete(result);
		return result;
	}
}
```

### 2\. Start a Workflow from an Agent

Use `runWorkflow()` to start and track workflows:

```js
import { Agent } from "agents";

export class MyAgent extends Agent {
	async startTask(taskId, data) {
		const instanceId = await this.runWorkflow("PROCESSING_WORKFLOW", {
			taskId,
			data,
		});
		return { instanceId };
	}

	async onWorkflowProgress(workflowName, instanceId, progress) {
		this.broadcast(JSON.stringify({ type: "workflow-progress", progress }));
	}

	async onWorkflowComplete(workflowName, instanceId, result) {
		console.log(`Workflow completed:`, result);
	}

	async saveResult(taskId, result) {
		this
			.sql`INSERT INTO results (task_id, data) VALUES (${taskId}, ${JSON.stringify(result)})`;
	}
}
```

```ts
import { Agent } from "agents";

export class MyAgent extends Agent {
	async startTask(taskId: string, data: string) {
		const instanceId = await this.runWorkflow("PROCESSING_WORKFLOW", {
			taskId,
			data,
		});
		return { instanceId };
	}

	async onWorkflowProgress(
		workflowName: string,
		instanceId: string,
		progress: unknown,
	) {
		this.broadcast(JSON.stringify({ type: "workflow-progress", progress }));
	}

	async onWorkflowComplete(
		workflowName: string,
		instanceId: string,
		result?: unknown,
	) {
		console.log(`Workflow completed:`, result);
	}

	async saveResult(taskId: string, result: unknown) {
		this
			.sql`INSERT INTO results (task_id, data) VALUES (${taskId}, ${JSON.stringify(result)})`;
	}
}
```

### 3\. Configure Wrangler

```jsonc
{
	"name": "my-app",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-08-25",
	"durable_objects": {
		"bindings": [{ "name": "MY_AGENT", "class_name": "MyAgent" }],
	},
	"workflows": [
		{
			"name": "processing-workflow",
			"binding": "PROCESSING_WORKFLOW",
			"class_name": "ProcessingWorkflow",
		},
	],
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["MyAgent"] }],
}
```

```toml
name = "my-app"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-08-25"

[[durable_objects.bindings]]
name = "MY_AGENT"
class_name = "MyAgent"

[[workflows]]
name = "processing-workflow"
binding = "PROCESSING_WORKFLOW"
class_name = "ProcessingWorkflow"

[[migrations]]
tag = "v1"
new_sqlite_classes = [ "MyAgent" ]
```

## AgentWorkflow class

Base class for Workflows that integrate with Agents.

### Type parameters

| Parameter    | Description                                               |
| ------------ | --------------------------------------------------------- |
| AgentType    | The Agent class type for typed RPC                        |
| Params       | Parameters passed to the workflow                         |
| ProgressType | Type for progress reporting (defaults to DefaultProgress) |
| Env          | Environment type (defaults to Cloudflare.Env)             |

### Properties

| Property     | Type   | Description                                                                                                                                                                                       |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| agent        | Stub   | Typed stub for calling Agent methods. For workflows started from a sub-agent, this is an RPC-only stub back to the originating facet; use sub-agent routing for HTTP or WebSocket fetch() traffic |
| instanceId   | string | The workflow instance ID                                                                                                                                                                          |
| workflowName | string | The workflow binding name                                                                                                                                                                         |
| env          | Env    | Environment bindings                                                                                                                                                                              |

### Instance methods (non-durable)

These methods may repeat on retry. Use for lightweight, frequent updates.

#### reportProgress(progress)

Report progress to the Agent. Triggers `onWorkflowProgress` callback.

```js
await this.reportProgress({
	step: "processing",
	status: "running",
	percent: 0.5,
});
```

```ts
await this.reportProgress({
	step: "processing",
	status: "running",
	percent: 0.5,
});
```

#### broadcastToClients(message)

Broadcast a message to all WebSocket clients connected to the Agent.

```js
this.broadcastToClients({ type: "update", data: result });
```

```ts
this.broadcastToClients({ type: "update", data: result });
```

#### waitForApproval(step, options?)

Wait for an approval event. Throws `WorkflowRejectedError` if rejected.

```js
const approval = await this.waitForApproval(step, {
	timeout: "7 days",
});
```

```ts
const approval = await this.waitForApproval<{ approvedBy: string }>(step, {
	timeout: "7 days",
});
```

### Step methods (durable)

These methods are idempotent and will not repeat on retry. Use for state changes that must persist.

| Method                        | Description                                    |
| ----------------------------- | ---------------------------------------------- |
| step.reportComplete(result?)  | Report successful completion                   |
| step.reportError(error)       | Report an error                                |
| step.sendEvent(event)         | Send a custom event to the Agent               |
| step.updateAgentState(state)  | Replace Agent state (broadcasts to clients)    |
| step.mergeAgentState(partial) | Merge into Agent state (broadcasts to clients) |
| step.resetAgentState()        | Reset Agent state to initialState              |

### DefaultProgress type

```ts
type DefaultProgress = {
	step?: string;
	status?: "pending" | "running" | "complete" | "error";
	message?: string;
	percent?: number;
	[key: string]: unknown;
};
```

## Agent workflow methods

Methods available on the `Agent` class for Workflow management.

### runWorkflow(workflowName, params, options?)

Start a workflow instance and track it in the Agent database.

**Parameters:**

| Parameter            | Type   | Description                                                                                                           |
| -------------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| workflowName         | string | Workflow binding name from env                                                                                        |
| params               | object | Parameters to pass to the workflow                                                                                    |
| options.id           | string | Custom workflow ID (auto-generated if not provided)                                                                   |
| options.metadata     | object | Metadata stored for querying (not passed to workflow)                                                                 |
| options.agentBinding | string | Agent binding name (auto-detected if not provided). When called from a sub-agent, this is the root Agent binding name |

**Returns:** `Promise<string>` \- Workflow instance ID

```js
const instanceId = await this.runWorkflow(
	"MY_WORKFLOW",
	{ taskId: "123" },
	{
		metadata: { userId: "user-456", priority: "high" },
	},
);
```

```ts
const instanceId = await this.runWorkflow(
	"MY_WORKFLOW",
	{ taskId: "123" },
	{
		metadata: { userId: "user-456", priority: "high" },
	},
);
```

#### Starting workflows from sub-agents

Sub-agents can call `this.runWorkflow()` directly. The workflow is tracked in the originating sub-agent's SQLite database, and `this.agent` inside `AgentWorkflow` routes back to that same sub-agent for RPC calls, callbacks, state updates, and broadcasts.

Parent agents do not automatically list or control workflows that a sub-agent starts. `SubAgentStub<T>` only exposes user-defined methods, not inherited `Agent` methods such as `approveWorkflow()` or `getWorkflow()`. To control a child-started workflow from the parent, define small wrapper methods on the child and call those wrappers through the sub-agent stub.

```js
export class ParentAgent extends Agent {
	async startChildWorkflow(childName, task) {
		const child = await this.subAgent(ChildAgent, childName);
		return child.startWorkflow(task);
	}

	async approveChildWorkflow(childName, workflowId) {
		const child = await this.subAgent(ChildAgent, childName);
		return child.approveChildWorkflow(workflowId);
	}
}

export class ChildAgent extends Agent {
	async startWorkflow(task) {
		return this.runWorkflow("CHILD_WORKFLOW", { task });
	}

	async approveChildWorkflow(workflowId) {
		return this.approveWorkflow(workflowId);
	}

	async getChildWorkflow(workflowId) {
		return this.getWorkflow(workflowId);
	}
}
```

```ts
export class ParentAgent extends Agent {
	async startChildWorkflow(childName: string, task: string) {
		const child = await this.subAgent(ChildAgent, childName);
		return child.startWorkflow(task);
	}

	async approveChildWorkflow(childName: string, workflowId: string) {
		const child = await this.subAgent(ChildAgent, childName);
		return child.approveChildWorkflow(workflowId);
	}
}

export class ChildAgent extends Agent {
	async startWorkflow(task: string) {
		return this.runWorkflow("CHILD_WORKFLOW", { task });
	}

	async approveChildWorkflow(workflowId: string) {
		return this.approveWorkflow(workflowId);
	}

	async getChildWorkflow(workflowId: string) {
		return this.getWorkflow(workflowId);
	}
}
```

For sub-agent origins, `AgentWorkflow.agent` is an RPC-only stub. Use it to call Agent methods, but use `routeSubAgentRequest()` or the `/agents/{parent}/{name}/sub/{child}/{name}` URL shape for external HTTP or WebSocket routing instead of `this.agent.fetch()`.

#### Routing constraints

Because the originating identity is persisted durably in the workflow params and replayed on every callback, a few constraints apply to all workflows (sub-agent and top-level alike):

* **Callbacks resolve the Agent by name.** The runtime re-resolves the originating Agent with `getAgentByName(...)`. If you addressed the Agent by a raw Durable Object ID (`idFromString` / `get(id)`) instead of by name, callbacks land on a different instance. Start workflows from name-addressed Agents.
* **Class names must survive bundling.** The originating path is keyed by `constructor.name`. Configure your bundler to preserve class names (esbuild `keepNames: true`) so progress, completion, and `this.agent` RPC can be routed back to the right facet.
* **`agentBinding` is the root binding.** When you pass `options.agentBinding` from a sub-agent, use the **root** Agent's Durable Object binding name, not a child binding.

### sendWorkflowEvent(workflowName, instanceId, event)

Send an event to a running workflow.

```js
await this.sendWorkflowEvent("MY_WORKFLOW", instanceId, {
	type: "custom-event",
	payload: { action: "proceed" },
});
```

```ts
await this.sendWorkflowEvent("MY_WORKFLOW", instanceId, {
	type: "custom-event",
	payload: { action: "proceed" },
});
```

### getWorkflowStatus(workflowName, instanceId)

Get the status of a workflow and update the tracking record.

```js
const status = await this.getWorkflowStatus("MY_WORKFLOW", instanceId);
// { status: 'running', output: null, error: null }
```

```ts
const status = await this.getWorkflowStatus("MY_WORKFLOW", instanceId);
// { status: 'running', output: null, error: null }
```

### getWorkflow(instanceId)

Get a tracked workflow by ID.

```js
const workflow = this.getWorkflow(instanceId);
// { instanceId, workflowName, status, metadata, error, createdAt, ... }
```

```ts
const workflow = this.getWorkflow(instanceId);
// { instanceId, workflowName, status, metadata, error, createdAt, ... }
```

### getWorkflows(criteria?)

Query tracked workflows with cursor-based pagination. Returns a `WorkflowPage` with workflows, total count, and cursor for the next page.

```js
// Get running workflows (default limit is 50, max is 100)
const { workflows, total } = this.getWorkflows({ status: "running" });

// Filter by metadata
const { workflows: userWorkflows } = this.getWorkflows({
	metadata: { userId: "user-456" },
});

// Pagination with cursor
const page1 = this.getWorkflows({
	status: ["complete", "errored"],
	limit: 20,
	orderBy: "desc",
});

console.log(`Showing ${page1.workflows.length} of ${page1.total} workflows`);

// Get next page using cursor
if (page1.nextCursor) {
	const page2 = this.getWorkflows({
		status: ["complete", "errored"],
		limit: 20,
		orderBy: "desc",
		cursor: page1.nextCursor,
	});
}
```

```ts
// Get running workflows (default limit is 50, max is 100)
const { workflows, total } = this.getWorkflows({ status: "running" });

// Filter by metadata
const { workflows: userWorkflows } = this.getWorkflows({
	metadata: { userId: "user-456" },
});

// Pagination with cursor
const page1 = this.getWorkflows({
	status: ["complete", "errored"],
	limit: 20,
	orderBy: "desc",
});

console.log(`Showing ${page1.workflows.length} of ${page1.total} workflows`);

// Get next page using cursor
if (page1.nextCursor) {
	const page2 = this.getWorkflows({
		status: ["complete", "errored"],
		limit: 20,
		orderBy: "desc",
		cursor: page1.nextCursor,
	});
}
```

The `WorkflowPage` type:

```ts
type WorkflowPage = {
	workflows: WorkflowInfo[];
	total: number; // Total matching workflows
	nextCursor: string | null; // null when no more pages
};
```

### deleteWorkflow(instanceId)

Delete a single workflow instance tracking record. Returns `true` if deleted, `false` if not found.

### deleteWorkflows(criteria?)

Delete workflow instance tracking records matching criteria.

```js
// Delete completed workflow instances older than 7 days
this.deleteWorkflows({
	status: "complete",
	createdBefore: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
});

// Delete all errored and terminated workflows
this.deleteWorkflows({
	status: ["errored", "terminated"],
});
```

```ts
// Delete completed workflow instances older than 7 days
this.deleteWorkflows({
	status: "complete",
	createdBefore: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
});

// Delete all errored and terminated workflows
this.deleteWorkflows({
	status: ["errored", "terminated"],
});
```

### terminateWorkflow(instanceId)

Terminate a running workflow immediately. Sets status to `"terminated"`.

```js
await this.terminateWorkflow(instanceId);
```

```ts
await this.terminateWorkflow(instanceId);
```

Note

`terminate()` is not yet supported in local development with `wrangler dev`. It works when deployed to Cloudflare.

### pauseWorkflow(instanceId)

Pause a running workflow. The workflow can be resumed later with `resumeWorkflow()`.

```js
await this.pauseWorkflow(instanceId);
```

```ts
await this.pauseWorkflow(instanceId);
```

Note

`pause()` is not yet supported in local development with `wrangler dev`. It works when deployed to Cloudflare.

### resumeWorkflow(instanceId)

Resume a paused workflow.

```js
await this.resumeWorkflow(instanceId);
```

```ts
await this.resumeWorkflow(instanceId);
```

Note

`resume()` is not yet supported in local development with `wrangler dev`. It works when deployed to Cloudflare.

### restartWorkflow(instanceId, options?)

Restart a workflow instance from the beginning with the same ID.

```js
// Reset tracking (default) - clears timestamps and error fields
await this.restartWorkflow(instanceId);

// Preserve original timestamps
await this.restartWorkflow(instanceId, { resetTracking: false });
```

```ts
// Reset tracking (default) - clears timestamps and error fields
await this.restartWorkflow(instanceId);

// Preserve original timestamps
await this.restartWorkflow(instanceId, { resetTracking: false });
```

Note

`restart()` is not yet supported in local development with `wrangler dev`. It works when deployed to Cloudflare.

### approveWorkflow(instanceId, options?)

Approve a waiting workflow. Use with `waitForApproval()` in the workflow.

```js
await this.approveWorkflow(instanceId, {
	reason: "Approved by admin",
	metadata: { approvedBy: userId },
});
```

```ts
await this.approveWorkflow(instanceId, {
	reason: "Approved by admin",
	metadata: { approvedBy: userId },
});
```

### rejectWorkflow(instanceId, options?)

Reject a waiting workflow. Causes `waitForApproval()` to throw `WorkflowRejectedError`.

```js
await this.rejectWorkflow(instanceId, { reason: "Request denied" });
```

```ts
await this.rejectWorkflow(instanceId, { reason: "Request denied" });
```

### migrateWorkflowBinding(oldName, newName)

Migrate tracked workflows after renaming a workflow binding.

```js
class MyAgent extends Agent {
	async onStart() {
		this.migrateWorkflowBinding("OLD_WORKFLOW", "NEW_WORKFLOW");
	}
}
```

```ts
class MyAgent extends Agent {
	async onStart() {
		this.migrateWorkflowBinding("OLD_WORKFLOW", "NEW_WORKFLOW");
	}
}
```

## Lifecycle callbacks

Override these methods in your Agent to handle workflow events:

| Callback           | Parameters                         | Description                           |
| ------------------ | ---------------------------------- | ------------------------------------- |
| onWorkflowProgress | workflowName, instanceId, progress | Called when workflow reports progress |
| onWorkflowComplete | workflowName, instanceId, result?  | Called when workflow completes        |
| onWorkflowError    | workflowName, instanceId, error    | Called when workflow errors           |
| onWorkflowEvent    | workflowName, instanceId, event    | Called when workflow sends an event   |
| onWorkflowCallback | callback: WorkflowCallback         | Called for all callback types         |

```js
class MyAgent extends Agent {
	async onWorkflowProgress(workflowName, instanceId, progress) {
		this.broadcast(
			JSON.stringify({ type: "progress", workflowName, instanceId, progress }),
		);
	}

	async onWorkflowComplete(workflowName, instanceId, result) {
		console.log(`${workflowName}/${instanceId} completed`);
	}

	async onWorkflowError(workflowName, instanceId, error) {
		console.error(`${workflowName}/${instanceId} failed:`, error);
	}
}
```

```ts
class MyAgent extends Agent {
	async onWorkflowProgress(
		workflowName: string,
		instanceId: string,
		progress: unknown,
	) {
		this.broadcast(
			JSON.stringify({ type: "progress", workflowName, instanceId, progress }),
		);
	}

	async onWorkflowComplete(
		workflowName: string,
		instanceId: string,
		result?: unknown,
	) {
		console.log(`${workflowName}/${instanceId} completed`);
	}

	async onWorkflowError(
		workflowName: string,
		instanceId: string,
		error: string,
	) {
		console.error(`${workflowName}/${instanceId} failed:`, error);
	}
}
```

## Workflow tracking

Workflows started with `runWorkflow()` are automatically tracked in the originating Agent's internal database. You can query, filter, and manage workflows using the methods described above (`getWorkflow()`, `getWorkflows()`, `deleteWorkflow()`, etc.).

Sub-agent scoping

`getWorkflows()` and `getWorkflowById()` only see workflows tracked in **this** Agent's storage. If a sub-agent starts the workflow, the row lives in that sub-agent's own `cf_agents_workflows` table, not in the parent's. To build a combined view, expose a wrapper method on each child (for example, `listMyWorkflows()`) and aggregate the results across your sub-agents yourself.

### Status values

| Status     | Description           |
| ---------- | --------------------- |
| queued     | Waiting to start      |
| running    | Currently executing   |
| paused     | Paused by user        |
| waiting    | Waiting for event     |
| complete   | Finished successfully |
| errored    | Failed with error     |
| terminated | Manually terminated   |

Use the `metadata` option in `runWorkflow()` to store queryable information (like user IDs or task types) that you can filter on later with `getWorkflows()`.

## Examples

### Human-in-the-loop approval

```js
import { AgentWorkflow } from "agents/workflows";

export class ApprovalWorkflow extends AgentWorkflow {
	async run(event, step) {
		const request = await step.do("prepare", async () => {
			return { ...event.payload, preparedAt: Date.now() };
		});

		await this.reportProgress({
			step: "approval",
			status: "pending",
			message: "Awaiting approval",
		});

		// Throws WorkflowRejectedError if rejected
		const approval = await this.waitForApproval(step, {
			timeout: "7 days",
		});

		console.log("Approved by:", approval?.approvedBy);

		const result = await step.do("execute", async () => {
			return executeRequest(request);
		});

		await step.reportComplete(result);
		return result;
	}
}

class MyAgent extends Agent {
	async handleApproval(instanceId, userId) {
		await this.approveWorkflow(instanceId, {
			reason: "Approved by admin",
			metadata: { approvedBy: userId },
		});
	}

	async handleRejection(instanceId, reason) {
		await this.rejectWorkflow(instanceId, { reason });
	}
}
```

```ts
import { AgentWorkflow } from "agents/workflows";
import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";

export class ApprovalWorkflow extends AgentWorkflow<MyAgent, RequestParams> {
	async run(event: AgentWorkflowEvent<RequestParams>, step: AgentWorkflowStep) {
		const request = await step.do("prepare", async () => {
			return { ...event.payload, preparedAt: Date.now() };
		});

		await this.reportProgress({
			step: "approval",
			status: "pending",
			message: "Awaiting approval",
		});

		// Throws WorkflowRejectedError if rejected
		const approval = await this.waitForApproval<{ approvedBy: string }>(step, {
			timeout: "7 days",
		});

		console.log("Approved by:", approval?.approvedBy);

		const result = await step.do("execute", async () => {
			return executeRequest(request);
		});

		await step.reportComplete(result);
		return result;
	}
}

class MyAgent extends Agent {
	async handleApproval(instanceId: string, userId: string) {
		await this.approveWorkflow(instanceId, {
			reason: "Approved by admin",
			metadata: { approvedBy: userId },
		});
	}

	async handleRejection(instanceId: string, reason: string) {
		await this.rejectWorkflow(instanceId, { reason });
	}
}
```

### Retry with backoff

```js
import { AgentWorkflow } from "agents/workflows";

export class ResilientWorkflow extends AgentWorkflow {
	async run(event, step) {
		const result = await step.do(
			"call-api",
			{
				retries: { limit: 5, delay: "10 seconds", backoff: "exponential" },
				timeout: "5 minutes",
			},
			async () => {
				const response = await fetch("https://api.example.com/process", {
					method: "POST",
					body: JSON.stringify(event.payload),
				});
				if (!response.ok) throw new Error(`API error: ${response.status}`);
				return response.json();
			},
		);

		await step.reportComplete(result);
		return result;
	}
}
```

```ts
import { AgentWorkflow } from "agents/workflows";
import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";

export class ResilientWorkflow extends AgentWorkflow<MyAgent, TaskParams> {
	async run(event: AgentWorkflowEvent<TaskParams>, step: AgentWorkflowStep) {
		const result = await step.do(
			"call-api",
			{
				retries: { limit: 5, delay: "10 seconds", backoff: "exponential" },
				timeout: "5 minutes",
			},
			async () => {
				const response = await fetch("https://api.example.com/process", {
					method: "POST",
					body: JSON.stringify(event.payload),
				});
				if (!response.ok) throw new Error(`API error: ${response.status}`);
				return response.json();
			},
		);

		await step.reportComplete(result);
		return result;
	}
}
```

### State synchronization

Workflows can update Agent state durably via `step`, which automatically broadcasts to all connected clients:

```js
import { AgentWorkflow } from "agents/workflows";

export class StatefulWorkflow extends AgentWorkflow {
	async run(event, step) {
		// Replace entire state (durable, broadcasts to clients)
		await step.updateAgentState({
			currentTask: {
				id: event.payload.taskId,
				status: "processing",
				startedAt: Date.now(),
			},
		});

		const result = await step.do("process", async () =>
			processTask(event.payload),
		);

		// Merge partial state (durable, keeps existing fields)
		await step.mergeAgentState({
			currentTask: { status: "complete", result, completedAt: Date.now() },
		});

		await step.reportComplete(result);
		return result;
	}
}
```

```ts
import { AgentWorkflow } from "agents/workflows";
import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";

export class StatefulWorkflow extends AgentWorkflow<MyAgent, TaskParams> {
	async run(event: AgentWorkflowEvent<TaskParams>, step: AgentWorkflowStep) {
		// Replace entire state (durable, broadcasts to clients)
		await step.updateAgentState({
			currentTask: {
				id: event.payload.taskId,
				status: "processing",
				startedAt: Date.now(),
			},
		});

		const result = await step.do("process", async () =>
			processTask(event.payload),
		);

		// Merge partial state (durable, keeps existing fields)
		await step.mergeAgentState({
			currentTask: { status: "complete", result, completedAt: Date.now() },
		});

		await step.reportComplete(result);
		return result;
	}
}
```

### Custom progress types

Define custom progress types for domain-specific reporting:

```js
import { AgentWorkflow } from "agents/workflows";

// Custom progress type for data pipeline

// Workflow with custom progress type (3rd type parameter)
export class ETLWorkflow extends AgentWorkflow {
	async run(event, step) {
		await this.reportProgress({
			stage: "extract",
			recordsProcessed: 0,
			totalRecords: 1000,
			currentTable: "users",
		});

		// ... processing
	}
}

// Agent receives typed progress
class MyAgent extends Agent {
	async onWorkflowProgress(workflowName, instanceId, progress) {
		const p = progress;
		console.log(`Stage: ${p.stage}, ${p.recordsProcessed}/${p.totalRecords}`);
	}
}
```

```ts
import { AgentWorkflow } from "agents/workflows";
import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";

// Custom progress type for data pipeline
type PipelineProgress = {
	stage: "extract" | "transform" | "load";
	recordsProcessed: number;
	totalRecords: number;
	currentTable?: string;
};

// Workflow with custom progress type (3rd type parameter)
export class ETLWorkflow extends AgentWorkflow<
	MyAgent,
	ETLParams,
	PipelineProgress
> {
	async run(event: AgentWorkflowEvent<ETLParams>, step: AgentWorkflowStep) {
		await this.reportProgress({
			stage: "extract",
			recordsProcessed: 0,
			totalRecords: 1000,
			currentTable: "users",
		});

		// ... processing
	}
}

// Agent receives typed progress
class MyAgent extends Agent {
	async onWorkflowProgress(
		workflowName: string,
		instanceId: string,
		progress: unknown,
	) {
		const p = progress as PipelineProgress;
		console.log(`Stage: ${p.stage}, ${p.recordsProcessed}/${p.totalRecords}`);
	}
}
```

### Cleanup strategy

The internal `cf_agents_workflows` table can grow unbounded, so implement a retention policy:

```js
class MyAgent extends Agent {
	// Option 1: Delete on completion
	async onWorkflowComplete(workflowName, instanceId, result) {
		// Process result first, then delete
		this.deleteWorkflow(instanceId);
	}

	// Option 2: Scheduled cleanup (keep recent history)
	async cleanupOldWorkflows() {
		this.deleteWorkflows({
			status: ["complete", "errored"],
			createdBefore: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
		});
	}

	// Option 3: Keep all history for compliance/auditing
	// Don't call deleteWorkflows() - query historical data as needed
}
```

```ts
class MyAgent extends Agent {
	// Option 1: Delete on completion
	async onWorkflowComplete(
		workflowName: string,
		instanceId: string,
		result?: unknown,
	) {
		// Process result first, then delete
		this.deleteWorkflow(instanceId);
	}

	// Option 2: Scheduled cleanup (keep recent history)
	async cleanupOldWorkflows() {
		this.deleteWorkflows({
			status: ["complete", "errored"],
			createdBefore: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
		});
	}

	// Option 3: Keep all history for compliance/auditing
	// Don't call deleteWorkflows() - query historical data as needed
}
```

## Bidirectional communication

### Workflow to Agent

```js
// Direct RPC call (typed)
await this.agent.updateTaskStatus(taskId, "processing");
const data = await this.agent.getData(taskId);

// Non-durable callbacks (may repeat on retry, use for frequent updates)
await this.reportProgress({ step: "process", percent: 0.5 });
this.broadcastToClients({ type: "update", data });

// Durable callbacks via step (idempotent, won't repeat on retry)
await step.reportComplete(result);
await step.reportError("Something went wrong");
await step.sendEvent({ type: "custom", data: {} });

// Durable state synchronization via step (broadcasts to clients)
await step.updateAgentState({ status: "processing" });
await step.mergeAgentState({ progress: 0.5 });
```

```ts
// Direct RPC call (typed)
await this.agent.updateTaskStatus(taskId, "processing");
const data = await this.agent.getData(taskId);

// Non-durable callbacks (may repeat on retry, use for frequent updates)
await this.reportProgress({ step: "process", percent: 0.5 });
this.broadcastToClients({ type: "update", data });

// Durable callbacks via step (idempotent, won't repeat on retry)
await step.reportComplete(result);
await step.reportError("Something went wrong");
await step.sendEvent({ type: "custom", data: {} });

// Durable state synchronization via step (broadcasts to clients)
await step.updateAgentState({ status: "processing" });
await step.mergeAgentState({ progress: 0.5 });
```

### Agent to Workflow

```js
// Send event to waiting workflow
await this.sendWorkflowEvent("MY_WORKFLOW", instanceId, {
	type: "custom-event",
	payload: { action: "proceed" },
});

// Approve/reject workflows using convenience methods
await this.approveWorkflow(instanceId, {
	reason: "Approved by admin",
	metadata: { approvedBy: userId },
});

await this.rejectWorkflow(instanceId, { reason: "Request denied" });
```

```ts
// Send event to waiting workflow
await this.sendWorkflowEvent("MY_WORKFLOW", instanceId, {
	type: "custom-event",
	payload: { action: "proceed" },
});

// Approve/reject workflows using convenience methods
await this.approveWorkflow(instanceId, {
	reason: "Approved by admin",
	metadata: { approvedBy: userId },
});

await this.rejectWorkflow(instanceId, { reason: "Request denied" });
```

## Best practices

1. **Keep workflows focused** — One workflow per logical task
2. **Use meaningful step names** — Helps with debugging and observability
3. **Report progress regularly** — Keeps users informed
4. **Handle errors gracefully** — Use `reportError()` before throwing
5. **Clean up completed workflows** — Implement a retention policy for the tracking table
6. **Handle workflow binding renames** — Use `migrateWorkflowBinding()` when renaming workflow bindings in `wrangler.jsonc`

## Limitations

| Constraint          | Limit                                                     |
| ------------------- | --------------------------------------------------------- |
| Maximum steps       | 10,000 per workflow (default) / configurable up to 25,000 |
| State size          | 10 MB per workflow                                        |
| Event wait time     | 1 year maximum                                            |
| Step execution time | 30 minutes per step                                       |

Workflows cannot open WebSocket connections directly. Use `broadcastToClients()` to communicate with connected clients through the Agent.

## Related resources

### [Workflows documentation](https://developers.cloudflare.com/workflows/)

Learn about Cloudflare Workflows fundamentals.

### [Store and sync state](https://developers.cloudflare.com/agents/runtime/lifecycle/state/)

Persist and synchronize agent state.

### [Schedule tasks](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/)

Time-based task execution.

### [Human-in-the-loop](https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/)

Approval flows and manual intervention patterns.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/execution/run-workflows/#page","headline":"Run Workflows · Cloudflare Agents docs","description":"Integrate Cloudflare Workflows with Agents for durable, multi-step background processing and failure recovery.","url":"https://developers.cloudflare.com/agents/runtime/execution/run-workflows/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
