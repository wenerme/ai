# Connect voice to Decisions

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use the native [Decisions API](https://developers.openai.com/api/docs/guides/decisions) integration in [GPT-Live](https://developers.openai.com/api/docs/guides/live) to make low-latency decisions while your user is still speaking.

Native delegation skips a round trip through your app. With [custom delegation](https://developers.openai.com/api/docs/guides/live-delegation?delegation-mode=client#configure-client-delegation), Live notifies your app, which then calls Decisions. With native delegation, Live calls Decisions directly.

## Choose when to decide

- [Let Live delegate](#let-live-delegate) when it recognizes a request your app can handle. Set the choices in `session.delegation` and tell Live when to delegate.
- [React to the conversation](#react-to-transcripts) as your user speaks or as Live replies. Configure `session.triggers` for input or output transcript deltas.

**You can change the questions during an active Live session.** Send `session.update`, then wait for the matching `session.updated` before adding a decision item for that step. Set the delegation type when you create the session. It stays fixed for that session.

## Let Live delegate

Use delegation when you want Live to recognize a request and hand the next step to your app. Consider two requests a driver might make:

- **“Make it warmer.”** Decisions selects `increase` for the cabin temperature and `none` for the other questions. Raise the cabin setting from 70°F to 71°F, read it back from the dashboard, and give Live the result so it can say, “It’s set to 71 degrees.”
- **“Why is my windshield fogging up?”** Decisions selects `on` for the defogger and `explain` for the explanation. Turn on the defogger, read its actual state, and use the [Responses API](https://developers.openai.com/api/reference/responses/overview) to explain why the windshield fogged up. Live can then say, “The defogger is on. Moisture in the cabin condenses on the cold glass.”

### Adjust the cabin



Driver

    
“Make it warmer.”

  

  

    

      
Decision results

      <ul>
        <li data-action="true">
          
Cabin temperature

          **+1°F**
        </li>
        <li>
          
Defogger

          
No-op

        </li>
        <li>
          
Responses

          
No-op

        </li>
      </ul>
    

    

      

        **Your app**
        
Cabin temperature

      

      

        

          70
°F

        

        
→

        **
          71
°F

        **
      

      
Set and verified on the dashboard

    

  

  

    
Live replies

    
“It’s set to 71 degrees.”



### Add a Responses explanation



Driver

    
“Why is my windshield fogging up?”

  

  

    

      
Decision results

      <ul>
        <li>
          
Cabin temperature

          
No-op

        </li>
        <li data-action="true">
          
Defogger

          **On**
        </li>
        <li data-action="true">
          
Responses

          **Explain**
        </li>
      </ul>
    

    

      **Your app**
      

        

          
1. Turn on the defogger

          
On

        

        

          
2. Ask Responses why

          
Explanation

        

      

      

        Return the observed state and explanation to Live.
      

    

  

  

    
Live replies

    

      “The defogger is on. Moisture in the cabin condenses on the cold glass.”



### Configure delegation

Start with a [working Live connection](https://developers.openai.com/api/docs/guides/voice-webrtc?api=live#connect-a-browser-to-gpt-live) and `api.decisions.write` permission. Use your usual Live connection headers. You don’t need a Decisions-specific alpha header.

In your WebRTC session request, put this object under `session`, alongside your existing `transport`. The session instructions tell Live _when_ to delegate. The choice questions tell Decisions _what_ to return. One native decision request answers all three questions independently.

```json
{
  "model": "gpt-live-1",
  "instructions": "Delegate requests to warm the cabin or clear windshield fog, and questions about windshield fogging. Wait for the app to report the result before describing it.",
  "delegation": {
    "type": "decisions",
    "decisions": {
      "model": "gpt-6-luna",
      "questions": [
        {
          "type": "choice",
          "name": "cabin_temperature",
          "instructions": "Choose increase if the driver asks to make the cabin warmer. Otherwise choose none.",
          "choices": [{ "value": "increase" }, { "value": "none" }]
        },
        {
          "type": "choice",
          "name": "windshield_defogger",
          "instructions": "Choose on if the driver asks to clear windshield fog or asks why the windshield is fogging up. Otherwise choose none.",
          "choices": [{ "value": "on" }, { "value": "none" }]
        },
        {
          "type": "choice",
          "name": "explanation",
          "instructions": "Choose explain if the driver asks why the windshield is fogging up. Otherwise choose none.",
          "choices": [{ "value": "explain" }, { "value": "none" }]
        }
      ]
    }
  }
}
```

Decisions receives the conversation transcript and any context you add with `decision.item.create`. After `session.started`, send the current dashboard state and wait for `decision.item.created`:

```json
{
  "type": "decision.item.create",
  "event_id": "evt_cabin_70",
  "item": {
    "type": "message",
    "role": "user",
    "content": [
      {
        "type": "input_text",
        "text": "Cabin set to 70°F. Windshield defogger off."
      }
    ]
  }
}
```

Keep the returned `item.id`. When the setting changes, remove the old state with `decision.item.delete`, wait for `decision.item.deleted`, then add the new state.

### Run actions and report results

Save `delegation.id` from `session.delegation.created`. On the `decision.event` with that `delegation_id`, look for `event.type` of `decision.completed` and read each choice by its question name in `event.decision.answers`. An answer of `none` is a no-op for that action. If you filter WebRTC events, allow both `session.delegation.created` and `decision.event`.

When `cabin_temperature` is `increase`, change the setting, verify it, and send the result with [`session.commentary.append`](https://developers.openai.com/api/docs/guides/live-delegation#send-the-right-kind-of-update). Use the delegation ID from this request:

```json
{
  "type": "session.commentary.append",
  "delegation_id": "del_cabin_1",
  "content": "The dashboard now shows the cabin is set to 71°F."
}
```

When `windshield_defogger` is `on`, turn on the defogger and read its state. When `explanation` is `explain`, call Responses from your server with `api.responses.write` permission. Include the driver’s question and the state you observed:

```bash
curl https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6.1-sol",
    "instructions": "Explain why the windshield fogged up in one short, conversational sentence. The app will report the actual defogger state.",
    "input": "Driver: Why is my windshield fogging up? Dashboard: windshield defogger is now on."
  }'
```


Send the observed defogger state and the explanation to Live with `session.commentary.append` and this request’s delegation ID.

## React to transcripts

Use a transcript trigger when the timing should follow the conversation. A digital person hearing “I got the job!” could smile and nod while your user is still speaking. An output trigger could make the smile broaden and the character lean forward as Live says, “That’s wonderful!”



**While listening**
      `session.input_transcript.delta`
    

    

      

        
Your user

        
“I got the job!”

      

      

        →
      

      

        


        

          **Smile + nod**
          
Happy · medium intensity

        

      

    

  

  

    

      **While speaking**
      `session.output_transcript.delta`
    

    

      

        
Live

        
“That’s wonderful!”

      

      

        →
      

      

        


        

          **Smile + lean forward**
          
Happy · high intensity

        

      

    

  

  

    

      **Another listening example**
      `session.input_transcript.delta`
    

    

      

        
Your user

        
“I didn’t get the job.”

      

      

        →
      

      

        


        

          **Sad + slight nod**
          
Sad · low intensity



Add a trigger like this one to `session.triggers`. It asks for expression, intensity, and gesture as separate choices:

```json
{
  "type": "decisions",
  "event_type": "session.input_transcript.delta",
  "decisions": {
    "questions": [
      {
        "type": "choice",
        "name": "expression",
        "instructions": "Choose your expression as you listen to the person's latest words.",
        "choices": [
          { "value": "neutral" },
          { "value": "happy" },
          { "value": "sad" },
          { "value": "concerned" }
        ]
      },
      {
        "type": "choice",
        "name": "intensity",
        "instructions": "Choose how strongly to show that expression.",
        "choices": [
          { "value": "low" },
          { "value": "medium" },
          { "value": "high" }
        ]
      },
      {
        "type": "choice",
        "name": "gesture",
        "instructions": "Choose a gesture that fits what you just heard.",
        "choices": [
          { "value": "none" },
          { "value": "nod" },
          { "value": "shake" },
          { "value": "lean" }
        ]
      }
    ]
  }
}
```

To animate the reply, add a second trigger with `event_type` set to `session.output_transcript.delta` and ask for choices that match the words Live is speaking. Live supplies the model and trigger ID. Transcript triggers run independently of delegation.

If you filter WebRTC events, allow `decision.event` and the transcript event for each configured trigger: `session.input_transcript.delta`, `session.output_transcript.delta`, or both. Live only delivers a trigger result when its source transcript event is also allowed.

A trigger result identifies the transcript delta that prompted it. Here are the relevant fields from a `decision.event` for the “I got the job!” example:

```json
{
  "type": "decision.event",
  "delegation_id": null,
  "trigger_id": "trg_listening_1",
  "source_event_type": "session.input_transcript.delta",
  "source_event_id": "evt_input_42",
  "event": {
    "type": "decision.completed",
    "decision": {
      "answers": [
        { "type": "choice", "name": "expression", "choice": "happy" },
        { "type": "choice", "name": "intensity", "choice": "medium" },
        { "type": "choice", "name": "gesture", "choice": "nod" }
      ]
    }
  }
}
```

Match `source_event_id` to the transcript delta. Live can combine pending deltas, and results can arrive out of order. Apply the newest relevant result for each direction, and drive mouth movement from the audio.