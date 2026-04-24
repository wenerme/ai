---
title: RtkPaginatedList
description: API reference for RtkPaginatedList component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkPaginatedList.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RtkPaginatedList

## Properties

| Property       | Type                                                 | Required | Default         | Description                                    |
| -------------- | ---------------------------------------------------- | -------- | --------------- | ---------------------------------------------- |
| autoScroll     | boolean                                              | ✅        | \-              | auto scroll list to bottom                     |
| createNodes    | (data: unknown\[\])                                  | ✅        | \-              | Create nodes                                   |
| emptyListLabel | string                                               | ✅        | \-              | label to show when empty                       |
| fetchData      | (timestamp: number, size: number, reversed: boolean) | ✅        | \-              | Fetch the data                                 |
| iconPack       | IconPack                                             | ❌        | defaultIconPack | Icon pack                                      |
| pageSize       | number                                               | ✅        | \-              | Page Size                                      |
| pagesAllowed   | number                                               | ✅        | \-              | Number of pages allowed to be shown            |
| rerenderList   | ()                                                   | ✅        | \-              | Rerender paginated list                        |
| reset          | (timestamp?: number)                                 | ❌        | \-              | Resets the paginated list to a given timestamp |
| t              | RtkI18n                                              | ❌        | useLanguage()   | Language                                       |

## Usage Examples

### Basic Usage

```

import { RtkPaginatedList } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkPaginatedList />;

}


```

### With Properties

```

import { RtkPaginatedList } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkPaginatedList

      autoScroll={true}

      createNodes={[]}

      emptyListLabel="example"

    />

  );

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkpaginatedlist/","name":"RtkPaginatedList"}}]}
```
