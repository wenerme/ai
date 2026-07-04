The Gemini API lets you include multimodal inputs like text,
images, and video as part of your prompt to Gemini models.
This page provides best practices for designing multimodal prompts and how
to troubleshoot if your prompts aren't working as expected. For general guidance
on prompt design, see
[our recommended prompt design strategies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/prompt-design-strategies),
or see the following list of multimodal-specific best practices.

## Prompt design fundamentals

The following sections describe fundamental best practices for designing effective multimodal prompts.

### Use specific instructions

Clear and detailed prompts provide the best results. If you have a
specific output in mind, include that requirement in the prompt to increase the
likelihood that you get the correct output.

Even when a prompt seems clear to the person who wrote it, the prompt might be
underspecified. To customize model behavior, consider how your prompt
could be interpreted and ensure that the instructions you give are specific
and clear.

If you included the image of this airport board as part of your prompt,
asking the model to just "describe this image" could generate a general
description. If you need the model to parse the time and city from the image,
include that request directly in your prompt.

| Prompt | Model response |
|---|---|
| ![An airport timetable board with times and cities.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/timetable.png) *Describe this image.* | The image shows an airport arrivals and departures board. |

| **Updated prompt** | **Improved response** |
|---|---|
| ![An airport timetable board with times and cities.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/timetable.png) *Parse the time and city from the airport board shown in this image into a list.* | - 10:50 Moscow - 11:05 Edinburgh - 11:05 London - 11:10 Bucharest - 11:30 Kiev - 11:35 Dublin - 11:45 East Midlands - 12:15 Sofia - 12:30 London - 12:30 Newcastle - 12:40 St Petersburg - 12:40 London - 12:45 Manchester |

*** ** * ** ***

### Add examples

The model can accept multiple inputs to use as examples to understand the
output you want. Adding these examples can help the model identify the patterns
and apply the relationship between the given images and responses to the new
example. This is called *"few-shot" learning*.

In the following example, the initial output is a full sentence that also
contains the country (Brazil). If the preferred output is only the city, not
the country, then adding few-shot examples to your prompt can guide
the model to respond in that format.

| **Prompt** | **Model response** |
|---|---|
| ![The Christ the Redeemer statue in Rio de Janeiro, Brazil.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/redeemer.png) *Determine the city along with the landmark.* | The landmark is the Christ the Redeemer statue in Rio de Janeiro, Brazil. |

| **Updated prompt** | **Improved response** |
|---|---|
| *Determine the city along with the landmark.* ![The Colosseum in Rome, Italy.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/colosseum.png) | city: Rome, landmark: the Colosseum. |
| ![The Forbidden City in Beijing, China.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/forbidden-city.png) | city: Beijing, landmark: Forbidden City |
| ![The Christ the Redeemer statue in Rio de Janeiro, Brazil.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/redeemer.png) | city: Rio de Janeiro, landmark: Christ the Redeemer statue |

### Split complex tasks into smaller tasks

For complex tasks like those that require both visual understanding and
reasoning, split the task into smaller, more straightforward steps or
directly ask the model to think step by step in the prompt.

| Prompt | Model response |
|---|---|
| ![A picture of three rolls of toilet paper.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/toilet-paper.jpg) *When will I run out of toilet paper?* | Soon, you only have 3 rolls left. |

| **Updated prompt** | **Improved response** |
|---|---|
| ![A picture of three rolls of toilet paper.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/toilet-paper.jpg) 1. *First, count how many toilet paper rolls are in this picture.* 2. *Then, determine how much toilet paper a typical person uses per day.* 3. *Calculate how long these rolls of toilet paper will last.* | 1. There are 3 rolls of toilet paper in this picture. 2. A typical person uses about 20 sheets of toilet paper per day. 3. If each roll contains 200 sheets, then each roll will last for about 10 days. Therefore, the 3 rolls will last for about a month. |

Math problems or other types of word problems can also be broken down into smaller tasks.

| **Prompt** | **Response** |
|---|---|
| ![A picture of mathematical sequence b. b(1) = 15, and b(n) = b(n-1) * (-3).](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/math.jpg) What is the 4th term in the sequence? | -135 |

The response from the model is incorrect. Try asking the model to parse the problem before answering the prompt.

| **Prompt** | **Response** |
|---|---|
| ![A picture of mathematical sequence b. b(1) = 15, and b(n) = b(n-1) * (-3).](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/math.jpg) Parse the formula in the image first. Then based on the formula, answer "what's the 4th term in the sequence?". | *Click to expand the result* $$b(n) = b(n-1) \* (-3)$$ $$b(1) = 15$$ 1. Substitute n = 4 into the formula: $$b(4) = b(4-1) \* (-3)$$ $$b(4) = b(3) \* (-3)$$ 2. We don't know the value of b(3), so substitute n = 3 into the formula: $$b(3) = b(3-1) \* (-3)$$ $$b(3) = b(2) \* (-3)$$ 3. We don't know the value of b(2), so substitute n = 2 into the formula: $$b(2) = b(2-1) \* (-3)$$ $$b(2) = b(1) \* (-3)$$ 4. We know the value of b(1) is 15, so substitute it into the formula: $$b(2) = 15 \* (-3)$$ $$b(2) = -45$$ 5. Now that we know the value of b(2), substitute it into the formula for b(3): $$b(3) = b(2) \* (-3)$$ $$b(3) = -45 \* (-3)$$ $$b(3) = 135$$ 6. Now that we know the value of b(3), substitute it into the formula for b(4): $$b(4) = b(3) \* (-3)$$ $$b(4) = 135 \* (-3)$$ $$b(4) = -405$$ Therefore, the 4th term in the sequence is -405. |

