## List

`responses.input_items.list(strresponse_id, InputItemListParams**kwargs)  -> SyncCursorPage[ResponseItem]`

**get** `/responses/{response_id}/input_items`

Returns a list of input items for a given response.

### Parameters

- `response_id: str`

- `after: Optional[str]`

  An item ID to list items after, used in pagination.

- `include: Optional[List[ResponseIncludable]]`

  Additional fields to include in the response. See the `include`
  parameter for Response creation above for more information.

  - `"file_search_call.results"`

  - `"web_search_call.results"`

  - `"web_search_call.action.sources"`

  - `"message.input_image.image_url"`

  - `"computer_call_output.output.image_url"`

  - `"code_interpreter_call.outputs"`

  - `"reasoning.encrypted_content"`

  - `"message.output_text.logprobs"`

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between
  1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  The order to return the input items in. Default is `desc`.

  - `asc`: Return the input items in ascending order.
  - `desc`: Return the input items in descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `ResponseItem`

  Content item used to generate a response.

  - `class ResponseInputMessageItem: …`

    - `id: str`

      The unique ID of the message input.

    - `content: ResponseInputMessageContentList`

      A list of one or many input items to the model, containing different content
      types.

      - `class ResponseInputText: …`

        A text input to the model.

        - `text: str`

          The text input to the model.

        - `type: Literal["input_text"]`

          The type of the input item. Always `input_text`.

          - `"input_text"`

      - `class ResponseInputImage: …`

        An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

        - `detail: Literal["low", "high", "auto", "original"]`

          The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

          - `"low"`

          - `"high"`

          - `"auto"`

          - `"original"`

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

        - `detail: Optional[Literal["low", "high"]]`

          The detail level of the file to be sent to the model. One of `high` or `low`. Defaults to `high`.

          - `"low"`

          - `"high"`

        - `file_data: Optional[str]`

          The content of the file to be sent to the model.

        - `file_id: Optional[str]`

          The ID of the file to be sent to the model.

        - `file_url: Optional[str]`

          The URL of the file to be sent to the model.

        - `filename: Optional[str]`

          The name of the file to be sent to the model.

    - `role: Literal["user", "system", "developer"]`

      The role of the message input. One of `user`, `system`, or `developer`.

      - `"user"`

      - `"system"`

      - `"developer"`

    - `status: Optional[Literal["in_progress", "completed", "incomplete"]]`

      The status of item. One of `in_progress`, `completed`, or
      `incomplete`. Populated when items are returned via API.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: Optional[Literal["message"]]`

      The type of the message input. Always set to `message`.

      - `"message"`

  - `class ResponseOutputMessage: …`

    An output message from the model.

    - `id: str`

      The unique ID of the output message.

    - `content: List[Content]`

      The content of the output message.

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

      - `class ResponseOutputRefusal: …`

        A refusal from the model.

        - `refusal: str`

          The refusal explanation from the model.

        - `type: Literal["refusal"]`

          The type of the refusal. Always `refusal`.

          - `"refusal"`

    - `role: Literal["assistant"]`

      The role of the output message. Always `assistant`.

      - `"assistant"`

    - `status: Literal["in_progress", "completed", "incomplete"]`

      The status of the message input. One of `in_progress`, `completed`, or
      `incomplete`. Populated when input items are returned via API.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: Literal["message"]`

      The type of the output message. Always `message`.

      - `"message"`

    - `phase: Optional[Literal["commentary", "final_answer"]]`

      Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
      For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
      phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

      - `"commentary"`

      - `"final_answer"`

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

  - `class ResponseComputerToolCall: …`

    A tool call to a computer use tool. See the
    [computer use guide](https://platform.openai.com/docs/guides/tools-computer-use) for more information.

    - `id: str`

      The unique ID of the computer call.

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

    - `action: Optional[Action]`

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

    - `actions: Optional[ComputerActionList]`

      Flattened batched actions for `computer_use`. Each action includes an
      `type` discriminator and action-specific fields.

      - `class Click: …`

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

      - `class DoubleClick: …`

        A double click action.

        - `type: Literal["double_click"]`

          Specifies the event type. For a double click action, this property is always set to `double_click`.

          - `"double_click"`

        - `x: int`

          The x-coordinate where the double click occurred.

        - `y: int`

          The y-coordinate where the double click occurred.

      - `class Drag: …`

        A drag action.

        - `path: List[DragPath]`

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

      - `class Keypress: …`

        A collection of keypresses the model would like to perform.

        - `keys: List[str]`

          The combination of keys the model is requesting to be pressed. This is an array of strings, each representing a key.

        - `type: Literal["keypress"]`

          Specifies the event type. For a keypress action, this property is always set to `keypress`.

          - `"keypress"`

      - `class Move: …`

        A mouse move action.

        - `type: Literal["move"]`

          Specifies the event type. For a move action, this property is always set to `move`.

          - `"move"`

        - `x: int`

          The x-coordinate to move to.

        - `y: int`

          The y-coordinate to move to.

      - `class Screenshot: …`

        A screenshot action.

        - `type: Literal["screenshot"]`

          Specifies the event type. For a screenshot action, this property is always set to `screenshot`.

          - `"screenshot"`

      - `class Scroll: …`

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

      - `class Type: …`

        An action to type in text.

        - `text: str`

          The text to type.

        - `type: Literal["type"]`

          Specifies the event type. For a type action, this property is always set to `type`.

          - `"type"`

      - `class Wait: …`

        A wait action.

        - `type: Literal["wait"]`

          Specifies the event type. For a wait action, this property is always set to `wait`.

          - `"wait"`

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

          - `detail: Literal["low", "high", "auto", "original"]`

            The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

            - `"low"`

            - `"high"`

            - `"auto"`

            - `"original"`

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

          - `detail: Optional[Literal["low", "high"]]`

            The detail level of the file to be sent to the model. One of `high` or `low`. Defaults to `high`.

            - `"low"`

            - `"high"`

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

  - `class ResponseToolSearchCall: …`

    - `id: str`

      The unique ID of the tool search call item.

    - `arguments: object`

      Arguments used for the tool search call.

    - `call_id: Optional[str]`

      The unique ID of the tool search call generated by the model.

    - `execution: Literal["server", "client"]`

      Whether tool search was executed by the server or by the client.

      - `"server"`

      - `"client"`

    - `status: Literal["in_progress", "completed", "incomplete"]`

      The status of the tool search call item that was recorded.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: Literal["tool_search_call"]`

      The type of the item. Always `tool_search_call`.

      - `"tool_search_call"`

    - `created_by: Optional[str]`

      The identifier of the actor that created the item.

  - `class ResponseToolSearchOutputItem: …`

    - `id: str`

      The unique ID of the tool search output item.

    - `call_id: Optional[str]`

      The unique ID of the tool search call generated by the model.

    - `execution: Literal["server", "client"]`

      Whether tool search was executed by the server or by the client.

      - `"server"`

      - `"client"`

    - `status: Literal["in_progress", "completed", "incomplete"]`

      The status of the tool search output item that was recorded.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `tools: List[Tool]`

      The loaded tool definitions returned by tool search.

      - `class FunctionTool: …`

        Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

        - `name: str`

          The name of the function to call.

        - `parameters: Optional[Dict[str, object]]`

          A JSON schema object describing the parameters of the function.

        - `strict: Optional[bool]`

          Whether to enforce strict parameter validation. Default `true`.

        - `type: Literal["function"]`

          The type of the function tool. Always `function`.

          - `"function"`

        - `defer_loading: Optional[bool]`

          Whether this function is deferred and loaded via tool search.

        - `description: Optional[str]`

          A description of the function. Used by the model to determine whether or not to call the function.

      - `class FileSearchTool: …`

        A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

        - `type: Literal["file_search"]`

          The type of the file search tool. Always `file_search`.

          - `"file_search"`

        - `vector_store_ids: List[str]`

          The IDs of the vector stores to search.

        - `filters: Optional[Filters]`

          A filter to apply.

          - `class ComparisonFilter: …`

            A filter used to compare a specified attribute key to a given value using a defined comparison operation.

            - `key: str`

              The key to compare against the value.

            - `type: Literal["eq", "ne", "gt", 3 more]`

              Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

              - `eq`: equals
              - `ne`: not equal
              - `gt`: greater than
              - `gte`: greater than or equal
              - `lt`: less than
              - `lte`: less than or equal
              - `in`: in
              - `nin`: not in

              - `"eq"`

              - `"ne"`

              - `"gt"`

              - `"gte"`

              - `"lt"`

              - `"lte"`

            - `value: Union[str, float, bool, List[Union[str, float]]]`

              The value to compare against the attribute key; supports string, number, or boolean types.

              - `str`

              - `float`

              - `bool`

              - `List[Union[str, float]]`

                - `str`

                - `float`

          - `class CompoundFilter: …`

            Combine multiple filters using `and` or `or`.

            - `filters: List[Filter]`

              Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

              - `class ComparisonFilter: …`

                A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                - `key: str`

                  The key to compare against the value.

                - `type: Literal["eq", "ne", "gt", 3 more]`

                  Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                  - `eq`: equals
                  - `ne`: not equal
                  - `gt`: greater than
                  - `gte`: greater than or equal
                  - `lt`: less than
                  - `lte`: less than or equal
                  - `in`: in
                  - `nin`: not in

                  - `"eq"`

                  - `"ne"`

                  - `"gt"`

                  - `"gte"`

                  - `"lt"`

                  - `"lte"`

                - `value: Union[str, float, bool, List[Union[str, float]]]`

                  The value to compare against the attribute key; supports string, number, or boolean types.

                  - `str`

                  - `float`

                  - `bool`

                  - `List[Union[str, float]]`

                    - `str`

                    - `float`

              - `object`

            - `type: Literal["and", "or"]`

              Type of operation: `and` or `or`.

              - `"and"`

              - `"or"`

        - `max_num_results: Optional[int]`

          The maximum number of results to return. This number should be between 1 and 50 inclusive.

        - `ranking_options: Optional[RankingOptions]`

          Ranking options for search.

          - `hybrid_search: Optional[RankingOptionsHybridSearch]`

            Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.

            - `embedding_weight: float`

              The weight of the embedding in the reciprocal ranking fusion.

            - `text_weight: float`

              The weight of the text in the reciprocal ranking fusion.

          - `ranker: Optional[Literal["auto", "default-2024-11-15"]]`

            The ranker to use for the file search.

            - `"auto"`

            - `"default-2024-11-15"`

          - `score_threshold: Optional[float]`

            The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.

      - `class ComputerTool: …`

        A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

        - `type: Literal["computer"]`

          The type of the computer tool. Always `computer`.

          - `"computer"`

      - `class ComputerUsePreviewTool: …`

        A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

        - `display_height: int`

          The height of the computer display.

        - `display_width: int`

          The width of the computer display.

        - `environment: Literal["windows", "mac", "linux", 2 more]`

          The type of computer environment to control.

          - `"windows"`

          - `"mac"`

          - `"linux"`

          - `"ubuntu"`

          - `"browser"`

        - `type: Literal["computer_use_preview"]`

          The type of the computer use tool. Always `computer_use_preview`.

          - `"computer_use_preview"`

      - `class WebSearchTool: …`

        Search the Internet for sources related to the prompt. Learn more about the
        [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

        - `type: Literal["web_search", "web_search_2025_08_26"]`

          The type of the web search tool. One of `web_search` or `web_search_2025_08_26`.

          - `"web_search"`

          - `"web_search_2025_08_26"`

        - `filters: Optional[Filters]`

          Filters for the search.

          - `allowed_domains: Optional[List[str]]`

            Allowed domains for the search. If not provided, all domains are allowed.
            Subdomains of the provided domains are allowed as well.

            Example: `["pubmed.ncbi.nlm.nih.gov"]`

        - `search_context_size: Optional[Literal["low", "medium", "high"]]`

          High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

          - `"low"`

          - `"medium"`

          - `"high"`

        - `user_location: Optional[UserLocation]`

          The approximate location of the user.

          - `city: Optional[str]`

            Free text input for the city of the user, e.g. `San Francisco`.

          - `country: Optional[str]`

            The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

          - `region: Optional[str]`

            Free text input for the region of the user, e.g. `California`.

          - `timezone: Optional[str]`

            The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

          - `type: Optional[Literal["approximate"]]`

            The type of location approximation. Always `approximate`.

            - `"approximate"`

      - `class Mcp: …`

        Give the model access to additional tools via remote Model Context Protocol
        (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

        - `server_label: str`

          A label for this MCP server, used to identify it in tool calls.

        - `type: Literal["mcp"]`

          The type of the MCP tool. Always `mcp`.

          - `"mcp"`

        - `allowed_tools: Optional[McpAllowedTools]`

          List of allowed tool names or a filter object.

          - `List[str]`

            A string array of allowed tool names

          - `class McpAllowedToolsMcpToolFilter: …`

            A filter object to specify which tools are allowed.

            - `read_only: Optional[bool]`

              Indicates whether or not a tool modifies data or is read-only. If an
              MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
              it will match this filter.

            - `tool_names: Optional[List[str]]`

              List of allowed tool names.

        - `authorization: Optional[str]`

          An OAuth access token that can be used with a remote MCP server, either
          with a custom MCP server URL or a service connector. Your application
          must handle the OAuth authorization flow and provide the token here.

        - `connector_id: Optional[Literal["connector_dropbox", "connector_gmail", "connector_googlecalendar", 5 more]]`

          Identifier for service connectors, like those available in ChatGPT. One of
          `server_url` or `connector_id` must be provided. Learn more about service
          connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

          Currently supported `connector_id` values are:

          - Dropbox: `connector_dropbox`
          - Gmail: `connector_gmail`
          - Google Calendar: `connector_googlecalendar`
          - Google Drive: `connector_googledrive`
          - Microsoft Teams: `connector_microsoftteams`
          - Outlook Calendar: `connector_outlookcalendar`
          - Outlook Email: `connector_outlookemail`
          - SharePoint: `connector_sharepoint`

          - `"connector_dropbox"`

          - `"connector_gmail"`

          - `"connector_googlecalendar"`

          - `"connector_googledrive"`

          - `"connector_microsoftteams"`

          - `"connector_outlookcalendar"`

          - `"connector_outlookemail"`

          - `"connector_sharepoint"`

        - `defer_loading: Optional[bool]`

          Whether this MCP tool is deferred and discovered via tool search.

        - `headers: Optional[Dict[str, str]]`

          Optional HTTP headers to send to the MCP server. Use for authentication
          or other purposes.

        - `require_approval: Optional[McpRequireApproval]`

          Specify which of the MCP server's tools require approval.

          - `class McpRequireApprovalMcpToolApprovalFilter: …`

            Specify which of the MCP server's tools require approval. Can be
            `always`, `never`, or a filter object associated with tools
            that require approval.

            - `always: Optional[McpRequireApprovalMcpToolApprovalFilterAlways]`

              A filter object to specify which tools are allowed.

              - `read_only: Optional[bool]`

                Indicates whether or not a tool modifies data or is read-only. If an
                MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                it will match this filter.

              - `tool_names: Optional[List[str]]`

                List of allowed tool names.

            - `never: Optional[McpRequireApprovalMcpToolApprovalFilterNever]`

              A filter object to specify which tools are allowed.

              - `read_only: Optional[bool]`

                Indicates whether or not a tool modifies data or is read-only. If an
                MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                it will match this filter.

              - `tool_names: Optional[List[str]]`

                List of allowed tool names.

          - `Literal["always", "never"]`

            Specify a single approval policy for all tools. One of `always` or
            `never`. When set to `always`, all tools will require approval. When
            set to `never`, all tools will not require approval.

            - `"always"`

            - `"never"`

        - `server_description: Optional[str]`

          Optional description of the MCP server, used to provide more context.

        - `server_url: Optional[str]`

          The URL for the MCP server. One of `server_url` or `connector_id` must be
          provided.

      - `class CodeInterpreter: …`

        A tool that runs Python code to help generate a response to a prompt.

        - `container: CodeInterpreterContainer`

          The code interpreter container. Can be a container ID or an object that
          specifies uploaded file IDs to make available to your code, along with an
          optional `memory_limit` setting.

          - `str`

            The container ID.

          - `class CodeInterpreterContainerCodeInterpreterToolAuto: …`

            Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.

            - `type: Literal["auto"]`

              Always `auto`.

              - `"auto"`

            - `file_ids: Optional[List[str]]`

              An optional list of uploaded files to make available to your code.

            - `memory_limit: Optional[Literal["1g", "4g", "16g", "64g"]]`

              The memory limit for the code interpreter container.

              - `"1g"`

              - `"4g"`

              - `"16g"`

              - `"64g"`

            - `network_policy: Optional[CodeInterpreterContainerCodeInterpreterToolAutoNetworkPolicy]`

              Network access policy for the container.

              - `class ContainerNetworkPolicyDisabled: …`

                - `type: Literal["disabled"]`

                  Disable outbound network access. Always `disabled`.

                  - `"disabled"`

              - `class ContainerNetworkPolicyAllowlist: …`

                - `allowed_domains: List[str]`

                  A list of allowed domains when type is `allowlist`.

                - `type: Literal["allowlist"]`

                  Allow outbound network access only to specified domains. Always `allowlist`.

                  - `"allowlist"`

                - `domain_secrets: Optional[List[ContainerNetworkPolicyDomainSecret]]`

                  Optional domain-scoped secrets for allowlisted domains.

                  - `domain: str`

                    The domain associated with the secret.

                  - `name: str`

                    The name of the secret to inject for the domain.

                  - `value: str`

                    The secret value to inject for the domain.

        - `type: Literal["code_interpreter"]`

          The type of the code interpreter tool. Always `code_interpreter`.

          - `"code_interpreter"`

      - `class ImageGeneration: …`

        A tool that generates images using the GPT image models.

        - `type: Literal["image_generation"]`

          The type of the image generation tool. Always `image_generation`.

          - `"image_generation"`

        - `action: Optional[Literal["generate", "edit", "auto"]]`

          Whether to generate a new image or edit an existing image. Default: `auto`.

          - `"generate"`

          - `"edit"`

          - `"auto"`

        - `background: Optional[Literal["transparent", "opaque", "auto"]]`

          Background type for the generated image. One of `transparent`,
          `opaque`, or `auto`. Default: `auto`.

          - `"transparent"`

          - `"opaque"`

          - `"auto"`

        - `input_fidelity: Optional[Literal["high", "low"]]`

          Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

          - `"high"`

          - `"low"`

        - `input_image_mask: Optional[ImageGenerationInputImageMask]`

          Optional mask for inpainting. Contains `image_url`
          (string, optional) and `file_id` (string, optional).

          - `file_id: Optional[str]`

            File ID for the mask image.

          - `image_url: Optional[str]`

            Base64-encoded mask image.

        - `model: Optional[Union[str, Literal["gpt-image-1", "gpt-image-1-mini", "gpt-image-1.5"], null]]`

          The image generation model to use. Default: `gpt-image-1`.

          - `str`

          - `Literal["gpt-image-1", "gpt-image-1-mini", "gpt-image-1.5"]`

            The image generation model to use. Default: `gpt-image-1`.

            - `"gpt-image-1"`

            - `"gpt-image-1-mini"`

            - `"gpt-image-1.5"`

        - `moderation: Optional[Literal["auto", "low"]]`

          Moderation level for the generated image. Default: `auto`.

          - `"auto"`

          - `"low"`

        - `output_compression: Optional[int]`

          Compression level for the output image. Default: 100.

        - `output_format: Optional[Literal["png", "webp", "jpeg"]]`

          The output format of the generated image. One of `png`, `webp`, or
          `jpeg`. Default: `png`.

          - `"png"`

          - `"webp"`

          - `"jpeg"`

        - `partial_images: Optional[int]`

          Number of partial images to generate in streaming mode, from 0 (default value) to 3.

        - `quality: Optional[Literal["low", "medium", "high", "auto"]]`

          The quality of the generated image. One of `low`, `medium`, `high`,
          or `auto`. Default: `auto`.

          - `"low"`

          - `"medium"`

          - `"high"`

          - `"auto"`

        - `size: Optional[Literal["1024x1024", "1024x1536", "1536x1024", "auto"]]`

          The size of the generated image. One of `1024x1024`, `1024x1536`,
          `1536x1024`, or `auto`. Default: `auto`.

          - `"1024x1024"`

          - `"1024x1536"`

          - `"1536x1024"`

          - `"auto"`

      - `class LocalShell: …`

        A tool that allows the model to execute shell commands in a local environment.

        - `type: Literal["local_shell"]`

          The type of the local shell tool. Always `local_shell`.

          - `"local_shell"`

      - `class FunctionShellTool: …`

        A tool that allows the model to execute shell commands.

        - `type: Literal["shell"]`

          The type of the shell tool. Always `shell`.

          - `"shell"`

        - `environment: Optional[Environment]`

          - `class ContainerAuto: …`

            - `type: Literal["container_auto"]`

              Automatically creates a container for this request

              - `"container_auto"`

            - `file_ids: Optional[List[str]]`

              An optional list of uploaded files to make available to your code.

            - `memory_limit: Optional[Literal["1g", "4g", "16g", "64g"]]`

              The memory limit for the container.

              - `"1g"`

              - `"4g"`

              - `"16g"`

              - `"64g"`

            - `network_policy: Optional[NetworkPolicy]`

              Network access policy for the container.

              - `class ContainerNetworkPolicyDisabled: …`

                - `type: Literal["disabled"]`

                  Disable outbound network access. Always `disabled`.

                  - `"disabled"`

              - `class ContainerNetworkPolicyAllowlist: …`

                - `allowed_domains: List[str]`

                  A list of allowed domains when type is `allowlist`.

                - `type: Literal["allowlist"]`

                  Allow outbound network access only to specified domains. Always `allowlist`.

                  - `"allowlist"`

                - `domain_secrets: Optional[List[ContainerNetworkPolicyDomainSecret]]`

                  Optional domain-scoped secrets for allowlisted domains.

                  - `domain: str`

                    The domain associated with the secret.

                  - `name: str`

                    The name of the secret to inject for the domain.

                  - `value: str`

                    The secret value to inject for the domain.

            - `skills: Optional[List[Skill]]`

              An optional list of skills referenced by id or inline data.

              - `class SkillReference: …`

                - `skill_id: str`

                  The ID of the referenced skill.

                - `type: Literal["skill_reference"]`

                  References a skill created with the /v1/skills endpoint.

                  - `"skill_reference"`

                - `version: Optional[str]`

                  Optional skill version. Use a positive integer or 'latest'. Omit for default.

              - `class InlineSkill: …`

                - `description: str`

                  The description of the skill.

                - `name: str`

                  The name of the skill.

                - `source: InlineSkillSource`

                  Inline skill payload

                  - `data: str`

                    Base64-encoded skill zip bundle.

                  - `media_type: Literal["application/zip"]`

                    The media type of the inline skill payload. Must be `application/zip`.

                    - `"application/zip"`

                  - `type: Literal["base64"]`

                    The type of the inline skill source. Must be `base64`.

                    - `"base64"`

                - `type: Literal["inline"]`

                  Defines an inline skill for this request.

                  - `"inline"`

          - `class LocalEnvironment: …`

            - `type: Literal["local"]`

              Use a local computer environment.

              - `"local"`

            - `skills: Optional[List[LocalSkill]]`

              An optional list of skills.

              - `description: str`

                The description of the skill.

              - `name: str`

                The name of the skill.

              - `path: str`

                The path to the directory containing the skill.

          - `class ContainerReference: …`

            - `container_id: str`

              The ID of the referenced container.

            - `type: Literal["container_reference"]`

              References a container created with the /v1/containers endpoint

              - `"container_reference"`

      - `class CustomTool: …`

        A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

        - `name: str`

          The name of the custom tool, used to identify it in tool calls.

        - `type: Literal["custom"]`

          The type of the custom tool. Always `custom`.

          - `"custom"`

        - `defer_loading: Optional[bool]`

          Whether this tool should be deferred and discovered via tool search.

        - `description: Optional[str]`

          Optional description of the custom tool, used to provide more context.

        - `format: Optional[CustomToolInputFormat]`

          The input format for the custom tool. Default is unconstrained text.

          - `class Text: …`

            Unconstrained free-form text.

            - `type: Literal["text"]`

              Unconstrained text format. Always `text`.

              - `"text"`

          - `class Grammar: …`

            A grammar defined by the user.

            - `definition: str`

              The grammar definition.

            - `syntax: Literal["lark", "regex"]`

              The syntax of the grammar definition. One of `lark` or `regex`.

              - `"lark"`

              - `"regex"`

            - `type: Literal["grammar"]`

              Grammar format. Always `grammar`.

              - `"grammar"`

      - `class NamespaceTool: …`

        Groups function/custom tools under a shared namespace.

        - `description: str`

          A description of the namespace shown to the model.

        - `name: str`

          The namespace name used in tool calls (for example, `crm`).

        - `tools: List[Tool]`

          The function/custom tools available inside this namespace.

          - `class ToolFunction: …`

            - `name: str`

            - `type: Literal["function"]`

              - `"function"`

            - `description: Optional[str]`

            - `parameters: Optional[object]`

            - `strict: Optional[bool]`

          - `class CustomTool: …`

            A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

            - `name: str`

              The name of the custom tool, used to identify it in tool calls.

            - `type: Literal["custom"]`

              The type of the custom tool. Always `custom`.

              - `"custom"`

            - `defer_loading: Optional[bool]`

              Whether this tool should be deferred and discovered via tool search.

            - `description: Optional[str]`

              Optional description of the custom tool, used to provide more context.

            - `format: Optional[CustomToolInputFormat]`

              The input format for the custom tool. Default is unconstrained text.

              - `class Text: …`

                Unconstrained free-form text.

                - `type: Literal["text"]`

                  Unconstrained text format. Always `text`.

                  - `"text"`

              - `class Grammar: …`

                A grammar defined by the user.

                - `definition: str`

                  The grammar definition.

                - `syntax: Literal["lark", "regex"]`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

                - `type: Literal["grammar"]`

                  Grammar format. Always `grammar`.

                  - `"grammar"`

        - `type: Literal["namespace"]`

          The type of the tool. Always `namespace`.

          - `"namespace"`

      - `class ToolSearchTool: …`

        Hosted or BYOT tool search configuration for deferred tools.

        - `type: Literal["tool_search"]`

          The type of the tool. Always `tool_search`.

          - `"tool_search"`

        - `description: Optional[str]`

          Description shown to the model for a client-executed tool search tool.

        - `execution: Optional[Literal["server", "client"]]`

          Whether tool search is executed by the server or by the client.

          - `"server"`

          - `"client"`

        - `parameters: Optional[object]`

          Parameter schema for a client-executed tool search tool.

      - `class WebSearchPreviewTool: …`

        This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

        - `type: Literal["web_search_preview", "web_search_preview_2025_03_11"]`

          The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.

          - `"web_search_preview"`

          - `"web_search_preview_2025_03_11"`

        - `search_content_types: Optional[List[Literal["text", "image"]]]`

          - `"text"`

          - `"image"`

        - `search_context_size: Optional[Literal["low", "medium", "high"]]`

          High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

          - `"low"`

          - `"medium"`

          - `"high"`

        - `user_location: Optional[UserLocation]`

          The user's location.

          - `type: Literal["approximate"]`

            The type of location approximation. Always `approximate`.

            - `"approximate"`

          - `city: Optional[str]`

            Free text input for the city of the user, e.g. `San Francisco`.

          - `country: Optional[str]`

            The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

          - `region: Optional[str]`

            Free text input for the region of the user, e.g. `California`.

          - `timezone: Optional[str]`

            The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

      - `class ApplyPatchTool: …`

        Allows the assistant to create, delete, or update files using unified diffs.

        - `type: Literal["apply_patch"]`

          The type of the tool. Always `apply_patch`.

          - `"apply_patch"`

    - `type: Literal["tool_search_output"]`

      The type of the item. Always `tool_search_output`.

      - `"tool_search_output"`

    - `created_by: Optional[str]`

      The identifier of the actor that created the item.

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

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.responses.input_items.list(
    response_id="response_id",
)
page = page.data[0]
print(page)
```
