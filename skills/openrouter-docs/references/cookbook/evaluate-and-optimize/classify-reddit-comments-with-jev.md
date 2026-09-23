> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Classify Reddit and YouTube Comments with Jev and ScrapeCreators

> Classify Reddit and YouTube comments with Jev: fetch via the ScrapeCreators API, score relevance and sentiment, and route each to record, review, or ignore.

You already have a TypeScript app. Now it gets a comment triage pipeline. It pulls Reddit and YouTube comments about your topic from the ScrapeCreators API and asks Jev two questions per comment. Then the decision list says which comments to record, which need a human look, and which to ignore.

Brand monitoring, like user research, shares the same problem: thousands of comments mention your product, but not all of them are useful. Most are irrelevant. Just reading through them all doesn't scale. A general-purpose LLM could sort them. But it would return free text, which would need parsing, and no number, so you couldn't threshold on it. Jev, TypeSafe's System One model, returns typed judgments, a relevance probability 0 to 1, a choice of sentiment with a confidence score 0 to 1, and a per-request cost in dollars. That means code can branch on those numbers directly.

Jev is cheap enough you can run it on every comment: \$0.00057 for the captured run below, 27 comments, about \$0.021 per 1,000. Plus 2 ScrapeCreators credits for the two fetch requests.

<Tip>
  Prerequisites:

  * Your existing TypeScript app runs on Node.js or Bun as an ES module, so top-level `await` works.
  * You have `@openrouter/sdk` and `zod` installed, plus `@types/node` or `@types/bun` so `process.env` and `fetch` typecheck.
  * You've configured `OPENROUTER_API_KEY` and `SCRAPECREATORS_API_KEY`. ScrapeCreators accounts start with 100 free credits, so you can sign up at [scrapecreators.com](https://scrapecreators.com).
  * Keep the [Decisions API reference](/docs/api/api-reference/alphadecisions/submit-a-decisions-request) and the [ScrapeCreators API docs](https://docs.scrapecreators.com) open.
</Tip>

**Goal:** Define an async `triage` function that takes comments from ScrapeCreators and returns one decision per comment with `action: 'record' | 'review' | 'ignore'`, the reason, and Jev's raw judgment.

**Outcome:** Running `triage` on a batch of Reddit and YouTube comments prints a decision list grouped by action, along with the ScrapeCreators credits spent, the total Jev cost, and the Jev cost per 1,000 comments.

## 1. Fetch Reddit and YouTube comments with the ScrapeCreators API

The first thing that happens in the pipeline is pulling the comments in. Two small fetchers call ScrapeCreators, one to search Reddit and one to read the top comments on a YouTube video. Both map results into the same `Comment` shape so the rest of the pipeline never has to care which platform a comment came from. Each fetcher also keeps the credits its request cost so the final report can show them.

```typescript theme={null}
import { OpenRouter } from '@openrouter/sdk';
import { z } from 'zod';

const SCRAPECREATORS_BASE = 'https://api.scrapecreators.com';

type Comment = {
  source: 'reddit' | 'youtube';
  id: string;
  url: string;
  text: string;
  created_at: string;
};

const redditCommentSearch = z.object({
  success: z.literal(true),
  credits_charged: z.number(),
  comments: z.array(
    z.object({
      id: z.string(),
      body: z.string(),
      url: z.string(),
      created_at_iso: z.string(),
    }),
  ),
  after: z.string().optional(),
});

const youtubeComments = z.object({
  success: z.literal(true),
  credits_charged: z.number(),
  comments: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      publishedTime: z.string(),
    }),
  ),
  continuationToken: z.string().optional(),
});

async function scrape(path: string, params: Record<string, string>): Promise<unknown> {
  const url = new URL(path, SCRAPECREATORS_BASE);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  const res = await fetch(url, { headers: { 'x-api-key': process.env.SCRAPECREATORS_API_KEY ?? '' } });
  if (!res.ok) {
    throw new Error(`ScrapeCreators ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

type Fetched = { comments: Comment[]; credits: number };

async function fetchRedditComments(query: string): Promise<Fetched> {
  const page = redditCommentSearch.parse(
    await scrape('/v1/reddit/search', { query, filter: 'comments', sort: 'new', trim: 'true' }),
  );
  return {
    credits: page.credits_charged,
    comments: page.comments.map((c) => ({
      source: 'reddit',
      id: c.id,
      url: c.url,
      text: c.body,
      created_at: c.created_at_iso,
    })),
  };
}

async function fetchYouTubeComments(videoUrl: string): Promise<Fetched> {
  const page = youtubeComments.parse(
    await scrape('/v1/youtube/video/comments', { url: videoUrl, order: 'top' }),
  );
  return {
    credits: page.credits_charged,
    comments: page.comments.map((c) => ({
      source: 'youtube',
      id: c.id,
      url: videoUrl,
      text: c.content,
      created_at: c.publishedTime,
    })),
  };
}
```

<Info>
  Both responses are paginated. Reddit search returns an `after` cursor passed back as the `after` query parameter. YouTube comments returns a `continuationToken` passed back as `continuationToken`. Each page is one request, and the captured run was charged one credit per page. The snippet fetches the first page of each so the captured run stays small.
</Info>

## 2. Classify relevance and run sentiment analysis with Jev

So to get topic relevance and sentiment for each comment, we send it to Jev with two questions: how relevant is the comment to your topic, and what's the author feeling. Jev returns a probability for the first, and `negative`, `neutral`, or `positive` for the second. Further, the sentiment response includes a confidence value, so the next step can decide by number instead of parsed text. The function also returns the request cost, and throws when any of the answer parts are missing. A bad judgment will fail loud and fast instead of being quietly recorded. To reach the right endpoint, the client sets `serverURL` to `https://openrouter.ai`, because the Decisions API lives under `/api/alpha`, a different path prefix than the SDK's default `/api/v1`.

```typescript theme={null}
const openrouter = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY, serverURL: 'https://openrouter.ai' });

const TOPIC = 'OpenRouter, the API that routes requests to many LLM providers through one endpoint';

type Sentiment = 'negative' | 'neutral' | 'positive';

type Judgment = {
  relevant: number;
  sentiment: Sentiment;
  sentiment_confidence: number;
  cost: number;
};

function isSentiment(choice: string): choice is Sentiment {
  return choice === 'negative' || choice === 'neutral' || choice === 'positive';
}

async function judgeComment(comment: Comment): Promise<Judgment> {
  const response = await openrouter.alpha.decisions.create({
    decisionsRequest: {
      model: 'typesafe/jev-1.13',
      state: { topic: TOPIC, source: comment.source, comment: comment.text },
      questions: {
        relevant: {
          type: 'noul',
          instructions: '`comment` discusses `topic` itself: the product, its pricing, reliability, features, or the company behind it. A comment that only uses the product incidentally, or mentions a different product, is not relevant.',
        },
        sentiment: {
          type: 'choice',
          instructions: 'What is the attitude of `comment` toward `topic`?',
          criteria: {
            negative: 'The author complains about, criticizes, or warns others away from `topic`.',
            neutral: 'The author asks a question, states facts, or expresses no clear attitude toward `topic`.',
            positive: 'The author praises, recommends, or reports a good experience with `topic`.',
          },
        },
      },
    },
  });
  const relevant = response.answers.relevant;
  const sentiment = response.answers.sentiment;
  if (relevant?.type !== 'noul' || sentiment?.type !== 'choice' || !isSentiment(sentiment.choice)) {
    throw new Error(`Unexpected Decisions answers for ${comment.id}`);
  }
  if (sentiment.confidence === undefined || response.usage.cost === undefined) {
    throw new Error(`Decisions response for ${comment.id} is missing confidence or cost`);
  }
  return {
    relevant: relevant.noul,
    sentiment: sentiment.choice,
    sentiment_confidence: sentiment.confidence,
    cost: response.usage.cost,
  };
}
```

<Warning>
  Each `decisions.create` call is one paid request billed to your OpenRouter account at the [typesafe/jev-1.13](https://openrouter.ai/typesafe/jev-1.13) rate, and each ScrapeCreators request spends credits. The comment text you send to Jev is user-generated text from public platforms, so apply the same retention rules to it that you apply to any third-party text you log.
</Warning>

## 3. Set the human-review threshold and route each comment

The routing rule runs a series of tests on every judgment. If the relevance is at or below `0.2`, then the comment is ignored. If it's between `0.2` and `0.8`, then it's sent to a human for review because Jev isn't sure it's even on topic. If it's at or above `0.8`, then the comment is recorded automatically only if the sentiment confidence is at least `0.7`. If not, it goes to review too. Every decision also keeps the reason and the full judgment so a human reviewer can see why an item was queued.

```typescript theme={null}
const RELEVANT_AT = 0.8;
const IRRELEVANT_AT = 0.2;
const SENTIMENT_CONFIDENCE_AT = 0.7;

type Decision = {
  action: 'record' | 'review' | 'ignore';
  reason: string;
  comment: Comment;
  judgment: Judgment;
};

function decide(comment: Comment, judgment: Judgment): Decision {
  if (judgment.relevant <= IRRELEVANT_AT) {
    return { action: 'ignore', reason: `relevant=${judgment.relevant.toFixed(2)}`, comment, judgment };
  }
  if (judgment.relevant < RELEVANT_AT) {
    return { action: 'review', reason: `relevance unclear at ${judgment.relevant.toFixed(2)}`, comment, judgment };
  }
  if (judgment.sentiment_confidence < SENTIMENT_CONFIDENCE_AT) {
    return { action: 'review', reason: `sentiment ${judgment.sentiment} at confidence ${judgment.sentiment_confidence.toFixed(2)}`, comment, judgment };
  }
  return { action: 'record', reason: `${judgment.sentiment} at confidence ${judgment.sentiment_confidence.toFixed(2)}`, comment, judgment };
}
```

To tune the thresholds, start from the review queue. If reviewers agree with Jev's sentiment on nearly every item that landed in review for low confidence, lower `SENTIMENT_CONFIDENCE_AT` to `0.5`. If recorded comments turn out to be off topic, raise `RELEVANT_AT` to `0.9`. The `judgment` stays on every decision, so you can re-run `decide` with new thresholds against the stored judgments without paying for Jev again.

## 4. Produce the decision list

The last step runs the whole batch and prints the result. `triage` judges every comment in parallel and routes each one with the rule from step 3. After that the script prints one summary line with the number of comments in the batch, the ScrapeCreators credits spent to fetch them, the total Jev cost, and the Jev cost per 1,000 comments. Then the decisions follow, grouped by action. The empty-batch check makes a fetch that returns nothing fail plainly, instead of printing a meaningless cost per 1,000.

```typescript theme={null}
async function triage(comments: Comment[]): Promise<Decision[]> {
  const judgments = await Promise.all(comments.map((comment) => judgeComment(comment)));
  return comments.map((comment, i) => decide(comment, judgments[i]!));
}

const reddit = await fetchRedditComments('openrouter');
const youtube = await fetchYouTubeComments('https://www.youtube.com/watch?v=3nM_gAVnOBo');
const list = await triage([...reddit.comments, ...youtube.comments]);
if (list.length === 0) {
  throw new Error('No comments fetched, so there is nothing to triage');
}
const totalCost = list.reduce((sum, d) => sum + d.judgment.cost, 0);
console.log(JSON.stringify({ comments: list.length, scrapecreators_credits: reddit.credits + youtube.credits, jev_cost_usd: totalCost, per_1k_usd: (totalCost / list.length) * 1000 }, null, 2));
for (const action of ['record', 'review', 'ignore'] as const) {
  console.log(`\n== ${action} (${list.filter((d) => d.action === action).length})`);
  for (const d of list.filter((d) => d.action === action)) {
    console.log(JSON.stringify({ source: d.comment.source, url: d.comment.url, reason: d.reason, judgment: d.judgment, text: d.comment.text.slice(0, 160) }, null, 1));
  }
}
```

## Worked example

Captured output from running the code above on 2026-09-21 against the query `openrouter` (7 Reddit comments) and one YouTube video (20 top comments). The run cost \$0.00057 in Jev usage and 2 ScrapeCreators credits. Comment text is truncated to 160 characters by the script, and the summary line plus one item from each group are shown.

```text theme={null}
{
  "comments": 27,
  "scrapecreators_credits": 2,
  "jev_cost_usd": 0.0005671680000000002,
  "per_1k_usd": 0.021006222222222228
}

== record (5)
{
 "source": "reddit",
 "url": "https://www.reddit.com/r/StockMarket/comments/1wma7eg/deepseek_bets_big_on_huawei_chips_to_bypass_us/pb76b76/",
 "reason": "positive at confidence 1.00",
 "judgment": {
  "relevant": 0.89,
  "sentiment": "positive",
  "sentiment_confidence": 1,
  "cost": 0.000020496
 },
 "text": "Ya my company is moving away from claude code and towards Chinese models on openrouter. Much cheaper!"
}

== review (12)
{
 "source": "reddit",
 "url": "https://www.reddit.com/r/openrouter/comments/1wmixwf/what_are_the_best_tools_for_monitoring_usage/pb7gfzb/",
 "reason": "sentiment neutral at confidence 0.65",
 "judgment": {
  "relevant": 0.94,
  "sentiment": "neutral",
  "sentiment_confidence": 0.65,
  "cost": 0.000021672
 },
 "text": "yeah you don't need a custom function for this. edit the model under workspace > models and set the input and output price per 1M tokens from the openrouter mod"
}

== ignore (10)
{
 "source": "youtube",
 "url": "https://www.youtube.com/watch?v=3nM_gAVnOBo",
 "reason": "relevant=0.13",
 "judgment": {
  "relevant": 0.13,
  "sentiment": "positive",
  "sentiment_confidence": 0.88,
  "cost": 0.000020034
 },
 "text": "Agradeço penhoradamente ou só Show de bola"
}
```

The full list had 5 recorded, 12 in review, and 10 ignored. The review item above shows the threshold doing its job. The comment is clearly about OpenRouter at `0.94` relevance, but Jev split between `neutral` and `positive`, so the confidence of `0.65` sent it to a human instead of recording a guess. The ignored item is a thank-you note on the video with no reference to the product. Jev's numbers are not fully deterministic. For the 25 comments that appeared in two runs of this batch, per-request costs were identical, relevance shifted by up to `0.04` and sentiment confidence by up to `0.13`, so a comment sitting near a threshold can land in a different group on a rerun. Reddit search with `sort=new` can also return a different comment set between runs as new comments arrive.

## Check your work

* Each ScrapeCreators response parses with `success: true` and a numeric `credits_charged`. A wrong or missing `x-api-key` fails at `scrape` with a non-2xx status, not inside the Zod parse.
* Every Jev response has `answers.relevant.type === 'noul'` with `noul` between 0 and 1, and `answers.sentiment.type === 'choice'` with `choice` in `negative | neutral | positive` and a `confidence` between 0 and 1.
* A comment with `relevant <= 0.2` gets `action: 'ignore'` regardless of sentiment. A comment with `relevant >= 0.8` and `sentiment_confidence >= 0.7` gets `action: 'record'`. Everything else gets `action: 'review'` with a `reason` naming which threshold it missed.
* `response.usage.cost` is a number on every Jev response and the printed `per_1k_usd` equals the summed cost divided by the comment count times 1,000.
* Re-running `decide` on stored judgments with different thresholds changes the action split without any new Jev or ScrapeCreators requests.

## Next steps

* [Gate agent tool calls with Jev](/docs/cookbook/building-agents/gate-tool-calls-with-jev) to apply the same Noul-and-threshold pattern to actions instead of comments.
* [Cut LLM cost with a Jev-verified cascade](/docs/cookbook/evaluate-and-optimize/jev-verified-cascade) to use Choice confidence to decide when to escalate to a larger model.
* [TypeSafe SDK guide](/docs/guides/community/typesafe-sdk) to call Jev through the TypeSafe JavaScript or Python SDK instead of `@openrouter/sdk`.
* [Jev Lab](https://openrouter.ai/labs/jev) to try Jev's triage and extraction demos in the browser.
