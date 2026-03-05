# Computer use

import {
  dockerfile,
  setupDocker,
  setupPlaywright,
  cua_current_url,
  cua_safety_checks,
  cua_safety_checks_acknowledged,
  step1cua,
  step2cua,
  step3cua_docker,
  step3cua_playwright,
  step4cua_docker,
  step4cua_playwright,
  step5cua,
} from "./cua-examples.js";






**Computer use** is a practical application of our [Computer-Using Agent](https://openai.com/index/computer-using-agent/) (CUA) model, `computer-use-preview`, which combines the vision capabilities of [GPT-4o](https://developers.openai.com/api/docs/models/gpt-4o) with advanced reasoning to simulate controlling computer interfaces and performing tasks.

Computer use is available through the [Responses API](https://developers.openai.com/api/docs/guides/responses-vs-chat-completions). It is not available on Chat Completions.

Computer use is in beta. Because the model is still in preview and may be susceptible to exploits and inadvertent mistakes, we discourage trusting it in fully authenticated environments or for high-stakes tasks.
See [limitations](#limitations) and [risk and safety best practices](#risks-and-safety) below. You must use the Computer Use tool in line with OpenAI's [Usage Policy](https://openai.com/policies/usage-policies/) and [Business Terms](https://openai.com/policies/business-terms/).

## How it works

The computer use tool operates in a continuous loop. It sends computer actions, like `click(x,y)` or `type(text)`, which your code executes on a computer or browser environment and then returns screenshots of the outcomes back to the model.

In this way, your code simulates the actions of a human using a computer interface, while our model uses the screenshots to understand the state of the environment and suggest next actions.

This loop lets you automate many tasks requiring clicking, typing, scrolling, and more. For example, booking a flight, searching for a product, or filling out a form.

Refer to the [integration section](#integration) below for more details on how to integrate the computer use tool, or check out our sample app repository to set up an environment and try example integrations.

<a
  href="https://github.com/openai/openai-cua-sample-app"
  target="_blank"
  rel="noreferrer"
>
  

<span slot="icon">
      </span>
    Examples of how to integrate the computer use tool in different environments


</a>

## Setting up your environment

Before integrating the tool, prepare an environment that can capture screenshots and execute the recommended actions. We recommend using a sandboxed environment for safety reasons.

In this guide, we'll show you examples using either a local browsing environment or a local virtual machine, but there are more example computer environments in our sample app.

Set up a local browsing environment

If you want to try out the computer use tool with minimal setup, you can use a browser automation framework such as [Playwright](https://playwright.dev/) or [Selenium](https://www.selenium.dev/).

Running a browser automation framework locally can pose security risks. We recommend the following setup to mitigate them:

- Use a sandboxed environment
- Set `env` to an empty object to avoid exposing host environment variables to the browser
- Set flags to disable extensions and the file system

#### Start a browser instance

You can start browser instances using your preferred language by installing the corresponding SDK.

For example, to start a Playwright browser instance, install the Playwright SDK:

- Python: `pip install playwright`
- JavaScript: `npm i playwright` then `npx playwright install`

Then run the following code:

Set up a local virtual machine

If you'd like to use the computer use tool beyond just a browser interface, you can set up a local virtual machine instead, using a tool like [Docker](https://www.docker.com/).
You can then connect to this local machine to execute computer use actions.

#### Start Docker

If you don't have Docker installed, you can install it from [their website](https://www.docker.com).
Once installed, make sure Docker is running on your machine.

#### Create a Dockerfile

Create a Dockerfile to define the configuration of your virtual machine.

Here is an example Dockerfile that starts an Ubuntu virtual machine with a VNC server:

#### Build the Docker image

Build the Docker image by running the following command in the directory containing the Dockerfile:

```bash
docker build -t cua-image .
```

#### Run the Docker container locally

Start the Docker container with the following command:

```bash
docker run --rm -it --name cua-image -p 5900:5900 -e DISPLAY=:99 cua-image
```

#### Execute commands on the container

Now that your container is running, you can execute commands on it. For example, we can define a helper function to execute commands on the container that will be used in the next steps.

Integrating the CUA loop



These are the high-level steps you need to follow to integrate the computer use tool in your application:

1. **Send a request to the model**:
   Include the `computer` tool as part of the available tools, specifying the display size and environment.
   You can also include in the first request a screenshot of the initial state of the environment.

2. **Receive a response from the model**:
   Check if the response has any `computer_call` items.
   This tool call contains a suggested action to take to progress towards the specified goal.
   These actions could be clicking at a given position, typing in text, scrolling, or even waiting.

3. **Execute the requested action**:
   Execute through code the corresponding action on your computer or browser environment.

4. **Capture the updated state**:
   After executing the action, capture the updated state of the environment as a screenshot.

5. **Repeat**:
   Send a new request with the updated state as a `computer_call_output`, and repeat this loop until the model stops requesting actions or you decide to stop.

![Computer use diagram](https://cdn.openai.com/API/docs/images/cua_diagram.png)

### 1. Send a request to the model

Send a request to create a Response with the `computer-use-preview` model equipped with the `computer_use_preview` tool.
This request should include details about your environment, along with an initial input prompt.

If you want to show a summary of the reasoning performed by the model, you can include the `summary` parameter in the request.
This can be helpful if you want to debug or show what's happening behind the scenes in your interface. The summary can either be `concise` or `detailed`.

Optionally, you can include a screenshot of the initial state of the environment.

To be able to use the `computer_use_preview` tool, you need to set the
  `truncation` parameter to `"auto"` (by default, truncation is disabled).

### 2. Receive a suggested action

The model returns an output that contains either a `computer_call` item, just text, or other tool calls, depending on the state of the conversation.

Examples of `computer_call` items are a click, a scroll, a key press, or any other event defined in the [API reference](https://developers.openai.com/api/docs/api-reference/responses/object#responses-object-output-computer_tool_call-action). In our example, the item is a click action:

#### Reasoning items

The model may return a `reasoning` item in the response output for some actions.
If you don't use the `previous_response_id` parameter as shown in [Step 5](#5-repeat) and manage the inputs array on your end, make sure to include those reasoning items along with the computer calls when sending the next request to the CUA model–or the request will fail.

The reasoning items are only compatible with the same model that produced them
  (in this case, `computer-use-preview`). If you implement a flow where you use
  several models with the same conversation history, you should filter these
  reasoning items out of the inputs array you send to other models.

#### Safety checks

The model may return safety checks with the `pending_safety_check` parameter. Refer to the section on how to [acknowledge safety checks](#acknowledge-safety-checks) below for more details.

### 3. Execute the action in your environment

Execute the corresponding actions on your computer or browser. How you map a computer call to actions through code depends on your environment.
This code shows example implementations for the most common computer actions.



<div data-content-switcher-pane data-value="playwright">
    <div class="hidden">Playwright</div>
    </div>
  <div data-content-switcher-pane data-value="docker" hidden>
    <div class="hidden">Docker</div>
    </div>



### 4. Capture the updated screenshot

After executing the action, capture the updated state of the environment as a screenshot, which also differs depending on your environment.



<div data-content-switcher-pane data-value="playwright">
    <div class="hidden">Playwright</div>
    </div>
  <div data-content-switcher-pane data-value="docker" hidden>
    <div class="hidden">Docker</div>
    </div>



### 5. Repeat

Once you have the screenshot, you can send it back to the model as a `computer_call_output` to get the next action.
Repeat these steps as long as you get a `computer_call` item in the response.

#### Handling conversation history

You can use the `previous_response_id` parameter to link the current request to the previous response.
We recommend using this method if you don't want to manage the conversation history on your side.

If you do not want to use this parameter, you should make sure to include in your inputs array all the items returned in the response output of the previous request, including reasoning items if present.

### Acknowledge safety checks

We have implemented safety checks in the API to help protect against prompt injection and model mistakes. These checks include:

- Malicious instruction detection: we evaluate the screenshot image and check if it contains adversarial content that may change the model's behavior.
- Irrelevant domain detection: we evaluate the `current_url` (if provided) and check if the current domain is considered relevant given the conversation history.
- Sensitive domain detection: we check the `current_url` (if provided) and raise a warning when we detect the user is on a sensitive domain.

If one or multiple of the above checks is triggered, a safety check is raised when the model returns the next `computer_call`, with the `pending_safety_checks` parameter.

You need to pass the safety checks back as `acknowledged_safety_checks` in the next request in order to proceed.
In all cases where `pending_safety_checks` are returned, actions should be handed over to the end user to confirm model behavior and accuracy.

- `malicious_instructions` and `irrelevant_domain`: end users should review model actions and confirm that the model is behaving as intended.
- `sensitive_domain`: ensure an end user is actively monitoring the model actions on these sites. Exact implementation of this "watch mode" may vary by application, but a potential example could be collecting user impression data on the site to make sure there is active end user engagement with the application.

### Final code

Putting it all together, the final code should include:

1. The initialization of the environment
2. A first request to the model with the `computer` tool
3. A loop that executes the suggested action in your environment
4. A way to acknowledge safety checks and give end users a chance to confirm actions

{/* Example end-to-end implementation



<div data-content-switcher-pane data-value="playwright">
    <div class="hidden">Playwright</div>
    </div>
  <div data-content-switcher-pane data-value="docker" hidden>
    <div class="hidden">Docker</div>
    </div>

 */}
To see end-to-end example integrations, refer to our CUA sample app repository.

<a
  href="https://github.com/openai/openai-cua-sample-app"
  target="_blank"
  rel="noreferrer"
>
  

<span slot="icon">
      </span>
    Examples of how to integrate the computer use tool in different environments


</a>

## Limitations

We recommend using the `computer-use-preview` model for browser-based tasks. The model may be susceptible to inadvertent model mistakes, especially in non-browser environments that it is less used to.

For example, `computer-use-preview`'s performance on OSWorld is currently 38.1%, indicating that the model is not yet highly reliable for automating tasks on an OS.
More details about the model and related safety work can be found in our updated [system card](https://openai.com/index/operator-system-card/).

Some other behavior limitations to be aware of:

- The [`computer-use-preview` model](https://developers.openai.com/api/docs/models/computer-use-preview) has constrained rate limits and feature support, described on its model detail page.
- [Refer to this guide](https://developers.openai.com/api/docs/guides/your-data) for data retention, residency, and handling policies.

## Risks and safety

Computer use presents unique risks that differ from those in standard API features or chat interfaces, especially when interacting with the internet.

There are a number of best practices listed below that you should follow to mitigate these risks.

#### Human in the loop for high-stakes tasks

Avoid tasks that are high-stakes or require high levels of accuracy. The model may make mistakes that are challenging to reverse. As mentioned above, the model is still prone to mistakes, especially on non-browser surfaces. While we expect the model to request user confirmation before proceeding with certain higher-impact decisions, this is not fully reliable. Ensure a human is in the loop to confirm model actions with real-world consequences.

#### Beware of prompt injections

A prompt injection occurs when an AI model mistakenly follows untrusted instructions appearing in its input. For the `computer-use-preview` model, this may manifest as it seeing something in the provided screenshot, like a malicious website or email, that instructs it to do something that the user does not want, and it complies. To avoid prompt injection risk, limit computer use access to trusted, isolated environments like a sandboxed browser or container.

#### Use blocklists and allowlists

Implement a blocklist or an allowlist of websites, actions, and users. For example, if you're using the computer use tool to book tickets on a website, create an allowlist of only the websites you expect to use in that workflow.

#### Send safety identifiers

Send safety identifiers (`safety_identifier` param) to help OpenAI monitor and detect abuse.

#### Use our safety checks

The following safety checks are available to protect against prompt injection and model mistakes:

- Malicious instruction detection
- Irrelevant domain detection
- Sensitive domain detection

When you receive a `pending_safety_check`, you should increase oversight into model actions, for example by handing over to an end user to explicitly acknowledge the desire to proceed with the task and ensure that the user is actively monitoring the agent's actions (e.g., by implementing something like a watch mode similar to [Operator](https://operator.chatgpt.com/)). Essentially, when safety checks fire, a human should come into the loop.

Read the [acknowledge safety checks](#acknowledge-safety-checks) section above for more details on how to proceed when you receive a `pending_safety_check`.

Where possible, it is highly recommended to pass in the optional parameter `current_url` as part of the `computer_call_output`, as it can help increase the accuracy of our safety checks.

#### Additional safety precautions

Implement additional safety precautions as best suited for your application, such as implementing guardrails that run in parallel of the computer use loop.

#### Comply with our Usage Policy

Remember, you are responsible for using our services in compliance with the [OpenAI Usage Policy](https://openai.com/policies/usage-policies/) and [Business Terms](https://openai.com/policies/business-terms/), and we encourage you to employ our safety features and tools to help ensure this compliance.