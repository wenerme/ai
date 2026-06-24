# Results and state

When you run an agent, the result is more than just the final answer. It's also the handoff boundary, the next-turn continuation surface, and the resumable snapshot when a run pauses for review.

## Choose the result surface you need

Most applications only need a small set of result properties:

| If you need                                          | Use                                                                                 |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| The final answer to show the user                    | |
| Local replay-ready history                           | |
| The specialist that should usually own the next turn | |
| OpenAI-managed response chaining                     | |
| Pending approvals and a resumable snapshot           | `interruptions` plus |

Those are the guide-level surfaces to learn first. Richer run items, raw model responses, and detailed diagnostics still belong in the SDK docs and reference material.

## What to carry into the next turn

Use the result in a way that matches your continuation strategy:

- If your application owns full local history, reuse .
- If you are using a session, keep passing the same session and let the SDK load and persist history for you.
- If you are using server-managed continuation, pass only the new user input and reuse the stored ID instead of replaying the full transcript.
- After handoffs, reuse when that specialist should stay in control for the next turn.

## Interrupted runs return state, not a final answer

Approval flows are the main case where a result is intentionally incomplete.

- can
  stay empty because the run hasn't actually finished.
- `interruptions` tells you which pending tool calls need a decision.
- is the saved
  snapshot you pass back into the runtime after approving or rejecting those
  items.

That same state surface is what you serialize when a review might happen later rather than in the same request.

## Richer item and diagnostics surfaces

The SDK also exposes richer run items and diagnostics for applications that need more than the high-level surfaces above. That includes item-level tool and handoff records, raw model responses, guardrail results, and usage details.

Those are useful for audits, custom interfaces, and deep debugging, but they don't need to be the first thing most developers learn on this site.

## Next steps

Once you know which result surfaces matter, continue with the guide that explains how those surfaces get produced or inspected.

<div class="not-prose mt-4 grid gap-3">
  <a
    href="/api/docs/guides/agents/running-agents"
    class="block no-underline hover:no-underline"
  >
    

<span slot="icon">
        </span>
      Connect result handling back to the runtime loop and continuation
      strategy.


  </a>
  <a
    href="/api/docs/guides/agents/guardrails-approvals"
    class="block no-underline hover:no-underline"
  >
    

<span slot="icon">
        </span>
      See how paused runs return interruptions and resumable state.


  </a>
  <a
    href="/api/docs/guides/agents/integrations-observability"
    class="block no-underline hover:no-underline"
  >
    

<span slot="icon">
        </span>
      Use traces when you need to inspect the richer workflow record.


  </a>
</div>