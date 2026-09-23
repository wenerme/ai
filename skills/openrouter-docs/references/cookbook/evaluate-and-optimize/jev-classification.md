> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Classify and Tag Text at Scale with Jev

> Run Jev text classification in batches with Choice for exclusive categories and one Noul per tag, pick thresholds from a labeled sample, and compute cost per 1,000 items from real usage.

You've got a whole pile of short texts to label, like support tickets, social posts, or product reviews. And you want to assign one category and any number of tags to every item in a single request to the [Jev model](https://openrouter.ai/typesafe/jev-1.13) through the Decisions API at OpenRouter, and run that request over the whole pile concurrently with backoff.

You could try to use a chat model for this labeling job, but chat model labeling means writing a prompt, parsing a block of free text, and paying for output tokens on every item. With Jev, a decision model rather than a generator, you don't need to parse or pay for output tokens at all. Just phrase each label as a question and it'll tell you how likely it thinks the answer is yes, as a probability from 0 to 1.

The following steps will help you build the question set up front, run the whole batch request within rate limits, pick a threshold per tag from a small human-labeled sample, and turn the Jev usage returned in the response into a budget. Here's a worked example on the public TweetTopic dataset: the captured run came out to \$0.014 across 550 tweets.

**Goal:** Define a `classifyPost` function that returns an exclusive `category`, its `confidence`, and a probability per tag for one item, then run it over a batch and choose thresholds and a budget from measured results.

**Outcome:** Your app labels items with a category and a set of tags at a threshold you chose from data, stays inside the provider's rate limits, and logs cost per 1,000 items from `usage.cost`.

<Tip>
  Prerequisites:

  * Your existing TypeScript app runs on Node.js or Bun as an ES module (step 3 uses top-level `await`), has `@types/node` or `@types/bun` for `process` and `fetch`, and keeps the items to classify in an array of strings named `posts`.
  * You've configured `OPENROUTER_API_KEY` and have `zod` 4 installed, since this page imports it directly.
  * You've read the [TypeSafe SDK guide](/docs/guides/community/typesafe-sdk) or the [Decisions API reference](/docs/api/api-reference/alphadecisions/submit-a-decisions-questions-and-answers-request) once, so the `state` and `questions` request shape is familiar.
  * Keep the [rate limits page](/docs/api_reference/limits) open for the status codes that step 3 retries.
</Tip>

## 1. Build the label set as Jev questions

The first thing to do after defining the label set is turn those labels into questions. Jev answers questions about the item you put in `state`. First is the single `choice` category question: categories that never overlap go into one `choice` question that picks exactly one from the list.

The rest are tags that may be present or absent. Each of those gets its own `noul` question that is answered with a probability between 0 and 1. The odds that one tag applies are judged independently of the others. Writing your labels this way lets one request return the category and full tag probabilities at once.

```typescript lines theme={null}
const JEV_MODEL = 'typesafe/jev-1.13';

const CATEGORIES = ['arts_and_culture', 'business', 'pop_culture', 'daily_life', 'sports_and_gaming', 'science_and_technology'] as const;
type Category = (typeof CATEGORIES)[number];

const TAGS = ['sports', 'news', 'film_tv', 'music', 'celebrity', 'gaming'] as const;
type Tag = (typeof TAGS)[number];

const TAG_INSTRUCTIONS: Record<Tag, string> = {
  sports: 'Is the post about sports, athletes, teams, matches, or sports leagues?',
  news: 'Is the post about news, politics, or a social concern?',
  film_tv: 'Is the post about a film, TV show, or video?',
  music: 'Is the post about music, musicians, songs, or albums?',
  celebrity: 'Is the post about a celebrity or pop culture?',
  gaming: 'Is the post about video games or esports?',
};

const questions = {
  category: {
    type: 'choice',
    instructions: 'Which single category best describes the post?',
    criteria: {
      arts_and_culture: 'Visual arts, literature, theatre, museums, or cultural events.',
      business: 'Business, entrepreneurship, finance, or careers.',
      pop_culture: 'Celebrities, film, TV, music, or entertainment news.',
      daily_life: 'Personal daily life, relationships, family, food, or everyday observations.',
      sports_and_gaming: 'Sports, athletes, teams, matches, video games, or esports.',
      science_and_technology: 'Science, technology, software, or research.',
    },
  },
  ...Object.fromEntries(TAGS.map((tag) => [tag, { type: 'noul', instructions: TAG_INSTRUCTIONS[tag] }])),
};
```

