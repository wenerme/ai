---
description: Configure the AWS SDK for Ruby to work with Cloudflare R2 object storage.
title: aws-sdk-ruby
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

#  aws-sdk-ruby

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-ruby/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

You must [generate an Access Key](https://developers.cloudflare.com/r2/api/tokens/) before getting started. All examples will utilize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.


Many Ruby projects also store these credentials in environment variables instead.

Add the following dependency to your `Gemfile`:

```ruby
gem "aws-sdk-s3"
```

Then you can use Ruby to operate on R2 buckets:

```ruby
require "aws-sdk-s3"

@r2 = Aws::S3::Client.new(
  # Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
  access_key_id: "#{ACCESS_KEY_ID}",
  secret_access_key: "#{SECRET_ACCESS_KEY}",
  # Provide your Cloudflare account ID
  endpoint: "https://#{ACCOUNT_ID}.r2.cloudflarestorage.com",
  region: "auto", # Required by SDK but not used by R2
)

# List all buckets on your account
puts @r2.list_buckets

#=> {
#=>   :buckets => [{
#=>     :name => "your-bucket",
#=>     :creation_date => "…",
#=>   }],
#=>   :owner => {
#=>     :display_name => "…",
#=>     :id => "…"
#=>   }
#=> }

# List the first 20 items in a bucket
puts @r2.list_objects(bucket:"your-bucket", max_keys:20)

#=> {
#=>   :is_truncated => false,
#=>   :marker => nil,
#=>   :next_marker => nil,
#=>   :name => "your-bucket",
#=>   :prefix => nil,
#=>   :delimiter =>nil,
#=>   :max_keys => 20,
#=>   :common_prefixes => [],
#=>   :encoding_type => nil
#=>   :contents => [
#=>     …,
#=>     …,
#=>     …,
#=>   ]
#=> }
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/examples/aws/aws-sdk-ruby/#page","headline":"aws-sdk-ruby · Cloudflare R2 docs","description":"Configure the AWS SDK for Ruby to work with Cloudflare R2 object storage.","url":"https://developers.cloudflare.com/r2/examples/aws/aws-sdk-ruby/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
