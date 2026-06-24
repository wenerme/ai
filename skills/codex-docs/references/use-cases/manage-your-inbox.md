---
name: Manage your inbox
tagline: Have Codex find the emails that matter and write the replies in your voice.
summary: Use Codex with Gmail to find emails that need attention, draft
  responses in your voice, pull context from the tools where your work happens,
  and keep watching for new replies on a schedule.
skills:
  - token: gmail
    url: https://github.com/openai/plugins/tree/main/plugins/gmail
    description: Search and triage Gmail threads, read the surrounding conversation,
      create reply drafts, and organize messages when you explicitly ask.
  - token: slack
    url: https://github.com/openai/plugins/tree/main/plugins/slack
    description: Check team-message context when an email needs the latest decision,
      owner, asset, or blocker.
  - token: google-drive
    url: https://github.com/openai/plugins/tree/main/plugins/google-drive
    description: Read source docs, FAQs, notes, or approved writing examples that
      should shape the draft.
bestFor:
  - People who want Codex to find emails that need attention instead of manually
    sorting them.
  - Recurring inbox checks where Codex can create reviewable drafts in the
    background.
starterPrompt:
  title: Check Gmail and Draft Replies
  body: >-
    Can you check my @gmail, figure out what I need to respond to, and write
    drafts in my voice.


    Use my recent sent replies or @google-drive [writing examples] for tone.


    Use @slack, @google-drive, or other sources where my work happens when the
    email is missing the latest decision, owner, file, or blocker.
  suggestedEffort: low
relatedLinks:
  - label: Codex plugins
    url: /codex/plugins
  - label: Codex automations
    url: /codex/app/automations
---

## Review your inbox

Ask Codex to check Gmail, find the messages that deserve a reply, and write drafts in your voice. It can use recent sent mail or approved writing examples for style, then search Slack, docs, project notes, or other tools when the email lacks context on its own.

Use Codex for the first pass over your inbox: find the emails that need your attention, draft the replies, and bring in the work context that explains the bigger picture.



1. Ask Codex to review Gmail for emails that need your attention.
2. Ask it to use Slack, docs, or project notes for context that explains the bigger picture.
3. Tell Codex which drafts were useful and which emails it should ignore next time.
4. Add an automation when the thread is useful, and pin it if you want fast access later.



Use the Gmail plugin directly. You can give Codex a broad inbox request, a time window, or a label if you already know the scope. If tone matters, ask Codex to look at recent sent replies or a doc with examples before drafting.

Use the starter prompt on this page for the first inbox pass. Codex should return a short queue: drafts for emails that need attention, messages that can wait, and the context it used when the answer depended on more than the email thread.

## Let the thread learn your taste

Treat the first pass like calibration. If Codex drafts too many replies, tell it which emails were noise. If it misses something important, tell it why that thread mattered. If the tone is off, correct the draft directly.

Over time, the thread should get better at deciding what needs a draft and what can stay out of your way.

## Automate email triage on a schedule

You can create automations to run a scheduled check-in on the same thread. Codex wakes up, checks Gmail and the context sources you named, and posts only when there are emails that need your attention or drafts worth reviewing.

Once the drafts look useful, ask Codex to keep an eye on Gmail. Email triage is a good job to automate: the drafts are reviewable, and you still decide what gets sent.

Use this with Codex [automations](https://developers.openai.com/codex/app/automations) after the thread has a good sense of your reply patterns. If Codex finds an email that needs a decision it cannot make, it should flag the question instead of guessing.

## Organize your inbox

The Gmail plugin can also help organize your inbox. Keep that as a separate command after you trust the triage.

For deletion, make the instruction explicit and narrow. Drafting replies is safe to automate for review; destructive cleanup should stay deliberate.