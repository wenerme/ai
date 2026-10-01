---
description: Configure iOS screen sharing for native iOS and React Native RealtimeKit applications.
title: iOS screen sharing
image: https://developers.cloudflare.com/realtime/realtimekit/core/ios-screen-sharing/og.png?v=79d3523f720bba0f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# iOS screen sharing

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/ios-screen-sharing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Configure a Broadcast Upload Extension to add screen sharing to your RealtimeKit iOS application.

## Native iOS

### Add a Broadcast Upload Extension

In Xcode, add a Broadcast Upload Extension through `File` → `New` → `Target`. Choose `iOS` → `Broadcast Upload Extension` and fill out the required information.

### Configure app groups

Add your extension to an app group:

1. Go to your extension's target in the project.
2. In the **Signing & Capabilities** tab, select **+**.
3. Add **App Groups**.
4. Add **App Groups** to your main app, using the same identifier for both targets.

### Configure `SampleHandler`

Edit your `SampleHandler` class:

```swift
import RealtimeKit

class SampleHandler: RtkSampleHandler {}
```

You can find the source to `RtkSampleHandler` and a full implementation of the ScreenShareExtension [on GitHub ↗︎](https://github.com/cloudflare/realtimekit-ios-core/tree/main/ScreenShareExtension).

### Update `Info.plist`

Ensure both the app and extension `Info.plist` files contain these keys:

```xml
<key>RTKRTCAppGroupIdentifier</key>
<string>(name of the group you have created)</string>
```

Add this key to the main app `Info.plist`:

```xml
<key>RTKRTCScreenSharingExtension</key>
<string>(Bundle Identifier of the Broadcast Upload Extension)</string>
```

### Enable screen sharing

Launch the Broadcast Upload Extension and enable screen sharing:

```swift
meeting.localUser.enableScreenShare()
```

To stop screen sharing:

```swift
meeting.localUser.disableScreenShare()
```

## React Native

### Add a Broadcast Upload Extension

In Xcode, add a Broadcast Upload Extension through `File` → `New` → `Target`. Choose `iOS` → `Broadcast Upload Extension` and fill out the required information.

### Configure app groups

Add your extension to an app group:

1. Go to your extension's target in the project.
2. In the **Signing & Capabilities** tab, select **+** and add **App Groups**.
3. Add the same App Group to your main app target, using the same identifier for both.

### Add screen-sharing sources through the Podfile

The SDK includes a Ruby helper script that adds the required screen-sharing Swift source files to your Broadcast Upload Extension target. Add the following to your `Podfile`:

```ruby
# Add this line at the top
require Pod::Executable.execute_command('node', ['-p',
  'require.resolve(
    "@cloudflare/realtimekit-react-native/ios/scripts/screenshare_sources.rb",
    {paths: [process.argv[1]]},
  )', __dir__]).strip

target 'YourApp' do
  ...
  post_install do |installer|
    ...
    # Add this line here
    add_screenshare_sources(
      installer,
      project_name: 'YourApp',              # your Xcode project name (without .xcodeproj)
      extension_target_name: 'YourAppScreenshare' # your Broadcast Upload Extension target name
    )
    ...
  end
end

target 'YourAppScreenshare' do
# Remove the old steps added if any
end
```

Then run:

```bash
pod install
```

### Configure `SampleHandler`

In your Broadcast Upload Extension, edit `SampleHandler.swift`:

```swift
class SampleHandler: RTKScreenshareHandler {
  override init() {
    super.init(
      appGroupIdentifier: "<YOUR_APP_GROUP_IDENTIFIER>",
      bundleIdentifier: "<YOUR_APP_BUNDLE_IDENTIFIER>"
    )
  }
}
```

Replace `<YOUR_APP_GROUP_IDENTIFIER>` with the App Group you created. Replace `<YOUR_APP_BUNDLE_IDENTIFIER>` with your main app's bundle identifier.

### Update `Info.plist`

Add the following key to both your main app and extension `Info.plist` files:

```xml
<key>RTCAppGroupIdentifier</key>
<string>(YOUR_APP_GROUP_IDENTIFIER)</string>
```

Add this key to the main app `Info.plist` only:

```xml
<key>RTCAppScreenSharingExtension</key>
<string>(Bundle Identifier of the Broadcast Upload Extension)</string>
```

### Enable screen sharing

```js
meeting.self.enableScreenShare();
```

To stop screen sharing:

```js
meeting.self.disableScreenShare();
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/ios-screen-sharing/#page","headline":"iOS screen sharing","description":"Configure iOS screen sharing for native iOS and React Native RealtimeKit applications.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/ios-screen-sharing/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/core/ios-screen-sharing/og.png?v=79d3523f720bba0f","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
