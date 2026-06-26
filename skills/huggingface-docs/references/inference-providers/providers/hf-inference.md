

# HF Inference

> [!TIP]
> All supported HF Inference models can be found [here](https://huggingface.co/models?inference_provider=hf-inference&sort=trending)

<div class="flex justify-center">
    <a href="https://huggingface.co/" target="_blank">


    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/hf-inference" target="_blank">


    </a>
</div>

HF Inference is the serverless Inference API powered by Hugging Face. This service used to be called "Inference API (serverless)" prior to Inference Providers.
If you are interested in deploying models to a dedicated and autoscaling infrastructure managed by Hugging Face, check out [Inference Endpoints](https://huggingface.co/docs/inference-endpoints/index) instead.

As of July 2025, hf-inference focuses mostly on CPU inference (e.g. embedding, text-ranking, text-classification, or smaller LLMs that have historical importance like BERT or GPT-2).

## Supported tasks

### Automatic Speech Recognition

Find out more about Automatic Speech Recognition [here](../tasks/automatic-speech-recognition).

<InferenceSnippet
    pipeline=automatic-speech-recognition
    providersMapping={ {"hf-inference":{"modelId":"openai/whisper-large-v3","providerModelId":"openai/whisper-large-v3"} } }
/>

### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"hf-inference":{"modelId":"HuggingFaceBio/Carbon-3B","providerModelId":"HuggingFaceBio/Carbon-3B"} } }
conversational />

### Feature Extraction

Find out more about Feature Extraction [here](../tasks/feature-extraction).

<InferenceSnippet
    pipeline=feature-extraction
    providersMapping={ {"hf-inference":{"modelId":"microsoft/harrier-oss-v1-0.6b","providerModelId":"microsoft/harrier-oss-v1-0.6b"} } }
/>

### Fill Mask

Find out more about Fill Mask [here](../tasks/fill-mask).

<InferenceSnippet
    pipeline=fill-mask
    providersMapping={ {"hf-inference":{"modelId":"google-bert/bert-base-uncased","providerModelId":"google-bert/bert-base-uncased"} } }
/>

### Image Classification

Find out more about Image Classification [here](../tasks/image-classification).

<InferenceSnippet
    pipeline=image-classification
    providersMapping={ {"hf-inference":{"modelId":"Falconsai/nsfw_image_detection","providerModelId":"Falconsai/nsfw_image_detection"} } }
/>

### Image Segmentation

Find out more about Image Segmentation [here](../tasks/image-segmentation).

<InferenceSnippet
    pipeline=image-segmentation
    providersMapping={ {"hf-inference":{"modelId":"fashn-ai/fashn-human-parser","providerModelId":"fashn-ai/fashn-human-parser"} } }
/>

### Object Detection

Find out more about Object Detection [here](../tasks/object-detection).

<InferenceSnippet
    pipeline=object-detection
    providersMapping={ {"hf-inference":{"modelId":"facebook/detr-resnet-50","providerModelId":"facebook/detr-resnet-50"} } }
/>

### Question Answering

Find out more about Question Answering [here](../tasks/question-answering).

<InferenceSnippet
    pipeline=question-answering
    providersMapping={ {"hf-inference":{"modelId":"deepset/roberta-base-squad2","providerModelId":"deepset/roberta-base-squad2"} } }
/>

### Summarization

Find out more about Summarization [here](../tasks/summarization).

<InferenceSnippet
    pipeline=summarization
    providersMapping={ {"hf-inference":{"modelId":"facebook/bart-large-cnn","providerModelId":"facebook/bart-large-cnn"} } }
/>

### Table Question Answering

Find out more about Table Question Answering [here](../tasks/table-question-answering).

<InferenceSnippet
    pipeline=table-question-answering
    providersMapping={ {"hf-inference":{"modelId":"google/tapas-base-finetuned-wtq","providerModelId":"google/tapas-base-finetuned-wtq"} } }
/>

### Text Classification

Find out more about Text Classification [here](../tasks/text-classification).

<InferenceSnippet
    pipeline=text-classification
    providersMapping={ {"hf-inference":{"modelId":"BAAI/bge-reranker-v2-m3","providerModelId":"BAAI/bge-reranker-v2-m3"} } }
/>

### Text Generation

Find out more about Text Generation [here](../tasks/text-generation).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"hf-inference":{"modelId":"HuggingFaceBio/Carbon-3B","providerModelId":"HuggingFaceBio/Carbon-3B"} } }
/>

### Text To Image

Find out more about Text To Image [here](../tasks/text-to-image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"hf-inference":{"modelId":"black-forest-labs/FLUX.1-schnell","providerModelId":"black-forest-labs/FLUX.1-schnell"} } }
/>

### Token Classification

Find out more about Token Classification [here](../tasks/token-classification).

<InferenceSnippet
    pipeline=token-classification
    providersMapping={ {"hf-inference":{"modelId":"OpenMed/OpenMed-PII-SuperClinical-Large-434M-v1","providerModelId":"OpenMed/OpenMed-PII-SuperClinical-Large-434M-v1"} } }
/>

### Translation

Find out more about Translation [here](../tasks/translation).

<InferenceSnippet
    pipeline=translation
    providersMapping={ {"hf-inference":{"modelId":"google-t5/t5-small","providerModelId":"google-t5/t5-small"} } }
/>

### Zero Shot Classification

Find out more about Zero Shot Classification [here](../tasks/zero-shot-classification).

<InferenceSnippet
    pipeline=zero-shot-classification
    providersMapping={ {"hf-inference":{"modelId":"MoritzLaurer/mDeBERTa-v3-base-xnli-multilingual-nli-2mil7","providerModelId":"MoritzLaurer/mDeBERTa-v3-base-xnli-multilingual-nli-2mil7"} } }
/>
