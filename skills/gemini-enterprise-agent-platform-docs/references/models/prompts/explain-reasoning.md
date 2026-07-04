## Examples

For example, suppose you're writing a cooking blog and you want the model to tell you how readers
might interpret different parts of the blog. If you don't instruct the model to explain its
reasoning, the response from the model might not be as useful as you'd like:

| No |
| --- |
| Prompt: `What is the most likely interpretation of this sentence? The sentence: "The chef seasoned the chicken and put it in the oven because it looked pale."` Response: `The chef seasoned the chicken and put it in the oven because it lacked color and needed cooking.` (gemini-pro) |

While you learned about how the model predicts readers might interpret the sentence, it might be
useful for you to understand more about the specific predictions that the model made to produce the
response. As demonstrated in the following example, the quality of the response might also
improve:

| Yes |
| Prompt: `What is the most likely interpretation of this sentence? Explain your reasoning The sentence: "The chef seasoned the chicken and put it in the oven because it looked pale."` Response: `Interpreting "The chef seasoned the chicken and put it in the oven because it looked pale." The most likely interpretation is that the chef seasoned the chicken to add flavor and color, then put it in the oven to cook it. Here's the reasoning: - Seasoning is typically used to enhance the flavor of food. Chefs often use spices, herbs, and other ingredients to make their dishes more appealing. - "Pale" suggests the chicken lacked visual appeal before being seasoned. This could imply it was unseasoned or simply lacking color from spices. - Putting the chicken in the oven is a common cooking method. The sentence implies the chef's intention is to cook the chicken, not just season it. Therefore, the chef's actions are likely aimed at both improving the taste and appearance of the chicken through seasoning and then cooking it in the oven.` (gemini-pro) |

Another technique you can use to improve the model's response is to instruct the model to think
step-by-step and explain it's reasoning. This requires the model to break down the input into steps
and provide the reasoning its using to solve the problem:

| Prompt: `What is the most likely interpretation of this sentence? Think step by step and print out the thinking process. Please output in JSON format with final answer in 'answer', and thinking steps in 'think' fields. The sentence: "The chef seasoned the chicken and put it in the oven because it looked pale."` Response: `{ "answer": "The chef seasoned the chicken to enhance its flavor and put it in the oven to cook it because it appeared to be undercooked.", "think": [ { "step": 1, "thought": "The chef seasoned the chicken. This suggests that the chef is preparing the chicken for cooking." }, { "step": 2, "thought": "The chef put the chicken in the oven. This indicates that the chef is cooking the chicken." }, { "step": 3, "thought": "The sentence states that the chicken looked pale. Pale chicken is often undercooked." }, { "step": 4, "thought": "Combining these observations, it is most likely that the chef seasoned the chicken to enhance its flavor and put it in the oven to cook it because it appeared to be undercooked." } ] }` (gemini-pro) |

By prompting the model to print out its thinking process, the model generated a more thorough
response and you learned more about how it generated that response.

## What's next

- Explore more examples of prompts in the Prompt gallery.
