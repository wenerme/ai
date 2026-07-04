> [!WARNING]
>
> **Preview**
>
>
> This product or feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section
> of the [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1), and the
> [Additional Terms for Generative AI
> Preview Products](https://cloud.google.com/trustedtester/aitos).
>
> You can process personal data for
>
> this product or feature
>
> as outlined in the
> [Cloud Data
> Processing Addendum](https://docs.cloud.google.com/terms/data-processing-addendum), subject to the obligations and restrictions described in the
> agreement under which you access Google Cloud.
>
> Pre-GA products and features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

> [!NOTE]
> To see an example of Gemini 3.1 Pro,
> run the "Intro to Gemini 3.1 Pro" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_pro.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgetting-started%2Fintro_gemini_3_1_pro.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/getting-started/intro_gemini_3_1_pro.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_pro.ipynb)

Prompting is a key part of working with any Gemini model and the new
features of Gemini 3 models can be prompted to help solve complex
problems and achieve other tasks, such as interpreting large amounts of text,
solving complex mathematical problems, or even creating images and videos.

This guide provides a variety of prompting strategies to help you get the most
from Gemini 3 on Gemini Enterprise Agent Platform for a variety of use cases.

## Temperature tuning

For Gemini 3, we strongly recommend keeping the temperature
parameter at its default value of `1.0`.

Gemini 3's reasoning capabilities are optimized for the default
temperature setting and don't necessarily benefit from tuning temperature.
Changing the temperature (setting it to less than `1.0`) may lead to unexpected
behavior, looping, or degraded performance, particularly with complex
mathematical or reasoning tasks.

## Prompting strategies

The following sections describe a variety of prompting strategies that you can
use with Gemini 3 models.

### Lowering response latency

For lower latency responses, try setting the thinking level to `LOW`
and using system instructions like `think silently`.

### Distinguishing between deduction and external information

In some cases, providing open-ended system instructions like `do not infer` or
`do not guess` may cause the model to over-index on that instruction and
fail to perform basic logic or arithmetic or synthesize information found
in different parts of a document.

Rather than a large blanket negative constraint, tell the model explicitly to
use the provided additional information or context for deductions and avoid
using outside knowledge.

#### Examples

    What was the profit? Do not infer.

This instruction is ineffective because the `do not infer` instruction is too
broad.

    You are expected to perform calculations and logical deductions based strictly
    on the provided text. Do not introduce external information.

Here, the instruction makes it clear that the model should use the provided
context for calculations and reasoning.

### Using split-step verification

When the model encounters a topic it doesn't have sufficient information for
(such as an obscure place) or is asked to perform an action it doesn't have
capability for (such as accessing a specific live URL), it may
generate seemingly plausible but incorrect information in an attempt to satisfy
the request.

To avoid this, split the prompt into two steps: first, verify that the
information or intended capability exists, then generate the answer based off
of that information or capability.

#### Example

    Verify with high confidence if you're able to access the New York Times home page.
    If you cannot verify, state 'No Info' and STOP. If verified, proceed to generate
    a response.

    Query: Summarize the headlines from The New York Times today.

### Organizing important information and constraints

When dealing with sufficiently complex requests, the model may drop negative
constraints (specific instructions on what not to do) or formatting or
quantitative constraints (instructions like word counts) if they appear too
early in the prompt.

To mitigate this, place your core request and most critical restrictions as the
final line of your instruction. In particular, negative constraints should be
placed at the end of the instruction. A well-structured prompt might look like
this:

- \[Context and source material\]
- \[Main task instructions\]
- \[Negative, formatting, and quantitative constraints\]

### Using personas

The model is designed to treat the persona it is assigned seriously and will
sometimes ignore instructions in order to maintain adherence to the described
persona. When using a persona with your prompts, review the persona that's
assigned to the model and avoid ambiguous situations.

#### Example

    You are a data extractor. You are forbidden from clarifying, explaining, or
    expanding terms. Output text exactly as it appears. Do not explain why.

### Maintaining grounding

The model may use its own knowledge to answer your prompt, which might conflict
with any provided context. While the model is designed to be helpful, if you
provide a hypothetical scenario that contradicts real-world facts (prompting
with context such as `Crabs are fictional and have never existed.`), the
model may revert to its training data rather than your prompt to align your
request with its existing information.

If you need to work in context that isn't grounded in real-world information,
explicitly state that the provided context is the only source of truth for the
current session.

#### Example

    You are a strictly grounded assistant limited to the information provided in the
    User Context. In your answers, rely **only** on the facts that are directly
    mentioned in that context. You must **not** access or utilize your own knowledge
    or common sense to answer. Do not assume or infer from the provided facts;
    simply report them exactly as they appear. Your answer must be factual and
    fully truthful to the provided text, leaving absolutely no room for speculation
    or interpretation. Treat the provided context as the absolute limit of truth;
    any facts or details that are not directly mentioned in the context must be
    considered **completely untruthful** and **completely unsupported**. If the
    exact answer is not explicitly written in the context, you must state that the
    information is not available.

### Synthesizing multiple sources of information

When information is presented in multiple places across a source of context, the
model can sometimes stop processing additional information after the first
relevant match.

When working with large datasets, like entire books, codebases, or long videos,
place your specific instructions or questions at the end of the prompt, after
the data context. You can also anchor the model's reasoning to the provided
data by starting your question with a phrase like
`Based on the entire document above...`.

#### Example instruction

    Based on the entire document above, provide a comprehensive answer. Synthesize
    all relevant information from the text that pertains to the question's scenario.

### Steering output verbosity

By default, Gemini 3 models are less verbose and designed to
prioritize providing direct and efficient answers.

If your use case requires a more conversational persona, you must
explicitly steer the model to be chattier in the prompt.

#### Example instruction

    Explain this as a friendly, talkative assistant.

## What's next

- Try the [Intro to Gemini 3.1 Pro](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_pro.ipynb) notebook tutorial.
- Learn about [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling).
- Learn about [Thinking](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking).
