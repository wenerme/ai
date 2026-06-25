---
title: "Tensorflow | Grafana Plugins documentation"
description: "Learn how to integrate TensorFlow.js for machine learning capabilities in the Business Text panel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# TensorFlow

[TensorFlow.js](https://www.tensorflow.org/js) is a library for machine learning in JavaScript.

## Before Content Rendering

> Warning
>
> Plug-in libraries may change their versions and the code in the example may not work or cause an error.

Use the following for the **JavaScript &gt; Before Content Rendering**:

js [Copy code to clipboard] Copy

```js
console.log('Loading TensorFlow...');
import("https://cdnjs.cloudflare.com/ajax/libs/tensorflow/4.22.0/tf.fesm.min.js").then(tf => {
  console.log('Done loading TensorFlow');
  console.log('Check if TensorFlow if ready');

  tf.ready().then(() => {
    console.log('TensorFlow is ready');
    console.log('TensorFlow version: ', tf.version);
    console.log('TensorFlow backend: ', tf.getBackend());
  }
})
```
