import? 'local.just'

# Update skills table in README.md
update-readme:
    bun scripts/update-readme.ts

# Update skills from external repositories
update-skills:
    bun scripts/update-skills.ts

# Fetch Claude Code docs from code.claude.com + CHANGELOG
update-claude-code-docs:
    bun scripts/fetch-claude-code-docs.ts

# Fetch Anthropic platform docs (api, sdk, agent-sdk, docs)
update-anthropic-docs:
    bun scripts/fetch-anthropic-api-docs.ts

# Fetch OpenAI developer docs (api, sdk, docs)
update-openai-docs:
    bun scripts/fetch-openai-docs.ts

# Fetch OpenRouter docs
update-openrouter-docs:
    bun scripts/fetch-openrouter-docs.ts

# Fetch Google AI (Gemini) docs
update-google-ai-docs:
    bun scripts/fetch-google-ai-docs.ts

# Sync Bun docs from local oven-sh/bun clone
update-bun-docs:
    bun scripts/sync-bun-docs.ts

# Sync Grafana docs from local grafana/grafana clone
update-grafana-docs:
    bun scripts/sync-grafana-docs.ts

# Sync Doris docs from local apache/doris-website clone
update-doris-docs:
    bun scripts/sync-doris-docs.ts

# Sync ClickHouse docs from local ClickHouse/clickhouse-docs clone
update-clickhouse-docs:
    bun scripts/sync-clickhouse-docs.ts

# Sync Gemini CLI docs from local google-gemini/gemini-cli clone
update-gemini-cli-docs:
    bun scripts/sync-gemini-cli-docs.ts

# Sync OpenCode docs from local anomalyco/opencode clone
update-opencode-docs:
    bun scripts/sync-opencode-docs.ts

# Sync llama.cpp docs from local ggml-org/llama.cpp clone
update-llamacpp-docs:
    bun scripts/sync-llamacpp-docs.ts

# Sync vLLM docs from local vllm-project/vllm clone
update-vllm-docs:
    bun scripts/sync-vllm-docs.ts

# Sync oRPC docs from local unnoq/orpc clone
update-orpc-docs:
    bun scripts/sync-orpc-docs.ts

# Sync HuggingFace Transformers docs from local huggingface/transformers clone
update-transformers-docs:
    bun scripts/sync-transformers-docs.ts

# Sync EvalScope docs from local modelscope/evalscope clone
update-evalscope-docs:
    bun scripts/sync-evalscope-docs.ts

# Sync ms-swift docs from local modelscope/swift clone
update-swift-ms-docs:
    bun scripts/sync-swift-ms-docs.ts

# Sync Mastra docs from local mastra-ai/mastra clone
update-mastra-docs:
    bun scripts/sync-mastra-docs.ts

# Sync LlamaFactory docs from local hiyouga/LlamaFactory clone
update-llamafactory-docs:
    bun scripts/sync-llamafactory-docs.ts

# Sync OpenObserve docs from local openobserve/openobserve-docs clone
update-openobserve-docs:
    bun scripts/sync-openobserve-docs.ts

# Sync Happy Coder docs from local slopus/happy clone
update-slopus-happy-docs:
    bun scripts/sync-slopus-happy-docs.ts

# Sync Ghostty docs from local ghostty-org/website clone
update-ghostty-docs:
    bun scripts/sync-ghostty-docs.ts

# Sync MikroORM docs from local mikro-orm/mikro-orm clone
update-mikroorm-docs:
    bun scripts/sync-mikroorm-docs.ts

# Sync Gitea docs from local gitea/docs clone
update-gitea-docs:
    bun scripts/sync-gitea-docs.ts

# Sync Three.js API docs from local mrdoob/three.js clone
update-threejs-docs:
    bun scripts/sync-threejs-docs.ts

# Sync ComfyUI docs from local Comfy-Org/docs clone
update-comfyui-docs:
    bun scripts/sync-comfyui-docs.ts

# Sync Wails docs from local wailsapp/wails clone
update-wails-docs:
    bun scripts/sync-wails-docs.ts

# Sync Biome docs from local biomejs/website clone
update-biome-docs:
    bun scripts/sync-biome-docs.ts

# Sync Vite docs from local vitejs/vite clone
update-vite-docs:
    bun scripts/sync-vite-docs.ts

# Sync Vitest docs from local vitest-dev/vitest clone
update-vitest-docs:
    bun scripts/sync-vitest-docs.ts

# Sync LiteLLM docs from local BerriAI/litellm clone
update-litellm-docs:
    bun scripts/sync-litellm-docs.ts

# Sync mihomo docs from local MetaCubeX/Meta-Docs clone
update-mihomo-docs:
    bun scripts/sync-mihomo-docs.ts

# Sync justfile (just) docs from local casey/just clone
update-justfile-docs:
    bun scripts/sync-justfile-docs.ts

# Sync K3s docs from local k3s-io/docs clone
update-k3s-docs:
    bun scripts/sync-k3s-docs.ts

# Sync glab CLI docs from local gitlab-org/cli clone
update-glab-docs:
    bun scripts/sync-glab-docs.ts

# Sync tea CLI docs from local gitea/tea clone
update-tea-cli-docs:
    bun scripts/sync-tea-cli-docs.ts

# Sync Immich docs from local immich-app/immich clone
update-immich-docs:
    bun scripts/sync-immich-docs.ts

# Fetch Cloudflare developer docs from developers.cloudflare.com
update-cloudflare-docs:
    bun scripts/fetch-cloudflare-docs.ts

# Update all: external skills + all docs + README (tolerates individual failures)
update:
    -just update-skills
    -just update-claude-code-docs
    -just update-anthropic-docs
    -just update-openai-docs
    -just update-openrouter-docs
    -just update-google-ai-docs
    -just update-bun-docs
    -just update-grafana-docs
    -just update-doris-docs
    -just update-clickhouse-docs
    -just update-gemini-cli-docs
    -just update-opencode-docs
    -just update-llamacpp-docs
    -just update-vllm-docs
    -just update-orpc-docs
    -just update-transformers-docs
    -just update-evalscope-docs
    -just update-swift-ms-docs
    -just update-mastra-docs
    -just update-llamafactory-docs
    -just update-openobserve-docs
    -just update-slopus-happy-docs
    -just update-ghostty-docs
    -just update-mikroorm-docs
    -just update-gitea-docs
    -just update-threejs-docs
    -just update-comfyui-docs
    -just update-wails-docs
    -just update-biome-docs
    -just update-vite-docs
    -just update-vitest-docs
    -just update-litellm-docs
    -just update-mihomo-docs
    -just update-k3s-docs
    -just update-justfile-docs
    -just update-immich-docs
    -just update-glab-docs
    -just update-tea-cli-docs
    -just update-cloudflare-docs
    just update-readme

# Lint skills for best practices
lint-skills:
    bun scripts/lint-skills.ts

# Lint and auto-fix skills
fix-skills:
    bun scripts/lint-skills.ts --fix
