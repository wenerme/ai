# Use Daybreak in the Responses API

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Set `access_programs.cyber` in a Responses API request to select [Daybreak Blue or Daybreak Red](https://help.openai.com/en/articles/20001258-trusted-access-for-cyber). Other [API cybersecurity safeguards](https://developers.openai.com/api/docs/guides/safety-checks/cybersecurity) still apply.

Before sending a request, complete [organization approval and project setup](https://help.openai.com/en/articles/20001261-enterprise-daybreak-onboarding). Use an API key from a project with access to both the program and the model. The parameter doesn't grant access.

All Daybreak Red organizations must [require SSO](https://help.openai.com/en/articles/9534785-single-sign-on-sso-setup-for-openai-products) for the API organization that holds Cyber access and enforce MFA through your identity provider. If you use a separate Cyber organization, verify its domain and test SSO there.

## Choose the model and access program

Choose a `model` and a compatible `access_programs.cyber` value: `standard`, `daybreak_blue`, or `daybreak_red`.

Only organizations with existing access can use `gpt-5.5-cyber-preview`. It
  retires on **February 1, 2027**. Requests that use this model will fail after
  retirement. If you use it, change the `model` field to `gpt-5.6-cyber` before
  that date. If your organization has approval for `gpt-6-cyber`, follow the
  [setup instructions](#set-up-gpt-6-cyber) to switch to it instead. Confirm
  your project has access to the replacement before switching. See [API
  deprecations](https://developers.openai.com/api/docs/deprecations#2026-11-05-gpt-55-cyber).



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
        <td>GPT-6 Luna</td>
        <td>Blue or Red</td>
        <td>
          `daybreak_blue`
        </td>
      </tr>
      <tr>
        <td className="align-top">
          

            
GPT-6.2 Astra

            
GPT-6.2 Sol

            
GPT-6.1 Sol

            
GPT-6.1 Terra

            
GPT-6 Astra

          

        </td>
        <td className="align-top">Red</td>
        <td className="align-top">
          

            

              `daybreak_blue`
            

            

              `daybreak_blue`
            

            

              `daybreak_blue`
            

            

              `daybreak_blue`
            

            

              `daybreak_blue`
            

          

        </td>
      </tr>
      <tr>
        <td>GPT-6 Cyber</td>
        <td>Red + additional model approval</td>
        <td>
          `daybreak_red`
        </td>
      </tr>
      <tr>
        <td className="align-top">
          

            
GPT-5.6 Cyber

            
GPT-5.5-Cyber (existing access only)

          

        </td>
        <td className="align-top">Red</td>
        <td className="align-top">
          

            

              `daybreak_red`
            

            

              `daybreak_red`
            

          

        </td>
      </tr>
    </tbody>
  </table>



Use the value listed for the model even if your organization has a higher approval level. For example, `gpt-6-sol` accepts `daybreak_blue`, but returns `invalid_access_program` for `daybreak_red`.

For reduced refusals on `gpt-6.2-astra`, `gpt-6.2-sol`, `gpt-6.1-sol`,
  `gpt-6.1-terra`, and `gpt-6-astra`, your organization needs Daybreak Red
  approval and your project needs the required access enabled. Send
  `daybreak_blue`. Blue approval alone isn't sufficient. `gpt-6-astra` and
  `gpt-6.1-sol` reject `daybreak_red`.

## Send a request

With Daybreak Blue approval, send `daybreak_blue` with an eligible model such as `gpt-6-sol`:

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

For `gpt-6.1-terra` and newer models, including `gpt-6.2-astra` and `gpt-6.2-sol`, requests that omit `access_programs.cyber` default to `standard` instead of the highest available Daybreak tier.

These models use the following defaults when you omit the parameter:

- **Mainline models such as `gpt-6-sol` and `gpt-6-luna`:** Daybreak Blue treatment when your organization and project have the required access; otherwise, standard safeguards.
- **Red models such as `gpt-5.6-cyber`:** The API selects `daybreak_red`. The request fails if the required access is missing.
- **`gpt-6-astra` and `gpt-6.1-sol`:** Reduced refusals for eligible callers with Daybreak Red access enabled for their project; otherwise, standard safeguards.

Set `access_programs.cyber` to `standard` to use standard safeguards on a compatible model. An explicit Daybreak selection fails if the model is incompatible or you lack the required access. Model permissions still apply.

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

## Set up GPT-6 Cyber

Confirm with your account team that your organization has Daybreak Red access and approval for [GPT-6 Cyber](https://developers.openai.com/api/docs/models/gpt-6-cyber).

**Project access.** Ask an organization owner to [enable Daybreak Red](https://help.openai.com/en/articles/20001531-openai-daybreak-set-up-access-for-your-team) for the project that will send requests. With project-level controls, use a non-default project and a key from that project.

**IP allowlisting.** To use GPT-6 Cyber through the API, [configure an IP allowlist](https://developers.openai.com/api/docs/guides/ip-allowlist) for the public IPs your application sends requests from. If you have received approval to embed the model in a product, end users without direct model access don’t need to allowlist their own IPs.

**Zero Data Retention.** If the project uses ZDR, [configure Private Safety Processing](https://developers.openai.com/api/docs/guides/private-safety-processing) (PSP). Check that storage shows “Validated” and that the project’s retention policy is “Zero Data Retention with Private Safety Processing.” PSP applies to all API traffic in that project.

### Send a GPT-6 Cyber request

Set `OPENAI_API_KEY` to a key from the approved project. Replace the sample safety identifier with a stable, pseudonymous identifier for the user making the request.

```bash
curl https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6-cyber",
    "access_programs": {"cyber": "daybreak_red"},
    "safety_identifier": "user_a17f",
    "input": "Suggest a regression test for a path traversal fix."
  }'
```

If the request fails, check the project associated with the key, the active allowlist, and the project’s retention policy. See [Daybreak API errors](https://developers.openai.com/api/docs/guides/daybreak#handle-errors).

## Handle errors

| HTTP status and code             | What to do                                                                                                                                                                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400 invalid_access_program`     | The selected model requires a different program value. Change `access_programs.cyber` to the value named in the error, then retry.                                                                                                                            |
| `400 unsupported_access_program` | Switch to a model that supports Daybreak, or set `access_programs.cyber` to `standard` to keep using this model with standard safeguards.                                                                                                                     |
| `403 access_program_not_enabled` | Check that your API key belongs to a project with the required program enabled. If organization approval is missing, request the Daybreak level named in the error. If project access is missing, ask your organization administrator to enable that program. |

Unknown fields, invalid values, and request-side `null` values fail validation. Model permissions and cybersecurity safeguards still apply. For more help, see [Daybreak troubleshooting](https://help.openai.com/en/articles/20001259).