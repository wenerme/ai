# Libraries

This page covers setting up your local development environment to use the [OpenAI API](https://developers.openai.com/api/docs/api-reference). You can use one of our officially supported SDKs, a community library, or your own preferred HTTP client.

## Create and export an API key

Before you begin, [create an API key in the dashboard](https://platform.openai.com/api-keys), which you'll use to securely [access the API](https://developers.openai.com/api/docs/api-reference/authentication). Store the key in a safe location, like a [`.zshrc` file](https://www.freecodecamp.org/news/how-do-zsh-configuration-files-work/) or another text file on your computer. Once you've generated an API key, export it as an [environment variable](https://en.wikipedia.org/wiki/Environment_variable) in your terminal.



<div data-content-switcher-pane data-value="macOS">
    <div class="hidden">macOS / Linux</div>
    Export an environment variable on macOS or Linux systems

```bash
export OPENAI_API_KEY="your_api_key_here"
```

  </div>
  <div data-content-switcher-pane data-value="windows" hidden>
    <div class="hidden">Windows</div>
    Export an environment variable in PowerShell

```bash
setx OPENAI_API_KEY "your_api_key_here"
```

  </div>



OpenAI SDKs are configured to automatically read your API key from the system environment.

## Install an official SDK



<div data-content-switcher-pane data-value="javascript">
    <div class="hidden">JavaScript</div>
    </div>
  <div data-content-switcher-pane data-value="python" hidden>
    <div class="hidden">Python</div>
    </div>
  <div data-content-switcher-pane data-value="csharp" hidden>
    <div class="hidden">.NET</div>
    </div>
  <div data-content-switcher-pane data-value="java" hidden>
    <div class="hidden">Java</div>
    </div>
  <div data-content-switcher-pane data-value="golang" hidden>
    <div class="hidden">Go</div>
    </div>



## Azure OpenAI libraries

Microsoft's Azure team maintains libraries that are compatible with both the OpenAI API and Azure OpenAI services. Read the library documentation below to learn how you can use them with the OpenAI API.

- [Azure OpenAI client library for .NET](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/openai/Azure.AI.OpenAI)
- [Azure OpenAI client library for JavaScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai)
- [Azure OpenAI client library for Java](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/openai/azure-ai-openai)
- [Azure OpenAI client library for Go](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/ai/azopenai)

---

## Community libraries

The libraries below are built and maintained by the broader developer community. You can also [watch our OpenAPI specification](https://github.com/openai/openai-openapi) repository on GitHub to get timely updates on when we make changes to our API.

Please note that OpenAI does not verify the correctness or security of these projects. **Use them at your own risk!**

### C# / .NET

- [Betalgo.OpenAI](https://github.com/betalgo/openai) by [Betalgo](https://github.com/betalgo)
- [OpenAI-API-dotnet](https://github.com/OkGoDoIt/OpenAI-API-dotnet) by [OkGoDoIt](https://github.com/OkGoDoIt)
- [OpenAI-DotNet](https://github.com/RageAgainstThePixel/OpenAI-DotNet) by [RageAgainstThePixel](https://github.com/RageAgainstThePixel)

### C++

- [liboai](https://github.com/D7EAD/liboai) by [D7EAD](https://github.com/D7EAD)

### Clojure

- [openai-clojure](https://github.com/wkok/openai-clojure) by [wkok](https://github.com/wkok)

### Crystal

- [openai-crystal](https://github.com/sferik/openai-crystal) by [sferik](https://github.com/sferik)

### Dart/Flutter

- [openai](https://github.com/anasfik/openai) by [anasfik](https://github.com/anasfik)

### Delphi

- [DelphiOpenAI](https://github.com/HemulGM/DelphiOpenAI) by [HemulGM](https://github.com/HemulGM)

### Elixir

- [openai.ex](https://github.com/mgallo/openai.ex) by [mgallo](https://github.com/mgallo)

### Go

- [go-gpt3](https://github.com/sashabaranov/go-gpt3) by [sashabaranov](https://github.com/sashabaranov)

### Java

- [simple-openai](https://github.com/sashirestela/simple-openai) by [Sashir Estela](https://github.com/sashirestela)
- [Spring AI](https://spring.io/projects/spring-ai)

### Julia

- [OpenAI.jl](https://github.com/rory-linehan/OpenAI.jl) by [rory-linehan](https://github.com/rory-linehan)

### Kotlin

- [openai-kotlin](https://github.com/Aallam/openai-kotlin) by [Mouaad Aallam](https://github.com/Aallam)

### Node.js

- [openai-api](https://www.npmjs.com/package/openai-api) by [Njerschow](https://github.com/Njerschow)
- [openai-api-node](https://www.npmjs.com/package/openai-api-node) by [erlapso](https://github.com/erlapso)
- [gpt-x](https://www.npmjs.com/package/gpt-x) by [ceifa](https://github.com/ceifa)
- [gpt3](https://www.npmjs.com/package/gpt3) by [poteat](https://github.com/poteat)
- [gpts](https://www.npmjs.com/package/gpts) by [thencc](https://github.com/thencc)
- [@dalenguyen/openai](https://www.npmjs.com/package/@dalenguyen/openai) by [dalenguyen](https://github.com/dalenguyen)
- [tectalic/openai](https://github.com/tectalichq/public-openai-client-js) by [tectalic](https://tectalic.com/)

### PHP

- [orhanerday/open-ai](https://packagist.org/packages/orhanerday/open-ai) by [orhanerday](https://github.com/orhanerday)
- [tectalic/openai](https://github.com/tectalichq/public-openai-client-php) by [tectalic](https://tectalic.com/)
- [openai-php client](https://github.com/openai-php/client) by [openai-php](https://github.com/openai-php)

### Python

- [chronology](https://github.com/OthersideAI/chronology) by [OthersideAI](https://www.othersideai.com/)

### R

- [rgpt3](https://github.com/ben-aaron188/rgpt3) by [ben-aaron188](https://github.com/ben-aaron188)

### Ruby

- [openai](https://github.com/nileshtrivedi/openai/) by [nileshtrivedi](https://github.com/nileshtrivedi)
- [ruby-openai](https://github.com/alexrudall/ruby-openai) by [alexrudall](https://github.com/alexrudall)

### Rust

- [async-openai](https://github.com/64bit/async-openai) by [64bit](https://github.com/64bit)
- [fieri](https://github.com/lbkolev/fieri) by [lbkolev](https://github.com/lbkolev)

### Scala

- [openai-scala-client](https://github.com/cequence-io/openai-scala-client) by [cequence-io](https://github.com/cequence-io)

### Swift

- [AIProxySwift](https://github.com/lzell/AIProxySwift) by [Lou Zell](https://github.com/lzell)
- [OpenAIKit](https://github.com/dylanshine/openai-kit) by [dylanshine](https://github.com/dylanshine)
- [OpenAI](https://github.com/MacPaw/OpenAI/) by [MacPaw](https://github.com/MacPaw)

### Unity

- [OpenAi-Api-Unity](https://github.com/hexthedev/OpenAi-Api-Unity) by [hexthedev](https://github.com/hexthedev)
- [com.openai.unity](https://github.com/RageAgainstThePixel/com.openai.unity) by [RageAgainstThePixel](https://github.com/RageAgainstThePixel)

### Unreal Engine

- [OpenAI-Api-Unreal](https://github.com/KellanM/OpenAI-Api-Unreal) by [KellanM](https://github.com/KellanM)

## Other OpenAI repositories

- [tiktoken](https://github.com/openai/tiktoken) - counting tokens
- [simple-evals](https://github.com/openai/simple-evals) - simple evaluation library
- [mle-bench](https://github.com/openai/mle-bench) - library to evaluate machine learning engineer agents
- [gym](https://github.com/openai/gym) - reinforcement learning library
- [swarm](https://github.com/openai/swarm) - educational orchestration repository