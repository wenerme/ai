---
title: Breakout Rooms
description: Create and manage breakout rooms in RealtimeKit meetings for smaller group discussions.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Breakout Rooms

### Code Examples

If you prefer to learn by seeing examples, please check out the respective example repositories.

#### Web Examples

* [Web Components ↗](https://github.com/cloudflare/realtimekit-web-examples/tree/main/html-examples/examples/default-meeting-ui)
* [React ↗](https://github.com/cloudflare/realtimekit-web-examples/tree/main/react-examples/examples/default-meeting-ui)
* [Angular ↗](https://github.com/cloudflare/realtimekit-web-examples/tree/main/angular-examples/examples/default-meeting-ui)

Note

The breakout rooms feature, also known as connected meetings, is currently in beta, which means it is still being tested and evaluated, and may undergo some changes.

Breakout rooms allow participants of a meeting to split into smaller groups for targeted discussions and collaboration. With the rise of remote work and online learning, breakout rooms have become an essential tool for enhancing engagement and building community in virtual settings. They are an ideal choice for workshops, online classrooms, or when you need to speak privately with select participants outside the main meeting.

In RealtimeKit, breakout rooms are created as a separate meeting. Each breakout room is an independent meeting and can be managed like any other RealtimeKit meeting. RealtimeKit provides a set of SDK APIs to create, manage, and switch between breakout rooms.

## Key features

The following are some of the key features of RealtimeKit's breakout rooms:

* Manage permissions and privileges of hosts and participants using presets
* Hosts can create breakout rooms, assign participants, start and close the breakout rooms, and switch between rooms
* Participants can start and stop video, interact with other participants using chat and polls, and mute/unmute audio
* Record all breakout sessions individually like any other RealtimeKit meeting

## Roles in a breakout room

Roles in the breakout room are managed by presets.

### Host

Hosts can create breakout rooms, assign participants, start and close the breakout rooms, and switch between rooms.

### Participants

As a participant in a breakout room, you can:

* **Switch to Parent Meeting** \- Switch back to the main meeting (if you have the required permissions)
* **Switch Connected Meetings** \- Move from the main meeting to smaller, focused discussion groups (breakout rooms) for collaboration
* **Collaborate** \- Use tools such as chat and polls during breakout sessions

## Audio and video

Each breakout room functions as an independent meeting. When you switch to a breakout room from the main meeting, it automatically switches to the audio and video of the breakout session. You can mute or unmute your audio and start or stop your video at any time during the breakout session, just as you can in the main meeting.

When the breakout session ends, your audio and video automatically switch back to the main meeting.

* If your video was turned on during a breakout session, it will remain on when you return to the main session
* If your microphone was on during a breakout session, it will stay on when you return to the main session

## Recording breakout sessions

Each breakout session is a separate session. Each breakout session's recording is stored and managed separately, just like any other RealtimeKit meeting. For more information, refer to [Recording](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/).

## Breakout rooms management

Breakout rooms allow the participants to split into separate sessions. The host can create breakout rooms, assign participants, start and close the breakout rooms.

### Create presets

A preset is a set of permissions and UI configurations that are applied to hosts and participants. They determine the look, feel, and behavior of the breakout room.

For breakout rooms, you must provide the following permissions for hosts and participants in Connected Meetings:

#### Host

The host preset should have **Full Access** permission in Connected Meetings. This allows the host to:

* Create breakout rooms
* Assign participants to rooms
* Start and close breakout rooms
* Switch between rooms

#### Participants

You can choose to provide the following permissions to participants:

* **Switch Connected Meetings** \- Allows participants to move between breakout rooms
* **Switch to Parent Meeting** \- Allows participants to return to the main meeting

### Save the preset

1. Once you have made all the changes to your preset, click **Save**
2. Enter a name for your preset and click **Save**
3. Your preset is listed - click **Edit** to make any changes

### Create a meeting

Create a RealtimeKit meeting using the [Create meeting API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/). This API returns a unique identifier for your meeting.

### Add participants

After creating the meeting, add each participant using the [Add participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/). The `presetName` created earlier must be passed in the body of the Add Participant API request.

### Start breakout room

1. In your RealtimeKit meeting, click **Breakout Rooms**
2. In the Create Breakout dialog, add the number of rooms you want and click **Create**

Once you have created breakout rooms, assign participants to the rooms. You can either:

* **Assign participants automatically** \- RealtimeKit splits participants evenly across rooms
* **Assign participants manually** \- Select which participants you want in each room

#### Assign participants automatically

To assign participants automatically:

1. In the Assign Participants dialog, click the shuffle button
2. Participants are assigned to the rooms
3. Edit room names by clicking the pencil icon beside the room name (optional)
4. Move participants to different rooms if needed
5. Click **Start Breakout**
6. Click **Yes, start** in the confirmation dialog

#### Assign participants manually

To assign participants manually:

1. In the Assign Participants dialog, select the participants you want to assign to a room
2. In the Rooms section, click **Assign**
3. Repeat for all participants and rooms
4. Click **Start Breakout**
5. Click **Yes, start** in the confirmation dialog

1. In your RealtimeKit meeting, tap **Breakout Rooms**
2. In the Create Breakout dialog, add the number of rooms you want and tap **Create**

Once you have created breakout rooms, assign participants to the rooms. You can assign participants automatically (RealtimeKit splits them evenly) or manually (you choose who goes where).

#### Assign participants automatically

To assign participants automatically:

1. In the Assign Participants dialog, tap the shuffle button
2. RealtimeKit assigns participants to the rooms
3. Edit room names by tapping the pencil icon beside the room name (optional)
4. Move participants to different rooms if needed
5. Tap **Start Breakout**
6. Tap **Yes, start** in the confirmation dialog

#### Assign participants manually

To assign participants manually:

1. In the Assign Participants dialog, select the participants you want to assign to a room
2. In the Rooms section, tap **Assign**
3. Repeat for all participants and rooms
4. Tap **Start Breakout**
5. Tap **Yes, start** in the confirmation dialog

1. In your RealtimeKit meeting, tap **Breakout Rooms**
2. In the Create Breakout dialog, add the number of rooms you want and tap **Create**

Once you have created breakout rooms, assign participants to the rooms. You can assign participants automatically (RealtimeKit splits them evenly) or manually (you choose who goes where).

#### Assign participants automatically

To assign participants automatically:

1. In the Assign Participants dialog, tap the shuffle button
2. RealtimeKit assigns participants to the rooms
3. Edit room names by tapping the pencil icon beside the room name (optional)
4. Move participants to different rooms if needed
5. Tap **Start Breakout**
6. Tap **Yes, start** in the confirmation dialog

#### Assign participants manually

To assign participants manually:

1. In the Assign Participants dialog, select the participants you want to assign to a room
2. In the Rooms section, tap **Assign**
3. Repeat for all participants and rooms
4. Tap **Start Breakout**
5. Tap **Yes, start** in the confirmation dialog

1. In your RealtimeKit meeting, tap **Breakout Rooms**
2. In the Create Breakout dialog, add the number of rooms you want and tap **Create**

Once you have created breakout rooms, assign participants to the rooms. You can assign participants automatically (RealtimeKit splits them evenly) or manually (you choose who goes where).

#### Assign participants automatically

To assign participants automatically:

1. In the Assign Participants dialog, tap the shuffle button
2. RealtimeKit assigns participants to the rooms
3. Edit room names by tapping the pencil icon beside the room name (optional)
4. Move participants to different rooms if needed
5. Tap **Start Breakout**
6. Tap **Yes, start** in the confirmation dialog

#### Assign participants manually

To assign participants manually:

1. In the Assign Participants dialog, select the participants you want to assign to a room
2. In the Rooms section, tap **Assign**
3. Repeat for all participants and rooms
4. Tap **Start Breakout**
5. Tap **Yes, start** in the confirmation dialog

## Integrate breakout rooms

After setting up breakout rooms via the API, you need to integrate them into your application using the RealtimeKit SDK.

This page is not available for the **Flutter**platform.

WebMobile

ReactWeb ComponentsAngular

### Initialize the SDK with breakout rooms support

Initialize the SDK and add an event handler for breakout rooms:

```jsx
import {
  RealtimeKitProvider,
  useRealtimeKitClient,
} from "@cloudflare/realtimekit-react";
import { RtkMeeting } from "@cloudflare/realtimekit-react-ui";
import { useEffect, useState } from "react";


function App() {
  const [meeting, initMeeting] = useRealtimeKitClient();
  const [authToken, setAuthToken] = useState("<participant_auth_token>");


  useEffect(() => {
    if (authToken) {
      initMeeting({
        authToken: authToken,
      });
    }
  }, [authToken]);


  // Add event handler for breakout rooms
  useEffect(() => {
    if (meeting) {
      meeting.connectedMeetings.on("meetingChanged", (newMeeting) => {
        // Meeting object is automatically updated in React
        console.log("Switched to breakout room or main meeting");
      });
    }
  }, [meeting]);


  return (
    <RealtimeKitProvider value={meeting}>
      <RtkMeeting showSetupScreen={true} meeting={meeting} />
    </RealtimeKitProvider>
  );
}
```

The `meetingChanged` event is triggered when a participant switches between the main meeting and breakout rooms. In React, the meeting object is automatically managed by the provider.

```html
<script type="module">
  import RealtimeKitClient from "https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit@latest/dist/index.es.js";


  let meeting = await RealtimeKitClient.init({
    authToken: "<participant_auth_token>",
  });


  // Add event handler for breakout rooms
  meeting.connectedMeetings.on("meetingChanged", (newMeeting) => {
    meeting = newMeeting;
    document.querySelector("rtk-meeting").meeting = meeting;
  });
</script>
```

The `meetingChanged` event is triggered when a participant switches between the main meeting and breakout rooms. Update the meeting object reference when this event fires.

**TypeScript**

```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import RealtimeKitClient from '@cloudflare/realtimekit';
import { RtkMeeting } from '@cloudflare/realtimekit-angular';


@Component({
  selector: 'app-root',
  template: `<rtk-meeting #myid [showSetupScreen]="true"></rtk-meeting>`
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myid') meetingComponent: RtkMeeting;
  rtkMeeting: RealtimeKitClient;


  async ngAfterViewInit() {
    let meeting = await RealtimeKitClient.init({
      authToken: '<participant_auth_token>',
    });


    // Add event handler for breakout rooms
    meeting.connectedMeetings.on('meetingChanged', (newMeeting) => {
      meeting = newMeeting;
      if (this.meetingComponent) {
        this.meetingComponent.meeting = meeting;
      }
    });


    this.rtkMeeting = meeting;
    if (this.meetingComponent) {
      this.meetingComponent.meeting = meeting;
    }
  }
}
```

The `meetingChanged` event is triggered when a participant switches between the main meeting and breakout rooms. Update the meeting object reference when this event fires.

When using `RealtimeKitUI.startMeeting()`, the SDK automatically manages the `RtkConnectedMeetingsListener` — no extra setup is required for breakout room switching.

If you are building a **custom meeting UI** (bypassing `MeetingViewController`), register the listener yourself:

**Swift**

```swift
import RealtimeKit
import RealtimeKitUI


let listener = RtkConnectedMeetingsListener(rtkClient: rtkClient)


listener.onChangingMeeting = { meetingId in
    // Show a loading overlay; the SDK is switching rooms
    let isReturningToMain = meetingId == rtkClient.connectedMeetings.parentMeeting?.id
    showLoadingOverlay(message: isReturningToMain ? "Returning to Main Room\u{2026}" : "Joining breakout room\u{2026}")
}


listener.onMeetingChanged = { error in
    hideLoadingOverlay()
    if let error {
        showErrorAlert(message: error.message)
    } else {
        // Re-register all feature event listeners — the SDK clears them during the room switch
        // Re-register your listener instances, for example:
        // rtkClient.addSelfEventListener(selfEventListener: mySelfListener)
        // rtkClient.addParticipantsEventListener(participantsEventListener: myParticipantsListener)
    }
}


listener.onStateUpdate = { meetings, parentMeeting in
    // Refresh your breakout-rooms UI list
}
```

Note

Hold a strong reference to `RtkConnectedMeetingsListener`. It deregisters itself on `deinit`.

When using `RealtimeKitUIBuilder` \+ `startMeeting()`, the SDK automatically registers and manages `RtkConnectedMeetingsEventListener` — no extra setup is required for breakout room switching.

If you are building a **custom meeting UI**, register the listener yourself:

**Kotlin**

```kotlin
import com.cloudflare.realtimekit.ui.RtkConnectedMeetingsEventListener
import com.cloudflare.realtimekit.models.MeetingError


val connectedMeetingsListener = object : RtkConnectedMeetingsEventListener {
    override fun onChangingMeeting(meetingId: String) {
        // Show a transition screen; the SDK is switching rooms
        val isReturningToMain = meetingId == meeting.connectedMeetings.parentMeeting?.id
        showLoadingOverlay(isReturningToMain)
    }


    override fun onMeetingChanged(error: MeetingError?) {
        hideLoadingOverlay()
        if (error != null) {
            showErrorMessage(error.message)
        }
        // No need to re-register listeners — the SDK handles this automatically
    }
}


meeting.addConnectedMeetingsEventListener(connectedMeetingsListener)
```

The `onChangingMeeting` callback fires when the SDK starts leaving the current room. The `onMeetingChanged` callback fires when the switch completes (or fails).

The `useRealtimeKitClient` hook automatically handles the `meetingChanged` event and swaps the active client reference when a participant moves between breakout rooms. No manual event handling is required.

```tsx
import { useEffect } from "react";
import { useRealtimeKitClient } from "@cloudflare/realtimekit-react-native";
import { RtkMeeting } from "@cloudflare/realtimekit-react-native-ui";


function App() {
  const [meeting, initMeeting] = useRealtimeKitClient();


  useEffect(() => {
    initMeeting({ authToken: "<participant_auth_token>" });
  }, []);


  if (!meeting) return null;


  return <RtkMeeting meeting={meeting} showSetupScreen={true} />;
}
```

`RtkMeeting` displays a "Joining…" transition screen automatically when switching between breakout rooms. No extra setup is needed.

### Render the meeting UI

Use the default meeting UI component which includes built-in breakout room support:

```jsx
import {
  RealtimeKitProvider,
  useRealtimeKitClient,
} from "@cloudflare/realtimekit-react";
import { RtkMeeting } from "@cloudflare/realtimekit-react-ui";
import { useEffect, useState } from "react";


function App() {
  const [meeting, initMeeting] = useRealtimeKitClient();
  const [authToken, setAuthToken] = useState("<participant_auth_token>");


  useEffect(() => {
    if (authToken) {
      initMeeting({
        authToken: authToken,
      });
    }
  }, [authToken]);


  useEffect(() => {
    if (meeting) {
      meeting.connectedMeetings.on("meetingChanged", (newMeeting) => {
        console.log("Switched to breakout room or main meeting");
      });
    }
  }, [meeting]);


  return (
    <RealtimeKitProvider value={meeting}>
      <RtkMeeting showSetupScreen={true} meeting={meeting} />
    </RealtimeKitProvider>
  );
}
```

Note

The Default Meeting UI (`RtkMeeting` component) automatically joins the session, so you do not need to call `meeting.join()`.

The `showSetupScreen` property controls whether the setup screen is displayed, allowing participants to preview their audio and video before joining the session.

```html
<body>
  <rtk-meeting id="my-meeting"></rtk-meeting>


  <script type="module">
    import RealtimeKitClient from "https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit@latest/dist/index.es.js";


    let meeting = await RealtimeKitClient.init({
      authToken: "<participant_auth_token>",
    });


    // Add event handler for breakout rooms
    meeting.connectedMeetings.on("meetingChanged", (newMeeting) => {
      meeting = newMeeting;
      document.querySelector("rtk-meeting").meeting = meeting;
    });


    document.querySelector("rtk-meeting").showSetupScreen = true;
    document.querySelector("rtk-meeting").meeting = meeting;
  </script>
</body>
```

Note

The Default Meeting UI (`rtk-meeting` component) automatically joins the session, so you do not need to call `meeting.join()`.

The `showSetupScreen` property controls whether the setup screen is displayed, allowing participants to preview their audio and video before joining the session.

```html
<rtk-meeting #myid [showSetupScreen]="true"></rtk-meeting>
```

**TypeScript**

```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import RealtimeKitClient from '@cloudflare/realtimekit';
import { RtkMeeting } from '@cloudflare/realtimekit-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myid') meetingComponent: RtkMeeting;
  rtkMeeting: RealtimeKitClient;


  async ngAfterViewInit() {
    let meeting = await RealtimeKitClient.init({
      authToken: '<participant_auth_token>',
    });


    // Add event handler for breakout rooms
    meeting.connectedMeetings.on('meetingChanged', (newMeeting) => {
      meeting = newMeeting;
      if (this.meetingComponent) {
        this.meetingComponent.meeting = meeting;
      }
    });


    this.rtkMeeting = meeting;
    if (this.meetingComponent) {
      this.meetingComponent.meeting = meeting;
    }
  }
}
```

Note

The Default Meeting UI (`rtk-meeting` component) automatically joins the session, so you do not need to call `meeting.join()`.

The `showSetupScreen` property controls whether the setup screen is displayed, allowing participants to preview their audio and video before joining the session.

**Swift**

```swift
import RealtimeKit
import RealtimeKitUI


