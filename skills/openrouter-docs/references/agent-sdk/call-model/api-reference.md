> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# API Reference

## callModel

```typescript
function callModel(request: CallModelInput, options?: RequestOptions): ModelResult
```

Creates a response using the OpenResponses API with multiple consumption patterns.

### CallModelInput

| Parameter            | Type                                       | Required | Description                          |
| -------------------- | ------------------------------------------ | -------- | ------------------------------------ |
| `model`              | `string \| ((ctx: TurnContext) => string)` | Yes\*    | Model ID (e.g., "openai/gpt-5-nano") |
| `models`             | `string[]`                                 | Yes\*    | Model fallback array                 |
| `input`              | `OpenResponsesInput`                       | Yes      | Input messages or string             |
| `instructions`       | `string \| ((ctx: TurnContext) => string)` | No       | System instructions                  |
| `tools`              | `Tool[]`                                   | No       | Tools available to the model         |
| `maxToolRounds`      | `MaxToolRounds`                            | No       | Tool execution limit (deprecated)    |
| `stopWhen`           | `StopWhen`                                 | No       | Stop conditions                      |
| `temperature`        | `number \| ((ctx: TurnContext) => number)` | No       | Sampling temperature (0-2)           |
| `maxOutputTokens`    | `number \| ((ctx: TurnContext) => number)` | No       | Maximum tokens to generate           |
| `topP`               | `number`                                   | No       | Top-p sampling                       |
| `text`               | `ResponseTextConfig`                       | No       | Text format configuration            |
| `provider`           | `ProviderPreferences`                      | No       | Provider routing and configuration   |
| `topK`               | `number`                                   | No       | Top-k sampling                       |
| `metadata`           | `Record<string, string>`                   | No       | Request metadata                     |
| `toolChoice`         | `ToolChoice`                               | No       | Tool choice configuration            |
| `parallelToolCalls`  | `boolean`                                  | No       | Enable parallel tool calling         |
| `reasoning`          | `ReasoningConfig`                          | No       | Reasoning configuration              |
| `promptCacheKey`     | `string`                                   | No       | Cache key for prompt caching         |
| `previousResponseId` | `string`                                   | No       | Context from previous response       |
| `include`            | `string[]`                                 | No       | Include extra fields in response     |
| `background`         | `boolean`                                  | No       | Run request in background            |
| `safetyIdentifier`   | `string`                                   | No       | User safety identifier               |
| `serviceTier`        | `string`                                   | No       | Service tier preference              |
| `truncation`         | `string`                                   | No       | Truncation mode                      |
| `plugins`            | `Plugin[]`                                 | No       | Enabled plugins                      |
| `user`               | `string`                                   | No       | End-user identifier                  |
| `sessionId`          | `string`                                   | No       | Session identifier                   |
| `store`              | `boolean`                                  | No       | Store request data                   |
| `context`            | `ContextInput<ToolContextMap>`             | No       | Tool context keyed by tool name      |

\*Either `model` or `models` is required.

### ProviderPreferences

Configuration for routing and provider selection.

| Parameter                | Type                | Description                                                        |
| ------------------------ | ------------------- | ------------------------------------------------------------------ |
| `allowFallbacks`         | `boolean`           | Allow backup providers when primary is unavailable (default: true) |
| `requireParameters`      | `boolean`           | Only use providers that support all requested parameters           |
| `dataCollection`         | `"allow" \| "deny"` | Data collection policy (allow/deny)                                |
| `order`                  | `string[]`          | Custom provider routing order                                      |
| `only`                   | `string[]`          | Restrict to specific providers                                     |
| `ignore`                 | `string[]`          | Exclude specific providers                                         |
| `quantizations`          | `string[]`          | Filter by quantization levels                                      |
| `sort`                   | `string`            | Load balancing strategy (e.g., "throughput")                       |
| `maxPrice`               | `object`            | Maximum price limits                                               |
| `preferredMinThroughput` | `number`            | Minimum tokens per second preference                               |
| `preferredMaxLatency`    | `number`            | Maximum latency preference                                         |

### RequestOptions

| Parameter | Type          | Description                     |
| --------- | ------------- | ------------------------------- |
| `timeout` | `number`      | Request timeout in milliseconds |
| `signal`  | `AbortSignal` | Abort signal for cancellation   |

***

## ModelResult

