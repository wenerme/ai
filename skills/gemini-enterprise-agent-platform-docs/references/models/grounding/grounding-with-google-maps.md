This page describes how Grounding with Google Maps with Gemini Enterprise Agent Platform can help to enhance your
generative AI applications by providing geospatial context.

## Overview

Grounding with Google Maps with Gemini Enterprise Agent Platform is a service that connects Gemini models with
geospatial data from Google Maps. Google Maps has access to
information on millions of locations, including businesses, landmarks, and
points of interest. This data gives you access to information on over 250
million places that can be used to ground your model's responses, enabling your
AI applications and agents to provide local data and geospatial context.

You can also enable concurrent grounding with Google Maps,
Google Search, and grounding with your data sources.

### Uses of Grounding with Google Maps

You can use Grounding with Google Maps for various applications, such as:

- Conversational assistants that can answer questions about nearby places, such as "Where's the nearest place to get an Italian espresso?"
- Personalized descriptions and community insights, such as "Can you tell me more about family-friendly restaurants that are within a walkable distance?"
- Summaries of areas around specific locations, such as an EV charging station or a hotel.

This can be beneficial for use cases in real estate, travel, mobility, and
social-media apps.
[Try the Grounding with Google Maps demo](https://mapsplatform.google.com/demos/grounding-with-google-maps/)

## Supported models

This section lists the models that support Grounding with Google Maps.

#### Click to expand supported models

- [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)
- [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)
- [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)
- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview
- [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview
- [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview
- [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)
- [Gemini 2.5 Flash with Gemini Live API native audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api)

Gemini 3 Pro and Gemini 3 Pro Image are limited to 5,000
search queries per day.

For more information about the Gemini models, see [Gemini models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/overview#gemini-models).

## Use Grounding with Google Maps to ground your model's responses

This code sample demonstrates how to use Grounding with Google Maps to ground
your model's responses.

Search results can be customized for a specific geographic location by using the
latitude and longitude coordinates.

### Console

To use Grounding with Google Maps with Gemini Enterprise Agent Platform, follow these steps:

1. In the Google Cloud console, go to the **Vertex AI Studio** page.

   [Go to Vertex AI Studio](https://console.cloud.google.com/agent-platform/studio/multimodal;mode=prompt)
2. In the **Tools** section, click **Grounding: Google**. A configuration pane
   appears.

3. To use Google Maps, click **Google Maps** toggle.

4. Click **Apply**.

5. Enter your prompt in the field, and click **Submit**. Your prompt responses
   ground to Google Maps.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    from google import genai
    from google.genai.types import (
        GenerateContentConfig,
        GoogleMaps,
        HttpOptions,
        Tool,
    )

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Where can I get the best espresso near me?",
        config=GenerateContentConfig(
            tools=[
                # Use Google Maps Tool
                Tool(google_maps=GoogleMaps())
            ],
            tool_config=types.ToolConfig(
                retrieval_config = types.RetrievalConfig(
                    lat_lng = types.LatLng( # Pass geo coordinates for location-aware grounding
                        latitude=40.7128,
                        longitude=-74.006
                    ),
                    language_code = "en_US", # Optional: localize Maps results
                ),
            ),
        ),
    )

    print(response.text)
    # Example response:
    # 'Here are some of the top-rated places to get espresso near you: ...'

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region to process the request. To use the [global endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#use_the_global_endpoint), exclude the location from the endpoint name and configure the location of the resource to global.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- <var class="edit" scope="MODEL_ID" translate="no">MODEL_ID</var>: The model ID of the multimodal model.
- <var class="edit" scope="PROMPT" translate="no">PROMPT</var>: The prompt to send to the model.
- <var class="edit" scope="LATITUDE" translate="no">LATITUDE</var>: The latitude of the location. For example, a latitude of `37.7749` represents San Francisco. You can obtain latitude and longitude coordinates using services like Google Maps or other geocoding tools.
- <var class="edit" scope="LONGITUDE" translate="no">LONGITUDE</var>: The longitude of the location. For example, a longitude of `-122.4194` represents San Francisco.
- <var class="edit" scope="GROUNDING_TYPES" translate="no">GROUNDING_TYPES</var>: The types of Google Maps grounding to enable. Currently supports `places` and `routing`.
  - `places`: Search for place information including establishments, prominent points of interest, and geographical locations.
  - `routing`: Find directions and search along route. Routing is in Private Preview.

  If not specified, it defaults to `places` only.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent
```

Request JSON body:

```
{
  "contents": [{
    "role": "user",
    "parts": [{
      "text": "PROMPT"
    }]
  }],
  "tools": [{
    "googleMaps": {
      "groundingTypes": {
        "places": {},
        "routing": {}
      }
    }
  }],
  "toolConfig": {
    "retrievalConfig": {
      "latLng": {
        "latitude": LATITUDE,
        "longitude": LONGITUDE
      },
      "languageCode": "en_US"
    }
  },
  "model": "projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID"
}
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "\"The Italian Place\" in Alexandria, VA, is good for children and offers takeout. It has a rating of 4.2 stars based on 411 reviews."
          }
        ]
      },
      "finishReason": "STOP",
      "groundingMetadata": {
        "groundingChunks": [
          {
            "maps": {
              "uri": "https://maps.google.com/?cid=9001322937822692826",
              "title": "The Italian Place",
              "placeId": "places/ChIJOTRDf_qwt4kR2kV_WYUf63w"
            }
          },
          {
            "maps": {
              "uri": "https://maps.google.com/?cid=9001322937822692826",
              "title": "Hank's Pasta Bar",
              "placeId": "places/MMVtPzn9FGcevML89",
              "placeAnswerSources": {
                "reviewSnippets": [
                  {
                    "id": "places/ChIJOTRDf_qwt4kR2kV_WYUf63w",
                    "title": "Google Maps Review",
                    "uri": "https://maps.google.com/?cid=9001322937822692826"
                  },
                ]
              }
            }
          },
          ...
        ],
        "groundingSupports": [
          {
            "segment": {
              "endIndex": 79,
              "text": "\"The Italian Place\" in Alexandria, VA, is good for children and offers takeout."
            },
            "groundingChunkIndices": [
              0
            ]
          },
        ],
      }
    }
  ],
  ...
}
```

## Place properties

This section lists place properties that are used to describe locations and used
by Grounding with Google Maps to generate responses. These properties are
used to determine the types of questions that Grounding with Google Maps can
answer.

### Sample place properties

This list provides an alphabetized sampling of properties about places that can
be used by your model to generate responses.

- Address
- Curbside pickup
- Debit card
- Distance
- Free parking lot
- Live music
- Menu for children
- Opening hours
- Payment options (such as *cash* or *credit card*)
- Place answer
- Pet friendly
- Serves beer
- Serves vegetarian food
- Wheelchair accessible
- Wifi

**Place answers** are a response from Grounding with Google Maps based on
information derived from user reviews.

### Examples of using place properties

The following examples use [place properties](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-maps#place-properties) in questions
about different types of places. Grounding with Google Maps uses the
properties to understand your intent and then provides relevant answers based on
the data associated with places in Google Maps.

- **Plan a family dinner** : You might ask, *Is "The Italian Place" good for
  children, and do they offer takeout? What is their rating?*

  Answers to these
  questions help you to determine if a restaurant is suitable for a family and
  if the restaurant offers a convenient service.

- **Check accessibility for a friend** : You might ask, *I need a restaurant that
  has a wheelchair accessible entrance.*

  A response to this prompt might help
  you to determine if the location meets specific accessibility needs.

- **Find a location for a late-night snack** : You might ask, *Is "Burger Joint"
  open now? Do they serve dinner? What are their opening hours for Friday?*

  Answers to these questions help you to find an open establishment serving a
  specific meal during a particular time.

- **Meet a client for coffee** : You might ask, *Does "Cafe Central" have Wifi?
  Do they serve coffee? What is their price level, and do they accept credit
  cards?*

  Answers to these questions help you to assess the suitability of a
  cafe for a business meeting based on amenities, offerings, and payment
  options.

Information in the **Google Maps Grounded Results** might differ from actual
conditions of the road.

### Understand your response

Google Maps sources are returned in `groundingMetadata` within
`groundingChunks`. Sources are returned for places and for user reviews,
which are used to help generate the **Google Maps Grounded Result**.

This code sample demonstrates a place source and a place answer source in the
response:

    "groundingChunks": [
      {
        "maps": {
          "uri": "{Link to Maps Content}",
          "title": "{Name of Maps Place}",
          "placeId": "{Place ID}",
          "placeAnswerSources": {
            "reviewSnippets" : [
              {
                "reviewId": "{Review ID}",
                "googleMapsUri": "{Link to Maps Content}",
                "title": "{Title of review}"
              }
            ]
          }
        },
      }
    ],

## Routing - Find Directions

> [!NOTE]
>
> **Private Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

Grounding with Google Maps supports Find Directions capability. This feature
lets your AI agents understand physical movement, real-time travel estimates,
and the spatial relationships between locations. With Find Directions
capability, your model can provide performance-optimized directions and
accurate travel times that account for real-time conditions. This integration
enables Grounding with Google Maps to filter places based on travel time,
offer precise point-to-point directions, and calculate estimated commute times
for specific modes of transportation.

Find Directions capabilities are available as a Restricted
[Preview](https://cloud.google.com/products#product-launch-stages). To access
this feature for your project, contact your Google Cloud account team to request
addition to the allowlist. Alternatively, you can submit the
[participation form](https://forms.gle/tMWmCTxKhXCqwXts5) to be considered.
Google is accepting interest from a limited cohort of partners to pilot Find
Directions as a new feature in Grounding with Google Maps.

### Capabilities

Find Directions calculates precise travel distances and durations between
origins and destinations.

Find Directions supports the following:

- **Modes of transportation**: Routing for driving, walking, bicycling, transit,
  and two-wheeled motorized vehicles (not all travel modes are
  available in all countries)

- **Multiple waypoints**: Up to 13 intermediate stops between origin
  and destination

- **Real-time traffic**: Accounting for current traffic conditions to provide
  accurate "live" travel times rather than static averages

The following are examples of the types of questions that Find Directions
supports:

- **Proximity based on travel time**: "What are some American restaurants within
  a 10-minute walk from the Hilton Hotel on 1335 6th Ave in NYC?"

- **Commute estimation**: "How long does it take to take public transit from
  Pike Place Market to Capitol Hill in Seattle?"

### Understand the response

When a prompt triggers Find Directions capability, the model generates a
natural language answer backed by structured metadata. This lets you display
precise travel information to the user.

The following data is returned in a payload response:

- **Duration**: The time required to travel between locations, accounting for
  traffic if requested. For example, "500 seconds".

- **Distance**: The physical distance of the route. For example, "1.9 km".

- **Polyline**: An encoded text string that lets you visually render the
  specific route path on a map.

The following is an example response for the prompt: "How do I get to Carmine's
restaurant from the Hilton Hotel (1335 6th Ave in NYC) where I'm staying?"
> To get to Carmine's restaurant from the Hilton Hotel at 1335 6th Ave in NYC,
> you'll want to head to the Carmine's - Time Square location at 200 W 44th St,
> New York, NY 10036, USA.
>
> Here are the walking directions:
>
> 1. **Start at the Hilton Hotel:** Exit the Hilton Hotel at 1335 6th Ave.
>
> 2. **Walk South on 6th Avenue:** Head south on 6th Avenue (Avenue of the
>    Americas) towards W 44th Street.
>
> 3. **Turn Right onto W 44th Street:** Turn right onto W 44th Street.
>
> 4. **Carmine's is on your left:** Walk down W 44th Street, and Carmine's will
>    be on your left side at 200 W 44th St.
>
> This walk is approximately 0.5 miles and should take about 10-15 minutes.

The following is an example response for the prompt: "How long does it take to
take public transit from Pikes Place Market to Capitol Hill in Seattle?"
> To get from Pike Place Market to Capitol Hill in Seattle using public transit,
> you have a couple of options:
>
> - **Tram (Light Rail):** The tram from Westlake, which is near Pike Place
>   Market, to Capitol Hill takes approximately 3 minutes. Including
>   transfers, the total travel time is about 9 minutes, with trams departing
>   every 10 minutes.
>
> - **Bus:** A direct King County Metro bus from Pike St \& 4th Ave (near Pike
>   Place Market) to Capitol Hill takes about 11 minutes, with departures
>   every 20 minutes. Alternatively, the Line 49 bus takes around 16 minutes.

## Routing - Search Along Route

> [!NOTE]
>
> **Private Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

Search Along Route allows your AI agents to discover points of interest
that are geographically relevant and convenient to a user's planned journey. By
grounding responses in Google Maps's routing and spatial search engines, your
model can provide recommendations that minimize detours and understand the
logistical flow of a road trip or commute.

Search Along Route capabilities are available as a Restricted Preview. To access
this feature for your project, please contact your Google Cloud account team to
request addition to the allowlist. Alternatively, you can also
[submit this form](https://forms.gle/tMWmCTxKhXCqwXts5) to be considered for
participation. Note that at this time we are accepting interest from a limited
cohort of partners only to pilot the Grounding with Google Maps Search Along
Route tool.

### Capabilities

Search Along Route allows your application to identify specific businesses,
amenities, or attractions situated directly along a generated path between an
origin and destination. Only the "Drive" travel mode is supported in the
Preview.

The following examples illustrate the types of questions the Search Along Route
tool can handle.

- **Basic route search**: "Find gas stations on the way from 1800 Amphibious Blvd. Mountain View, CA 94045, to 456 Sunny St, Sunnyvale CA." (Usually, the origin and destination addresses are derived from the chat history.)
- **Search based on Place Properties**: "Are there any bakeries with at least a 4 star rating between San Francisco and 1800 Amphibious Blvd. Mountain View, CA 94045?"
- **Multi-leg route search**: "I'm going on a roadtrip from San Francisco to San Luis Obispo to Los Angeles, suggest three EV charger options between San Francisco and San Luis Obispo, and then between San Luis Obispo and Los Angeles?"

### Understand the response

When a prompt triggers the Search Along Route tool, the model generates a
natural language answer backed by structured metadata that combines both Places
and Routing data. This ensures the suggested locations are actually convenient
to the physical path of travel. The `groundingMetadata` will contain
`groundingChunks` for returned places and the route searched along.

**Example Prompt \[Basic route search\]**:

Find gas stations on the way from 1800 Amphibious Blvd. Mountain View, CA 94045,
to 456 Sunny St, Sunnyvale CA.

**Example Response \[Basic route search\]**:
> Here are some gas stations en route from 1800 Amphibious Blvd. Mountain View, CA 94045 to
> 456 Sunny St, Sunnyvale, CA:
>
> - **Example Gas station** - Located at 123 Example Rd, Sunnyvale, CA 94045. It has a rating of 3.5 stars from 122 reviews and sells hydrogen, propane, and gasoline, along with car washes. It is open until 9:50 PM tonight and has restrooms.
> - **Fictional Gas station** - Located at 456 Fictional Ave, Sunnyvale, CA 94045. It has a rating of 3.6 stars from 52 reviews and offers a convenience store and car wash. This station is open 24 hours and has restrooms.
> - **Generic Gas station** - Located at 789 W Generic St, Sunnyvale, CA 94045. It has a rating of 3.6 stars from 35 reviews. This station is open 24 hours and has restrooms.

**Example Prompt \[Multi-leg route search\]**:

I'm going on a roadtrip from San Francisco to
San Luis Obispo to Los Angeles, suggest three EV charger options between
San Francisco and San Luis Obispo, and then between San Luis Obispo and
Los Angeles?

**Example Response \[Multi-leg route search\]**:
> Here are some EV charger options for your road trip from San Francisco to Los
> Angeles, with stops in San Luis Obispo.
>
> **Between San Francisco and San Luis Obispo**:
>
> - **Example Charger**: Located at 123 Example Blvd, Campbell, CA 95008, this station has a rating of 4.5.
> - **Fictional EV Station**: You can find this station at 456 Fictional Rd, Gilroy, CA 95008, with a rating of 4.4.
> - **Generic Charging Station**: This station is at 789 Generic St, Salinas, CA 95008, and has a rating of 3.5.
>
> **Between San Luis Obispo and Los Angeles**:
>
> - **Example Charger**: Located at 123 Example Rd, San Luis Obispo, CA 93123, this station has a rating of 4.3.
> - **Fictional EV Station**: This station can be found at 456 Fictional Ave, Santa Barbara, CA 93123, with a rating of 3.9.
> - **Generic Charging Station**: You can find this station at 789 Generic St, Glendale, CA 93123, with a rating of 3.0.
>
> Have a great road trip!

## Service usage requirements

This section describes the service usage requirements for Grounding with Google Maps.

### Inform the user about the use of Google Maps sources

With each **Google Maps Grounded Result** , you'll receive sources in
`groundingChunks` that support each response. The following metadata is also
returned:

- source uri
- title
- ID

When presenting results from Grounding with Google Maps with Gemini Enterprise Agent Platform, you must specify the
associated Google Maps sources, and inform your users of the following:

- The Google Maps sources must immediately follow the generated content that the sources support. This generated content is also referred to as **Google Maps Grounded Result**.
- The Google Maps sources must be viewable within one user interaction.

### For voice-first interfaces

**Sourcing:** Google Maps sources must be displayed in a companion UI that
shows a verbatim historical record of any AI voice conversation. This record
must adhere to the sourcing requirements and is subject to the applicable data
caching and storage limits.

**Active disclosure of sources:** End users must be made reasonably aware of the
role Google Maps plays in their experience and how to find detailed sourcing
at the time of interaction.

The active disclosure of sources must convey the following points:

- AI generated content may include information from Google Maps.

- Detailed sources are available in the companion UI.

You must convey the active disclosure of sources using **at least one** of the
following methods.

- **Visual display:** For voice interactions that occur on a device with a
  screen, display the active disclosure on the screen whenever
  Grounding with Google Maps is used.

- **Voice announcement:** Read the active disclosure to the user. This must
  occur during the first interaction supported by Grounding with Google Maps
  and recur at least every 6 months.

*Example disclosure: "AI generated content may include information from
Google Maps. You can find detailed sources in the companion app."*

**Persistent disclosure:** An explanation that Google Maps content may be used
in AI generated content must be persistently accessible to the end user (e.g.,
in a voice settings menu or a voice interaction disclosure).

**User inquiries:** Your voice assistant must accurately answer end user
inquiries regarding the source of the content, including when AI generated
content includes information from Google Maps. If Google Maps is the
source, direct end users to the companion UI for access to specific source
information.

### Display Google Maps sources with Google Maps links

For each source in `groundingChunks` and in
`grounding_chunks.maps.placeAnswerSources.reviewSnippets`, a link preview must
be generated following these requirements:

- Attribute each source to Google Maps following the [Google Maps text
  attribution guidelines](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-maps#google-maps-attribution-guidelines).
- Display the source title provided in the response.
- Link to the source using the `uri` or `googleMapsUri` from the response.

These images show the minimum requirements for displaying the sources and
Google Maps links.

![Prompt with response showing sources](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/Sources-Expanded.jpg)

You can collapse the view of the sources.

![Prompt with response and sources collapsed](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/Sources-Collapsed.jpg)

Optional: Enhance the link preview with additional content, such as:

- A [Google Maps favicon](https://www.google.com/favicon.ico) is inserted before the Google Maps text attribution.
- A photo from the source URL (`og:image`).

For more information about some of our Google Maps data providers and their
license terms, see the [Google Maps and Google Earth legal
notices](https://www.google.com/help/legalnotices_maps/).

### Google Maps text attribution guidelines

When you attribute sources to Google Maps in text, follow these guidelines:

- Don't modify the text **Google Maps** in any way:
  - Don't change the capitalization of **Google Maps**.
  - Don't wrap **Google Maps** onto multiple lines.
  - Don't localize **Google Maps** into another language.
  - Prevent browsers from translating **Google Maps** by using the HTML attribute `translate="no"`.
- Style **Google Maps** text as described in the following table:

| Property | Style |
|---|---|
| Font family | Roboto. Loading the font is optional. |
| Fallback font family | Any sans serif body font already used in your product or "Sans-Serif" to invoke the default system font |
| Font style | Normal |
| Font weight | 400 |
| Font color | White, black (#1F1F1F), or gray (#5E5E5E). Maintain accessible (4.5:1) contrast against the background. |
| Font size | Minimum font size: 12sp Maximum font size: 16sp To learn about sp, see Font size units on the [Material Design website.](https://m3.material.io/styles/typography/type-scale-tokens#3f4488e7-3b74-45b0-a143-9d6afa4d62dc) |
| Letter spacing | Normal |

#### Example CSS

The following CSS renders **Google Maps** with the appropriate typographic
style and color on a white or light background.

    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    .GMP-attribution {
    font-family: Roboto, Sans-Serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    letter-spacing: normal;
    white-space: nowrap;
    color: #5e5e5e;
    }

### Place ID and review ID

The Google Maps data includes place ID and review ID. You
might cache, store, and export the following response data:

- `placeId`
- `reviewId`

The restrictions against caching in the Grounding with Google Maps Terms
don't apply.

### Prohibited Territory

Grounding with Google Maps has restrictions for certain content and
activities to maintain a safe and reliable platform. Customer won't distribute
or market a Customer Application that offers Grounding with Google Maps in a
Prohibited Territory. For more information, see
[Google Maps Platform Prohibited Territories](https://cloud.google.com/maps-platform/terms/maps-prohibited-territories).
The list of Prohibited Territories may be updated from time to time.

## What's next

- To learn more about how to ground Gemini models to your data, see [Grounding with
  your data](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/ground-responses-using-rag).
- To learn more about responsible AI best practices and Gemini Enterprise Agent Platform's safety filters, see [Responsible AI](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
