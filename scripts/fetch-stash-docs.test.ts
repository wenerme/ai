import { describe, expect, test } from "bun:test";
import {
  cleanNextraMdx,
  decodeFlightTextReference,
  extractPage,
  portablePathKey,
  redactSensitiveExamples,
  sourceFilepathBefore,
  validateDiscoveredPageUrls,
} from "./fetch-stash-docs.ts";

const PAGE_URL = "https://stash.wiki/test";

function flightHtml(flight: string): string {
  return `<html><body><script>self.__next_f.push(${JSON.stringify([1, flight])})</script></body></html>`;
}

function inlineFlight(source: string, filepath = "content/test.mdx"): string {
  return `0:{"metadata":{"filePath":${JSON.stringify(filepath)}},"bottomContent":null,"sourceCode":${JSON.stringify(source)}}`;
}

function referencedFlight(source: string, id = "a", filepath = "content/test.mdx"): string {
  const header = `0:{"metadata":{"filePath":${JSON.stringify(filepath)}},"bottomContent":null,"sourceCode":"$${id}"}`;
  return `${header}\n${id}:T${Buffer.byteLength(source).toString(16)},${source}\n1:{"done":true}`;
}

function mirroredUrls(pairCount = 40): string[] {
  const urls = ["https://stash.wiki", "https://stash.wiki/en"];
  for (let index = 0; index < pairCount; index++) {
    urls.push(`https://stash.wiki/page-${index}`, `https://stash.wiki/en/page-${index}`);
  }
  return urls;
}

describe("Nextra Flight extraction", () => {
  test("extracts inline source and metadata path", () => {
    const page = extractPage(flightHtml(inlineFlight("# Hello\n")), PAGE_URL);
    expect(page.filepath).toBe("test.md");
    expect(page.content).toBe("# Hello\n");
  });

  test("extracts referenced UTF-8 source by declared byte length", () => {
    const source = "# 配置\n\n```yaml\n值: true\n```\n";
    const page = extractPage(flightHtml(referencedFlight(source)), PAGE_URL);
    expect(page.content).toBe(source);
  });

  test("unescapes an inline Flight string beginning with a literal dollar", () => {
    const page = extractPage(flightHtml(inlineFlight("$$literal\n")), PAGE_URL);
    expect(page.content).toBe("$literal\n");
  });

  test("rejects a truncated referenced text row", () => {
    expect(() => decodeFlightTextReference("a:T10,short", "$a", PAGE_URL)).toThrow("truncated");
  });
});

describe("portable source paths", () => {
  function parsePath(filepath: string): string {
    const flight = inlineFlight("# Test", filepath);
    return sourceFilepathBefore(flight, flight.indexOf('"sourceCode"'), PAGE_URL);
  }

  test("maps content MDX paths to references Markdown paths", () => {
    expect(parsePath("content/en/rules/rule-types.mdx")).toBe("en/rules/rule-types.md");
  });

  test.each([
    "content/../../README.mdx",
    "content/..\\..\\README.mdx",
    "content/C:\\outside.mdx",
    "content/bad:name.mdx",
  ])("rejects unsafe or non-portable path %s", (filepath) => {
    expect(() => parsePath(filepath)).toThrow();
  });

  test("normalizes case and Unicode for collision detection", () => {
    expect(portablePathKey("Rules/É.md")).toBe(portablePathKey("rules/E\u0301.md"));
  });
});

describe("sitemap completeness", () => {
  test("accepts the complete mirrored Chinese and English tree", () => {
    const urls = mirroredUrls();
    expect(() => validateDiscoveredPageUrls(urls, urls.length)).not.toThrow();
  });

  test("rejects any unexplained shrink", () => {
    const urls = mirroredUrls();
    expect(() => validateDiscoveredPageUrls(urls.slice(0, -2), urls.length)).toThrow("shrink");
  });

  test("rejects a missing language counterpart", () => {
    const urls = mirroredUrls();
    urls.pop();
    expect(() => validateDiscoveredPageUrls(urls, urls.length, { allowShrink: true })).toThrow("mismatch");
  });

  test("allows an explicitly approved shrink and language change", () => {
    expect(() => validateDiscoveredPageUrls(
      ["https://stash.wiki"],
      82,
      { allowShrink: true, allowLanguageMismatch: true },
    )).not.toThrow();
  });
});

describe("source cleanup", () => {
  test("converts Callout outside fences and leaves code intact", () => {
    const source = [
      "import { Callout } from 'nextra/components'",
      "",
      "<Callout emoji=\"⚠️\">Danger</Callout>",
      "",
      "```mdx",
      "<Callout>Code sample</Callout>",
      "```",
    ].join("\n");
    const cleaned = cleanNextraMdx(source);
    expect(cleaned).toContain("> [!WARNING]\n> Danger");
    expect(cleaned).toContain("```mdx\n<Callout>Code sample</Callout>\n```");
    expect(cleaned).not.toContain("import { Callout }");
  });

  test("removes the page-only TwitterContent implementation", () => {
    const source = [
      "export const TwitterContent = async () => {",
      "  const value = await fetch('https://example.com')",
      "  return <pre>{value}</pre>",
      "}",
      "",
      "Useful explanation.",
      "",
      "<TwitterContent />",
    ].join("\n");
    expect(cleanNextraMdx(source)).toContain("Useful explanation.");
    expect(cleanNextraMdx(source)).not.toContain("TwitterContent");
  });

  test("redacts private keys and common credential forms", () => {
    const highEntropy = ["abcdefghijklm", "nopqrstuvwxyz", "012345"].join("");
    const beginPrivateKey = ["-----BEGIN", "PRIVATE KEY-----"].join(" ");
    const endPrivateKey = ["-----END", "PRIVATE KEY-----"].join(" ");
    const source = [
      `private-key: '${highEntropy}789ABCDEFG='`,
      "private-key: |-",
      `  ${beginPrivateKey}`,
      `  ${highEntropy}`,
      `  ${endPrivateKey}`,
      `auth-key: ${["tskey", "auth", highEntropy].join("-")}`,
      `Authorization: Bearer ${highEntropy}`,
      `api-key: ${highEntropy}`,
      `# auth: ${Buffer.from("https://example.com/docs/advanced-usage/").toString("base64")}`,
      "next-key: preserved",
    ].join("\n");
    const cleaned = redactSensitiveExamples(source);
    expect(cleaned).toContain("private-key: EXAMPLE_PRIVATE_KEY");
    expect(cleaned).toContain("auth-key: TAILSCALE_AUTH_KEY_EXAMPLE");
    expect(cleaned).toContain("Bearer BEARER_TOKEN_EXAMPLE");
    expect(cleaned).toContain("api-key: CREDENTIAL_EXAMPLE");
    expect(cleaned).toContain("# auth: CREDENTIAL_EXAMPLE");
    expect(cleaned).toContain("next-key: preserved");
    expect(cleaned).not.toContain("abcdefghijklmnopqrstuvwxyz");
  });
});
