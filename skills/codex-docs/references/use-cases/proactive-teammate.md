---
name: Set up a teammate
tagline: Give Codex a durable view of your work so it can notice what changed.
summary: Connect the tools where work happens, teach one thread what matters,
  then add an automation so Codex can notice changed docs, buried asks, blocked
  handoffs, and decisions that need your judgment.
skills:
  - token: slack
    url: https://github.com/openai/plugins/tree/main/plugins/slack
    description: Find the Slack context around asks, owner changes, blockers, and decisions.
  - token: gmail
    url: https://github.com/openai/plugins/tree/main/plugins/gmail
    description: Find reply-worthy threads and cross-check them against the rest of
      the workstream.
  - token: google-calendar
    url: https://github.com/openai/plugins/tree/main/plugins/google-calendar
    description: Use the day's meetings to decide which updates matter now and which
      can wait.
  - token: notion
    url: /codex/plugins
    description: Read the project notes, trackers, or decision logs that define the
      workstream.
bestFor:
  - Roles working with context across Slack, Gmail, calendar, docs, trackers,
    code, and notes
  - Understanding active work, recurring decisions, collaborators, and cutting
    through noise
  - Teams that need to escalate what deserves attention
starterPrompt:
  title: Check What Needs Attention
  body: >-
    Can you check @slack, @gmail, @google-calendar, and @notion and tell me what
    needs my attention?


    Look for anything important or surprising that I might miss.
  suggestedEffort: low
relatedLinks:
  - label: Codex automations
    url: /codex/app/automations
  - label: Codex plugins
    url: /codex/plugins
techStack:
  - need: Sources to check
    goodDefault: Slack for active asks, Gmail for pending replies, Google Calendar
      for timing, and Notion or docs for project state. Add GitHub, Linear,
      MCPs, or local notes when they are where the work happens.
    why: The stronger the view, the easier it is for Codex to understand the bigger
      picture and find signal across sources.
---

## Use Codex as a teammate

Codex gets more useful when it can see the places where your work happens: Slack, Gmail, calendar, project trackers, docs, code, and local notes. Together, those sources show what you work on, who you work with, and which asks or decisions can get buried during the day.

With that view, one Codex thread can become a proactive teammate. It learns what you care about as you use it, then an automation sends Codex back through the same sources and returns the signal worth interrupting you for.

## Start a teammate thread



1. Connect the plugins or MCPs for the tools where your work happens.
2. Start a new Codex thread and ask it to check those sources.
3. Tell Codex which items were useful and which were noise.
4. Add an automation to the thread, then pin the thread and watch for notifications.
5. Operate from the same thread: ask questions, get drafts, and tell Codex what action to take next.



## Run one useful check

Start with the tools that already hold your work context. For one person, that might be Gmail, Slack, calendar, Notion, GitHub, Linear, and a local notes folder. Ask Codex to check those sources and tell you what needs attention.

Use the starter prompt on this page for the first check. You can keep it general or make it specific to a workstream, account, launch, team, or project.

A useful Codex response can look like this:



<p>
    <strong>One thing changed.</strong>
  </p>
  <p>
    The renewal prep now says the customer needs security export wording before
    the partner note goes out. The partner update still frames the work as broad
    reporting automation.
  </p>
  <p>
    The useful move is to keep Lina's note narrow: say the export helps audit
    prep, link the renewal prep, and leave the broader automation claim out
    until Owen signs off.
  </p>
  <p>
    <strong>Priority:</strong> update the partner line before sending the review
    packet.
  </p>



Useful output names the trigger, shows the source, explains the implication, and recommends the next move. When you correct the thread, Codex learns more about how you operate: which sources matter, which owners already have the work, how direct drafts should sound, and what is worth bringing back.

## Turn the thread into an automation

Once the thread becomes useful, ask Codex to keep watching in that same thread. An automation is a scheduled check-in that sends Codex back through the sources you named, then posts a new message if it finds signal worth your attention. It can run hourly, every weekday morning, or at another specific time.

This is the right shape for Codex [automations](https://developers.openai.com/codex/app/automations): test the prompt in a normal thread first, then add an automation to that thread. Because Codex can compact long conversations, the same thread can keep improving with your corrections instead of starting over each morning.

## Operate from the same thread

The teammate becomes more valuable after the alert. Operate as if Codex were your coworker: ask questions in the same thread, then have it turn the signal into a reply, handoff note, or decision brief.

Codex can watch, explain, and draft. You still approve external actions.