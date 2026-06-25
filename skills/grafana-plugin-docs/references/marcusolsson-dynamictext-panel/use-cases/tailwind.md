---
title: "Tailwind CSS | Grafana Plugins documentation"
description: "Learn how to apply utility-first CSS styling using the Tailwind CSS framework in the Business Text panel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Tailwind CSS

Thank you to [Raghavendra Samant](https://github.com/samant-rags) for exploring the utility-first framework [Tailwind CSS](https://tailwindcss.com)! Using Tailwind in the Business Text panel differs slightly from previous examples.

[](/media/docs/grafana/panels-visualizations/business-text/tailwind-panel.png)

To prevent CORS issues, add the Tailwind script to Grafana’s public folder `/usr/share/grafana/public/yourFileName.js`.

The file can contain the import function and use Tailwind, or it can load code from `cdn.tailwindcss.com`.

## CDN-based code

Create a `tailwind.js` file with the code from `cdn.tailwindcss.com` and upload it to `/usr/share/grafana/public/` in the Docker container. The following example uses the latest version: `https://cdn.tailwindcss.com/3.4.4`.

[](/media/docs/grafana/panels-visualizations/business-text/tailwind-file-example.png)

### Content

HTML [Copy code to clipboard] Copy

```html
<div class="bg-gray-100 min-h-64 flex items-center justify-center">
  <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
    <h1 class="text-2xl font-bold mb-4">Welcome to Business Text</h1>
    <p class="text-gray-600 mb-6">
      This is a simple HTML element using the Tailwind CSS library.
    </p>
    <a
      href="#"
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
      >Learn More</a
    >
  </div>
</div>
```

### After Content Ready

Use the following for the **JavaScript &gt; After Content Ready**:

js [Copy code to clipboard] Copy

```js
import("/public/tailwind.js");
```

[](/media/docs/grafana/panels-visualizations/business-text/tailwind-panel-edit-mode.png)

## Load Tailwind from CDN

Create a `loadTailwindFromCDN.js` file with the following code and upload it to the same location in the Docker container.

js [Copy code to clipboard] Copy

```js
function loadTailwindFromCDN() {
  var responseData = "";

  const script = document.createElement("script");

  script.src = "https://cdn.tailwindcss.com";
  document.body.appendChild(script);

  console.log("script" + script);
}

export default loadTailwindFromCDN;
```

### Content

HTML [Copy code to clipboard] Copy

```html
<div class="bg-gray-100 min-h-64 flex items-center justify-center">
  <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
    <h1 class="text-2xl font-bold mb-4">Welcome to Business Text</h1>
    <p class="text-gray-600 mb-6">
      This is a simple HTML element using the Tailwind CSS library.
    </p>
    <a
      href="#"
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
      >Learn More</a
    >
  </div>
</div>
```

### After Content Ready

Use the following for the **JavaScript &gt; After Content Ready**:

js [Copy code to clipboard] Copy

```js
import("/public/loadTailwindFromCDN.js").then(
  ({ default: loadTailwindFromCDN }) => {
    loadTailwindFromCDN();
  }
);
```
