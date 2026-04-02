---
title: Design System
description: RealtimeKit's UI Kit provides all the necessary UI components to allow complete customization of all its UI Kit components. You can customize your brand colours, fonts, logo and more.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/branding/design-system.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Design System

RealtimeKit's UI Kit provides all the necessary UI components to allow complete customization of all its UI Kit components. You can customize your brand colours, fonts, logo and more.

## Prerequisites

To get started with customizing the icons for your meetings, you need to first [integrate RealtimeKit's Web SDK](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/) into your web application.

WebMobile

ReactWeb ComponentsAngular

## Override Design System

The `provideRtkDesignSystem()` utility allows you to override the exisiting design system with your own custom design system.

### Installation

```

<script type="module">

  import { provideRtkDesignSystem } from "https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit-ui@latest/dist/index.js";

</script>


```

JavaScript

```

import { provideRtkDesignSystem } from "@cloudflare/realtimekit-react-ui";


```

JavaScript

```

import { provideRtkDesignSystem } from "@cloudflare/realtimekit-angular-ui";


```

### Usage

```

<div id="app"></div>


<script>

  provideRtkDesignSystem(document.getElementById("app"), {

    googleFont: "Lobster",

    // sets light background colors

    theme: "light",

    colors: {

      danger: "#ffac00",

      brand: {

        300: "#00FFE1",

        400: "#00FFFF",

        500: "#00E1D4",

        600: "#007B74",

        700: "#00655F",

      },

      text: "#071428",

      "text-on-brand": "#ffffff",

      "video-bg": "#E5E7EB",

    },

    borderRadius: "extra-rounded",

  });

</script>


```

```

<div id="app"></div>


<script>

  provideRtkDesignSystem(document.getElementById("app"), {

    googleFont: "Lobster",

    // sets light background colors

    theme: "light",

    colors: {

      danger: "#ffac00",

      brand: {

        300: "#00FFE1",

        400: "#00FFFF",

        500: "#00E1D4",

        600: "#007B74",

        700: "#00655F",

      },

      text: "#071428",

      "text-on-brand": "#ffffff",

      "video-bg": "#E5E7EB",

    },

    borderRadius: "extra-rounded",

  });

</script>


```

JavaScript

```

function Example() {

  const meetingEl = useRef();

  const { meeting } = useRealtimeKitMeeting();


  useEffect(() => {

    provideRtkDesignSystem(meetingEl.current, {

      googleFont: "Lobster",

      // sets light background colors

      theme: "light",

      colors: {

        danger: "#ffac00",

        brand: {

          300: "#00FFE1",

          400: "#00FFFF",

          500: "#00E1D4",

          600: "#007B74",

          700: "#00655F",

        },

        text: "#071428",

        "text-on-brand": "#ffffff",

        "video-bg": "#E5E7EB",

      },

      borderRadius: "extra-rounded",

    });

  }, []);


  return (

    <div style={{ height: "400px" }}>

      <RtkMeeting meeting={meeting} ref={meetingEl} mode="fill" />

    </div>

  );

}


```

## Design Tokens

UI Kit uses [design tokens ↗](https://css-tricks.com/what-are-design-tokens/) for it's design system.

Design tokens are the design related values which are used to maintain a design system, which provides flexibility in customizing the overall design of a system with values such as: typography, spacing, colors etc.

These design tokens are stored and shared among components with the help of [CSS variables ↗](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading%5Fvariables/Using%5Fcustom%5Fproperties).

### Typography

You can tweak the font family used in your UI Kit components easily with this token. You can edit this value in two ways with the provideRtkDesignSystem utility.

```

--rtk-font-family: Inter;


```

#### Usage

Set either of these values in your design tokens.

* With fontFamily - Use a custom font family, you'll have to load the font manually.
* With googleFont - Use a google font, the font is loaded automatically.

JavaScript

```

const designTokens = {

  fontFamily: "Custom Font",

  // or

  googleFont: "A Google Font",

};


```

### Colours

CSS Variables are set in the format: `R G B`.

Here are all the color tokens, along with their default values.

```

--rtk-colors-brand-500: 33 96 253;

--rtk-colors-background-1000: 8 8 8;

/_ ... rest of the shades _/


```

#### Usage

Note

Note the exception of `text` and `text-on-brand` colors, you only specify a single color even though there are the following shades: 1000 - 600.

This is because the `provideRtkDesignSystem()` utility sets the color you pass to text-1000 and calculates lighter shades and sets them as well.

Only pass objects for `brand` and `background` colors.

A set of commonly used `background` shades are available by default with the `theme` property.

Theme values are: `light`, `dark`, `darkest`.

Edit color tokens like this. Only the colors you specify will be set.

JavaScript

```

const designTokens = {

  theme: "darkest",

  colors: {

    brand: { 500: "#0D51FD" },

    background: { 1000: "#080808" },

    text: "#ffffff",

    "text-on-primary": "#ffffff",

    "video-bg": "#181818",

  },

};


```

### Spacing

The spacing scale is used for setting width, height, margins, paddings, positions etc. throughout the components.

* The default value for the spacing scale base is 4px.
* Rest of the values are calculated with this base, set to `--rtk-space-1`.
* Current spacing scale ranges from 0 to 96.

```

--rtk-space-1: 4px;

/* ... rest of the spacing scale */


```

#### Usage

Set the base of the spacing scale with `spacingBase` property.

JavaScript

```

const designTokens = {

  spacingBase: 4, // value in px

};


```

### Borders

Border Width and Border Radius properties can also be customized with design tokens!

| Token Name   | Values                                  |
| ------------ | --------------------------------------- |
| borderWidth  | none, thin, fat                         |
| borderRadius | sharp, rounded, extra-rounded, circular |

#### Usage

JavaScript

```

const designTokens = {

  borderWidth: "thin",

  borderRadius: "rounded",

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/branding/","name":"Customise Branding"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/branding/design-system/","name":"Design System"}}]}
```
