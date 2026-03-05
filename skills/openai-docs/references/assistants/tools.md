# Assistants API tools

import {
  Code,
  File,
  Plugin,
} from "@components/react/oai/platform/ui/Icon.react";



## Overview

Assistants created using the Assistants API can be equipped with tools that allow them to perform more complex tasks or interact with your application.
We provide built-in tools for assistants, but you can also define your own tools to extend their capabilities using Function Calling.

The Assistants API currently supports the following tools:



<IconItem title="File Search" className="mt-2">
    <span slot="icon">
      </span>
    Built-in RAG tool to process and search through files
  </IconItem>




<IconItem title="Code Interpreter" className="mt-2">
    <span slot="icon">
      </span>
    Write and run python code, process files and diverse data
  </IconItem>




<IconItem title="Function Calling" className="mt-2">
    <span slot="icon">
      </span>
    Use your own custom functions to interact with your application
  </IconItem>



## Next steps

- See the API reference to [submit tool outputs](https://developers.openai.com/api/docs/api-reference/runs/submitToolOutputs)
- Build a tool-using assistant with our [Quickstart app](https://github.com/openai/openai-assistants-quickstart)