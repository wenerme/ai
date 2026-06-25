---
title: "Supported formats | Grafana Plugins documentation"
description: "Learn about the various media file formats supported by the Business Media panel, including images, PDFs, videos, and audio files."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Supported formats

The Business Media panel supports common file formats.

## Images

The plugin determines the file type automatically based on the first base64 symbol if no definition is provided. Supported formats include:

- JPEG
- GIF
- PNG
- HEIC

Other image formats supported by your browser can be rendered if you provide a definition like `data:image/IMAGE-FORMAT;base64,ENCODED-CONTENT`.

[](/media/docs/grafana/panels-visualizations/business-media/panel.png)

## PDF

The plugin renders PDF files with or without the definition `data:application/pdf;base64,ENCODED-CONTENT`.

[](/media/docs/grafana/panels-visualizations/business-media/pdf.png)

## Video

The plugin renders video files with the following definitions:

- MP4: `data:video/mp4;base64,ENCODED-CONTENT`
- WEBM: `data:video/webm;base64,ENCODED-CONTENT`

[](/media/docs/grafana/panels-visualizations/business-media/video-comments.png)

## Audio

The plugin outputs audio files with the following definitions:

- MP3: `data:audio/mp3;base64,ENCODED-CONTENT`
- OGG: `data:audio/ogg;base64,ENCODED-CONTENT`
