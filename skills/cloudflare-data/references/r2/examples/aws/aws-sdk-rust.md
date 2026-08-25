---
description: Configure the AWS SDK for Rust to work with Cloudflare R2 object storage.
title: aws-sdk-rust
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

# aws-sdk-rust

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-rust/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You must [generate an Access Key](https://developers.cloudflare.com/r2/api/tokens/) before getting started. All examples will utilize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.


This example uses the [aws-sdk-s3 ↗](https://crates.io/crates/aws-sdk-s3) crate from the [AWS SDK for Rust ↗](https://github.com/awslabs/aws-sdk-rust). You must pass in the R2 configuration credentials when instantiating your `S3` client:

## Basic Usage

```rust
use aws_sdk_s3 as s3;
use aws_smithy_types::date_time::Format::DateTime;

#[tokio::main]
async fn main() -> Result<(), s3::Error> {
    let bucket_name = "sdk-example";
    // Provide your Cloudflare account ID
    let account_id = "<ACCOUNT_ID>";
    // Retrieve your S3 API credentials for your R2 bucket via API tokens
    // (see: https://developers.cloudflare.com/r2/api/tokens)
    let access_key_id = "<ACCESS_KEY_ID>";
    let access_key_secret = "<SECRET_ACCESS_KEY>";

    // Configure the client
    let config = aws_config::from_env()
        .endpoint_url(format!("https://{}.r2.cloudflarestorage.com", account_id))
        .credentials_provider(aws_sdk_s3::config::Credentials::new(
            access_key_id,
            access_key_secret,
            None, // session token is not used with R2
            None,
            "R2",
        ))
        .region("auto") // Required by SDK but not used by R2
        .load()
        .await;

    let client = s3::Client::new(&config);

    // List buckets
    let list_buckets_output = client.list_buckets().send().await?;

    println!("Buckets:");
    for bucket in list_buckets_output.buckets() {
        println!("  - {}: {}",
            bucket.name().unwrap_or_default(),
            bucket.creation_date().map_or_else(
                || "Unknown creation date".to_string(),
                |date| date.fmt(DateTime).unwrap()
            )
        );
    }

    // List objects in a specific bucket
    let list_objects_output = client
        .list_objects_v2()
        .bucket(bucket_name)
        .send()
        .await?;

    println!("\nObjects in {}:", bucket_name);
    for object in list_objects_output.contents() {
        println!("  - {}: {} bytes, last modified: {}",
            object.key().unwrap_or_default(),
            object.size().unwrap_or_default(),
            object.last_modified().map_or_else(
                || "Unknown".to_string(),
                |date| date.fmt(DateTime).unwrap()
            )
        );
    }

    Ok(())
}
```

## Upload Objects

To upload an object to R2:

```rust
use aws_sdk_s3::primitives::ByteStream;
use std::path::Path;

async fn upload_object(
    client: &s3::Client,
    bucket: &str,
    key: &str,
    file_path: &str,
) -> Result<(), s3::Error> {
    let body = ByteStream::from_path(Path::new(file_path)).await.unwrap();

    client
        .put_object()
        .bucket(bucket)
        .key(key)
        .body(body)
        .send()
        .await?;

    println!("Uploaded {} to {}/{}", file_path, bucket, key);
    Ok(())
}
```

## Download Objects

To download an object from R2:

```rust
use std::fs;
use std::io::Write;

async fn download_object(
    client: &s3::Client,
    bucket: &str,
    key: &str,
    output_path: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    let resp = client
        .get_object()
        .bucket(bucket)
        .key(key)
        .send()
        .await?;

    let data = resp.body.collect().await?;
    let bytes = data.into_bytes();

    let mut file = fs::File::create(output_path)?;
    file.write_all(&bytes)?;

    println!("Downloaded {}/{} to {}", bucket, key, output_path);
    Ok(())
}
```

## Generate Presigned URLs

You can also generate presigned links that can be used to temporarily share public read or write access to a bucket.

```rust
use aws_sdk_s3::presigning::PresigningConfig;
use std::time::Duration;

async fn generate_get_presigned_url(
    client: &s3::Client,
    bucket: &str,
    key: &str,
    expires_in: Duration,
) -> Result<String, s3::Error> {
    let presigning_config = PresigningConfig::expires_in(expires_in)?;

    // Generate a presigned URL for GET (download)
    let presigned_get_request = client
        .get_object()
        .bucket(bucket)
        .key(key)
        .presigned(presigning_config)
        .await?;

    Ok(presigned_get_request.uri().to_string())
}

async fn generate_upload_presigned_url(
    client: &s3::Client,
    bucket: &str,
    key: &str,
    expires_in: Duration,
) -> Result<String, s3::Error> {
    let presigning_config = PresigningConfig::expires_in(expires_in)?;

    // Generate a presigned URL for PUT (upload)
    let presigned_put_request = client
        .put_object()
        .bucket(bucket)
        .key(key)
        .presigned(presigning_config)
        .await?;

    Ok(presigned_put_request.uri().to_string())
}
```

You can use these presigned URLs with any HTTP client. For example, to upload a file using the PUT URL:

```bash
curl -X PUT "https://<your-presigned-put-url>" -H "Content-Type: application/octet-stream" --data-binary "@local-file.txt"
```

To download a file using the GET URL:

```bash
curl -X GET "https://<your-presigned-get-url>" -o downloaded-file.txt
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/examples/aws/aws-sdk-rust/#page","headline":"aws-sdk-rust · Cloudflare R2 docs","description":"Configure the AWS SDK for Rust to work with Cloudflare R2 object storage.","url":"https://developers.cloudflare.com/r2/examples/aws/aws-sdk-rust/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
