> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

To identify AI-generated or modified images from Google and third-party models,
you can use the AI Content Detection API. This document explains how the
API works, its limitations, and how to request access.

## How it works

To use the API, send an image payload to the Gemini Enterprise Agent Platform endpoint using a
REST API call. Supported image formats include the following:

- JPEG
- PNG
- WebP

### Processing

The API processes the payload using machine learning models that analyze
pixel-level artifacts, noise patterns, and spectral anomalies. The response
aggregates findings from the models.

> [!NOTE]
> **Note:** Support for C2PA metadata detection is not included.

### Data retention

The API does not store or retain processed images.

## Request access

The AI Content Detection API is in Private Preview. To request access to the
endpoint, complete the [application form](https://docs.google.com/forms/d/e/1FAIpQLScj_8Im1G0A1DsJBfqT7mVN4ZaSKbP58D1PNrx3lnKr4Zt6jg/viewform).

## Disclaimers and limitations

The API provides a probabilistic estimate and doesn't guarantee definitive
identification. Use of the service is subject to the following conditions:

- **Statistical Errors:** The model may produce false positives (authentic images flagged as AI-generated) and false negatives (AI-generated images misclassified as authentic).
- **Advisory Use:** The API output should serve as a supplementary signal. It must not be used as the sole basis for critical decisions, such as content takedowns or user sanctions.
- **Liability:** The service is provided "as is". Google assumes no liability for damages or disputes arising from reliance on API outputs.
