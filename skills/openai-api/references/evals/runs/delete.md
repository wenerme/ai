## Delete eval run

**delete** `/evals/{eval_id}/runs/{run_id}`

Delete an eval run.

### Path Parameters

- `eval_id: string`

  The ID of the evaluation to delete the run from.

- `run_id: string`

  The ID of the run to delete.

### Returns

- `deleted: optional boolean`

- `object: optional string`

- `run_id: optional string`

### Example

```http
curl https://api.openai.com/v1/evals/$EVAL_ID/runs/$RUN_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### 200 — Example

```json
{
  "deleted": true,
  "object": "eval.run.deleted",
  "run_id": "evalrun_677469f564d48190807532a852da3afb"
}
```

### Example

```http
curl https://api.openai.com/v1/evals/eval_123abc/runs/evalrun_abc456 \
  -X DELETE \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json"
```

#### Response example

```json
{
  "object": "eval.run.deleted",
  "deleted": true,
  "run_id": "evalrun_abc456"
}
```