To make the response even more streamlined, you can ask the model to think
through the prompt step by step.

| **Updated prompt** | **Improved response** |
|---|---|
| ![A picture of mathematical sequence b. b(1) = 15, and b(n) = b(n-1) * (-3).](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/math.jpg) What is the 4th term in the sequence? Think step by step. | The first term is 15. The second term is b(1) \* (-3) = 15 \* (-3) = -45. The third term is b(2) \* (-3) = -45 \* (-3) = 135. The fourth term is b(3) \* (-3) = 135 \* (-3) = -405. |

### Specify the output format

When a certain format is required, you can instruct the model to use that format
for its output.

| Prompt | Model response |
|---|---|
| ![A picture of a spreadsheet in Excel.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/excel-example.png) Parse the table in this image into Markdown format | ``` | Subject   | Status      | Time    | Start date | Due on     | |---|---|---|---|---| | Math      | Done        | 1.5 hrs | 11/29/2023 | 12/1/2023  | | Geography | Done        | 30 min  | 12/2/2023  | 12/4/2023  | | Physics   | In progress | 2 hrs   | 12/3/2023  | 12/5/2023  | | Biology   | Not started | 6 hrs   | 11/2/2016  | 12/6/2023  | ``` |

| **Prompt** | **Model response** |
|---|---|
| ![A picture of a meal with shrimp, clams, and other ingredients.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/spanish-meal.png) Provide a list of all the following attributes: ingredients, type of cuisine, vegetarian or not, in JSON format | { "ingredients": [ "rice", "shrimp", "clams", "mussels", "peas", "tomatoes", "onions", "garlic", "olive oil", "paprika", "salt", "pepper" ], "type of cuisine": "Spanish", "vegetarian": false } |

## Troubleshoot a multimodal prompt

Troubleshooting a prompt can involve improving the language of your prompt,
directing the focus of your prompt, or tuning parameters. These different
approaches can lead to improved results, especially after determining the root
cause of the issue.

### Focus on the relevant part of an image

To improve the response, point out which parts of the image are most
relevant to the prompt.

| Prompt | Model response |
|---|---|
| ![A picture of the side of a box of diapers; the number 198 is written on the box.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/diapers.png) How many days will these diapers last a baby? | The diapers will last for 198 days before they run out. |

| **Updated prompt** | **Improved response** |
|---|---|
| ![A picture of the side of a box of diapers; the number 198 is written on the box.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/diapers.png) How long will these diapers last before I run out? Use the weight shown on the box to determine the child's age, and use the total number of diapers in the box. Divide the total number by how many diapers the child goes through per day. | The box contains 198 diapers. The box states the diapers are for a child weighing 22-37 lbs. The average child in this weight range is likely between 1 and 2 years old. A 2-year-old typically goes through 6 diapers per day, therefore, the diapers will last around 33 days (198/6). |

### Tailor the model's response to input

Ask the model to describe the images before performing the task in the prompt.

| Prompt | Model response |
|---|---|
| ![A picture of a person packing a suitcase.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/packing.jpg) ![A picture of an empty hallway in a shopping mall.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/mall.jpg) ![A picture of three rolls of toilet paper.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/toilet-paper.jpg) ![A picture of dark clouds breaking over the sea.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/ocean.jpg) What is in common between these images? | All four images are examples of landscape photography. |

| **Updated prompt** | **Improved response** |
|---|---|
| ![A picture of a person packing a suitcase.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/packing.jpg) ![A picture of an empty hallway in a shopping mall.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/mall.jpg) ![A picture of three rolls of toilet paper.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/toilet-paper.jpg) ![A picture of dark clouds breaking over the sea.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/ocean.jpg) First, describe what's in each image in detail. What's in common between these images? | The first image shows a person packing a suitcase. The second image shows an empty hallway in a shopping mall. The third image shows a roll of toilet paper. The fourth image shows a dark and stormy sea. The commonality between these images is that they are all examples of liminal spaces. Liminal spaces are places or situations that are in between two other places or situations. They are often characterized by a sense of uncertainty or ambiguity. The first image shows the person in between being at home and being on a trip. The second image shows the hallway in between two stores. The third image is of toilet paper, which can represent a bathroom. A bathroom is a transitional space between private and public realms. It's a place where we prepare ourselves to enter or leave the outside world. The fourth image shows the sea in between being calm and being stormy. Liminal spaces can be both exciting and unsettling. They can be a place of new beginning or a place of endings. They can be a place of reflection or a place of action. |

