# Prompt optimizer

The [prompt optimizer](https://platform.openai.com/chat/edit?models=gpt-5&optimize=true) is a chat interface in the dashboard, where you enter a prompt, and we optimize it according to current best practices before returning it to you. Pairing the prompt optimizer with [datasets](https://developers.openai.com/api/docs/guides/evaluation-getting-started) is a powerful way to automatically improve prompts.

## Prepare your data

1. Set up a [dataset](https://developers.openai.com/api/docs/guides/evaluation-getting-started) containing the prompt you want to optimize and an evaluation dataset.
1. Create at least three rows of data with responses in your dataset.
1. For each row, create at least one grader result or human annotation.

The prompt optimizer can use the following from your dataset to improve your prompt:

- Annotations (Good/Bad and additional custom annotation columns you add)
- Text critiques written in **output_feedback**
- Results from graders

For effective results, add annotations containing a Good/Bad rating _and_ detailed, specific critiques. Create [graders](https://developers.openai.com/api/docs/guides/evaluation-getting-started#adding-graders) that precisely capture the properties that you desire from your prompt.

## Optimize your prompt

Once you’ve prepared your dataset, create an optimization.

1. In the bottom of the prompt pane, click **Optimize**. This will create a new tab for the optimized result and start an optimization process that runs in the background.
1. When the optimized prompt is ready, view and test the new prompt.
1. Repeat. While a single optimization run may achieve your desired result, experiment with repeating the optimization process on the new prompt—generate outputs, annotate outputs, run graders, and optimize.

The effectiveness of prompt optimization depends on the quality of your
  graders. We recommend building narrowly-defined graders for each of the
  desired output properties where you see your prompt failing.

Always evaluate and manually review optimized prompts before using them in production. While the prompt optimizer generally provides a strict improvement in your prompt’s effectiveness, it's possible for the optimized prompt to perform worse than your original on specific inputs.

## Next steps

For more inspiration, visit the [OpenAI Cookbook](https://developers.openai.com/cookbook), which contains example code and links to third-party resources, or learn more about our tools for evals:

<a
  href="https://cookbook.openai.com/examples/evaluation/Building_resilient_prompts_using_an_evaluation_flywheel.md"
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

[

<span slot="icon">
      </span>
    Build sophisticated graders to improve the effectiveness of your evals.

](https://developers.openai.com/api/docs/guides/graders)

[

<span slot="icon">
      </span>
    Improve a model's ability to generate responses tailored to your use case.

](https://developers.openai.com/api/docs/guides/fine-tuning)