# Connect voice to Decisions

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use the native [Decisions API](https://developers.openai.com/api/docs/guides/decisions) integration in [GPT-Live](https://developers.openai.com/api/docs/guides/live) to make low-latency decisions while your user is still speaking.

Native delegation skips a round trip through your app. With [custom delegation](https://developers.openai.com/api/docs/guides/live-delegation?delegation-mode=client#configure-client-delegation), Live notifies your app, which then calls Decisions. With native delegation, Live calls Decisions directly.

## Choose when to decide

- [Let Live delegate](#let-live-delegate) when it recognizes a request your app can handle. Set the choices in `session.delegation` and tell Live when to delegate.
- [React to the conversation](#react-to-transcripts) as your user speaks or as Live replies. Configure `session.triggers` for input or output transcript deltas.

**You can change the questions during an active Live session.** Send `session.update`, then wait for the matching `session.updated` before adding a decision item for that step. Set the delegation type when you create the session. It stays fixed for that session.

## Let Live delegate

In one request, Live can ask Decisions to choose among actions you define and decide whether your app should call the [Responses API](https://developers.openai.com/api/reference/responses/overview).

Say you are building a voice assistant for a car. A driver can ask to turn the temperature up or down, turn the windshield defogger on or off, or get directions and find a place to eat. A choice of `none` leaves that cabin control unchanged.

### Adjust the cabin



Driver

    
“I feel a little cold.”

  

  

    

      
Decision results

      <ul>
        <li data-action="true">
          
Cabin temperature

          **Up**
        </li>
        <li>
          
Defogger

          
None

        </li>
        <li>
          
Call Responses

          
No

        </li>
      </ul>
    

    

      **Your app**
      

        {
          "Raise the temperature, read back the new setting, and append the full cabin state to Decisions. Wait for confirmation, then send the result to Live."
        }
      

    

  

  

    
Live replies

    
“I turned up the temperature a bit.”



### Handle a request beyond cabin controls



Driver

    

      {
        "“My windshield is foggy, so please defog it, navigate to San Francisco, and find me some good restaurants there.”"
      }
    

  

  

    

      
Decision results

      <ul>
        <li>
          
Cabin temperature

          
None

        </li>
        <li data-action="true">
          
Defogger

          **On**
        </li>
        <li data-action="true">
          
Call Responses

          **Yes**
        </li>
      </ul>
    

    

      **Your app**
      

        

          
1. Turn on the defogger

          
On

        

        

          

            {
              "2. Send the driver’s full request and the cabin results to Responses"
            }
          

        

      

      

        Use the tool calls from Responses to start navigation to San Francisco
        and find restaurants there. Return both results to Responses.
      

    

  

  

    
Live reports

    

      The defogger state, whether navigation started, and the restaurants your
      search found.



### Configure delegation

Start with a [working Live connection](https://developers.openai.com/api/docs/guides/voice-webrtc?api=live#connect-a-browser-to-gpt-live) and `api.decisions.write` permission. Use your usual Live connection headers. You don’t need a Decisions-specific alpha header.

In your WebRTC session request, put this object under `session`, alongside your existing `transport`. The session instructions tell Live _when_ to delegate. The choice questions tell Decisions _what_ to return. One native decision request answers all three questions independently.

```json
{
  "model": "gpt-live-1",
  "instructions": "Delegate the driver’s whole request, including cabin controls, navigation, and local search. Wait for the app to report what happened, then tell the driver in natural language.",
  "delegation": {
    "type": "decisions",
    "decisions": {
      "model": "gpt-6-luna",
      "questions": [
        {
          "type": "choice",
          "name": "cabin_temperature",
          "instructions": "Choose temperature_up if the driver feels cold or wants more heat, temperature_down if they feel hot or want to cool down, or none if the request is unrelated.",
          "choices": [
            { "value": "temperature_up" },
            { "value": "temperature_down" },
            { "value": "none" }
          ]
        },
        {
          "type": "choice",
          "name": "windshield_defogger",
          "instructions": "Choose on if the driver reports a foggy windshield or asks to defog it, off if they say the glass is clear now or ask to turn the defogger off, or none if the request is unrelated.",
          "choices": [
            { "value": "on" },
            { "value": "off" },
            { "value": "none" }
          ]
        },
        {
          "type": "choice",
          "name": "needs_response",
          "instructions": "Choose yes if any part of the request goes beyond these cabin controls, such as getting directions or finding restaurants. Otherwise choose no.",
          "choices": [{ "value": "yes" }, { "value": "no" }]
        }
      ]
    }
  }
}
```

Live sends the conversation transcript to Decisions automatically.

### Run actions and report results

Save `delegation.id` from `session.delegation.created`. On the `decision.event` with that `delegation_id`, look for `event.type` of `decision.completed` and read each choice by its question name in `event.decision.answers`. An answer of `none` is a no-op for that action. If you filter WebRTC events, allow both `session.delegation.created` and `decision.event`.

For “I feel a little cold,” Decisions selects `temperature_up`, `none`, and `no`. Raise the temperature and read back the actual setting. Suppose the dashboard now shows a target of 22 °C in automatic mode, with the defogger off. Send that confirmed cabin state to Decisions with `decision.item.create`.

```json
{
  "type": "decision.item.create",
  "event_id": "evt_cabin_after_temperature_up_1",
  "item": {
    "type": "message",
    "role": "user",
    "content": [
      {
        "type": "input_text",
        "text": "Use the latest cabin state snapshot as the current state. Cabin temperature is set to 22 °C in automatic mode. Windshield defogger is off."
      }
    ]
  }
}
```

Append a compact snapshot of the full cabin state only when the dashboard state changes. Treat the newest snapshot as current. Keeping earlier inputs in place preserves the prefix for prompt caching.

Wait for `decision.item.created`, then send the result to Live with [`session.commentary.append`](https://developers.openai.com/api/docs/guides/live-delegation#send-the-right-kind-of-update), using the delegation ID from this request.

```json
{
  "type": "session.commentary.append",
  "delegation_id": "del_cabin_1",
  "content": "I raised the cabin temperature and confirmed the new setting on the dashboard."
}
```

For the San Francisco request, Decisions selects `none`, `on`, and `yes`. Turn on the defogger, read back its state, and append the updated cabin snapshot as above. Then call Responses from your server with `api.responses.write` permission. Include the cabin results and the driver’s full request so Responses can connect “there” to San Francisco.

```bash
curl https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6.1-sol",
    "instructions": "The car has handled the cabin controls. Use the tools for the rest of the request, then briefly tell the driver what happened based on the results.",
    "input": "Driver: My windshield is foggy, so please defog it, navigate to San Francisco, and find me some good restaurants there.\nCabin results: Windshield defogger confirmed on. Temperature unchanged.",
    "tools": [
      {
        "type": "function",
        "name": "start_navigation",
        "description": "Start navigation to a destination and report whether the route started.",
        "parameters": {
          "type": "object",
          "properties": { "destination": { "type": "string" } },
          "required": ["destination"],
          "additionalProperties": false
        },
        "strict": true
      },
      {
        "type": "function",
        "name": "find_restaurants",
        "description": "Find well-rated restaurants in the named city or area.",
        "parameters": {
          "type": "object",
          "properties": { "location": { "type": "string" } },
          "required": ["location"],
          "additionalProperties": false
        },
        "strict": true
      }
    ]
  }'
```


This is the initial request in the [Responses function-calling flow](https://developers.openai.com/api/docs/guides/function-calling#handling-function-calls). For each `function_call`, run the named function with the supplied arguments, then return a `function_call_output` with the actual result or error and the matching `call_id`. Continue until Responses returns its final answer.

Send Live only the concise final answer from Responses and the confirmed cabin state. Use `session.commentary.append` with the same `delegation_id`.

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