Wrapper providing multiple consumption patterns for a response.

### Methods

#### getText()

```typescript
getText(): Promise<string>
```

Get text content after tool execution completes.

#### getResponse()

```typescript
getResponse(): Promise<OpenResponsesNonStreamingResponse>
```

Get full response with usage data (inputTokens, outputTokens, cachedTokens).

#### getTextStream()

```typescript
getTextStream(): AsyncIterableIterator<string>
```

Stream text deltas.

#### getReasoningStream()

```typescript
getReasoningStream(): AsyncIterableIterator<string>
```

Stream reasoning deltas (for reasoning models).

#### getNewMessagesStream()

```typescript
getNewMessagesStream(): AsyncIterableIterator<ResponsesOutputMessage | OpenResponsesFunctionCallOutput>
```

Stream cumulative message snapshots in OpenResponses format.

#### getFullResponsesStream()

```typescript
getFullResponsesStream(): AsyncIterableIterator<EnhancedResponseStreamEvent>
```

Stream all events including tool preliminary results.

#### getToolCalls()

```typescript
getToolCalls(): Promise<ParsedToolCall[]>
```

Get all tool calls from initial response.

#### getToolCallsStream()

```typescript
getToolCallsStream(): AsyncIterableIterator<ParsedToolCall>
```

Stream tool calls as they complete.

#### getToolStream()

```typescript
getToolStream(): AsyncIterableIterator<ToolStreamEvent>
```

Stream tool deltas and preliminary results.

#### getContextUpdates()

```typescript
getContextUpdates(): AsyncGenerator<ToolContextMap<TTools>>
```

Stream context snapshots whenever a tool calls
`setContext()`. Completes when tool execution finishes.

#### cancel()

```typescript
cancel(): Promise<void>
```

Cancel the stream and all consumers.

***

## Tool Types

### tool()

```typescript
function tool<TInput, TOutput>(config: ToolConfig): Tool
```

Create a typed tool with Zod schema validation.

### ToolConfig

| Parameter            | Type                      | Required | Description                                                 |
| -------------------- | ------------------------- | -------- | ----------------------------------------------------------- |
| `name`               | `string`                  | Yes      | Tool name                                                   |
| `description`        | `string`                  | No       | Tool description                                            |
| `inputSchema`        | `ZodObject`               | Yes      | Input parameter schema                                      |
| `outputSchema`       | `ZodType`                 | No       | Output schema                                               |
| `eventSchema`        | `ZodType`                 | No       | Event schema (triggers generator mode)                      |
| `contextSchema`      | `ZodObject`               | No       | Context data this tool needs                                |
| `execute`            | `function \| false`       | Yes\*    | Execute function, or `false` for manual                     |
| `onToolCalled`       | `function`                | Yes\*    | HITL hook — return value to auto-respond, `null` to pause   |
| `onResponseReceived` | `function`                | No       | HITL hook — post-process caller-supplied result (HITL only) |
| `nextTurnParams`     | `NextTurnParamsFunctions` | No       | Parameters to modify next turn                              |

\* Provide exactly one of `execute` or `onToolCalled`. Omitting both (with `execute: false`) makes the tool a manual tool.

### Tool

Union type of all tool types:

```typescript
type Tool =
  | ToolWithExecute<ZodObject, ZodType>
  | ToolWithGenerator<ZodObject, ZodType, ZodType>
  | ManualTool<ZodObject, ZodType>
  | HITLTool<ZodObject, ZodType>;
```

### ToolWithExecute

Regular tool with execute function:

```typescript
interface ToolWithExecute<
  TInput, TOutput, TContext, TName
> {
  type: ToolType.Function;
  function: {
    name: TName;
    description?: string;
    inputSchema: TInput;
    outputSchema?: TOutput;
    contextSchema?: ZodObject;
    execute: (
      params: z.infer<TInput>,
      context: ToolExecuteContext<TName, TContext>,
    ) => Promise<z.infer<TOutput>>;
  };
}
```

### ToolWithGenerator

Generator tool with eventSchema:

```typescript
interface ToolWithGenerator<
  TInput, TEvent, TOutput, TContext, TName
> {
  type: ToolType.Function;
  function: {
    name: TName;
    description?: string;
    inputSchema: TInput;
    eventSchema: TEvent;
    outputSchema: TOutput;
    contextSchema?: ZodObject;
    execute: (
      params: z.infer<TInput>,
      context: ToolExecuteContext<TName, TContext>,
    ) => AsyncGenerator<z.infer<TEvent>>;
  };
}
```

