<Warning title="Beta API">
  This API is in **beta stage** and may have breaking changes. Use with caution in production environments.
</Warning>

<Info title="Stateless Only">
  This API is **stateless** - each request is independent and no conversation state is persisted between requests. You must include the full conversation history in each request.
</Info>

The Responses API Beta returns structured error responses that follow a consistent format.

## Error Response Format

All errors follow this structure:

```json
{
  "error": {
    "code": "invalid_prompt",
    "message": "Detailed error description"
  },
  "metadata": null
}
```

### Error Codes

The API uses the following error codes:

| Code                  | Description               | Equivalent HTTP Status |
| --------------------- | ------------------------- | ---------------------- |
| `invalid_prompt`      | Request validation failed | 400                    |
| `rate_limit_exceeded` | Too many requests         | 429                    |
| `server_error`        | Internal server error     | 500+                   |
