# Configuring workload identity federation for Idira

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use Idira Secure Workload Access (SWA) to call the OpenAI API without storing an OpenAI API key. SWA assigns your workload a SPIFFE ID and issues a JWT-SVID, a signed token that represents that identity. The OpenAI SDK exchanges the token for a short-lived OpenAI access token with the permissions of a mapped service account.

This guide covers the OpenAI API setup. For Codex, use the token delivery steps here, then follow [Use workload identity with Codex](https://developers.openai.com/api/docs/guides/workload-identity-federation#use-workload-identity-with-codex).

## Before you begin

You need:

- An SWA deployment with a trust domain and an attestation policy that assigns the expected SPIFFE ID to your workload.
- Access to the SWA Agent's Workload API socket from the workload.
- Permission to manage Workload Identity Providers, service account mappings, projects, and service accounts in your OpenAI organization.
- An OpenAI SDK that supports workload identity credentials.

Complete the SWA infrastructure setup using the prerequisites in [Idira's OpenAI integration guide](https://docs.cyberark.com/secrets-manager-saas/latest/en/content/conjurcloud/ccl-swa-openai.htm).

## Get the issuer and signing keys

Retrieve your trust domain's `jwt.discovery_endpoints.oidc_discovery_url` and `jwt.discovery_endpoints.jwks_uri`. Follow [Idira's OIDC configuration instructions](https://docs.cyberark.com/secrets-manager-saas/latest/en/content/conjurcloud/ccl-swa-oidc.htm) to find these values.

The discovery document and JWKS must be reachable by OpenAI over HTTPS without credentials. The issuer is the HTTPS URL in the token's `iss` claim. The SPIFFE ID in `sub` identifies your workload.

Choose a dedicated audience for OpenAI access, such as `https://api.openai.com/v1`. Use the same value when requesting the JWT-SVID and configuring the OpenAI provider. The audience identifies the token's intended recipient; it doesn't set the token exchange endpoint.

SWA defaults to `RS512` signing with a 4096-bit RSA key. OpenAI's JWT verifier accepts this combination. For other SWA signing options, see [Idira's JWT requirements](https://docs.cyberark.com/secrets-manager-saas/latest/en/content/conjurcloud/ccl-swa-jwt.htm).

## Deliver a fresh JWT-SVID to the workload

Install [`spiffe-helper`](https://github.com/spiffe/spiffe-helper) in the workload environment to request and refresh a JWT-SVID from the SWA Agent. Save the following configuration as `helper.conf`. The helper writes `/var/run/spiffe/openai.jwt`, the path used by the shared SPIFFE SDK examples:

```hcl
agent_address = "/tmp/swa-agent/public/api.sock"
cert_dir      = "/var/run/spiffe"
daemon_mode   = true

jwt_svids = [{
  jwt_audience       = "https://api.openai.com/v1"
  jwt_svid_file_name = "openai.jwt"
}]
```

In Kubernetes, run the helper as a sidecar in the workload's pod. Share a memory-backed `emptyDir` volume at `/var/run/spiffe`, and mount the SWA socket's parent directory, `/tmp/swa-agent/public`, into the helper. On VMs, use `/run/swa-agent/api.sock` for `agent_address` and keep the token directory on memory-backed storage. Follow Idira's deployment instructions for socket access and attestation.

Create the token directory before starting the helper, and give the helper write access. Start the helper with this configuration in the sidecar or VM service:

```bash
spiffe-helper -config helper.conf
```

Restrict access to the token file and agent socket to the processes that need them. Keep the helper running so it replaces the token before it expires.

If your language has a SPIFFE Workload API client, you can instead fetch a fresh JWT-SVID inside the subject token provider. See the direct Workload API option in [Idira's integration guide](https://docs.cyberark.com/secrets-manager-saas/latest/en/content/conjurcloud/ccl-swa-openai.htm).

## Inspect the token

From inside the workload, read the token into the local decoder's environment:

```bash
export TOKEN="$(cat /var/run/spiffe/openai.jwt)"
```

```javascript
const parts = process.env.TOKEN?.split(".") ?? [];
if (parts.length !== 3) {
  throw new Error("Expected a compact JWT with three segments");
}

const decode = (segment) => {
  if (!/^[A-Za-z0-9_-]+$/.test(segment) || segment.length % 4 === 1) {
    throw new Error("JWT segment is not valid Base64URL");
  }
  const bytes = Buffer.from(segment, "base64url");
  if (bytes.toString("base64url") !== segment) {
    throw new Error("JWT segment is not valid Base64URL");
  }
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  const value = JSON.parse(decoded);
  if (value === null || Array.isArray(value) || typeof value !== "object") {
    throw new Error("JWT segment is not a JSON object");
  }
  return decoded;
};

console.log("Header:");
console.log(decode(parts[0]));
console.log("\nPayload:");
console.log(decode(parts[1]));
```

```python
import base64
import json
import os
import re


def reject_non_json_constant(value):
    raise ValueError(f"JWT segment contains non-JSON constant: {value}")


parts = os.environ.get("TOKEN", "").split(".")
if len(parts) != 3:
    raise ValueError("Expected a compact JWT with three segments")


def decode(segment):
    if re.fullmatch(r"[A-Za-z0-9_-]+", segment) is None or len(segment) % 4 == 1:
        raise ValueError("JWT segment is not valid Base64URL")
    padded_segment = segment + "=" * (-len(segment) % 4)
    decoded = base64.b64decode(padded_segment, altchars=b"-_", validate=True)
    if base64.urlsafe_b64encode(decoded).rstrip(b"=").decode("ascii") != segment:
        raise ValueError("JWT segment is not valid Base64URL")
    decoded_text = decoded.decode("utf-8")
    value = json.loads(decoded_text, parse_constant=reject_non_json_constant)
    if not isinstance(value, dict):
        raise ValueError("JWT segment is not a JSON object")
    return decoded_text


print("Header:")
print(decode(parts[0]))
print("\nPayload:")
print(decode(parts[1]))
```

```go
package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"unicode/utf8"
)

func decodeSegment(segment string) (json.RawMessage, error) {
	if !isBase64URLSegment(segment) {
		return nil, fmt.Errorf("JWT segment is not valid Base64URL")
	}
	decoded, err := base64.RawURLEncoding.DecodeString(segment)
	if err != nil {
		return nil, err
	}
	if base64.RawURLEncoding.EncodeToString(decoded) != segment {
		return nil, fmt.Errorf("JWT segment is not valid Base64URL")
	}
	if !utf8.Valid(decoded) {
		return nil, fmt.Errorf("JWT segment is not valid UTF-8")
	}

	var value json.RawMessage
	if err := json.Unmarshal(decoded, &value); err != nil {
		return nil, err
	}
	if trimmed := bytes.TrimSpace(value); len(trimmed) == 0 || trimmed[0] != '{' {
		return nil, fmt.Errorf("JWT segment is not a JSON object")
	}
	return value, nil
}

func isBase64URLSegment(segment string) bool {
	if segment == "" || len(segment)%4 == 1 {
		return false
	}
	for _, character := range segment {
		if !('A' <= character && character <= 'Z') &&
			!('a' <= character && character <= 'z') &&
			!('0' <= character && character <= '9') &&
			character != '-' &&
			character != '_' {
			return false
		}
	}
	return true
}

func printJSON(label string, value json.RawMessage) error {
	formatted, err := json.MarshalIndent(value, "", "  ")
	if err != nil {
		return err
	}
	fmt.Printf("%s:\n%s\n", label, formatted)
	return nil
}

func main() {
	parts := strings.Split(os.Getenv("TOKEN"), ".")
	if len(parts) != 3 {
		panic("Expected a compact JWT with three segments")
	}

	header, err := decodeSegment(parts[0])
	if err != nil {
		panic(err)
	}
	payload, err := decodeSegment(parts[1])
	if err != nil {
		panic(err)
	}
	if err := printJSON("Header", header); err != nil {
		panic(err)
	}
	fmt.Println()
	if err := printJSON("Payload", payload); err != nil {
		panic(err)
	}
}
```

```java
// Add Jackson (com.fasterxml.jackson.core:jackson-databind) to your project.
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.CodingErrorAction;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public final class DecodeJwtExample {
  private static final ObjectMapper JSON =
      new ObjectMapper().enable(DeserializationFeature.FAIL_ON_TRAILING_TOKENS);

  private DecodeJwtExample() {}

  static String decodeUtf8(byte[] bytes) throws IOException {
    try {
      return StandardCharsets.UTF_8
          .newDecoder()
          .onMalformedInput(CodingErrorAction.REPORT)
          .onUnmappableCharacter(CodingErrorAction.REPORT)
          .decode(ByteBuffer.wrap(bytes))
          .toString();
    } catch (CharacterCodingException exception) {
      throw new IOException("JWT segment is not valid UTF-8", exception);
    }
  }

  static String decodeSegment(String segment) throws IOException {
    if (!isBase64UrlSegment(segment)) {
      throw new IllegalArgumentException("JWT segment is not valid Base64URL");
    }
    byte[] bytes = Base64.getUrlDecoder().decode(segment);
    if (!Base64.getUrlEncoder().withoutPadding().encodeToString(bytes).equals(segment)) {
      throw new IllegalArgumentException("JWT segment is not valid Base64URL");
    }
    String decoded = decodeUtf8(bytes);
    JsonNode value = JSON.readTree(decoded);
    if (value == null || value.isMissingNode() || !value.isObject()) {
      throw new IOException("JWT segment is not a JSON object");
    }
    return decoded;
  }

  static boolean isBase64UrlSegment(String segment) {
    if (segment.isEmpty() || segment.length() % 4 == 1) {
      return false;
    }
    return segment
        .chars()
        .allMatch(
            character ->
                character >= 'A' && character <= 'Z'
                    || character >= 'a' && character <= 'z'
                    || character >= '0' && character <= '9'
                    || character == '-'
                    || character == '_');
  }

  static String[] requireCompactJwt(String token) {
    if (token == null) {
      throw new IllegalArgumentException("Expected a compact JWT with three segments");
    }
    String[] parts = token.split("\\.", -1);
    if (parts.length != 3) {
      throw new IllegalArgumentException("Expected a compact JWT with three segments");
    }
    return parts;
  }

  public static void main(String[] args) throws IOException {
    String[] parts = requireCompactJwt(System.getenv("TOKEN"));
    System.out.println("Header:");
    System.out.println(decodeSegment(parts[0]));
    System.out.println("\nPayload:");
    System.out.println(decodeSegment(parts[1]));
  }
}
```

```csharp
using System.Text;
using System.Text.Json;

static string DecodeSegment(string segment)
{
    if (
        segment.Length % 4 == 1 ||
        segment.Any(
            character =>
                !(
                    character is >= 'A' and <= 'Z' ||
                    character is >= 'a' and <= 'z' ||
                    character is >= '0' and <= '9' ||
                    character is '-' or '_'
                )
        )
    )
    {
        throw new FormatException("JWT segment is not valid Base64URL");
    }

    byte[] decoded = Convert.FromBase64String(
        segment.Replace('-', '+').Replace('_', '/') +
        new string('=', (4 - segment.Length % 4) % 4)
    );
    string canonicalSegment = Convert
        .ToBase64String(decoded)
        .TrimEnd('=')
        .Replace('+', '-')
        .Replace('/', '_');
    if (canonicalSegment != segment)
    {
        throw new FormatException("JWT segment is not valid Base64URL");
    }
    string decodedJson = new UTF8Encoding(false, true).GetString(decoded);
    using JsonDocument document = JsonDocument.Parse(decodedJson);
    if (document.RootElement.ValueKind is not JsonValueKind.Object)
    {
        throw new FormatException("JWT segment is not a JSON object");
    }
    return decodedJson;
}

string? token = Environment.GetEnvironmentVariable("TOKEN");
if (token is null)
{
    throw new InvalidOperationException(
        "Expected a compact JWT with three segments"
    );
}
string[] parts = token.Split('.');
if (parts.Length != 3)
{
    throw new InvalidOperationException(
        "Expected a compact JWT with three segments"
    );
}

Console.WriteLine("Header:");
Console.WriteLine(DecodeSegment(parts[0]));
Console.WriteLine("\nPayload:");
Console.WriteLine(DecodeSegment(parts[1]));
```

```ruby
require "base64"
require "json"

parts = ENV.fetch("TOKEN", "").split(".", -1)
raise "Expected a compact JWT with three segments" unless parts.length == 3

decode = lambda do |segment|
  unless segment.match?(/\A[A-Za-z0-9_-]+\z/) && segment.length % 4 != 1
    raise "JWT segment is not valid Base64URL"
  end

  padded = segment.ljust((segment.length + 3) & ~3, "=")
  begin
    decoded = Base64.urlsafe_decode64(padded)
  rescue ArgumentError
    raise "JWT segment is not valid Base64URL"
  end
  unless Base64.urlsafe_encode64(decoded, padding: false) == segment
    raise "JWT segment is not valid Base64URL"
  end

  decoded.force_encoding(Encoding::UTF_8)
  raise "JWT segment is not valid UTF-8" unless decoded.valid_encoding?

  value = JSON.parse(decoded)
  raise "JWT segment is not a JSON object" unless value.is_a?(Hash)

  decoded
end

puts("Header:")
puts(decode.call(parts[0]))
puts("\nPayload:")
puts(decode.call(parts[1]))
```


Check these fields before creating the OpenAI provider:

| Field           | Expected value                                                       |
| --------------- | -------------------------------------------------------------------- |
| Header `alg`    | The configured signing algorithm, such as `RS512`.                   |
| Header `kid`    | The ID of a signing key in the trust domain's public JWKS.           |
| `iss`           | The trust domain's HTTPS issuer URL.                                 |
| `sub`           | The SPIFFE ID assigned to this workload.                             |
| `aud`           | Contains the audience you chose for OpenAI access.                   |
| `iat` and `exp` | The token's issue and expiry times. Use a token that hasn't expired. |

The decoder reads the claims without verifying the signature. Don't log the token or paste it into a web-based decoder. Unset `TOKEN` after inspection.

## Configure OpenAI workload identity federation

### Create the Workload Identity Provider

Go to [Organization Settings &gt; Security &gt; Workload Identity Provider](https://platform.openai.com/settings/organization/security/workload-identity-provider) and create a provider with these settings:

| Setting                                  | Value                                                                      |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| Name                                     | A unique name, such as `idira-prod`.                                       |
| Description                              | The application and environment that use this provider.                    |
| OIDC Issuer URL                          | The JWT-SVID's `iss` value.                                                |
| Audience                                 | The audience requested by the helper, such as `https://api.openai.com/v1`. |
| Use uploaded JWKS for token verification | Keep this option off to use OIDC discovery.                                |
| Attribute transformations                | Leave empty when mapping directly from `sub`.                              |

For OpenAI API token exchange, issuer comparison ignores trailing slashes. For
  example, `https://issuer.example.com` and `https://issuer.example.com/` match.
  All other characters must match, including the scheme and path. Audience
  values must match exactly. Copy the issuer as issued to keep your
  configuration consistent.

If OpenAI can't reach the discovery document or JWKS, follow the [shared provider configuration guidance](https://developers.openai.com/api/docs/guides/workload-identity-federation#configure-an-oidc-workload-identity-provider) for uploaded public JWKS. Update uploaded keys when SWA rotates its signing keys.

### Map the SPIFFE ID to a service account

1. Create a service account mapping in the provider and give it a name, such as `idira-production-workload`.
2. Set **Key** to `sub` and **Value** to the exact SPIFFE ID from the workload's token, such as `spiffe://prod.example.com/k8s-nodegroup/ns/my-namespace/sa/my-service-account`.
3. Select the **Project** and **Service account** that the workload can use.
4. Select the **Permissions** the workload needs, such as `api.model.request` for model requests. These permissions can narrow the service account's access; they cannot grant more access. Leaving permissions blank adds no WIF-specific restriction.

Use a separate service account for each application and environment. Prefer an exact SPIFFE ID. Use a trailing wildcard only when every identity under that prefix should receive the same access. Avoid overlapping mappings. See [SPIFFE service account mappings](https://developers.openai.com/api/docs/guides/workload-identity-federation/spiffe#set-up-the-service-account-mapping) for details.

## Use the token in code

Set the IDs from your OpenAI provider and selected service account in the workload's environment:

```bash
export OPENAI_IDENTITY_PROVIDER_ID="<workload identity provider ID>"
export OPENAI_SERVICE_ACCOUNT_ID="<service account ID>"
```

The following shared SPIFFE examples read `/var/run/spiffe/openai.jwt`. The subject token provider returns the current token whenever the SDK needs to exchange or refresh an OpenAI access token. SWA and the helper refresh the external JWT-SVID; the OpenAI SDK manages the OpenAI access token.

Authenticate with an Idira-issued SPIFFE JWT-SVID

```javascript
import { readFile } from "node:fs/promises";
import OpenAI from "openai";

const tokenPath = "/var/run/spiffe/openai.jwt";
const identityProviderId = process.env.OPENAI_IDENTITY_PROVIDER_ID;
const serviceAccountId = process.env.OPENAI_SERVICE_ACCOUNT_ID;

if (!identityProviderId || !serviceAccountId) {
  throw new Error(
    "Set OPENAI_IDENTITY_PROVIDER_ID and OPENAI_SERVICE_ACCOUNT_ID"
  );
}

function spiffeJwtSvidProvider(path) {
  return {
    tokenType: "jwt",
    getToken: async () => {
      const token = (await readFile(path, "utf8")).trim();
      if (!token) {
        throw new Error("The SPIFFE JWT-SVID file is empty.");
      }
      return token;
    },
  };
}

const client = new OpenAI({
  workloadIdentity: {
    identityProviderId,
    serviceAccountId,
    provider: spiffeJwtSvidProvider(tokenPath),
  },
});

const response = await client.responses.create({
  model: "gpt-5.6-terra",
  input: "Say hello from SPIFFE workload identity federation.",
});

console.log(response.output_text);
```

```python
import os
from pathlib import Path

from openai import OpenAI
from openai.auth import SubjectTokenProvider

TOKEN_PATH = "/var/run/spiffe/openai.jwt"


def spiffe_jwt_svid_provider(token_path: str) -> SubjectTokenProvider:
    def get_token() -> str:
        token = Path(token_path).read_text().strip()
        if not token:
            raise RuntimeError("The SPIFFE JWT-SVID file is empty.")
        return token

    return {"token_type": "jwt", "get_token": get_token}


client = OpenAI(
    workload_identity={
        "identity_provider_id": os.environ["OPENAI_IDENTITY_PROVIDER_ID"],
        "service_account_id": os.environ["OPENAI_SERVICE_ACCOUNT_ID"],
        "provider": spiffe_jwt_svid_provider(TOKEN_PATH),
    },
)

response = client.responses.create(
    model="gpt-5.6-terra",
    input="Say hello from SPIFFE workload identity federation.",
)

print(response.output_text)
```

```go
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/auth"
	"github.com/openai/openai-go/v3/option"
	"github.com/openai/openai-go/v3/responses"
)

const tokenPath = "/var/run/spiffe/openai.jwt"

type spiffeJWTSVIDProvider struct {
	path string
}

func (p spiffeJWTSVIDProvider) TokenType() auth.SubjectTokenType {
	return auth.SubjectTokenTypeJWT
}

func (p spiffeJWTSVIDProvider) GetToken(ctx context.Context, _ auth.HTTPDoer) (string, error) {
	data, err := os.ReadFile(p.path)
	if err != nil {
		return "", &auth.SubjectTokenProviderError{
			Provider: "spiffe",
			Message:  "failed to read SPIFFE JWT-SVID",
			Cause:    err,
		}
	}

	token := strings.TrimSpace(string(data))
	if token == "" {
		return "", &auth.SubjectTokenProviderError{
			Provider: "spiffe",
			Message:  "SPIFFE JWT-SVID file is empty",
		}
	}

	return token, nil
}

func main() {
	client := openai.NewClient(
		option.WithWorkloadIdentity(auth.WorkloadIdentity{
			IdentityProviderID: os.Getenv("OPENAI_IDENTITY_PROVIDER_ID"),
			ServiceAccountID:   os.Getenv("OPENAI_SERVICE_ACCOUNT_ID"),
			Provider: spiffeJWTSVIDProvider{
				path: tokenPath,
			},
		}),
	)

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: openai.ChatModelGPT4_1Mini,
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("Say hello from SPIFFE workload identity federation."),
		},
	})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(response.OutputText())
}
```

```java
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.openai.auth.SubjectTokenProvider;
import com.openai.auth.SubjectTokenType;
import com.openai.auth.WorkloadIdentity;
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.http.HttpClient;
import com.openai.errors.SubjectTokenProviderException;
import com.openai.models.responses.ResponseCreateParams;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.CompletableFuture;

public final class SpiffeWorkloadIdentityExample {
  private static final String TOKEN_PATH = "/var/run/spiffe/openai.jwt";

  private SpiffeWorkloadIdentityExample() {}

  static final class SpiffeJwtSvidProvider implements SubjectTokenProvider {
    private final Path tokenPath;

    SpiffeJwtSvidProvider(String tokenPath) {
      this.tokenPath = Path.of(tokenPath);
    }

    @Override
    public SubjectTokenType tokenType() {
      return SubjectTokenType.JWT;
    }

    @Override
    public String getToken(HttpClient httpClient, JsonMapper jsonMapper) {
      String token;
      try {
        token = Files.readString(tokenPath).trim();
      } catch (Exception e) {
        throw new SubjectTokenProviderException("spiffe", "failed to read SPIFFE JWT-SVID", e);
      }

      if (token.isEmpty()) {
        throw new SubjectTokenProviderException("spiffe", "SPIFFE JWT-SVID file is empty", null);
      }

      return token;
    }

    @Override
    public CompletableFuture<String> getTokenAsync(HttpClient httpClient, JsonMapper jsonMapper) {
      return CompletableFuture.supplyAsync(() -> getToken(httpClient, jsonMapper));
    }
  }

  public static void main(String[] args) {
    WorkloadIdentity workloadIdentity =
        WorkloadIdentity.builder()
            .identityProviderId(System.getenv("OPENAI_IDENTITY_PROVIDER_ID"))
            .serviceAccountId(System.getenv("OPENAI_SERVICE_ACCOUNT_ID"))
            .provider(new SpiffeJwtSvidProvider(TOKEN_PATH))
            .build();

    OpenAIClient client = OpenAIOkHttpClient.builder().workloadIdentity(workloadIdentity).build();

    ResponseCreateParams params =
        ResponseCreateParams.builder()
            .model("gpt-5.6-terra")
            .input("Say hello from SPIFFE workload identity federation.")
            .build();

    client.responses().create(params).output().stream()
        .flatMap(item -> item.message().stream())
        .flatMap(message -> message.content().stream())
        .flatMap(content -> content.outputText().stream())
        .forEach(outputText -> System.out.println(outputText.text()));
  }
}
```

```ruby
require "openai"

TOKEN_PATH = "/var/run/spiffe/openai.jwt"

class SpiffeJWTSVIDProvider
  include OpenAI::Auth::SubjectTokenProvider

  def initialize(token_path:)
    @token_path = token_path
  end

  def token_type
    OpenAI::Auth::TokenType::JWT
  end

  def get_token
    token = File.read(@token_path).strip
    if token.empty?
      raise OpenAI::Errors::SubjectTokenProviderError.new(
        message: "SPIFFE JWT-SVID file is empty",
        provider: "spiffe"
      )
    end
    token
  rescue SystemCallError => e
    raise OpenAI::Errors::SubjectTokenProviderError.new(
      message: "Failed to read SPIFFE JWT-SVID: #{e.message}",
      provider: "spiffe",
      cause: e
    )
  end
end

provider = SpiffeJWTSVIDProvider.new(token_path: TOKEN_PATH)

workload_identity = OpenAI::Auth::WorkloadIdentity.new(
  identity_provider_id: ENV.fetch("OPENAI_IDENTITY_PROVIDER_ID"),
  service_account_id: ENV.fetch("OPENAI_SERVICE_ACCOUNT_ID"),
  provider: provider
)

client = OpenAI::Client.new(workload_identity: workload_identity)

response = client.responses.create(
  model: "gpt-5.6-terra",
  input: "Say hello from SPIFFE workload identity federation."
)

puts(response.output_text)
```


## Verify and troubleshoot

Run the example inside the attested workload with `OPENAI_API_KEY` unset. A successful request prints the model's reply. Confirm that requests continue to succeed after the helper replaces the JWT-SVID and the SDK refreshes its OpenAI access token.

| Symptom                                                      | What to check                                                                                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| The helper receives no identity                              | Check that the workload matches the SWA attestation policy and can access the agent socket. Run checks in the workload's context.           |
| The token file is missing or empty, or its token has expired | Check that the helper is running, the shared volume and file path match, and the workload can read the file. Keep host clocks synchronized. |
| Token verification fails                                     | Check `iss`, `aud`, `kid`, token expiry, and discovery/JWKS reachability. Apply the issuer comparison rule described earlier.               |
| No service account mapping matches                           | Check the provider ID, service account ID, enabled mapping, and exact `sub` value.                                                          |
| More than one mapping matches                                | Narrow or disable overlapping mappings so exactly one enabled mapping matches.                                                              |
| Exchange succeeds but the API rejects the request            | Check the mapped service account's project, permissions, and applicable API access policies.                                                |

For SWA deployment diagnostics, see [Idira's integration troubleshooting](https://docs.cyberark.com/secrets-manager-saas/latest/en/content/conjurcloud/ccl-swa-openai.htm).