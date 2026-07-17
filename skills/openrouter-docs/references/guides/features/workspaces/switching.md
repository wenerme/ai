> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Switching Workspaces

> Change which workspace your Chat and Fusion requests run in.

When you belong to more than one workspace, you can choose which one your
[Chat](https://openrouter.ai/chat) and [Fusion](https://openrouter.ai/fusion)
requests run in. The **active workspace** determines which workspace's API
keys, routing defaults, guardrails, and budgets govern those requests.

<Note>
  The switcher only shows workspaces you're a member of. All organization
  members always have access to the **Default workspace**. To join another
  workspace, ask an organization admin to add you.
</Note>

<Warning>
  Switching workspaces while a chat response is still streaming will cancel that
  response. You'll be asked to confirm before the switch goes through. Fusion
  runs are unaffected — they keep streaming in the background and are saved to
  the workspace they started in.
</Warning>

## Switching Workspaces Within Chat/Fusion

The workspace switcher lives at the bottom of the Chat and Fusion sidebar. It
lists every workspace you're a member of, with a checkmark on the one that's
currently active.

<img src="https://mintcdn.com/openrouter-d02e98a0/3EtgYeq10y8ddo2x/assets/guides/features/workspaces/workspace-switcher.png?fit=max&auto=format&n=3EtgYeq10y8ddo2x&q=85&s=eb9039dc93992583c0e304b75ab59ae9" alt="Workspace switcher open in the Chat sidebar, listing the workspaces the member belongs to" width="3170" height="2438" data-path="assets/guides/features/workspaces/workspace-switcher.png" />

1. Open [Chat](https://openrouter.ai/chat) or [Fusion](https://openrouter.ai/fusion)
2. Click the workspace name at the bottom of the sidebar
3. Select the workspace you want to switch to

Your selection is remembered across sessions until you switch again.
