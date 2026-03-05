## List

`chat.completions.list(CompletionListParams**kwargs)  -> SyncCursorPage[ChatCompletion]`

**get** `/chat/completions`

List stored Chat Completions. Only Chat Completions that have been stored
with the `store` parameter set to `true` will be returned.

### Parameters

- `after: Optional[str]`

  Identifier for the last chat completion from the previous pagination request.

- `limit: Optional[int]`

  Number of Chat Completions to retrieve.

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `model: Optional[str]`

  The model used to generate the Chat Completions.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for Chat Completions by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.

  - `"asc"`

  - `"desc"`

### Returns

- `class ChatCompletion: …`

  Represents a chat completion response returned by model, based on the provided input.

  - `id: str`

    A unique identifier for the chat completion.

  - `choices: List[Choice]`

    A list of chat completion choices. Can be more than one if `n` is greater than 1.

    - `finish_reason: Literal["stop", "length", "tool_calls", 2 more]`

      The reason the model stopped generating tokens. This will be `stop` if the model hit a natural stop point or a provided stop sequence,
      `length` if the maximum number of tokens specified in the request was reached,
      `content_filter` if content was omitted due to a flag from our content filters,
      `tool_calls` if the model called a tool, or `function_call` (deprecated) if the model called a function.

      - `"stop"`

      - `"length"`

      - `"tool_calls"`

      - `"content_filter"`

      - `"function_call"`

    - `index: int`

      The index of the choice in the list of choices.

    - `logprobs: Optional[ChoiceLogprobs]`

      Log probability information for the choice.

      - `content: Optional[List[ChatCompletionTokenLogprob]]`

        A list of message content tokens with log probability information.

        - `token: str`

          The token.

        - `bytes: Optional[List[int]]`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: float`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: List[TopLogprob]`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: str`

            The token.

          - `bytes: Optional[List[int]]`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: float`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

      - `refusal: Optional[List[ChatCompletionTokenLogprob]]`

        A list of message refusal tokens with log probability information.

        - `token: str`

          The token.

        - `bytes: Optional[List[int]]`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: float`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: List[TopLogprob]`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: str`

            The token.

          - `bytes: Optional[List[int]]`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: float`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

    - `message: ChatCompletionMessage`

      A chat completion message generated by the model.

      - `content: Optional[str]`

        The contents of the message.

      - `refusal: Optional[str]`

        The refusal message generated by the model.

      - `role: Literal["assistant"]`

        The role of the author of this message.

        - `"assistant"`

      - `annotations: Optional[List[Annotation]]`

        Annotations for the message, when applicable, as when using the
        [web search tool](https://platform.openai.com/docs/guides/tools-web-search?api-mode=chat).

        - `type: Literal["url_citation"]`

          The type of the URL citation. Always `url_citation`.

          - `"url_citation"`

        - `url_citation: AnnotationURLCitation`

          A URL citation when using web search.

          - `end_index: int`

            The index of the last character of the URL citation in the message.

          - `start_index: int`

            The index of the first character of the URL citation in the message.

          - `title: str`

            The title of the web resource.

          - `url: str`

            The URL of the web resource.

      - `audio: Optional[ChatCompletionAudio]`

        If the audio output modality is requested, this object contains data
        about the audio response from the model. [Learn more](https://platform.openai.com/docs/guides/audio).

        - `id: str`

          Unique identifier for this audio response.

        - `data: str`

          Base64 encoded audio bytes generated by the model, in the format
          specified in the request.

        - `expires_at: int`

          The Unix timestamp (in seconds) for when this audio response will
          no longer be accessible on the server for use in multi-turn
          conversations.

        - `transcript: str`

          Transcript of the audio generated by the model.

      - `function_call: Optional[FunctionCall]`

        Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.

        - `arguments: str`

          The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

        - `name: str`

          The name of the function to call.

      - `tool_calls: Optional[List[ChatCompletionMessageToolCallUnion]]`

        The tool calls generated by the model, such as function calls.

        - `class ChatCompletionMessageFunctionToolCall: …`

          A call to a function tool created by the model.

          - `id: str`

            The ID of the tool call.

          - `function: Function`

            The function that the model called.

            - `arguments: str`

              The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

            - `name: str`

              The name of the function to call.

          - `type: Literal["function"]`

            The type of the tool. Currently, only `function` is supported.

            - `"function"`

        - `class ChatCompletionMessageCustomToolCall: …`

          A call to a custom tool created by the model.

          - `id: str`

            The ID of the tool call.

          - `custom: Custom`

            The custom tool that the model called.

            - `input: str`

              The input for the custom tool call generated by the model.

            - `name: str`

              The name of the custom tool to call.

          - `type: Literal["custom"]`

            The type of the tool. Always `custom`.

            - `"custom"`

  - `created: int`

    The Unix timestamp (in seconds) of when the chat completion was created.

  - `model: str`

    The model used for the chat completion.

  - `object: Literal["chat.completion"]`

    The object type, which is always `chat.completion`.

    - `"chat.completion"`

  - `service_tier: Optional[Literal["auto", "default", "flex", 2 more]]`

    Specifies the processing type used for serving the request.

    - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
    - If set to 'default', then the request will be processed with the standard pricing and performance for the selected model.
    - If set to '[flex](https://platform.openai.com/docs/guides/flex-processing)' or '[priority](https://openai.com/api-priority-processing/)', then the request will be processed with the corresponding service tier.
    - When not set, the default behavior is 'auto'.

    When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.

    - `"auto"`

    - `"default"`

    - `"flex"`

    - `"scale"`

    - `"priority"`

  - `system_fingerprint: Optional[str]`

    This fingerprint represents the backend configuration that the model runs with.

    Can be used in conjunction with the `seed` request parameter to understand when backend changes have been made that might impact determinism.

  - `usage: Optional[CompletionUsage]`

    Usage statistics for the completion request.

    - `completion_tokens: int`

      Number of tokens in the generated completion.

    - `prompt_tokens: int`

      Number of tokens in the prompt.

    - `total_tokens: int`

      Total number of tokens used in the request (prompt + completion).

    - `completion_tokens_details: Optional[CompletionTokensDetails]`

      Breakdown of tokens used in a completion.

      - `accepted_prediction_tokens: Optional[int]`

        When using Predicted Outputs, the number of tokens in the
        prediction that appeared in the completion.

      - `audio_tokens: Optional[int]`

        Audio input tokens generated by the model.

      - `reasoning_tokens: Optional[int]`

        Tokens generated by the model for reasoning.

      - `rejected_prediction_tokens: Optional[int]`

        When using Predicted Outputs, the number of tokens in the
        prediction that did not appear in the completion. However, like
        reasoning tokens, these tokens are still counted in the total
        completion tokens for purposes of billing, output, and context window
        limits.

    - `prompt_tokens_details: Optional[PromptTokensDetails]`

      Breakdown of tokens used in the prompt.

      - `audio_tokens: Optional[int]`

        Audio input tokens present in the prompt.

      - `cached_tokens: Optional[int]`

        Cached tokens present in the prompt.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.chat.completions.list()
page = page.data[0]
print(page.id)
```
