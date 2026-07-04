## Examples

In this example, let's say you want the model to write ad copy for your product. You could start
by defining the following prompt content:

- Objective: Create ad copy
- Context: Categories: scarcity, exclusivity Product description: "Chromecast is a device that allows users to wirelessly cast their content from other devices, so they can watch their favorite movies, TV shows, photos, websites, and more on their TV. Chromecast can display content from Android smartphones and tablets, iPhones & iPads, Windows and Mac laptops, and the Chromebook Pixel."
- Constraints: Each response should be two sentences or less.

Experimenting with how you provide the content to the model can help you to ensure that the
model's response best fits your needs. Suppose you give the model the prompt content exactly as
written:

| First iteration |
| --- |
| Prompt: `Create ad copy. Categories: scarcity, exclusivity Product description: "Chromecast is a device that allows users to wirelessly cast their content from other devices, so they can watch their favorite movies, TV shows, photos, websites, and more on their TV. Chromecast can display content from Android smartphones and tablets, iPhones & iPads, Windows and Mac laptops, and the Chromebook Pixel." Constraints: Each response should be two sentences or less.` Response: `Scarcity * Time is running out to experience the future of entertainment! Get your Chromecast before they're gone. * Limited quantities available! Don't miss your chance to own the streaming device everyone's talking about. Exclusivity * Unlock a world of entertainment with Chromecast. Experience the freedom of streaming like never before. * Upgrade your home entertainment with the exclusive Chromecast device. Join the elite group of cord-cutters who stream smarter.` (gemini-pro) |

Then you can try reformatting the prompt to see how the response changes when the prompt
objective, constraints, and some of the context are combined into a single sentence:

| Second iteration |
| Prompt: `Create scarcity and exclusivity-focused ad copy that is less than two sentences. Product description: "Chromecast is a device that allows users to wirelessly cast their content from other devices, so they can watch their favorite movies, TV shows, photos, websites, and more on their TV. Chromecast can display content from Android smartphones and tablets, iPhones & iPads, Windows and Mac laptops, and the Chromebook Pixel."` Response: `Options for Scarcity & Exclusivity-Driven Chromecast Ads: Option 1 (Scarcity): "Limited quantities available! Get your Chromecast today before they're gone and unlock a world of on-demand entertainment." Option 2 (Exclusivity): "Experience entertainment like never before. Chromecast: the ultimate upgrade for your TV, available for a limited time."` (gemini-pro) |

This time, the model's response contained only one copy option for each category. If you
realize that you need at least two options for each category and that you don't want to limit the
length of the response, you can modify the constraints and try your prompt again:

| Third iteration |
| Prompt: `Create two ad-copies about scarcity and two ad-copies about exclusivity. Product description: "Chromecast is a device that allows users to wirelessly cast their content from other devices, so they can watch their favorite movies, TV shows, photos, websites, and more on their TV. Chromecast can display content from Android smartphones and tablets, iPhones & iPads, Windows and Mac laptops, and the Chromebook Pixel."` Response: `Scarcity Ad Copies: Ad 1: Headline: Don't miss out! Chromecast is flying off the shelves! Body: Experience the magic of Chromecast before it's too late! Limited quantities are available, so grab yours now and start enjoying your favorite entertainment on the big screen. Ad 2: Headline: Last chance! Chromecast is almost sold out. Body: Time is running out to get your hands on Chromecast. Upgrade your TV experience today and enjoy seamless streaming from all your devices. Don't wait, supplies are limited! Exclusivity Ad Copies: Ad 1: Headline: Unlock a world of entertainment with the exclusive Chromecast. Body: Join the elite group of Chromecast users and experience the future of television. Enjoy effortless streaming, endless entertainment options, and unparalleled convenience. Chromecast: It's not just TV, it's an experience. Ad 2: Headline: Elevate your home entertainment with the Chromecast advantage. Body: Go beyond ordinary TV with Chromecast. Seamlessly stream content from all your devices and enjoy a personalized entertainment experience like no other. Discover the exclusivity of Chromecast today.` (gemini-pro) |

In the third iteration, the model's response contained both headline and body fields for the ad
copy. For this example, let's say that this response aligns with your ad copy requirements.

Now that you've adjusted the prompt to get a response that aligns with your ad copy requirements,
you can update and test the prompt to ensure the model produces similarly formatted responses in the
future:

| Fourth iteration |
| Prompt: `Create two ad-copies about scarcity and two ad-copies about exclusivity. Include a headline and body for each ad copy. Product description: "Chromecast is a device that allows users to wirelessly cast their content from other devices, so they can watch their favorite movies, TV shows, photos, websites, and more on their TV. Chromecast can display content from Android smartphones and tablets, iPhones & iPads, Windows and Mac laptops, and the Chromebook Pixel."` Response: `Scarcity Ads: Ad 1: Headline: Last Chance! Chromecast is Selling Out Fast Body: Get the Chromecast experience before it's gone! Limited quantities remain. Upgrade your TV time today! Ad 2: Headline: Don't Miss Out! Chromecast Stock is Running Low Body: Time is running out to grab your Chromecast. Enjoy seamless streaming on the big screen. Order now while supplies last! Exclusivity Ads: Ad 1: Headline: Unlock the Ultimate Viewing Experience with Chromecast Body: Join the elite group of Chromecast users and enjoy unparalleled streaming convenience. Elevate your entertainment today! Ad 2: Headline: Experience the Future of Entertainment: Get Your Chromecast Body: Be among the first to enjoy the cutting-edge technology of Chromecast. Stream anything, anytime, effortlessly. Upgrade your home entertainment now!` (gemini-pro) |

This time, the model's response is very similar to the previous iteration, even with the
additional constraints, which means that you successfully iterated upon your prompt.

As demonstrated by the example, prompt iteration is an integral part of the prompt design
process that can be used to help you guide the model to produce the best results for your use
case.

## What's next

- Explore more examples of prompts in the Prompt gallery.
- Learn how to optimize prompts for use with Google models by using the Gemini Enterprise Agent Platform prompt optimizer (Preview).
