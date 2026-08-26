> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Data API

The Data API exposes the same datasets that power the public [rankings page](https://openrouter.ai/rankings) and [apps marketplace](https://openrouter.ai/apps) as JSON, so you can republish, analyse, or visualise them in your own tools.

All Data API endpoints are gated by any valid OpenRouter API key (the same key you use for inference) and share the same rate limits: 30 requests/minute per key, 500 requests/day per account.

## License and citation

Data returned by the Data API is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You may copy, redistribute, and build on it, including commercially, with attribution to OpenRouter.

The license covers the aggregated data these endpoints return. It does not cover per-user data, per-customer volumes, or anything not published through these endpoints.

Attribution satisfies CC BY 4.0 when you carry the citation line the endpoint specifies. `rankings-daily` and `app-rankings` each name one in their description, in this form:

```text theme={null}
Source: OpenRouter (openrouter.ai/rankings), as of <meta.as_of>.
```

Use the source URL named in that endpoint's own description and take the timestamp from `meta.as_of` in the response. For `session-cost`, which does not name one, cite:

```text theme={null}
Source: OpenRouter Data API (openrouter.ai/docs/cookbook/administration/data-api), as of <meta.as_of>.
```

Add `Licensed under CC BY 4.0.` to the citation when you republish the data itself rather than quoting a figure from it.

Figures may be restated as snapshots refresh, so record the `meta` block alongside any number you publish.

## Rankings Daily

The first endpoint, `/api/v1/datasets/rankings-daily`, returns the top 50 public models per day by total token usage, plus a single aggregated `other` row per day summing every model outside that top 50. Each real model row is keyed on `(date, model_permaslug)`. Numbers are token counts (`prompt_tokens + completion_tokens`), matching what is shown on the rankings page.

The endpoint is gated by any valid OpenRouter API key. The same key you use to call `/api/v1/chat/completions` works here.

### Endpoint

```lines theme={null}
GET /api/v1/datasets/rankings-daily?start_date={YYYY-MM-DD}&end_date={YYYY-MM-DD} HTTP/1.1
Host: openrouter.ai
Authorization: Bearer <YOUR_OPENROUTER_API_KEY>
```

The endpoint accepts only `GET` requests. There is no request body; pass the date window via query parameters.

### Headers

| Header          | Required | Value                                                                                                   |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `Authorization` | Yes      | `Bearer <YOUR_OPENROUTER_API_KEY>`. The same key you use to call `/api/v1/chat/completions` works here. |

Requests without a valid key receive `401 Unauthorized`.

### Query parameters

| Parameter    | Type               | Required | Default                           | Example      |
| ------------ | ------------------ | -------- | --------------------------------- | ------------ |
| `start_date` | `YYYY-MM-DD` (UTC) | No       | 30 days before `end_date`         | `2026-04-12` |
| `end_date`   | `YYYY-MM-DD` (UTC) | No       | The most recent completed UTC day | `2026-05-11` |

Rules:

* Both bounds are **inclusive**.
* Dates must be calendar-valid in UTC. Overflow strings like `2026-02-30` return `400 Bad Request` rather than silently rolling over.
* `start_date` must be on or before `end_date`.
* The maximum span between `start_date` and `end_date` is 366 days (one year + 1 leap day). Wider windows return `400 Bad Request`.
* The dataset begins on **2025-01-01**. A `start_date` earlier than that is silently clamped forward to `2025-01-01`, and the resolved value is echoed back in `meta.start_date`. An `end_date` earlier than `2025-01-01` returns `400 Bad Request`.

Omitting both parameters returns the most recent 30-day window. See the [Examples](#examples) section below for fully-formed requests in cURL, Python, and TypeScript.

### Rate limits

| Bucket      | Limit                |
| ----------- | -------------------- |
| Per API key | 30 requests / minute |
| Per account | 500 requests / day   |

The dataset updates live as traffic flows through OpenRouter (there is no daily refresh window), so a poll once per minute is more than enough to keep your view fresh. Exceeding either bucket returns `429 Too Many Requests`.

### Response shape

```json expandable lines theme={null}
{
  "data": [
    {
      "date": "2026-05-11",
      "model_permaslug": "openai/gpt-4o-2024-05-13",
      "total_tokens": "1234567890"
    },
    {
      "date": "2026-05-11",
      "model_permaslug": "anthropic/claude-3.5-sonnet-20241022",
      "total_tokens": "987654321"
    },
    {
      "date": "2026-05-11",
      "model_permaslug": "google/gemini-2.5-flash",
      "total_tokens": "456789012"
    },
    {
      "date": "2026-05-11",
      "model_permaslug": "other",
      "total_tokens": "123456789"
    }
  ],
  "meta": {
    "as_of": "2026-05-12T02:00:00.000Z",
    "version": "v1",
    "start_date": "2026-04-12",
    "end_date": "2026-05-11"
  }
}
```

Notes on the response:

* Up to 51 rows per day: the top 50 public models by total tokens, plus one aggregated `other` row covering every model outside that top 50. The `other` row is omitted on days where there are no models beyond the top 50.
* Models whose total tokens on a given day sum to zero are omitted from that day before ranking. This filters out transcription / image / embedding endpoints whose activity is measured in non-token units (audio seconds, image counts) and which would otherwise appear as `"0"` rows or waste rank slots.
* Rows are sorted by `date` ascending. Within each date, the top 50 are sorted by `total_tokens` descending (ties break alphabetically on `model_permaslug` so two models with identical totals always appear in the same order across requests), and the `other` row is pinned last (even when its total exceeds the top 50) so downstream charts can rely on it being the trailing series.
* `total_tokens` is returned as a **string** so 64-bit values are not truncated by JSON parsers that fall back to floats.
* `model_permaslug` matches the canonical permaslug used elsewhere in the OpenRouter API (e.g. `openai/gpt-4o-2024-05-13`). Non-default variants include a `:variant` suffix (e.g. `openai/gpt-4o-2024-05-13:free`) and are ranked as their own entry, matching the rankings page. The reserved value `other` denotes the aggregated long-tail row described above and is the only `model_permaslug` value that is not a real permaslug.
* `meta.as_of` is the wall-clock time the response was generated. The underlying dataset updates continuously as traffic flows through OpenRouter, so successive calls a few minutes apart can return different totals for the current (in-progress) day.
* Token counts for each row come from the upstream provider's own tokenizer. Anthropic counts are what Anthropic reports, OpenAI counts are what OpenAI reports, and so on. Tokenizers differ across providers, so a token in one row is *not* directly comparable to a token in another row from a different provider. The `other` row sums tokens across many providers and so should be treated as a coarse magnitude only.
* The response stays small, at most 51 rows per day × the requested window. The default 30-day window typically returns under 1,600 rows.

### Examples

<CodeGroup>
  ```bash title="cURL" lines theme={null}
  curl -G https://openrouter.ai/api/v1/datasets/rankings-daily \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    --data-urlencode "start_date=2026-04-01" \
    --data-urlencode "end_date=2026-04-30"
  ```

  ```python title="Python" lines theme={null}
  import os
  import requests

  resp = requests.get(
      "https://openrouter.ai/api/v1/datasets/rankings-daily",
      headers={"Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}"},
      params={"start_date": "2026-04-01", "end_date": "2026-04-30"},
      timeout=30,
  )
  resp.raise_for_status()
  payload = resp.json()
  print(payload["meta"]["as_of"], len(payload["data"]), "rows")
  ```

  ```typescript title="TypeScript" lines theme={null}
  const res = await fetch(
    "https://openrouter.ai/api/v1/datasets/rankings-daily?start_date=2026-04-01&end_date=2026-04-30",
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error(`Data API request failed: ${res.status}`);
  }
  const payload = (await res.json()) as {
    data: Array<{ date: string; model_permaslug: string; total_tokens: string }>;
    meta: { as_of: string; version: string; start_date: string; end_date: string };
  };
  console.log(payload.meta.as_of, payload.data.length, "rows");
  ```
</CodeGroup>

### Acceptable use and attribution

When you republish, quote, or visualise data from this endpoint, OpenRouter must be cited using the canonical citation string below. The `{as_of}` value comes from `meta.as_of` in the response.

> Source: OpenRouter (openrouter.ai/rankings), as of {as_of}.

A few practical notes:

* The dataset is intended for analysis, reporting, and visualisation. It is not intended to be re-served as a competing free API.
* The dataset only contains public traffic. Private models, private endpoints, and zero-data-retention traffic are excluded at the source.

## App Rankings

The `/api/v1/datasets/app-rankings` endpoint returns the top public apps on OpenRouter ranked by token usage, matching the public [apps marketplace](https://openrouter.ai/apps). Hidden and private apps are excluded, and traffic from related app aliases is merged into the canonical app.

### Endpoint

```
GET /api/v1/datasets/app-rankings?sort={popular|trending}&category={category}&limit={n}&offset={n} HTTP/1.1
Host: openrouter.ai
Authorization: Bearer <YOUR_OPENROUTER_API_KEY>
```

### Query parameters

| Parameter     | Type                  | Required | Default                       | Example      |
| ------------- | --------------------- | -------- | ----------------------------- | ------------ |
| `sort`        | `popular \| trending` | No       | `popular`                     | `trending`   |
| `category`    | string                | No       | (all categories)              | `coding`     |
| `subcategory` | string                | No       | (all subcategories)           | `cli-agent`  |
| `start_date`  | `YYYY-MM-DD` (UTC)    | No       | 30 days before `end_date`     | `2026-04-12` |
| `end_date`    | `YYYY-MM-DD` (UTC)    | No       | Most recent completed UTC day | `2026-05-11` |
| `limit`       | integer (1-100)       | No       | `50`                          | `10`         |
| `offset`      | integer (0-100)       | No       | `0`                           | `50`         |

Sort modes:

* **`popular`** ranks apps by total token volume (`prompt_tokens + completion_tokens`) inside the date window.
* **`trending`** ranks by absolute excess token growth: window volume minus the average volume of the three equal-length periods before it. Apps with no excess growth are omitted, so `trending` may return fewer than `limit` rows.

When both `category` and `subcategory` are supplied, the subcategory must belong to the category group; an inconsistent pair returns `400`.

Date window rules are the same as [Rankings Daily](#rankings-daily): the dataset begins at `2025-01-01`, max span is 366 days.

### Response shape

```json expandable lines theme={null}
{
  "data": [
    {
      "rank": 1,
      "app_id": 12345,
      "app_name": "Cline",
      "total_tokens": "12345678901",
      "total_requests": 4321
    },
    {
      "rank": 2,
      "app_id": 67890,
      "app_name": "Roo Code",
      "total_tokens": "9876543210",
      "total_requests": 2109
    }
  ],
  "meta": {
    "as_of": "2026-05-12T02:00:00.000Z",
    "version": "v1",
    "start_date": "2026-04-12",
    "end_date": "2026-05-11"
  }
}
```

Notes:

* `rank` is absolute: the first row at `offset=50` has `rank: 51`.
* `total_tokens` is a **string** for 64-bit safety, same as Rankings Daily.
* Token counts come from each upstream provider's tokenizer, so cross-app comparisons are approximate.

### Examples

<CodeGroup>
  ```bash title="cURL" lines theme={null}
  # Most popular coding apps
  curl -G https://openrouter.ai/api/v1/datasets/app-rankings \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    --data-urlencode "sort=popular" \
    --data-urlencode "category=coding" \
    --data-urlencode "limit=10"

  # Trending apps overall
  curl -G https://openrouter.ai/api/v1/datasets/app-rankings \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    --data-urlencode "sort=trending"
  ```

  ```python title="Python" lines theme={null}
  import os
  import requests

  resp = requests.get(
      "https://openrouter.ai/api/v1/datasets/app-rankings",
      headers={"Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}"},
      params={"sort": "popular", "category": "coding", "limit": 10},
      timeout=30,
  )
  resp.raise_for_status()
  for app in resp.json()["data"]:
      print(f"#{app['rank']} {app['app_name']} — {app['total_tokens']} tokens")
  ```

  ```typescript title="TypeScript" lines theme={null}
  const res = await fetch(
    "https://openrouter.ai/api/v1/datasets/app-rankings?sort=popular&category=coding&limit=10",
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    },
  );
  if (!res.ok) throw new Error(`App rankings request failed: ${res.status}`);

  const payload = (await res.json()) as {
    data: Array<{ rank: number; app_id: number; app_name: string; total_tokens: string; total_requests: number }>;
    meta: { as_of: string; version: string; start_date: string; end_date: string };
  };
  for (const app of payload.data) {
    console.log(`#${app.rank} ${app.app_name} — ${app.total_tokens} tokens`);
  }
  ```
</CodeGroup>

## Benchmarks

The `/api/v1/benchmarks` endpoint provides a unified interface to benchmark data from multiple sources. Filter by `source` to select a specific benchmark provider, or combine with `task_type` to find models suited for specific workloads (e.g. coding agents querying for the best coding models across all available benchmarks).

### Endpoint

```
GET /api/v1/benchmarks?source={source}&task_type={task_type}&max_results={n} HTTP/1.1
Host: openrouter.ai
Authorization: Bearer <YOUR_OPENROUTER_API_KEY>
```

### Query parameters

| Parameter            | Type                                                                                                                | Required | Default          | Example               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- | ---------------- | --------------------- |
| `source`             | `artificial-analysis \| design-arena \| openrouter`                                                                 | No       | (all sources)    | `artificial-analysis` |
| `task_type`          | `coding \| intelligence \| agentic \| search`                                                                       | No       | (all tasks)      | `coding`              |
| `arena`              | `models \| builders \| agents`                                                                                      | No       | `models`         | `models`              |
| `category`           | string                                                                                                              | No       | (all categories) | `codecategories`      |
| `benchmark_type`     | `gpqa_diamond \| tau_bench_verified_airline \| search_browsecomp \| search_hle \| search_dsqa \| search_widesearch` | No       | (all benchmarks) | `search_widesearch`   |
| `search_engine`      | string                                                                                                              | No       | (all engines)    | `exa`                 |
| `search_surface`     | `server-tool \| plugin`                                                                                             | No       | (all surfaces)   | `server-tool`         |
| `include_run_config` | boolean                                                                                                             | No       | `false`          | `true`                |
| `max_results`        | integer (1–100)                                                                                                     | No       | `50`             | `20`                  |

Notes:

* **`source`** determines the shape of items in the response. Each source has its own set of score fields.
* **`task_type`** filters cross-source. For Artificial Analysis it returns only models with a non-null score for that task. For Design Arena it maps to the corresponding category (e.g. `coding` → `codecategories`). `search` returns OpenRouter search benchmark results only.
* **`arena`** and **`category`** apply only when `source=design-arena`.
* **`benchmark_type`**, **`search_engine`**, and **`search_surface`** select among OpenRouter's own benchmarks (`source=openrouter`). `search_engine`, `search_surface`, and a `search_*` `benchmark_type` also narrow the response to search results only. A classic `benchmark_type` narrows the OpenRouter items and leaves items from other sources as they are.
* **`include_run_config`** affects search items only. When `true`, each search item includes a `run_config` object containing only `max_agent_turns`, `reasoning_effort`, and `temperature`; it defaults to `false`, and classic OpenRouter, Artificial Analysis, and Design Arena items are unchanged. Other harness settings are intentionally not published.

### Response shape (Artificial Analysis)

When `source=artificial-analysis`, each item carries composite index scores:

```json expandable lines theme={null}
{
  "data": [
    {
      "source": "artificial-analysis",
      "model_permaslug": "openai/gpt-4o",
      "display_name": "GPT-4o",
      "intelligence_index": 71.2,
      "coding_index": 65.8,
      "agentic_index": 58.3,
      "pricing": {
        "prompt": "0.0000025",
        "completion": "0.00001"
      }
    }
  ],
  "meta": {
    "as_of": "2026-06-03T12:00:00.000Z",
    "version": "v1",
    "source": "artificial-analysis",
    "source_url": "https://artificialanalysis.ai",
    "citation": "Source: Artificial Analysis (artificialanalysis.ai) via OpenRouter (openrouter.ai/rankings).",
    "model_count": 1,
    "task_type": null
  }
}
```

### Response shape (Design Arena)

When `source=design-arena`, each item carries ELO ratings from head-to-head battles:

```json expandable lines theme={null}
{
  "data": [
    {
      "source": "design-arena",
      "model_permaslug": "anthropic/claude-sonnet-4",
      "display_name": "Claude Sonnet 4",
      "arena": "models",
      "category": "codecategories",
      "elo": 1423,
      "win_rate": 72,
      "avg_generation_time_ms": 3200,
      "tournament_stats": {
        "first_place": 12,
        "second_place": 8,
        "third_place": 5,
        "fourth_place": 2,
        "total": 27
      },
      "pricing": {
        "prompt": "0.000003",
        "completion": "0.000015"
      }
    }
  ],
  "meta": {
    "as_of": "2026-06-03T12:00:00.000Z",
    "version": "v1",
    "source": "design-arena",
    "source_url": "https://www.designarena.ai",
    "citation": "Source: Design Arena (www.designarena.ai) via OpenRouter (openrouter.ai/rankings).",
    "model_count": 1,
    "task_type": null
  }
}
```

### Response shape (OpenRouter search benchmarks)

OpenRouter's own web-search benchmarks (`search_browsecomp`, `search_hle`, `search_dsqa`, `search_widesearch`) are published under `source=openrouter` alongside the classic GPQA and tau-bench items. Runs of the same evaluation configuration are combined by task-weighted mean, and each item is the model's highest-scoring configuration with at least 100 evaluated tasks for that benchmark, with the search engine and request surface it ran on. `primary_score` is the single published score, and its meaning is identified by `primary_metric`: WideSearch reports item-weighted F1 (`f1_by_item`), while the other search benchmarks report strict `accuracy`.

```json expandable lines theme={null}
{
  "data": [
    {
      "source": "openrouter",
      "model_permaslug": "openai/gpt-4o",
      "display_name": "GPT-4o",
      "benchmark_type": "search_widesearch",
      "primary_metric": "f1_by_item",
      "primary_score": 0.7199,
      "total_tasks": 100,
      "avg_cost_per_task": 0.031,
      "avg_latency_per_task_ms": 45210,
      "search_engine": "exa",
      "search_surface": "server-tool",
      "run_config": {
        "max_agent_turns": 25,
        "reasoning_effort": "high",
        "temperature": 0.2
      },
      "last_run_timestamp": "2026-07-28T13:38:18Z"
    }
  ],
  "meta": {
    "as_of": "2026-07-28T13:38:18Z",
    "version": "v1",
    "source": "openrouter",
    "source_url": "https://openrouter.ai/rankings",
    "citation": "Source: OpenRouter evals (openrouter.ai) via OpenRouter (openrouter.ai/rankings).",
    "model_count": 1,
    "task_type": "search"
  }
}
```

### Examples

<CodeGroup>
  ```bash title="cURL" lines theme={null}
  # Artificial Analysis — all models
  curl -G https://openrouter.ai/api/v1/benchmarks \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    --data-urlencode "source=artificial-analysis" \
    --data-urlencode "max_results=20"

  # Best coding models across Artificial Analysis
  curl -G https://openrouter.ai/api/v1/benchmarks \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    --data-urlencode "source=artificial-analysis" \
    --data-urlencode "task_type=coding"

  # Design Arena — models arena, all categories
  curl -G https://openrouter.ai/api/v1/benchmarks \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    --data-urlencode "source=design-arena" \
    --data-urlencode "arena=models"

  # OpenRouter search benchmarks — WideSearch, server-tool surface only
  curl -G https://openrouter.ai/api/v1/benchmarks \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    --data-urlencode "benchmark_type=search_widesearch" \
    --data-urlencode "search_surface=server-tool" \
    --data-urlencode "include_run_config=true"
  ```

  ```python title="Python" lines theme={null}
  import os
  import requests

  # Get top coding models from Artificial Analysis
  resp = requests.get(
      "https://openrouter.ai/api/v1/benchmarks",
      headers={"Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}"},
      params={"source": "artificial-analysis", "task_type": "coding", "max_results": 10},
      timeout=30,
  )
  resp.raise_for_status()
  for model in resp.json()["data"]:
      print(f"{model['display_name']}: coding={model['coding_index']}")
  ```

  ```typescript title="TypeScript" lines theme={null}
  const res = await fetch(
    "https://openrouter.ai/api/v1/benchmarks?source=artificial-analysis&task_type=coding&max_results=10",
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    },
  );
  if (!res.ok) throw new Error(`Benchmarks request failed: ${res.status}`);

  const payload = await res.json();
  for (const model of payload.data) {
    console.log(`${model.display_name}: coding=${model.coding_index}`);
  }
  ```
</CodeGroup>

## Task Classifications

The `/api/v1/classifications/task` endpoint returns the market-share breakdown of OpenRouter traffic by task classification (code generation, web search, summarization, and so on) over a trailing time window. Each classification reports its share of total requests and token volume as a fraction between 0 and 1.

The underlying data is sampled, so absolute volumes aren't exposed. What you get is the relative shape of traffic: which tasks account for the most usage and how they compare within their macro-category.

### Endpoint

```
GET /api/v1/classifications/task?window=7d HTTP/1.1
Host: openrouter.ai
Authorization: Bearer <YOUR_OPENROUTER_API_KEY>
```

### Query parameters

| Parameter | Type | Required | Default | Example |
| --------- | ---- | -------- | ------- | ------- |
| `window`  | `7d` | No       | `7d`    | `7d`    |

Only `7d` (trailing 7 days) is supported for now. Future windows (e.g. `1d`, `30d`) may be added.

### Response shape

```json expandable lines theme={null}
{
  "data": {
    "window_days": 7,
    "as_of": "2026-06-17",
    "classifications": [
      {
        "tag": "code:general_impl",
        "display_name": "Code Generation",
        "macro_category": "code",
        "usage_share": 0.23,
        "token_share": 0.31,
        "category_usage_share": 0.51,
        "category_token_share": 0.48,
        "models": [
          {
            "id": "openai/gpt-4.1-mini",
            "tag_usage_share": 0.55,
            "tag_token_share": 0.75
          },
          {
            "id": "anthropic/claude-sonnet-4",
            "tag_usage_share": 0.20,
            "tag_token_share": 0.12
          }
        ]
      },
      {
        "tag": "agent:web_search",
        "display_name": "Web Search",
        "macro_category": "agent",
        "usage_share": 0.15,
        "token_share": 0.12,
        "category_usage_share": 0.60,
        "category_token_share": 0.55,
        "models": [
          {
            "id": "anthropic/claude-sonnet-4",
            "tag_usage_share": 0.40,
            "tag_token_share": 0.50
          }
        ]
      }
    ],
    "macro_categories": [
      {
        "key": "code",
        "label": "Code",
        "usage_share": 0.45,
        "token_share": 0.52
      },
      {
        "key": "data",
        "label": "Data",
        "usage_share": 0.20,
        "token_share": 0.18
      },
      {
        "key": "agent",
        "label": "Agent",
        "usage_share": 0.25,
        "token_share": 0.22
      },
      {
        "key": "general",
        "label": "General",
        "usage_share": 0.10,
        "token_share": 0.08
      }
    ]
  }
}
```

Notes:

* `classifications` is sorted by `usage_share` descending.
* `usage_share` and `token_share` are fractions of total *classified* traffic. The unclassified `other` bucket is excluded from the denominator, so these shares sum to 1 across all classifications.
* `category_usage_share` and `category_token_share` are fractions *within* the classification's macro-category. They sum to 1 across all classifications that share the same `macro_category`.
* `models` lists the top models for this classification by request volume. Each entry reports the model's share of that classification's requests (`tag_usage_share`) and tokens (`tag_token_share`). Only the top-N models are included, so shares may sum to less than 1.
* `macro_categories` groups classifications into four buckets: Code, Data, Agent, and General. Each macro-category's shares sum to the corresponding total in `classifications`.
* `as_of` is the upper bound of the time window (yesterday in UTC). It marks the expected latest date in the snapshot but doesn't confirm data presence for that specific date.
* The response is cached for 60 seconds on the server side. A `Cache-Control: private, max-age=60, stale-while-revalidate=300` header is set on every response.

### Examples

<CodeGroup>
  ```bash title="cURL" lines theme={null}
  curl -G https://openrouter.ai/api/v1/classifications/task \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    --data-urlencode "window=7d"
  ```

  ```python title="Python" lines theme={null}
  import os
  import requests

  resp = requests.get(
      "https://openrouter.ai/api/v1/classifications/task",
      headers={"Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}"},
      params={"window": "7d"},
      timeout=30,
  )
  resp.raise_for_status()
  data = resp.json()["data"]

  for cls in data["classifications"][:5]:
      top_model = cls["models"][0]["id"] if cls["models"] else "n/a"
      print(f"{cls['display_name']}: {cls['usage_share']:.1%} of requests (top model: {top_model})")

  print()
  for cat in data["macro_categories"]:
      print(f"{cat['label']}: {cat['usage_share']:.1%} usage, {cat['token_share']:.1%} tokens")
  ```

  ```typescript title="TypeScript" expandable lines theme={null}
  const res = await fetch(
    "https://openrouter.ai/api/v1/classifications/task?window=7d",
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    },
  );
  if (!res.ok) throw new Error(`Classifications request failed: ${res.status}`);

  const { data } = (await res.json()) as {
    data: {
      window_days: number;
      as_of: string;
      classifications: Array<{
        tag: string;
        display_name: string;
        macro_category: string;
        usage_share: number;
        token_share: number;
        category_usage_share: number;
        category_token_share: number;
        models: Array<{
          id: string;
          tag_usage_share: number;
          tag_token_share: number;
        }>;
      }>;
      macro_categories: Array<{
        key: string;
        label: string;
        usage_share: number;
        token_share: number;
      }>;
    };
  };

  for (const cls of data.classifications.slice(0, 5)) {
    const topModel = cls.models[0]?.id ?? "n/a";
    console.log(`${cls.display_name}: ${(cls.usage_share * 100).toFixed(1)}% requests (top model: ${topModel})`);
  }
  ```
</CodeGroup>

### Acceptable use and attribution

When republishing or quoting data from this endpoint, cite as:

> Source: OpenRouter (openrouter.ai/rankings), as of {as_of}.

## Versioning

All Data API endpoint paths include a version (`/api/v1/...`) and every response includes `meta.version`. Backwards-incompatible changes (renamed/removed fields, changed semantics for an existing field) will only ship behind a new version. Additive changes (new optional fields) can land in `v1`.
