# Secure MCP Tunnel

Secure MCP Tunnel lets you connect private MCP servers to supported OpenAI products without opening inbound firewall ports or exposing those servers to the public internet. Run `tunnel-client` inside the network that can already reach your MCP server; it opens an outbound HTTPS path to OpenAI, pulls queued MCP work, forwards requests locally, and returns responses through the same tunnel.

## Use Secure MCP Tunnel when

- Your MCP server runs on a private network, on-premises, on a developer machine, or behind existing access controls.
- You want ChatGPT, Codex, the Responses API, or another supported OpenAI surface to use that server without making the MCP server public.
- Your network allows the host running `tunnel-client` to make outbound HTTPS requests to OpenAI.
- Start with the [MCP and Connectors guide](https://developers.openai.com/api/docs/guides/tools-connectors-mcp) for general MCP concepts.

## How it works

1. Create or manage an OpenAI-hosted MCP tunnel endpoint in Platform tunnel settings.
2. Run `tunnel-client` inside the network that can reach your private MCP server.
3. Configure `tunnel-client` with the tunnel identity and the private MCP server address.
4. OpenAI products send MCP requests to the OpenAI-hosted tunnel endpoint.
5. `tunnel-client` long-polls for queued work, forwards each `JSON-RPC` request to the private MCP server, and posts the response back through the tunnel.

The private MCP server does not need a public listener. The OpenAI-hosted endpoint gives supported products a normal MCP request path, while the network initiation point stays inside your boundary. When a connector asks for streamed results, the tunnel path can forward intermediate server-sent events.

<figure className="not-prose my-8">
  <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-400">
    OpenAI products call the OpenAI-hosted tunnel endpoint; `tunnel-client`
    long-polls for queued work and returns the MCP response through the same
    tunnel.
  </figcaption>
</figure>

## Before you start

You need:

- A `tunnel_id` from [Platform tunnel settings](https://platform.openai.com/settings/organization/tunnels).
- A runtime API key for `tunnel-client`. The key principal needs Tunnels **Read** + **Use** for the target tunnel.
- A tunnel manager with Tunnels **Read** + **Manage** if you need to create or edit tunnel metadata.
- An MCP server that `tunnel-client` can reach over stdio or HTTP from inside your network.

## Set up tunnel-client

Open [Platform tunnel settings](https://platform.openai.com/settings/organization/tunnels), then download the latest public `tunnel-client` release from [openai/tunnel-client](https://github.com/openai/tunnel-client/releases/latest). Keep your runbook pointed at the latest-release URL instead of hard-coding a specific release URL.

For a local stdio MCP server, the shortest profile-based flow is:

```bash
export CONTROL_PLANE_API_KEY="sk-..."

tunnel-client init \
  --sample sample_mcp_stdio_local \
  --profile local-stdio \
  --tunnel-id tunnel_0123456789abcdef0123456789abcdef \
  --mcp-command "python /path/to/server.py"

tunnel-client doctor --profile local-stdio --explain
tunnel-client run --profile local-stdio
```

For an HTTP MCP server, use `--mcp-server-url https://mcp.internal.example.com/mcp` instead of `--mcp-command`.

Keep `tunnel-client run ...` healthy while you create or test the connector. Connector discovery and MCP tool calls depend on the running client.

## Connect from ChatGPT

Open [ChatGPT connector settings](https://chatgpt.com/#settings/Connectors), create a custom connector, and choose **Tunnel** under **Connection**. Select an available tunnel when ChatGPT lists it, or paste a valid `tunnel_id` if you already have one.

If the tunnel does not appear in ChatGPT, verify that the tunnel is associated with the target workspace and that the connector operator has Tunnels **Read** + **Use**.

## Security and networking

<figure className="not-prose my-8">
  <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-400">
    The private MCP server stays inside the customer-controlled environment.
    `tunnel-client` reaches OpenAI over outbound HTTPS using the runtime API key
    and, when required, optional control-plane mTLS.
  </figcaption>
</figure>

- The MCP server address stays private and is used only from inside the environment where `tunnel-client` runs.
- `tunnel-client` authenticates to the OpenAI tunnel control plane; supported OpenAI products use the OpenAI-hosted tunnel endpoint.
- Tunnel access follows the existing organization and workspace context instead of introducing a separate public ingress path.
- `tunnel-client` supports enterprise networking requirements such as outbound proxies, custom CA bundles, control-plane client certificates, and MCP-side `mTLS`.
- The embedded Harpoon MCP server is limited to labeled, allowlisted HTTP callouts used by flows such as OAuth metadata handling. It is not a general-purpose outbound proxy.

## Troubleshooting

- **Tunnel not visible in ChatGPT:** Check the tunnel workspace scope and the connector operator's Tunnels **Use** permission.
- **Connector discovery or tool calls fail:** Confirm that `tunnel-client run ...` is still running, then re-run `tunnel-client doctor --profile <name> --explain`.
- **You can inspect a tunnel but cannot edit it:** The operator likely has Tunnels **Read** but not Tunnels **Manage**.
- `tunnel-client` exposes `/healthz`, `/readyz`, `/metrics`, and a local admin UI at `/ui`.
- Use those surfaces to confirm that the client is healthy, ready, and polling before testing from ChatGPT, Codex, or an API flow.
- If the client is not connected, requests through the tunnel fail until `tunnel-client` reconnects.
- Raw HTTP logging is disabled by default, and support exports are redacted.

## OAuth

- OAuth discovery can travel through the tunnel path so the MCP server itself can remain private.
- The tunnel preserves the upstream authorization server metadata needed for browser-facing OAuth flows.
- The authorization server itself is not automatically tunneled. If it is unreachable from the public internet and from the `tunnel-client` host, the OAuth flow can still fail even when the MCP server is reachable.

## Where to configure it

- Manage OpenAI-hosted MCP tunnel endpoints in [Platform tunnel settings](https://platform.openai.com/settings/organization/tunnels).
- Use a tunnel when creating a connector from [ChatGPT connector settings](https://chatgpt.com/#settings/Connectors).
- For Codex or API flows, use the tunnel-backed MCP target exposed by the supported product surface.

## Next steps

- Create or manage the tunnel in [Platform tunnel settings](https://platform.openai.com/settings/organization/tunnels).
- Validate your `tunnel-client` profile with `tunnel-client doctor --profile <profile> --explain`.
- Connect the tunnel from [ChatGPT connector settings](https://chatgpt.com/#settings/Connectors) or the supported OpenAI surface you are using.

<div class="not-prose my-8 grid gap-4 lg:grid-cols-2">
  <figure>
    <a href="https://platform.openai.com/settings/organization/tunnels">
      <img src="https://developers.openai.com/images/platform/guides/secure-mcp-tunnels/platform-tunnels-settings.png"
        alt="Sanitized OpenAI Platform tunnel settings screenshot."
        loading="lazy"
        class="w-full rounded-md border border-gray-200 dark:border-gray-800"
      />
    </a>
    <figcaption class="mt-3 text-sm text-gray-600 dark:text-gray-400">
      Create and manage OpenAI-hosted MCP tunnel endpoints from Platform tunnel
      settings.
    </figcaption>
  </figure>
  <figure>
    <a href="https://chatgpt.com/#settings/Connectors">
      <img src="https://developers.openai.com/images/platform/guides/secure-mcp-tunnels/chatgpt-connectors-tunnel.png"
        alt="Sanitized ChatGPT connector settings screenshot with Tunnel selected."
        loading="lazy"
        class="w-full rounded-md border border-gray-200 dark:border-gray-800"
      />
    </a>
    <figcaption class="mt-3 text-sm text-gray-600 dark:text-gray-400">
      Select Tunnel when connecting a ChatGPT connector to a private MCP server.
    </figcaption>
  </figure>
</div>