import { describe, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  assertSafeArgoCdCheckout,
  cleanArgoCdMarkdown,
  collectArgoCdDocs,
  syncArgoCdFiles,
} from "./sync-argocd-docs.ts";

describe("Argo CD documentation includes", () => {
  test("expands Markdown, YAML, and Lua includes without rewriting literals in included code", () => {
    const root = mkdtempSync(join(tmpdir(), "argocd-docs-include-"));
    const sourceFile = join(root, "docs/page.md");
    try {
      mkdirSync(join(root, "docs/snippets"), { recursive: true });
      mkdirSync(join(root, "resource_customizations/apps"), { recursive: true });
      writeFileSync(join(root, "docs/snippets/partial.md"), "## Included\n\nKeep {{workflow.name}} literal.\n");
      writeFileSync(join(root, "docs/snippets/config.yaml"), "enabled: true\nsecret: EXAMPLE_SECRET\n");
      writeFileSync(join(root, "resource_customizations/apps/action.lua"), "return { action = 'restart' }\n");
      const source = [
        "# Page",
        "",
        "{!docs/snippets/partial.md!}",
        "",
        "```yaml",
        "{!docs/snippets/config.yaml!}",
        "```",
        "",
        "{!resource_customizations/apps/action.lua!}",
        "",
        "```text",
        "{{do-not-expand}}",
        "```",
      ].join("\n");

      const output = cleanArgoCdMarkdown(source, root, sourceFile);
      expect(output).toContain("## Included");
      expect(output).toContain("Keep {{workflow.name}} literal.");
      expect(output).toContain("```yaml\nenabled: true\nsecret: EXAMPLE_SECRET\n```");
      expect(output).toContain("```lua\nreturn { action = 'restart' }\n```");
      expect(output).toContain("{{do-not-expand}}");
      expect(output).not.toContain("{!docs/snippets/config.yaml!}");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("rejects path escapes, cycles, and unsupported include types", () => {
    const root = mkdtempSync(join(tmpdir(), "argocd-docs-invalid-include-"));
    const sourceFile = join(root, "docs/page.md");
    try {
      mkdirSync(join(root, "docs"), { recursive: true });
      writeFileSync(join(root, "docs/a.md"), "{!docs/b.md!}\n");
      writeFileSync(join(root, "docs/b.md"), "{!docs/a.md!}\n");
      writeFileSync(join(root, "docs/data.json"), "{}\n");
      expect(() => cleanArgoCdMarkdown("{!../outside.md!}\n", root, sourceFile)).toThrow("escapes");
      expect(() => cleanArgoCdMarkdown("{!docs/a.md!}\n", root, sourceFile)).toThrow("Circular");
      expect(() => cleanArgoCdMarkdown("{!docs/data.json!}\n", root, sourceFile)).toThrow("Unsupported");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("rejects symlink escapes and does not close a fence with trailing text", () => {
    const root = mkdtempSync(join(tmpdir(), "argocd-docs-fence-"));
    const outside = mkdtempSync(join(tmpdir(), "argocd-docs-outside-"));
    const sourceFile = join(root, "docs/page.md");
    try {
      mkdirSync(join(root, "docs"), { recursive: true });
      writeFileSync(join(outside, "secret.yaml"), "password: outside\n");
      symlinkSync(join(outside, "secret.yaml"), join(root, "docs/escaped.yaml"));
      writeFileSync(join(root, "docs/partial.md"), "# Included\n");
      expect(() => cleanArgoCdMarkdown("{!docs/escaped.yaml!}\n", root, sourceFile)).toThrow("symlink escapes");
      expect(() => cleanArgoCdMarkdown([
        "````text",
        "`````not-a-close",
        "{!docs/partial.md!}",
        "````",
      ].join("\n"), root, sourceFile)).toThrow("must not appear inside a fenced code block");
    } finally {
      rmSync(root, { recursive: true, force: true });
      rmSync(outside, { recursive: true, force: true });
    }
  });
});

describe("Argo CD source selection and sync", () => {
  test("excludes proposals and syncs product documentation", () => {
    const root = mkdtempSync(join(tmpdir(), "argocd-docs-sync-"));
    const docsDir = join(root, "docs");
    const outDir = join(root, "out");
    try {
      mkdirSync(join(docsDir, "proposals"), { recursive: true });
      mkdirSync(join(docsDir, "user-guide"), { recursive: true });
      writeFileSync(join(docsDir, "index.md"), "# Overview\n");
      writeFileSync(join(docsDir, "user-guide/page.md"), "# User guide\n");
      writeFileSync(join(docsDir, "proposals/draft.md"), "# Draft\n");
      writeFileSync(join(docsDir, "image.png"), "not markdown\n");
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, "stale.md"), "stale\n");

      const files = collectArgoCdDocs(docsDir, 0);
      expect(files).toEqual(["index.md", "user-guide/page.md"]);
      expect(syncArgoCdFiles(files, docsDir, outDir, root)).toEqual({ copied: 2, skipped: 0 });
      expect(readFileSync(join(outDir, "user-guide/page.md"), "utf-8")).toContain("# User guide");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("redacts documented fixed credential-like examples", () => {
    const root = mkdtempSync(join(tmpdir(), "argocd-docs-redaction-"));
    const sourceFile = join(root, "docs/page.md");
    try {
      const output = cleanArgoCdMarkdown([
        "- ClientSecret: `example-client-secret-value-with-more-than-thirty-two-characters`",
        "pushover-token: examplepushovertokenvalue",
        "plugin.myplugin.token: \"ZXhhbXBsZS1wbHVnaW4tdG9rZW4=\"",
        "clientSecret: literal-client-secret",
        "Authorization: Bearer literal-example-token",
        "Authorization: Bearer <example-token>",
        "curl --user \"ci-connector:literal-client-secret\" https://example.invalid/token",
        "curl -u \"$CI_USER:$CI_PASSWORD\" https://example.invalid/token",
        "clientSecret: $oidc.example.clientSecret",
        "password: my-password",
        "password: $PASSWORD",
        "-p password=abc123",
        "--parameter password=<user-password>",
        "https://username:password@example.invalid/repository.git",
        "https://$USER:$PASSWORD@example.invalid/repository.git",
        "https://{user}:{password}@example.invalid/repository.git",
        "https://EXAMPLE_USER:EXAMPLE_PASSWORD@example.invalid/repository.git",
        "https://XXXXX:XXXXX@example.invalid/repository.git",
        "Cookie: argocd.token=literal-session-token",
        "token: xoxb-example",
        "jwt: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmdvY2QifQ.signature",
        "sshPrivateKey: |",
        `  -----BEGIN OPENSSH ${"PRIVATE"} KEY-----`,
        "  not-a-real-key",
        `  -----END OPENSSH ${"PRIVATE"} KEY-----`,
      ].join("\n"), root, sourceFile);
      expect(output).toContain("EXAMPLE_CLIENT_SECRET");
      expect(output).toContain("EXAMPLE_PUSHOVER_TOKEN");
      expect(output).toContain("EXAMPLE_PLUGIN_TOKEN");
      expect(output).toContain("EXAMPLE_CLIENT_SECRET");
      expect(output).toContain("$ARGOCD_AUTH_TOKEN");
      expect(output).toContain("curl --user $ARGOCD_AUTH_USERNAME:$ARGOCD_AUTH_PASSWORD");
      expect(output).toContain("curl -u \"$CI_USER:$CI_PASSWORD\"");
      expect(output).toContain("EXAMPLE_ARGOCD_TOKEN");
      expect(output).toContain("EXAMPLE_SLACK_BOT_TOKEN");
      expect(output).toContain("EXAMPLE_JWT");
      expect(output).toContain("EXAMPLE_PRIVATE_KEY_PEM");
      expect(output).toContain("clientSecret: $oidc.example.clientSecret");
      expect(output).toContain("password: EXAMPLE_PASSWORD");
      expect(output).toContain("password: $PASSWORD");
      expect(output).toContain("-p password=EXAMPLE_PASSWORD");
      expect(output).toContain("--parameter password=<user-password>");
      expect(output).toContain("https://EXAMPLE_USER:EXAMPLE_PASSWORD@example.invalid/repository.git");
      expect(output).toContain("https://$USER:$PASSWORD@example.invalid/repository.git");
      expect(output).toContain("https://{user}:{password}@example.invalid/repository.git");
      expect(output).toContain("https://XXXXX:XXXXX@example.invalid/repository.git");
      expect(output).not.toContain("example-client-secret-value-with-more-than-thirty-two-characters");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("requires a clean shallow official master source checkout", () => {
    const origin = "https://github.com/argoproj/argo-cd.git";
    expect(() => assertSafeArgoCdCheckout(" M docs/index.md\n", "master\n", origin, "true\n")).toThrow("dirty");
    expect(() => assertSafeArgoCdCheckout("", "main\n", origin, "true\n")).toThrow("expected master");
    expect(() => assertSafeArgoCdCheckout("", "master\n", "https://github.com/example/fork.git\n", "true\n")).toThrow("unexpected origin");
    expect(() => assertSafeArgoCdCheckout("", "master\n", origin, "false\n")).toThrow("non-shallow");
    expect(() => assertSafeArgoCdCheckout("", "master\n", origin, "true\n")).not.toThrow();
  });
});
