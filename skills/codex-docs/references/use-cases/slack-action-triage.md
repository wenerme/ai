---
name: Prioritize Slack action items
tagline: Turn Slack threads and DMs into a ranked queue of next steps.
summary: Use Codex with Slack and the tools where work happens to find direct
  asks, implicit follow-ups, resolved items, and the highest-impact next actions
  before drafting replies or handoffs.
skills:
  - token: slack
    url: https://github.com/openai/plugins/tree/main/plugins/slack
    description: Search DMs, channels, thread replies, mentions, and shared context
      before deciding what still needs attention.
  - token: gmail
    url: https://github.com/openai/plugins/tree/main/plugins/gmail
    description: Cross-check email when a Slack thread refers to an outreach, intro,
      or sent follow-up.
  - token: google-drive
    url: https://github.com/openai/plugins/tree/main/plugins/google-drive
    description: Read linked docs, decks, sheets, or source material when the Slack
      thread depends on an artifact.
  - token: google-calendar
    url: https://github.com/openai/plugins/tree/main/plugins/google-calendar
    description: Check event timing when a thread depends on a meeting, launch,
      webinar, or deadline.
bestFor:
  - People who get work through Slack and need Codex to separate live asks from
    already-handled chatter.
  - Launch, community, support, product, and operations workstreams where
    context is split across DMs, channels, and threads.
  - Teams that want a ranked action queue before drafting replies, handoffs,
    docs changes, or follow-up tasks.
starterPrompt:
  title: Find What Needs Attention in Slack
  body: >-
    Can you check @slack for messages to me about [workstream] from [time
    window] and return a ranked action queue?


    Look across DMs, group DMs, channel mentions, and threads.


    For each item, include:

    - source link or thread

    - what is being asked

    - whether it needs my reply, a person or lead, a docs or code change, or
    just a decision

    - why it matters

    - the recommended next step


    Before calling anything unresolved, read the latest thread replies and skip
    items that were already handled.


    Do not post messages directly but suggest drafts for my review.
  suggestedEffort: low
relatedLinks:
  - label: Codex plugins
    url: /codex/plugins
  - label: Use Codex in Slack
    url: /codex/integrations/slack
  - label: Codex automations
    url: /codex/app/automations
---

## Find the work hidden in Slack

Slack is often where a request starts, but not where the full context lives. A teammate might ask for a reply in a DM, clarify the real action in a thread, link a doc in a channel, and resolve the issue later without mentioning you again.

Use this workflow when you want Codex to read the Slack context, check whether the ask is still live, and return the few items that actually need your attention. The goal is to get a ranked action queue: what needs a reply, a decision, a person to contact, a doc update, or a handoff.

## Run the triage pass



1. Give Codex a time window, workstream, person, channel, or topic.
2. Ask it to search DMs, group DMs, channel mentions, and relevant thread replies.
3. Have Codex read the latest thread tail before calling an item unresolved.
4. Ask for a ranked queue sorted by urgency and impact.
5. Ask Codex to draft the reply, handoff, or follow-up task.



After trying this and tweaking the flow to match your needs, you can turn it into a [thread automation](https://developers.openai.com/codex/app/automations#thread-automations) by asking Codex to do the same thing on a schedule.

## Ask for the right output

A useful triage result should explain why each item is still live. It should also skip old asks that someone answered later in the thread.

You should expect to see something like this:



<p>
    <strong>Top action item:</strong> Priya is asking for concrete customer
    examples, not just more ideas.
  </p>
  <p>
    <strong>Why it matters:</strong> the launch update needs real people the
    team can contact this week.
  </p>
  <p>
    <strong>Evidence:</strong> the original channel message asked for use cases,
    but the thread later says "please DM me if you have leads."
  </p>
  <p>
    <strong>Next step:</strong> reply with two named leads, or say you can be
    the example if that is more useful.
  </p>



Good output makes the distinction explicit: an idea is different from a lead, a live ask is different from an FYI, and a request you already answered shouldn't stay in the queue.

If you get too much noise or too few actionable items, tweak the prompt and if needed, mention specific slack channels you want Codex to pay attention to.

## Draft the follow-up

Once the queue is right, keep the action in the same thread. Ask Codex to draft a reply or handoff from the evidence it already gathered: