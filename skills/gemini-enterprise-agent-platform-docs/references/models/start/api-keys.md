To use Gemini on Gemini Enterprise Agent Platform, authenticate by using a
**Google Cloud API key** or
[**application default credentials**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/gcp-auth).
We recommend using an API key for testing and using application default
credentials for production.

This page shows you how to get a Google Cloud API key based on whether you're a
new or existing Google Cloud user.

Select your user type:
<button value="expressmode" default="">I'm new to Google Cloud or I use express mode</button> <button value="standard">I'm an existing Google Cloud user with a billing account</button>

*** ** * ** ***

## Create an express mode API key

The fastest way to get an API key is through an express mode account in the
Google Cloud console. This streamlined experience is designed for rapid onboarding,
creating an API key for you automatically, regardless of whether you are new to
Google Cloud or are an existing Google Cloud user:

- **If you are new to Google Cloud**, you are guided through a quick, no-cost setup that provides a free 90-day trial environment.
- **If you are an existing Google Cloud user**, you can link your existing billing account to get an API key immediately within the simplified experience of Gemini Enterprise Agent Platform in express mode.

To learn more about Gemini Enterprise Agent Platform in express
mode, see the
[express mode overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/overview)
page.

Get an API key with express mode:

[Get an API key with express mode](https://console.cloud.google.com/expressmode)

To view and manage your API keys, open **APIs \& Services \> Credentials**:

[Go to Credentials](https://console.cloud.google.com/apis/credentials)

## Make your first API request

After getting an API key, learn how to use your API key to make your first
request in the [API quickstart](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start?usertype=apikey#rest_1).

## Optional: Set up your API key locally

For initial testing, you can hard code an API key, but this should only be
temporary since it is not secure. The rest of this section goes through how to
set up your API key locally as an environment variable with different operating
systems.

#### Click to expand instructions

### Linux/macOS

1. Run the following command to see which command-line shell you are
   using:

   ```
   echo $SHELL
   ```

   The output is similar to the following:

   ```
   /bin/bash
   ```
2. Add a shell export variable for your API key, by doing one of the
   following:

   - If the output of the previous step is `/bin/bash`:

     1. Open `.bashrc`:

        ```
        touch ~/.bashrc
                open ~/.bashrc
        ```
     2. Add the following line to `.bashrc`:

        ```
        export GOOGLE_API_KEY=YOUR_API_KEY
        ```
     3. Save the file, then run the following to apply the changes:

        ```
        source ~/.bashrc
        ```
   - If the output of the previous step is `/bin/zsh`:

     1. Open `.zshrc`:

        ```
        touch ~/.zshrc
                open ~/.zshrc
        ```
     2. Add the following line to `.zshrc`:

        ```
        export GOOGLE_API_KEY=YOUR_API_KEY
        ```
     3. Save the file, then run the following to apply the changes:

        ```
        source ~/.zshrc
        ```

### Windows

1. Search for "Environment Variables" in the system settings
2. Edit either "User variables" (for current user) or "System variables" (for all users - use with caution).
3. Create the variable and add `export GOOGLE_API_KEY=YOUR_API_KEY`
4. Apply the changes

*** ** * ** ***

> [!WARNING]
> **WARNING:** It's important to keep your API key secure. Here are a few things to keep in mind when using your API key:
>
> - Google Cloud recommends [application default credentials](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/gcp-auth) as a production-safe way to authenticate your application
> - Gemini Enterprise Agent Platform uses API keys for authorization. If others get access to your API key, they can make calls using your project's quota, which could result in lost quota or additional charges for billed projects, in addition to accessing tuned models and files.
> - Adding [API key restrictions](https://docs.cloud.google.com/api-keys/docs/add-restrictions-api-keys#add-api-restrictions) can help limit the surface area usable through each API key.
> - You're responsible for keeping your API key secure.
>   - Do **not** check API keys into source control.
>   - Client-side applications (Android, Swift, web, and Dart/Flutter) risk exposing API keys. We don't recommend using the Google AI client SDKs in production apps to call the API directly from your mobile and web apps.
>
> For some general best practices, you can also review this
> [support article](https://support.google.com/googleapi/answer/6310037).
