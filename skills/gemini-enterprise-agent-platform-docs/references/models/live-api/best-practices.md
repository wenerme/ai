> [!NOTE]
> To see examples of using Gemini Live API Native Audio,
> run the following notebooks in the environment of your choice:
>
> - "Getting Started with Gemini Live API Native Audio":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/multimodal-live-api/intro_live_api_native_audio.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fmultimodal-live-api%2Fintro_live_api_native_audio.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/multimodal-live-api/intro_live_api_native_audio.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/multimodal-live-api/intro_live_api_native_audio.ipynb)
> - "Getting Started with Gemini Live API Native Audio using WebSockets":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/multimodal-live-api/intro_live_api_native_audio_websocket.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fmultimodal-live-api%2Fintro_live_api_native_audio_websocket.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/multimodal-live-api/intro_live_api_native_audio_websocket.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/multimodal-live-api/intro_live_api_native_audio_websocket.ipynb)

To get better results from Gemini Live API, focus on the following
best practices:

- [Design clear system instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/best-practices#system-instruction-guidelines)
- [Define tools precisely](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/best-practices#tool-definitions)
- [Craft effective prompts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/best-practices#prompt-design)

## Design clear system instructions

To get the best performance out of Gemini Live API, we recommend having a
clearly-defined set of system instructions (SIs) that defines the agent persona,
conversational rules, and guardrails, in this order.

For best results, separate each agent into a distinct SI.

1. **Specify the agent persona:** Provide detail on the agent's name, role, and
   any preferred characteristics. If you want to specify the accent, be sure to
   also specify the preferred output language (such as a British accent for an
   English speaker).

2. **Specify the conversational rules:** Put these rules in the order you expect
   the model to follow. Delineate between one-time elements of the conversation
   and conversational loops. For example:

   - **One-time element:** Gather a customer's details once (such as name, location, loyalty card number).
   - **Conversational loop:** The user can discuss recommendations, pricing, returns, and delivery, and may want to go from topic to topic. Let the model know that it's OK to engage in this conversational loop for as long as the user wants.
3. **Specify tool calls within a flow in distinct sentences:** For example, if a
   one-time step to gather a customer's details requires invoking a
   `get_user_info` function, you might say: *Your first step is to gather user
   information. First, ask the user to provide their name, location, and loyalty
   card number. Then invoke `get_user_info` with these details.*

4. **Add any necessary guardrails:** Provide any general conversational
   guardrails you don't want the model to do. Feel free to provide specific
   examples of if *x* happens, you want the model to do *y* . If you're still not
   getting the preferred level of precision, use the word
   *unmistakably* to guide the model to be precise.

## Define tools precisely

When using tools with Gemini Live API, be specific in your tool definitions.
Be sure to tell Gemini under what conditions a tool call should be
invoked. For more details, see [Tool definitions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/best-practices#tool-definitions-example).

## Craft effective prompts

- **Use clear prompts:** Provide examples of what the model should and
  shouldn't do in the prompts, and try to limit prompts to one prompt per persona
  or role at a time. Instead of lengthy, multi-page prompts, consider using prompt
  chaining instead. The model performs best on tasks with single function calls.

      # Prompt chaining example.
      chainable_long_prompt = """
      You need to perform a sequence of tasks.
      First, you should do task1; after that, task2; later, task3; and finally, task4.
      """

      # New initial prompt
      """
      You need to perform a sequence of tasks. Once you finish the current task, call
      the `get_next_prompt` function to get instructions for the next task.
      """

      PROMPT_LIST = ["Now, do task1", "Now, do task2", "Now, do task3", "Now, do task 4", "all tasks done"]
      def get_next_prompt():
        # Provide this function as a tool to the model.
        for prompt in PROMPT_LIST:
          yield prompt

      # Catch and execute tool call `get_next_prompt` and send the new prompt back to the model.

- **Provide starting commands and information:** Gemini Live API expects
  user input before it responds. To have Gemini Live API initiate the
  conversation, include a prompt asking it to greet the user or begin the
  conversation. Include information about the user to have Gemini Live API
  personalize that greeting.

## Session resumption

1. **Use transparent session resumption** : Configure the connection with `SessionResumptionConfig(transparent=True)` in `genai.types.LiveConnectConfig`. This signals that the client intends to handle session resumption seamlessly, allowing for features like replaying unconsumed messages upon reconnection.

    from google.genai import types

    session_handle: str | None = None

    live_config = types.LiveConnectConfig(
      session_resumption=types.SessionResumptionConfig(
          handle=session_handle,
          transparent=True,
      ),
    )

1. **Maintain and update session handle** :
   Listen for `session_resumption_update` messages from the server. If
   `resumable` is true and a `new_handle` is provided, store this handle. This
   handle is essential for reconnecting to the same session state if a
   disconnection occurs.

2. **Buffer sent messages and prune acknowledged ones** :
   To ensure no client messages are lost during a disconnection, maintain a
   buffer of messages sent to Gemini Live API. The
   `session_resumption_update` message will contain
   `last_consumed_client_message_index` when transparent session resumption is
   enabled, indicating the last message processed by the server. Use this index
   to remove acknowledged messages from the buffer. To track messages
   correctly, the user-managed index must begin at 1, because index 0 indicates
   that `the session is not resumable`. Each subsequent message sent to the model
   should increment this index by 1. Upon each
   session resumption, ensure that the index is reset to 1 for the initial message
   transmitted using the new connection.

3. **Handle disconnections gracefully**:

   - **GoAway Signal** : The server sends a `go_away` message before an expected disconnection (such as a timeout). The manager should listen for this, and then proactively reconnect using the latest handle.
   - **API Errors** : Network issues can cause `genai_errors.APIError` (for example, codes 1000 or 1006 for WebSocket errors). The manager should catch these errors in both sending and receiving loops and trigger the session update or reconnection process.
4. **Implement reconnection with message replay** :
   When a disconnection occurs, create a new session using
   `client.aio.live.connect` with the latest session handle. After establishing
   the new connection, resend any messages in the buffer that were not
   acknowledged by the server before the disconnection.
   The first message sent in the buffer should be marked as
   index 1 for the new connection.

## Enable context window compression

Use `ContextWindowCompressionConfig` to [configure the context window of the session](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session#configure-context-window)
for long sessions, as native audio tokens accumulate rapidly (approximately
25 tokens per second of audio).
> **Warning:** Context compression will cause conversation history loss.

    from google.genai import types

    live_config = types.LiveConnectConfig(
      context_window_compression=types.ContextWindowCompressionConfig(
        trigger_tokens=100_000, # For better clarity
        sliding_window=types.SlidingWindow(target_tokens=4_000),
      ),
    )

## Token usage calculation

The Gemini Live API billing structure is detailed on the
[pricing page](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#live-sessions).
During each turn, the API bills for all context tokens, which encompasses
both the conversation history and the system instruction provided by the user.
Developers can monitor and calculate these charges by extracting the
`usage_metadata` field provided in the model's response.

    # Example code to get token usage
    from google.genai import live

    session: live.AsyncSession
    async for response in session.receive():
      if response.usage_metadata is not None:
        print("Token usage:", response.usage_metadata)

## Voice activity detection (VAD)

By default, the Gemini Live API uses the VAD provided by Gemini.

While utilizing the Gemini Live API VAD, you can configure the model to
return VAD events explicitly. By enabling `explicit_vad_signal` in your
configuration, you can then monitor and capture these events directly from the
model's responses.

    from google.genai import types
    from google.genai import live

    live_config = types.LiveConnectConfig(
      explicit_vad_signal=True
    )

    session: live.AsyncSession
    # In receive loop
    async for response in session.receive():
      if response.voice_activity is not None:
        print("Get VAD event", response.voice_activity)

If you prefer to use a custom activity detection system, you must deactivate
the default [Voice Activity Detection (VAD)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-language-voice#voice-activity-detection)
and manually signal the user turns to the Gemini model. This is
accomplished by transmitting `ActivityStart` or `ActivityEnd` events to define
the interaction boundaries.

    from google.genai import live
    from google.genai import types

    # Disable VAD in config
    live_config = types.LiveConnectConfig(
      realtime_input_config=types.RealtimeInputConfig(
        automatic_activity_detection=types.AutomaticActivityDetection(
            disabled=True
        ),
      ),
    )

    session: live.AsyncSession
    await session.send_realtime_input( # Send activity start
        activity_start=types.ActivityStart()
    )
    for audio_bytes in bytes_to_send_queue: # Send user data
        await session.send_realtime_input(
            audio=types.Blob(
                data=audio_bytes,
                mime_type=f"audio/pcm;rate=16000",
            )
        )
    await session.send_realtime_input(activity_end=types.ActivityEnd()) # Send activity end

## Set audio language code

Explicitly
[setting the language and voice](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-language-voice#set-language-voice)
code in your configuration is recommended to maintain consistency; without this
definition, Gemini might alter the conversation language depending on
the provided context.

    from google.genai import types

    config = types.LiveConnectConfig(
      speech_config=types.SpeechConfig(
        language_code="en-US",
      ),
    )

Also mention the following in the system instruction:

    RESPOND IN {OUTPUT_LANGUAGE}. YOU MUST RESPOND UNMISTAKABLY IN {OUTPUT_LANGUAGE}.

For native audio models like `gemini-live-2.5-flash-native-audio`, you can
improve transcription quality for multilingual automatic speech recognition
(ASR) by providing language hints in your session configuration. For more
information, see
[Enable audio transcription for the session](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/live-api/start-manage-session#enable-audio-transcription).

## Set transcription language code

Specify the transcription language codes to increase the transcription accuracy
using the BCP-47 language code format.
> **Note:** Enabling transcription introduces more tokens.

    from google.genai import types

    config = types.LiveConnectConfig(
      input_audio_transcription=types.AudioTranscriptionConfig(
          language_codes=['en-US']  # This supports multiple language codes.
      ),
      output_audio_transcription=types.AudioTranscriptionConfig(
          language_codes=['en-US']
      ),
    )

## Client buffering

Don't buffer input audio significantly (for example, 1 second) before sending.
Send small chunks (between 20 ms and 40 ms) to minimize latency.

## Resampling

Ensure your client application resamples microphone input (often 44.1 kHz or
48 kHz) to 16 kHz before transmission.

## Example

This example combines both the best practices and
[guidelines for system instruction design](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/best-practices#system-instruction-guidelines) to
guide the model's performance as a career coach.

    **Persona:**
    You are Laura, a career coach from Brooklyn, NY. You specialize in providing
    data-driven advice to give your clients a fresh perspective on the career
    questions they're navigating. Your special sauce is providing quantitative,
    data-driven insights to help clients think about their issues in a different
    way. You leverage statistics, research, and psychology as much as possible.
    You only speak to your clients in English, no matter what language they speak
    to you in.

    **Conversational Rules:**

    1. **Introduce yourself:** Warmly greet the client.

    2. **Intake:** Ask for your client's full name, date of birth, and state they're
    calling in from. Call `create_client_profile` to create a new patient profile.

    3. **Discuss the client's issue:** Get a sense of what the client wants to
    cover in the session. DO NOT repeat what the client is saying back to them in
    your response. Don't ask more than a few questions here.

    4. **Reframe the client's issue with real data:** NO PLATITUDES. Start providing
    data-driven insights for the client, but embed these as general facts within
    conversation. This is what they're coming to you for: your unique thinking on
    the subjects that are stressing them out. Show them a new way of thinking about
    something. Let this step go on for as long as the client wants. As part of this,
    if the client mentions wanting to take any actions, update
    `add_action_items_to_profile` to remind the client later.

    5. **Next appointment:** Call `get_next_appointment` to see if another
    appointment has already been scheduled for the client. If so, then share the
    date and time with the client and confirm if they'll be able to attend. If
    there is no appointment, then call `get_available_appointments` to see openings.
    Share the list of openings with the client and ask what they would prefer. Save
    their preference with `schedule_appointment`. If the client prefers to schedule
    offline, then let them know that's perfectly fine and to use the patient portal.

    **General Guidelines:** You're meant to be a witty, snappy conversational
    partner. Keep your responses short and progressively disclose more information
    if the client requests it. Don't repeat what the client says back to them.
    Each of your responses should add to the conversation, not just recap what
    the client said. Be relatable by bringing in your own background
    growing up professionally in Brooklyn, NY. If a client tries to get you off
    track, gently bring them back to the workflow articulated above.

    **Guardrails:** If the client is being hard on themselves, never encourage that.
    Remember that your ultimate goal is to create a supportive environment for your
    clients to thrive.

### Tool definitions

This JSON defines the relevant functions called in the career coach example.
For best results when defining functions, include their names, descriptions,
parameters, and invocation conditions.

    [
     {
       "name": "create_client_profile",
       "description": "Creates a new client profile with their personal details. Returns a unique client ID. \n**Invocation Condition:** Invoke this tool *only after* the client has provided their full name, date of birth, AND state. This should only be called once at the beginning of the 'Intake' step.",
       "parameters": {
         "type": "object",
         "properties": {
           "full_name": {
             "type": "string",
             "description": "The client's full name."
           },
           "date_of_birth": {
             "type": "string",
             "description": "The client's date of birth in YYYY-MM-DD format."
           },
           "state": {
             "type": "string",
             "description": "The 2-letter postal abbreviation for the client's state (e.g., 'NY', 'CA')."
           }
         },
         "required": ["full_name", "date_of_birth", "state"]
       }
     },
     {
       "name": "add_action_items_to_profile",
       "description": "Adds a list of actionable next steps to a client's profile using their client ID. \n**Invocation Condition:** Invoke this tool *only after* a list of actionable next steps has been discussed and agreed upon with the client during the 'Actions' step. Requires the `client_id` obtained from the start of the session.",
       "parameters": {
         "type": "object",
         "properties": {
           "client_id": {
             "type": "string",
             "description": "The unique ID of the client, obtained from create_client_profile."
           },
           "action_items": {
             "type": "array",
             "items": {
               "type": "string"
             },
             "description": "A list of action items for the client (e.g., ['Update resume', 'Research three companies'])."
           }
         },
         "required": ["client_id", "action_items"]
       }
     },
     {
       "name": "get_next_appointment",
       "description": "Checks if a client has a future appointment already scheduled using their client ID. Returns the appointment details or null. \n**Invocation Condition:** Invoke this tool at the *start* of the 'Next Appointment' workflow step, immediately after the 'Actions' step is complete. This is used to check if an appointment *already exists*.",
       "parameters": {
         "type": "object",
         "properties": {
           "client_id": {
             "type": "string",
             "description": "The unique ID of the client."
           }
         },
         "required": ["client_id"]
       }
     },
     {
       "name": "get_available_appointments",
       "description": "Fetches a list of the next available appointment slots. \n**Invocation Condition:** Invoke this tool *only if* the `get_next_appointment` tool was called and it returned `null` (or an empty response), indicating no future appointment is scheduled.",
       "parameters": {
         "type": "object",
         "properties": {}
       }
     },
     {
       "name": "schedule_appointment",
       "description": "Books a new appointment for a client at a specific date and time. \n**Invocation Condition:** Invoke this tool *only after* `get_available_appointments` has been called, a list of openings has been presented to the client, and the client has *explicitly confirmed* which specific date and time they want to book.",
       "parameters": {
         "type": "object",
         "properties": {
           "client_id": {
             "type": "string",
             "description": "The unique ID of the client."
           },
           "appointment_datetime": {
             "type": "string",
             "description": "The chosen appointment slot in ISO 8601 format (e.g., '2025-10-30T14:30:00')."
           }
         },
         "required": ["client_id", "appointment_datetime"]
       }
     }
    ]

## More information

For more information on using Gemini Live API, see:

- [Gemini Live API overview page](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api)
- [Gemini Live API reference guide](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-live)
- [Start and manage live sessions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session)
- [Configure Gemini capabilities](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-gemini-capabilities)
