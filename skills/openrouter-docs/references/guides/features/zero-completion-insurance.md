> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Zero Completion Insurance

> OpenRouter will not charge you for zero token responses

OpenRouter provides zero completion insurance to protect users from being charged for failed or empty responses. When a response contains no output tokens and either has a blank finish reason or an error, you will not be charged for the model's token usage, even if the underlying provider charges for prompt processing.

<Note>
  Zero completion insurance is automatically enabled for all accounts and requires no configuration.
</Note>

## How It Works

Zero completion insurance automatically applies to all requests across all models and providers. When a response meets either of these conditions, no credits will be deducted for the model's prompt, completion, or reasoning tokens:

* The response has zero completion tokens AND a blank/null finish reason
* The response has an error finish reason

## What Is Covered

Zero completion insurance covers the model's inference cost: prompt tokens, completion tokens, and reasoning tokens are not billed when a response qualifies.

For text-to-speech requests, usable output means that the response stream delivered format-valid audio: at least one complete MPEG frame for MP3 or one complete sample for PCM. Empty, invalid, and truncated output is not billed. Character-priced requests are billed for the full input once usable audio is delivered, including when the client cancels after receiving partial audio.

For image generation requests, usable output means the response delivered at least one image whose base64 payload is non-empty and decodable. Responses with no image data, an empty payload, or a payload that is not valid base64 are rejected as upstream failures and are not billed. Validation checks base64 decodability only — it does not inspect the decoded bytes' format, so all valid output formats (including AVIF and HEIC) are delivered normally.

It does not cover charges for auxiliary services that already ran before the response failed. Work performed by [web search](/docs/guides/features/plugins/web-search) (e.g. per-request search fees), file parsing / PDF OCR, and web fetch may still be billed based on the work actually performed, even when the model's response subsequently ends in an error. (In some failure cases, for example an upstream failure that produces no tokens at all, these charges are skipped as well.) When billed, these charges appear in the request's usage breakdown.

## Viewing Protected Requests

On your activity page, requests that were protected by zero completion insurance will show zero credits deducted for token usage. This applies even in cases where OpenRouter may have been charged by the provider for prompt processing. If a protected request also used auxiliary services such as web search or file parsing, only those service charges are deducted.
