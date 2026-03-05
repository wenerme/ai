## Delete

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
