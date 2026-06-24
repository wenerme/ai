

# Open WebUI

[Open WebUI](https://openwebui.com/) provides a self-hosted interface for offline models. Enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) to serve local models (it's disabled by default for security).

```bash
transformers serve --enable-cors
```

To use the server for speech-to-text, go to **Settings > Audio**.

1. Set **Speech-to-Text Engine** to **OpenAI**.
2. Set the URL to http://localhost:8000/v1.
3. Enter a transcription model in **SST Model** (openai/whisper-large-v3). Find more models on the [Hub](https://huggingface.co/models?pipeline_tag=automatic-speech-recognition&sort=trending).

<h3 align="center">
    
</h3>

Start a chat and speak. The model transcribes your audio into the input field.