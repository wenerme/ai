## Overview

RAG Engine provides robust options for managing how
your data at rest is encrypted. By default, all user data within `RagManagedDb`
is encrypted using a Google-owned and Google-managed encryption key, which is the default
setting. This default setting helps you to verify that your data is secure
without requiring any specific configuration.

If you require more control over your keys used for encryption,
RAG Engine supports Customer-managed encryption keys
(CMEK). With CMEK, you can use your
cryptographic keys, managed within Cloud Key Management Service (KMS), to protect your RAG
corpus data.

## Set up the encryption key with your RAG corpus

To set up an encryption key, follow the steps at Set up your KMS key and grant
permissions.

## CMEK limitations for RAG Engine on Gemini Enterprise Agent Platform

RAG Engine on Gemini Enterprise Agent Platform supports CMEK with the following limitations:

- Before creating a RAG corpus, you must manually enable the RAG Service
account. For detailed instructions, see Grant Permissions to the
RAG Engine service
agent.
- CMEK is only supported on `RagVectorDbConfig` of type `RagManagedDb`.
- The `encryption_spec` field defines the KMS key, and the field is immutable,
which means that CMEK can't be enabled or disabled after the RAG corpus is
created.
- No more than 50 unique KMS keys can be used to create RAG corpora per
project per region.

## What's next

- For information about managing your encryption, see Manage your
encryption.
- For more information on RAG Engine, see
RAG Engine on Gemini Enterprise Agent Platform
overview.
- To learn more about data at rest, see Data
residency.
- To learn more about RAG API methods and resources, see
Agent Platform
API.
