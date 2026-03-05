# Model optimization

import {
  Report,
  Code,
  Tools,
} from "@components/react/oai/platform/ui/Icon.react";
import {
  evalsIcon,
  promptIcon,
  fineTuneIcon,
} from "./model-optimization-icons";




LLM output is non-deterministic, and model behavior changes between model snapshots and families. Developers must constantly measure and tune the performance of LLM applications to ensure they're getting the best results. In this guide, we explore the techniques and OpenAI platform tools you can use to ensure high quality outputs from the model.

<div className="my-4 w-full max-w-full overflow-hidden">
  </div>

## Model optimization workflow

Optimizing model output requires a combination of **evals**, **prompt engineering**, and **fine-tuning**, creating a flywheel of feedback that leads to better prompts and better training data for fine-tuning. The optimization process usually goes something like this.

1. Write [evals](https://developers.openai.com/api/docs/guides/evals) that measure model output, establishing a baseline for performance and accuracy.
1. [Prompt the model](https://developers.openai.com/api/docs/guides/text) for output, providing relevant context data and instructions.
1. For some use cases, it may be desirable to [fine-tune](#fine-tune-a-model) a model for a specific task.
1. Run evals using test data that is representative of real world inputs. Measure the performance of your prompt and fine-tuned model.
1. Tweak your prompt or fine-tuning dataset based on eval feedback.
1. Repeat the loop continuously to improve your model results.

Here's an overview of the major steps, and how to do them using the OpenAI platform.

## Build evals

In the OpenAI platform, you can [build and run evals](https://developers.openai.com/api/docs/guides/evals) either via API or in the [dashboard](https://platform.openai.com/evaluations). You might even consider writing evals _before_ you start writing prompts, taking an approach akin to behavior-driven development (BDD).

Run your evals against test inputs like you expect to see in production. Using one of several available [graders](https://developers.openai.com/api/docs/guides/graders), measure the results of a prompt against your test data set.

[

<span slot="icon">
      </span>
    Run tests on your model outputs to ensure you're getting the right results.

](https://developers.openai.com/api/docs/guides/evals)

## Write effective prompts

With evals in place, you can effectively iterate on [prompts](https://developers.openai.com/api/docs/guides/text). The prompt engineering process may be all you need in order to get great results for your use case. Different models may require different prompting techniques, but there are several best practices you can apply across the board to get better results.

- **Include relevant context** - in your instructions, include text or image content that the model will need to generate a response from outside its training data. This could include data from private databases or current, up-to-the-minute information.
- **Provide clear instructions** - your prompt should contain clear goals about what kind of output you want. GPT models like `gpt-4.1` are great at following very explicit instructions, while [reasoning models](https://developers.openai.com/api/docs/guides/reasoning) like `o4-mini` tend to do better with high level guidance on outcomes.
- **Provide example outputs** - give the model a few examples of correct output for a given prompt (a process called few-shot learning). The model can extrapolate from these examples how it should respond for other prompts.

[

<span slot="icon">
      </span>
    Learn the basics of writing good prompts for the model.

](https://developers.openai.com/api/docs/guides/text)

## Fine-tune a model

OpenAI models are already pre-trained to perform across a broad range of subjects and tasks. Fine-tuning lets you take an OpenAI base model, provide the kinds of inputs and outputs you expect in your application, and get a model that excels in the tasks you'll use it for.

Fine-tuning can be a time-consuming process, but it can also enable a model to consistently format responses in a certain way or handle novel inputs. You can use fine-tuning with [prompt engineering](https://developers.openai.com/api/docs/guides/text) to realize a few more benefits over prompting alone:

- You can provide more example inputs and outputs than could fit within the context window of a single request, enabling the model handle a wider variety of prompts.
- You can use shorter prompts with fewer examples and context data, which saves on token costs at scale and can be lower latency.
- You can train on proprietary or sensitive data without having to include it via examples in every request.
- You can train a smaller, cheaper, faster model to excel at a particular task where a larger model is not cost-effective.

Visit our [pricing page](https://openai.com/api/pricing) to learn more about how fine-tuned model training and usage are billed.

### Fine-tuning methods

These are the fine-tuning methods supported in the OpenAI platform today.

### How fine-tuning works

In the OpenAI platform, you can create fine-tuned models either in the [dashboard](https://platform.openai.com/finetune) or [with the API](https://developers.openai.com/api/docs/api-reference/fine-tuning). This is the general shape of the fine-tuning process:

1. Collect a dataset of examples to use as training data
1. Upload that dataset to OpenAI, formatted in JSONL
1. Create a fine-tuning job using one of the methods above, depending on your goals—this begins the fine-tuning training process
1. In the case of RFT, you'll also define a grader to score the model's behavior
1. Evaluate the results

Get started with [supervised fine-tuning](https://developers.openai.com/api/docs/guides/supervised-fine-tuning), [vision fine-tuning](https://developers.openai.com/api/docs/guides/vision-fine-tuning), [direct preference optimization](https://developers.openai.com/api/docs/guides/direct-preference-optimization), or [reinforcement fine-tuning](https://developers.openai.com/api/docs/guides/reinforcement-fine-tuning).

## Learn from experts

Model optimization is a complex topic, and sometimes more art than science. Check out the videos below from members of the OpenAI team on model optimization techniques.



<div data-content-switcher-pane data-value="cost">
    <div class="hidden">Cost/accuracy/latency</div>
    <iframe
      width="100%"
      height="400"
      src="https://www.youtube.com/embed/Bx6sUDRMx-8?si=i3Tl8qEjlCdOtyiU"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  </div>
  <div data-content-switcher-pane data-value="distillation" hidden>
    <div class="hidden">Distillation</div>
    <iframe
      width="100%"
      height="400"
      src="https://www.youtube.com/embed/CqWpJFK-hOo?si=7ztgDp1inte0vnw7"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  </div>
  <div data-content-switcher-pane data-value="techniques" hidden>
    <div class="hidden">Optimizing LLM Performance</div>
    <iframe
      width="100%"
      height="400"
      src="https://www.youtube-nocookie.com/embed/ahnGLM-RC1Y?si=cPQngClssVG_R2_q"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  </div>