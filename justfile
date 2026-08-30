import? 'local.just'

# Update skills table in README.md
update-readme:
    bun scripts/update-readme.ts

# Update skills from external repositories
update-skills *names:
    bun scripts/update-skills.ts {{names}}

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

# Fetch Google Cloud Gemini Enterprise Agent Platform docs manually.
# Google Cloud can return broad 429s for this docs tree, so keep it out of `just update`.
update-gemini-enterprise-agent-platform-docs:
    bun scripts/fetch-gemini-enterprise-agent-platform-docs.ts

# Fetch Alibaba Cloud CLI docs from help.aliyun.com
update-aliyun-cli-docs:
    bun scripts/fetch-aliyun-cli-docs.ts

# Sync Ant Design zh-CN docs from local ant-design/ant-design clone
update-ant-design-docs:
    bun scripts/sync-ant-design-docs.ts

# Sync Bun docs from local oven-sh/bun clone
update-bun-docs:
    bun scripts/sync-bun-docs.ts

# Fetch Grafana plugin docs from grafana.com llms-full.txt
update-grafana-plugin-docs:
    bun scripts/fetch-grafana-plugin-docs.ts

# Sync Grafana docs from local grafana/grafana clone
update-grafana-docs:
    bun scripts/sync-grafana-docs.ts

# Sync Doris docs from local apache/doris-website clone
update-doris-docs:
    bun scripts/sync-doris-docs.ts

# Test and sync DuckDB current docs from local duckdb/duckdb-web clone
test-duckdb-docs:
    bun test scripts/sync-duckdb-docs.test.ts

update-duckdb-docs: test-duckdb-docs
    bun scripts/sync-duckdb-docs.ts
    set -e; for skill_dir in skills/duckdb-docs skills/duckdb-clients skills/duckdb-extensions skills/duckdb-data skills/duckdb-dev skills/duckdb-quack skills/duckdb-sql skills/duckdb-ops; do gitleaks dir "$skill_dir" --redact --exit-code 1; done

# Test and sync official Argo CD MkDocs documentation from local argoproj/argo-cd clone
test-argocd-docs:
    bun test scripts/sync-argocd-docs.test.ts

update-argocd-docs: test-argocd-docs
    bun scripts/sync-argocd-docs.ts
    gitleaks dir skills/argocd-docs --redact --exit-code 1
    gitleaks dir scripts/sync-argocd-docs.ts --redact --exit-code 1
    gitleaks dir scripts/sync-argocd-docs.test.ts --redact --exit-code 1

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

# Sync Ultralytics docs from local ultralytics/ultralytics clone
update-ultralytics-docs:
    bun scripts/sync-ultralytics-docs.ts

# Sync PyTorch docs from local pytorch/pytorch clone
update-pytorch-docs:
    bun scripts/sync-pytorch-docs.ts

# Sync Hono docs from local honojs/website clone
update-hono-docs:
    bun scripts/sync-hono-docs.ts

# Sync Hugging Face Hub docs from local huggingface/hub-docs clone
update-huggingface-docs:
    bun scripts/sync-huggingface-docs.ts

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

# Sync NATS docs from local nats-io/nats.docs clone
update-nats-docs:
    bun scripts/sync-nats-docs.ts

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

# Sync Waku docs from local wakujs/waku clone
update-waku-docs:
    bun scripts/sync-waku-docs.ts

# Test Storybook MDX cleanup and snippet-reference validation
test-storybook-docs:
    bun test scripts/sync-storybook-docs.test.ts

# Sync Storybook docs and reusable snippets from local storybookjs/storybook clone
update-storybook-docs: test-storybook-docs
    bun scripts/sync-storybook-docs.ts
    gitleaks dir skills/storybook-docs --redact

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

# Test Stash Nextra source extraction and safety guards
test-stash-docs:
    bun test scripts/fetch-stash-docs.test.ts

# Fetch Stash docs from the Nextra source payload on stash.wiki
update-stash-docs: test-stash-docs
    bun scripts/fetch-stash-docs.ts

# Test Linear llms.txt parsing, content cleanup, and safety guards
test-linear-docs:
    bun test scripts/fetch-linear-docs.test.ts

# Fetch Linear product/developer docs and GraphQL schema from linear.app/llms.txt
update-linear-docs: test-linear-docs
    bun scripts/fetch-linear-docs.ts

# Sync justfile (just) docs from local casey/just clone
update-justfile-docs:
    bun scripts/sync-justfile-docs.ts

# Sync K3s docs from local k3s-io/docs clone
update-k3s-docs:
    bun scripts/sync-k3s-docs.ts

# Sync glab CLI docs from local gitlab-org/cli clone
update-glab-docs:
    bun scripts/sync-glab-docs.ts

# Sync GitLab product docs from local gitlab-org/gitlab clone
update-gitlab-docs:
    bun scripts/sync-gitlab-docs.ts

# Sync terraform-docs CLI docs from local terraform-docs/terraform-docs clone
update-terraform-docs:
    bun scripts/sync-terraform-docs.ts

# Sync PowerDNS Authoritative Server docs from local PowerDNS/pdns clone
update-powerdns-docs:
    bun scripts/sync-powerdns-docs.ts

# Sync tea CLI docs from local gitea/tea clone
update-tea-cli-docs:
    bun scripts/sync-tea-cli-docs.ts

# Sync Immich docs from local immich-app/immich clone
update-immich-docs:
    bun scripts/sync-immich-docs.ts

# Sync Zellij docs from local zellij-org/zellij-org.github.io clone
update-zellij-docs:
    bun scripts/sync-zellij-docs.ts

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
    -just update-ant-design-docs
    -just update-bun-docs
    -just update-grafana-docs
    -just update-grafana-plugin-docs
    -just update-doris-docs
    -just update-duckdb-docs
    -just update-argocd-docs
    -just update-clickhouse-docs
    -just update-gemini-cli-docs
    -just update-opencode-docs
    -just update-llamacpp-docs
    -just update-vllm-docs
    -just update-orpc-docs
    -just update-ultralytics-docs
    -just update-pytorch-docs
    -just update-powerdns-docs
    -just update-hono-docs
    -just update-huggingface-docs
    -just update-transformers-docs
    -just update-evalscope-docs
    -just update-swift-ms-docs
    -just update-mastra-docs
    -just update-llamafactory-docs
    -just update-nats-docs
    -just update-openobserve-docs
    -just update-slopus-happy-docs
    -just update-ghostty-docs
    -just update-mikroorm-docs
    -just update-gitea-docs
    -just update-threejs-docs
    -just update-comfyui-docs
    -just update-wails-docs
    -just update-waku-docs
    -just update-storybook-docs
    -just update-biome-docs
    -just update-vite-docs
    -just update-vitest-docs
    -just update-litellm-docs
    -just update-mihomo-docs
    -just update-stash-docs
    -just update-linear-docs
    -just update-k3s-docs
    -just update-justfile-docs
    -just update-immich-docs
    -just update-zellij-docs
    -just update-glab-docs
    -just update-gitlab-docs
    -just update-terraform-docs
    -just update-tea-cli-docs
    -just update-cloudflare-docs
    just update-readme

# Lint skills for best practices
lint-skills:
    bun scripts/lint-skills.ts

# Lint and auto-fix skills
fix-skills:
    bun scripts/lint-skills.ts --fix
