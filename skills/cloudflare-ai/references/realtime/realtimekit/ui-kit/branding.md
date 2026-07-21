---
description: Customize meeting icons and branding in the RealtimeKit UI Kit.
title: Customise Branding
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  Customise Branding

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/branding/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

RealtimeKit's UI Kit provides all the necessary UI components to allow complete customization of all its UI Kit components. You can customize your meeting icons such as chat, clock, leave meeting, mic on and off, and more.

## Prerequisites

To get started with customizing the icons for your meetings, you need to first integrate RealtimeKit's Web SDK into your web application.

WebMobile

ReactWeb ComponentsAngular

## Customize the default icon pack

RealtimeKit's default icon set is available at [icons.realtime.cloudflare.com ↗](https://icons.realtime.cloudflare.com/). You can modify and generate your custom icon set from there.

To replace RealtimeKit's default icon set with your own, pass the link to your icon set in the UI component.

```html
<body>
	<rtk-meeting id="my-meeting"></rtk-meeting>

	<script>
		const init = async () => {
			const meeting = await RealtimeKitClient.init({
				authToken: "<participant_auth_token>",
				defaults: {
					audio: true,
					video: true,
				},
			});

			const meetingEl = document.getElementById("my-meeting");
			meetingEl.meeting = meeting;

			// Pass custom icon pack URL
			meetingEl.iconPackUrl = "https://example.com/my-icon-pack.json";
		};

		init();
	</script>
</body>
```

```jsx
import {
	RealtimeKitProvider,
	useRealtimeKitClient,
} from "@cloudflare/realtimekit-react";
import { RtkMeeting } from "@cloudflare/realtimekit-react-ui";
import { useEffect } from "react";

function App() {
	const [meeting, initMeeting] = useRealtimeKitClient();

	useEffect(() => {
		initMeeting({
			authToken: "<participant_auth_token>",
			defaults: {
				audio: true,
				video: true,
			},
		});
	}, []);

	return (
		<RealtimeKitProvider value={meeting}>
			<RtkMeeting
				meeting={meeting}
				iconPackUrl="https://example.com/my-icon-pack.json"
			/>
		</RealtimeKitProvider>
	);
}
```

```typescript
class AppComponent {
	title = "MyProject";
	@ViewChild("myid") meetingComponent: RtkMeeting;
	rtkMeeting: RealtimeKitClient;

	async ngAfterViewInit() {
		const meeting = await RealtimeKitClient.init({
			authToken: "<auth-token>",
		});
		meeting.join();
		this.rtkMeeting = meeting;
		if (this.meetingComponent) {
			this.meetingComponent.meeting = meeting;
			this.meetingComponent.iconPackUrl =
				"https://example.com/my-icon-pack.json";
		}
	}
}
```

## IconPack reference

The IconPack is an object where:

* **Object key** \- Denotes the name of the icon
* **Object value** \- Stores the SVG string

### Available icons

The default icon pack includes the following icons:

* `attach`
* `call_end`
* `chat`
* `checkmark`
* `chevron_down`
* `chevron_left`
* `chevron_right`
* `chevron_up`
* `clock`
* `copy`
* `disconnected`
* `dismiss`
* `download`
* `emoji_multiple`
* `full_screen_maximize`
* `full_screen_minimize`
* `image`
* `image_off`
* `join_stage`
* `leave_stage`
* `mic_off`
* `mic_on`
* `more_vertical`
* `participants`
* `people`
* `pin`
* `pin_off`
* `poll`
* `recording`
* `rocket`
* `search`
* `send`
* `settings`
* `share`
* `share_screen_person`
* `share_screen_start`
* `share_screen_stop`
* `speaker`
* `spinner`
* `spotlight`
* `stop_recording`
* `subtract`
* `vertical_scroll`
* `vertical_scroll_disabled`
* `video_off`
* `video_on`
* `wand`
* `warning`
* `wifi`

Each icon in your custom icon pack JSON file should be defined as a key-value pair where the key matches one of the icon names above, and the value is the SVG string for that icon.

## Next steps

Explore additional customization options:

* [Render Default Meeting UI](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/) \- Complete meeting experience out of the box
* [Build Your Own UI](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/build-your-own-ui/) \- Create custom meeting interfaces

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/branding/#page","headline":"Customise Branding · Cloudflare Realtime docs","description":"Customize meeting icons and branding in the RealtimeKit UI Kit.","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/branding/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
