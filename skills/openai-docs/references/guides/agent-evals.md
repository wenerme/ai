# Evaluate agent workflows

The OpenAI Platform offers a suite of evaluation tools to help you ensure your agents perform consistently and accurately.

Use this page as the decision point for the evaluation surfaces that matter most for agent workflows.

## Start with traces when you are still debugging behavior

Trace grading is the fastest way to identify workflow-level issues. A trace captures the end-to-end record of model calls, tool calls, guardrails, and handoffs for one run. Graders let you score those traces with structured criteria so you can find regressions and failure modes at scale.

Use trace grading when you want to answer questions like:

- Did the agent pick the right tool?
- Did a handoff happen when it should have?
- Did the workflow violate an instruction or safety policy?
- Did a prompt or routing change improve the end-to-end behavior?

### Trace-grading workflow

1. Open **Logs** > **Traces** in the dashboard.
2. Inspect a representative workflow trace from Agent Builder or an SDK-based app with tracing enabled.
3. Create a grader and run it against the selected traces.
4. Use the results to refine prompts, tool surfaces, routing logic, or guardrails.

For code-first SDK workflows, start with [Integrations and observability](https://developers.openai.com/api/docs/guides/agents/integrations-observability#tracing) to get high-signal traces before you formalize graders.

## Move to datasets and eval runs when you need repeatability

Once you know what “good” looks like, move from individual traces to repeatable datasets and eval runs. This is the right step when you want to benchmark changes, compare prompts, or run larger-scale evaluations over time.

If you need advanced features such as evaluation against external models, evaluation APIs, or larger-scale batch evaluation, use [Evals](https://developers.openai.com/api/docs/guides/evals) alongside datasets.

## Related evaluation surfaces

<a
  href="/api/docs/guides/evaluation-getting-started"
  target="_blank"
  rel="noreferrer"
>
  

<span slot="icon">
      </span>
    Operate a flywheel of continuous improvement using evaluations.


</a>

<a href="/api/docs/guides/evals" target="_blank" rel="noreferrer">
  

<span slot="icon">
      </span>
    Evaluate against external models, interact with evals via API, and more.


</a>

<a href="/api/docs/guides/prompt-optimizer" target="_blank" rel="noreferrer">
  

<span slot="icon">
      </span>
    Use your dataset to automatically improve your prompts.


</a>

<a
  href="https://cookbook.openai.com/examples/evaluation/building_resilient_prompts_using_an_evaluation_flywheel"
  target="_blank"
  rel="noreferrer"
>
  

<span slot="icon">
      </span>
    Operate a flywheel of continuous improvement using evaluations.


</a>