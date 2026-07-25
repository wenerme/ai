> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom Classifiers

> Automatically categorize LLM generations in your workspace

Custom classifiers let you define a structured taxonomy and use a model of your choosing (OpenRouter will recommend fast, inexpensive models during classifier setup) to tag and classify your prompts. The classifier model runs asynchronously after each request completes (zero added latency), tagging generations with dimensions like department, task type, complexity, or anything you can think of. Tags appear in your [logs](https://openrouter.ai/logs), and roll-up reporting is available in your [activity](https://openrouter.ai/activity/explore) view. Together, these help you understand how AI is being used across your organization.

## Getting Started

1. Navigate to your workspace's classifiers page: [Classifiers](https://openrouter.ai/workspaces/default/classifiers)
2. Click **Create classifier**
3. Pick a preset or build your own from scratch
4. Optionally, pick a sampling rate (e.g. you may not want to classify 100% of the requests in the workspace)
5. Save and activate the classifier

Generations in that workspace will now be classified by the selected model. Open any generation in your [logs](https://openrouter.ai/logs) to see its classification tags.

<Note>
  Only workspace admins can create and manage classifiers. Each workspace has its own independent classifier.
</Note>

## Classification Presets

Presets are templatized classifiers that you can use as a starting point to customize to your use case, or use as-is. Each comes with a tuned prompt, pre-selected dimensions, and sensible defaults.

| Preset                             | What it does                                                                                                                                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Department**                     | Tags each request by business function: Engineering, Sales, Marketing, Legal, HR, Finance, Operations                                                                                                                     |
| **Audience**                       | Tags by who the output is for: Internal, Client-facing, Regulator, Public                                                                                                                                                 |
| **Engineering work**               | Tags by work type: Feature development, Bug fixing, Documentation, Refactoring, Code review, etc.                                                                                                                         |
| **Agent complexity**               | Two dimensions: `difficulty_tier` (7 levels from trivial tool calls to frontier-expert work) and `task_family` (10 categories like coding, analysis, planning)                                                            |
| **Capitalizable software expense** | You will need to give additional information about which projects and activities are capitalizable. Customers are responsible for the accuracy of any final financial or tax data submitted or shared with third parties. |

## Build Your Own

If the presets don't fit, build a classifier from scratch with up to eight individual dimensions per classifier.

### What is Being Classified?

Before classification, the prompt is serialized into a single labeled transcript inside one user message e.g.:

```
SYSTEM: <caller system prompt>
TOOLS: search_web, run_sql, send_email
USER: <first user message>
ASSISTANT: <…>
TOOL_CALL run_sql: <args>
TOOL_RESULT: <…>
USER: <latest user message>
```

Note that:

1. The full tool schema is not sent; just the tool names.
2. Each turn is truncated to a maximum of 5,000 characters. If a turn is truncated, the text will end in `...[truncated]` so that classifier understands the text would have continued.
3. If the classifier model has a meaningfully shorter context than the prompt in question, the classification will silently fail (without affecting the original request). We recommend selecting a model with a large context window.

## How Classification Works

Classification runs asynchronously after each generation completes:

1. Your request finishes and the response returns to your app (zero added latency)
2. A classification job is enqueued with a serialized version of your prompt
3. The classifier model evaluates the message against your taxonomy using structured outputs
4. Tags are written to the generation record and appear in your logs

The classifier model is called with a serialized version of your prompt, your classification prompt, and a structured output schema that constrains the response to your declared dimensions and values.

### Billing

Classifier tokens bill like any other generation against your workspace's credits. You control cost through model choice: picking a small, fast model (like Haiku or Flash) keeps classification costs low. Classification requests are billed against the administrative user who configured the classifier (and not against a particular API key).

### Failure Handling

If classification fails (timeout, model error, invalid output), the generation proceeds normally with no tags written. Classification failures don't affect your API responses.

## Viewing Classifications

Classification tags appear in two places:

* **Log rows** — Classified generations show a tag icon. Hover for a tooltip summary.
* **Generation detail panel** — Open any classified generation to see a **Classifications** section with the full dimension-to-value breakdown.

Filter and analyze your classified generations in the [Activity](https://openrouter.ai/activity) and [Logs](https://openrouter.ai/logs) views.

## Workspace Scoping

Each classifier is scoped to a single [workspace](/docs/guides/features/workspaces). Different workspaces can have different classifiers (or none at all). This lets you run a department classifier on your org-wide workspace while a specific project workspace uses a task-type classifier.

## Tips

* **Start with a preset.** The Department and Engineering work presets cover the most common use cases. You can customize them later.
* **Use a cheap model.** Classification prompts are short and well-constrained. Small/inexpensive models with large context windows work best and keep costs minimal.
* **Check coverage in your logs.** After enabling a classifier, look at recent generations in your logs to verify tags are appearing as expected.
