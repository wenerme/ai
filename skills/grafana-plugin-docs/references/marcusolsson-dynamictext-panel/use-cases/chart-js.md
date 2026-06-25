---
title: "Chart.js | Grafana Plugins documentation"
description: "Learn how to create interactive charts using the Chart.js library in the Business Text panel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Chart.js

Chart.js is a popular open-source charting library. The Business Text plugin enables using Chart.js in Grafana.

[](/media/docs/grafana/panels-visualizations/business-text/chartjs-examples.png)

## Example

[](/media/docs/grafana/panels-visualizations/business-text/chartjs.png)

Use the following external library

md [Copy code to clipboard] Copy

```md
https://esm.sh/chart.js
```

## Code to copy

Use the following for the **Content**:

js [Copy code to clipboard] Copy

```js
<canvas id="myChart" />
```

## After Content Ready

> Warning
>
> Plug-in libraries may change their versions and the code in the example may not work or cause an error.

Use the following for the **JavaScript &gt; After Content Ready**:

js [Copy code to clipboard] Copy

```js
import("https://esm.sh/chart.js").then(({ Chart, registerables }) => {
  Chart.register(...registerables);

  /**
   * Cleanup
   */
  if (this.chartInstance) {
    this.chartInstance.destroy();
  }

  const ctx = document.getElementById("myChart");

  this.chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
```