let meetingInfo = RtkMeetingInfo(authToken: "<participant_auth_token>")
let rtkUI = RealtimeKitUI(meetingInfo: meetingInfo)


let setupVC = rtkUI.startMeeting { [weak self] in
    // Called when the participant leaves or ends the meeting
    self?.dismiss(animated: true)
}
present(setupVC, animated: true)
```

Note

Like the web UI Kit, `MeetingViewController` **automatically joins the session** — you do not need to call `meeting.join()` manually.

The setup screen (audio/video preview) is shown by default. Built-in breakout room support — including the room-switching overlay and room title updates — is handled automatically by `MeetingViewController`.

**Kotlin**

```kotlin
import com.cloudflare.realtimekit.models.RtkMeetingInfo
import com.cloudflare.realtimekit.ui.RealtimeKitUIBuilder
import com.cloudflare.realtimekit.ui.RealtimeKitUIInfo


val meetingInfo = RtkMeetingInfo(authToken = "<participant_auth_token>")
val uiKitInfo = RealtimeKitUIInfo(
    activity = this,
    rtkMeetingInfo = meetingInfo,
)
val rtkUIKit = RealtimeKitUIBuilder.build(uiKitInfo)
rtkUIKit.startMeeting()
```

Note

`RtkMeetingActivity` **automatically joins the session** — you do not need to call `meeting.join()` manually.

Built-in breakout room support is handled automatically by `RtkMeetingActivity`. When the SDK moves participants between rooms, it displays a transition overlay with a localized message. The host can manage breakout rooms via the `RtkBreakoutRoomsBottomSheet`, which is shown automatically when the Breakout Rooms control bar button is tapped.

```tsx
import { useEffect } from "react";
import { useRealtimeKitClient } from "@cloudflare/realtimekit-react-native";
import { RtkMeeting } from "@cloudflare/realtimekit-react-native-ui";


