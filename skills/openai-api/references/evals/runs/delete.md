## Delete

**delete** `/evals/{eval_id}/runs/{run_id}`

Delete an eval run.

### Path Parameters

- `eval_id: string`

- `run_id: string`

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
