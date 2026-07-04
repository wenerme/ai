This document describes how to send audio and video streams to Gemini Live API for
real-time, bidirectional communication with Gemini models. Learn how to
configure and transmit audio and video data to build dynamic and interactive
applications.

## Send audio streams

Implementing real-time audio requires strict adherence to sample rate
specifications and careful buffer management to ensure low latency and natural
interruptibility.

The Live API supports the following audio formats:

- **Input audio**: Raw 16-bit PCM audio at 16 kHz, little-endian
- **Output audio**: Raw 16-bit PCM audio at 24 kHz, little-endian

The following code sample shows you how to send streaming audio data:

    import asyncio
    # Assumes session is an active Live API session
    # and chunk_data contains bytes of raw 16-bit PCM audio at 16 kHz.
    from google.genai import types
    # Send audio input data in chunks
    await session.send_realtime_input(
        audio=types.Blob(data=chunk_data, mime_type="audio/pcm;rate=16000")
    )

The client must maintain a playback buffer. The server streams audio in chunks
within `server_content` messages. The client's responsibility is to decode,
buffer, and play the data.

The following code sample shows you how to process streaming audio data:

    import asyncio
    # Assumes session is an active Live API session
    # and audio_queue is an asyncio.Queue for buffering audio for playback.
    import numpy as np

    async for msg in session.receive():
        server_content = msg.server_content
        if server_content:
            # 1. Handle Interruption
            if server_content.interrupted:
                print("\n[Interrupted] Flushing buffer...")
                # Clear the Python queue
                while not audio_queue.empty():
                    try: audio_queue.get_nowait()
                    except asyncio.QueueEmpty: break
                # Send signal to worker to reset hardware buffers if needed
                await audio_queue.put(None)
                continue

            # 2. Process Audio chunks
            if server_content.model_turn:
                for part in server_content.model_turn.parts:
                    if part.inline_data:
                        # Add PCM data to playback queue
                        await audio_queue.put(np.frombuffer(part.inline_data.data, dtype='int16'))

## Send video streams

Video streaming provides visual context. The Live API expects a sequence of
discrete image frames and supports video frames input at 1 FPS. For best
results, use 768x768 resolution at 1 FPS.

The following code sample shows you how to send streaming video data:

    import asyncio
    # Assumes session is an active Live API session
    # and chunk_data contains bytes of a JPEG image.
    from google.genai import types
    # Send video input data in chunks
    await session.send_realtime_input(
        media=types.Blob(data=chunk_data, mime_type="image/jpeg")
    )

The client implementation captures a frame from the video feed, encodes it as a
JPEG blob, and transmits it using the `realtime_input` message structure.

    import cv2
    import asyncio
    from google.genai import types

    async def send_video_stream(session):
        # Open webcam
        cap = cv2.VideoCapture(0)

        while True:
            ret, frame = cap.read()
            if not ret: break

            # 1. Resize to optimal resolution (768x768 max)
            frame = cv2.resize(frame, (768, 768))

            # 2. Encode as JPEG
            _, buffer = cv2.imencode('.jpg', frame,)

            # 3. Send as realtime input
            await session.send_realtime_input(
                media=types.Blob(data=buffer.tobytes(), mime_type="image/jpeg")
            )

            # 4. Wait 1 second (1 FPS)
            await asyncio.sleep(1.0)

        cap.release()

## Configure media resolution

You can specify the resolution for input media by setting the
`media_resolution` field in the session configuration. Lower resolution
reduces token usage and latency, while higher resolution improves detail
recognition. Supported values include `low`, `medium`, and `high`.

    config = {
        "response_modalities": ["audio"],
        "media_resolution": "low",
    }

## What's next

- [Start and manage live sessions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session)
- [Configure Gemini capabilities](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-gemini-capabilities)
- [Best practices with the Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/best-practices)
