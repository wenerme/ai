---
description: Build a scalable chat panel for your custom RealtimeKit meeting UI with paginated UI Kit chat components.
title: Build a Chat Panel
image: https://developers.cloudflare.com/realtime/realtimekit/ui-kit/chat-panel/og.png?v=ea17480b73fe9a5a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Build a Chat Panel

Last updated Oct 12, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/chat-panel/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Prerequisite

This guide builds on top of the [Build Your Own UI](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/build-your-own-ui/). It is recommended to read that guide first. Portions of the code will not be repeated here for brevity.

The chat components on this page require RealtimeKit Web UI Kit 1.1.0 or later and work best with RealtimeKit Web Core 1.2.4 or later.

The UI Kit includes a full chat panel and lower-level chat components. The chat components load messages in pages, instead of loading the entire chat history when they join. This keeps chat responsive in meetings with many participants or long chat history.

Use the full panel when you want RealtimeKit to manage chat behavior for you.

Use lower-level components when you need to control the layout around message lists, pinned messages, or the composer.

This page is not available for the **Mobile**platform.

WebMobile

ReactWeb ComponentsAngular

## Render the full chat panel

Use `rtk-chat` to render the full chat panel. It includes public chat, private chat, paginated messages, pinned messages, file uploads, image uploads, edit actions, delete actions, and emoji input.

```html
<rtk-ui-provider id="rtk-ui-provider">
	<rtk-chat style="height: 480px;"></rtk-chat>
</rtk-ui-provider>
```

To set chat UI overrides, assign the `overrides` property on `rtk-ui-provider` or `rtk-meeting`.

```js
const provider = document.querySelector("rtk-ui-provider");

provider.overrides = {
	disableEmojiPicker: true,
	disablePrivateChat: true,
};
```

The `disableEmojiPicker` override hides the emoji picker button. The `disablePrivateChat` override hides private chat even when the preset allows it.

To control private chat for all participants, prefer preset permissions.

Use `RtkChat` to render the full chat panel. It includes public chat, private chat, paginated messages, pinned messages, file uploads, image uploads, edit actions, delete actions, and emoji input.

```tsx
import { RtkChat, RtkUiProvider } from "@cloudflare/realtimekit-react-ui";

function ChatPanel({ meeting }) {
	return (
		<RtkUiProvider
			meeting={meeting}
			overrides={{
				disableEmojiPicker: true,
				disablePrivateChat: true,
			}}
		>
			<RtkChat style={{ height: "480px" }} />
		</RtkUiProvider>
	);
}
```

The `disableEmojiPicker` override hides the emoji picker button. The `disablePrivateChat` override hides private chat even when the preset allows it.

To control private chat for all participants, prefer preset permissions.

Use `rtk-chat` to render the full chat panel. It includes public chat, private chat, paginated messages, pinned messages, file uploads, image uploads, edit actions, delete actions, and emoji input.

```html
<rtk-ui-provider [meeting]="meeting" [overrides]="chatOverrides">
	<rtk-chat style="height: 480px;"></rtk-chat>
</rtk-ui-provider>
```

```ts
chatOverrides = {
	disableEmojiPicker: true,
	disablePrivateChat: true,
};
```

The `disableEmojiPicker` override hides the emoji picker button. The `disablePrivateChat` override hides private chat even when the preset allows it.

To control private chat for all participants, prefer preset permissions.

## Build a custom chat layout

You can create your own chat layout from the same UI Kit components that `RtkChat` uses. Place each component wherever your design needs it, such as the message list in a sidebar and the composer in a footer, and connect them through your own state.

| Component | What it renders |
| --- | --- |
| `RtkChatSelector` | A dropdown to switch between public chat and private conversations. Emits `rtkChatSelectorChange` with the selected participant. |
| `RtkPinnedMessageSelector` | A collapsible header that expands to show pinned messages. |
| `RtkChatMessagesUiPaginated` | The message list. Loads public messages when `privateChatRecipient` is empty, and the private conversation when you pass a participant. |
| `RtkChatComposerView` | The message input, with file, image, and emoji buttons. |

