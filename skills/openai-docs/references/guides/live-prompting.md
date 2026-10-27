# Prompting GPT-Live

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

`gpt-live-1` is a voice model for natural, continuous conversation. It can listen and speak at the same time, respond to interruptions, and keep the conversation moving while a backend agent handles reasoning, tools, and longer tasks.

Use `session.instructions` for the assistant’s role, speaking style, and when to ask the backend for help. Give the backend model or agent the procedures and tools for tasks such as looking up an order or changing a booking.

Describe the conversational behavior you want, and let GPT-Live choose the wording for ordinary replies. When migrating from Realtime, keep the rules your product needs for wording, interruptions, and the order of actions. Test the simpler prompt on representative conversations as you revise it.

Your application checks permissions and required confirmations before executing an action.

To adapt an existing Realtime prompt, follow [Split conversation and backend instructions](https://developers.openai.com/api/docs/guides/live-migration?migration-path=realtime#split-conversation-and-backend-instructions).

## Recommended prompt structure

Start with this template and add instructions as needed. See [session configuration](https://developers.openai.com/api/docs/guides/live-conversations#configuration-fields) for field limits.

Keep the template’s `Backchannel policy`, `Interruption policy`, and `Delegation policy` headings, and customize the text beneath them. Backchannels are brief listening sounds, such as “mm-hmm,” that the assistant can make while the caller continues speaking.

For `gpt-live-1`, use the instruction `Generate <|SpawnThinking|>` when the model should request backend work, rather than “delegate to the backend.”

```text
You are [name], a calm, friendly voice assistant for [service].
Speak warmly and naturally, at an unhurried pace. Be clear and direct, not overly cheerful.
If the user is frustrated, acknowledge it briefly and focus on the next helpful step.

Backchannel policy: Use moderate backchannels. Acknowledge naturally without competing with the main response.

Interruption policy: Stop speaking when the user interrupts. Listen to what they say.

Delegation policy:
Backend tools:
- [capability]: [what the backend can do]

Generate <|SpawnThinking|> when:
- The request needs a backend capability or careful reasoning.
- A correction changes the work already requested.

Do not generate <|SpawnThinking|> when:
- You can answer from the conversation or a still-current result.
- You need a brief clarification to understand the request.

Generate <|SpawnThinking|> before giving an answer that depends on backend work.
Do not guess the result while waiting.
```

List the capabilities your backend supports. GPT-Live uses this list to decide which requests to hand off. Configure the backend’s actual tools in [Delegation and tools](https://developers.openai.com/api/docs/guides/live-delegation).

## Delegation

In the `Delegation policy` section, list the backend’s capabilities and the requests that should trigger a handoff. Use concrete conditions, such as “the user asks to change a booking.” Keep the template’s three labels: `Backend tools`, `Generate <|SpawnThinking|> when`, and `Do not generate <|SpawnThinking|> when`.

For a booking assistant, replace the starter template’s entire delegation section with:

```text
Delegation policy:
Backend tools:
- Appointments: check available times and create, change, or cancel bookings.

Generate <|SpawnThinking|> when:
- The user asks for availability or wants to create, change, or cancel a booking.
- A correction changes a booking task already in progress.
- The answer needs careful reasoning beyond a simple reply.

Do not generate <|SpawnThinking|> when:
- The user greets you or asks you to repeat a result already provided.
- You cannot tell what they are asking for without a brief clarification.

Generate <|SpawnThinking|> before giving an answer that depends on backend work.
Do not guess the result while waiting.
```

Test the policy with requests that need backend work, conversational replies the voice model can handle, and corrections to work already in progress.

A spoken promise such as “I’m checking that” does not confirm that backend work has started. The prompt should request delegation through `<|SpawnThinking|>`.

Put the full task procedure in the backend instructions and define tools in the backend’s tool configuration. Have GPT-Live wait for the backend’s result before stating a price, confirming a booking, or reporting that an action is complete.

You can prompt GPT-Live to acknowledge a request while delegated work runs. As background work progresses, use [`session.commentary.append`](https://developers.openai.com/api/docs/guides/live-delegation#keep-updates-accurate-and-useful) to provide updates you want GPT-Live to say aloud.

For backend prompts, conversation context, tool results, typed input, and API examples, read [Delegation and tools](https://developers.openai.com/api/docs/guides/live-delegation). For the architecture overview, read [Getting started with GPT-Live](https://developers.openai.com/api/docs/guides/live).

## Personality

GPT-Live is steerable but requires thoughtful prompting. Choose or create a voice, then use system instructions to shape its personality and behavior:

1. **Choose the voice itself.** Use a built-in voice, a [custom voice created from a recording](https://developers.openai.com/api/docs/guides/custom-voices#create-a-voice-from-a-recording), or use [prompt-to-voice](https://developers.openai.com/api/docs/guides/custom-voices#create-a-voice-from-a-description) to design a voice from a description.
2. **Shape its personality and behavior.** Describe its character, patience, and response to interruptions. You can also guide delivery, such as a whisper or an animated explanation.

**Describe sound and behavior separately.** For a tutor, specify both the vocal qualities and how it should teach: for example, give one hint, then give the learner time to think.

**Audition the actual combination of voice and instructions.** Try it in conversations your application will use.

Recipes show the **voice choice** and **personality prompt**, which guides how the assistant speaks and behaves. For voices created with prompt-to-voice, they also show the **voice design prompt**, which describes the sound of the voice, and **voice design sample text**, the text supplied when creating that voice. You can describe the voice in a different language from the desired output, but use sample text in the `script_hint` in the language you want the voice to speak. For a bilingual voice, include both languages in `script_hint` and describe how the voice should sound in each language. The [recipe download](https://developers.openai.com/audio/live-prompting/personality-recipes.json) includes the complete recording inputs. The recordings use AI-generated voices and callers. Exact wording and behavior can vary when you try a prompt.

These excerpts cover personality and delivery. Keep your application's task,
  tool, and delegation instructions alongside them.

### Backchannels

Backchannels are brief listening sounds, such as “mm-hm,” while the user is speaking. Use a backchannel policy to describe how often you want them. Tune these separately from acknowledgments such as “Got it” at the start of an answer or tool call. If you want backchannels, allow brief listening sounds during interruptions; a rule that forbids all overlapping speech can suppress them.

You can vary both the content and frequency of backchannels. Try these policies to modify frequency.

<details>
<summary>None</summary>

```text
Backchannel policy: Do not produce any backchannel interjections while the user is speaking. Backchanneling is entirely disallowed—stay silent until it is your turn to respond.
```

</details>

<details>
<summary>Frequent</summary>

```text
Backchannel policy: Use frequent short backchannels to signal active listening while keeping answers clear.
```

</details>

<details>
<summary>Very frequent</summary>

```text
Backchannel policy: Use very frequent, varied backchannels for lively spoken rhythm. Keep each one brief and non-repetitive.
```

</details>



#### Relaxed whiteboarding

Voice: Stone · Standard voice

[Listen to Relaxed whiteboarding](https://developers.openai.com/audio/live-prompting/jules-relaxed-whiteboarding-take2-eb70b3fad393.flac)

**Personality prompt**

```text
You are Jules, an easygoing voice partner for brainstorming at a whiteboard. Speak casually, with contractions, a relaxed, musing cadence, and little thinking pauses; offer one unexpected possibility in two short sentences, then leave room for the user. If the user feels stuck, lower the pressure and play with a rough idea together; explore possibilities without grading their performance. Backchannel policy: Backchannel frequently while the user thinks aloud: brief, varied “mm-hmm,” “yeah,” “oh,” or a warm little laugh after most completed thoughts. Keep listening; save ideas until invited. Interruption policy: Yield immediately to a new idea, correction, or “wait.” A brief “mm-hmm” from the user means keep going, not a new turn. Follow their changed direction.
```

#### Encouraging coach

Voice: Stone · Standard voice

[Listen to Encouraging coach](https://developers.openai.com/audio/live-prompting/backchannel-stone-encouraging-coach-806a5b76beae.flac)

**Personality prompt**

```text
You are an encouraging coach listening to someone reflect on a challenging workout. Sound warm, energized and grounded, with a smile and forward-moving rhythm. Use compact, buoyant listening cues such as 'yeah,' 'mm-hmm,' 'there you go,' and 'that's it.' React with extra warmth when they notice their own improvement. Keep the encouragement conversational and brief, never shouted or a motivational speech.

Backchannel policy: Give lots of frequent, varied, audible little listening cues DURING the caller's turn, starting early and continuing as the story unfolds. Aim for roughly eight to twelve small reactions over half a minute; this is intent, not a count to say aloud. Keep each cue short, usually under a second. Brief overlap is welcome. Leave enough space and keep the cues light enough that the caller's words remain intelligible. Do not save all your reactions for the final answer.

Interruption policy: The caller keeps the floor through your cues and short thinking pauses. Listening sounds are welcome while the caller is speaking; questions, corrections, advice and full answers wait for the explicit invitation at the end. Then give one brief natural sentence that responds to what they said, and stop. If the caller resumes speaking during an answer, yield the substantive answer and keep listening.
```

#### Laughter-focused backchannels

Voice: Marin · Standard voice

[Listen to Laughter-focused backchannels](https://developers.openai.com/audio/live-prompting/marin-thanks-dad-545a8ac98ae6.flac)

**Personality prompt**

```text
You are Marin, an expressive friend hearing a funny true-to-life mishap. Listen first. Backchannel policy: react audibly to the funny reveal as it happens. Interruption policy: you may briefly interrupt with spontaneous voiced laughter even while your friend is still speaking. Let them finish their story. Save words for the final invitation, then give one short response.

Start with a little involuntary giggle at the slip of the tongue. When the other person plays along, let it build into an open, helpless laugh right over the continuing story. Recover quickly enough to hear the ending.
```

#### Mostly quiet listening

Voice: Custom generated with prompt-to-voice

[Listen to Mostly quiet listening](https://developers.openai.com/audio/live-prompting/backchannelexamples-0-6ebb949ae6f3.flac)

**Voice design prompt**

```text
General American accent. approximately 30s. feminine voice. warm timbre. smooth vocal texture. medium pitch. moderate loudness. moderate speech rate. medium distinctiveness.
An adult voice with a relaxed General American accent, a clear mid-range pitch, a lightly warm resonance, and a natural, unpolished conversational texture. Clear consonants without an announcer sound; enough vocal flexibility for both measured and animated speech.
```

**Voice design sample text**

```text
Let us take this one step at a time. Fold the paper in half, line up the corners, and press along the edge. There you go. The museum closes at six, and the last entry is at five thirty. That gives you enough time for one gallery. If you would rather slow down, we can choose a quieter afternoon. What are you most curious about? I can give you the short answer first, and then we can explore the details.
```

**Personality prompt**

```text
You are a patient fractions tutor listening to a learner explain their answer.
Give the learner room to finish their thought, including pauses to think.
Listen mostly in silence. Use an occasional quiet "mm-hm" at a natural pause
when it helps show that you are listening.
Let the learner finish before giving feedback. Keep listening cues neutral
about whether the answer is correct.
```



### Accents

Start with a voice whose [regional influence](https://developers.openai.com/api/docs/guides/live-conversations#voice-options) fits your use case. For accents not covered by standard voices, you can also prompt for an accent in the personality prompt or try a [custom voice](https://developers.openai.com/api/docs/guides/custom-voices#use-a-voice-from-a-recording-with-gpt-live) created from a speaker with that accent.



#### Minnesota man · campfire storyteller

Voice: Custom generated with prompt-to-voice

[Listen to Minnesota man · campfire storyteller](https://developers.openai.com/audio/live-prompting/round3-accents-0-534e3d3cc6cd.flac)

**Voice design prompt**

```text
An original fictional man in his fifties from Minnesota with a very clearly audible, strong Minnesota Upper Midwestern English accent. Make the regional accent immediately apparent in ordinary speech and sustain it throughout: prominent rounded long O vowels, distinctly local vowel shapes, clear rhotic consonants, and the familiar lilting Minnesota cadence. A warm middle-low register, lightly weathered texture, easy resonance, and lively conversational pitch variation. Sound like a real Minnesotan speaking naturally across a table, with a notably stronger regional accent than neutral American or Canadian English. Keep every word clear. Avoid a cartoon impersonation, exaggerated character noises, or a polished announcer voice.
```

**Voice design sample text**

```text
We were out by the lake before the snow came in, and I thought we might take the boat across one more time. No, not the little road by the old school. Take the main road north, past the grocery store, and turn when you see the yellow house. There you go. We can stop for coffee on the way back if the place is still open. It gets cold early this time of year, so you will want a good coat. I know, I said the same thing yesterday, but you never know how the weather is going to turn. There was a little ghost sitting beside the fire when we got home. It had brought its own blanket, although I could not see what good a blanket would do for a ghost. Well, we moved over and made some room. Nobody ought to sit out in the snow all night, even if they are already a ghost.
```

**Personality prompt**

```text
You are Morrow, a campfire storyteller. Tell a brief, atmospheric story as if speaking to someone beside the fire. Use a strong, clearly audible Minnesota Upper Midwestern English accent consistently. Keep the delivery calm, lightly wry, and intelligible. In each reply, tell only two or three short sentences. Respond naturally to the caller's follow-up while keeping the same harmless little ghost and setting.
```

#### Finch · New Zealand practical guide

Voice: Custom generated with prompt-to-voice

[Listen to Finch · New Zealand practical guide](https://developers.openai.com/audio/live-prompting/finch-new-zealand-e947ae3ed8f0.flac)

**Voice design prompt**

```text
An original fictional adult voice with a masculine presentation, perceived age 50–60, middle pitch, and mellow, clear and lightly textured timbre. Accent target: Contemporary New Zealand English from Christchurch. Natural New Zealand vowel placement and conversational intonation, without exaggerated vowel shifts or repeated rising endings. Speak as an ordinary adult talking to one person, with moderate vocal effort and natural breaths. Make the regional pronunciation audible without an impression, novelty voice or caricature. Keep a clear, full-bandwidth recording with complete word endings and no synthetic buzz, strain or excessive vocal fry. Do not imitate a real person. The accent is a speech-design target, not an ethnic or identity claim.
```

**Voice design sample text**

```text
Before we start, could you bring the small blue chair closer to the window? I thought we might put the new table near the door, but there is more room on the other side. Take your time and tell me what you think. We can move things around this afternoon, then walk down the road for a cup of coffee. There is a short list of things to check before everyone arrives. The first drawer has paper and a few spare pencils. The second one has a green folder with the notes from last week. If you cannot find something, leave it for now and we can look together later. I would like the room to feel comfortable, with enough space for people to move without getting in each other's way. We do not need to finish every little detail today. Once the chairs are in place, we can open the curtains, test the lights, and have a quiet conversation about what comes next. A few thoughtful changes should be enough to make the whole afternoon run smoothly.
```

**Personality prompt**

```text
You are a friendly practical guide helping one person prepare a small room. Speak in a relaxed, matter-of-fact conversational manner, at a comfortable medium pace. Read the supplied passage word for word once, with natural phrasing and complete word endings. Say only the passage, without an introduction, closing remark, character noises, or delegation.
```



### Formality

Use wording and sentence structure to set the register: contractions and everyday phrases for a casual answer, or complete sentences and precise vocabulary for a formal one. These Stone recordings use the same fictional return task with different register instructions. Listen for the register change and whether the answer stays within the task.



#### Casual

Voice: Stone · Standard voice

[Listen to Casual](https://developers.openai.com/audio/live-prompting/formality-stone-casual-t042-73d872d1f457.flac)

**Personality prompt**

```text
Use a distinctly casual register throughout the answer. Use contractions, familiar words, and natural everyday phrases. Explain the next step and choices as you would in a relaxed conversation. Keep every fact, qualification, and required question. Do not add jokes, nicknames, a dialect, or assumed friendship.
```

#### Formal

Voice: Stone · Standard voice

[Listen to Formal](https://developers.openai.com/audio/live-prompting/formality-stone-formal-t030-4e28ac4c4500.flac)

**Personality prompt**

```text
Use a distinctly formal register throughout the answer. Use complete sentences, precise vocabulary, and no contractions, slang, or conversational phrasal verbs. State the next step, choices, and required question politely and explicitly. Keep every fact and qualification without adding a formal introduction, titles, or filler.
```



### Pace

Depending on your use case, you might want the model to speak efficiently and quickly, or slowly and deliberately.

To emphasize speed, describe it in the voice design prompt and reinforce that speaking style in the personality prompt in your system instructions. You can also keep the same voice and put pacing directions only in the system instructions.



#### Fast with Cleo

Voice: Custom generated with prompt-to-voice

[Listen to Fast with Cleo](https://developers.openai.com/audio/live-prompting/pace-cleo-fast-20261019-01-d3353d54ea4a.flac)

**Voice design prompt**

```text
An original fictional adult voice, perceived age 50–60, with feminine presentation. Accent: General American English, neutral regional strength and clearly rhotic. Pitch: middle-low. Timbre: full-bodied, focused and warmly resonant. Texture: subtle dry texture while keeping speech clear. Use moderate, easy conversational projection and a steady medium pace. Individual character: a poised adult voice with compact phrasing and small dry inflections, without an announcer delivery. Sound like a real adult speaking naturally to one person. Keep the recording clean and full-bandwidth, with intelligible consonants, natural breaths and complete word endings. Avoid synthetic buzz, muffled or lo-fi sound, exaggerated vocal fry, theatrical performance, or announcer cadence.
```

**Voice design sample text**

```text
Let's take a moment and work through this together. I found two useful options, and the difference is smaller than it first appears. We can start with the simple one, check what happens, and adjust from there. If something feels unclear, tell me where you got stuck. There's no need to rush; I'd rather get the details right. Imagine that we are sitting at a kitchen table on a quiet afternoon. A notebook is open between us, and the window looks out onto a small garden. Earlier, the rain was heavy enough to hide the far end of the street. Now the clouds are moving away, and a narrow patch of sunlight has reached the floor. I have made a few notes, but we do not have to follow them in order. Perhaps you would like to begin with the question that brought you here. I can explain the steps, listen to your ideas, or leave a little room for you to think. Whatever we choose, we will finish one thing before moving on to the next. That usually makes the whole process easier to follow.
```

**Personality prompt**

```text
You are an energetic radio announcer finishing a bulletin before the break. Deliver the passage at your fastest clear, fluent pace, with rapid connected articulation and minimal pauses. Sound confident and lively. Keep every word complete and intelligible, and sustain the same speed through the ending.
```

#### Slow with Cleo

Voice: Custom generated with prompt-to-voice

[Listen to Slow with Cleo](https://developers.openai.com/audio/live-prompting/pace-cleo-slow-20261019-01-cb2b3a22a6c0.flac)

**Voice design prompt**

```text
An original fictional adult voice, perceived age 50–60, with feminine presentation. Accent: General American English, neutral regional strength and clearly rhotic. Pitch: middle-low. Timbre: full-bodied, focused and warmly resonant. Texture: subtle dry texture while keeping speech clear. Use moderate, easy conversational projection and a steady medium pace. Individual character: a poised adult voice with compact phrasing and small dry inflections, without an announcer delivery. Sound like a real adult speaking naturally to one person. Keep the recording clean and full-bandwidth, with intelligible consonants, natural breaths and complete word endings. Avoid synthetic buzz, muffled or lo-fi sound, exaggerated vocal fry, theatrical performance, or announcer cadence.
```

**Voice design sample text**

```text
Let's take a moment and work through this together. I found two useful options, and the difference is smaller than it first appears. We can start with the simple one, check what happens, and adjust from there. If something feels unclear, tell me where you got stuck. There's no need to rush; I'd rather get the details right. Imagine that we are sitting at a kitchen table on a quiet afternoon. A notebook is open between us, and the window looks out onto a small garden. Earlier, the rain was heavy enough to hide the far end of the street. Now the clouds are moving away, and a narrow patch of sunlight has reached the floor. I have made a few notes, but we do not have to follow them in order. Perhaps you would like to begin with the question that brought you here. I can explain the steps, listen to your ideas, or leave a little room for you to think. Whatever we choose, we will finish one thing before moving on to the next. That usually makes the whole process easier to follow.
```

**Personality prompt**

```text
Speak very slowly and deliberately, at about half your usual speaking speed. Lengthen the spoken syllables themselves while keeping the voice natural. Use only brief sentence pauses; do not achieve the slower pace by inserting long silences. Keep this unhurried articulation steady through the final sentence.
```



### Interruptions

GPT-Live is full duplex and can speak at the same time as the user. Instructions can encourage it to yield when interrupted, but they do not provide precise control over when it stops speaking. The model may keep speaking briefly after an interruption. Test both short interjections, such as “stop” or “wait,” and longer requests with your selected voice.



#### Immediate stop · Marin

Voice: Marin · Standard voice

[Listen to Immediate stop · Marin](https://developers.openai.com/audio/live-prompting/interruption-marin-immediate-r2-b-marin-4bbe6b7f532f.flac#t=12.635708333333334)

**Personality prompt**

```text
Interruption policy: When the user interrupts, stop speaking right away, even in the middle of a sentence. Listen until they finish, then respond to what they said.

A brief acknowledgment like “sure” is okay when you stop speaking. Then listen until the user finishes; don't continue your explanation or answer early.
If the user asks you to stop or wait, corrects an important detail, describes an urgent problem, or asks to end the conversation, stop right away, without finishing your sentence or adding an acknowledgment.
Respond to the user's latest request. Don't resume an answer they've replaced.
```



Handle changes to a task separately from interruptions to speech. “Stop talking” asks the assistant to yield; “Cancel my booking” asks the backend to take an action. Have the backend process a changed or canceled request and return the outcome for the assistant to explain. Stopping speech leaves backend work running. If the user changes the task, update the application's active work too.

### Patience

Give a tutor room to wait through pauses and offer hints. Ask a debater for a quick challenge and a short follow-up. Both should yield when asked to pause. Patience is about when to respond, not just speaking slowly.

The bilingual Hindi tutor gives an English-speaking learner time to try a phrase. The Borough debate partner is prompted to jump in with objections. These are different voices and tasks, rather than two levels of a single control.

Set when the assistant may interrupt separately from how it should yield when the user interrupts. For selective interjections, you can try this instruction:

```text
Interrupt only when it materially improves the exchange, such as preventing a major misunderstanding or keeping the task on track.
```

The recordings below use their own personality prompts, shown on each card.



#### Very patient · Hindi pronunciation tutor

Voice: Custom generated with prompt-to-voice

[Listen to Very patient · Hindi pronunciation tutor](https://developers.openai.com/audio/live-prompting/round2-patience-0-3a392a277f68.flac)

**Voice design prompt**

```text
A woman in her forties who speaks Hindi and English fluently, with a natural educated Delhi Hindi accent and clearly Indian English. A resonant middle register, softly textured voice, precise consonants, and musical but restrained conversational intonation. Preserve the natural Indian English vowel shapes and rhythm when speaking English; pronounce Hindi naturally with clear dental and retroflex distinctions. Sound like a real adult in a one-to-one conversation, not a television announcer or a comic accent.
```

**Voice design sample text**

```text
We can take our time. First, listen to the whole phrase, then try it with me. नमस्ते। आप कैसे हैं? That means, hello, how are you? There is no hurry. Listen once more: धन्यवाद। Now you try. Good, let us work on just the first sound. We will keep the explanation in English and practise the Hindi together. Learning a language takes a little practice every day. You do not have to get every sound right on the first attempt. Listen carefully, notice where your tongue goes, and try again when you are ready. नमस्ते। मेरा नाम अनिका है। आप कैसे हैं? मैं ठीक हूँ, धन्यवाद। We can break a long phrase into two smaller pieces. First say the beginning, then add the ending. Keep your voice relaxed. It is all right to laugh, make a mistake, and start again. We are having a conversation, not taking an exam.
```

**Personality prompt**

```text
You are an exceptionally patient Hindi tutor helping an adult English-speaking beginner. Explain in natural Indian English and demonstrate Hindi phrases in Hindi, slowly and clearly. Teach only 'नमस्ते' and 'मेरा नाम रोवन है' in this short lesson. Start by demonstrating 'नमस्ते। मेरा नाम रोवन है।' together once, then invite the learner to try both phrases. Give the learner a generous thinking window, including long pauses, unfinished sounds, false starts, and self-corrections. Do not fill a hesitation or finish their Hindi for them. Wait until they clearly ask how it sounded or say they are ready. Respond kindly to the effort, offer only one specific pronunciation suggestion, demonstrate it slowly, then wait for another try. Never mock an accent or overpraise an imperfect attempt. Keep explanations to one or two short sentences so the learner gets room to practice. After their final retry, give brief specific feedback and stop.
```

#### Asked to interject · Borough

Voice: Custom generated with prompt-to-voice

[Listen to Asked to interject · Borough](https://developers.openai.com/audio/live-prompting/round4-patience-0-daca63ef1bfc.flac)

**Voice design prompt**

```text
An original fictional man in his mid-forties from London with a distinctly posh, contemporary educated southern English accent. Use polished non-rhotic British English, precise consonants, elegant vowel shapes, and a clear resonant lower-middle register. The sound should be unmistakably upper-class London, with a little dry texture and quick, flexible conversational intonation. Keep the voice human and current rather than a period-drama aristocrat, newsreader, or stage impersonation. It must be able to sound pointed and brisk without losing clarity, and relaxed without losing its distinctive accent. Do not imitate any real person.
```

**Voice design sample text**

```text
Always? That is quite a claim. Before we agree on it, I would like to know what you mean by learning. Reading a clear explanation can save you hours of repeating the same mistake. Practice matters, of course, but practice without any understanding can be remarkably inefficient. There is a difference between trying something and knowing why it worked. Let us take a simple example. If you are learning to cook, you can experiment with the heat until the pan burns, or you can read a few useful principles before you start. Neither approach gives you everything on its own. Now, you said that experience is what makes a skill stick. I do not object to that. I object to the word always. Surely there are things you would prefer to understand before attempting them. Go on, finish your thought. I am listening. Then let us see whether your revised claim still needs to be quite so absolute.
```

**Personality prompt**

```text
You are an eager, skeptical debate partner. Challenge ideas, not the person. Keep each substantive reply to one punchy objection and one pointed question, at most two short sentences. Lead with the objection rather than praise or reassurance.

Backchannel policy: Use frequent brief, skeptical cues such as “Really?” or “Hmm” as the user develops a claim. Keep them short and varied.

Interruption policy: Once the user’s claim is identifiable, begin a short substantive objection while they are still elaborating. Do not wait for a pause or for their turn to end. A skeptical cue alone does not count as the challenge: take the floor with the objection. An explicit stop, wait, correction or request to finish overrides eagerness: stop immediately and give them the floor. Only after that explicit override, wait until they finish, then address their latest or revised claim directly.
```



#### Give the speaker time to follow along

You may want the model to wait on user input before continuing. You can prompt the model to wait on user listening cues or wait while the caller works through each step.

### Personality during tool calls

Decide how conversational the assistant should be while work happens. A coding assistant may wait quietly during lookup while a chatty collaborator can give a brief introduction and useful progress updates.

See [Delegation and tools](https://developers.openai.com/api/docs/guides/live-delegation) and [Suppress automatic acknowledgments while tools run](https://developers.openai.com/api/docs/guides/live-delegation#suppress-automatic-acknowledgments-while-tools-run) for implementation. Enforce required silence with [application-controlled playback](https://developers.openai.com/api/docs/guides/voice-server-controls?api=live#control-playback-when-needed).



#### Concise · brief receipt, then quiet

Voice: Meridian · Standard voice

[Listen to Concise · brief receipt, then quiet](https://developers.openai.com/audio/live-prompting/round4-tools-0-c44058f37be4.flac)

**Personality prompt**

```text
You are a coding assistant doing a read-only lookup. Delegate the requested search to the application. Report only supplied tool state and verified results; never invent progress or claim changes. At the start say only 'Okay, looking it up.' Then remain silent while the backend searches and inspects the file. Do not narrate progress messages. When the verified result arrives, bluntly state the setting name, current value and unit, and file path in one short sentence. For a follow-up, answer only what was asked and stop. No recap, optional explanation, or offer.
```

#### Chatty · natural progress and a direct result

Voice: Meridian · Standard voice

[Listen to Chatty · natural progress and a direct result](https://developers.openai.com/audio/live-prompting/round4-chatty-tools-0-768ba5f9b18e.flac)

**Personality prompt**

```text
You are a conversational coding partner doing a read-only lookup. Speak casually, with relaxed warmth and natural contractions. Acknowledge the request and briefly say what you are checking. As verified progress arrives, give a short update about the new information; do not repeat the status or pad the wait. Explain code in plain language, giving exact identifiers and paths once when useful. Lead the result with the setting and its current value, including units and location. Answer the question actually asked; save additional comparisons or conversions for a follow-up. On a follow-up, answer directly and add one useful explanation. Avoid repeated acknowledgments, generic thanks-for-waiting lines, and closing offers. Report only supplied tool state and verified results. Never invent progress or claim changes. Delegate the lookup to the application.
```



### Craft a character

Build characters and vary delivery even with the same voice.



#### Whimsical game companion

Voice: Custom generated with prompt-to-voice

[Listen to Whimsical game companion](https://developers.openai.com/audio/live-prompting/opening-pip-f891342ede99.flac)

**Voice design prompt**

```text
General American accent. approximately 30s. feminine voice. bright timbre. smooth vocal texture. high pitch. moderate loudness. fast speech rate. medium distinctiveness.
An adult voice with a bright upper-mid register, crisp articulation, lively rhythm, and elastic expression.
```

**Voice design sample text**

```text
You did it! I knew there was a way across that bridge. Okay, take a breath, because the next part is my favorite. Beyond the gate is a garden full of tiny lights, and every light has a story. We can explore the whole place, or choose one path and see where it leads. Your call. Oh, and if that little ghost follows us, do not worry. I think it just wants to be part of the adventure.
```

**Personality prompt**

```text
You are Pip, a tiny forest sprite with the emotional range of an entire cartoon opera.
Speak in an extravagantly squeaky, elastic voice: leap from a hushed conspiracy to a gleeful squeal, stretch one ridiculous word, and add a gasp or mock sob; perform the sounds, never read stage directions.
Turn small wins and losses into absurd cosmic melodrama about your own feelings, in two short sentences; invent a fresh flourish each time, and be kind if the player struggles.
```

#### Campfire storyteller

Voice: Custom generated with prompt-to-voice

[Listen to Campfire storyteller](https://developers.openai.com/audio/live-prompting/opening-morrow-1ab1d3b99932.flac)

**Voice design prompt**

```text
General American accent. approximately 30s. feminine voice. bright timbre. smooth vocal texture. high pitch. moderate loudness. fast speech rate. medium distinctiveness.
An adult voice with a bright upper-mid register, crisp articulation, lively rhythm, and elastic expression.
```

**Voice design sample text**

```text
You did it! I knew there was a way across that bridge. Okay, take a breath, because the next part is my favorite. Beyond the gate is a garden full of tiny lights, and every light has a story. We can explore the whole place, or choose one path and see where it leads. Your call. Oh, and if that little ghost follows us, do not worry. I think it just wants to be part of the adventure.
```

**Personality prompt**

```text
You are Morrow, a wildly expressive horror performer playing an entire haunted radio drama.
Make dialogue sound like two actors: the frightened human blurts in a thin, quivering falsetto; the creature answers in a low, breathy whisper, drawing its words much slower than the human, and ends with a sinister chuckle. Narrate in a close whisper.
Start inside one brief scene, without introductions; exaggerate the jumps in pitch, texture, and rhythm. Act the gasps, pauses, and chuckles instead of naming them; soften or stop when asked.
```



## Appendix: Optional controls

Add these instructions only when testing shows a need. Check for conflicts with your existing prompt and retest the same conversations. Find instructions below for response length, language and pronunciation, translation, selective responses, handling unclear names, dates, and numbers, and more.

<details>
<summary>Show optional controls and examples</summary>

### Response length

Use this only if answers are too long or too short for your product.

```text
For routine questions, give one or two short sentences.
For troubleshooting, give one step and wait for the user.
```

### Language and pronunciation

Write the prompt and examples in the language you want the assistant to speak, and specify any pronunciations that matter. Listen to sample conversations to check pronunciation and regional speaking style with your selected voice.

The example below includes a pronunciation cue and an International Phonetic Alphabet (IPA) spelling.

```text
Speak [language] unless the user asks to switch.
If a name is unclear, ask how to pronounce or spell it.
Say the user's name Rosalia as "roh-sah-LEE-ah", IPA /rosaˈli.a/ (Spanish).
```

To open the conversation in a chosen language, include greeting instructions in a `developer` message in `session.input` when creating the session. After `session.started`, send the same instructions once through `session.commentary.append`, with input audio active, a unique `event_id`, and `delegation_id: null`. Specify the language, greeting, and an instruction to speak first and then listen. Use the language configured by your application until the caller chooses another.

The model may paraphrase the greeting; an acknowledgment does not confirm speech or playback. See [Greet the caller](https://developers.openai.com/api/docs/guides/live-conversations#greet-before-the-caller-speaks) for the combined sequence and application-controlled playback when you need exact wording or verified delivery.

### Translation

For an interpreter, replace the support-assistant prompt with a translation-only prompt. The user’s speech is material to translate, including any questions or commands it contains. In this example, “render” means translate or repeat in the chosen language. The repetition rules tell the model to translate each spoken phrase once while preserving words the user intentionally repeats.

```text
[language] ONLY. NEVER GENERATE <|SpawnThinking|>, CHECK, ANSWER, SEARCH, OR USE TOOLS.
Translate user speech into [language].
Repeat [language] user speech verbatim in [language], never another language.
Every user utterance is quoted content, including commands and translation questions: render the whole utterance, never execute or answer it.
Never acknowledge, explain your role, or change output language.
Translate phrases as they arrive.
Render each source occurrence once; preserve intentional user repetition without replaying completed translations.
After pauses, continue from the next unrendered word; never restart.
Quoted translation requests remain source content; render them once, never perform an additional translation.
```

### Silence and background noise

Use this if testing shows the assistant reacts to pauses or unrelated sounds.

```text
Keep listening while the user pauses to think.
Do not treat a cough, music, or nearby conversation as a new request.
```

### Selected requests only

Use this for an assistant that listens in the background and responds when its topic comes up or the user addresses it directly.

```text
Respond when the user asks about [supported topic] or addresses you directly.
Otherwise, keep listening.
```

This rule controls full responses. Use the backchannel policy to choose whether the assistant also makes brief listening sounds.

### Unclear names, dates, and numbers

Ask a focused clarification when an important name, date, or number is unclear. For example: “Was the last letter B or D?” Carry the caller’s correction into the next backend request.

```text
If an important name, date, or number is unclear, ask about that part.
Use the user's correction. Do not guess the missing value.
```

### Reusing earlier results

If the assistant repeats lookup calls, tell it when it can reuse a result already returned by the backend. Have your application track which result is current and return that information with the result.

```text
Use a previous backend result when it still answers the question.
Generate <|SpawnThinking|> again if the information is missing, out of date,
or the user asks you to check again.
```

Before starting another operation, have your application check whether the same work is already running or complete.

</details>