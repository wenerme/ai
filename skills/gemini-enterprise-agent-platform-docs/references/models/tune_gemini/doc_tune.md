This page provides prerequisites and detailed instructions for fine-tuning
Gemini on document data using supervised learning.

## Use cases

Fine-tuning lets you customize powerful language models for your specific needs.
Here are some key use cases where fine-tuning with your own set of PDFs can
significantly enhance a model's performance:

- **Internal knowledge base**: Convert your internal documents into an AI-powered knowledge base that provides instant answers and insights. For example, a sales representative could instantly access product specifications and pricing details from past training materials.
- **Research assistant**: Create a research assistant capable of analyzing a collection of research papers, articles, and books. A researcher studying climate change could quickly analyze scientific papers to identify trends in sea level rise or assess the effectiveness of different mitigation strategies.
- **Legal or regulatory compliance**: Fine-tuning on legal documents can help automate contract review, flagging potential inconsistencies or areas of risk. This allows legal professionals to focus on higher-level tasks while ensuring compliance.
- **Automated report generation**: Automate the analysis of complex financial reports, extracting key performance indicators and generating summaries for stakeholders. This can save time and reduce the risk of errors compared to manual analysis.
- **Content summarization and analysis**: Summarize lengthy PDF documents, extract key insights, and analyze trends. For example, a market research team could analyze a collection of customer surveys to identify key themes and sentiment.
- **Document comparison and version control**: Compare different versions of a document to identify changes and track revisions. This can be particularly useful in collaborative environments where multiple authors contribute to a document.

## Limitations

The following are the limitations when including PDFs in your dataset:

- **Maximum PDF pages per example**: 300
- **Maximum PDF files per example**: 4
- **Maximum PDF file size**: 20MB

To learn more about document understanding requirements, see [Document understanding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/document-understanding#document-requirements).

## Dataset format

The `fileUri` for your dataset can be the URI for a file in a Cloud Storage
bucket, or it can be a publicly available HTTP or HTTPS URL.

To see the generic format example, see
[Dataset example for Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning-prepare#dataset-example).

The following is an example of a document dataset.

    {
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "fileData": {
                "mimeType": "application/pdf",
                "fileUri": "gs://cloud-samples-data/generative-ai/pdf/2403.05530.pdf"
                }
            },
            {
              "text": "You are a very professional document summarization specialist. Please summarize the given document."
            }
          ]
        },
        {
          "role": "model",
          "parts": [
            {
              "text": "The report introduces Gemini 2.0 Flash, a multimodal AI model developed by Google DeepMind. The report positions Gemini 2.0 Flash as a significant advancement in multimodal AI, pushing the boundaries of long-context understanding and opening new avenues for future research and applications."
            }
          ]
        }
      ]
    }

(Gemini 3 and higher models only) Starting with the Gemini 3
models, you can also [set the media resolution per individual media `Part`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/get-started-with-gemini-3#media-resolution-by-part).
This lets you mix resolutions in your dataset (for example, by setting
`MEDIA_RESOLUTION_HIGH` for one item and `MEDIA_RESOLUTION_LOW` for another).

`Part`-level media resolution settings take precedence over global settings.

If you don't specify a media `Part` for a specific media, then the default value
is the same as the serving side defaults. For more information about part-level
resolution and their corresponding token counts, see [Media
resolution](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/get-started-with-gemini-3#media-resolution).

The following is an example dataset that sets the media resolution at both the
`Part` and global levels:

    {
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "fileData": {
                "mimeType": "application/pdf",
                "fileUri": "gs://cloud-samples-data/generative-ai/pdf/2403.05530.pdf"
              }
            },
            {
              "fileData": {
                "mimeType": "application/pdf",
                "fileUri": "gs://<path to another PDF>"
              },
              "mediaResolution": {
                "level": "MEDIA_RESOLUTION_HIGH"
              }
            },
            {
              "text": "Describe these documents in detail."
            }
          ]
        },
        {
          "role": "model",
          "parts": [
            {
              "text": "PDF 1 is low resolution while PDF 2 is sharp and clear"
            }
          ]
        }
      ],
      "generationConfig": {
        "mediaResolution": "MEDIA_RESOLUTION_LOW"
      }
    }

## What's next

- To learn more about the document understanding capability of Gemini models, see the [Document understanding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/document-understanding) overview.
- To start tuning, see [Tune Gemini models by using supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-supervised-tuning)
- To learn how supervised fine-tuning can be used in a solution that builds a generative AI knowledge base, see [Jump Start Solution: Generative AI
  knowledge base](https://docs.cloud.google.com/architecture/ai-ml/generative-ai-knowledge-base).
