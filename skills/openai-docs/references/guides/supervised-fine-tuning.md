# Supervised fine-tuning

Supervised fine-tuning (SFT) lets you train an OpenAI model with examples for your specific use case. The result is a customized model that more reliably produces your desired style and content.

<br />

<table>
<tbody>
<tr>
<th>How it works</th>
<th>Best for</th>
<th>Use with</th>
</tr>

<tr>
<td>
Provide examples of correct responses to prompts to guide the model's behavior.

Often uses human-generated "ground truth" responses to show the model how it should respond.

</td>
<td>
- Classification
- Nuanced translation
- Generating content in a specific format
- Correcting instruction-following failures
</td>
<td>
`gpt-4.1-2025-04-14`
`gpt-4.1-mini-2025-04-14`
`gpt-4.1-nano-2025-04-14`
</td>
</tr>

</tbody>
</table>

## Overview

Supervised fine-tuning has four major parts:

1. Build your training dataset to determine what "good" looks like
1. Upload a training dataset containing example prompts and desired model output
1. Create a fine-tuning job for a base model using your training data
1. Evaluate your results using the fine-tuned model

**Good evals first!** Only invest in fine-tuning after setting up evals. You
  need a reliable way to determine whether your fine-tuned model is performing
  better than a base model.
  <br />
  [Set up evals →](https://developers.openai.com/api/docs/guides/evals)

## Build your dataset

Build a robust, representative dataset to get useful results from a fine-tuned model. Use the following techniques and considerations.

### Right number of examples

- The minimum number of examples you can provide for fine-tuning is 10
- We see improvements from fine-tuning on 50–100 examples, but the right number for you varies greatly and depends on the use case
- We recommend starting with 50 well-crafted demonstrations and [evaluating the results](https://developers.openai.com/api/docs/guides/evals)

If performance improves with 50 good examples, try adding examples to see further results. If 50 examples have no impact, rethink your task or prompt before adding training data.

### What makes a good example

- Whatever prompts and outputs you expect in your application, as realistic as possible
- Specific, clear questions and answers
- Use historical data, expert data, logged data, or [other types of collected data](https://developers.openai.com/api/docs/guides/evals)

### Formatting your data

- Use [JSONL format](https://jsonlines.org/), with one complete JSON structure on every line of the training data file
- Use the [chat completions format](https://developers.openai.com/api/docs/api-reference/fine-tuning/chat-input)
- Your file must have at least 10 lines



<div data-content-switcher-pane data-value="jsonl">
    <div class="hidden">JSONL format example file</div>
    </div>
  <div data-content-switcher-pane data-value="json" hidden>
    <div class="hidden">Corresponding JSON data</div>
    </div>



### Distilling from a larger model

One way to build a training data set for a smaller model is to distill the results of a large model to create training data for supervised fine tuning. The general flow of this technique is:

- Tune a prompt for a larger model (like `gpt-4.1`) until you get great performance against your eval criteria.
- Capture results generated from your model using whatever technique is convenient - note that the [Responses API](https://developers.openai.com/api/docs/api-reference/responses) stores model responses for 30 days by default.
- Use the captured responses from the large model that fit your criteria to generate a dataset using the tools and techniques described above.
- Tune a smaller model (like `gpt-4.1-mini`) using the dataset you created from the large model.

This technique can enable you to train a small model to perform similarly on a specific task to a larger, more costly model.

## Upload training data

Upload your dataset of examples to OpenAI. We use it to update the model's weights and produce outputs like the ones included in your data.

In addition to text completions, you can train the model to more effectively generate [structured JSON output](https://developers.openai.com/api/docs/guides/structured-outputs) or [function calls](https://developers.openai.com/api/docs/guides/function-calling).



<div data-content-switcher-pane data-value="ui">
    <div class="hidden">Upload your data with button clicks</div>
    </div>
  <div data-content-switcher-pane data-value="api" hidden>
    <div class="hidden">Call the API to upload your data</div>
    </div>



## Create a fine-tuning job

With your test data uploaded, [create a fine-tuning job](https://developers.openai.com/api/docs/api-reference/fine-tuning/create) to customize a base model using the training data you provide. When creating a fine-tuning job, you must specify:

- A base model (`model`) to use for fine-tuning. This can be either an OpenAI model ID or the ID of a previously fine-tuned model. See which models support fine-tuning in the [model docs](https://developers.openai.com/api/docs/models).
- A training file (`training_file`) ID. This is the file you uploaded in the previous step.
- A fine-tuning method (`method`). This specifies which fine-tuning method you want to use to customize the model. Supervised fine-tuning is the default.



<div data-content-switcher-pane data-value="ui">
    <div class="hidden">Upload your data with button clicks</div>
    </div>
  <div data-content-switcher-pane data-value="api" hidden>
    <div class="hidden">Call the API to upload your data</div>
    </div>



## Evaluate the result

Use the approaches below to check how your fine-tuned model performs. Adjust your prompts, data, and fine-tuning job as needed until you get the results you want. The best way to fine-tune is to continue iterating.

### Compare to evals

To see if your fine-tuned model performs better than the original base model, [use evals](https://developers.openai.com/api/docs/guides/evals). Before running your fine-tuning job, carve out data from the same training dataset you collected in step 1. This holdout data acts as a control group when you use it for evals. Make sure the training and holdout data have roughly the same diversity of user input types and model responses.

[Learn more about running evals](https://developers.openai.com/api/docs/guides/evals).

### Monitor the status

Check the status of a fine-tuning job in the dashboard or by polling the job ID in the API.



<div data-content-switcher-pane data-value="ui">
    <div class="hidden">Monitor in the UI</div>
    </div>
  <div data-content-switcher-pane data-value="api" hidden>
    <div class="hidden">Monitor with API calls</div>
    </div>



### Try using your fine-tuned model

Evaluate your newly optimized model by using it! When the fine-tuned model finishes training, use its ID in either the [Responses](https://developers.openai.com/api/docs/api-reference/responses) or [Chat Completions](https://developers.openai.com/api/docs/api-reference/chat) API, just as you would an OpenAI base model.



<div data-content-switcher-pane data-value="ui">
    <div class="hidden">Use your model in the Playground</div>
    </div>
  <div data-content-switcher-pane data-value="api" hidden>
    <div class="hidden">Use your model with an API call</div>
    </div>



### Use checkpoints if needed

Checkpoints are models you can use. We create a full model checkpoint for you at the end of each training epoch. They're useful in cases where your fine-tuned model improves early on but then memorizes the dataset instead of learning generalizable knowledge—called \_overfitting. Checkpoints provide versions of your customized model from various moments in the process.



<div data-content-switcher-pane data-value="ui">
    <div class="hidden">Find checkpoints in the dashboard</div>
    </div>
  <div data-content-switcher-pane data-value="api" hidden>
    <div class="hidden">Query the API for checkpoints</div>
    </div>



Currently, only the checkpoints for the last three epochs of the job are saved and available for use.

## Safety checks

Before launching in production, review and follow the following safety information.

How we assess for safety

Once a fine-tuning job is completed, we assess the resulting model’s behavior across 13 distinct safety categories. Each category represents a critical area where AI outputs could potentially cause harm if not properly controlled.

| Name                   | Description                                                                                                                                                                                                                                    |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| advice                 | Advice or guidance that violates our policies.                                                                                                                                                                                                 |
| harassment/threatening | Harassment content that also includes violence or serious harm towards any target.                                                                                                                                                             |
| hate                   | Content that expresses, incites, or promotes hate based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste. Hateful content aimed at non-protected groups (e.g., chess players) is harassment. |
| hate/threatening       | Hateful content that also includes violence or serious harm towards the targeted group based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste.                                               |
| highly-sensitive       | Highly sensitive data that violates our policies.                                                                                                                                                                                              |
| illicit                | Content that gives advice or instruction on how to commit illicit acts. A phrase like "how to shoplift" would fit this category.                                                                                                               |
| propaganda             | Praise or assistance for ideology that violates our policies.                                                                                                                                                                                  |
| self-harm/instructions | Content that encourages performing acts of self-harm, such as suicide, cutting, and eating disorders, or that gives instructions or advice on how to commit such acts.                                                                         |
| self-harm/intent       | Content where the speaker expresses that they are engaging or intend to engage in acts of self-harm, such as suicide, cutting, and eating disorders.                                                                                           |
| sensitive              | Sensitive data that violates our policies.                                                                                                                                                                                                     |
| sexual/minors          | Sexual content that includes an individual who is under 18 years old.                                                                                                                                                                          |
| sexual                 | Content meant to arouse sexual excitement, such as the description of sexual activity, or that promotes sexual services (excluding sex education and wellness).                                                                                |
| violence               | Content that depicts death, violence, or physical injury.                                                                                                                                                                                      |

Each category has a predefined pass threshold; if too many evaluated examples in a given category fail, OpenAI blocks the fine-tuned model from deployment. If your fine-tuned model does not pass the safety checks, OpenAI sends a message in the fine-tuning job explaining which categories don't meet the required thresholds. You can view the results in the moderation checks section of the fine-tuning job.

How to pass safety checks

In addition to reviewing any failed safety checks in the fine-tuning job object, you can retrieve details about which categories failed by querying the [fine-tuning API events endpoint](https://developers.openai.com/api/docs/api-reference/fine-tuning/list-events). Look for events of type `moderation_checks` for details about category results and enforcement. This information can help you narrow down which categories to target for retraining and improvement. The [model spec](https://cdn.openai.com/spec/model-spec-2024-05-08.html#overview) has rules and examples that can help identify areas for additional training data.

While these evaluations cover a broad range of safety categories, conduct your own evaluations of the fine-tuned model to ensure it's appropriate for your use case.

## Next steps

Now that you know the basics of supervised fine-tuning, explore these other methods as well.

[

<span slot="icon">
      </span>
    Learn to fine-tune for computer vision with image inputs.

](https://developers.openai.com/api/docs/guides/vision-fine-tuning)

[

<span slot="icon">
      </span>
    Fine-tune a model using direct preference optimization (DPO).

](https://developers.openai.com/api/docs/guides/direct-preference-optimization)

[

<span slot="icon">
      </span>
    Fine-tune a reasoning model by grading its outputs.

](https://developers.openai.com/api/docs/guides/reinforcement-fine-tuning)