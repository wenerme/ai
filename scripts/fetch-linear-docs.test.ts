import { describe, expect, test } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  acquireLock,
  commitStagedDirectory,
  isKnownIncompletePage,
  normalizeMarkdown,
  parseLlmsManifest,
  portablePathKey,
  redactSensitiveExamples,
  renderLocalIndex,
  recoverInterruptedReplacement,
  sourceFilepath,
  validateGraphqlSchema,
  validateContentShrink,
  validateManifest,
  validateMarkdown,
  type LinearDocLink,
} from "./fetch-linear-docs.ts";

const SCHEMA_URL = "https://raw.githubusercontent.com/linear/linear/master/packages/sdk/src/schema.graphql";

function completeLinks(): LinearDocLink[] {
  const lines = [
    ...Array.from({ length: 100 }, (_, index) => `- [Doc ${index}](https://linear.app/docs/doc-${index}.md)`),
    ...Array.from({ length: 20 }, (_, index) => `- [Developer ${index}](https://linear.app/developers/dev-${index}.md)`),
    `- [Schema](${SCHEMA_URL})`,
  ];
  return parseLlmsManifest(lines.join("\n"));
}

describe("llms.txt parsing and paths", () => {
  test("maps product, developer, and schema sources", () => {
    expect(sourceFilepath("https://linear.app/docs/start-guide.md")).toBe("docs/start-guide.md");
    expect(sourceFilepath("https://linear.app/developers/pagination.md")).toBe("developers/pagination.md");
    expect(sourceFilepath(SCHEMA_URL)).toBe("developers/schema.graphql");
  });

  test.each([
    "http://linear.app/docs/start-guide.md",
    "https://linear.app/docs/../README.md",
    "https://linear.app/docs/%2e%2e/README.md",
    "https://linear.app/api/private.md",
    "https://raw.githubusercontent.com/linear/linear/main/other.graphql",
    "https://example.com/docs/start-guide.md",
  ])("rejects unexpected source %s", (url) => {
    expect(() => sourceFilepath(url)).toThrow();
  });

  test("rejects malformed manifest link lines", () => {
    expect(() => parseLlmsManifest("- [Broken](javascript:alert(1))\n")).toThrow("Unsupported");
  });

  test("keeps the approved SDK repository out of the mirrored document set", () => {
    const source = [
      "- [Start](https://linear.app/docs/start-guide.md)",
      "- [GitHub](https://github.com/linear/linear/tree/master/packages/sdk)",
    ].join("\n");
    expect(parseLlmsManifest(source)).toHaveLength(1);
  });

  test("deduplicates repeated navigation links by source URL", () => {
    const source = [
      "- [Assign issues](https://linear.app/docs/assigning-issues.md)",
      "- [Assign and delegate issues](https://linear.app/docs/assigning-issues.md)",
    ].join("\n");
    expect(parseLlmsManifest(source)).toHaveLength(1);
  });

  test("discovers links in alternate Markdown list formats", () => {
    const source = [
      "* [Star](https://linear.app/docs/star.md)",
      "1. [Numbered](https://linear.app/developers/numbered.md)",
    ].join("\n");
    expect(parseLlmsManifest(source).map((link) => link.filepath)).toEqual([
      "docs/star.md",
      "developers/numbered.md",
    ]);
  });

  test("rejects bare or unsupported manifest URLs instead of silently ignoring them", () => {
    expect(() => parseLlmsManifest("Source: https://linear.app/docs/bare.md\n")).toThrow("non-Markdown");
    expect(() => parseLlmsManifest("- [Relative](/docs/relative.md)\n")).toThrow("Unsupported");
  });

  test("normalizes portable path collision keys", () => {
    expect(portablePathKey("Docs/É.md")).toBe(portablePathKey("docs/E\u0301.md"));
  });
});

describe("manifest completeness", () => {
  test("accepts the expected source distribution", () => {
    const links = completeLinks();
    expect(() => validateManifest(links, links.length)).not.toThrow();
  });

  test("rejects unexplained shrink", () => {
    expect(() => validateManifest(completeLinks(), 122)).toThrow("shrink");
  });

  test("allows explicitly approved shrink", () => {
    expect(() => validateManifest(completeLinks(), 122, { allowShrink: true })).not.toThrow();
  });

  test("rejects duplicate URLs and portable output paths", () => {
    const duplicateUrl = completeLinks();
    duplicateUrl.push(duplicateUrl[0]);
    expect(() => validateManifest(duplicateUrl, 0)).toThrow("Duplicate");

    const duplicatePath = completeLinks();
    duplicatePath.push({
      label: "Collision",
      url: "https://linear.app/docs/DOC-0.md",
      filepath: "docs/DOC-0.md",
    });
    expect(() => validateManifest(duplicatePath, 0)).toThrow("collision");
  });
});

