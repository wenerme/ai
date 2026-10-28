# Decrypt PSP records

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

PSP decryption lets you read the content of PSP records stored in your connected cloud storage using an asymmetric key that you control.

Once you have the record and its original key metadata, decryption uses your cloud key-management service and local code. You don't need to call an OpenAI API.

This guide applies to ZDR with PSP. It does not apply to Private Retention
  with PSP, which stores records in OpenAI-managed infrastructure.

Your cloud key-management service decrypts a small recovery capsule. Your application uses the recovered secret to decrypt the record locally. Your private key stays in your cloud key-management service.

The [appendix](#appendix-format-and-decryption-reference) shows the record bundle and a Python example.

## Before you start

- Enable PSP decryption, connect storage, and select a recovery key. See [PSP decryption](https://developers.openai.com/api/docs/guides/private-safety-processing#psp-decryption) and [Set up asymmetric keys](https://developers.openai.com/api/docs/guides/asymmetric-keys).
- Give your application permission to read the stored object and decrypt using the original RSA-3072 recovery key for the record.
- Keep the original registration, public key, and exact cloud key/version while records depend on them.

Only records written with PSP decryption enabled for your key can be decrypted
  with it. Existing records aren't converted.

## Decrypt a record

### 1. Read the record

Read the record from your cloud storage. If it has an EKM storage envelope, decrypt that layer with its original EKM configuration first.

Parse the resulting JSON bundle containing `protected_record` and `customer_access`, as shown in [Bundle format](#bundle-format). If `customer_access` is `null`, PSP decryption is unavailable for that record.

### 2. Select the original key

Use `customer_access.customer_key_id` to find the original cloud key and version in your saved registration metadata. You can also retrieve the registration through the Admin API with `GET /v1/organization/external_keys/{customer_key_id}` using an organization Admin API key. See [Retrieve the key registration](https://developers.openai.com/api/docs/guides/asymmetric-keys#2-revalidate-the-key-optional).

Check the public-key fingerprint and use the exact cloud key/version. Keep the private key in your cloud key-management service. Never share it with OpenAI.

### 3. Decrypt the recovery capsule

Send the decoded `customer_access.recovery_secret` to your cloud key-management service for RSA-OAEP-SHA256 decryption.

### 4. Decrypt and verify the content

Use the [Python example](#python-example) to check the capsule's binding to the record and decrypt the content locally.

Return content only after all checks and AES-GCM authentication succeed.

## Check the result

A successful operation returns authenticated UTF-8 content. Request records contain `request_text` and metadata telling you whether truncation occurred. See [Recovered content](#recovered-content).

## Troubleshooting

| Result                               | What to check                                                                                                                            |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `customer_access` is `null`          | The record wasn't written with PSP decryption enabled for a recovery key. Selecting a key doesn't enable PSP decryption for that record. |
| KMS access denied or key unavailable | Check your decrypt permission and the availability of the original cloud key and version.                                                |
| Fingerprint or binding mismatch      | Check the intended record and original registration. Don't modify authenticated fields or substitute another key.                        |
| AES-GCM authentication fails         | Check the inputs to the [Python example](#python-example). Don't return partial plaintext.                                               |

## Related guides

- [Set up asymmetric keys](https://developers.openai.com/api/docs/guides/asymmetric-keys)
- [ZDR with Private Safety Processing](https://developers.openai.com/api/docs/guides/private-safety-processing)

## Appendix: Format and decryption reference

This appendix covers **bundle version 1, protected-record version `v4`**. Use the Python example below to implement local decryption without OpenAI libraries.

### Bundle format

The object is UTF-8 JSON with this shape. Angle brackets are placeholders.

```json
{
  "bundle_version": 1,
  "protected_record": {
    "version": "v4",
    "algorithm": "HPKE-v1-DHKEM_P256_HKDF_SHA256-EXPORT_ONLY-AES256_GCM",
    "scope": "global",
    "key_thumbprint": "<runtime public-key thumbprint>",
    "expires_at": "2026-11-20",
    "content_id": "<content ID>",
    "encrypted_dek": "<E: base64url P-256 public point>",
    "safety_review_runtime_public_key": "<R: base64url P-256 public point>",
    "nonce": "<base64url 12-byte nonce>",
    "encrypted_cot": ["<opaque encrypted CoT string>"],
    "ciphertext": "<base64url ciphertext followed by GCM tag>"
  },
  "customer_access": {
    "version": 1,
    "algorithm": "RSA-OAEP-256",
    "customer_key_id": "<original registration ID>",
    "customer_public_key_fingerprint": "<RSA public-key fingerprint>",
    "recovery_secret": "<base64url RSA ciphertext>"
  }
}
```

`encrypted_cot` contains encrypted chain-of-thought content. This content cannot be decrypted with your customer recovery key. The array may be empty.

### Python example

Use the example below after decrypting any separate EKM storage envelope and the recovery capsule with the original cloud key. It checks the key fingerprint, capsule binding, recovered scalar, and runtime thumbprint before authenticating and decrypting the payload.

Install `pyhpke`, `cryptography`, and `rfc8785` in your Python environment. Pass these inputs to `recover_record`:

- `bundle_json`: The inner record bundle as UTF-8 JSON bytes.
- `capsule`: The bytes returned by your cloud key-management service.
- `original_key_id`: The original key registration ID from step 2.
- `original_public_key_pem`: That cloud key version's RSA public key in PEM format, as bytes.

The function returns the decrypted content as a UTF-8 string. A failed check stops recovery.

Decrypt a PSP record

```python
import base64
import hashlib
import hmac
import json

import rfc8785
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ec, rsa
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from pyhpke import AEADId, CipherSuite, KDFId, KEMId, KEMKey, KEMKeyPair


def recover_record(bundle_json, capsule, original_key_id, original_public_key_pem):
    """Return plaintext from exact inner bundle bytes and a decrypted capsule.

    Use the documented schema and trusted original key ID/RSA public PEM.
    No cloud calls occur here. The RSA private key stays in the cloud.
    """
    record, access, runtime, nonce, ciphertext = validate_bundle(
        bundle_json, original_key_id, original_public_key_pem
    )
    e = recover_scalar(record, access, capsule)

    ephemeral = ec.derive_private_key(e, ec.SECP256R1())
    pair = KEMKeyPair(
        KEMKey.from_pyca_cryptography_key(ephemeral),
        KEMKey.from_pyca_cryptography_key(ephemeral.public_key()),
    )
    suite = CipherSuite.new(
        KEMId.DHKEM_P256_HKDF_SHA256, KDFId.HKDF_SHA256, AEADId.EXPORT_ONLY
    )
    enc, sender = suite.create_sender_context(
        KEMKey.from_pyca_cryptography_key(runtime),
        info=b"OpenAI-PSP-v4/HPKE-export",
        eks=pair,
    )
    require(enc == decode64(record["encrypted_dek"]), "Wrong recovered scalar")
    aad = rfc8785.dumps({k: v for k, v in record.items() if k != "ciphertext"})
    key = sender.export(b"OpenAI-PSP-v4/payload-key" + hashlib.sha256(aad).digest(), 32)
    return AESGCM(key).decrypt(nonce, ciphertext, aad).decode("utf-8")


def validate_bundle(bundle_json, original_key_id, original_public_key_pem):
    bundle = json.loads(bundle_json.decode("utf-8"), object_pairs_hook=unique_object)
    require(
        type(bundle["bundle_version"]) is int and bundle["bundle_version"] == 1,
        "Unsupported bundle version",
    )
    record, access = bundle["protected_record"], bundle["customer_access"]
    require(access is not None, "Customer recovery is unavailable")
    require(
        record["version"] == "v4"
        and record["algorithm"]
        == "HPKE-v1-DHKEM_P256_HKDF_SHA256-EXPORT_ONLY-AES256_GCM",
        "Unsupported record",
    )
    require(
        type(access["version"]) is int
        and access["version"] == 1
        and access["algorithm"] == "RSA-OAEP-256",
        "Unsupported recovery capsule",
    )
    require(access["customer_key_id"] == original_key_id, "Wrong key registration")
    require(len(decode64(access["recovery_secret"])) == 384, "Wrong RSA length")

    public_key = serialization.load_pem_public_key(original_public_key_pem)
    require(isinstance(public_key, rsa.RSAPublicKey), "Expected an RSA public key")
    require(public_key.key_size == 3072, "Expected RSA-3072")
    spki = public_key.public_bytes(
        serialization.Encoding.DER, serialization.PublicFormat.SubjectPublicKeyInfo
    )
    fingerprint = decode64(access["customer_public_key_fingerprint"])
    require(
        hmac.compare_digest(fingerprint, hashlib.sha256(spki).digest()), "Wrong key"
    )
    runtime = point(record["safety_review_runtime_public_key"])
    coordinates = runtime.public_numbers()
    jwk = {
        "crv": "P-256",
        "kty": "EC",
        "x": b64url(coordinates.x.to_bytes(32, "big")),
        "y": b64url(coordinates.y.to_bytes(32, "big")),
    }
    thumbprint = b64url(hashlib.sha256(rfc8785.dumps(jwk)).digest())
    require(record["key_thumbprint"] == thumbprint, "Wrong runtime key")
    nonce, ciphertext = decode64(record["nonce"]), decode64(record["ciphertext"])
    require(len(nonce) == 12 and len(ciphertext) >= 16, "Invalid AES-GCM encoding")
    return record, access, runtime, nonce, ciphertext


def recover_scalar(record, access, capsule):
    header = {k: v for k, v in access.items() if k != "recovery_secret"}
    binding_input = {
        "purpose": "OpenAI-PSP-v4/customer-recovery-binding",
        "bundle_version": 1,
        "record": record,
        "recovery_header": header,
    }
    binding = hashlib.sha256(rfc8785.dumps(binding_input)).digest()
    require(
        isinstance(capsule, bytes)
        and len(capsule) == 72
        and capsule[:8] == b"PSPv4\x00\x00\x01"
        and hmac.compare_digest(capsule[40:], binding),
        "Invalid recovery capsule binding",
    )
    e = int.from_bytes(capsule[8:40], "big")
    order = 0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551
    require(1 <= e < order, "Invalid P-256 private scalar")
    return e


def require(condition, message):
    if not condition:
        raise ValueError(message)


def unique_object(pairs):
    require(len(pairs) == len(dict(pairs)), "Duplicate JSON field")
    return dict(pairs)


def b64url(data):
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def decode64(value):
    # Restore omitted "=" padding: -len(value) % 4 is how many characters
    # are needed to reach a multiple of four (e.g. length 10 needs "==").
    data = base64.b64decode(
        value + "=" * (-len(value) % 4), altchars=b"-_", validate=True
    )
    require(b64url(data) == value, "Noncanonical base64url")
    return data


def point(value):
    encoded = decode64(value)
    require(len(encoded) == 65 and encoded[0] == 4, "Invalid P-256 encoding")
    return ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), encoded)
```


### Recovered content

For request records whose recovered JSON has `format: "psp_request_v1"`, `request_text` contains the retained request text. The other fields are `reasoning_summaries` (string array), `request_text_truncated` (boolean), and `reasoning_summary_parts_omitted` (nonnegative integer). Check the truncation fields when interpreting the result. Other protected content types may use different plaintext formats.

Customer recovery can continue after the OpenAI runtime key expires, provided your original customer recovery key and snapshot remain available. Leave the authenticated `expires_at` value unchanged. The separately encrypted `encrypted_cot` blobs remain opaque to customer recovery.