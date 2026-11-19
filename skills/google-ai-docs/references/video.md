> ## AI Agent Context
> - Full documentation index: https://aistudio.google.com/llms.txt
> - Gemini Docs MCP server (consistent live info): https://gemini-api-docs-mcp.dev
> - Coding agent skills & setup guide: https://aistudio.google.com/docs/coding-agents.md

# Video generation in the Gemini API

Use [Gemini Omni Flash](/docs/omni) (`gemini-omni-1.2-flash`) for clip-based
video generation and conversational video editing, or [Genie 4](/docs/genie)
(`models/genie-4`) for real-time interactive world generation in the Gemini API.

The Veo 3.1 Preview in the Gemini API has been shut down.

## Gemini Omni Flash  {% id="omni-flash" %}

Gemini Omni Flash (`gemini-omni-1.2-flash`) is a fast, multimodal model for
video generation and conversational video editing. It excels at turning text
prompts and reference images into 3 to 15 second videos with native audio, and
lets you refine or extend results across multiple turns using the Interactions
API.

[Get started with Gemini Omni Flash →](/docs/omni)

## Genie 4 (interactive worlds)  {% id="genie-4" %}

Genie 4 (`models/genie-4`) streams a real-time `24 fps` interactive `16:9` world
with synchronized `48 kHz` stereo audio over WebRTC and WebSockets on the
Interactions API. Seed a world from text, a `16:9` reference image, or both, and
steer movement and world events live with `WASD`, arrow keys, and mid-session
text prompts.

*   [Get started with Genie 4 →](/docs/genie)
*   [Genie 4 prompt and controls guide →](/docs/genie-prompting)

## Veo 3.1  {% id="veo" %}

{% callout type="warning" %}
   Veo 3.1 Preview (`veo-3.1-generate-preview`,
  `veo-3.1-fast-generate-preview`, and `veo-3.1-lite-generate-preview`) in the
  Gemini API was [shut down](/docs/deprecations) on **October 22, 2026**; migrate
  to [Gemini Omni Flash](/docs/omni) (`gemini-omni-1.2-flash`) or the GA models
  available through the
  [Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate)
  to avoid service interruptions. 

{% /callout %}

## Video understanding  {% id="understanding" %}

If you need to ingest and analyze existing video content rather than generate
new video, see the [Video understanding guide](/docs/video-understanding).