describe("content validation and cleanup", () => {
  test("redacts OAuth examples without touching unrelated signatures", () => {
    const signature = "a".repeat(64);
    const source = [
      `{"access_token":"${"b".repeat(64)}","refresh_token":"${"c".repeat(64)}"}`,
      `Authorization: Bearer ${"d".repeat(64)}`,
      `  -H 'Authorization: Bearer ${"e".repeat(64)}'`,
      `curl --header='Authorization: Bearer ${"f".repeat(64)}' https://api.linear.app/graphql`,
      `webhook-signature: ${signature}`,
    ].join("\n");
    const cleaned = redactSensitiveExamples(source);
    expect(cleaned).toContain('"access_token":"EXAMPLE_TOKEN"');
    expect(cleaned).toContain('"refresh_token":"EXAMPLE_TOKEN"');
    expect(cleaned).toContain("Authorization: Bearer EXAMPLE_ACCESS_TOKEN");
    expect(cleaned).toContain('-H "$LINEAR_AUTHORIZATION_HEADER"');
    expect(cleaned).toContain('curl --header "$LINEAR_AUTHORIZATION_HEADER" https://api.linear.app/graphql');
    expect(cleaned).not.toMatch(/(?:-H|--header).*Authorization:\s*Bearer/i);
    expect(cleaned).toContain(`webhook-signature: ${signature}`);
  });

  test("converts YouTube image syntax and preserves ordinary images and fences", () => {
    const source = [
      "# Example",
      "",
      "Useful body content that is long enough for validation and explains the product behavior in detail.",
      "",
      "![Demo](https://www.youtube.com/watch?v=abc123)",
      "![Screenshot](https://webassets.linear.app/image.png)",
      "",
      "```ts",
      "const value = true",
      "```",
    ].join("\n");
    const cleaned = normalizeMarkdown(source);
    expect(cleaned).toContain("[Demo](https://www.youtube.com/watch?v=abc123)");
    expect(cleaned).not.toContain("![Demo]");
    expect(cleaned).toContain("![Screenshot](https://webassets.linear.app/image.png)");
    expect(() => validateMarkdown(cleaned, "https://linear.app/docs/example.md")).not.toThrow();
  });

  test("rejects title-only pages and unclosed fences", () => {
    expect(() => validateMarkdown("# GitHub\n", "https://linear.app/docs/github-integration.md")).toThrow("title-only");
    const unclosed = "# Page\n\n" + "Useful content ".repeat(10) + "\n\n```ts\nconst x = 1\n";
    expect(() => validateMarkdown(unclosed, "https://linear.app/docs/page.md")).toThrow("unclosed");
  });

  test("skips only the exact known GitHub title shell", () => {
    const url = "https://linear.app/docs/github-integration.md";
    expect(isKnownIncompletePage("# GitHub\n", url)).toBeTrue();
    expect(isKnownIncompletePage("# GitHub\n\nRestored documentation.\n", url)).toBeFalse();
    expect(isKnownIncompletePage("# GitHub\n\n```ts\n", url)).toBeFalse();
  });

  test("validates a structurally complete GraphQL schema", () => {
    const schema = [
      "type Query { issue: Issue }",
      "type Mutation { createIssue: Issue }",
      "type Issue { id: ID! }",
      ...Array.from({ length: 20_100 }, () => `# ${"x".repeat(25)}`),
    ].join("\n");
    expect(() => validateGraphqlSchema(schema)).not.toThrow();
    expect(() => validateGraphqlSchema("type Query { ok: Boolean }\n")).toThrow("small");
  });
});