<Info>
  Write each `noul` instruction as a yes-or-no question about the item and put the category definitions in the `choice` question's `criteria` rather than in its instruction text. Jev reads the item from `state`, so the question refers to `the post` and never repeats the text. If your categories might not cover every item, add an `other` entry to both `CATEGORIES` and `criteria`, since a `choice` always picks one of the options you list and the step 2 schema accepts only values from `CATEGORIES`. The six TweetTopic categories above cover every item in that dataset, so the captured run omits it.
</Info>

## 2. Classify one item with one Decisions request

A per-item classification calls the Decisions endpoint, passes it the post and the questions, checks that its response looks right before trusting it, and returns the category, its confidence, the tag probabilities, and the usage figures. Rate limit, server error, or dropped connection throws a `RetryableError` so step 3 can back off and try again. Anything else throws a plain error so the item fails instead of repeating.

The [Decisions schema](/docs/api/api-reference/alphadecisions/submit-a-decisions-questions-and-answers-request) marks `confidence` and `usage.cost` as optional. Missing `confidence` stays `undefined`, and step 4 will route those items to review. If there's no `usage.cost`, then the response is rejected rather than being counted as free.

```typescript lines theme={null}
import { z } from 'zod';

const NoulAnswer = z.object({ type: z.literal('noul'), noul: z.number().min(0).max(1) });

const DecisionsResponse = z.object({
  model: z.string(),
  answers: z.object({
    category: z.object({
      type: z.literal('choice'),
      choice: z.enum(CATEGORIES),
      confidence: z.number().min(0).max(1).optional(),
    }),
    sports: NoulAnswer,
    news: NoulAnswer,
    film_tv: NoulAnswer,
    music: NoulAnswer,
    celebrity: NoulAnswer,
    gaming: NoulAnswer,
  }),
  usage: z.object({ input_tokens: z.number(), output_tokens: z.number(), cost: z.number() }),
});

type Classified = {
  category: Category;
  confidence: number | undefined;
  tags: Record<Tag, number>;
  usage: { input_tokens: number; output_tokens: number; cost: number };
};

const InFlightBudgetError = z.object({
  error: z.object({ metadata: z.object({ limit_source: z.literal('openrouter_in_flight_budget') }) }),
});

function isInFlightBudgetError(body: string): boolean {
  try {
    return InFlightBudgetError.safeParse(JSON.parse(body)).success;
  } catch {
    return false;
  }
}

class RetryableError extends Error {
  constructor(message: string, readonly retryAfterMs: number | undefined) {
    super(message);
  }
}

function transportFailure(error: unknown): never {
  throw new RetryableError(`Decisions request failed: ${error instanceof Error ? error.message : String(error)}`, undefined);
}

async function classifyPost(post: string): Promise<Classified> {
  const res = await fetch('https://openrouter.ai/api/alpha/decisions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: JEV_MODEL, state: { post }, questions }),
    signal: AbortSignal.timeout(60_000),
  }).catch(transportFailure);
  const body = await res.text().catch(transportFailure);
  if (!res.ok) {
    const retryAfterMs = Number(res.headers.get('Retry-After')) * 1_000;
    const transient = res.status === 429 || res.status >= 500 || (res.status === 402 && isInFlightBudgetError(body));
    if (!transient) throw new Error(`Decisions ${res.status}: ${body}`);
    throw new RetryableError(`Decisions ${res.status}: ${body}`, retryAfterMs > 0 && Number.isFinite(retryAfterMs) ? retryAfterMs : undefined);
  }
  const { answers, usage } = DecisionsResponse.parse(JSON.parse(body));
  return {
    category: answers.category.choice,
    confidence: answers.category.confidence,
    tags: Object.fromEntries(TAGS.map((tag) => [tag, answers[tag].noul])) as Record<Tag, number>,
    usage,
  };
}
```

