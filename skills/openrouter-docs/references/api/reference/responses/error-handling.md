> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Error Handling

This API is in **beta stage** and may have breaking changes. Use with caution in production environments.

This API is **stateless** - each request is independent and no conversation state is persisted between requests. You must include the full conversation history in each request.

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

| Code                             | Description                                                                                | Equivalent HTTP Status |
| -------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------- |
| `invalid_prompt`                 | Request or prompt validation failed (context length exceeded, invalid request fields)      | 400                    |
| `rate_limit_exceeded`            | Too many requests                                                                          | 429                    |
| `image_content_policy_violation` | Input or output flagged by a content filter                                                | 400                    |
| `server_error`                   | Internal server error, authentication failure, provider overloaded/unavailable, or timeout | 500+                   |

These codes are a reduced mapping of the [internal typed error codes](/docs/api/reference/errors#typed-error-codes). Multiple internal error types collapse into each Responses API code — for example, `context_length_exceeded` and `invalid_request` both surface as `invalid_prompt` here.