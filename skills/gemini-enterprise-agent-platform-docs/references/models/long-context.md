> [!NOTE]
> To see an example of long context,
> run the "Intro to long context" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/long-context/intro_long_context.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Flong-context%2Fintro_long_context.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/long-context/intro_long_context.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/long-context/intro_long_context.ipynb)

Gemini comes standard with a 1-million-token context window.
Historically, large language models (LLMs) were significantly limited by the
amount of text (or tokens) that could be passed to the model at one time. The
Gemini long context window, with
[near-perfect retrieval (\>99%)](https://storage.googleapis.com/deepmind-media/gemini/gemini_v1_5_report.pdf),
unlocks many new use cases and developer paradigms.

The code you already use for cases like [content
generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent)
or [multimodal
inputs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-understanding)
will work out of the box with long context.

Throughout this guide, you briefly explore the basics of the context window, how
developers should think about long context, various real world use cases for
long context, and ways to optimize the usage of long context.

## What is a context window?

The basic way you use the Gemini models is by passing information
(context) to the model, which will subsequently generate a response. An analogy
for the context window is short term memory. There is a limited amount of
information that can be stored in someone's short term memory, and the same is
true for generative models.

You can read more about how models work under the hood in our [generative models
guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/overview).

## Getting started with long context

Most generative models created in the last few years were only capable of
processing 8,000 tokens at a time. Newer models pushed this further by accepting
32,000 tokens or 128,000 tokens. Gemini is the first model capable of
accepting 1 million tokens, and now
[2 million tokens with Gemini 1.5 Pro](https://developers.googleblog.com/en/new-features-for-the-gemini-api-and-google-ai-studio/).

In practice, 1 million tokens would look like:

- 50,000 lines of code (with the standard 80 characters per line)
- All the text messages you have sent in the last 5 years
- 8 average-length English novels
- Transcripts of over 200 average length podcast episodes

Even though the models can take in more and more context, much of the
conventional wisdom about using large language models assumes this inherent
limitation on the model, which as of 2024, is no longer the case.

Some common strategies to handle the limitation of small context windows
included:

- Arbitrarily dropping old messages / text from the context window as new text comes in
- Summarizing previous content and replacing it with the summary when the context window gets close to being full
- Using RAG with semantic search to move data out of the context window and into a vector database
- Using deterministic or generative filters to remove certain text / characters from prompts to save tokens

While many of these are still relevant in certain cases, the default place to
start is now just putting all of the tokens into the context window. Because
Gemini models were purpose-built with a long context window, they are much
more capable of in-context learning. For example, with only instructional
materials (a 500-page reference grammar, a dictionary, and ≈ 400 extra parallel
sentences) all provided in context, Gemini 1.5 Pro and Gemini 1.5 Flash are
[capable of learning to translate](https://storage.googleapis.com/deepmind-media/gemini/gemini_v1_5_report.pdf)
from English to Kalamang--- a Papuan language with fewer than 200 speakers and
therefore almost no online presence---with quality similar to a person who learned
from the same materials.

This example underscores how you can start to think about what is possible with
long context and the in-context learning capabilities of Gemini.

## Long context use cases

While the standard use case for most generative models is still text input, the
Gemini model family enables a new paradigm of multimodal use cases. These
models can natively understand text, video, audio, and images. They are
accompanied by the [Gemini Enterprise API for Gemini that takes in multimodal file types](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/design-multimodal-prompts) for
convenience.

### Long form text

Text has proved to be the layer of intelligence underpinning much of the
momentum around LLMs. As mentioned earlier, much of the practical limitation of
LLMs was because of not having a large enough context window to do certain
tasks. This led to the rapid adoption of retrieval augmented generation (RAG)
and other techniques which dynamically provide the model with relevant
contextual information. Now, with larger and larger context windows (currently
up to 2 million on Gemini 1.5 Pro), there are new techniques becoming available
which unlock new use cases.

Some emerging and standard use cases for text based long context include:

- Summarizing large corpuses of text
  - Previous summarization options with smaller context models would require a sliding window or another technique to keep state of previous sections as new tokens are passed to the model
- Question and answering
  - Historically this was only possible with RAG given the limited amount of context and models' factual recall being low
- Agentic workflows
  - Text is the underpinning of how agents keep state of what they have done and what they need to do; not having enough information about the world and the agent's goal is a limitation on the reliability of agents

[Many-shot in-context learning](https://arxiv.org/pdf/2404.11018) is one of the
most unique capabilities unlocked by long context models. Research has shown
that taking the common "single shot" or "multi-shot" example paradigm, where the
model is presented with one or a few examples of a task, and scaling that up to
hundreds, thousands, or even hundreds of thousands of examples, can lead to
novel model capabilities. This many-shot approach has also been shown to perform
similarly to models which were fine-tuned for a specific task. For use cases
where a Gemini model's performance is not yet sufficient for a production
rollout, you can try the many-shot approach. As you might explore later in the
long context optimization section, context caching makes this type of high input
token workload much more economically feasible and even lower latency in some
cases.

### Long form video

Video content's utility has long been constrained by the lack of accessibility
of the medium itself. It was hard to skim the content, transcripts often failed
to capture the nuance of a video, and most tools don't process image, text, and
audio together. With Gemini, the long-context text capabilities
translate to the ability to reason and answer questions about multimodal inputs
with sustained performance.

Some emerging and standard use cases for video long context include:

- Video question and answering
- Video memory, as shown with [Google's Project Astra](https://deepmind.google/technologies/gemini/project-astra/)
- Video captioning
- Video recommendation systems, by enriching existing metadata with new multimodal understanding
- Video customization, by looking at a corpus of data and associated video metadata and then removing parts of videos that are not relevant to the viewer
- Video content moderation
- Real-time video processing

When working with videos, it is important to consider how the [videos are processed into tokens](https://ai.google.dev/gemini-api/docs/tokens#multimodal-tokens), which affects
billing and usage limits. You can learn more about prompting with video files in
the [Prompting guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/video-understanding).

### Long form audio

The Gemini models were the first natively multimodal large language
models that could understand audio. Historically, the typical developer workflow
would involve stringing together multiple domain specific models, like a
speech-to-text model and a text-to-text model, in order to process audio. This
led to additional latency required by performing multiple round-trip requests
and decreased performance usually attributed to disconnected architectures of
the multiple model setup.

On standard audio-haystack evaluations, Gemini 1.5 Pro is able to find the
hidden audio in 100% of the tests and Gemini 1.5 Flash is able to find it in
98.7% [of the tests](https://storage.googleapis.com/deepmind-media/gemini/gemini_v1_5_report.pdf).
Gemini 1.5 Flash accepts up to 9.5 hours of [audio in a single request](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/audio-understanding) and
Gemini 1.5 Pro can accept up to 19 hours of audio using the 2-million-token
context window. Further, on a test set of 15-minute audio clips, Gemini 1.5 Pro
archives a word error rate (WER) of \~5.5%, much lower than even specialized
speech-to-text models, without the added complexity of extra input segmentation
and pre-processing.

Some emerging and standard use cases for audio context include:

- Real-time transcription and translation
- Podcast / video question and answering
- Meeting transcription and summarization
- Voice assistants

You can learn more about prompting with audio files in the [Prompting
guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/design-multimodal-prompts).

## Long context optimizations

The primary optimization when working with long context and the Gemini
models is to use [context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview). Beyond the previous
impossibility of processing lots of tokens in a single request, the other main
constraint was the cost. If you have a "chat with your data" app where a user
uploads 10 PDFs, a video, and some work documents, you would historically have
to work with a more complex retrieval augmented generation (RAG) tool /
framework in order to process these requests and pay a significant amount for
tokens moved into the context window. Now, you can cache the files the user
uploads and pay to store them on a per hour basis. The input / output cost per
request is less than the standard input / output cost, so if
the user chats with their data enough, it becomes a huge cost saving for you as
the developer.

## Long context limitations

In various sections of this guide, we talked about how Gemini models
achieve high performance across various needle-in-a-haystack retrieval evals.
These tests consider the most basic setup, where you have a single needle you
are looking for. In cases where you might have multiple "needles" or specific
pieces of information you are looking for, the model does not perform with the
same accuracy. Performance can vary to a wide degree depending on the context.
This is important to consider as there is an inherent tradeoff between getting
the right information retrieved and cost. You can get \~99% on a single query,
but you have to pay the input token cost every time you send that query. So for
100 pieces of information to be retrieved, if you needed 99% performance, you
would likely need to send 100 requests. This is a good example of where context
caching can significantly reduce the cost associated with using Gemini
models while keeping the performance high.

## What's next

Guide

### [List and count tokens](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/list-token)

Use the Google Gen AI SDK to list the tokens and their token IDs of a prompt and get a total token count of a prompt.
