# Parameter

Execute `evalscope perf --help` to get a full parameter description.

## Basic Settings

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `--model` | `str` | Name or path of the test model | - |
| `--url` | `str` | API address, supporting `/chat/completion` and `/completion` endpoints | - |
| `--name` | `str` | Name for wandb/swanlab database result and result database | `{model_name}_{current_time}` |
| `--api` | `str` | Service API type• `openai`: OpenAI-compatible API (requires `--url`)• `openai_embedding`: OpenAI-compatible Embedding API• `openai_rerank`: OpenAI/Cohere-compatible Rerank API• `local`: Start local transformers inference• `local_vllm`: Start local vLLM inference service• Custom: See [Custom API Guide](./custom.md#custom-api-requests) | - |
| `--port` | `int` | Port for local inference serviceOnly applicable to `local` and `local_vllm` | `8877` |
| `--attn-implementation` | `str` | Attention implementation methodOnly effective when `api=local` | `None`(Optional: `flash_attention_2`, `eager`, `sdpa`) |
| `--api-key` | `str` | API key | `None` |
| `--debug` | `bool` | Whether to output debug information | `False` |

## Network Configuration

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `--total-timeout` | `int` | Total timeout for each request (seconds) | `21600` (6 hours) |
| `--connect-timeout` | `int` | Network connection timeout (seconds) | `None` |
| `--read-timeout` | `int` | Network read timeout (seconds) | `None` |
| `--headers` | `str` | Additional HTTP headersFormat: `key1=value1 key2=value2`Will be used for each query | - |
| `--no-test-connection` | `bool` | Do not send connection test, start stress test directly | `False` |

## Request Control

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `--parallel` | `list[int]` | Number of concurrent requestsCan input multiple values separated by spaces | `1` |
| `--number` | `list[int]` | Total number of requests to be sentCan input multiple values (must correspond one-to-one with `parallel`) | `1000` |
| `--rate` | `float` | Request generation rate (requests/second)• `-1`: No rate limit; all requests are generated immediately and placed in the queue• `> 0`: Requests are generated following a Poisson arrival model — the inter-arrival interval follows an exponential distribution with mean `1/rate`, resulting in an **average** of `rate` requests per second | `-1` |
| `--log-every-n-query` | `int` | Log every N queries | `10` |
| `--stream` | `bool` | Whether to use SSE stream outputMust be enabled to measure TTFT (Time to First Token) metric | `True` |
| `--sleep-interval` | `int` | Sleep time between each performance test (seconds)Helps avoid overloading the server | `5` |

```{tip}
`--rate` and `--parallel` control two independent phases:

- **Generation phase** (controlled by `--rate`): Requests are generated and placed into a queue at the specified rate.
  - `rate=-1`: No rate limit; all requests are enqueued immediately.
  - `rate=R`: Inter-arrival intervals follow an exponential distribution with mean `1/R` seconds (Poisson arrival model), resulting in an average of `R` requests enqueued per second.
- **Sending phase** (controlled by `--parallel`): At most `parallel` requests are in-flight simultaneously (sent but not yet responded to); each worker fetches the next request from the queue only after receiving a response to the previous one.

The two parameters are independent: `--rate` determines how quickly requests enter the queue, while `--parallel` determines how many requests are actively being sent at any given time.
```
## SLA Settings

| Parameter | Type | Description | Default |
|------|------|------|--------|
| `--sla-auto-tune` | `bool` | Whether to enable SLA auto-tuning mode | `False` |
| `--sla-variable` | `str` | Variable for auto-tuningOptions: `parallel` (concurrency), `rate` (request rate) | `parallel` |
| `--sla-params` | `str` | SLA constraint conditionsJSON stringSupported metrics: `avg_latency`, `p99_latency`, `avg_ttft`, `p99_ttft`, `avg_tpot`, `p99_tpot`, `rps`, `tps`Supported operators: `<=`, `<`, `min` (for latency metrics); `>=`, `>`, `max` (for throughput metrics)Example: `'[{"p99_latency": "<=2"}]'` | `None` |
| `--sla-upper-bound` | `int` | Upper bound of the tuned SLA variable search range | `65536` |
| `--sla-lower-bound` | `int` | Lower bound of the tuned SLA variable search range | `1` |
| `--sla-fixed-parallel` | `int` | Fixed parallel workers used when `--sla-variable=rate`; defaults to `--sla-upper-bound` for backward compatibility | `None` |
| `--sla-num-runs` | `int` | Number of runs per concurrency level (average taken) | `3` |
| `--sla-number-multiplier` | `float` | Multiplier of total requests relative to the tuned variable (concurrency or rate), i.e. `number = round(variable × N)`; defaults to `2` when not set | `None` |
```{seealso}
For details on using the SLA auto-tuning feature, see the [Auto-tuning Guide](./sla_auto_tune.md).
```

## Prompt Settings

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `--max-prompt-length` | `int` | Maximum input prompt lengthPrompts exceeding this length will be discarded | `131072` |
| `--min-prompt-length` | `int` | Minimum input prompt lengthPrompts shorter than this will be discarded | `0` |
| `--prefix-length` | `int` | Length of the prompt prefixOnly effective for `random` dataset | `0` |
| `--prompt` | `str` | Specify request promptString or local file (specify via `@/path/to/file`)Higher priority than `dataset`Example: `@./prompt.txt` | - |
| `--query-template` | `str` | Specify query templateJSON string or local file (specify via `@/path/to/file`)Example: `@./query_template.json` | - |
| `--apply-chat-template` | `bool` | Whether to apply chat template | `None` (automatically determined based on URL suffix) |
| `--image-width` | `int` | Image width for random VL dataset | `224` |
| `--image-height` | `int` | Image height for random VL dataset | `224` |
| `--image-format` | `str` | Image format for random VL dataset | `RGB` |
| `--image-num` | `int` | Number of images for random VL dataset | `1` |
| `--image-patch-size` | `int` | Patch size for the imageOnly used for local image token calculation | `28` |

## Dataset Configuration

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `--dataset` | `str` | Dataset mode, see table below for details | - |
| `--dataset-path` | `str` | Dataset file pathUsed in conjunction with dataset | - |

### Dataset Mode Description

| Mode | Description | Supports dataset-path |
|------|-------------|----------------------|
| `openqa` | Automatically downloads [OpenQA](https://www.modelscope.cn/datasets/AI-ModelScope/HC3-Chinese/summary) from ModelScopePrompts are relatively short (usually <100 tokens)Uses `question` field from jsonl file when `dataset_path` is specified | ✓ |
| `longalpaca` | Automatically downloads [LongAlpaca-12k](https://www.modelscope.cn/datasets/AI-ModelScope/LongAlpaca-12k/dataPeview) from ModelScopePrompts are much longer (generally >6000 tokens)Uses `instruction` field from jsonl file when `dataset_path` is specified | ✓ |
| `line_by_line` | Each line in txt file is used as a separate prompt**Requires `dataset_path`** | ✓ (Required) |
| `flickr8k` | Automatically downloads [Flick8k](https://www.modelscope.cn/datasets/clip-benchmark/wds_flickr8k/dataPeview) from ModelScopeBuilds image-text inputs; large dataset suitable for evaluating multimodal models | ✗ |
| `kontext_bench` | Automatically downloads [Kontext-Bench](https://modelscope.cn/datasets/black-forest-labs/kontext-bench/dataPeview) from ModelScopeBuilds image-text inputs; approximately 1,000 samples, suitable for quick evaluation of multimodal models | ✗ |
| `random` | Randomly generates prompts based on `prefix-length`, `max-prompt-length`, and `min-prompt-length`**Requires `tokenizer-path`**[Usage example](./examples.md#using-the-random-dataset) | ✗ |
| `random_vl` | Randomly generates both image and text inputsBased on `random`, with additional image-related parameters[Usage example](./examples.md#using-the-random-multimodal-dataset) | ✗ |
| `embedding` | Load text data from file to evaluate Embedding modelSupports Line-by-line (TXT) or JSONL format (with `text` field) | ✓ (Required) |
| `random_embedding` | Randomly generate queries based on `max-prompt-length` and `min-prompt-length` to evaluate Embedding model**Must specify `tokenizer-path`** | ✗ |
| `embedding_batch` | Batch send text data to evaluate Embedding modelLoad data from fileSupports `--extra-args '{"batch_size": 8}'` to set batch size | ✓ (Required) |
| `random_embedding_batch` | Batch send randomly generated query data based on `max-prompt-length` and `min-prompt-length` to evaluate Embedding model**Must specify `tokenizer-path`**Supports `--extra-args '{"batch_size": 8}'` to set batch size | ✗ |
| `rerank` | Load Query-Document pairs from file to evaluate Rerank modelSupports JSONL format (with `query` and `documents` fields) | ✓ (Required) |
| `random_rerank` | Randomly generate query data based on `max-prompt-length` and `min-prompt-length` to evaluate Rerank model**Must specify `tokenizer-path`**Supports `--extra-args '{"num_documents": 10, "document_length_ratio": 5}'` to set number of documents and length ratio relative to query | ✗ |
| `custom` | Custom dataset parserSee [Custom Dataset Guide](custom.md#custom-dataset) | ✓ |

## Model Settings

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `--tokenizer-path` | `str` | Tokenizer weights pathUsed to calculate the number of tokens in input and outputUsually located in the same directory as model weights | `None` |
| `--frequency-penalty` | `float` | frequency_penalty value | - |
| `--logprobs` | `bool` | Whether to return logarithmic probabilities | - |
| `--max-tokens` | `int` | Maximum number of tokens that can be generated | - |
| `--min-tokens` | `int` | Minimum number of tokens to generateNote: Not all model services support this parameterFor `vLLM>=0.8.1`, you need to additionally set`--extra-args '{"ignore_eos": true}'` | - |
| `--n-choices` | `int` | Number of completion choices to generate | - |
| `--seed` | `int` | Random seed | `None` |
| `--stop` | `str` | Tokens that stop the generation | - |
| `--stop-token-ids` | `list[int]` | IDs of tokens that stop the generation | - |
| `--temperature` | `float` | Sampling temperature | `0` |
| `--top-p` | `float` | Top-p sampling | - |
| `--top-k` | `int` | Top-k sampling | - |
| `--extra-args` | `str` | Additional parameters to be passed in the request bodyJSON string formatExample: `'{"ignore_eos": true}'` | - |
| `--tokenize-prompt` | `bool` | Tokenize the prompt client-side into a token-ID list and send it directly via `/v1/completions`, bypassing server-side re-tokenization | `False` |

## Data Storage

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `--visualizer` | `str` | Visualizer to useOptions: `wandb`, `swanlab`, `clearml`If set, metrics will be saved to the specified visualizer | `None` |
| `--enable-progress-tracker` | `bool` | Whether to enable progress tracking, writing hierarchical stress-test progress to `progress.json` in real time, queryable via the service API | `False` |
| `--wandb-api-key` | `str` | wandb API key for logging metrics to wandb**Deprecated**, please use `--visualizer wandb` instead | - |
| `--swanlab-api-key` | `str` | swanlab API key for logging metrics to swanlab**Deprecated**, please use `--visualizer swanlab` instead | - |
| `--outputs-dir` | `str` | Output file path | `./outputs` |

## Other Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `--db-commit-interval` | `int` | Number of rows buffered before writing results to SQLite database | `1000` |
| `--queue-size-multiplier` | `int` | Maximum size of the request queueCalculated as: `parallel * multiplier` | `5` |
| `--in-flight-task-multiplier` | `int` | Maximum number of in-flight tasksCalculated as: `parallel * multiplier` | `2` |
