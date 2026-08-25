---
description: Configure the AWS SDK for .NET to work with Cloudflare R2 object storage.
title: aws-sdk-net
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

# aws-sdk-net

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-net/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You must [generate an Access Key](https://developers.cloudflare.com/r2/api/tokens/) before getting started. All examples will utilize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.


This example uses version 3 of the [aws-sdk-net ↗](https://www.nuget.org/packages/AWSSDK.S3) package. You must pass in the R2 configuration credentials when instantiating your `S3` service client:

## Client setup

In this example, you will pass credentials explicitly to the `IAmazonS3` initialization. If you wish, use a shared AWS credentials file or the SDK store in-line with other AWS SDKs. Refer to [Configure AWS credentials ↗](https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/net-dg-config-creds.html) for more details.

```csharp
private static IAmazonS3 s3Client;

public static void Main(string[] args)
{
	// Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
	var accessKey = "<ACCESS_KEY_ID>";
	var secretKey = "<SECRET_ACCESS_KEY>";
	var credentials = new BasicAWSCredentials(accessKey, secretKey);
	s3Client = new AmazonS3Client(credentials, new AmazonS3Config
		{
			// Provide your Cloudflare account ID
			ServiceURL = "https://<ACCOUNT_ID>.r2.cloudflarestorage.com",
		});
}
```

## List buckets and objects

The [ListBucketsAsync ↗](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/S3/MIS3ListBucketsAsyncListBucketsRequestCancellationToken.html) and [ListObjectsAsync ↗](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/S3/MIS3ListObjectsV2AsyncListObjectsV2RequestCancellationToken.html) methods can be used to list buckets under your account and the contents of those buckets respectively.

```csharp
static async Task ListBuckets()
{
	var response = await s3Client.ListBucketsAsync();

	foreach (var s3Bucket in response.Buckets)
	{
		Console.WriteLine("{0}", s3Bucket.BucketName);
	}
}
```

```sh
sdk-example
my-bucket
```

```csharp
static async Task ListObjectsV2()
{
	var request = new ListObjectsV2Request
	{
		BucketName = "my-bucket"
	};

	var response = await s3Client.ListObjectsV2Async(request);

	foreach (var s3Object in response.S3Objects)
	{
		Console.WriteLine("{0}", s3Object.Key);
	}
}
```

```sh
dog.png
cat.png
```

## Upload and retrieve objects

The [PutObjectAsync ↗](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/S3/MIS3PutObjectAsyncPutObjectRequestCancellationToken.html) and [GetObjectAsync ↗](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/S3/MIS3GetObjectAsyncStringStringCancellationToken.html) methods can be used to upload objects and download objects from an R2 bucket respectively.

Caution

`DisablePayloadSigning = true` and `DisableDefaultChecksumValidation = true` must be passed as Cloudflare R2 does not currently support the Streaming SigV4 implementation used by AWSSDK.S3.

```csharp
static async Task PutObject()
{
	var request = new PutObjectRequest
	{
		FilePath = @"/path/file.txt",
		BucketName = "my-bucket",
		DisablePayloadSigning = true,
		DisableDefaultChecksumValidation = true
	};

	var response = await s3Client.PutObjectAsync(request);

	Console.WriteLine("ETag: {0}", response.ETag);
}
```

```sh
ETag: "186a71ee365d9686c3b98b6976e1f196"
```

```csharp
static async Task GetObject()
{
	var bucket = "my-bucket";
	var key = "file.txt";

	var response = await s3Client.GetObjectAsync(bucket, key);

	Console.WriteLine("ETag: {0}", response.ETag);
}
```

```sh
ETag: "186a71ee365d9686c3b98b6976e1f196"
```

## Generate presigned URLs

The [GetPreSignedURL ↗](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/S3/MIS3GetPreSignedURLGetPreSignedUrlRequest.html) method allows you to sign ahead of time, giving temporary access to a specific operation. In this case, presigning a `PutObject` request for `sdk-example/file.txt`.

```csharp
static string? GeneratePresignedUrl()
{
	AWSConfigsS3.UseSignatureVersion4 = true;
	var presign = new GetPreSignedUrlRequest
	{
		BucketName = "my-bucket",
		Key = "file.txt",
		Verb = HttpVerb.GET,
		Expires = DateTime.Now.AddDays(7),
	};

	var presignedUrl = s3Client.GetPreSignedURL(presign);

	Console.WriteLine(presignedUrl);

	return presignedUrl;
}
```

```sh
https://<ACCOUNT_ID>.r2.cloudflarestorage.com/my-bucket/file.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<credential>&X-Amz-Date=<timestamp>&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=<signature>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/examples/aws/aws-sdk-net/#page","headline":"aws-sdk-net · Cloudflare R2 docs","description":"Configure the AWS SDK for .NET to work with Cloudflare R2 object storage.","url":"https://developers.cloudflare.com/r2/examples/aws/aws-sdk-net/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
