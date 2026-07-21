import { describe, expect, test } from "bun:test";
import { assertCodeSnippetTargets, cleanStorybookMdx, codeSnippetPaths } from "./sync-storybook-docs.ts";

describe("Storybook MDX cleanup", () => {
  test("links reusable snippets and preserves renderer conditions", () => {
    const source = [
      "---",
      "title: Install Storybook",
      "sidebar:",
      "  order: 2",
      "---",
      "import { Callout } from '@storybook/blocks';",
      "",
      '<CodeSnippets path="create-command.md" variant="new-users" copyEvent="CreateCommandCopy" />',
      "",
      '<Callout variant="info">',
      "Useful setup guidance.",
      "</Callout>",
      "",
      '<If renderer="react">',
      "React-only guidance.",
      "</If>",
      "",
      '<If notRenderer="angular">',
      "Non-Angular guidance.",
      "</If>",
      "",
      '<Video src="../_assets/demo.mp4" />',
      '<YouTubeCallout id="abc" />',
      "<HomeRenderers />",
    ].join("\n");

    const cleaned = cleanStorybookMdx(source);
    expect(cleaned).toContain("> Code snippet: `_snippets/create-command.md` (variant: `new-users`)");
    expect(cleaned).toContain("Useful setup guidance.");
    expect(cleaned).toContain("> **Renderer: `react`**");
    expect(cleaned).toContain("> **Except renderer: `angular`**");
    expect(cleaned).not.toContain("import { Callout }");
    expect(cleaned).not.toContain("copyEvent");
    expect(cleaned).not.toContain("<Callout");
    expect(cleaned).not.toContain("<Video");
    expect(cleaned).not.toContain("<YouTubeCallout");
    expect(cleaned).not.toContain("<HomeRenderers");
    expect(cleaned).toEndWith("\n");
    expect(cleaned).not.toEndWith("\n\n");
  });

  test("does not rewrite example MDX inside code fences", () => {
    const source = [
      "```mdx",
      '<CodeSnippets path="keep-as-example.md" />',
      '<If renderer="vue">',
      "  <Video src=\"example.mp4\" />",
      "</If>",
      "```",
    ].join("\n");

    const cleaned = cleanStorybookMdx(source);
    expect(cleaned).toContain(source);
    expect(codeSnippetPaths(source)).toEqual([]);
  });

  test("does not rewrite indented fences or longer closing fences", () => {
    const source = [
      "  ````mdx",
      '  <CodeSnippets path="keep-as-list-example.md" />',
      '  <If renderer="vue">',
      "    import example from './example'",
      "  </If>",
      "  `````",
    ].join("\n");

    const cleaned = cleanStorybookMdx(source);
    expect(cleaned).toContain(source);
    expect(codeSnippetPaths(source)).toEqual([]);
  });
});

describe("CodeSnippets source validation", () => {
  test("accepts every prose reference with a mirrored target", () => {
    const documents = [{ path: "get-started/install.mdx", content: '<CodeSnippets path="create-command.md" />' }];
    expect(() => assertCodeSnippetTargets(documents, new Set(["_snippets/create-command.md"]))).not.toThrow();
  });

  test("rejects missing or unsafe snippet paths", () => {
    expect(() => assertCodeSnippetTargets(
      [{ path: "get-started/install.mdx", content: '<CodeSnippets path="missing.md" />' }],
      new Set(["_snippets/create-command.md"]),
    )).toThrow("missing.md");
    expect(() => codeSnippetPaths('<CodeSnippets path="../outside.md" />')).toThrow("Invalid CodeSnippets path");
  });
});
