---
title: GraphQL
description: The GraphQL Pages Plugin creates a GraphQL server which can respond to application/json and application/graphql POST requests. It responds with the GraphQL Playground for GET requests.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/pages/functions/plugins/graphql.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# GraphQL

The GraphQL Pages Plugin creates a GraphQL server which can respond to `application/json` and `application/graphql` `POST` requests. It responds with [the GraphQL Playground ↗](https://github.com/graphql/graphql-playground) for `GET` requests.

## Installation

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/pages-plugin-graphql
```

```
yarn add @cloudflare/pages-plugin-graphql
```

```
pnpm add @cloudflare/pages-plugin-graphql
```

```
bun add @cloudflare/pages-plugin-graphql
```

## Usage

TypeScript

```

import graphQLPlugin from "@cloudflare/pages-plugin-graphql";

import {

  graphql,

  GraphQLSchema,

  GraphQLObjectType,

  GraphQLString,

} from "graphql";


const schema = new GraphQLSchema({

  query: new GraphQLObjectType({

    name: "RootQueryType",

    fields: {

      hello: {

        type: GraphQLString,

        resolve() {

          return "Hello, world!";

        },

      },

    },

  }),

});


export const onRequest: PagesFunction = graphQLPlugin({

  schema,

  graphql,

});


```

This Plugin only exposes a single route, so wherever it is mounted is wherever it will be available. In the above example, because it is mounted in `functions/graphql.ts`, the server will be available on `/graphql` of your Pages project.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/plugins/","name":"Pages Plugins"}},{"@type":"ListItem","position":5,"item":{"@id":"/pages/functions/plugins/graphql/","name":"GraphQL"}}]}
```
