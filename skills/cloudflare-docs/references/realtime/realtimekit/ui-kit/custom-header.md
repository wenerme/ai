---
title: Add Custom Header
description: Add a custom header to your RealtimeKit meeting UI with individual components.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/custom-header.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Add Custom Header

Prerequisite

This guide builds on top of the [Build Your Own UI](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/build-your-own-ui/). It is recommended to read that guide first. Portions of the code will not be repeated here for brevity.

For a complete list of available UI Kit components, refer to the [Component Library](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/component-library/).

In this guide, we will learn how to add a custom header for your RealtimeKit meeting experience.

WebMobile

ReactWeb ComponentsAngular

RealtimeKit UI Kit provides the [RtkHeader](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/component-library/#rtk-header) component for a default header.

If you need additional controls, replace `RtkHeader` with individual UI Kit components and custom elements.

Import the required components:

```

import {

  RtkLogo,

  RtkRecordingIndicator,

  RtkLivestreamIndicator,

  RtkMeetingTitle,

  RtkGridPagination,

  RtkParticipantCount,

  RtkViewerCount,

  RtkClock,

} from "@cloudflare/realtimekit-ui";


```

Explain Code

In your `RtkUIProvider` from [Build Your Own UI](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/build-your-own-ui/), replace:

```

<RtkHeader />


```

with:

```

<div

  style={{

    display: "flex",

    justifyContent: "space-between",

    backgroundColor: "black",

    color: "white",

  }}

>

  <div

    id="header-left"

    style={{ display: "flex", alignItems: "center", height: "48px" }}

  >

    <RtkLogo />

    <RtkRecordingIndicator />

    <RtkLivestreamIndicator />

  </div>

  <div

    id="header-center"

    style={{ display: "flex", alignItems: "center", height: "48px" }}

  >

    <RtkMeetingTitle />

  </div>

  <div

    id="header-right"

    style={{ display: "flex", alignItems: "center", height: "48px" }}

  >

    <RtkGridPagination />

    <RtkParticipantCount />

    <RtkViewerCount />

    <RtkClock />

    <button onClick={handleReportBugClick}>Report Bug</button>

  </div>

</div>


```

Explain Code

Define the click handler:

```

const handleReportBugClick = () => {

  console.log("Report Bug Clicked");

};


```

A complete example to build your own UI with custom header can be found [here ↗](https://github.com/cloudflare/realtimekit-web-examples/tree/main/react-examples/examples/create-your-own-ui) with the custom header component [here ↗](https://github.com/cloudflare/realtimekit-web-examples/blob/main/react-examples/examples/create-your-own-ui/src/components/meeting-header.tsx).

RealtimeKit UI Kit provides the [rtk-header](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/component-library/#rtk-header) component for a default header.

If you need additional controls, replace `rtk-header` with individual UI Kit components and custom elements. In the `renderJoinedScreen` function from [Build Your Own UI](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/build-your-own-ui/), replace:

```

<rtk-header style="display: flex; justify-content: space-between;"></rtk-header>


```

with:

```

<div

  style="display: flex; justify-content: space-between; align-items: center; height: 48px; padding: 0 12px; background-color: black; color: white;"

>

  <div style="display: flex; align-items: center; gap: 8px;">

    <rtk-logo></rtk-logo>

    <rtk-recording-indicator></rtk-recording-indicator>

    <rtk-livestream-indicator></rtk-livestream-indicator>

  </div>


  <div style="display: flex; align-items: center;">

    <rtk-meeting-title></rtk-meeting-title>

  </div>


  <div style="display: flex; align-items: center; gap: 8px;">

    <rtk-grid-pagination></rtk-grid-pagination>

    <rtk-participant-count></rtk-participant-count>

    <rtk-viewer-count></rtk-viewer-count>

    <rtk-clock></rtk-clock>

    <button id="report-bug-button" type="button">Report Bug</button>

  </div>

</div>


```

Explain Code

Register the click handler after rendering:

JavaScript

```

document.querySelector("#report-bug-button").addEventListener("click", () => {

  console.log("Report Bug Clicked");

});


```

A complete example to build your own UI with custom header can be found [here ↗](https://github.com/cloudflare/realtimekit-web-examples/tree/main/html-examples/examples/create-your-own-ui) with the custom header component [here ↗](https://github.com/cloudflare/realtimekit-web-examples/blob/main/html-examples/examples/create-your-own-ui/components/meeting-header.js).

RealtimeKit UI Kit provides the [rtk-header](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/component-library/#rtk-header) component for a default header.

If you need additional controls, replace `rtk-header` with individual UI Kit components and custom elements. Create a custom header component that uses the RealtimeKit angular components directly.

#### Create Custom Header Component

custom-header.component.ts

```

import { Component, AfterViewInit } from "@angular/core";


@Component({

  selector: "app-custom-header",

  template: `

    <div class="custom-header">

      <div class="header-left">

        <rtk-logo></rtk-logo>

        <rtk-recording-indicator></rtk-recording-indicator>

        <rtk-livestream-indicator></rtk-livestream-indicator>

      </div>


      <div class="header-center">

        <rtk-meeting-title></rtk-meeting-title>

      </div>


      <div class="header-right">

        <rtk-grid-pagination></rtk-grid-pagination>

        <rtk-participant-count></rtk-participant-count>

        <rtk-viewer-count></rtk-viewer-count>

        <rtk-clock></rtk-clock>

        <button

          type="button"

          class="report-bug-button"

          (click)="onReportBugClick()"

        >

          Report Bug

        </button>

      </div>

    </div>

  `,

  styles: [

    `

      .custom-header {

        display: flex;

        justify-content: space-between;

        align-items: center;

        height: 48px;

        padding: 0 12px;

        background-color: black;

        color: white;

      }


      .header-left,

      .header-right {

        display: flex;

        align-items: center;

        gap: 8px;

      }


      .header-center {

        display: flex;

        align-items: center;

      }


      .report-bug-button {

        background: none;

        border: 1px solid white;

        color: white;

        padding: 4px 8px;

        border-radius: 4px;

        cursor: pointer;

        font-size: 12px;

      }


      .report-bug-button:hover {

        background-color: rgba(255, 255, 255, 0.1);

      }

    `,

  ],

})

export class CustomHeaderComponent implements AfterViewInit {

  ngAfterViewInit() {

    console.log("Custom header initialized");

  }


  onReportBugClick() {

    console.log("Report Bug Clicked");

    // Add your custom logic here

    // For example: open a modal, navigate to a form, etc.

  }

}


```

Explain Code

#### Use in Your Meeting Component

In your main meeting component template, replace:

```

<rtk-header style="display: flex; justify-content: space-between;"></rtk-header>


```

with:

```

<app-custom-header></app-custom-header>


```

#### Complete Meeting Component Example

meeting.component.ts

```

import {

  Component,

  ElementRef,

  OnInit,

  OnDestroy,

  ViewChild,

} from "@angular/core";


@Component({

  selector: "app-meeting",

  template: `

    <rtk-meeting #meetingComponent id="meeting-component">

      <!-- Custom header replaces rtk-header -->

      <app-custom-header></app-custom-header>


      <!-- Other meeting UI components -->

      <rtk-grid></rtk-grid>

      <rtk-sidebar></rtk-sidebar>

    </rtk-meeting>

  `,

})

export class MeetingComponent implements OnInit, OnDestroy {

  @ViewChild("meetingComponent", { static: true }) meetingElement!: ElementRef;


  meeting: any;

  private authToken = "<participant_auth_token>";


  async ngOnInit() {

    const RealtimeKitClient = await import(

      "https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit@latest/dist/index.es.js"

    );


    this.meeting = await RealtimeKitClient.default.init({

      authToken: this.authToken,

    });


    const meetingComponent = this.meetingElement.nativeElement;

    meetingComponent.showSetupScreen = true;

    meetingComponent.meeting = this.meeting;

  }


  ngOnDestroy() {

    // Cleanup logic

  }

}


```

Explain Code

#### Module Configuration

Don't forget to declare your custom header component in your Angular module:

app.module.ts

```

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";


import { AppComponent } from "./app.component";

import { MeetingComponent } from "./meeting.component";

import { CustomHeaderComponent } from "./custom-header.component";


@NgModule({

  declarations: [AppComponent, MeetingComponent, CustomHeaderComponent],

  imports: [BrowserModule],

  providers: [],

  bootstrap: [AppComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Required for RTK web components

})

export class AppModule {}


```

Explain Code

This approach gives you full control over the header layout while maintaining Angular's component architecture and event handling patterns.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/custom-header/","name":"Add Custom Header"}}]}
```
