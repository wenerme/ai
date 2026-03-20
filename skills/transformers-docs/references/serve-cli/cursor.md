

# Cursor

[Cursor](https://cursor.com) is an AI-powered code editor that offers models like Sonnet, Gemini, and GPT. Enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) to serve local models (it's disabled by default for security).

```bash
transformers serve --enable-cors
```

Cursor requires a public address to reach your local server. Use [ngrok](https://ngrok.com/) to create a tunnel. Sign up, authenticate, and run this command.

```bash
ngrok http localhost:8000
```

<h3 align="center">
    
</h3>

Open Cursor and go to **Settings > Cursor Settings > Models > API Keys**.

1. Deselect all models in the list.
2. Add your desired model (Qwen/Qwen3-4B).
3. Enter any text in the **OpenAI API Key** field (required).
4. Paste the ngrok Forwarding address into **Override OpenAI Base URL**. Append `/v1` to the URL (https://...ngrok-free.app/v1).
5. Click **Verify**.

Your model is ready to use.

<h3 align="center">
    
</h3>