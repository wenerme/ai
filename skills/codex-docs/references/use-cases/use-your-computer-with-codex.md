---
name: Use your computer with Codex
tagline: Let Codex click, type, and navigate apps on your Mac.
summary: Use Computer Use to hand off multi-step tasks across Mac apps, windows,
  and files.
bestFor:
  - Tasks that move across apps, windows, browser sessions, or local files on
    your Mac
  - Work you want to hand off and let Codex continue in the background
starterPrompt:
  title: Hand Off One Computer Task
  body: >-
    @Computer [do the task you want completed across your Mac]


    For example:

    - Play some music to help me focus.

    - Help me add my interview notes from Notes to Ashby.

    - Look through my Messages app for the trip ideas Brooke sent me this week,
    add the best options to a new note called "Yosemite ideas", and draft a
    reply back to her.
relatedLinks:
  - label: Computer Use
    url: /codex/app/computer-use
  - label: Plugins
    url: /codex/plugins
  - label: Customize Codex
    url: /codex/concepts/customization
---

## Introduction

You can let Codex operate an app the same way you would: by clicking, seeing, and typing. [Computer Use](https://developers.openai.com/codex/app/computer-use) is useful when the task lives inside a normal app UI, even if that app does not have a dedicated plugin.

This works especially well for tasks that jump between apps or windows, such as collecting notes, updating a system of record, copying details from one place to another, or drafting a reply after checking context in a few different apps.

## How to use

1. Install the [Computer Use plugin](https://developers.openai.com/codex/app/computer-use).
2. Start your request with `@Computer`, or mention a specific app such as `@Slack` or `@Messages`.
3. Describe the task and the outcome you want.
4. Approve access when Codex needs it, then let it continue the task in the background.

If you mention a specific app and a plugin exists for that app, Codex may prefer the plugin over Computer Use. That is usually what you want. If no plugin exists, Codex can fall back to Computer Use and operate the app directly.

For example:

- `@Computer Play some music to help me focus.`
- `@Computer Help me add my interview notes from Notes to Ashby.`
- `@Computer Go through my Slack and add reminders for everything I need to do by end of day.`

## Practical tips

### Choose the browser Codex should use

Computer Use takes control of the app it is operating. If you want to keep working in one browser while Codex browses in another, tell it which browser to use. You can also set a default in [customization](https://developers.openai.com/codex/concepts/customization), for example: "When using Computer Use for web browsing tasks, default to Chrome instead of Safari."

### Avoid parallel runs in the same app

Do not run two Computer Use tasks against the same app at the same time. That makes it much harder for Codex to keep stable context about the current window and state.

### Stay signed in

For smoother runs, make sure you are already signed in to the apps and services you want Codex to use. If your Mac locks while Computer Use is running, the activity will stop.

## Good follow-ups

Once the task finishes, keep the same thread open if you want Codex to summarize what it changed, double-check the result, or turn the workflow into a more repeatable pattern through [customization](https://developers.openai.com/codex/concepts/customization).

## Suggested prompt

**Hand Off One Computer Task**