### ManualTool

Tool without execute function:

```typescript
interface ManualTool<TInput, TOutput> {
  type: ToolType.Function;
  function: {
    name: string;
    description?: string;
    inputSchema: TInput;
    outputSchema?: TOutput;
  };
}
```

### HITLTool

Human-in-the-loop tool with `onToolCalled` and optional `onResponseReceived` hooks. `outputSchema` is required — it validates both the hook's non-null return value and the caller-supplied response delivered via `function_call_output`.

```typescript
interface HITLToolFunction<
  TInput, TOutput, TContext, TName
> {
  name: TName;
  description?: string;
  inputSchema: TInput;
  outputSchema: TOutput;
  contextSchema?: ZodObject;
  onToolCalled: (
    params: z.infer<TInput>,
    context?: ToolExecuteContext<TName, TContext>,
  ) => Promise<z.infer<TOutput> | null> | z.infer<TOutput> | null;
  onResponseReceived?: (
    rawResult: unknown,
    context?: ToolExecuteContext<TName, TContext>,
  ) => Promise<z.infer<TOutput>> | z.infer<TOutput>;
  toModelOutput?: ToModelOutputFunction<
    z.infer<TInput>,
    z.infer<TOutput>
  >;
}

type HITLTool<TInput, TOutput, TContext> = {
  type: ToolType.Function;
  function: HITLToolFunction<TInput, TOutput, TContext>;
};
```

Returning `null` from `onToolCalled` pauses the loop and sets the conversation status to `'awaiting_hitl'`. Throwing from `onToolCalled` is surfaced as a tool error of the form `{ error: ... }`. Throwing from `onResponseReceived` is surfaced as an error payload that includes the caller's original output of the form `{ error: ..., originalOutput: ... }`.

***

## Tool Type Guards

```typescript
function isManualTool(tool: Tool): tool is ManualTool;
function isHITLTool(tool: Tool): tool is HITLTool;
function isAutoResolvableTool(
  tool: Tool,
): tool is ToolWithExecute | ToolWithGenerator | HITLTool;
```

* `isManualTool` — no `execute` and no `onToolCalled`. Always pauses the loop.
* `isHITLTool` — has an `onToolCalled` function.
* `isAutoResolvableTool` — either has an `execute` function (regular/generator) or is a HITL tool. Returns `false` for manual and server tools.

***

## Context Types

### TurnContext

```typescript
interface TurnContext {
  toolCall?: OpenResponsesFunctionToolCall;
  numberOfTurns: number;
  turnRequest?: OpenResponsesRequest;
}
```

### ToolExecuteContext

Flat context passed to tool execute functions.
Merges `TurnContext` fields with tool-specific context:

```typescript
type ToolExecuteContext<TName, TContext> =
  TurnContext & {
    tools: {
      readonly [K in TName]: Readonly<TContext>;
    };
    setContext(partial: Partial<TContext>): void;
  };
```

### ToolContextMap

Context map for `callModel`'s `context` option,
keyed by tool name:

```typescript
type ToolContextMap<T extends readonly Tool[]> = {
  [K in T[number] as K['function']['name']]:
    InferToolContext<K>;
};
```

### ContextInput

Context can be static, a sync function,
or an async function:

```typescript
type ContextInput<T> =
  | T
  | ((turn: TurnContext) => T)
  | ((turn: TurnContext) => Promise<T>);
```

### NextTurnParamsContext

```typescript
interface NextTurnParamsContext {
  input: OpenResponsesInput;
  model: string;
  models: string[];
  temperature: number | null;
  maxOutputTokens: number | null;
  topP: number | null;
  topK?: number | undefined;
  instructions: string | null;
}
```

***

## Stream Event Types

### EnhancedResponseStreamEvent

```typescript
type EnhancedResponseStreamEvent =
  | OpenResponsesStreamEvent
  | ToolPreliminaryResultEvent;
```

### ToolStreamEvent

```typescript
type ToolStreamEvent =
  | { type: 'delta'; content: string }
  | { type: 'preliminary_result'; toolCallId: string; result: unknown };
```

### ParsedToolCall

```typescript
interface ParsedToolCall {
  id: string;
  name: string;
  arguments: unknown;
}
```

