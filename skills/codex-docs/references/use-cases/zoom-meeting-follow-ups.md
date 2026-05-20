---
name: Turn meetings into follow-ups
tagline: Convert Zoom meeting insights into actions across your tools.
summary: Use Codex with Zoom transcripts and AI Companion summaries to draft
  customer follow-up emails, account plans, CRM updates, and team notifications
  for review.
skills:
  - token: zoom
    url: https://marketplace.zoom.us/apps/w7dWfj-UQ5ihAmKdi3fykg
    description: Read accessible Zoom meetings, recordings, transcripts, and AI
      Companion summaries after authentication and admin approval.
  - token: google-drive
    url: https://github.com/openai/plugins/tree/main/plugins/google-drive
    description: Create or draft account plans, meeting briefs, and other reviewable
      follow-up documents.
  - token: slack
    url: https://github.com/openai/plugins/tree/main/plugins/slack
    description: Draft team updates after the user reviews and approves the message.
bestFor:
  - Teams that want repeatable post-meeting execution without copying notes
    between tools.
  - Customer follow-ups after discovery, renewal, implementation, or executive
    sponsor calls.
  - Sales and customer success workflows that require updates across meeting
    notes, docs, CRM, and team messages.
starterPrompt:
  title: Create a Post-Meeting Follow-Up Package
  body: >-
    Use my most recent Zoom meeting with [customer or account].


    Retrieve the Zoom transcript and AI Companion summary. Name anything you
    cannot access before drafting.


    Summarize the key takeaways, decisions, risks, opportunities, and action
    items. Then draft:

    - a customer follow-up email

    - a Google Docs account plan

    - a CRM update with notes, risks, next steps, and owners

    - a Slack message to [team/channel/person] with the most important details


    Use evidence from the transcript where possible. Mark anything uncertain and
    keep internal-only details out of the customer draft.


    Do not send emails, post Slack messages, create docs, update CRM records,
    assign owners, or expose private data until I review and approve each
    action.
  suggestedEffort: low
relatedLinks:
  - label: Codex plugins
    url: /codex/plugins
  - label: Codex automations
    url: /codex/app/automations
---

## Introduction

Customer-facing teams spend real time after meetings turning conversations into action. One call can create a follow-up email, CRM notes, an account plan, risk updates, and internal handoffs, but those artifacts usually live across separate systems.

With Zoom meeting data and connected tools, Codex can retrieve the relevant transcript and AI Companion summary, extract structured insights, and prepare the downstream drafts needed to move work forward. You stay in the review loop before anything is posted, sent, assigned, or written to another system.

## Create the first follow-up package



1. Enable Zoom AI Companion meeting summaries, smart recordings, transcript generation, cloud recording, and audio transcripts.
2. Connect Zoom and the tools you want Codex to use, such as Google Docs, Slack, Gmail, or your CRM.
3. Ask Codex to find a meeting by customer, date, recurring series, or meeting title.
4. Review the generated summary, risks, actions, email draft, account plan, CRM notes, and Slack message.
5. Approve external actions only after validating the content.



Use the starter prompt on this page for the first pass. Codex should return a structured package with key takeaways, risks, opportunities, decisions, action items, a follow-up email draft, an account plan outline, a CRM update draft, and a Slack notification draft.

## Give Codex the right context

This workflow works best when Codex can read the meeting source material and knows where each follow-up should go.

Useful inputs include:

- The Zoom meeting recording, transcript, and AI Companion summary.
- Meeting metadata such as customer name, date, title, or recurring series.
- The destination tools, such as Google Docs, Slack, Gmail, or CRM records.
- Any rules for tone, privacy, account-plan structure, or internal handoff format.

Codex can then summarize the transcript, identify decisions and owner/date commitments, draft a customer-facing email, prepare an account plan, and write a team update. For recurring meetings, it can compare the latest transcript against prior calls and highlight what changed.

## Review before acting

Meeting follow-up can touch customer data, private notes, and systems of record. Use Codex to prepare drafts, cite transcript evidence, and stage updates before you approve the next step.

Before taking action, review:

- The audience or destination, such as the customer, Slack channel, CRM record, or document permissions.
- Customer commitments, owners, dates, risks, and uncertain claims.
- Which items should stay as drafts versus be sent, posted, shared, or saved.
- Whether confidential or internal-only details should be removed.

For recurring workflows, keep the pattern focused: draft, review, approve, then act.

## Follow up on the first draft

After the first package is ready, use the same thread to tune it for the audience or next workflow.

You can also ask Codex to compare this call with the last few weekly calls, turn action items into a mutual action plan, create a version for a sales engineer with only technical blockers, or draft CRM updates without saving them.

## Automate recurring meeting intelligence

For weekly account check-ins or deal reviews, pin the thread and ask Codex to create a [thread automation](https://developers.openai.com/codex/app/automations#thread-automations).

You don't necessarily want Codex to post automatically, but it can create drafts for your review that you can approve and post.