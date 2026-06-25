---
title: "Leaflet.js | Grafana Plugins documentation"
description: "Learn how to create interactive maps with GeoJSON data using the Leaflet.js library in the Business Text panel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Leaflet.js

This example demonstrates external resource usage in the Business Text plugin. The idea comes from [BlinderMiri](https://github.com/BlinderMiri) and [Josiah Solomon](https://github.com/yosiasz).

Follow the outlined steps to display Leaflet.js maps on your Grafana dashboard.

[](/media/docs/grafana/panels-visualizations/business-text/leaflet-edit.png)

The following illustration shows the map on the dashboard from this example.

[](/media/docs/grafana/panels-visualizations/business-text/leaflet-display.png)

## Data to copy

This example uses the [Business Input Data Source](/docs/plugins/marcusolsson-static-datasource/latest/).

js [Copy code to clipboard] Copy

```js
{
  "geometry": {
    "coordinates": [
      125.6,
      10.1
    ],
    "type": "Point"
  },
  "properties": {
    "name": "Dinagat Islands"
  },
  "type": "Feature"
}
```

## Content

HTML [Copy code to clipboard] Copy

```html
<div id="leaflet" />
```

## After Content Ready

> Warning
>
> Plug-in libraries may change their versions and the code in the example may not work or cause an error.

Use the following for the **JavaScript &gt; After Content Ready**:

js [Copy code to clipboard] Copy

```js
// This data is coming from the data source.
// const geojson = JSON.parse(context.data[0][0].data);

import("https://esm.sh/leaflet").then(({ default: L }) => {
  /**
   * Cleanup
   */
  if (this.map) {
    this.map.remove();
  }

  const map = L.map("leaflet").setView([9.024857, 38.737607], 13);
  this.map = map;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  //if you want to use inline data
  const geojson = {
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
    },
    features: [
      {
        type: "Feature",
        properties: { AOIs: "bbb", daily: "33" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [33.5, 32.0],
              [33.5, 29.0],
              [36.0, 29.0],
              [36.0, 27.5],
              [33.5, 27.5],
              [32.5, 27.5],
              [29.0, 27.5],
              [29.0, 32.0],
              [33.5, 32.0],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { AOIs: "aaa", daily: "23" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [34.5, 32.5],
              [36.0, 32.5],
              [36.0, 29.0],
              [33.5, 29.0],
              [33.5, 32.0],
              [33.5, 32.5],
              [34.5, 32.5],
            ],
          ],
        },
      },
    ],
  };

  var myStyle = {
    color: "black",
    weight: 10,
  };

  var geojsonLayer = L.geoJSON(geojson).addTo(map);
});
```

## CSS styles

Use the following external CSS

[Copy code to clipboard] Copy

```none
https://unpkg.com/leaflet@1.9.4/dist/leaflet.css
```

CSS [Copy code to clipboard] Copy

```css
#leaflet {
  height: 480px;
  display: flex;
  flex-direction: row;
}
```
