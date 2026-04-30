---
title: RtkSidebar
description: API reference for RtkSidebar component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkSidebar

Full-screen sidebar modal with tabbed navigation for chat, participants, polls, and plugins panels.

## Properties

| Property        | Type               | Required       | Default                                        | Description                       |      |              |                    |
| --------------- | ------------------ | -------------- | ---------------------------------------------- | --------------------------------- | ---- | ------------ | ------------------ |
| meeting         | RealtimeKitClient  | ✅              | \-                                             | The RealtimeKit meeting instance  |      |              |                    |
| config          | UIConfig           | ❌              | defaultConfig                                  | UI configuration object           |      |              |                    |
| iconPack        | IconPack           | ❌              | defaultIconPack                                | Custom icon pack                  |      |              |                    |
| size            | 'lg' \| 'md'       | 'sm'           | 'xl'                                           | ❌                                 | 'sm' | Size variant |                    |
| states          | States             | ❌              | \-                                             | UI state object                   |      |              |                    |
| defaultSection  | 'chat' \| 'none'   | 'participants' | 'plugins'                                      | 'polls'                           | ❌    | 'chat'       | Default active tab |
| enabledSections | SidebarSection\[\] | ❌              | \['chat', 'polls', 'participants', 'plugins'\] | Which sidebar sections to display |      |              |                    |
| t               | RtkI18n            | ❌              | \-                                             | i18n translation function         |      |              |                    |

## Usage Examples

### Basic Usage

```

import { RtkSidebar } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkSidebar meeting={meeting} />;

}


```

### With Properties

```

import { RtkSidebar } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkSidebar

      meeting={meeting}

      defaultSection="chat"

      enabledSections={["chat", "participants", "polls"]}

      size="md"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtksidebar/","name":"RtkSidebar"}}]}
```
