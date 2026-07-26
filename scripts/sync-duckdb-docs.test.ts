import { describe, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  assertSafeDuckDbCheckout,
  cleanDuckDbMarkdown,
  DUCKDB_DOC_SKILLS,
  syncDuckDbFiles,
  validateDuckDbPartition,
} from "./sync-duckdb-docs.ts";

describe("DuckDB Markdown cleanup", () => {
  test("removes Jekyll presentation syntax and preserves code fences", () => {
    const source = [
      "---",
      "layout: docu",
      "title: Example",
      "redirect_from:",
      "- /docs/example",
      "---",
      "",
      "[Query]({% link docs/current/sql/query_syntax/select.md %})",
      "{% if site.current_duckdb_version != \"\" %}{{ site.current_duckdb_version }}{% else %}LTS{% endif %}",
      "{% include tooltip.html label=\"Primary\" id=\"support\" %}",
      "{: .codebox-server}",
      "<div><span>Visible text</span></div>",
      "{% raw %}Template literal{% endraw %}",
      "Use `SELECT 42`{:.language-sql .highlight}.",
      "[ODBC](https://github.com/duckdb/duckdb-odbc/releases/download/v{% if site.current_duckdb_odbc_version != \"\" %}{{ site.current_duckdb_odbc_version }}{% else %}{{ site.lts_duckdb_odbc_version }}{% endif %}/driver.zip)",
      "[JAR](https://repo1.maven.org/maven2/org/duckdb/duckdb_jdbc/{{ site.current_duckdb_java_version }}/driver.jar)",
      "[Announcement]({% post_url 2026-05-12-quack-remote-protocol %})",
      "",
      "```sql",
      "SELECT '{% link docs/current/sql/unchanged.md %}';",
      "{: .keep-in-code}",
      "```",
    ].join("\n");

    const cleaned = cleanDuckDbMarkdown(source);
    expect(cleaned).toStartWith("# Example\n");
    expect(cleaned).toContain("[Query](https://duckdb.org/docs/current/sql/query_syntax/select.html)");
    expect(cleaned).toContain("current release");
    expect(cleaned).not.toContain("LTS");
    expect(cleaned).toContain("Primary");
    expect(cleaned).toContain("Visible text");
    expect(cleaned).toContain("Use `SELECT 42`.");
    expect(cleaned).not.toContain("{:.language-sql .highlight}");
    expect(cleaned).toContain("Template literal");
    expect(cleaned).not.toContain("{% raw %}");
    expect(cleaned).toContain("[ODBC](https://github.com/duckdb/duckdb-odbc/releases)");
    expect(cleaned).toContain("[JAR](https://repo1.maven.org/maven2/org/duckdb/duckdb_jdbc/)");
    expect(cleaned).not.toMatch(/\]\([^)]*current release[^)]*\)/);
    expect(cleaned).toContain("[Announcement](https://duckdb.org/2026/05/12/quack-remote-protocol.html)");
    expect(cleaned).not.toContain("{: .codebox-server}");
    expect(cleaned).toContain("SELECT '{% link docs/current/sql/unchanged.md %}';");
    expect(cleaned).toContain("{: .keep-in-code}");
  });

  test("redacts fixed key, token, and URI credential examples inside code fences", () => {
    const cleaned = cleanDuckDbMarkdown([
      "```sql",
      "PRAGMA add_parquet_key('key128', '0123456789112345');",
      "PRAGMA add_parquet_key('key256base64', 'MDEyMzQ1Njc4OTExMjM0NTAxMjM0NTY3ODkxMTIzNDU=');",
      "INSERT INTO quack_tokens VALUES ('analytics-team-token', 'analytics');",
      "FROM 's3://bucket/file.parquet?s3_access_key_id=accessKey&s3_secret_access_key=secretKey';",
      "ATTACH 'ducklake:postgres:postgresql://username:pwd@127.0.0.1:5432/lake1';",
      "```",
    ].join("\n"));
    expect(cleaned).toContain("EXAMPLE_PARQUET_ENCRYPTION_KEY");
    expect(cleaned).toContain("EXAMPLE_QUACK_TOKEN");
    expect(cleaned).toContain("EXAMPLE_S3_ACCESS_KEY_ID");
    expect(cleaned).toContain("EXAMPLE_S3_SECRET_ACCESS_KEY");
    expect(cleaned).toContain("postgresql://EXAMPLE_USER:EXAMPLE_PASSWORD@127.0.0.1:5432/lake1");
    expect(cleaned).not.toContain("analytics-team-token");
    expect(cleaned).not.toContain("username:pwd@");
    expect(cleaned).not.toContain("0123456789112345");
    expect(cleaned).not.toContain("MDEyMzQ1Njc4OTExMjM0NTAxMjM0NTY3ODkxMTIzNDU=");
  });

  test("preserves indented fenced code bytes while trimming prose whitespace", () => {
    const cleaned = cleanDuckDbMarkdown("Prose with space   \n\n    ```sql\n    SELECT 1;  \n    ```\n");
    expect(cleaned).toContain("Prose with space\n");
    expect(cleaned).toContain("    SELECT 1;  \n");
  });

  test("preserves a document that starts with an indented code fence", () => {
    const source = "    ```sql\n    SELECT 1;  \n    ```\n";
    expect(cleanDuckDbMarkdown(source)).toBe(source);
  });

  test("preserves indented fence bytes through the production file sync path", () => {
    const root = mkdtempSync(join(tmpdir(), "duckdb-docs-sync-"));
    const sourceDir = join(root, "source");
    const outDir = join(root, "out");
    const relative = "clients/example.md";
    const source = "Prose   \n\n    ```sql\n    SELECT 1;  \n\n\n    ```\n";
    try {
      mkdirSync(join(sourceDir, "clients"), { recursive: true });
      writeFileSync(join(sourceDir, relative), source);
      expect(syncDuckDbFiles([relative], sourceDir, outDir)).toEqual({ copied: 1, skipped: 0 });
      const output = readFileSync(join(outDir, relative), "utf8");
      expect(output).toContain("Prose\n");
      expect(output).toContain("    SELECT 1;  \n\n\n    ```\n");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test("converts homepage box cards into Markdown links", () => {
    const cleaned = cleanDuckDbMarkdown([
      '    <div class="box-link third-width">',
      '        <a href="{% link docs/current/connect/overview.md %}"></a>',
      '        <span class="symbol"><img src="{% link images/icons/link.svg %}"></span>',
      '        <span>DuckDB connection overview</span>',
      '        <svg class="chevron"><use href="#chevron-right"></use></svg>',
      "    </div>",
    ].join("\n"));
    expect(cleaned).toContain("[DuckDB connection overview](https://duckdb.org/docs/current/connect/overview.html)");
    expect(cleaned).toMatch(/^\[DuckDB connection overview\]/m);
    expect(cleaned).not.toContain("<a href=");
  });
});

describe("DuckDB docs/current partition", () => {
  test("owns every markdown file exactly once and ignores non-Markdown metadata", () => {
    const root = mkdtempSync(join(tmpdir(), "duckdb-docs-partition-"));
    try {
      for (const directory of [
        "clients", "configuration", "connect", "core_extensions", "data", "dev",
        "extensions", "guides", "internals", "operations_manual", "quack", "sql",
      ]) {
        mkdirSync(join(root, directory), { recursive: true });
        writeFileSync(join(root, directory, "page.md"), `# ${directory}\n`);
      }
      writeFileSync(join(root, "index.md"), "# Documentation\n");
      writeFileSync(join(root, "lakehouse_formats.md"), "# Lakehouse formats\n");
      mkdirSync(join(root, "new_area"), { recursive: true });
      writeFileSync(join(root, "new_area", "page.md"), "# New area\n");
      writeFileSync(join(root, "new_root_page.md"), "# New root page\n");
      writeFileSync(join(root, "functions.json"), "[]\n");

      const groups = DUCKDB_DOC_SKILLS.map((group) => ({ ...group }));
      const manifests = validateDuckDbPartition(root, groups, 0);
      expect([...manifests.values()].flat()).toHaveLength(16);
      expect(manifests.get("duckdb-extensions")).toEqual([
        "core_extensions/page.md",
        "extensions/page.md",
      ]);
      expect(manifests.get("duckdb-docs")).toContain("index.md");
      expect(manifests.get("duckdb-docs")).toContain("lakehouse_formats.md");
      expect(manifests.get("duckdb-docs")).toContain("new_area/page.md");
      expect(manifests.get("duckdb-docs")).toContain("new_root_page.md");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});

describe("DuckDB source checkout safety", () => {
  test("rejects dirty or non-main source checkouts", () => {
    expect(() => assertSafeDuckDbCheckout(" M docs/current/index.md\n", "main\n")).toThrow("dirty");
    expect(() => assertSafeDuckDbCheckout("", "feature/docs\n")).toThrow("expected main");
    expect(() => assertSafeDuckDbCheckout("", "main\n")).not.toThrow();
  });
});
