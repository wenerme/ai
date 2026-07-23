> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Zapier

> Build AI automations with OpenRouter & Zapier

export const ZapierIframe = ({clientId = "H1twN77QrkkgEf07IFRhQvAnMgtQg8FSowP9qLZP", signUpEmail, signUpFirstName, signUpLastName, theme = "auto", introCopyDisplay = "show", manageZapsDisplay = "show", guessZapDisplay = "show", templateLimit = 10, zapCreateFromScratchDisplay = "show"}) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (document.querySelector('script[src*="zapier-elements"]')) {
      setIsLoaded(true);
      return;
    }
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.css";
    document.head.append(cssLink);
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.esm.js";
    script.onload = () => setIsLoaded(true);
    document.head.append(script);
    return () => {
      const existingScript = document.querySelector('script[src*="zapier-elements"]');
      const existingCSS = document.querySelector('link[href*="zapier-elements"]');
      if (existingScript) existingScript.remove();
      if (existingCSS) existingCSS.remove();
    };
  }, []);
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;
    const zapierWorkflow = document.createElement("zapier-workflow");
    zapierWorkflow.setAttribute("client-id", clientId);
    zapierWorkflow.setAttribute("theme", theme);
    zapierWorkflow.setAttribute("intro-copy-display", introCopyDisplay);
    zapierWorkflow.setAttribute("manage-zaps-display", manageZapsDisplay);
    zapierWorkflow.setAttribute("guess-zap-display", guessZapDisplay);
    zapierWorkflow.setAttribute("template-limit", templateLimit.toString());
    zapierWorkflow.setAttribute("zap-create-from-scratch-display", zapCreateFromScratchDisplay);
    if (signUpEmail) zapierWorkflow.setAttribute("sign-up-email", signUpEmail);
    if (signUpFirstName) zapierWorkflow.setAttribute("sign-up-first-name", signUpFirstName);
    if (signUpLastName) zapierWorkflow.setAttribute("sign-up-last-name", signUpLastName);
    containerRef.current.append(zapierWorkflow);
    return () => {
      if (containerRef.current && zapierWorkflow.parentNode) {
        containerRef.current.removeChild(zapierWorkflow);
      }
    };
  }, [isLoaded, clientId, theme, introCopyDisplay, manageZapsDisplay, guessZapDisplay, templateLimit, zapCreateFromScratchDisplay, signUpEmail, signUpFirstName, signUpLastName]);
  return <div ref={containerRef} style={{
    minHeight: "400px"
  }}>
      {!isLoaded && <div>Loading Zapier integration...</div>}
    </div>;
};

With OpenRouter you have access to 400+ AI models through one API, and with Zapier you can connect to 8000+ apps to automate workflows, no coding required!

This page embeds Zapier Elements so your users can create Zaps that use OpenRouter-powered AI.

<Tip>
  Combine OpenRouter's model routing with Zapier's integrations to automate tasks across CRMs, spreadsheets, messaging, and more.
</Tip>

## Set up your Integration

Get started by exploring available automations and creating your first Zap with OpenRouter. The integration supports all OpenRouter models and features, including streaming responses, function calling, and multimodal capabilities.

<ZapierIframe />

## Using OpenRouter in Zapier

Once you've set up the integration, you can use OpenRouter in your Zaps to:

* **Generate content** with models like GPT-4, Claude, or Gemini
* **Analyze data** using specialized models for different domains
* **Process images** with vision-capable models
* **Create structured outputs** with JSON mode and function calling
* **Stream responses** for real-time applications

The OpenRouter Zapier integration automatically handles authentication, model routing, and error handling, so you can focus on building your automation logic.

For more advanced use cases and detailed documentation, visit the [OpenRouter Zapier integration page](https://zapier.com/apps/openrouter/integrations).

<Frame>
  <img src="https://mintcdn.com/openrouter-d02e98a0/PSwwwiCqAD_BNeni/assets/guides/community/zapier/zapier-integration-screenshot.png?fit=max&auto=format&n=PSwwwiCqAD_BNeni&q=85&s=84f9e7ae2c93ca3ec5794ea336aaa970" alt="Zapier Integration Screenshot" width="1918" height="1544" data-path="assets/guides/community/zapier/zapier-integration-screenshot.png" />
</Frame>
