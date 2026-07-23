---
description: Implement human-in-the-loop functionality using Workflow approvals, durable Code Mode approvals, and MCP elicitation.
title: Human-in-the-loop patterns
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Human-in-the-loop patterns

Last updated Jul 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Human-in-the-loop (HITL) patterns add approval or input at different layers of an Agent. You can respond to an MCP server request, hold application work in a durable Workflow, or approve a connector call before model-generated code invokes a tool.

## Why human-in-the-loop?

* **Compliance**: Regulatory requirements may mandate human approval for certain actions
* **Safety**: High-stakes operations (payments, deletions, external communications) need oversight
* **Quality**: Human review catches errors AI might miss
* **Trust**: Users feel more confident when they can approve critical actions

### Common use cases

Common uses include financial approvals, content moderation, bulk data operations, approval before side-effecting tool calls, and access-control changes.

## Choosing a pattern

Choose the pattern based on who introduces the pause and where it occurs:

| Pattern                | Approval layer                             | Initiated by                | Typical wait            | Key API                               |
| ---------------------- | ------------------------------------------ | --------------------------- | ----------------------- | ------------------------------------- |
| **MCP elicitation**    | MCP request handled by your Agent client   | MCP server developer        | Minutes                 | configureElicitationHandlers()        |
| **Workflow approval**  | Durable application task or tool operation | Agent application developer | Months or years         | waitForApproval()                     |
| **Code Mode approval** | Connector call in model-generated code     | Code Mode Agent developer   | Until configured expiry | requiresApproval, approve(), reject() |

## Workflow-based approval

