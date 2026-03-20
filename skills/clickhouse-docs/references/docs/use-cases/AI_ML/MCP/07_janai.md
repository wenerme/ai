---
title: 'Set Up ClickHouse MCP Server with Jan.ai'
description: 'This guide explains how to set up Jan.ai with a ClickHouse MCP server.'
keywords: ['AI', 'Jan.ai', 'MCP']
show_related_blogs: true
doc_type: 'guide'
---

# Using ClickHouse MCP server with Jan.ai

> This guide explains how to use the ClickHouse MCP Server with [Jan.ai](https://jan.ai/docs).

<VerticalStepper headerLevel="h2">

## Install Jan.ai {#install-janai}

Jan.ai is an open source ChatGPT-alternative that runs 100% offline.
You can download Jan.ai for [Mac](https://jan.ai/docs/desktop/mac), [Windows](https://jan.ai/docs/desktop/windows), or [Linux](https://jan.ai/docs/desktop/linux).

It's a native app, so once it's downloaded, you can launch it.

## Add LLM to Jan.ai {#add-llm-to-janai}

We can enabled models via the settings menu. 

To enable OpenAI, we need to provide an API key, as shown below:

<Image img={OpenAIModels} alt="Enable OpenAI models" size="md"/>

## Enable MCP Servers {#enable-mcp-servers}

At the time of writing, MCP Servers are an experimental feature in Jan.ai.
We can enable them by toggling experimental features:

<Image img={MCPServers} alt="Enable MCP servers" size="md"/>

Once that toggle is pressed, we'll see `MCP Servers` on the left menu.

## Configure ClickHouse MCP Server {#configure-clickhouse-mcp-server}

If we click on the `MCP Servers` menu, we'll see a list of MCP servers that we can connect to:

<Image img={MCPServersList} alt="MCP servers list" size="md"/>

There servers are all disabled by default, but we can able them by clicking the toggle.

To install the ClickHouse MCP Server, we need to click on the `+` icon and then populate the form with the following:

<Image img={MCPForm} alt="Add MCP server" size="md"/>

Once we've done that, we'll need to toggle the ClickHouse Server if it's not already toggled:

<Image img={MCPEnabled} alt="Enable MCP server" size="md"/>

The ClickHouse MCP Server's tools will now be visible on the chat dialog:

<Image img={MCPTool} alt="ClickHouse MCP Server tools" size="md"/>

## Chat to ClickHouse MCP Server with Jan.ai {#chat-to-clickhouse-mcp-server}

It's time to have a conversation about some data stored in ClickHouse!
Let's ask a question:

<Image img={Question} alt="Question" size="md"/>

Jan.ai will ask confirmation before calling a tool:

<Image img={MCPToolConfirm} alt="Tool confirmation" size="md"/>

It will then show us the list of tool calls that were made:

<Image img={ToolsCalled} alt="Tools called" size="md"/>

If we click on the tool call, we can see the details of the call:

<Image img={ToolsCalledExpanded} alt="Tools called expanded" size="md"/>    

And then underneath, we have our result:

<Image img={Result} alt="Result" size="md"/>    

</VerticalStepper>
