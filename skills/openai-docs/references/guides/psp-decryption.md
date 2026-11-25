# Decrypt PSP records

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

PSP decryption lets you read the content of PSP records stored in your connected cloud storage using an asymmetric key that you control.

Once you have the record and its original key metadata, decryption uses your cloud key-management service and local code. You don't need to call an OpenAI API.

This guide applies to ZDR with PSP. It does not apply to Private Retention
  with PSP, which stores records in OpenAI-managed infrastructure.

Your cloud key-management service decrypts a small recovery capsule. Your application uses the recovered secret to decrypt the record locally. Your private key stays in your cloud key-management service.

The [appendix](#appendix-format-and-decryption-reference) shows the record bundle and local decryption examples.

## Before you start

- Enable PSP decryption, connect storage, and select a recovery key. See [PSP decryption](https://developers.openai.com/api/docs/guides/private-safety-processing#psp-decryption) and [Set up asymmetric keys](https://developers.openai.com/api/docs/guides/asymmetric-keys).
- Give your application permission to read the stored object and decrypt using the original RSA-3072 recovery key for the record.
- Keep the original registration, public key, and exact cloud key/version while records depend on them.

Only records written with PSP decryption enabled for your key can be decrypted
  with it. Existing records aren't converted.

## Decrypt a record

### 1. Read the record

Read the record from your cloud storage. If it has an EKM storage envelope, decrypt that layer with its original EKM configuration first.

For OCI EKM, your recovery application also needs `KEY_DECRYPT` on the original AES key. Preserve the envelope's key version and scope-associated data when decrypting that layer.

Parse the resulting JSON bundle containing `protected_record` and `customer_access`, as shown in [Bundle format](#bundle-format). If `customer_access` is `null`, PSP decryption is unavailable for that record.

### 2. Select the original key

Use `customer_access.customer_key_id` to find the original cloud key and version in your saved registration metadata. You can also retrieve the registration through the Admin API with `GET /v1/organization/external_keys/{customer_key_id}` using an organization Admin API key. See [Retrieve the key registration](https://developers.openai.com/api/docs/guides/asymmetric-keys#2-revalidate-the-key-optional).

Check the public-key fingerprint and use the exact cloud key/version. Keep the private key in your cloud key-management service. Never share it with OpenAI.

### 3. Decrypt the recovery capsule

Send the decoded `customer_access.recovery_secret` to your cloud key-management service for RSA-OAEP-SHA256 decryption.

For OCI Vault, use the vault's cryptographic endpoint and the [Decrypt operation](https://docs.oracle.com/en-us/iaas/api/#/en/key/release/DecryptedData/Decrypt) with these fields:

| Field                 | Value                                                |
| --------------------- | ---------------------------------------------------- |
| `keyId`               | The original registration's `key_ocid`               |
| `keyVersionId`        | The original registration's exact `key_version_ocid` |
| `encryptionAlgorithm` | `RSA_OAEP_SHA_256`                                   |
| `ciphertext`          | The recovery-secret bytes encoded as standard Base64 |

The bundle uses base64url encoding. Decode `recovery_secret` before encoding those bytes as standard Base64 for OCI. Decode the response's Base64 `plaintext` to get the recovery capsule for step 4. It isn't the recovered record yet.

Your recovery application's OCI identity needs `KEY_DECRYPT` on the original RSA key. This is separate from OpenAI's public-key read access. Keep the original version available after rotation, and omit `associatedData` for this RSA operation.

### 4. Decrypt and verify the content

Use the [decryption examples](#decryption-examples) to check the capsule's binding to the record and decrypt the content locally.

Return content only after all checks and AES-GCM authentication succeed.

## Check the result

A successful operation returns authenticated UTF-8 content. Request records contain `request_text` and metadata telling you whether truncation occurred. See [Recovered content](#recovered-content).

## Troubleshooting

| Result                               | What to check                                                                                                                            |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `customer_access` is `null`          | The record wasn't written with PSP decryption enabled for a recovery key. Selecting a key doesn't enable PSP decryption for that record. |
| KMS access denied or key unavailable | Check your decrypt permission and the availability of the original cloud key and version.                                                |
| Fingerprint or binding mismatch      | Check the intended record and original registration. Don't modify authenticated fields or substitute another key.                        |
| AES-GCM authentication fails         | Check the inputs to the [decryption examples](#decryption-examples). Don't return partial plaintext.                                     |

## Related guides

- [Set up asymmetric keys](https://developers.openai.com/api/docs/guides/asymmetric-keys)
- [ZDR with Private Safety Processing](https://developers.openai.com/api/docs/guides/private-safety-processing)

## Appendix: Format and decryption reference

This appendix covers **bundle version 1, protected-record version `v4`**. Use the examples below to implement local decryption without OpenAI libraries.

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




### Decryption examples

Use the example below after decrypting any separate EKM storage envelope and the recovery capsule with the original cloud key. It checks the key fingerprint, capsule binding, recovered scalar, and runtime thumbprint before authenticating and decrypting the payload.




For Python, install `pyhpke`, `cryptography`, and `rfc8785`.







For Ruby, install `hpke` and `json-canonicalization` with the OpenSSL Ruby bindings.







For Go, install `github.com/cyberphone/json-canonicalization/go/src/webpki.org/jsoncanonicalizer`. The complete program uses Go's cryptography packages for P-256, HKDF, and AES-GCM. Its `recoverRecord` function accepts the same four inputs below. The command reads a JSON object from stdin with `bundle`, `capsule`, `key_id`, and `public_key` fields; encode the capsule with standard Base64.







Download and extract the [TypeScript samples and locked dependencies](https://developers.openai.com/api/docs/samples/typescript.tar.gz). From the extracted `typescript-examples` directory, run `pnpm install --ignore-workspace --frozen-lockfile` to install `canonicalize` and the other dependencies. The [complete recovery source](https://developers.openai.com/api/docs/samples/typescript/psp/recover-record.ts) includes the validation and key-derivation helpers used below. Pass the bundle JSON and public-key PEM as strings, the decrypted capsule as a `Buffer`, and the original key ID as a string. The private RSA key remains in your cloud key-management service. To run the complete file, use `node --experimental-strip-types psp/recover-record.ts bundle.json capsule.bin original-key-id public.pem`. Supply the decrypted capsule as a binary file. The command writes only the recovered text to standard output. It exits with code 1 for validation errors and code 2 for payload authentication errors.







The Java version uses `org.bouncycastle:bcprov-jdk18on:1.83`, `io.github.erdtman:java-json-canonicalization:1.1`, and `com.fasterxml.jackson.core:jackson-databind:2.18.11`.




Pass these inputs to the recovery function:

- `bundle_json`: The inner record bundle as UTF-8 JSON bytes.
- `capsule`: The bytes returned by your cloud key-management service.
- `original_key_id`: The original key registration ID from step 2.
- `original_public_key_pem`: That cloud key version's RSA public key in PEM format, as bytes in Python or a string in Java.

The function returns the decrypted content as a UTF-8 string. A failed check stops recovery.

Decrypt a PSP record

```typescript
// Supply the decrypted capsule and trusted original registration. Keep the RSA
// private key in the cloud. This function returns the exact recovered UTF-8 text.
function recoverRecord(
  bundleJSON: string,
  capsule: Buffer,
  originalKeyID: string,
  publicPEM: string
): string {
  const bundle = parseBundle(bundleJSON);
  const record = object(bundle.protected_record);
  const access = object(bundle.customer_access);
  if (
    bundle.bundle_version !== 1 ||
    record.version !== "v4" ||
    record.algorithm !==
      "HPKE-v1-DHKEM_P256_HKDF_SHA256-EXPORT_ONLY-AES256_GCM" ||
    access.version !== 1 ||
    access.algorithm !== "RSA-OAEP-256" ||
    access.customer_key_id !== originalKeyID
  )
    throw new Error("Wrong schema or original key");
  if (
    !/^\s*-----BEGIN (PUBLIC KEY|RSA PUBLIC KEY)-----[A-Za-z0-9+/=\r\n]+-----END \1-----\s*$/.test(
      publicPEM
    )
  )
    throw new Error("Expected one RSA public key");
  const publicKey = createPublicKey(publicPEM);
  if (
    publicKey.asymmetricKeyType !== "rsa" ||
    publicKey.asymmetricKeyDetails?.modulusLength !== 3072
  )
    throw new Error("Expected RSA-3072");
  if (decode64(access.recovery_secret).length !== 384)
    throw new Error("Wrong RSA ciphertext length");
  const der = publicKey.export({ type: "spki", format: "der" });
  if (!equal(decode64(access.customer_public_key_fingerprint), sha256(der)))
    throw new Error("Wrong key fingerprint");
  const runtime = decode64(record.safety_review_runtime_public_key);
  if (runtime.length !== 65 || runtime[0] !== 4)
    throw new Error("Invalid P-256 encoding");
  const thumbprint = sha256(
    canonical({
      crv: "P-256",
      kty: "EC",
      x: runtime.subarray(1, 33).toString("base64url"),
      y: runtime.subarray(33).toString("base64url"),
    })
  ).toString("base64url");
  if (record.key_thumbprint !== thumbprint)
    throw new Error("Wrong runtime key");
  const nonce = decode64(record.nonce);
  const ciphertext = decode64(record.ciphertext);
  if (nonce.length !== 12 || ciphertext.length < 16)
    throw new Error("Invalid AES-GCM parameters");
  const binding = sha256(
    canonical({
      purpose: "OpenAI-PSP-v4/customer-recovery-binding",
      bundle_version: 1,
      record,
      recovery_header: without(access, "recovery_secret"),
    })
  );
  if (
    capsule.length !== 72 ||
    !equal(
      capsule.subarray(0, 8),
      Buffer.from([0x50, 0x53, 0x50, 0x76, 0x34, 0, 0, 1])
    ) ||
    !equal(capsule.subarray(40), binding)
  )
    throw new Error("Invalid recovery capsule binding");
  const ephemeral = createECDH("prime256v1");
  ephemeral.setPrivateKey(capsule.subarray(8, 40));
  if (!equal(decode64(record.encrypted_dek), ephemeral.getPublicKey()))
    throw new Error("Wrong recovered scalar");
  const aad = canonical(without(record, "ciphertext"));
  const key = payloadKey(ephemeral, runtime, aad);
  const decipher = createDecipheriv("aes-256-gcm", key, nonce);
  decipher.setAAD(aad);
  decipher.setAuthTag(ciphertext.subarray(-16));
  let plaintext: Buffer;
  try {
    plaintext = Buffer.concat([
      decipher.update(ciphertext.subarray(0, -16)),
      decipher.final(),
    ]);
  } catch {
    throw new AuthenticationError("Payload authentication failed");
  }
  return new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(
    plaintext
  );
}
```

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

```go
// Recover exact bundle bytes with an already decrypted capsule and the trusted
// original key registration. The RSA private key remains in the cloud.
func recoverRecord(bundleJSON, capsule []byte, originalKeyID string, publicPEM []byte) (string, error) {
	// Canonicalization rejects duplicate fields and malformed Unicode before decoding.
	if _, err := jsoncanonicalizer.Transform(bundleJSON); err != nil {
		return "", err
	}
	decoder := json.NewDecoder(bytes.NewReader(bundleJSON))
	decoder.UseNumber()
	var bundle map[string]any
	if err := decoder.Decode(&bundle); err != nil {
		return "", err
	}
	if bundle["bundle_version"] != json.Number("1") {
		return "", fmt.Errorf("unsupported bundle version")
	}
	record, ok := bundle["protected_record"].(map[string]any)
	if !ok {
		return "", fmt.Errorf("invalid protected record")
	}
	access, ok := bundle["customer_access"].(map[string]any)
	if !ok {
		return "", fmt.Errorf("customer recovery is unavailable")
	}
	if record["version"] != "v4" || record["algorithm"] != "HPKE-v1-DHKEM_P256_HKDF_SHA256-EXPORT_ONLY-AES256_GCM" || access["version"] != json.Number("1") || access["algorithm"] != "RSA-OAEP-256" || access["customer_key_id"] != originalKeyID {
		return "", fmt.Errorf("wrong schema or original key")
	}
	block, rest := pem.Decode(publicPEM)
	if block == nil || len(bytes.TrimSpace(rest)) != 0 {
		return "", fmt.Errorf("expected an RSA public key")
	}
	var parsed any
	var err error
	switch block.Type {
	case "PUBLIC KEY":
		parsed, err = x509.ParsePKIXPublicKey(block.Bytes)
	case "RSA PUBLIC KEY":
		parsed, err = x509.ParsePKCS1PublicKey(block.Bytes)
	default:
		return "", fmt.Errorf("expected an RSA public key")
	}
	if err != nil {
		return "", err
	}
	public, ok := parsed.(*rsa.PublicKey)
	if !ok || public.N.BitLen() != 3072 {
		return "", fmt.Errorf("expected RSA-3072")
	}
	wrapped, err := decode64(access["recovery_secret"])
	if err != nil || len(wrapped) != 384 {
		return "", fmt.Errorf("wrong RSA ciphertext length")
	}
	der, err := x509.MarshalPKIXPublicKey(public)
	if err != nil {
		return "", err
	}
	expectedFingerprint := sha256.Sum256(der)
	fingerprint, err := decode64(access["customer_public_key_fingerprint"])
	if err != nil || subtle.ConstantTimeCompare(fingerprint, expectedFingerprint[:]) != 1 {
		return "", fmt.Errorf("wrong key fingerprint")
	}
	encoded, err := decode64(record["safety_review_runtime_public_key"])
	if err != nil || len(encoded) != 65 || encoded[0] != 4 {
		return "", fmt.Errorf("invalid P-256 encoding")
	}
	runtime, err := ecdh.P256().NewPublicKey(encoded)
	if err != nil {
		return "", err
	}
	encode := base64.RawURLEncoding.EncodeToString
	jwk, err := canonical(map[string]any{"crv": "P-256", "kty": "EC", "x": encode(encoded[1:33]), "y": encode(encoded[33:])})
	if err != nil {
		return "", err
	}
	thumbprint := sha256.Sum256(jwk)
	if record["key_thumbprint"] != encode(thumbprint[:]) {
		return "", fmt.Errorf("wrong runtime key")
	}
	nonce, err := decode64(record["nonce"])
	if err != nil || len(nonce) != 12 {
		return "", fmt.Errorf("invalid AES-GCM nonce")
	}
	ciphertext, err := decode64(record["ciphertext"])
	if err != nil || len(ciphertext) < 16 {
		return "", fmt.Errorf("invalid AES-GCM ciphertext")
	}
	bindingJSON, err := canonical(map[string]any{"purpose": "OpenAI-PSP-v4/customer-recovery-binding", "bundle_version": 1, "record": record, "recovery_header": without(access, "recovery_secret")})
	if err != nil {
		return "", err
	}
	binding := sha256.Sum256(bindingJSON)
	if len(capsule) != 72 || string(capsule[:8]) != "PSPv4\x00\x00\x01" || subtle.ConstantTimeCompare(capsule[40:], binding[:]) != 1 {
		return "", fmt.Errorf("invalid recovery capsule binding")
	}
	ephemeral, err := ecdh.P256().NewPrivateKey(capsule[8:40])
	if err != nil {
		return "", err
	}
	enc, err := decode64(record["encrypted_dek"])
	if err != nil || subtle.ConstantTimeCompare(enc, ephemeral.PublicKey().Bytes()) != 1 {
		return "", fmt.Errorf("wrong recovered scalar")
	}
	aad, err := canonical(without(record, "ciphertext"))
	if err != nil {
		return "", err
	}
	key, err := payloadKey(ephemeral, runtime, aad)
	if err != nil {
		return "", err
	}
	cipherBlock, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}
	aead, err := cipher.NewGCM(cipherBlock)
	if err != nil {
		return "", err
	}
	plaintext, err := aead.Open(nil, nonce, ciphertext, aad)
	if err != nil {
		return "", errAuthentication
	}
	if !utf8.Valid(plaintext) {
		return "", fmt.Errorf("plaintext is not UTF-8")
	}
	return string(plaintext), nil
}
```

```java
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.math.BigInteger;
import java.nio.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.security.*;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import org.bouncycastle.asn1.sec.SECNamedCurves;
import org.bouncycastle.crypto.hpke.HPKE;
import org.erdtman.jcs.JsonCanonicalizer;



static final ObjectMapper JSON =
    new ObjectMapper(new JsonFactory().enable(JsonParser.Feature.STRICT_DUPLICATE_DETECTION));

static String recoverRecord(byte[] bundleBytes, byte[] capsule, String keyId, String publicPem)
    throws Exception {
  try {
    var bundle = JSON.readTree(bundleBytes);
    require(
        bundle.path("bundle_version").isIntegralNumber()
            && bundle.path("bundle_version").bigIntegerValue().equals(BigInteger.ONE),
        "Unsupported bundle version");
    var record = (ObjectNode) bundle.required("protected_record");
    var access = (ObjectNode) bundle.required("customer_access");
    require(
        "v4".equals(record.path("version").asText())
            && "HPKE-v1-DHKEM_P256_HKDF_SHA256-EXPORT_ONLY-AES256_GCM"
                .equals(record.path("algorithm").asText()),
        "Unsupported record");
    require(
        access.path("version").isIntegralNumber()
            && access.path("version").bigIntegerValue().equals(BigInteger.ONE)
            && "RSA-OAEP-256".equals(access.path("algorithm").asText()),
        "Unsupported recovery capsule");
    require(keyId.equals(access.path("customer_key_id").asText()), "Wrong key registration");
    require(
        decode(access.required("recovery_secret").asText()).length == 384, "Wrong RSA length");
    byte[] der =
        Base64.getMimeDecoder()
            .decode(
                publicPem
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", ""));
    var publicKey = KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(der));
    require(
        publicKey instanceof RSAPublicKey rsa && rsa.getModulus().bitLength() == 3072,
        "Expected RSA-3072");
    require(
        MessageDigest.isEqual(
            decode(access.required("customer_public_key_fingerprint").asText()),
            sha(publicKey.getEncoded())),
        "Wrong key");
    byte[] runtime = decode(record.required("safety_review_runtime_public_key").asText());
    require(runtime.length == 65 && runtime[0] == 4, "Invalid P-256 encoding");
    var curve = SECNamedCurves.getByName("secp256r1");
    var point = curve.getCurve().decodePoint(runtime);
    require(point.isValid() && !point.isInfinity(), "Invalid P-256 point");
    var jwk =
        Map.of(
            "crv",
            "P-256",
            "kty",
            "EC",
            "x",
            encode(Arrays.copyOfRange(runtime, 1, 33)),
            "y",
            encode(Arrays.copyOfRange(runtime, 33, 65)));
    require(
        record.required("key_thumbprint").asText().equals(encode(sha(canonical(jwk)))),
        "Wrong runtime key");
    byte[] nonce = decode(record.required("nonce").asText()),
        ciphertext = decode(record.required("ciphertext").asText());
    require(nonce.length == 12 && ciphertext.length >= 16, "Invalid AES-GCM encoding");
    var header = access.deepCopy();
    header.remove("recovery_secret");
    byte[] binding =
        sha(
            canonical(
                Map.of(
                    "purpose",
                    "OpenAI-PSP-v4/customer-recovery-binding",
                    "bundle_version",
                    1,
                    "record",
                    record,
                    "recovery_header",
                    header)));
    require(
        capsule.length == 72
            && Arrays.equals(
                Arrays.copyOfRange(capsule, 0, 8), new byte[] {80, 83, 80, 118, 52, 0, 0, 1})
            && MessageDigest.isEqual(Arrays.copyOfRange(capsule, 40, 72), binding),
        "Invalid recovery capsule binding");
    byte[] scalar = Arrays.copyOfRange(capsule, 8, 40);
    var e = new BigInteger(1, scalar);
    require(e.signum() > 0 && e.compareTo(curve.getN()) < 0, "Invalid P-256 private scalar");
    var suite =
        new HPKE(
            HPKE.mode_base, HPKE.kem_P256_SHA256, HPKE.kdf_HKDF_SHA256, HPKE.aead_EXPORT_ONLY);
    byte[] ephemeralPublic = curve.getG().multiply(e).getEncoded(false);
    var pair = suite.deserializePrivateKey(scalar, ephemeralPublic);
    var sender =
        suite.setupBaseS(
            suite.deserializePublicKey(runtime),
            "OpenAI-PSP-v4/HPKE-export".getBytes(StandardCharsets.UTF_8),
            pair);
    require(
        MessageDigest.isEqual(
            sender.getEncapsulation(), decode(record.required("encrypted_dek").asText())),
        "Wrong recovered scalar");
    var aadRecord = record.deepCopy();
    aadRecord.remove("ciphertext");
    byte[] aad = canonical(aadRecord);
    byte[] prefix = "OpenAI-PSP-v4/payload-key".getBytes(StandardCharsets.UTF_8);
    byte[] context = ByteBuffer.allocate(prefix.length + 32).put(prefix).put(sha(aad)).array();
    byte[] key = sender.export(context, 32);
    try {
      var cipher = Cipher.getInstance("AES/GCM/NoPadding");
      cipher.init(
          Cipher.DECRYPT_MODE, new SecretKeySpec(key, "AES"), new GCMParameterSpec(128, nonce));
      cipher.updateAAD(aad);
      return StandardCharsets.UTF_8
          .newDecoder()
          .onMalformedInput(CodingErrorAction.REPORT)
          .decode(ByteBuffer.wrap(cipher.doFinal(ciphertext)))
          .toString();
    } finally {
      Arrays.fill(key, (byte) 0);
      Arrays.fill(scalar, (byte) 0);
    }
  } catch (AEADBadTagException error) {
    throw error;
  } catch (Exception error) {
    throw new IllegalArgumentException("Invalid recovery bundle or capsule", error);
  }
}

static byte[] canonical(Object value) throws Exception {
  return new JsonCanonicalizer(JSON.writeValueAsString(value)).getEncodedUTF8();
}

static byte[] sha(byte[] value) throws Exception {
  return MessageDigest.getInstance("SHA-256").digest(value);
}

static String encode(byte[] value) {
  return Base64.getUrlEncoder().withoutPadding().encodeToString(value);
}

static byte[] decode(String value) {
  byte[] decoded = Base64.getUrlDecoder().decode(value);
  require(encode(decoded).equals(value), "Noncanonical base64url");
  return decoded;
}

static void require(boolean condition, String message) {
  if (!condition) throw new IllegalArgumentException(message);
}
```

```csharp
using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace OpenAI.Docs.Examples.Psp;

internal static class RecoverRecordExample
{

private static readonly UTF8Encoding Utf8 = new(false, true);

    // Supply the already decrypted capsule and trusted original registration.
    // Keep the RSA private key in the cloud. Return the exact recovered UTF-8 text.
    internal static string RecoverRecord(byte[] bundleJson, byte[] capsule, string originalKeyId, string publicPem)
    {
        Dictionary<string, object?> bundle = Object(Parse(bundleJson));
        Dictionary<string, object?> record = Object(Field(bundle, "protected_record"));
        Dictionary<string, object?> access = Object(Field(bundle, "customer_access"));
        Require(Field(bundle, "bundle_version") is 1L && Field(access, "version") is 1L,
            "Unsupported bundle or capsule version");
        Require(Text(record, "version") == "v4"
            && Text(record, "algorithm") == "HPKE-v1-DHKEM_P256_HKDF_SHA256-EXPORT_ONLY-AES256_GCM"
            && Text(access, "algorithm") == "RSA-OAEP-256"
            && Text(access, "customer_key_id") == originalKeyId, "Wrong schema or original key");

        ReadOnlySpan<char> pem = publicPem.AsSpan().Trim();
        Require(PemEncoding.TryFind(pem, out PemFields fields)
            && fields.Location.GetOffsetAndLength(pem.Length) == (0, pem.Length), "Expected one public key");
        string label = pem[fields.Label].ToString();
        Require(label is "PUBLIC KEY" or "RSA PUBLIC KEY", "Expected an RSA public key");
        using RSA rsa = RSA.Create();
        rsa.ImportFromPem(pem);
        Require(rsa.KeySize == 3072, "Expected RSA-3072");
        Require(Decode(Text(access, "recovery_secret")).Length == 384, "Wrong RSA ciphertext length");
        Require(Equal(Decode(Text(access, "customer_public_key_fingerprint")),
            SHA256.HashData(rsa.ExportSubjectPublicKeyInfo())), "Wrong key fingerprint");

        byte[] runtimePoint = Decode(Text(record, "safety_review_runtime_public_key"));
        Require(runtimePoint.Length == 65 && runtimePoint[0] == 4, "Invalid P-256 encoding");
        using ECDiffieHellman runtime = ECDiffieHellman.Create(new ECParameters
        {
            Curve = ECCurve.NamedCurves.nistP256,
            Q = new ECPoint { X = runtimePoint[1..33], Y = runtimePoint[33..65] }
        });
        byte[] thumbprint = SHA256.HashData(Canonical(new Dictionary<string, object?>
        {
            ["crv"] = "P-256",
            ["kty"] = "EC",
            ["x"] = Encode(runtimePoint[1..33]),
            ["y"] = Encode(runtimePoint[33..65])
        }));
        Require(Equal(Decode(Text(record, "key_thumbprint")), thumbprint), "Wrong runtime key");
        byte[] nonce = Decode(Text(record, "nonce"));
        byte[] ciphertext = Decode(Text(record, "ciphertext"));
        Require(nonce.Length == 12 && ciphertext.Length >= 16, "Invalid AES-GCM parameters");
        byte[] binding = SHA256.HashData(Canonical(new Dictionary<string, object?>
        {
            ["purpose"] = "OpenAI-PSP-v4/customer-recovery-binding",
            ["bundle_version"] = 1L,
            ["record"] = record,
            ["recovery_header"] = Without(access, "recovery_secret")
        }));
        Require(capsule.Length == 72 && Equal(capsule.AsSpan(0, 8), "PSPv4\0\0\x01"u8)
            && Equal(capsule.AsSpan(40, 32), binding), "Invalid recovery capsule binding");

        byte[] scalar = capsule[8..40];
        byte[]? key = null;
        byte[] plaintext = new byte[ciphertext.Length - 16];
        try
        {
            byte[] order = Convert.FromHexString(
                "FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551");
            Require(!Equal(scalar, new byte[32]) && scalar.AsSpan().SequenceCompareTo(order) < 0,
                "Invalid P-256 private scalar");
            using ECDiffieHellman ephemeral = ECDiffieHellman.Create(new ECParameters
            {
                Curve = ECCurve.NamedCurves.nistP256,
                D = scalar
            });
            ECParameters parameters = ephemeral.ExportParameters(false);
            byte[] encapsulation = Join([4], parameters.Q.X!, parameters.Q.Y!);
            Require(Equal(Decode(Text(record, "encrypted_dek")), encapsulation), "Wrong recovered scalar");
            byte[] aad = Canonical(Without(record, "ciphertext"));
            key = PayloadKey(ephemeral, runtime.PublicKey, encapsulation, runtimePoint, aad);
            using AesGcm cipher = new(key, 16);
            cipher.Decrypt(nonce, ciphertext.AsSpan(0, ciphertext.Length - 16),
                ciphertext.AsSpan(ciphertext.Length - 16), plaintext, aad);
            return Utf8.GetString(plaintext);
        }
        finally
        {
            CryptographicOperations.ZeroMemory(scalar);
            if (key is not null) CryptographicOperations.ZeroMemory(key);
            CryptographicOperations.ZeroMemory(plaintext);
        }
    }

    // RFC 9180 base-mode DHKEM(P-256, HKDF-SHA256), export-only AEAD.
    // Native ECDH and HKDF implement the primitives; recovery reuses the original scalar.
    internal static byte[] PayloadKey(ECDiffieHellman ephemeral, ECDiffieHellmanPublicKey runtime,
        byte[] encapsulation, byte[] runtimePoint, byte[] aad)
    {
        List<byte[]> secrets = [];
        byte[] Remember(byte[] value) { secrets.Add(value); return value; }
        byte[] Extract(byte[] suite, string label, byte[] input, byte[] salt)
        {
            byte[] labeled = Join("HPKE-v1"u8.ToArray(), suite, Utf8.GetBytes(label), input);
            try { return Remember(HKDF.Extract(HashAlgorithmName.SHA256, labeled, salt)); }
            finally { CryptographicOperations.ZeroMemory(labeled); }
        }
        byte[] Expand(byte[] suite, string label, byte[] secret, byte[] info)
        {
            byte[] labeled = Join([0, 32], "HPKE-v1"u8.ToArray(), suite, Utf8.GetBytes(label), info);
            try { return Remember(HKDF.Expand(HashAlgorithmName.SHA256, secret, 32, labeled)); }
            finally { CryptographicOperations.ZeroMemory(labeled); }
        }
        try
        {
            byte[] kem = [0x4b, 0x45, 0x4d, 0, 0x10];
            byte[] dh = Remember(ephemeral.DeriveRawSecretAgreement(runtime));
            byte[] prk = Extract(kem, "eae_prk", dh, []);
            byte[] shared = Expand(kem, "shared_secret", prk, Join(encapsulation, runtimePoint));
            byte[] suite = [0x48, 0x50, 0x4b, 0x45, 0, 0x10, 0, 1, 0xff, 0xff];
            byte[] schedule = Join([0], Extract(suite, "psk_id_hash", [], []),
                Extract(suite, "info_hash", "OpenAI-PSP-v4/HPKE-export"u8.ToArray(), []));
            byte[] exporter = Expand(suite, "exp", Extract(suite, "secret", [], shared), schedule);
            byte[] key = Expand(suite, "sec", exporter,
                Join("OpenAI-PSP-v4/payload-key"u8.ToArray(), SHA256.HashData(aad)));
            return key.ToArray();
        }
        finally
        {
            foreach (byte[] secret in secrets) CryptographicOperations.ZeroMemory(secret);
        }
    }

    // This example supports a strict RFC 8785 subset: numbers must have integer
    // JSON spelling and lie within +/-9007199254740991. Reject fractional,
    // exponent and unsafe-integer inputs instead of approximating JCS numbers.
    // Otherwise-valid bundles with unsupported numeric extension fields are rejected.
    // Preserve Unicode exactly, reject duplicate names and malformed UTF-8 or
    // surrogate pairs, and sort names by UTF-16 ordinal code units.
    internal static object? Parse(byte[] json)
    {
        _ = Utf8.GetString(json);
        using JsonDocument document = JsonDocument.Parse(json, new JsonDocumentOptions { MaxDepth = 128 });
        return ConvertValue(document.RootElement);
    }

    private static object? ConvertValue(JsonElement value)
    {
        switch (value.ValueKind)
        {
            case JsonValueKind.Object:
                Dictionary<string, object?> fields = new(StringComparer.Ordinal);
                foreach (JsonProperty property in value.EnumerateObject())
                {
                    CheckUnicode(property.Name);
                    Require(fields.TryAdd(property.Name, ConvertValue(property.Value)), "Duplicate JSON key");
                }
                return fields;
            case JsonValueKind.Array:
                return value.EnumerateArray().Select(ConvertValue).ToArray();
            case JsonValueKind.String:
                string text = value.GetString()!;
                CheckUnicode(text);
                return text;
            case JsonValueKind.Number:
                string raw = value.GetRawText();
                Require(!raw.Contains('.') && !raw.Contains('e') && !raw.Contains('E')
                    && value.TryGetInt64(out long _), "Only safe integer numbers are supported");
                long number = value.GetInt64();
                Require(number is >= -9007199254740991L and <= 9007199254740991L, "Unsafe integer");
                return number;
            case JsonValueKind.True: return true;
            case JsonValueKind.False: return false;
            case JsonValueKind.Null: return null;
            default: throw new ArgumentException("Unsupported JSON value");
        }
    }

    internal static byte[] Canonical(object? value)
    {
        StringBuilder text = new();
        void WriteString(string item)
        {
            CheckUnicode(item);
            text.Append('"');
            foreach (char c in item)
            {
                text.Append(c switch
                {
                    '"' => "\\\"",
                    '\\' => "\\\\",
                    '\b' => "\\b",
                    '\t' => "\\t",
                    '\n' => "\\n",
                    '\f' => "\\f",
                    '\r' => "\\r",
                    < ' ' => "\\u" + ((int)c).ToString("x4", CultureInfo.InvariantCulture),
                    _ => c.ToString()
                });
            }
            text.Append('"');
        }
        void Write(object? item)
        {
            switch (item)
            {
                case null: text.Append("null"); break;
                case string s: WriteString(s); break;
                case bool b: text.Append(b ? "true" : "false"); break;
                case long n when n is >= -9007199254740991L and <= 9007199254740991L:
                    text.Append(n.ToString(CultureInfo.InvariantCulture)); break;
                case Dictionary<string, object?> fields:
                    text.Append('{');
                    bool first = true;
                    foreach (string name in fields.Keys.Order(StringComparer.Ordinal))
                    {
                        if (!first) text.Append(',');
                        first = false;
                        WriteString(name); text.Append(':'); Write(fields[name]);
                    }
                    text.Append('}'); break;
                case object?[] items:
                    text.Append('[');
                    for (int i = 0; i < items.Length; i++)
                    {
                        if (i > 0) text.Append(',');
                        Write(items[i]);
                    }
                    text.Append(']'); break;
                default: throw new ArgumentException("Outside the supported canonical JSON subset");
            }
        }
        Write(value);
        return Utf8.GetBytes(text.ToString());
    }

    private static void CheckUnicode(string value)
    {
        for (int i = 0; i < value.Length; i++)
        {
            if (!char.IsSurrogate(value[i])) continue;
            Require(char.IsHighSurrogate(value[i]) && i + 1 < value.Length
                && char.IsLowSurrogate(value[++i]), "Malformed Unicode");
        }
    }

    private static Dictionary<string, object?> Object(object? value) =>
        value as Dictionary<string, object?> ?? throw new ArgumentException("Expected an object");
    private static object? Field(Dictionary<string, object?> value, string name) =>
        value.TryGetValue(name, out object? item) ? item : throw new ArgumentException("Missing field");
    private static string Text(Dictionary<string, object?> value, string name) =>
        Field(value, name) as string ?? throw new ArgumentException("Expected text");
    private static Dictionary<string, object?> Without(Dictionary<string, object?> value, string name) =>
        value.Where(pair => pair.Key != name).ToDictionary(pair => pair.Key, pair => pair.Value, StringComparer.Ordinal);
    private static string Encode(byte[] value) => Convert.ToBase64String(value).TrimEnd('=').Replace('+', '-').Replace('/', '_');
    private static byte[] Decode(string value)
    {
        Require(value.All(c => char.IsAsciiLetterOrDigit(c) || c is '-' or '_'), "Invalid base64url");
        byte[] bytes = Convert.FromBase64String(value.Replace('-', '+').Replace('_', '/') + new string('=', (4 - value.Length % 4) % 4));
        Require(Encode(bytes) == value, "Noncanonical base64url");
        return bytes;
    }
    private static bool Equal(ReadOnlySpan<byte> left, ReadOnlySpan<byte> right) =>
        CryptographicOperations.FixedTimeEquals(left, right);
    private static byte[] Join(params byte[][] arrays)
    {
        byte[] result = new byte[arrays.Sum(array => array.Length)];
        int offset = 0;
        foreach (byte[] array in arrays) { array.CopyTo(result, offset); offset += array.Length; }
        return result;
    }
    private static void Require(bool condition, string message)
    {
        if (!condition) throw new ArgumentException(message);
    }
}
```

```ruby
require "base64"
require "digest"
require "json"
require "json/canonicalization"
require "openssl"
require "hpke"

def require_valid(condition, message)
  raise ArgumentError, message unless condition
end

def b64url(bytes)
  Base64.urlsafe_encode64(bytes, padding: false)
end

def decode64(value)
  require_valid(value.is_a?(String), "Expected base64url text")
  bytes = Base64.strict_decode64(value.tr("-_", "+/") + "=" * (-value.length % 4))
  require_valid(b64url(bytes) == value, "Noncanonical base64url")
  bytes
end

def equal_bytes?(left, right)
  left.bytesize == right.bytesize && OpenSSL.fixed_length_secure_compare(left, right)
end

def recovery_point(kem, value)
  encoded = decode64(value)
  require_valid(encoded.bytesize == 65 && encoded.getbyte(0) == 4, "Invalid P-256 encoding")
  key = kem.deserialize_public_key(encoded)
  require_valid(key.check_key, "Invalid P-256 point")
  [key, encoded]
rescue OpenSSL::PKey::PKeyError
  raise ArgumentError, "Invalid P-256 point"
end

# Recover from exact inner bundle bytes and an already decrypted capsule.
# No cloud calls occur here; the RSA private key stays in the cloud.
def recover_record(bundle_json, capsule, original_key_id, original_public_key_pem)
  bundle = JSON.parse(bundle_json, allow_duplicate_key: false)
  require_valid(
    bundle["bundle_version"].is_a?(Integer) && bundle["bundle_version"] == 1,
    "Unsupported bundle version"
  )
  record = bundle.fetch("protected_record")
  access = bundle.fetch("customer_access")
  require_valid(access.is_a?(Hash), "Customer recovery is unavailable")
  require_valid(
    record["version"] == "v4" &&
        record["algorithm"] == "HPKE-v1-DHKEM_P256_HKDF_SHA256-EXPORT_ONLY-AES256_GCM" &&
        access["version"].is_a?(Integer) && access["version"] == 1 &&
        access["algorithm"] == "RSA-OAEP-256" && access["customer_key_id"] == original_key_id,
    "Wrong schema or original key"
  )

  public_key = OpenSSL::PKey.read(original_public_key_pem)
  require_valid(public_key.is_a?(OpenSSL::PKey::RSA) && !public_key.private?, "Expected an RSA public key")
  require_valid(public_key.n.num_bits == 3072, "Expected RSA-3072")
  require_valid(
    decode64(access.fetch("recovery_secret")).bytesize == 384,
    "Wrong RSA ciphertext length"
  )
  fingerprint = Digest::SHA256.digest(public_key.public_to_der)
  require_valid(equal_bytes?(decode64(access.fetch("customer_public_key_fingerprint")), fingerprint), "Wrong key")

  suite = HPKE.new(HPKE::DHKEM_P256_HKDF_SHA256, HPKE::HKDF_SHA256, HPKE::EXPORT_ONLY)
  runtime, encoded = recovery_point(suite.kem, record.fetch("safety_review_runtime_public_key"))
  jwk = {
    "crv" => "P-256",

    "kty" => "EC",

    "x" => b64url(encoded.byteslice(1, 32)),
    "y" => b64url(encoded.byteslice(33, 32))
  }
  require_valid(record["key_thumbprint"] == b64url(Digest::SHA256.digest(jwk.to_json_c14n)), "Wrong runtime key")
  nonce = decode64(record.fetch("nonce"))
  ciphertext = decode64(record.fetch("ciphertext"))
  require_valid(nonce.bytesize == 12 && ciphertext.bytesize >= 16, "Invalid AES-GCM encoding")

  binding_input = {
    "purpose" => "OpenAI-PSP-v4/customer-recovery-binding",

    "bundle_version" => 1,
    "record" => record,

    "recovery_header" => access.except("recovery_secret")
  }
  binding = Digest::SHA256.digest(binding_input.to_json_c14n)
  require_valid(
    capsule.is_a?(String) && capsule.bytesize == 72 &&
        capsule.byteslice(0, 8) == "PSPv4\x00\x00\x01".b && equal_bytes?(capsule.byteslice(40, 32), binding),
    "Invalid recovery capsule binding"
  )
  secret = capsule.byteslice(8, 32)
  scalar = OpenSSL::BN.new(secret, 2).to_i
  order = 0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551
  require_valid(scalar >= 1 && scalar < order, "Invalid P-256 private scalar")

  # Restore the recovered key on this one KEM instance. The library performs
  # the complete HPKE encapsulation and key schedule, without generating a new
  # ephemeral key that would differ from the original encryption operation.
  ephemeral = suite.kem.create_key_pair_from_secret(secret)
  suite.kem.define_singleton_method(:generate_key_pair) { ephemeral }
  sender = suite.setup_base_s(runtime, "OpenAI-PSP-v4/HPKE-export")
  require_valid(sender.fetch(:enc) == decode64(record.fetch("encrypted_dek")), "Wrong recovered scalar")
  aad = record.except("ciphertext").to_json_c14n
  key = sender.fetch(:context_s).export("OpenAI-PSP-v4/payload-key" + Digest::SHA256.digest(aad), 32)

  cipher = OpenSSL::Cipher.new("aes-256-gcm")
  cipher.decrypt
  cipher.key = key
  cipher.iv = nonce
  cipher.auth_tag = ciphertext.byteslice(-16, 16)
  cipher.auth_data = aad
  encrypted_body = ciphertext.byteslice(0, ciphertext.bytesize - 16)
  plaintext = encrypted_body.empty? ? "".b : cipher.update(encrypted_body)
  plaintext << cipher.final
  plaintext.force_encoding(Encoding::UTF_8)
  require_valid(plaintext.valid_encoding?, "Recovered plaintext is not UTF-8")
  plaintext
end
```


### Recovered content

For request records whose recovered JSON has `format: "psp_request_v1"`, `request_text` contains the retained request text. The other fields are `reasoning_summaries` (string array), `request_text_truncated` (boolean), and `reasoning_summary_parts_omitted` (nonnegative integer). Check the truncation fields when interpreting the result. Other protected content types may use different plaintext formats.

Customer recovery can continue after the OpenAI runtime key expires, provided your original customer recovery key and snapshot remain available. Leave the authenticated `expires_at` value unchanged. The separately encrypted `encrypted_cot` blobs remain opaque to customer recovery.