Use [Cloudflare Workflows](https://developers.cloudflare.com/workflows/) when your application needs to hold a task or tool operation for as long as approval requires. `waitForApproval()` creates a durable gate backed by Cloudflare Workflows, so the wait can continue for months or longer without keeping an Agent running.

### Basic pattern

```js
import { Agent } from "agents";
import { AgentWorkflow } from "agents/workflows";

export class ExpenseWorkflow extends AgentWorkflow {
	async run(event, step) {
		const expense = event.payload;

		// Step 1: Validate the expense
		const validated = await step.do("validate", async () => {
			if (expense.amount <= 0) {
				throw new Error("Invalid expense amount");
			}
			return { ...expense, validatedAt: Date.now() };
		});

		// Step 2: Report that we are waiting for approval
		await this.reportProgress({
			step: "approval",
			status: "pending",
			message: `Awaiting approval for $${expense.amount}`,
		});

		// Step 3: Wait for human approval (pauses the workflow)
		const approval = await this.waitForApproval(step, {
			timeout: "7 days",
		});

		console.log(`Approved by: ${approval?.approvedBy}`);

		// Step 4: Process the approved expense
		const result = await step.do("process", async () => {
			return { expenseId: crypto.randomUUID(), ...validated };
		});

		await step.reportComplete(result);
		return result;
	}
}
```

```ts
import { Agent } from "agents";
import { AgentWorkflow } from "agents/workflows";
import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";

type ExpenseParams = {
	amount: number;
	description: string;
	requestedBy: string;
};

export class ExpenseWorkflow extends AgentWorkflow<
	ExpenseAgent,
	ExpenseParams
> {
	async run(event: AgentWorkflowEvent<ExpenseParams>, step: AgentWorkflowStep) {
		const expense = event.payload;

		// Step 1: Validate the expense
		const validated = await step.do("validate", async () => {
			if (expense.amount <= 0) {
				throw new Error("Invalid expense amount");
			}
			return { ...expense, validatedAt: Date.now() };
		});

		// Step 2: Report that we are waiting for approval
		await this.reportProgress({
			step: "approval",
			status: "pending",
			message: `Awaiting approval for $${expense.amount}`,
		});

		// Step 3: Wait for human approval (pauses the workflow)
		const approval = await this.waitForApproval<{ approvedBy: string }>(step, {
			timeout: "7 days",
		});

		console.log(`Approved by: ${approval?.approvedBy}`);

		// Step 4: Process the approved expense
		const result = await step.do("process", async () => {
			return { expenseId: crypto.randomUUID(), ...validated };
		});

		await step.reportComplete(result);
		return result;
	}
}
```

### Agent methods for approval

The agent provides methods to approve or reject waiting workflows:

```js
import { Agent, callable } from "agents";

export class ExpenseAgent extends Agent {
	initialState = {
		pendingApprovals: [],
	};

	// Approve a waiting workflow
	@callable()
	async approve(workflowId, approvedBy) {
		await this.approveWorkflow(workflowId, {
			reason: "Expense approved",
			metadata: { approvedBy, approvedAt: Date.now() },
		});

		// Update state to reflect approval
		this.setState({
			...this.state,
			pendingApprovals: this.state.pendingApprovals.filter(
				(p) => p.workflowId !== workflowId,
			),
		});
	}

	// Reject a waiting workflow
	@callable()
	async reject(workflowId, reason) {
		await this.rejectWorkflow(workflowId, { reason });

		this.setState({
			...this.state,
			pendingApprovals: this.state.pendingApprovals.filter(
				(p) => p.workflowId !== workflowId,
			),
		});
	}

	// Track workflow progress to update pending approvals
	async onWorkflowProgress(workflowName, workflowId, progress) {
		const p = progress;

		if (p.step === "approval" && p.status === "pending") {
			// Add to pending approvals list for UI display
			this.setState({
				...this.state,
				pendingApprovals: [
					...this.state.pendingApprovals,
					{
						workflowId,
						amount: 0, // Would come from workflow params
						description: p.message || "",
						requestedBy: "user",
						requestedAt: Date.now(),
					},
				],
			});
		}
	}
}
```

```ts
import { Agent, callable } from "agents";

type PendingApproval = {
	workflowId: string;
	amount: number;
	description: string;
	requestedBy: string;
	requestedAt: number;
};

type ExpenseState = {
	pendingApprovals: PendingApproval[];
};

export class ExpenseAgent extends Agent<Env, ExpenseState> {
	initialState: ExpenseState = {
		pendingApprovals: [],
	};

	// Approve a waiting workflow
	@callable()
	async approve(workflowId: string, approvedBy: string): Promise<void> {
		await this.approveWorkflow(workflowId, {
			reason: "Expense approved",
			metadata: { approvedBy, approvedAt: Date.now() },
		});

		// Update state to reflect approval
		this.setState({
			...this.state,
			pendingApprovals: this.state.pendingApprovals.filter(
				(p) => p.workflowId !== workflowId,
			),
		});
	}

	// Reject a waiting workflow
	@callable()
	async reject(workflowId: string, reason: string): Promise<void> {
		await this.rejectWorkflow(workflowId, { reason });

		this.setState({
			...this.state,
			pendingApprovals: this.state.pendingApprovals.filter(
				(p) => p.workflowId !== workflowId,
			),
		});
	}

	// Track workflow progress to update pending approvals
	async onWorkflowProgress(
		workflowName: string,
		workflowId: string,
		progress: unknown,
	): Promise<void> {
		const p = progress as { step: string; status: string; message?: string };

		if (p.step === "approval" && p.status === "pending") {
			// Add to pending approvals list for UI display
			this.setState({
				...this.state,
				pendingApprovals: [
					...this.state.pendingApprovals,
					{
						workflowId,
						amount: 0, // Would come from workflow params
						description: p.message || "",
						requestedBy: "user",
						requestedAt: Date.now(),
					},
				],
			});
		}
	}
}
```

### Timeout handling

Set timeouts to prevent workflows from waiting indefinitely:

```js
const approval = await this.waitForApproval(step, {
	timeout: "7 days", // Also supports: "1 hour", "30 minutes", etc.
});

if (!approval) {
	// Timeout expired - escalate or auto-reject
	await step.reportError("Approval timeout - escalating to manager");
	throw new Error("Approval timeout");
}
```

```ts
const approval = await this.waitForApproval<{ approvedBy: string }>(step, {
	timeout: "7 days", // Also supports: "1 hour", "30 minutes", etc.
});

if (!approval) {
	// Timeout expired - escalate or auto-reject
	await step.reportError("Approval timeout - escalating to manager");
	throw new Error("Approval timeout");
}
```

### Escalation with scheduling

Use `schedule()` to set up escalation reminders:

```js
import { Agent, callable } from "agents";

class ExpenseAgent extends Agent {
	@callable()
	async submitForApproval(expense) {
		// Start the approval workflow
		const workflowId = await this.runWorkflow("EXPENSE_WORKFLOW", expense);

		// Schedule reminder after 4 hours
		await this.schedule(Date.now() + 4 * 60 * 60 * 1000, "sendReminder", {
			workflowId,
		});

		// Schedule escalation after 24 hours
		await this.schedule(Date.now() + 24 * 60 * 60 * 1000, "escalateApproval", {
			workflowId,
		});

		return workflowId;
	}

	async sendReminder(payload) {
		const workflow = this.getWorkflow(payload.workflowId);
		if (workflow?.status === "waiting") {
			// Send reminder notification
			console.log("Reminder: approval still pending");
		}
	}

	async escalateApproval(payload) {
		const workflow = this.getWorkflow(payload.workflowId);
		if (workflow?.status === "waiting") {
			// Escalate to manager
			console.log("Escalating to manager");
		}
	}
}
```

```ts
import { Agent, callable } from "agents";

class ExpenseAgent extends Agent<Env, ExpenseState> {
	@callable()
	async submitForApproval(expense: ExpenseParams): Promise<string> {
		// Start the approval workflow
		const workflowId = await this.runWorkflow("EXPENSE_WORKFLOW", expense);

		// Schedule reminder after 4 hours
		await this.schedule(Date.now() + 4 * 60 * 60 * 1000, "sendReminder", {
			workflowId,
		});

		// Schedule escalation after 24 hours
		await this.schedule(Date.now() + 24 * 60 * 60 * 1000, "escalateApproval", {
			workflowId,
		});

		return workflowId;
	}

	async sendReminder(payload: { workflowId: string }) {
		const workflow = this.getWorkflow(payload.workflowId);
		if (workflow?.status === "waiting") {
			// Send reminder notification
			console.log("Reminder: approval still pending");
		}
	}

	async escalateApproval(payload: { workflowId: string }) {
		const workflow = this.getWorkflow(payload.workflowId);
		if (workflow?.status === "waiting") {
			// Escalate to manager
			console.log("Escalating to manager");
		}
	}
}
```

### Audit trail with SQL

Use `this.sql` to maintain an immutable audit trail:

```js
import { Agent, callable } from "agents";

class ExpenseAgent extends Agent {
	async onStart() {
		// Create audit table
		this.sql`
      CREATE TABLE IF NOT EXISTS approval_audit (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workflow_id TEXT NOT NULL,
        decision TEXT NOT NULL CHECK(decision IN ('approved', 'rejected')),
        decided_by TEXT NOT NULL,
        decided_at INTEGER NOT NULL,
        reason TEXT
      )
    `;
	}

	@callable()
	async approve(workflowId, userId, reason) {
		// Record the decision in SQL (immutable audit log)
		this.sql`
      INSERT INTO approval_audit (workflow_id, decision, decided_by, decided_at, reason)
      VALUES (${workflowId}, 'approved', ${userId}, ${Date.now()}, ${reason || null})
    `;

		// Process the approval
		await this.approveWorkflow(workflowId, {
			reason: reason || "Approved",
			metadata: { approvedBy: userId },
		});
	}
}
```

```ts
import { Agent, callable } from "agents";

class ExpenseAgent extends Agent<Env, ExpenseState> {
	async onStart() {
		// Create audit table
		this.sql`
      CREATE TABLE IF NOT EXISTS approval_audit (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workflow_id TEXT NOT NULL,
        decision TEXT NOT NULL CHECK(decision IN ('approved', 'rejected')),
        decided_by TEXT NOT NULL,
        decided_at INTEGER NOT NULL,
        reason TEXT
      )
    `;
	}

	@callable()
	async approve(
		workflowId: string,
		userId: string,
		reason?: string,
	): Promise<void> {
		// Record the decision in SQL (immutable audit log)
		this.sql`
      INSERT INTO approval_audit (workflow_id, decision, decided_by, decided_at, reason)
      VALUES (${workflowId}, 'approved', ${userId}, ${Date.now()}, ${reason || null})
    `;

		// Process the approval
		await this.approveWorkflow(workflowId, {
			reason: reason || "Approved",
			metadata: { approvedBy: userId },
		});
	}
}
```

### Configuration

```jsonc
{
	"name": "expense-approval",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-07-22",
	"compatibility_flags": ["nodejs_compat"],
	"durable_objects": {
		"bindings": [{ "name": "EXPENSE_AGENT", "class_name": "ExpenseAgent" }],
	},
	"workflows": [
		{
			"name": "expense-workflow",
			"binding": "EXPENSE_WORKFLOW",
			"class_name": "ExpenseWorkflow",
		},
	],
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["ExpenseAgent"] }],
}
```

```toml
name = "expense-approval"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-07-22"
compatibility_flags = [ "nodejs_compat" ]

[[durable_objects.bindings]]
name = "EXPENSE_AGENT"
class_name = "ExpenseAgent"

[[workflows]]
name = "expense-workflow"
binding = "EXPENSE_WORKFLOW"
class_name = "ExpenseWorkflow"

[[migrations]]
tag = "v1"
new_sqlite_classes = [ "ExpenseAgent" ]
```

## MCP elicitation

MCP elicitation lets an MCP server developer decide that a tool call needs more information or an out-of-band interaction. Your Agent acts as the MCP client: it presents the request to the user and returns their response. These interactions typically complete within minutes.

Form mode collects structured, non-sensitive input. URL mode asks the user to open an out-of-band flow, such as third-party authorization or payment.

Configure the user-facing handlers in `onStart()`:

```js
import { Agent } from "agents";

export class MyAgent extends Agent {
	onStart() {
		this.mcp.configureElicitationHandlers({
			form: (request, serverId) =>
				this.forwardElicitationToUser(request, serverId),
			url: (request, serverId) =>
				this.forwardElicitationToUser(request, serverId),
		});
	}

	forwardElicitationToUser(request, serverId) {
		// Present the request in your UI and resolve after the user responds.
		throw new Error(
			`Implement elicitation for ${serverId}: ${request.params.message}`,
		);
	}
}
```

```ts
import { Agent } from "agents";
import type { ElicitRequest, ElicitResult } from "agents/mcp";

export class MyAgent extends Agent<Env> {
	onStart() {
		this.mcp.configureElicitationHandlers({
			form: (request, serverId) =>
				this.forwardElicitationToUser(request, serverId),
			url: (request, serverId) =>
				this.forwardElicitationToUser(request, serverId),
		});
	}

	private forwardElicitationToUser(
		request: ElicitRequest,
		serverId: string,
	): Promise<ElicitResult> {
		// Present the request in your UI and resolve after the user responds.
		throw new Error(
			`Implement elicitation for ${serverId}: ${request.params.message}`,
		);
	}
}
```

For the complete form, URL, and browser forwarding patterns, refer to [MCP client elicitation](https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/#elicitation). For the server-side request API, refer to [McpAgent elicitation](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/#elicitation).

## Durable Code Mode approvals

Use the [durable Code Mode runtime](https://developers.cloudflare.com/agents/tools/codemode/durable-runtime/) for coding agents and other Agents that use the Code Mode pattern. Mark a connector method with `requiresApproval: true` to pause model-generated code before it invokes the underlying tool.

The following example marks a GitHub MCP tool as approval-gated, adds the connector to a durable runtime, and exposes methods that a UI can use to inspect, approve, or reject the pending action:

```js
import { AIChatAgent } from "@cloudflare/ai-chat";
import {
	createCodemodeRuntime,
	DynamicWorkerExecutor,
	McpConnector,
} from "@cloudflare/codemode";
import { callable } from "agents";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { model } from "./model";

class GitHubConnector extends McpConnector {
	connection;

	constructor(ctx, env, connection) {
		super(ctx, env);
		this.connection = connection;
	}

	name() {
		return "github";
	}

	createConnection() {
		return this.connection;
	}

	tool(name, tool) {
		if (name === "create_issue") {
			return { ...tool, requiresApproval: true };
		}
		return tool;
	}
}

export class CodingAgent extends AIChatAgent {
	runtime() {
		const server = this.mcp
			.listServers()
			.find((item) => item.name === "GitHub");
		if (!server) throw new Error("GitHub MCP server is not registered.");

		const connection = this.mcp.mcpConnections[server.id];
		if (!connection) throw new Error("GitHub MCP connection is unavailable.");

		return createCodemodeRuntime({
			ctx: this.ctx,
			executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),
			connectors: [new GitHubConnector(this.ctx, this.env, connection)],
		});
	}

	async onChatMessage() {
		const result = streamText({
			model,
			messages: await convertToModelMessages(this.messages),
			tools: { codemode: this.runtime().tool() },
			stopWhen: stepCountIs(10),
		});

		return result.toUIMessageStreamResponse();
	}

	@callable()
	async pendingApprovals() {
		return this.runtime().pending();
	}

	@callable()
	async approveExecution(executionId) {
		return this.runtime().approve({ executionId });
	}

	@callable()
	async rejectExecution(executionId, seq) {
		return this.runtime().reject({ executionId, seq });
	}
}
```

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import {
	createCodemodeRuntime,
	DynamicWorkerExecutor,
	McpConnector,
	type CodemodeRuntimeHandle,
	type ConnectorTool,
	type McpConnectionLike,
	type PendingAction,
} from "@cloudflare/codemode";
import { callable } from "agents";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { model } from "./model";

class GitHubConnector extends McpConnector<Env> {
	private connection: McpConnectionLike;

	constructor(
		ctx: DurableObjectState,
		env: Env,
		connection: McpConnectionLike,
	) {
		super(ctx, env);
		this.connection = connection;
	}

	override name() {
		return "github";
	}

	protected override createConnection() {
		return this.connection;
	}

	protected override tool(name: string, tool: ConnectorTool): ConnectorTool {
		if (name === "create_issue") {
			return { ...tool, requiresApproval: true };
		}
		return tool;
	}
}

export class CodingAgent extends AIChatAgent<Env> {
	private runtime(): CodemodeRuntimeHandle {
		const server = this.mcp
			.listServers()
			.find((item) => item.name === "GitHub");
		if (!server) throw new Error("GitHub MCP server is not registered.");

		const connection = this.mcp.mcpConnections[server.id];
		if (!connection) throw new Error("GitHub MCP connection is unavailable.");

		return createCodemodeRuntime({
			ctx: this.ctx,
			executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),
			connectors: [new GitHubConnector(this.ctx, this.env, connection)],
		});
	}

	async onChatMessage() {
		const result = streamText({
			model,
			messages: await convertToModelMessages(this.messages),
			tools: { codemode: this.runtime().tool() },
			stopWhen: stepCountIs(10),
		});

		return result.toUIMessageStreamResponse();
	}

	@callable()
	async pendingApprovals(): Promise<PendingAction[]> {
		return this.runtime().pending();
	}

	@callable()
	async approveExecution(executionId: string) {
		return this.runtime().approve({ executionId });
	}

	@callable()
	async rejectExecution(executionId: string, seq: number): Promise<boolean> {
		return this.runtime().reject({ executionId, seq });
	}
}
```

When generated code calls `github.create_issue()`, the runtime records the pending method and arguments, then pauses before the MCP tool executes. Approval starts another pass with the same source code and execution ID. Previously completed calls replay from the durable log, the approved call executes, and the generated code continues.

Pending approvals and execution history survive request completion and Durable Object hibernation. For the execution and replay model, refer to [Approvals through abort and replay](https://developers.cloudflare.com/agents/tools/codemode/how-it-works/#approvals-through-abort-and-replay).

## Build Workflow approval UIs

### Pending approvals list

Use the agent's state to display pending approvals in your UI:

```tsx
import { useAgent } from "agents/react";

function PendingApprovals() {
	const { state, agent } = useAgent({
		agent: "expense-agent",
		name: "main",
	});

	if (!state?.pendingApprovals?.length) {
		return <p>No pending approvals</p>;
	}

	return (
		<div className="approval-list">
			{state.pendingApprovals.map((item) => (
				<div key={item.workflowId} className="approval-card">
					<h3>${item.amount}</h3>
					<p>{item.description}</p>
					<p>Requested by {item.requestedBy}</p>

					<div className="actions">
						<button
							onClick={() => agent.stub.approve(item.workflowId, "admin")}
						>
							Approve
						</button>
						<button
							onClick={() => agent.stub.reject(item.workflowId, "Declined")}
						>
							Reject
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
```

## Add multiple Workflow approvers

For sensitive operations requiring multiple approvers:

```js
import { Agent, callable } from "agents";

class MultiApprovalAgent extends Agent {
	@callable()
	async approveMulti(workflowId, userId) {
		const approval = this.state.pendingMultiApprovals.find(
			(p) => p.workflowId === workflowId,
		);
		if (!approval) throw new Error("Approval not found");

		// Check if user already approved
		if (approval.currentApprovals.some((a) => a.userId === userId)) {
			throw new Error("Already approved by this user");
		}

		// Add this user's approval
		approval.currentApprovals.push({ userId, approvedAt: Date.now() });

		// Check if we have enough approvals
		if (approval.currentApprovals.length >= approval.requiredApprovals) {
			// Execute the approved action
			await this.approveWorkflow(workflowId, {
				metadata: { approvers: approval.currentApprovals },
			});
			return true;
		}

		this.setState({ ...this.state });
		return false; // Still waiting for more approvals
	}
}
```

```ts
import { Agent, callable } from "agents";

type MultiApproval = {
	workflowId: string;
	requiredApprovals: number;
	currentApprovals: Array<{ userId: string; approvedAt: number }>;
	rejections: Array<{ userId: string; rejectedAt: number; reason: string }>;
};

type State = {
	pendingMultiApprovals: MultiApproval[];
};

class MultiApprovalAgent extends Agent<Env, State> {
	@callable()
	async approveMulti(workflowId: string, userId: string): Promise<boolean> {
		const approval = this.state.pendingMultiApprovals.find(
			(p) => p.workflowId === workflowId,
		);
		if (!approval) throw new Error("Approval not found");

		// Check if user already approved
		if (approval.currentApprovals.some((a) => a.userId === userId)) {
			throw new Error("Already approved by this user");
		}

		// Add this user's approval
		approval.currentApprovals.push({ userId, approvedAt: Date.now() });

		// Check if we have enough approvals
		if (approval.currentApprovals.length >= approval.requiredApprovals) {
			// Execute the approved action
			await this.approveWorkflow(workflowId, {
				metadata: { approvers: approval.currentApprovals },
			});
			return true;
		}

		this.setState({ ...this.state });
		return false; // Still waiting for more approvals
	}
}
```

## Best practices

1. **Define clear approval criteria** — Only require confirmation for actions with meaningful consequences (payments, emails, data changes)
2. **Provide detailed context** — Show users exactly what the action will do, including all arguments
3. **Implement timeouts** — Use `schedule()` to escalate or auto-reject after reasonable periods
4. **Maintain audit trails** — Use `this.sql` to record all approval decisions for compliance
5. **Handle connection drops** — Store pending approvals in agent state so they survive disconnections
6. **Graceful degradation** — Provide fallback behavior if approvals are rejected

## Next steps

### [Run Workflows](https://developers.cloudflare.com/agents/runtime/execution/run-workflows/)

Complete waitForApproval() API reference.

### [MCP clients](https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/)

Handle elicitation requests in an Agent acting as an MCP client.

### [MCP servers](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/)

Request form or URL elicitation from an MCP server.

### [Durable Code Mode runtime](https://developers.cloudflare.com/agents/tools/codemode/durable-runtime/)

Pause model-generated code for approval before connector calls.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/#page","headline":"Human-in-the-loop patterns · Cloudflare Agents docs","description":"Implement human-in-the-loop functionality using Workflow approvals, durable Code Mode approvals, and MCP elicitation.","url":"https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-14","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