<Warning>
  Every call to `classifyPost` is a paid request. At the time of writing, Jev on OpenRouter costs \$0.042 per million input tokens with no output-token charge, and the current price is on the [model page](https://openrouter.ai/typesafe/jev-1.13). One kind of `402` is transient: when your running requests fill the [in-flight spending budget](/docs/api_reference/limits#in-flight-spending-budget), the body includes `limit_source: "openrouter_in_flight_budget"` and the code retries after `Retry-After`. Any other `402` means your credits or key limit ran out, so the item fails and `runBatch` stops the batch.
</Warning>

## 3. Run the Jev batch concurrently within rate limits

Take a few thousand items and run them a single request at a time and you'll be waiting minutes. Obviously, you'll want to run your requests in parallel. You could start them all at once, but you'll get rate limited. `runBatch` solves this with a fixed number of workers that take items from the list one at a time.

`withRetry` detects transient errors from step 2 and waits a while so they can get resolved. All workers wait together, and they'll all resume at the same time when one request is told to slow down. On a terminal failure, other workers stop taking new items and `runBatch` rejects once all in-flight requests are done. Your results come back in the same order as your input list.

```typescript lines theme={null}
let pausedUntil = 0;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function withRetry<T>(fn: () => Promise<T>, attempts = 5): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    while (Date.now() < pausedUntil) {
      await sleep(Math.min(pausedUntil - Date.now(), 2_147_483_647));
    }
    try {
      return await fn();
    } catch (error) {
      if (!(error instanceof RetryableError) || attempt + 1 >= attempts) throw error;
      const backoff = error.retryAfterMs ?? Math.min(30_000, 1_000 * 2 ** attempt) + Math.random() * 1_000;
      pausedUntil = Math.max(pausedUntil, Date.now() + backoff);
    }
  }
}

async function runBatch<T, R>(items: T[], worker: (item: T) => Promise<R>, concurrency: number): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  let failure: { error: unknown } | undefined;
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (failure === undefined && next < items.length) {
        const index = next++;
        try {
          results[index] = await withRetry(() => worker(items[index]!));
        } catch (error) {
          failure ??= { error };
        }
      }
    }),
  );
  if (failure !== undefined) throw failure.error;
  return results;
}

const results = await runBatch(posts, classifyPost, 8);
```

`withRetry` understands a `Retry-After` header that comes back in the response. It will use the numeric value as the wait and ignore an HTTP-date value. Otherwise, it'll back off from 1 second with some jitter until it hits a 30-second cap.

Start with 8 workers, which is what the captured run used with no `429`s. Raise the worker count while a full batch completes with no `429`s, and halve it when retries show up in your logs.

## 4. Pick tag thresholds from a human-labeled sample

A `noul` probability only becomes a tag once it crosses a threshold, and the threshold level differs for each tag. Here's a procedure for learning appropriate thresholds for each tag. Label 100 to 200 representative items by hand, and use `runBatch` to classify them in the same order that you used when labeling them. Then compute precision and recall for the different tags at each of several candidate thresholds. Raising the threshold increases precision at the expense of recall. If you can afford to miss a few items that should have the tag, set the lowest threshold where you are satisfied with the precision. If you can't afford to miss the items, set the highest threshold whose recall you can accept.

```typescript lines theme={null}
type Labeled = { post: string; tags: Tag[]; category: Category };

const sample: Labeled[] = [
  { post: 'Sample text about a topic you labeled by hand', tags: ['music', 'celebrity'], category: 'pop_culture' },
];
const sampleResults = await runBatch(sample.map((item) => item.post), classifyPost, 8);

function precisionRecall(sample: Labeled[], results: Classified[], tag: Tag, threshold: number) {
  let tp = 0;
  let fp = 0;
  let fn = 0;
  sample.forEach((item, i) => {
    const predicted = results[i]!.tags[tag] >= threshold;
    const actual = item.tags.includes(tag);
    if (predicted && actual) tp++;
    else if (predicted && !actual) fp++;
    else if (!predicted && actual) fn++;
  });
  return {
    precision: tp + fp === 0 ? undefined : tp / (tp + fp),
    recall: tp + fn === 0 ? undefined : tp / (tp + fn),
    tp,
    fp,
    fn,
  };
}

const THRESHOLDS = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

function sweepThresholds(sample: Labeled[], results: Classified[]) {
  return Object.fromEntries(
    TAGS.map((tag) => [tag, THRESHOLDS.map((t) => ({ threshold: t, ...precisionRecall(sample, results, tag, t) }))]),
  );
}

const sweep = sweepThresholds(sample, sampleResults);
```

`precisionRecall` returns `undefined` instead of a score when a threshold predicts no positives or when the sample contains no positive examples for a tag. In that case you'll want to label more items rather than pick a threshold from an undefined score.

The `choice` answer needs no threshold since its `confidence` tells you which items to hand to a person. Group the sample by confidence band, compare the category with the human label in each band, and send to review anything below the band that meets your accuracy bar. Run this calibration once, separately from the production batch in step 3, since both are paid.

```typescript lines theme={null}
const BANDS = [
  { label: '<0.5', min: 0, max: 0.5 },
  { label: '0.5-0.8', min: 0.5, max: 0.8 },
  { label: '>=0.8', min: 0.8, max: Infinity },
];

function categoryAccuracyByBand(sample: Labeled[], results: Classified[]) {
  const inBand = (indices: number[], label: string) => ({
    band: label,
    n: indices.length,
    correct: indices.filter((i) => results[i]!.category === sample[i]!.category).length,
  });
  const all = sample.map((_, i) => i);
  const measured = BANDS.map((band) =>
    inBand(
      all.filter((i) => {
        const c = results[i]!.confidence;
        return c !== undefined && c >= band.min && c < band.max;
      }),
      band.label,
    ),
  );
  return [...measured, inBand(all.filter((i) => results[i]!.confidence === undefined), 'unknown')];
}

const bands = categoryAccuracyByBand(sample, sampleResults);
```

<Info>
  When a tag's precision stays low at every threshold, fix the question rather than the threshold. In the captured run, `celebrity` never passed 0.41 precision because its instruction, `Is the post about a celebrity or pop culture?`, overlaps with `music` and `film_tv`. Tighten the instruction or the criteria and re-run the sample before shipping that tag.
</Info>

## 5. Compute Jev cost per 1,000 items from returned usage

Budgeting a larger batch means summing up `usage.cost` for each result, and scaling to 1,000 items, all plain arithmetic on real numbers. And you keep the tokens per item next to the scaled cost so that you can predict the bill for more text of the same shape before actually running it.

```typescript lines theme={null}
function costPerThousand(results: Classified[]) {
  const cost = results.reduce((sum, r) => sum + r.usage.cost, 0);
  const inputTokens = results.reduce((sum, r) => sum + r.usage.input_tokens, 0);
  return {
    items: results.length,
    inputTokens,
    cost,
    perThousand: (cost / results.length) * 1_000,
    tokensPerItem: inputTokens / results.length,
  };
}
```

## Worked example

**Captured output.** The code above ran unchanged on 2026-09-21 against the `test_2021` split of [TweetTopic](https://huggingface.co/datasets/cardiffnlp/tweet_topic_multi), a public dataset of tweets with human-assigned topic labels (Antypas et al., COLING 2022). The six `TAGS` map to six of its nineteen multi-label topics, and `CATEGORIES` map to the six exclusive classes of its single-label companion set. Items 1 to 150 were the calibration sample and items 151 to 550 were the batch, with `concurrency` of 8. Usernames and URLs appear as `{@name@}`, `{{USERNAME}}`, and `{{URL}}` because the dataset masks them.

Below is one batch item with human labels (category `pop_culture`, tags `film_tv` and `music`) and with output reduced to the fields `classifyPost` returns.

```json lines theme={null}
{
  "post": "Cause I, I, I m in the stars tonight So watch me bring the fire and set the night alight~  I voted #Dynamite under #TheMusicVideo category at #PCAs 2020 {@BTS_twt@} ",
  "category": "pop_culture",
  "confidence": 1,
  "tags": { "sports": 0.02, "news": 0.11, "film_tv": 0.89, "music": 0.97, "celebrity": 0.99, "gaming": 0.02 },
  "usage": { "input_tokens": 621, "output_tokens": 179, "cost": 0.000026082 }
}
```

A threshold sweep was performed on the 150-item calibration sample, showing `precision/recall` at different thresholds, with true positives, false positives, and false negatives as `tp/fp/fn` in parentheses. `sports` was clean at any threshold. `music` traded 12 recall points for 26 precision points between threshold 0.5 and 0.8. `news` and `film_tv` could not reach high recall at any threshold with these instructions. `celebrity` could not reach high precision.

```text lines theme={null}
sports    0.5: 0.97/0.94 (63/2/4)   0.8: 0.98/0.94 (63/1/4)   0.9: 1.00/0.90 (60/0/7)
music     0.5: 0.68/1.00 (17/8/0)   0.8: 0.94/0.88 (15/1/2)   0.9: 0.93/0.82 (14/1/3)
film_tv   0.5: 0.68/0.58 (15/7/11)  0.8: 0.82/0.54 (14/3/12)  0.9: 0.85/0.42 (11/2/15)
news      0.5: 0.55/0.52 (16/13/15) 0.8: 0.86/0.39 (12/2/19)  0.9: 0.92/0.35 (11/1/20)
gaming    0.5: 0.50/0.56 (5/5/4)    0.8: 0.80/0.44 (4/1/5)    0.9: 0.80/0.44 (4/1/5)
celebrity 0.5: 0.24/0.94 (15/48/1)  0.8: 0.33/0.81 (13/26/3)  0.9: 0.41/0.75 (12/17/4)
```

The `choice` answer matched the human category on 127 of 150 calibration items. Confidence splits here are at 0.8 or above: 114 of 122 matched; at 0.5 to below 0.8: 9 of 18; below 0.5: 4 of 10. A review threshold of 0.8 on `confidence` would have sent the 28 items below it to a person. On the 400-item batch it got 350 of 400 correct.

The cost and timing from `costPerThousand` on that batch run are shown below. 400 requests took 8.6 seconds at 8 workers with no retries. The whole 550-item run cost \$0.0141.

```json lines theme={null}
{
  "items": 400,
  "inputTokens": 243962,
  "cost": 0.010246404,
  "perThousand": 0.02561601,
  "tokensPerItem": 609.905
}
```

The per-thousand matches list price: 609.9 input tokens per item, at \$0.042 per million tokens, would be \$0.0000256 per item, or \$0.0256 per 1,000 items. `output_tokens` were not billed. Longer items or more tags raise `tokensPerItem`, so measure on your own sample before quoting a budget.

## Check your work

The following are things to check about the behavior you've implemented.

* **Decisions response.** `answers.category.type` equals `'choice'` and `answers.category.choice` is one of the six `CATEGORIES`. Each tag key has `type` equal to `'noul'` and `noul` between 0 and 1. `usage.cost` is a number in USD and `usage.output_tokens` adds nothing to it.
* **Endpoint and model.** Requests reach `https://openrouter.ai/api/alpha/decisions` with `model` set to `typesafe/jev-1.13`, and the response `model` names a concrete Jev version.
* **Jev batch.** `runBatch` never has more than `concurrency` requests in flight, a `429`, `5xx`, or in-flight-budget `402` response pauses every worker and is retried with backoff, and a `400` or any other `402` fails the item without a retry.
* **Threshold tuning.** Raising a tag's threshold in `sweepThresholds` never raises its `tp` or `fp` counts, so recall falls or stays flat while fewer false positives pass.
* **Jev cost.** `costPerThousand(results).cost` equals the sum of `usage.cost` over the batch and `perThousand` equals that sum divided by the item count times 1,000.

## Next steps

Here are a few things you can try next:

* [Gate Tool Calls with Jev](/docs/cookbook/building-agents/gate-tool-calls-with-jev) to apply the same `noul` thresholds to agent actions
* [Cut LLM Cost with a Jev-Verified Cascade](/docs/cookbook/evaluate-and-optimize/jev-verified-cascade) to verify generated answers with a `choice` question
* [TypeSafe SDK guide](/docs/guides/community/typesafe-sdk) to call Jev through the TypeSafe JS or Python SDK instead of raw `fetch`
* [Decisions API reference](/docs/api/api-reference/alphadecisions/submit-a-decisions-questions-and-answers-request)