function App() {
  const [meeting, initMeeting] = useRealtimeKitClient();


  useEffect(() => {
    initMeeting({ authToken: "<participant_auth_token>" });
  }, []);


  if (!meeting) return null;


  return <RtkMeeting meeting={meeting} showSetupScreen={true} />;
}
```

Built-in breakout room support is handled automatically by `RtkMeeting`. When a participant is moved between rooms, a "Joining…" transition screen is displayed automatically. The host can manage breakout rooms using `RtkBreakoutRoomsManager`, which is accessible via `RtkBreakoutRoomsToggle` in the control bar.

## Next steps

You have successfully integrated breakout rooms into your RealtimeKit application. Participants can now:

* Join the main meeting
* Be assigned to breakout rooms by the host
* Switch between the main meeting and breakout rooms
* Collaborate in smaller focused groups

For more advanced customization, explore the following:

* [UI Kit Components Library](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/component-library/) \- Browse available components
* [UI Kit States](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/state-management/) \- Learn how components synchronize
* [Build Your Own UI](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/build-your-own-ui/) \- Create custom meeting interfaces

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/breakout-rooms/#page","headline":"Breakout Rooms · Cloudflare Realtime docs","description":"Create and manage breakout rooms in RealtimeKit meetings for smaller group discussions.","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/breakout-rooms/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/breakout-rooms/","name":"Breakout Rooms"}}]}
```