describe("content shrink protection", () => {
  test("rejects aggregate and per-page severe shrink", () => {
    const previous = new Map([
      ["docs/a.md", 1_000],
      ["docs/b.md", 1_000],
    ]);
    expect(() => validateContentShrink(new Map([
      ["docs/a.md", 300],
      ["docs/b.md", 2_000],
    ]), previous)).toThrow("severe page shrink");
    expect(() => validateContentShrink(new Map([
      ["docs/a.md", 700],
    ]), previous)).toThrow("aggregate content shrink");
    expect(() => validateContentShrink(new Map([
      ["docs/replacement.md", 2_000],
    ]), previous)).toThrow("severe page shrink");
  });

  test("allows verified shrink and ignores generated index files", () => {
    const previous = new Map([["docs/a.md", 1_000], ["index.md", 50_000]]);
    const current = new Map([["docs/a.md", 300], ["index.md", 1]]);
    expect(() => validateContentShrink(current, previous, { allowShrink: true })).not.toThrow();
  });
});

describe("update locking", () => {
  test("rejects concurrent owners and releases only the owning token", () => {
    const directory = mkdtempSync(join(tmpdir(), "linear-docs-lock-"));
    const lockFile = join(directory, "update.lock");
    try {
      const release = acquireLock(lockFile);
      expect(() => acquireLock(lockFile)).toThrow("already exists");
      release();
      expect(existsSync(lockFile)).toBeFalse();

      const foreignRelease = acquireLock(lockFile);
      writeFileSync(lockFile, "foreign-owner\n");
      expect(() => foreignRelease()).toThrow("Refusing to release");
      expect(existsSync(lockFile)).toBeTrue();
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});

describe("atomic directory replacement", () => {
  function replacementPaths(directory: string) {
    return {
      outDir: join(directory, "references"),
      stagingDir: join(directory, "next"),
      backupDir: join(directory, "previous"),
      gcDir: join(directory, "gc"),
    };
  }

  test("restores the old tree when installed-output validation fails", () => {
    const directory = mkdtempSync(join(tmpdir(), "linear-docs-replace-"));
    const paths = replacementPaths(directory);
    try {
      mkdirSync(paths.outDir);
      mkdirSync(paths.stagingDir);
      writeFileSync(join(paths.outDir, "old.md"), "old\n");
      writeFileSync(join(paths.stagingDir, "new.md"), "new\n");
      expect(() => commitStagedDirectory(paths, () => {
        throw new Error("injected validation failure");
      })).toThrow("injected validation failure");
      expect(readFileSync(join(paths.outDir, "old.md"), "utf8")).toBe("old\n");
      expect(existsSync(paths.backupDir)).toBeFalse();
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test("keeps the committed new tree when old-tree garbage collection fails", () => {
    const directory = mkdtempSync(join(tmpdir(), "linear-docs-replace-"));
    const paths = replacementPaths(directory);
    try {
      mkdirSync(paths.outDir);
      mkdirSync(paths.stagingDir);
      writeFileSync(join(paths.outDir, "old.md"), "old\n");
      writeFileSync(join(paths.stagingDir, "new.md"), "new\n");
      const result = commitStagedDirectory(paths, () => {}, (gcDir) => {
        rmSync(join(gcDir, "old.md"));
        throw new Error("injected cleanup failure");
      });
      expect(result.cleanupPending).toBeTrue();
      expect(readFileSync(join(paths.outDir, "new.md"), "utf8")).toBe("new\n");
      expect(existsSync(paths.gcDir)).toBeTrue();

      recoverInterruptedReplacement(paths);
      expect(readFileSync(join(paths.outDir, "new.md"), "utf8")).toBe("new\n");
      expect(existsSync(paths.gcDir)).toBeFalse();
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});

describe("local index rendering", () => {
  test("rewrites fetched links locally and annotates skipped pages", () => {
    const source = [
      "# Linear",
      "",
      "* [Start](https://linear.app/docs/start-guide.md)",
      "1. [Start here](https://linear.app/docs/start-guide.md)",
      "- [GitHub](https://linear.app/docs/github-integration.md)",
      "- [SDK source](https://github.com/linear/linear/tree/master/packages/sdk)",
    ].join("\n");
    const links = parseLlmsManifest(source);
    const index = renderLocalIndex(source, links, new Set([links[0].url]));
    expect(index).toContain("[Start](docs/start-guide.md)");
    expect(index).toContain("[Start here](docs/start-guide.md)");
    expect(index).toContain("[GitHub](https://linear.app/docs/github-integration.md) _(not mirrored:");
    expect(index).toContain("[SDK source](https://github.com/linear/linear/tree/master/packages/sdk)");
  });
});
