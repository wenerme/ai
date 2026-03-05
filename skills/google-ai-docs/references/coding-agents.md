AI coding assistants are powerful but have limitations---training data cuts off
at a specific date, missing new API features and changes. Without access to
Gemini-specific documentation, agents may suggest generic patterns instead of
optimized approaches.

The [Gemini API development skill](https://github.com/google-gemini/gemini-skills)
addresses these gaps by giving your coding
agent direct access to the latest Gemini API documentation, integration
patterns, and best practices. This ensures your agent can offer more accurate
and specific code examples and guidance. By leveraging this skill, your coding
assistant stays current with the evolving Gemini API and its recommended usage.

## What the skill provides

The Gemini API development skill (`gemini-api-dev`):

- Points your coding agent to official Gemini API documentation
- Provides best practices for building Gemini-powered applications
- Includes recommended patterns for common integrations

The following sections describe the installation methods based on your preferred
skill management ecosystem. Both install the same skill---run these commands in
your terminal from any directory.

- **[skills.sh](https://skills.sh)**: Recommended. The open standard for portable agent behaviors.
- **[Context7](https://context7.com)**: Supported for users already utilizing the Context7 ecosystem.

### Install with skills.sh

    # List available skills
    npx skills add google-gemini/gemini-skills --list

    # Install the gemini-api-dev skill globally
    npx skills add google-gemini/gemini-skills --skill gemini-api-dev --global

### Install with Context7

    # Interactively browse and install skills
    npx ctx7 skills install /google-gemini/gemini-skills

    # Install a specific skill directly
    npx ctx7 skills install /google-gemini/gemini-skills gemini-api-dev

## Verify installation

After installing, confirm that your coding agent has indexed the skill and can
access the live Gemini API documentation.

### 1. Verify agent behavior

The most reliable way to verify is to ask your agent a technical question about Gemini API.

**Prompt:** "How do I use context caching with the Gemini API?"

A successful installation will:

- Reference specific Gemini methods like `cacheContent` or `cachedContents.create`.
- Show an indicator that it is "Using skill: gemini-api-dev".

### Verify manifest

If the agent gives a generic answer, use the specific "discovery" command for
your environment to verify the skill is loaded.

| Environment | Verification method |
|---|---|
| Claude Code | Type `/skills` in the terminal to list all active manifests. |
| Cursor | Open **Settings \> Rules** . Verify `gemini-api-dev` appears under "Agent Decides." |
| Antigravity | Type `/skills list` or check the **Customizations \> Rules** sidebar. |
| Gemini CLI | Run `gemini skills list` or use the `/skills` slash command in-session. |
| Copilot | Type `@gemini /skills` (or just `/skills`) to view active extensions. |

## Troubleshooting

If your agent provides only general information or fails to recognize
Gemini-specific methods, check the following:

### Agent didn't discover the skill

Most agents index skills only on startup.

**Fix:** Completely restart your IDE (Cursor/VS Code) or exit and re-open your
terminal-based agent (Claude Code).

### Global vs. local conflict

If you installed with the `--global` flag, your agent might be ignoring it in
favor of project-specific rules.

**Fix:** Try installing the skill directly into your project root without the
global flag:

    npx skills add google-gemini/gemini-skills --skill gemini-api-dev

## Resources

- [Gemini API skills on GitHub](https://github.com/google-gemini/gemini-skills)
- [Quickstart](https://ai.google.dev/gemini-api/docs/quickstart)
- [Libraries](https://ai.google.dev/gemini-api/docs/libraries)