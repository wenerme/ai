> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Detected Secret Formats

> Full list of API key and credential formats detected by the Secrets guardrail preset

This page lists every format detected by the **Secrets** preset of the [Sensitive Info Guardrail](/docs/guides/features/guardrails/sensitive-info). The preset focuses on recognizable vendor prefixes and structures rather than generic high-entropy values.

## Detected Formats

Matched values are replaced with `[SECRET:<format-id>]` by default, such as
`[SECRET:github-token]`. Setting a custom label on the preset replaces the whole
label verbatim, without a format suffix.

| Format                                    | Recognizable Prefix / Structure                                                                               | Redaction Label                         |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| AWS access key ID                         | `AKIA`, `ASIA`, `ABIA`, `ACCA`, or `A3T` followed by an uppercase alphanumeric key body                       | `[SECRET:aws-access-key-id]`            |
| GitHub token                              | `ghp_`, `gho_`, `ghu_`, `ghs_`, or `ghr_` followed by a token body                                            | `[SECRET:github-token]`                 |
| GitHub fine-grained personal access token | `github_pat_` followed by a token body                                                                        | `[SECRET:github-fine-grained-pat]`      |
| GitLab personal access token              | `glpat-` followed by a token body                                                                             | `[SECRET:gitlab-personal-access-token]` |
| OpenAI API key                            | `sk-proj-`, `sk-svcacct-`, or `sk-admin-` with the `T3BlbkFJ` marker                                          | `[SECRET:openai-api-key]`               |
| OpenAI legacy API key                     | `sk-` with the `T3BlbkFJ` marker                                                                              | `[SECRET:openai-legacy-api-key]`        |
| Anthropic API key                         | `sk-ant-api03-` or `sk-ant-admin01-` followed by a token body ending in `AA`                                  | `[SECRET:anthropic-api-key]`            |
| OpenRouter API key                        | `sk-or-v1-` followed by 64 lowercase hexadecimal characters                                                   | `[SECRET:openrouter-api-key]`           |
| Google API key                            | `AIza` followed by the key body                                                                               | `[SECRET:google-api-key]`               |
| Google OAuth client secret                | `GOCSPX-` followed by the secret body                                                                         | `[SECRET:google-oauth-client-secret]`   |
| Stripe secret key                         | `sk_live_`, `sk_test_`, `rk_live_`, or `rk_test_` followed by a token body                                    | `[SECRET:stripe-secret-key]`            |
| Slack token                               | `xoxb-`, `xoxp-`, `xoxo-`, or `xoxs-` followed by a numeric segment and token body                            | `[SECRET:slack-token]`                  |
| Slack legacy workspace token              | `xoxa-` or `xoxr-`, optionally followed by a numeric segment                                                  | `[SECRET:slack-legacy-workspace-token]` |
| Slack app token                           | `xapp-` followed by app, workspace, and token segments                                                        | `[SECRET:slack-app-token]`              |
| Slack webhook URL                         | `https://hooks.slack.com/services/`, `/workflows/`, or `/triggers/` followed by the webhook body              | `[SECRET:slack-webhook-url]`            |
| npm access token                          | `npm_` followed by the token body                                                                             | `[SECRET:npm-access-token]`             |
| SendGrid API key                          | `SG.` followed by two dot-separated token segments                                                            | `[SECRET:sendgrid-api-key]`             |
| Hugging Face access token                 | `hf_` followed by the token body                                                                              | `[SECRET:huggingface-access-token]`     |
| Databricks API token                      | `dapi` followed by 32 lowercase hexadecimal characters, optionally with a numeric suffix                      | `[SECRET:databricks-api-token]`         |
| Atlassian API token                       | `ATATT3` followed by the token body                                                                           | `[SECRET:atlassian-api-token]`          |
| Doppler token                             | `dp.` followed by a supported token type such as `pt`, `st`, `ct`, `sa`, `scim`, or `audit`                   | `[SECRET:doppler-token]`                |
| Linear API key                            | `lin_api_` followed by the token body                                                                         | `[SECRET:linear-api-key]`               |
| Shopify access token                      | `shpat_`, `shpca_`, `shppa_`, or `shpss_` followed by 32 hexadecimal characters                               | `[SECRET:shopify-access-token]`         |
| Telegram bot token                        | 8–10 digits, a colon, `AA`, and the token body                                                                | `[SECRET:telegram-bot-token]`           |
| age secret key                            | `AGE-SECRET-KEY-1` followed by the fixed-length key body                                                      | `[SECRET:age-secret-key]`               |
| JSON Web Token                            | `eyJ... .eyJ... .<signature>` with three dot-separated JWT segments                                           | `[SECRET:json-web-token]`               |
| Bitcoin uncompressed WIF                  | Mainnet WIF beginning with `5H`, `5J`, or `5K`                                                                | `[SECRET:bitcoin-wif-uncompressed]`     |
| Bitcoin compressed WIF                    | Mainnet WIF beginning with `K` or `L`                                                                         | `[SECRET:bitcoin-wif-compressed]`       |
| Bitcoin extended private key              | `xprv`, `yprv`, `zprv`, `Yprv`, `Zprv`, `tprv`, `uprv`, `vprv`, or `U/Vprv` followed by the extended key body | `[SECRET:bitcoin-extended-private-key]` |
| Ethereum private key                      | `0x` followed by 64 hexadecimal characters                                                                    | `[SECRET:ethereum-private-key]`         |
| PEM private key block                     | `-----BEGIN ... PRIVATE KEY-----` through the corresponding `-----END ... PRIVATE KEY-----` delimiter         | `[SECRET:private-key-block]`            |
| PyPI upload token                         | `pypi-AgEIcHlwaS5vcmc` followed by the upload token body                                                      | `[SECRET:pypi-upload-token]`            |
| DigitalOcean token                        | `dop_v1_`, `doo_v1_`, `dor_v1_`, or `dos_v1_` followed by 64 lowercase hexadecimal characters                 | `[SECRET:digitalocean-token]`           |

## What Is Not Detected

The Secrets preset does not use entropy-only detection, bare unprefixed 32-character hexadecimal patterns, UUIDs, or generic hashes. Custom formats without a recognizable supported structure require a [custom pattern](/docs/guides/features/guardrails/sensitive-info#custom-patterns).

The Ethereum private-key format is a deliberate exception: `0x` plus 64 hexadecimal characters is detected as one known structure, even though the same shape can also represent a wallet address-related value, transaction hash, block hash, or storage slot. Bare unprefixed 64-character hexadecimal values remain excluded.

## Requesting New Formats

If a well-known credential format with a distinctive prefix is missing from this list, [contact us](https://openrouter.ai/support) or open a discussion. Formats with very low false-positive rates are the best candidates for inclusion.
