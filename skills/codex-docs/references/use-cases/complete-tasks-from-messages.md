---
name: Complete tasks from messages
tagline: Turn iMessage threads into completed work across the apps involved.
summary: Use Computer Use to read one Messages thread, complete the task, and
  draft a reply.
bestFor:
  - Message threads that contain a concrete request, follow-up, or booking task
  - Work that needs a quick check across Messages plus a few related apps
starterPrompt:
  title: Finish One Task From a Message Thread
  body: >-
    @Computer Look at my messages from [person].


    Then:

    - understand the request

    - complete the task across the apps involved

    - draft a reply in the same thread


    Pause before anything irreversible, such as placing an order or confirming a
    booking.
relatedLinks:
  - label: Computer Use
    url: /codex/app/computer-use
  - label: Customize Codex
    url: /codex/concepts/customization
---

## Introduction

Many message threads contain hidden to-dos: book dinner, schedule a follow-up, research options, submit a receipt, or pull together information for a reply. Computer Use can help by reading the thread, identifying the task, and completing the work across the apps involved.

This is a good fit when the message contains a concrete request and you want Codex to handle the follow-through, not just summarize the thread.

## How to use

1. Install the [Computer Use plugin](https://developers.openai.com/codex/app/computer-use).
2. Ask Codex to review a specific message thread or sender.
3. Tell it what action to take and whether it should pause before completing anything.
4. Specify whether it should draft a reply in the original thread.

For example:

- `@Computer Look at my messages from [person]. Check my availability, find 2 dinner options in Hayes Valley, and draft a reply in the same thread. Check in with me before completing booking.`

## Practical tips

### Ask for a pause before irreversible actions

If the task might send money, submit an order, confirm a booking, or finalize a schedule, tell Codex to stop and ask before taking that last step.

### Make sure the supporting apps are ready

This works best when the related apps are already signed in and available. If the task depends on Maps, Calendar, Notes, a reservation site, or a browser session, prepare those ahead of time.

### Expect the thread to be marked as read

When Codex opens the thread in Messages, it will behave like a normal user viewing the conversation. Treat that as a read.

## Good follow-ups

This same pattern can work for other inbox-style surfaces too, such as Slack or email, when the work starts from a message and finishes somewhere else. If the workflow becomes common, add a reusable preference or instruction in [customization](https://developers.openai.com/codex/concepts/customization) so Codex handles those requests the same way every time.

### Suggested prompt

**Finish One Task From a Message Thread**