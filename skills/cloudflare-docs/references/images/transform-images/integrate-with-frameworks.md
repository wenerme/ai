---
title: Integrate with frameworks
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/transform-images/integrate-with-frameworks.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Integrate with frameworks

## Next.js

Image transformations can be used automatically with the Next.js [<Image /> component ↗](https://nextjs.org/docs/api-reference/next/image).

To use image transformations, define a global image loader or multiple custom loaders for each `<Image />` component.

Next.js will request the image with the correct parameters for width and quality.

Image transformations will be responsible for caching and serving an optimal format to the client.

### Global Loader

To use Images with **all** your app's images, define a global [loaderFile ↗](https://nextjs.org/docs/pages/api-reference/components/image#loaderfile) for your app.

Add the following settings to the **next.config.js** file located at the root our your Next.js application.

TypeScript

```

module.exports = {

  images: {

    loader: 'custom',

    loaderFile: './imageLoader.ts',

  },

}


```

Next, create the `imageLoader.ts` file in the specified path (relative to the root of your Next.js application).

TypeScript

```

import type { ImageLoaderProps } from "next/image";


const normalizeSrc = (src: string) => {

    return src.startsWith("/") ? src.slice(1) : src;

};


export default function cloudflareLoader({

    src,

    width,

    quality,

}: ImageLoaderProps) {

    const params = [`width=${width}`];

    if (quality) {

      params.push(`quality=${quality}`);

    }

    if (process.env.NODE_ENV === "development") {

      return `${src}?${params.join("&")}`;

    }

    return `/cdn-cgi/image/${params.join(",")}/${normalizeSrc(src)}`;

}


```

### Custom Loaders

Alternatively, define a loader for each `<Image />` component.

JavaScript

```

import Image from 'next/image';


const normalizeSrc = (src) => {

  return src.startsWith('/') ? src.slice(1) : src;

};


const cloudflareLoader = ({ src, width, quality }) => {

  const params = [`width=${width}`];

  if (quality) {

    params.push(`quality=${quality}`);

  }

  if (process.env.NODE_ENV === "development") {

    return `${src}?${params.join("&")}`;

  }

  return `/cdn-cgi/image/${params.join(",")}/${normalizeSrc(src)}`;

};


const MyImage = (props) => {

  return (

    <Image

      loader={cloudflareLoader}

      src="/me.png"

      alt="Picture of the author"

      width={500}

      height={500}

      {...props}

    />

  );

};


```

Note

For local development, you can enable [Resize images from any origin checkbox](https://developers.cloudflare.com/images/get-started/) for your zone. Then, replace `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}` with an absolute URL path:

`https://<YOUR_DOMAIN.COM>/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/transform-images/","name":"Transform images"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/transform-images/integrate-with-frameworks/","name":"Integrate with frameworks"}}]}
```
