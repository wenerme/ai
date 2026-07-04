Content Credentials provide a transparent look into the origin and history of
media files, for example, images, video files, audio files, and documents.

[Coalition for Content Provenance and Authenticity (C2PA)](https://www.c2pa.org/) is an open standards
organization that has developed a technical specification for Content
Credentials, called "C2PA metadata". This technology utilizes
cryptographically signed metadata to provide secure and verifiable records
of a media file's origin and any changes it's undergone. Being cryptographically
signed, this information is tamper-evident, helping you verify the authenticity
of the media asset.

Content Credentials include information about the creation process, the tools
used, and edits that were made to a media file. For example, if you use an AI
tool to generate an image, the Content Credentials will indicate that the image
was AI-generated.

## How to Use Content Credentials

If you generate a media file, such as an image, using a supported Google model,
Content Credentials are automatically added and signed by Google LLC.

On the other hand, if you're viewing a file with Content Credentials in a
C2PA-compatible application, you can view the file's history,
such as the device, app, or service used to create and edit the file.

Note that C2PA doesn't classify media as "real" or "fake". It
focuses on authenticating the source of the information and ensures that the
content hasn't been tampered with. Even an AI-generated image is regarded as
"authentic" if it has valid Content Credentials that describe how it was
created or modified.

Moreover, C2PA doesn't guarantee the
truthfulness of the assertions in the Content Credentials. The consumer of the
media file is responsible for deciding whether the source or owner of file
is trustworthy or not.

## Verify Content Credentials

To verify the Content Credentials for a media file, go to the
[Content Credentials website](https://verify.contentauthenticity.org/).
If the media file was created, edited, and published using only
C2PA-aware tools, the Content Credentials are verifiable.
Any modification to a C2PA-compliant media file using a
non-C2PA tool is considered tampering, resulting in a validation
failure.

## Supported models

Content Credentials are supported by the following models. All images or
videos created or modified using the listed models are automatically digitally
signed by Google LLC. "Google Media Processing Services" is specified as the app
or device used in the Content Credential.

- [`gemini-omni-flash-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-flash-preview)
- [`gemini-3.1-flash-lite-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)
- [`gemini-3-pro-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)
- [`gemini-3.1-flash-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)
- [`gemini-3.1-flash-image-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)
- [`gemini-3-pro-image-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview)
- [`gemini-2.5-flash-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)
- [`veo-2.0-generate-001`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-001)
- [`veo-2.0-generate-exp`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-exp)
- [`veo-2.0-generate-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-preview)
- [`veo-3.0-generate-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-preview)
- [`veo-3.0-fast-generate-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-preview)
- [`veo-3.0-generate-001`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-001)
- [`veo-3.0-fast-generate-001`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-001)
- [`veo-3.1-generate-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-preview)
- [`veo-3.1-fast-generate-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-preview)
- [`veo-3.1-generate-001`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-001)
- [`veo-3.1-fast-generate-001`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001)
- [`veo-3.1-lite-generate-001`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview)
- [`lyria-3-clip-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/lyria/lyria-3#lyria-3-clip-preview)
- [`lyria-3-pro-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/lyria/lyria-3#lyria-3-pro-preview)

## What's next

Guide

### [Generate and edit images with Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-generation)

Use Gemini's image generation models (Nano Banana and Nano Banana Pro) to create and edit images.
