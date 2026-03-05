# Reinforcement fine-tuning use cases

[Reinforcement fine-tuning](https://developers.openai.com/api/docs/guides/reinforcement-fine-tuning) (RFT) provides a way to improve your model's performance at specific tasks. The task must be clear and have verifiable answers.

## When to use reinforcement fine-tuning

Agentic workflows are designed to make decisions that are both correct and verifiable. RFT can help by providing explicit rubrics and using code‑based or LLM‑based graders to measure functional success, factual accuracy, or policy compliance.

Across early users, three clear use cases have emerged:

1. **Turn instructions into working code**: Convert open-ended prompts into structured code, configs, or templates that must pass deterministic tests.
1. **Pull facts into a clean format**: Extract verifiable facts and summaries from messy, unstructured text and return JSON-structured or other schema-based outputs.
1. **Apply complex rules correctly**: Make fine-grained label or policy decisions when the information provided is nuanced, large in quantity, hierarchical, or high-stakes.

[Ready to use reinforcement fine-tuning? Skip to the guide →](https://developers.openai.com/api/docs/guides/reinforcement-fine-tuning)

### 1. Turn instructions into working code

In this use case, models reason over hidden domain constraints to produce structured outputs like code, queries, or infrastructure templates. Outputs must satisfy multiple correctness conditions, and success is usually deterministically graded: the artifact either compiles, passes tests, or meets an explicit schema.

#### Wiring verification IPs for semiconductor design



<div data-content-switcher-pane data-value="use-case">
    <div class="hidden">Use case</div>
    </div>
  <div data-content-switcher-pane data-value="prompt" hidden>
    <div class="hidden">Prompt</div>
    </div>
  <div data-content-switcher-pane data-value="grader" hidden>
    <div class="hidden">Grader code</div>
    </div>
  <div data-content-switcher-pane data-value="review" hidden>
    <div class="hidden">Results</div>
    </div>



#### Production-ready API snippets that compile and pass AST checks



<div data-content-switcher-pane data-value="use-case">
    <div class="hidden">Use case</div>
    </div>
  <div data-content-switcher-pane data-value="grader" hidden>
    <div class="hidden">Grader code</div>
    </div>
  <div data-content-switcher-pane data-value="review" hidden>
    <div class="hidden">Results</div>
    </div>



#### Correct handling of conflicts and dupes in a schedule manager



<div data-content-switcher-pane data-value="use-case">
    <div class="hidden">Use case</div>
    </div>
  <div data-content-switcher-pane data-value="review" hidden>
    <div class="hidden">Results</div>
    </div>



### 2. Pull facts into a clean format

These tasks typically involve subtle distinctions that demand clear classification guidelines. Successful framing requires explicit and hierarchical labeling schemes defined through consensus by domain experts. Without consistent agreement, grading signals become noisy, weakening RFT effectiveness.

#### Assigning ICD-10 medical codes



<div data-content-switcher-pane data-value="use-case">
    <div class="hidden">Use case</div>
    </div>
  <div data-content-switcher-pane data-value="review" hidden>
    <div class="hidden">Results</div>
    </div>



#### Extracting excerpts to support legal claims



<div data-content-switcher-pane data-value="use-case">
    <div class="hidden">Use case</div>
    </div>
  <div data-content-switcher-pane data-value="prompt" hidden>
    <div class="hidden">Prompt</div>
    </div>
  <div data-content-switcher-pane data-value="grader" hidden>
    <div class="hidden">Grader</div>
    </div>
  <div data-content-switcher-pane data-value="review" hidden>
    <div class="hidden">Results</div>
    </div>



### 3. Apply complex rules correctly

This use case involves pulling verifiable facts or entities from unstructured inputs into clearly defined schemas (e.g., JSON objects, condition codes, medical codes, legal citations, or financial metrics).

Successful extraction tasks typically benefit from precise, continuous grading methodologies—like span-level F1 scores, fuzzy text-matching metrics, or numeric accuracy checks—to evaluate how accurately the extracted information aligns with ground truth. Define explicit success criteria and detailed rubrics. Then, the model can achieve reliable, repeatable improvements.

#### Expert-level reasoning in tax analysis



<div data-content-switcher-pane data-value="use-case">
    <div class="hidden">Use case</div>
    </div>
  <div data-content-switcher-pane data-value="grader" hidden>
    <div class="hidden">Grader code</div>
    </div>
  <div data-content-switcher-pane data-value="review" hidden>
    <div class="hidden">Results</div>
    </div>



#### Enforcement of nuanced content moderation policies



<div data-content-switcher-pane data-value="use-case">
    <div class="hidden">Use case</div>
    </div>
  <div data-content-switcher-pane data-value="review" hidden>
    <div class="hidden">Results</div>
    </div>



#### Legal document reviews, comparisons, and summaries



<div data-content-switcher-pane data-value="use-case">
    <div class="hidden">Use case</div>
    </div>
  <div data-content-switcher-pane data-value="review" hidden>
    <div class="hidden">Results</div>
    </div>



## Evals are the foundation

**Before implementing RFT, we strongly recommended creating and running an eval for the task you intend to fine-tune on**. If the model you intend to fine-tune scores at either the absolute minimum or absolute maximum possible score, then RFT won’t be useful to you.

RFT works by reinforcing better answers to provided prompts. If we can’t distinguish the quality of different answers (i.e., if they all receive the minimum or maximum possible score), then there's no training signal to learn from. However, if your eval scores somewhere in the range between the minimum and maximum possible scores, there's enough data to work with.

An effective eval reveals opportunities where human experts consistently agree but current frontier models struggle, presenting a valuable gap for RFT to close. [Get started with evals](https://developers.openai.com/api/docs/guides/evals).

## How to get better results from RFT

To see improvements in your fine-tuned model, there are two main places to revisit and refine: making sure your task is well defined, and making your grading scheme more robust.

### Reframe or clarify your task

Good tasks give the model a fair chance to learn and let you quantify improvements.

- **Start with a task the model can already solve occasionally**. RFT works by sampling many answers, keeping what looks best, and nudging the model toward those answers. If the model never gets the answer correct today, it cannot improve.
- **Make sure each answer can be graded**. A grader must read an answer and produce a score without a person in the loop. We support multiple [grader types](https://developers.openai.com/api/docs/guides/graders), including custom Python graders and LLM judges. If you can't write code to judge the answer with an available grader, RFT is not the right tool.
- **Remove doubt about the “right” answer**. If two careful people often disagree on the solution, the task is too fuzzy. Rewrite the prompt, add context, or split the task into clearer parts until domain experts agree.
- **Limit lucky guesses**. If the task is multiple choice with one obvious best pick, the model can win by chance. Add more classes, ask for short open‑ended text, or tweak the format so guessing is costly.

### Strengthen your grader

Clear, robust grading schemes are essential for RFT.

- **Produce a smooth score, not a pass/fail stamp**. A score that shifts gradually as answers improve provides a better training signal.
- **Guard against reward hacking**. This happens when the model finds a shortcut that earns high scores without real skill.
- **Avoid skewed data**. Datasets in which one label shows up most of the time invite the model to guess that label. Balance the set or up‑weight rare cases so the model must think.
- **Use an LLM judge when code falls short**. For rich, open‑ended answers, have a [separate OpenAI model grade](https://developers.openai.com/api/docs/guides/graders#model-graders) your fine-tuned model's answers. Make sure you:
  - **Evaluate the judge**: Run multiple candidate responses and correct answers through your LLM judge to ensure the grade returned is stable and aligned with preference.
  - **Provide few-shot examples**. Include great, fair, and poor answers in the prompt to improve the grader's effectiveness.

Learn more about [grader types](https://developers.openai.com/api/docs/guides/graders).

## Other resources

For more inspiration, visit the [OpenAI Cookbook](https://developers.openai.com/cookbook), which contains example code and links to third-party resources, or learn more about our models and reasoning capabilities:

- [Meet the models](https://developers.openai.com/api/docs/models)
- [Reinforcement fine-tuning guide](https://developers.openai.com/api/docs/guides/reinforcement-fine-tuning)
- [Graders](https://developers.openai.com/api/docs/guides/graders)
- [Model optimization overview](https://developers.openai.com/api/docs/guides/model-optimization)