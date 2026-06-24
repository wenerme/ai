## Delete an eval

`client.evals.delete(stringevalID, RequestOptionsoptions?): EvalDeleteResponse`

**delete** `/evals/{eval_id}`

Delete an evaluation.

### Parameters

- `evalID: string`

### Returns

- `EvalDeleteResponse`

  - `deleted: boolean`

  - `eval_id: string`

  - `object: string`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const _eval = await client.evals.delete('eval_id');

console.log(_eval.eval_id);
```

#### Response

```json
{
  "deleted": true,
  "eval_id": "eval_abc123",
  "object": "eval.deleted"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

const deleted = await openai.evals.delete("eval_abc123");
console.log(deleted);
```

#### Response

```json
{
  "object": "eval.deleted",
  "deleted": true,
  "eval_id": "eval_abc123"
}
```