When you build your own layout, your code connects the components to `meeting.chat`:

- `RtkChatMessagesUiPaginated` emits `pinMessage`, `editMessage`, and `deleteMessage` events from its message menu but does not act on them. Handle these events and call the matching `meeting.chat` methods.
- `RtkChatComposerView` emits `newMessage` and `editMessage` events. Send or edit the message with `meeting.chat`.
- Pass `meeting.chat.maxTextLimit` and `meeting.chat.rateLimits` to `RtkChatComposerView` so the composer enforces the same limits as the meeting.

The following example stacks the components vertically. Rearrange them to fit your layout.

```tsx
import {
	RtkChatComposerView,
	RtkChatMessagesUiPaginated,
	RtkChatSelector,
	RtkPinnedMessageSelector,
} from "@cloudflare/realtimekit-react-ui";
import { useState } from "react";

function CustomChat({ meeting }) {
	const [privateChatRecipient, setPrivateChatRecipient] = useState(null);
	const [editingMessage, setEditingMessage] = useState(null);
	const { chatPublic, chatPrivate } = meeting.self.permissions;
	const publicChat = {
		canSendText: chatPublic.canSend && chatPublic.text,
		canSendFiles: chatPublic.canSend && chatPublic.files,
	};
	const privateChat = {
		canSendText: Boolean(chatPrivate?.canSend && chatPrivate?.text),
		canSendFiles: Boolean(chatPrivate?.canSend && chatPrivate?.files),
	};
	const activeChat = privateChatRecipient ? privateChat : publicChat;

	return (
		<div style={{ height: "480px" }}>
			<RtkChatSelector
				meeting={meeting}
				onRtkChatSelectorChange={(event) => {
					setPrivateChatRecipient(event.detail.selectedUser ?? null);
				}}
			/>
			<RtkPinnedMessageSelector meeting={meeting} />
			<RtkChatMessagesUiPaginated
				meeting={meeting}
				privateChatRecipient={privateChatRecipient}
				onPinMessage={(event) => {
					const message = event.detail;
					if (message.pinned) {
						meeting.chat.unpin(message.id);
					} else {
						meeting.chat.pin(message.id);
					}
				}}
				onEditMessage={(event) => {
					if (event.detail.type === "text") {
						setEditingMessage(event.detail);
					}
				}}
				onDeleteMessage={(event) => {
					if (editingMessage?.id === event.detail.id) {
						setEditingMessage(null);
					}
					meeting.chat.deleteMessage(event.detail.id);
				}}
			/>
			<RtkChatComposerView
				canSendTextMessage={activeChat.canSendText}
				canSendFiles={activeChat.canSendFiles}
				maxLength={meeting.chat.maxTextLimit}
				rateLimits={meeting.chat.rateLimits}
				inputTextPlaceholder="Enter a message"
				isEditing={!!editingMessage}
				message={editingMessage ? editingMessage.message : ""}
				storageKey={
					editingMessage
						? `custom-chat-edit-${editingMessage.id}`
						: "custom-chat-draft"
				}
				onNewMessage={(event) =>
					meeting.chat.sendMessage(
						event.detail,
						privateChatRecipient ? [privateChatRecipient.id] : [],
					)
				}
				onEditMessage={async (event) => {
					try {
						await meeting.chat.editTextMessage(editingMessage.id, event.detail);
					} finally {
						setEditingMessage(null);
					}
				}}
				onEditCancel={() => setEditingMessage(null)}
			/>
		</div>
	);
}
```

Refer to the [`RtkChat`](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchat/), [`RtkChatSelector`](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatselector/), [`RtkPinnedMessageSelector`](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkpinnedmessageselector/), [`RtkChatMessagesUiPaginated`](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatmessagesuipaginated/), and [`RtkChatComposerView`](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatcomposerview/) API references for component props.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/chat-panel/#page","headline":"Build a Chat Panel","description":"Build a scalable chat panel for your custom RealtimeKit meeting UI with paginated UI Kit chat components.","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/chat-panel/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/chat-panel/og.png?v=ea17480b73fe9a5a","dateModified":"2026-10-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
