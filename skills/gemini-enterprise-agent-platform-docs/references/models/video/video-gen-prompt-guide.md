Veo offers endless customization through textual prompts. This
guide explains how to modify your Veo prompts to produce
different results and effects.

For more information about best practices, see [Best practices for
Veo on Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/best-practice).

## Safety filters

Veo applies safety filters across Agent Platform to help
ensure that generated videos and uploaded photos don't contain offensive
content. For example, prompts that violate [responsible AI
guidelines](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai) are blocked.

If you suspect abuse of Veo or any generated output that contains
inappropriate material or inaccurate information, use the [Report suspected
abuse on Google Cloud
form](https://support.google.com/code/contact/cloud_platform_report).

## Anatomy of a Veo prompt

When you use Veo to generate videos, using the correct keywords
and prompt structure helps the model to generate the content that you want.
Breaking your idea down into key components is the most effective way to guide
Veo toward the outcome that you want.

The following sections explain how to use key elements and keywords in your
prompts to guide Veo when generating videos.

You don't need to use all elements in every prompt, but understanding how each
element works can help you apply them effectively in your Veo
prompts.

## Subject

The subject is the "who" or "what" that the action of your generated video
revolves around. Specificity helps avoid generic outputs.

The following are examples of subjects that you can use:

- **People**:

  - **Generic descriptors**: man, woman, elderly person

  - **Specific professions**: "a seasoned detective", "a joyful baker", "a
    futuristic astronaut"

  - **Historical figures**

  - **Mythical beings**: a "mischievous fairy", "a stoic knight"

- **Animals or creatures**:

  - **Specific breeds of animals**: "a playful Golden Retriever puppy", "a
    majestic bald eagle", "a sleek black panther"

  - **Fantastical creatures**: "a miniature dragon with iridescent scales",
    "a wise, ancient talking tree"

- **Objects**:

  - **Everyday items**: "a vintage typewriter", "a steaming cup of coffee",
    "a worn leather-bound book"

  - **Vehicles**: "a classic 1960s muscle car", "a futuristic hovercraft",
    "a weathered pirate ship"

  - **Abstract shapes**: "glowing orbs", "crystalline structures"

You can combine people, animals, objects, or any mix of them in the same video
(for example, "A group of diverse friends laughing around a campfire while a
curious fox watches from the shadows", "a busy marketplace scene with vendors
and shoppers").

**Example**: The following video and prompt demonstrate complex details with
multiple subjects:
[Video](https://www.youtube.com/watch?v=GKOpOcs8IF8)

    "A hyper-realistic, cinematic portrait of a wise, androgynous shaman of
    indeterminate age. Their weathered skin is etched with intricate, bioluminescent
    circuit-like tattoos that pulse with a soft, cyan light. They are draped in
    ceremonial robes woven from dark moss and shimmering, metallic fiber-optic
    threads. In one hand, they hold a gnarled wooden staff entwined with glowing
    energy conduits and topped with a floating, crystalline artifact. Perched on
    their shoulder is a small, mechanical owl with holographic wings and camera-lens
    eyes that blink with a soft, red light. Their expression is serene and ancient,
    eyes holding a deep, knowing look"

## Action

Actions describe the "verb" of your video, or what is happening. Action brings
the subject to life, describes movements, interactions, and subtle expressions.

The following are examples of actions that you can use:

- **Basic movements**: walking, running, jumping, flying,
  swimming, dancing, spinning, falling, standing still, sitting

- **Interactions**: talking, laughing, arguing, hugging, fighting, playing a
  game, cooking, building, writing, reading, observing

- **Emotional expressions**: smiling, frowning, surprise, concentrating
  deeply, appearing thoughtful, showing excitement, crying

- **Subtle actions**: a gentle breeze ruffling hair, leaves rustling, a subtle
  nod, fingers tapping impatiently, eyes blinking slowly

- **Transformations or processes**: a flower blooming in fast-motion, ice
  melting, a city skyline developing over time (however, keep clip length in
  mind for events that occur over a longer period)

**Example** The following video and prompt demonstrate directing a story by
sequencing actions and emotional changes:
[Video](https://www.youtube.com/watch?v=EbCAqMF2DBo)

    "A gloved hand carefully slices open the spine of an ancient, leather-bound book
    with a scalpel. The hand then delicately extracts a tiny, metallic data chip
    hidden within the binding. The character's eyes, previously focused and calm,
    widen in a flash of alarm as a floorboard creaks off-screen. They quickly palm
    the chip, their head snapping up to scan the dimly lit room, their body tense
    and listening for any other sound"

## Scene or context

The scene or context describes the "where" and the "when" of your video. That
is, the environment that grounds the subject and establishes the video's mood
and atmosphere.

The following are examples of scene or context that you can use:

- **Location (interior)**: a cozy living room with a crackling fireplace, a
  sterile futuristic laboratory, a cluttered artist's studio, a grand
  ballroom, a dusty attic

- **Location (exterior)**: a sun-drenched tropical beach, a misty ancient
  forest, a bustling futuristic cityscape at night, a serene mountain peak at
  dawn, a desolate alien planet

- **Time of day**: golden hour, midday sun, twilight, deep night, pre-dawn

- **Weather**: clear blue sky, overcast and gloomy, light drizzle, heavy
  thunderstorm with visible lightning, gentle snowfall, swirling fog

- **Historical or fantastical period**: a medieval castle courtyard, a roaring
  1920s jazz club, a cyberpunk alleyway, an enchanted forest glade

- **Atmospheric details**: floating dust motes in a sunbeam, shimmering heat
  haze, reflections on wet pavement, leaves scattered by the wind

**Example** The following video demonstrates building an immersive world:
[Video](https://www.youtube.com/watch?v=bIZwAvnXkbY)

    "The scene is a rain-slicked, crumbling street in a forgotten city, shrouded in
    perpetual twilight. Giant, bioluminescent mushrooms have sprouted from the
    cracked asphalt, casting an eerie, pulsating green and purple glow onto the
    decaying facades of skeletal skyscrapers. A gentle, constant rain creates
    shimmering reflections in the puddles below, and the only sounds are the soft
    patter of rain and a low, otherworldly hum from the glowing fungi"

## Camera angles

Camera angles define the shot's viewpoint, directly influencing how the audience
perceives the subject.

**Important:** Some advanced camera angles are not officially supported. The
results and reliability may vary depending on the overall prompt and your
specific use case.

The following are examples of camera angles that you can use:

- **Eye-level shot**: offers a neutral, common perspective, as if viewed from
  human height. For example, "eye-level shot of a woman sipping tea."

- **Low-angle shot**: positions the camera below the subject, looking up,
  making the subject appear powerful or imposing. For example, "low-angle
  tracking shot of a superhero landing."

- **High-angle shot**: places the camera above the subject, looking down,
  which can make the subject seem small, vulnerable, or part of a larger
  pattern. For example, "high-angle shot of a child lost in a crowd."

- **Bird's-eye view or top-down shot**: a shot taken directly from above,
  offering a map-like perspective of the scene. For example, "bird's-eye view
  of a bustling city intersection."

- **Worm's-eye view**: a very low-angle shot looking straight up from the
  ground, emphasizing height and grandeur. For example, "worm's-eye view of
  towering skyscrapers."

- **Dutch angle or canted angle**: the camera is tilted to one side, creating
  a skewed horizon line, often used to convey unease, disorientation, or
  dynamism. For example, "dutch angle shot of a character running down a
  hallway."

- **Close-up**: frames the subject tightly, typically focusing on the face to
  emphasize emotions or a specific detail. For example, "close-up of a
  character's determined eyes."

- **Extreme close-up**: isolates a very small detail of the subject, such as
  an eye or a drop of water. For example, "extreme close-up of a drop of water
  landing on a leaf."

- **Medium shot**: shows the subject from approximately the waist up,
  balancing detail with some environmental context. Commonly used for
  dialogue. For example, "medium shot of two people conversing."

- **Full shot or long shot**: shows the entire subject from head to toe, with
  some of the surrounding environment visible. For example, "full shot of a
  dancer performing."

- **Wide shot or establishing shot**: shows the subject within their broad
  environment, often used to establish location and context at the beginning
  of a sequence. For example, "wide shot of a lone cabin in a snowy
  landscape."

- **Over-the-shoulder shot**: frames the shot from behind one person, looking
  over their shoulder at another person or object, common in conversations.
  For example, "over-the-shoulder shot during a tense negotiation."

- **Point-of-view shot**: shows the scene from the direct visual perspective
  of a character, as if the audience is seeing through their eyes. For
  example, "POV shot as someone rides a rollercoaster."

**Example**: The following video and prompt demonstrate a bird's-eye view camera
angle:
[Video](https://www.youtube.com/watch?v=ryXetoIo0nQ)

    "A bird's-eye view of a vast, intricate maze made of high green hedges. A lone
    figure in a red coat is visible, moving through the labyrinthine paths below"

**Example**: The following video and prompt demonstrate an
extreme close-up camera angle:
[Video](https://www.youtube.com/watch?v=llpdGtooh4c)

    "An extreme close-up of a single, glistening drop of rain as it lands on the
    petal of a vibrant red rose, causing the petal to tremble slightly"

## Camera movements

The camera's movements help introduce dynamism into the shot, creating a more
cinematic experience.

The following are examples of camera movements that you can use:

- **Static shot (or fixed)**: the camera remains completely still, there is no
  movement. For example, "static shot of a serene landscape."

- **Pan (left/right)**: the camera rotates horizontally left or right from a
  fixed position. For example, "slow pan left across a city skyline at dusk."

- **Tilt (up/down)**: the camera rotates vertically up or down from a fixed
  position. For example, "tilt down from the character's shocked face to the
  revealing letter in their hands."

- **Dolly (in/out)**: the camera physically moves closer to the subject or
  further away. For example, "dolly out from the character to emphasize their
  isolation."

- **Truck (left/right)**: the camera physically moves horizontally (sideways)
  left or right, often parallel to the subject or scene. For example, "truck
  right, following a character as they walk along a busy sidewalk."

- **Pedestal (up/down)**: the camera physically moves vertically up or down
  while maintaining a level perspective. For example, "pedestal up to reveal
  the full height of an ancient, towering tree."

- **Zoom (in/out)**: the camera's lens changes its focal length to magnify or
  de-magnify the subject. This is different from a dolly, as the camera itself
  doesn't move. For example, "slow zoom in on a mysterious artifact on a
  table."

- **Crane shot**: the camera is mounted on a crane and moves vertically (up or
  down) or in sweeping arcs, often used for dramatic reveals or high-angle
  perspectives. For example, "crane shot revealing a vast medieval
  battlefield."

- **Aerial shot or drone shot**: a shot taken from a high altitude, typically
  using an aircraft or drone, often involving smooth, flying movements.
  "Sweeping aerial drone shot flying over a tropical island chain."

- **Handheld or shaky cam**: the camera is held by the operator, resulting in
  less stable, often jerky movements that can convey realism, immediacy, or
  unease. For example, "handheld camera shot during a chaotic marketplace
  chase."

- **Whip pan**: an extremely fast pan that blurs the image, often used as a
  transition or to convey rapid movement or disorientation. For example, "whip
  pan from one arguing character to another."

- **Arc shot**: the camera moves in a circular or semi-circular path around
  the subject. For example, "arc shot around a couple embracing in the rain."

**Example**: The following video and prompt demonstrate a zoom-in
camera movement:
[Video](https://www.youtube.com/watch?v=izn8VHHFy3c)

    "A slow, dramatic zoom in on a mysterious, ancient compass lying on a dusty map.
    The camera starts wide, showing the map and a flickering candle, then smoothly
    zooms in until the intricate, glowing symbols on the compass face fill the
    entire frame"

**Example**: The following video and prompt demonstrate an aerial drone camera
shot:
[Video](https://www.youtube.com/watch?v=gvPtt5f-kKc)

    "Sweeping aerial drone shot flying over a tropical island chain"

## Lens and optical effects

Lens and optical effects change how the camera "sees" the world. Using lens and
optical effects helps add professional polish and stylistic flair.

**Important:** Some advanced camera lenses are not officially supported. The
results and reliability may vary depending on the overall prompt and your
specific use case.

The following are examples of lens and optical effects that you can use:

- **Wide-angle lens**: captures a broader field of view than a standard lens.
  It can exaggerate perspective, making foreground elements appear larger and
  creating a sense of grand scale or, at closer distances, distortion.
  For example, "wide-angle lens shot of a grand cathedral interior,
  emphasizing its soaring arches."

- **Telephoto lens**: narrows the field of view and compresses perspective,
  making distant subjects appear closer and often isolating the subject by
  creating a shallow depth of field. For example, "telephoto lens shot
  capturing a distant eagle in flight against a mountain range."

- **Shallow depth of field**: an optical effect where only a narrow
  plane of the image is in sharp focus, while the foreground or the background
  is blurred. The aesthetic quality of this blur is known as 'bokeh'. For
  example, "portrait of a man with a shallow depth of field, their face sharp
  against a softly blurred park background with beautiful bokeh."

- **Deep depth of field**: keeps most or all of the image, from foreground to
  background, in sharp focus. For example, "landscape scene with deep depth of
  field, showing sharp detail from the wildflowers in the immediate foreground
  to the distant mountains."

- **Lens flare**: an effect created when a bright light source directly
  strikes the camera lens, causing streaks, starbursts, or circles of light to
  appear in the image. Often used for dramatic or cinematic effect. For
  example, "cinematic lens flare as the sun dips below the horizon behind a
  silhouetted couple."

- **Rack focus**: the technique of shifting the focus of the lens from one
  subject or plane of depth to another within a single, continuous shot. For
  example, "rack focus from a character's thoughtful face in the foreground to
  a significant photograph on the wall behind them."

- **Fisheye lens effect**: an ultra-wide-angle lens that produces extreme
  barrel distortion, creating a circular or strongly convex, wide panoramic
  image. For example, "fisheye lens view from inside a car, capturing the
  driver and the entire curved dashboard and windscreen."

- **Vertigo effect (dolly zoom)**: a camera effect achieved by dollying the
  camera towards or away from a subject while simultaneously zooming the lens
  in the opposite direction. This keeps the subject roughly the same size in
  the frame, but the background perspective changes dramatically, often
  conveying disorientation or unease. For example, "vertigo effect (dolly
  zoom) on a character standing at the edge of a cliff, the background rushing
  away.

**Example**: The following video and prompt demonstrate a shallow depth of field
optical effect:
[Video](https://www.youtube.com/watch?v=Ol66pK2N7L0)

    A cinematic close-up portrait of a woman sitting in a café at night, with a very
    shallow depth of field. Her face is in sharp focus, while the city lights
    outside the window behind her are transformed into soft, beautiful bokeh circles

**Example**: The following video and prompt demonstrates a rack focus shot
effect:
[Video](https://www.youtube.com/watch?v=-p6W4mCYuvc)

    "A medium shot of a detective's hand in the foreground, holding a single, spent
    bullet casing. The camera then performs a slow rack focus, shifting from the
    casing to reveal the anxious face of a witness in the background, now in sharp
    focus"

## Visual style \& aesthetics

Visual style and aesthetics describe the overall artistic atmosphere for your
video, and it's one of the most impactful elements for creating a unique style.

This broad category can be broken down into four key components:

- Lighting
- Tone or mood
- Artistic style
- Ambiance

### Lighting

Lighting effects change how the subject and surrounding areas are captured by
the camera. Using lighting effects can help set a particular style.

The following are examples of lighting effects that you can use:

- **Natural light**: "soft morning sunlight streaming through a window,"
  "overcast daylight", "moonlight"

- **Artificial light**: "warm glow of a fireplace", "flickering candlelight,"
  "harsh fluorescent office lighting", "pulsating neon signs"

- **Cinematic lighting**: "rembrandt lighting on a portrait", "film noir style
  with deep shadows and stark highlights", "high-key lighting for a bright,
  cheerful scene", "low-key lighting for a dark, mysterious mood"

- **specific effects**: "volumetric lighting creating visible light rays",
  "backlighting to create a silhouette", "golden hour glow", "dramatic side
  lighting"

### Tone or mood

Tone and mood effects describe the atmospheric quality, or the overall feeling
of the video.

The following are examples of tone or mood effects that you can use:

- **Happy/joyful**: Bright, vibrant, cheerful, uplifting, whimsical.

- **Sad/melancholy**: Somber, muted colors, slow pace, poignant, wistful.

- **Suspenseful/tense**: Dark, shadowy, quick cuts (if implying edit), sense
  of unease, thrilling.

- **Peaceful/serene**: Calm, tranquil, soft, gentle, meditative.

- **Epic/grandiose**: Sweeping, majestic, dramatic, awe-inspiring.

- **Futuristic/sci-fi**: Sleek, metallic, neon, technological, dystopian,
  utopian.

- **Vintage/retro**: Sepia tone, grainy film, specific era aesthetics (For
  example, "1950s Americana", "1980s vaporwave").

- **Romantic**: Soft focus, warm colors, intimate.

- **Horror**: Dark, unsettling, eerie, gory (though be mindful of content
  filters).

### Artistic style

You can describe an artistic style for the video to take inspiration from while
generating your video.

The following are examples of artistic style effects that you can use:

- **Photorealistic**: "ultra-realistic rendering", "shot on 8K camera"

- **Cinematic**: "cinematic film look", "shot on 35mm film", "anamorphic
  widescreen"

- **Animation styles**: "Japanese anime style", "classic Disney animation
  style," "Pixar-like 3D animation", "claymation style", "stop-motion
  animation", "cel-shaded animation"

- **Art movements/artists**: "in the style of Van Gogh", "surrealist
  painting," "Impressionistic", "Art Deco design", "Bauhaus aesthetic"

- **Specific looks**: "gritty graphic novel illustration", "watercolor
  painting coming to life", "charcoal sketch animation", "blueprint schematic
  style.

**Example**: The following video and prompt demonstrates a Japanese anime
animation style:
[Video](https://www.youtube.com/watch?v=vu2ZFw-9ZMI)

    "A dynamic scene in a vibrant Japanese anime style. A magical girl with silver
    hair and glowing blue eyes walks in a forest. The style features sharp lines,
    bright, saturated colors, and expressive"

**Example:** The following video and prompt demonstrates a vintage artistic
style:
[Video](https://www.youtube.com/watch?v=WJwj6y7p8SI)

    "A vintage 1920s street scene, sepia toned, film grain, with characters in
    period attire"

### Ambiance

Ambiance describes the character of a place or environment that the video takes
place in.

The following are examples of ambiance effects that you can use:

- **Color palettes**: "monochromatic black and white", "vibrant and saturated
  tropical colors", "muted earthy tones", "cool blue and silver futuristic
  palette", "warm autumnal oranges and browns"

- **Atmospheric effects**: "thick fog rolling across a moor", "swirling desert
  sands", "gentle falling snow creating a soft blanket", "heat haze shimmering
  above asphalt", "magical glowing particles in the air", "subsurface
  scattering on a translucent object"

- **Textural qualities**: "rough-hewn stone walls", "smooth, polished chrome
  surfaces", "soft, velvety fabric", "dewdrops clinging to a spiderweb"

## Temporal elements

Temporal elements affect the flow of time in a video, which you can use to
highlight changes even in short clips.

The following are examples of temporal elements that you can use:

- **Pacing**: "slow-motion", "fast-paced action", "time-lapse"

- **Evolution (subtle for short clips)**: "a flower bud slowly unfurling", "a
  candle burning down slightly", "dawn breaking, the sky gradually
  lightening"

- **Rhythm**: "pulsating light", "rhythmic movement"

**Example**: The following video and prompt demonstrate an evolution temporal
effect:
[Video](https://www.youtube.com/watch?v=SNt_G9EjPE8)

    "A close-up of a single red rose bud, its petals tightly closed. The camera
    remains static as the flower slowly and gracefully unfurls over the course of
    the shot, revealing its vibrant inner layers. The evolution is subtle, showing a
    clear but gradual change"

**Example**: The following video and prompt demonstrate a time lapse
temporal effect:
[Video](https://www.youtube.com/watch?v=CT0PIze9w0Y)

    "A time-lapse of a bustling city skyline as day transitions to night. The camera
    is static. Watch as the sun sets, casting long shadows, and the city lights
    begin to twinkle on, with streaks of car headlights moving along the streets
    below"

## Audio

Audio prompts help guide the visuals of the video in relation to sound. Audio
direction can powerfully shape the action, pacing, and mood of the video.

Audio is supported by `veo-3.0-generate-001` in
[Preview](https://cloud.google.com/products#product-launch-stages).

Clearly specify if you want audio. We recommend that you use separate sentences
in your prompt to describe the audio. The following are examples of common audio
elements you can use:

- **Sound effects**: individual, distinct sounds that occur within the scene.
  For example, "the sound of a phone ringing", "water splashing in the
  background", "soft house sounds, the creak of a closet door, and a ticking
  clock."

- **Ambient noise**: the general background noise that makes a location feel
  real. For example, "the sounds of city traffic and distant sirens", "waves
  crashing on the shore", "the quiet hum of an office."

- **Dialogue**: spoken words from characters or a narrator. For example, "the
  man in the red hat says: Where is the rabbit?", "a voiceover with a polished
  British accent speaks in a serious, urgent tone", "two people discuss a
  movie."

**Example**: The following video and prompt demonstrate using dialogue:
[Video](https://www.youtube.com/watch?v=yGcMvkFK9Zo)

    "A medium shot in a dimly lit interrogation room. The seasoned detective says:
    Your story has holes. The nervous informant, sweating under a single bare bulb,
    replies: I'm telling you everything I know. The only other sounds are the slow,
    rhythmic ticking of a wall clock and the faint sound of rain against the window"

## Cinematic terms

You can use cinematic terms for editing style and specific
techniques. For example, "match cut", "jump cut", "establishing shot sequence",
"montage", "split diopter effect."

**Example**: The following video and prompt demonstrate using a jump cut
technique:
[Video](https://www.youtube.com/watch?v=d-cGj3kAnsQ)

    "A person sitting in the same position but wearing different outfits, with sharp
    jump cuts between each outfit change. The background should stay static and the
    person should reappear instantly in the new outfit, creating a fast-paced,
    rhythmic jump cut effect. The lighting and framing should remain consistent to
    emphasize the sudden changes"

## Negative prompts

Negative prompts are a tool that helps specify the elements that you don't want
generated in your video. When you use a negative prompt, you describe the
elements that the model shouldn't include when generating the video.

We recommend the following:

- **Not recommended:** using instructive
  language or words such as "no" or "don't". For example, avoid prompts such
  as "no walls" or "don't show walls".

- **Recommended:** Describe what you
  don't want to see. For example, "wall, frame", which means that you don't
  want a wall or a frame in the video.

| **Prompt** | **Generated output** |
|---|---|
| Generate a short, stylized animation of a large, solitary oak tree with leaves blowing vigorously in a strong wind. The tree should have a slightly exaggerated, whimsical form, with dynamic, flowing branches. The leaves should display a variety of autumn colors, swirling and dancing in the wind. The animation should feature a gentle, atmospheric soundtrack and use a warm, inviting color palette. | ![Tree with using words.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/video/images/tree_with_no_negative.gif) |
| Generate a short, stylized animation of a large, solitary oak tree with leaves blowing vigorously in a strong wind. The tree should have a slightly exaggerated, whimsical form, with dynamic, flowing branches. The leaves should display a variety of autumn colors, swirling and dancing in the wind. The animation should feature a gentle, atmospheric soundtrack and use a warm, inviting color palette. With negative prompt - urban background, man-made structures, dark, stormy, or threatening atmosphere. | ![Tree with no negative words.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/video/images/tree_with_negative.gif) |

## What's next

- [Best practices for Veo on Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/best-practice)

- [Generate videos with Veo on Gemini Enterprise Agent Platform from text prompts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-text)

- [Generate videos with Veo on Gemini Enterprise Agent Platform from an image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-an-image)

- [Generate videos with Veo on Gemini Enterprise Agent Platform using first and last video
  frames](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-first-and-last-frames)

- [Extend Veo on Gemini Enterprise Agent Platform-generate videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/extend-a-veo-video)

- [Understand responsible AI and usage guidelines for
  Veo on Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/responsible-ai-and-usage-guidelines)