### ToolExecutionResult

```typescript
interface ToolExecutionResult {
  toolCallId: string;
  toolName: string;
  result: unknown;
  preliminaryResults?: unknown[];
  error?: Error;
}
```

***

## Stop Conditions

### StopWhen

```typescript
type StopWhen =
  | StopCondition
  | StopCondition[];
```

### StopCondition

```typescript
type StopCondition = (context: StopConditionContext) => boolean | Promise<boolean>;
```

### StopConditionContext

```typescript
interface StopConditionContext {
  steps: StepResult[];
}
```

### StepResult

```typescript
interface StepResult {
  stepType: 'initial' | 'continue';
  text: string;
  toolCalls: TypedToolCallUnion[];
  toolResults: ToolExecutionResultUnion[];
  response: OpenResponsesNonStreamingResponse;
  usage?: OpenResponsesUsage;
  finishReason?: string;
  warnings?: Warning[];
  experimental_providerMetadata?: Record<string, unknown>;
}
```

### Warning

```typescript
interface Warning {
  type: string;
  message: string;
}
```

### Built-in Helpers

| Function         | Signature                           | Description              |
| ---------------- | ----------------------------------- | ------------------------ |
| `stepCountIs`    | `(n: number) => StopCondition`      | Stop after n steps       |
| `hasToolCall`    | `(name: string) => StopCondition`   | Stop when tool is called |
| `maxTokensUsed`  | `(n: number) => StopCondition`      | Stop after n tokens      |
| `maxCost`        | `(amount: number) => StopCondition` | Stop after cost limit    |
| `finishReasonIs` | `(reason: string) => StopCondition` | Stop on finish reason    |

***

## Format Helpers

### fromChatMessages

```typescript
function fromChatMessages(messages: Message[]): OpenResponsesInput
```

Convert OpenAI chat format to OpenResponses input.

### toChatMessage

```typescript
function toChatMessage(response: OpenResponsesNonStreamingResponse): AssistantMessage
```

Convert response to chat message format.

### fromClaudeMessages

```typescript
function fromClaudeMessages(messages: ClaudeMessageParam[]): OpenResponsesInput
```

Convert Anthropic Claude format to OpenResponses input.

### toClaudeMessage

```typescript
function toClaudeMessage(response: OpenResponsesNonStreamingResponse): ClaudeMessage
```

Convert response to Claude message format.

***

## Type Utilities

### InferToolInput

```typescript
type InferToolInput<T> = T extends { function: { inputSchema: infer S } }
  ? S extends ZodType ? z.infer<S> : unknown
  : unknown;
```

### InferToolOutput

```typescript
type InferToolOutput<T> = T extends { function: { outputSchema: infer S } }
  ? S extends ZodType ? z.infer<S> : unknown
  : unknown;
```

### InferToolEvent

```typescript
type InferToolEvent<T> = T extends { function: { eventSchema: infer S } }
  ? S extends ZodType ? z.infer<S> : never
  : never;
```

### TypedToolCall

```typescript
type TypedToolCall<T extends Tool> = {
  id: string;
  name: T extends { function: { name: infer N } } ? N : string;
  arguments: InferToolInput<T>;
};
```

***

## Exports

```typescript
// Agent client
export { OpenRouter } from '@openrouter/agent';

// Tool helpers
export {
  tool,
  ToolType,
  isManualTool,
  isHITLTool,
  isAutoResolvableTool,
} from '@openrouter/agent';

// Format helpers
export { fromChatMessages, toChatMessage, fromClaudeMessages, toClaudeMessage } from '@openrouter/agent';

// Stop condition helpers
export { stepCountIs, hasToolCall, maxTokensUsed, maxCost, finishReasonIs } from '@openrouter/agent';

// Context helpers
export {
  buildToolExecuteContext,
  ToolContextStore,
} from '@openrouter/agent';

// Types
export type {
  CallModelInput,
  ContextInput,
  Tool,
  ToolWithExecute,
  ToolWithGenerator,
  ManualTool,
  HITLTool,
  HITLToolFunction,
  ToolExecuteContext,
  ToolContextMap,
  TurnContext,
  ParsedToolCall,
  ToolExecutionResult,
  StopCondition,
  StopWhen,
  InferToolInput,
  InferToolOutput,
  InferToolEvent,
} from '@openrouter/agent';
```