You can explicitly ask the model to refer to what's in the image.

| **Updated prompt** | **Improved response** |
|---|---|
| ![A picture of a person packing a suitcase.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/packing.jpg) ![A picture of an empty hallway in a shopping mall.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/mall.jpg) ![A picture of three rolls of toilet paper.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/toilet-paper.jpg) ![A picture of dark clouds breaking over the sea.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/ocean.jpg) What is in common between these images? Refer to what's in the images in your response. | All of the images are related to travel. The first image shows a person packing a suitcase, the second image shows an empty hallway in a shopping mall, the third image shows a stack of toilet paper, and the fourth image shows a dark and stormy sea. These images are all related to travel because they are all things that people need or use when they travel. The first image shows a person packing a suitcase, which is something that people do when they are going on a trip. The second image shows an empty hallway in a shopping mall, which is a place where people often go to buy things for their trips. The third image shows a stack of toilet paper, which is something that people often use when they are traveling. The fourth image shows a dark and stormy sea, which is something that people often encounter when they are traveling. |

The same tips work for creative output. Explicitly ask the model to include
aspects from the image; this can improve the output.

| Prompt | Model response |
|---|---|
| ![A picture of a brown rabbit.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/rabbit.jpg) Can you write me a poem about this image? | ``` Little bunny, so soft and brown, Hopping through the field, up and down. Your ears so long, your tail so small, You're the cutest creature of them all. ``` ``` You nibble on the grass, so green and sweet, And hop away when you see me. But I'll always be your friend, Little bunny, until the very end. ``` |

| **Updated prompt** | **Improved response** |
|---|---|
| ![A picture of a brown rabbit.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/rabbit.jpg) Can you write me a descriptive and dramatic poem about this image and include the location? | ``` Little bunny on the green, Ears so long, so keen. What do you see out there, In the distance, where you stare? ``` ``` Is it the ocean blue, Sparkling in the sun's hue? Or the waves that crash and roar, A rhythm that you adore? ``` ``` Little bunny, tell me true, What captures your attention so? Is it the salty breeze, Or the seagulls' cries that please? ``` ``` Perhaps it's the vastness of it all, A world so big and small. A place where dreams can roam, And adventures can be sown. ``` ``` Little bunny, I wonder what you dream, As you sit on the grass, so serene. Do you yearn to explore the deep, Or stay on land, where you can leap? ``` ``` Whatever it may be, little bunny, Keep that spark of wonder burning brightly. For in your dreams and aspirations, Lies a world waiting for your creation. ``` |

### Determine how the prompt failed

A prompt can fail because the model did not understand the image at all, or
because it did not perform the correct reasoning steps afterward. To
disambiguate between those reasons, ask the model to describe what's in the
image.

In this example, if the model responds with a snack that seems surprising when
paired with tea (like popcorn), first determine whether the model recognized
that the image contains tea.

| Prompt | Prompt for troubleshooting |
|---|---|
| ![A picture of a tea set.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/tea-set.png) What's a snack I can make in 1 minute that would go well with this? | ![A picture of a tea set.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/tea-set.png) Describe what's in this image. |

Asking the model to explain its reasoning can help narrow down which part of
the reasoning broke down, if any.

| Prompt | Prompt for troubleshooting |
|---|---|
| ![A picture of a tea set.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/tea-set.png) What's a snack I can make in 1 minute that would go well with this? | ![A picture of a tea set.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/tea-set.png) What's a snack I can make in 1 minute that would go well with this? Please explain why. |

### Tune the sampling parameters

In each request, you send not only the multimodal prompt but a set of sampling
parameters to the model. The model can generate different results for different
parameter values. Experiment with the different parameters to get the best
values for the task. The most commonly adjusted parameters are the following:

- [Temperature](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/design-multimodal-prompts#temperature)
- [top-P](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/design-multimodal-prompts#top-p)

#### Temperature

Temperature is used for sampling during response generation, which occurs when
top-P and top-K are applied. Temperature controls the degree of randomness in
token selection. Lower temperatures are good for prompts that require a more
deterministic and less open-ended or creative response, while higher
temperatures can lead to more diverse or creative results. A temperature of
0 is deterministic, meaning that the highest probability response is most
likely to be selected.

For most use cases, start with a temperature of 0.4. If you need more
creative results, increase the temperature. If you observe clear
hallucinations, reduce the temperature.

#### Top-P

Top-P changes how the model selects tokens for output. Tokens are selected
from the most to least probable until the sum of their probabilities equals
the top-P value. For example, if tokens A, B, and C have a probability of 0.6,
0.3, 0.1 and the top-P value is 0.9, then the model will select either A or B
as the next token by using temperature and excludes C as a candidate.

Specify a lower value for less random responses and a higher value for more
random responses. The default value of top-P is 1.0.

## What's next

- Try a quickstart tutorial using [Agent Studio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/start/quickstart-ide) or the [Agent Platform API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start).
- To get started using the Gemini API, see the [Gemini API quickstart](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start).
