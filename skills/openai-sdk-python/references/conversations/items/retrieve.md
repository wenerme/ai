## Retrieve

`conversations.items.retrieve(stritem_id, ItemRetrieveParams**kwargs)  -> ConversationItem`

**get** `/conversations/{conversation_id}/items/{item_id}`

Get a single item from a conversation with the given IDs.

### Parameters

- `conversation_id: str`

- `item_id: str`

- `include: Optional[List[ResponseIncludable]]`

  Additional fields to include in the response. See the `include`
  parameter for [listing Conversation items above](https://platform.openai.com/docs/api-reference/conversations/list-items#conversations_list_items-include) for more information.

  - `"file_search_call.results"`

  - `"web_search_call.results"`

  - `"web_search_call.action.sources"`

  - `"message.input_image.image_url"`

  - `"computer_call_output.output.image_url"`

  - `"code_interpreter_call.outputs"`

  - `"reasoning.encrypted_content"`

  - `"message.output_text.logprobs"`

### Returns

- `ConversationItem`

  A single item within a conversation. The set of possible types are the same as the `output` type of a [Response object](https://platform.openai.com/docs/api-reference/responses/object#responses/object-output).

  - `class Message: …`

    A message to or from the model.

    - `id: str`

      The unique ID of the message.

    - `content: List[Content]`

      The content of the message

      - `class ResponseInputText: …`

        A text input to the model.

        - `text: str`

          The text input to the model.

        - `type: Literal["input_text"]`

          The type of the input item. Always `input_text`.

          - `"input_text"`

      - `class ResponseOutputText: …`

        A text output from the model.

        - `annotations: List[Annotation]`

          The annotations of the text output.

          - `class AnnotationFileCitation: …`

            A citation to a file.

            - `file_id: str`

              The ID of the file.

            - `filename: str`

              The filename of the file cited.

            - `index: int`

              The index of the file in the list of files.

            - `type: Literal["file_citation"]`

              The type of the file citation. Always `file_citation`.

              - `"file_citation"`

          - `class AnnotationURLCitation: …`

            A citation for a web resource used to generate a model response.

            - `end_index: int`

              The index of the last character of the URL citation in the message.

            - `start_index: int`

              The index of the first character of the URL citation in the message.

            - `title: str`

              The title of the web resource.

            - `type: Literal["url_citation"]`

              The type of the URL citation. Always `url_citation`.

              - `"url_citation"`

            - `url: str`

              The URL of the web resource.

          - `class AnnotationContainerFileCitation: …`

            A citation for a container file used to generate a model response.

            - `container_id: str`

              The ID of the container file.

            - `end_index: int`

              The index of the last character of the container file citation in the message.

            - `file_id: str`

              The ID of the file.

            - `filename: str`

              The filename of the container file cited.

            - `start_index: int`

              The index of the first character of the container file citation in the message.

            - `type: Literal["container_file_citation"]`

              The type of the container file citation. Always `container_file_citation`.

              - `"container_file_citation"`

          - `class AnnotationFilePath: …`

            A path to a file.

            - `file_id: str`

              The ID of the file.

            - `index: int`

              The index of the file in the list of files.

            - `type: Literal["file_path"]`

              The type of the file path. Always `file_path`.

              - `"file_path"`

        - `text: str`

          The text output from the model.

        - `type: Literal["output_text"]`

          The type of the output text. Always `output_text`.

          - `"output_text"`

        - `logprobs: Optional[List[Logprob]]`

          - `token: str`

          - `bytes: List[int]`

          - `logprob: float`

          - `top_logprobs: List[LogprobTopLogprob]`

            - `token: str`

            - `bytes: List[int]`

            - `logprob: float`

      - `class TextContent: …`

        A text content.

        - `text: str`

        - `type: Literal["text"]`

          - `"text"`

      - `class SummaryTextContent: …`

        A summary text from the model.

        - `text: str`

          A summary of the reasoning output from the model so far.

        - `type: Literal["summary_text"]`

          The type of the object. Always `summary_text`.

          - `"summary_text"`

      - `class ContentReasoningText: …`

        Reasoning text from the model.

        - `text: str`

          The reasoning text from the model.

        - `type: Literal["reasoning_text"]`

          The type of the reasoning text. Always `reasoning_text`.

          - `"reasoning_text"`

      - `class ResponseOutputRefusal: …`

        A refusal from the model.

        - `refusal: str`

          The refusal explanation from the model.

        - `type: Literal["refusal"]`

          The type of the refusal. Always `refusal`.

          - `"refusal"`

      - `class ResponseInputImage: …`

        An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

        - `detail: Literal["low", "high", "auto"]`

          The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

          - `"low"`

          - `"high"`

          - `"auto"`

        - `type: Literal["input_image"]`

          The type of the input item. Always `input_image`.

          - `"input_image"`

        - `file_id: Optional[str]`

          The ID of the file to be sent to the model.

        - `image_url: Optional[str]`

          The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

      - `class ComputerScreenshotContent: …`

        A screenshot of a computer.

        - `file_id: Optional[str]`

          The identifier of an uploaded file that contains the screenshot.

        - `image_url: Optional[str]`

          The URL of the screenshot image.

        - `type: Literal["computer_screenshot"]`

          Specifies the event type. For a computer screenshot, this property is always set to `computer_screenshot`.

          - `"computer_screenshot"`

      - `class ResponseInputFile: …`

        A file input to the model.

        - `type: Literal["input_file"]`

          The type of the input item. Always `input_file`.

          - `"input_file"`

        - `file_data: Optional[str]`

          The content of the file to be sent to the model.

        - `file_id: Optional[str]`

          The ID of the file to be sent to the model.

        - `file_url: Optional[str]`

          The URL of the file to be sent to the model.

        - `filename: Optional[str]`

          The name of the file to be sent to the model.

    - `role: Literal["unknown", "user", "assistant", 5 more]`

      The role of the message. One of `unknown`, `user`, `assistant`, `system`, `critic`, `discriminator`, `developer`, or `tool`.

      - `"unknown"`

      - `"user"`

      - `"assistant"`

      - `"system"`

      - `"critic"`

      - `"discriminator"`

      - `"developer"`

      - `"tool"`

    - `status: Literal["in_progress", "completed", "incomplete"]`

      The status of item. One of `in_progress`, `completed`, or `incomplete`. Populated when items are returned via API.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: Literal["message"]`

      The type of the message. Always set to `message`.

      - `"message"`

  - `class ResponseFunctionToolCallItem: …`

    A tool call to run a function. See the
    [function calling guide](https://platform.openai.com/docs/guides/function-calling) for more information.

    - `id: str`

      The unique ID of the function tool call.

  - `class ResponseFunctionToolCallOutputItem: …`

    - `id: str`

      The unique ID of the function call tool output.

    - `call_id: str`

      The unique ID of the function tool call generated by the model.

    - `output: Union[str, List[OutputOutputContentList]]`

      The output from the function call generated by your code.
      Can be a string or an list of output content.

      - `str`

        A string of the output of the function call.

      - `List[OutputOutputContentList]`

        Text, image, or file output of the function call.

        - `class ResponseInputText: …`

          A text input to the model.

          - `text: str`

            The text input to the model.

          - `type: Literal["input_text"]`

            The type of the input item. Always `input_text`.

            - `"input_text"`

        - `class ResponseInputImage: …`

          An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

          - `detail: Literal["low", "high", "auto"]`

            The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

            - `"low"`

            - `"high"`

            - `"auto"`

          - `type: Literal["input_image"]`

            The type of the input item. Always `input_image`.

            - `"input_image"`

          - `file_id: Optional[str]`

            The ID of the file to be sent to the model.

          - `image_url: Optional[str]`

            The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

        - `class ResponseInputFile: …`

          A file input to the model.

          - `type: Literal["input_file"]`

            The type of the input item. Always `input_file`.

            - `"input_file"`

          - `file_data: Optional[str]`

            The content of the file to be sent to the model.

          - `file_id: Optional[str]`

            The ID of the file to be sent to the model.

          - `file_url: Optional[str]`

            The URL of the file to be sent to the model.

          - `filename: Optional[str]`

            The name of the file to be sent to the model.

    - `type: Literal["function_call_output"]`

      The type of the function tool call output. Always `function_call_output`.

      - `"function_call_output"`

    - `status: Optional[Literal["in_progress", "completed", "incomplete"]]`

      The status of the item. One of `in_progress`, `completed`, or
      `incomplete`. Populated when items are returned via API.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

  - `class ResponseFileSearchToolCall: …`

    The results of a file search tool call. See the
    [file search guide](https://platform.openai.com/docs/guides/tools-file-search) for more information.

    - `id: str`

      The unique ID of the file search tool call.

    - `queries: List[str]`

      The queries used to search for files.

    - `status: Literal["in_progress", "searching", "completed", 2 more]`

      The status of the file search tool call. One of `in_progress`,
      `searching`, `incomplete` or `failed`,

      - `"in_progress"`

      - `"searching"`

      - `"completed"`

      - `"incomplete"`

      - `"failed"`

    - `type: Literal["file_search_call"]`

      The type of the file search tool call. Always `file_search_call`.

      - `"file_search_call"`

    - `results: Optional[List[Result]]`

      The results of the file search tool call.

      - `attributes: Optional[Dict[str, Union[str, float, bool]]]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard. Keys are strings
        with a maximum length of 64 characters. Values are strings with a maximum
        length of 512 characters, booleans, or numbers.

        - `str`

        - `float`

        - `bool`

      - `file_id: Optional[str]`

        The unique ID of the file.

      - `filename: Optional[str]`

        The name of the file.

      - `score: Optional[float]`

        The relevance score of the file - a value between 0 and 1.

      - `text: Optional[str]`

        The text that was retrieved from the file.

  - `class ResponseFunctionWebSearch: …`

    The results of a web search tool call. See the
    [web search guide](https://platform.openai.com/docs/guides/tools-web-search) for more information.

    - `id: str`

      The unique ID of the web search tool call.

    - `action: Action`

      An object describing the specific action taken in this web search call.
      Includes details on how the model used the web (search, open_page, find_in_page).

      - `class ActionSearch: …`

        Action type "search" - Performs a web search query.

        - `query: str`

          [DEPRECATED] The search query.

        - `type: Literal["search"]`

          The action type.

          - `"search"`

        - `queries: Optional[List[str]]`

          The search queries.

        - `sources: Optional[List[ActionSearchSource]]`

          The sources used in the search.

          - `type: Literal["url"]`

            The type of source. Always `url`.

            - `"url"`

          - `url: str`

            The URL of the source.

      - `class ActionOpenPage: …`

        Action type "open_page" - Opens a specific URL from search results.

        - `type: Literal["open_page"]`

          The action type.

          - `"open_page"`

        - `url: Optional[str]`

          The URL opened by the model.

      - `class ActionFindInPage: …`

        Action type "find_in_page": Searches for a pattern within a loaded page.

        - `pattern: str`

          The pattern or text to search for within the page.

        - `type: Literal["find_in_page"]`

          The action type.

          - `"find_in_page"`

        - `url: str`

          The URL of the page searched for the pattern.

    - `status: Literal["in_progress", "searching", "completed", "failed"]`

      The status of the web search tool call.

      - `"in_progress"`

      - `"searching"`

      - `"completed"`

      - `"failed"`

    - `type: Literal["web_search_call"]`

      The type of the web search tool call. Always `web_search_call`.

      - `"web_search_call"`

  - `class ImageGenerationCall: …`

    An image generation request made by the model.

    - `id: str`

      The unique ID of the image generation call.

    - `result: Optional[str]`

      The generated image encoded in base64.

    - `status: Literal["in_progress", "completed", "generating", "failed"]`

      The status of the image generation call.

      - `"in_progress"`

      - `"completed"`

      - `"generating"`

      - `"failed"`

    - `type: Literal["image_generation_call"]`

      The type of the image generation call. Always `image_generation_call`.

      - `"image_generation_call"`

  - `class ResponseComputerToolCall: …`

    A tool call to a computer use tool. See the
    [computer use guide](https://platform.openai.com/docs/guides/tools-computer-use) for more information.

    - `id: str`

      The unique ID of the computer call.

    - `action: Action`

      A click action.

      - `class ActionClick: …`

        A click action.

        - `button: Literal["left", "right", "wheel", 2 more]`

          Indicates which mouse button was pressed during the click. One of `left`, `right`, `wheel`, `back`, or `forward`.

          - `"left"`

          - `"right"`

          - `"wheel"`

          - `"back"`

          - `"forward"`

        - `type: Literal["click"]`

          Specifies the event type. For a click action, this property is always `click`.

          - `"click"`

        - `x: int`

          The x-coordinate where the click occurred.

        - `y: int`

          The y-coordinate where the click occurred.

      - `class ActionDoubleClick: …`

        A double click action.

        - `type: Literal["double_click"]`

          Specifies the event type. For a double click action, this property is always set to `double_click`.

          - `"double_click"`

        - `x: int`

          The x-coordinate where the double click occurred.

        - `y: int`

          The y-coordinate where the double click occurred.

      - `class ActionDrag: …`

        A drag action.

        - `path: List[ActionDragPath]`

          An array of coordinates representing the path of the drag action. Coordinates will appear as an array of objects, eg

          ```
          [
            { x: 100, y: 200 },
            { x: 200, y: 300 }
          ]
          ```

          - `x: int`

            The x-coordinate.

          - `y: int`

            The y-coordinate.

        - `type: Literal["drag"]`

          Specifies the event type. For a drag action, this property is always set to `drag`.

          - `"drag"`

      - `class ActionKeypress: …`

        A collection of keypresses the model would like to perform.

        - `keys: List[str]`

          The combination of keys the model is requesting to be pressed. This is an array of strings, each representing a key.

        - `type: Literal["keypress"]`

          Specifies the event type. For a keypress action, this property is always set to `keypress`.

          - `"keypress"`

      - `class ActionMove: …`

        A mouse move action.

        - `type: Literal["move"]`

          Specifies the event type. For a move action, this property is always set to `move`.

          - `"move"`

        - `x: int`

          The x-coordinate to move to.

        - `y: int`

          The y-coordinate to move to.

      - `class ActionScreenshot: …`

        A screenshot action.

        - `type: Literal["screenshot"]`

          Specifies the event type. For a screenshot action, this property is always set to `screenshot`.

          - `"screenshot"`

      - `class ActionScroll: …`

        A scroll action.

        - `scroll_x: int`

          The horizontal scroll distance.

        - `scroll_y: int`

          The vertical scroll distance.

        - `type: Literal["scroll"]`

          Specifies the event type. For a scroll action, this property is always set to `scroll`.

          - `"scroll"`

        - `x: int`

          The x-coordinate where the scroll occurred.

        - `y: int`

          The y-coordinate where the scroll occurred.

      - `class ActionType: …`

        An action to type in text.

        - `text: str`

          The text to type.

        - `type: Literal["type"]`

          Specifies the event type. For a type action, this property is always set to `type`.

          - `"type"`

      - `class ActionWait: …`

        A wait action.

        - `type: Literal["wait"]`

          Specifies the event type. For a wait action, this property is always set to `wait`.

          - `"wait"`

    - `call_id: str`

      An identifier used when responding to the tool call with output.

    - `pending_safety_checks: List[PendingSafetyCheck]`

      The pending safety checks for the computer call.

      - `id: str`

        The ID of the pending safety check.

      - `code: Optional[str]`

        The type of the pending safety check.

      - `message: Optional[str]`

        Details about the pending safety check.

    - `status: Literal["in_progress", "completed", "incomplete"]`

      The status of the item. One of `in_progress`, `completed`, or
      `incomplete`. Populated when items are returned via API.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: Literal["computer_call"]`

      The type of the computer call. Always `computer_call`.

      - `"computer_call"`

  - `class ResponseComputerToolCallOutputItem: …`

    - `id: str`

      The unique ID of the computer call tool output.

    - `call_id: str`

      The ID of the computer tool call that produced the output.

    - `output: ResponseComputerToolCallOutputScreenshot`

      A computer screenshot image used with the computer use tool.

      - `type: Literal["computer_screenshot"]`

        Specifies the event type. For a computer screenshot, this property is
        always set to `computer_screenshot`.

        - `"computer_screenshot"`

      - `file_id: Optional[str]`

        The identifier of an uploaded file that contains the screenshot.

      - `image_url: Optional[str]`

        The URL of the screenshot image.

    - `type: Literal["computer_call_output"]`

      The type of the computer tool call output. Always `computer_call_output`.

      - `"computer_call_output"`

    - `acknowledged_safety_checks: Optional[List[AcknowledgedSafetyCheck]]`

      The safety checks reported by the API that have been acknowledged by the
      developer.

      - `id: str`

        The ID of the pending safety check.

      - `code: Optional[str]`

        The type of the pending safety check.

      - `message: Optional[str]`

        Details about the pending safety check.

    - `status: Optional[Literal["in_progress", "completed", "incomplete"]]`

      The status of the message input. One of `in_progress`, `completed`, or
      `incomplete`. Populated when input items are returned via API.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

  - `class ResponseReasoningItem: …`

    A description of the chain of thought used by a reasoning model while generating
    a response. Be sure to include these items in your `input` to the Responses API
    for subsequent turns of a conversation if you are manually
    [managing context](https://platform.openai.com/docs/guides/conversation-state).

    - `id: str`

      The unique identifier of the reasoning content.

    - `summary: List[Summary]`

      Reasoning summary content.

      - `text: str`

        A summary of the reasoning output from the model so far.

      - `type: Literal["summary_text"]`

        The type of the object. Always `summary_text`.

        - `"summary_text"`

    - `type: Literal["reasoning"]`

      The type of the object. Always `reasoning`.

      - `"reasoning"`

    - `content: Optional[List[Content]]`

      Reasoning text content.

      - `text: str`

        The reasoning text from the model.

      - `type: Literal["reasoning_text"]`

        The type of the reasoning text. Always `reasoning_text`.

        - `"reasoning_text"`

    - `encrypted_content: Optional[str]`

      The encrypted content of the reasoning item - populated when a response is
      generated with `reasoning.encrypted_content` in the `include` parameter.

    - `status: Optional[Literal["in_progress", "completed", "incomplete"]]`

      The status of the item. One of `in_progress`, `completed`, or
      `incomplete`. Populated when items are returned via API.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

  - `class ResponseCodeInterpreterToolCall: …`

    A tool call to run code.

    - `id: str`

      The unique ID of the code interpreter tool call.

    - `code: Optional[str]`

      The code to run, or null if not available.

    - `container_id: str`

      The ID of the container used to run the code.

    - `outputs: Optional[List[Output]]`

      The outputs generated by the code interpreter, such as logs or images.
      Can be null if no outputs are available.

      - `class OutputLogs: …`

        The logs output from the code interpreter.

        - `logs: str`

          The logs output from the code interpreter.

        - `type: Literal["logs"]`

          The type of the output. Always `logs`.

          - `"logs"`

      - `class OutputImage: …`

        The image output from the code interpreter.

        - `type: Literal["image"]`

          The type of the output. Always `image`.

          - `"image"`

        - `url: str`

          The URL of the image output from the code interpreter.

    - `status: Literal["in_progress", "completed", "incomplete", 2 more]`

      The status of the code interpreter tool call. Valid values are `in_progress`, `completed`, `incomplete`, `interpreting`, and `failed`.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

      - `"interpreting"`

      - `"failed"`

    - `type: Literal["code_interpreter_call"]`

      The type of the code interpreter tool call. Always `code_interpreter_call`.

      - `"code_interpreter_call"`

  - `class LocalShellCall: …`

    A tool call to run a command on the local shell.

    - `id: str`

      The unique ID of the local shell call.

    - `action: LocalShellCallAction`

      Execute a shell command on the server.

      - `command: List[str]`

        The command to run.

      - `env: Dict[str, str]`

        Environment variables to set for the command.

      - `type: Literal["exec"]`

        The type of the local shell action. Always `exec`.

        - `"exec"`

      - `timeout_ms: Optional[int]`

        Optional timeout in milliseconds for the command.

      - `user: Optional[str]`

        Optional user to run the command as.

      - `working_directory: Optional[str]`

        Optional working directory to run the command in.

    - `call_id: str`

      The unique ID of the local shell tool call generated by the model.

    - `status: Literal["in_progress", "completed", "incomplete"]`

      The status of the local shell call.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: Literal["local_shell_call"]`

      The type of the local shell call. Always `local_shell_call`.

      - `"local_shell_call"`

  - `class LocalShellCallOutput: …`

    The output of a local shell tool call.

    - `id: str`

      The unique ID of the local shell tool call generated by the model.

    - `output: str`

      A JSON string of the output of the local shell tool call.

    - `type: Literal["local_shell_call_output"]`

      The type of the local shell tool call output. Always `local_shell_call_output`.

      - `"local_shell_call_output"`

    - `status: Optional[Literal["in_progress", "completed", "incomplete"]]`

      The status of the item. One of `in_progress`, `completed`, or `incomplete`.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

  - `class ResponseFunctionShellToolCall: …`

    A tool call that executes one or more shell commands in a managed environment.

    - `id: str`

      The unique ID of the shell tool call. Populated when this item is returned via API.

    - `action: Action`

      The shell commands and limits that describe how to run the tool call.

      - `commands: List[str]`

      - `max_output_length: Optional[int]`

        Optional maximum number of characters to return from each command.

      - `timeout_ms: Optional[int]`

        Optional timeout in milliseconds for the commands.

    - `call_id: str`

      The unique ID of the shell tool call generated by the model.

    - `environment: Optional[Environment]`

      Represents the use of a local environment to perform shell actions.

      - `class ResponseLocalEnvironment: …`

        Represents the use of a local environment to perform shell actions.

        - `type: Literal["local"]`

          The environment type. Always `local`.

          - `"local"`

      - `class ResponseContainerReference: …`

        Represents a container created with /v1/containers.

        - `container_id: str`

        - `type: Literal["container_reference"]`

          The environment type. Always `container_reference`.

          - `"container_reference"`

    - `status: Literal["in_progress", "completed", "incomplete"]`

      The status of the shell call. One of `in_progress`, `completed`, or `incomplete`.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: Literal["shell_call"]`

      The type of the item. Always `shell_call`.

      - `"shell_call"`

    - `created_by: Optional[str]`

      The ID of the entity that created this tool call.

  - `class ResponseFunctionShellToolCallOutput: …`

    The output of a shell tool call that was emitted.

    - `id: str`

      The unique ID of the shell call output. Populated when this item is returned via API.

    - `call_id: str`

      The unique ID of the shell tool call generated by the model.

    - `max_output_length: Optional[int]`

      The maximum length of the shell command output. This is generated by the model and should be passed back with the raw output.

    - `output: List[Output]`

      An array of shell call output contents

      - `outcome: OutputOutcome`

        Represents either an exit outcome (with an exit code) or a timeout outcome for a shell call output chunk.

        - `class OutputOutcomeTimeout: …`

          Indicates that the shell call exceeded its configured time limit.

          - `type: Literal["timeout"]`

            The outcome type. Always `timeout`.

            - `"timeout"`

        - `class OutputOutcomeExit: …`

          Indicates that the shell commands finished and returned an exit code.

          - `exit_code: int`

            Exit code from the shell process.

          - `type: Literal["exit"]`

            The outcome type. Always `exit`.

            - `"exit"`

      - `stderr: str`

        The standard error output that was captured.

      - `stdout: str`

        The standard output that was captured.

      - `created_by: Optional[str]`

        The identifier of the actor that created the item.

    - `status: Literal["in_progress", "completed", "incomplete"]`

      The status of the shell call output. One of `in_progress`, `completed`, or `incomplete`.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: Literal["shell_call_output"]`

      The type of the shell call output. Always `shell_call_output`.

      - `"shell_call_output"`

    - `created_by: Optional[str]`

      The identifier of the actor that created the item.

  - `class ResponseApplyPatchToolCall: …`

    A tool call that applies file diffs by creating, deleting, or updating files.

    - `id: str`

      The unique ID of the apply patch tool call. Populated when this item is returned via API.

    - `call_id: str`

      The unique ID of the apply patch tool call generated by the model.

    - `operation: Operation`

      One of the create_file, delete_file, or update_file operations applied via apply_patch.

      - `class OperationCreateFile: …`

        Instruction describing how to create a file via the apply_patch tool.

        - `diff: str`

          Diff to apply.

        - `path: str`

          Path of the file to create.

        - `type: Literal["create_file"]`

          Create a new file with the provided diff.

          - `"create_file"`

      - `class OperationDeleteFile: …`

        Instruction describing how to delete a file via the apply_patch tool.

        - `path: str`

          Path of the file to delete.

        - `type: Literal["delete_file"]`

          Delete the specified file.

          - `"delete_file"`

      - `class OperationUpdateFile: …`

        Instruction describing how to update a file via the apply_patch tool.

        - `diff: str`

          Diff to apply.

        - `path: str`

          Path of the file to update.

        - `type: Literal["update_file"]`

          Update an existing file with the provided diff.

          - `"update_file"`

    - `status: Literal["in_progress", "completed"]`

      The status of the apply patch tool call. One of `in_progress` or `completed`.

      - `"in_progress"`

      - `"completed"`

    - `type: Literal["apply_patch_call"]`

      The type of the item. Always `apply_patch_call`.

      - `"apply_patch_call"`

    - `created_by: Optional[str]`

      The ID of the entity that created this tool call.

  - `class ResponseApplyPatchToolCallOutput: …`

    The output emitted by an apply patch tool call.

    - `id: str`

      The unique ID of the apply patch tool call output. Populated when this item is returned via API.

    - `call_id: str`

      The unique ID of the apply patch tool call generated by the model.

    - `status: Literal["completed", "failed"]`

      The status of the apply patch tool call output. One of `completed` or `failed`.

      - `"completed"`

      - `"failed"`

    - `type: Literal["apply_patch_call_output"]`

      The type of the item. Always `apply_patch_call_output`.

      - `"apply_patch_call_output"`

    - `created_by: Optional[str]`

      The ID of the entity that created this tool call output.

    - `output: Optional[str]`

      Optional textual output returned by the apply patch tool.

  - `class McpListTools: …`

    A list of tools available on an MCP server.

    - `id: str`

      The unique ID of the list.

    - `server_label: str`

      The label of the MCP server.

    - `tools: List[McpListToolsTool]`

      The tools available on the server.

      - `input_schema: object`

        The JSON schema describing the tool's input.

      - `name: str`

        The name of the tool.

      - `annotations: Optional[object]`

        Additional annotations about the tool.

      - `description: Optional[str]`

        The description of the tool.

    - `type: Literal["mcp_list_tools"]`

      The type of the item. Always `mcp_list_tools`.

      - `"mcp_list_tools"`

    - `error: Optional[str]`

      Error message if the server could not list tools.

  - `class McpApprovalRequest: …`

    A request for human approval of a tool invocation.

    - `id: str`

      The unique ID of the approval request.

    - `arguments: str`

      A JSON string of arguments for the tool.

    - `name: str`

      The name of the tool to run.

    - `server_label: str`

      The label of the MCP server making the request.

    - `type: Literal["mcp_approval_request"]`

      The type of the item. Always `mcp_approval_request`.

      - `"mcp_approval_request"`

  - `class McpApprovalResponse: …`

    A response to an MCP approval request.

    - `id: str`

      The unique ID of the approval response

    - `approval_request_id: str`

      The ID of the approval request being answered.

    - `approve: bool`

      Whether the request was approved.

    - `type: Literal["mcp_approval_response"]`

      The type of the item. Always `mcp_approval_response`.

      - `"mcp_approval_response"`

    - `reason: Optional[str]`

      Optional reason for the decision.

  - `class McpCall: …`

    An invocation of a tool on an MCP server.

    - `id: str`

      The unique ID of the tool call.

    - `arguments: str`

      A JSON string of the arguments passed to the tool.

    - `name: str`

      The name of the tool that was run.

    - `server_label: str`

      The label of the MCP server running the tool.

    - `type: Literal["mcp_call"]`

      The type of the item. Always `mcp_call`.

      - `"mcp_call"`

    - `approval_request_id: Optional[str]`

      Unique identifier for the MCP tool call approval request.
      Include this value in a subsequent `mcp_approval_response` input to approve or reject the corresponding tool call.

    - `error: Optional[str]`

      The error from the tool call, if any.

    - `output: Optional[str]`

      The output from the tool call.

    - `status: Optional[Literal["in_progress", "completed", "incomplete", 2 more]]`

      The status of the tool call. One of `in_progress`, `completed`, `incomplete`, `calling`, or `failed`.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

      - `"calling"`

      - `"failed"`

  - `class ResponseCustomToolCall: …`

    A call to a custom tool created by the model.

    - `call_id: str`

      An identifier used to map this custom tool call to a tool call output.

    - `input: str`

      The input for the custom tool call generated by the model.

    - `name: str`

      The name of the custom tool being called.

    - `type: Literal["custom_tool_call"]`

      The type of the custom tool call. Always `custom_tool_call`.

      - `"custom_tool_call"`

    - `id: Optional[str]`

      The unique ID of the custom tool call in the OpenAI platform.

  - `class ResponseCustomToolCallOutput: …`

    The output of a custom tool call from your code, being sent back to the model.

    - `call_id: str`

      The call ID, used to map this custom tool call output to a custom tool call.

    - `output: Union[str, List[OutputOutputContentList]]`

      The output from the custom tool call generated by your code.
      Can be a string or an list of output content.

      - `str`

        A string of the output of the custom tool call.

      - `List[OutputOutputContentList]`

        Text, image, or file output of the custom tool call.

        - `class ResponseInputText: …`

          A text input to the model.

          - `text: str`

            The text input to the model.

          - `type: Literal["input_text"]`

            The type of the input item. Always `input_text`.

            - `"input_text"`

        - `class ResponseInputImage: …`

          An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

          - `detail: Literal["low", "high", "auto"]`

            The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

            - `"low"`

            - `"high"`

            - `"auto"`

          - `type: Literal["input_image"]`

            The type of the input item. Always `input_image`.

            - `"input_image"`

          - `file_id: Optional[str]`

            The ID of the file to be sent to the model.

          - `image_url: Optional[str]`

            The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

        - `class ResponseInputFile: …`

          A file input to the model.

          - `type: Literal["input_file"]`

            The type of the input item. Always `input_file`.

            - `"input_file"`

          - `file_data: Optional[str]`

            The content of the file to be sent to the model.

          - `file_id: Optional[str]`

            The ID of the file to be sent to the model.

          - `file_url: Optional[str]`

            The URL of the file to be sent to the model.

          - `filename: Optional[str]`

            The name of the file to be sent to the model.

    - `type: Literal["custom_tool_call_output"]`

      The type of the custom tool call output. Always `custom_tool_call_output`.

      - `"custom_tool_call_output"`

    - `id: Optional[str]`

      The unique ID of the custom tool call output in the OpenAI platform.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
conversation_item = client.conversations.items.retrieve(
    item_id="msg_abc",
    conversation_id="conv_123",
)
print(conversation_item)
```
