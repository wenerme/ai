## Delete eval run

`client.evals.runs.delete(stringrunID, RunDeleteParamsparams, RequestOptionsoptions?): RunDeleteResponse`

**delete** `/evals/{eval_id}/runs/{run_id}`

Delete an eval run.

### Parameters

- `runID: string`

- `params: RunDeleteParams`

  - `eval_id: string`

    The ID of the evaluation to delete the run from.

### Returns

- `RunDeleteResponse`

  - `deleted?: boolean`

  - `object?: string`

  - `run_id?: string`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const run = await client.evals.runs.delete('run_id', { eval_id: 'eval_id' });

console.log(run.run_id);
```

#### Response

```json
{
  "deleted": true,
  "object": "eval.run.deleted",
  "run_id": "evalrun_677469f564d48190807532a852da3afb"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const deleted = await openai.evals.runs.delete(
  "eval_123abc",
  "evalrun_abc456"
);
console.log(deleted);
```

#### Response

```json
{
  "object": "eval.run.deleted",
  "deleted": true,
  "run_id": "evalrun_abc456"
}
```
