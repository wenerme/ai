# Use Daybreak in the Responses API

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use `access_programs.cyber` to select a cybersecurity access program for a Responses API request. The [Daybreak Blue and Daybreak Red programs](https://help.openai.com/en/articles/20001258-trusted-access-for-cyber) provide approved access for cybersecurity work. Other [API cybersecurity safeguards](https://developers.openai.com/api/docs/guides/safety-checks/cybersecurity) continue to apply.

Before using Daybreak, complete [organization approval and project setup](https://help.openai.com/en/articles/20001261-enterprise-daybreak-onboarding). Your project needs access to both the program and the model. Use an API key from that project. The request parameter selects behavior within your approved access; it doesn't grant access.

## Choose the model and access program

The `model` field selects the model. The `access_programs.cyber` field selects a supported access program for that request: `standard`, `daybreak_blue`, or `daybreak_red`.



  <table>
    <thead>
      <tr>
        <th scope="col">Model</th>
        <th scope="col">Approval required</th>
        <th scope="col">
          API value: `access_programs.cyber`
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GPT-6 Sol</td>
        <td>Blue or Red</td>
        <td>
          `daybreak_blue`
        </td>
      </tr>
      <tr>
        <td className="align-top">
          

            
GPT-6.1 Sol

            
GPT-6 Astra

            
GPT-5.5-Cyber

          

        </td>
        <td className="align-top">Red</td>
        <td className="align-top">
          

            

              `daybreak_blue`
            

            

              `daybreak_blue`
            

            

              `daybreak_red`
            

          

        </td>
      </tr>
      <tr>
        <td>GPT-5.6-Cyber</td>
        <td>Red + additional model approval</td>
        <td>
          `daybreak_red`
        </td>
      </tr>
    </tbody>
  </table>



Match the request value to the model, not your organization's approval level. For example, when using `gpt-6-sol` with Daybreak, send `daybreak_blue` even if your organization has Daybreak Red approval. Sending `daybreak_red` with this model returns `invalid_access_program`.

Reduced refusals on `gpt-6-astra` and `gpt-6.1-sol` require Daybreak Red
  access, but the request value is `daybreak_blue`. Both models reject
  `daybreak_red`. Daybreak Blue approval alone doesn't authorize reduced
  refusals on either model. Your project must also have the required access
  enabled.

## Send a request

To get started with Daybreak Blue approval, explicitly select `daybreak_blue` with a Daybreak-eligible model, such as `gpt-6-sol`:

```bash
curl https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6-sol",
    "input": "Explain how to validate a security patch in a test environment.",
    "access_programs": {
      "cyber": "daybreak_blue"
    }
  }'
```


If your organization has Daybreak Red approval and access is enabled for your project, you can also use `gpt-6.1-sol`. The request still selects `daybreak_blue`:

```bash
curl https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6.1-sol",
    "input": "Explain how to validate a security patch in a test environment.",
    "access_programs": {
      "cyber": "daybreak_blue"
    }
  }'
```


Both `access_programs` and `cyber` are optional, but neither accepts `null` in a request. An empty `access_programs` object leaves the selection unspecified.

## Understand defaults when omitted

Starting with `gpt-6.1-terra`, omitting the `access_programs.cyber` parameter results in `standard` request treatment instead of defaulting to the highest available Daybreak tier.

For the models listed below, omitting `access_programs.cyber` uses the following defaults:

- **Mainline models such as `gpt-6-sol`:** Daybreak Blue treatment when your organization and project have the required access; otherwise, standard safeguards.
- **Red models such as `gpt-5.6-cyber`:** The API selects `daybreak_red`. The request fails if the required access is missing.
- **`gpt-6-astra` and `gpt-6.1-sol`:** Reduced refusals for eligible callers with Daybreak Red access enabled for their project; otherwise, standard safeguards.

Model permissions still apply. To turn Daybreak off and request standard safeguards on a compatible model, set `access_programs.cyber` to `standard`, even if you have Daybreak access. An explicit Daybreak selection fails if it's incompatible with the model or you don't have the required access.

## Check the response

When available, `access_programs.cyber` records the selected program. This partial response shows Daybreak Blue for the `gpt-6.1-sol` request:

```json
{
  "model": "gpt-6.1-sol",
  "access_programs": {
    "cyber": "daybreak_blue"
  }
}
```


When no program is specified and the request uses standard safeguards, `access_programs` is `null`. For a `-latest` alias, inspect `model` to see which model served the request. Alias resolution can change and depends on your approved access.

## Handle errors

| HTTP status and code             | What to do                                                                                                                                                                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400 invalid_access_program`     | The selected model requires a different program value. Change `access_programs.cyber` to the value named in the error, then retry.                                                                                                                            |
| `400 unsupported_access_program` | Switch to a model that supports Daybreak, or set `access_programs.cyber` to `standard` to keep using this model with standard safeguards.                                                                                                                     |
| `403 access_program_not_enabled` | Check that your API key belongs to a project with the required program enabled. If organization approval is missing, request the Daybreak level named in the error. If project access is missing, ask your organization administrator to enable that program. |

Unknown fields, invalid values, and request-side `null` values fail validation. Model permissions are checked separately. A selected Daybreak program doesn't guarantee that every safety check or prompt will succeed. For more help, see [Daybreak troubleshooting](https://help.openai.com/en/articles/20001259).