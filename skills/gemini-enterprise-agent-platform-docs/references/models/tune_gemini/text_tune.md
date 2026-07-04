This page provides prerequisites and detailed instructions for fine-tuning
Gemini on text data using supervised learning. For text tuning examples
of classification, sentiment analysis, and extraction use cases, see [Model
tuning for Gemini text
models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune_gemini/tune-gemini-learn).

## Use cases

Fine-tuning lets you adapt base Gemini models for specialized tasks.
Here are some text use cases:

- **Extracting structured information from chats**: Transform multi-turn conversations into organized data by fine-tuning a model to identify key attributes and output them in a structured format like JSONL.
- **Document categorization**: Fine-tune a model to accurately classify lengthy documents into predefined categories, enabling efficient organization and retrieval of information.
- **Instruction following**: Enhance a model's ability to comprehend and execute instructions, leading to more accurate and reliable task completion.
- **Automated code review**: Use fine-tuning to create a model capable of providing insightful code reviews, identifying potential issues, and suggesting improvements.
- **Summarization**: Generate concise and informative summaries of long texts by fine-tuning a model to capture the essence of the content.
- **Code and DSL generation**: Fine-tune a model to generate code in various programming languages or domain-specific languages (DSLs), automating repetitive coding tasks.
- **Improved RAG performance**: Enhance the helpfulness and accuracy of Retrieval-Augmented Generation (RAG) systems by fine-tuning the underlying language model.

## Dataset format

The `fileUri` for your dataset can be the URI for a file in a Cloud Storage
bucket, or it can be a publicly available HTTP or HTTPS URL.

The following is an example of a text dataset.

To see the generic format example, see
[Dataset example for Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning-prepare#dataset-example).

    {
      "systemInstruction": {
        "role": "system",
        "parts": [
          {
            "text": "You are a pirate dog named Captain Barktholomew."
          }
        ]
      },
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "text": "Hi"
            }
          ]
        },
        {
          "role": "model",
          "parts": [
            {
              "text": "Argh! What brings ye to my ship?"
            }
          ]
        },
        {
          "role": "user",
          "parts": [
            {
              "text": "What's your name?"
            }
          ]
        },
        {
          "role": "model",
          "parts": [
            {
              "text": "I be Captain Barktholomew, the most feared pirate dog of the seven seas."
            }
          ]
        }
      ]
    }

### Sample datasets

You can use the following sample datasets to learn how to tune a
Gemini model. To use these datasets, specify the URIs in the
applicable parameters when creating a text model supervised fine-tuning job.

To use the sample tuning dataset, specify its location as follows:

    "training_dataset_uri": "gs://cloud-samples-data/ai-platform/generative_ai/gemini-2_0/text/sft_train_data.jsonl",

To use the sample validation dataset, specify its location as follows:

    "validation_dataset_uri": "gs://cloud-samples-data/ai-platform/generative_ai/gemini-2_0/text/sft_validation_data.jsonl",

## What's next

- To start tuning, see [Tune Gemini models by using supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning).
- To learn how supervised fine-tuning can be used in a solution that builds a generative AI knowledge base, see [Jump Start Solution: Generative AI knowledge base](https://docs.cloud.google.com/architecture/ai-ml/generative-ai-knowledge-base).
