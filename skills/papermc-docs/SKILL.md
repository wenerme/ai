---
name: papermc-docs
description: "PaperMC documentation — high-performance Minecraft Java server (Paper), Velocity proxy, and Adventure text API. Covers server admin (config, Aikar's flags, anti-xray, profiling, migration from Spigot), plugin development (Brigadier commands, events, Component/Adventure/MiniMessage, entity/inventory API, scheduler, PDC, Folia), Velocity proxy (forwarding, security, tuning), and Adventure library (serializers, MiniMessage format). USE THIS SKILL WHEN the user asks about PaperMC, Paper server, Velocity, Bukkit plugins, Adventure API, MiniMessage, or Minecraft Java server."
version: 0.1.0
---

# PaperMC Documentation

Official docs for [PaperMC](https://papermc.io) — high-performance Minecraft server software, Velocity proxy, and Adventure text library.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (191 docs)

### Paper Server — Admin (25 docs)

#### Getting Started
- `references/paper/admin/getting-started/getting-started.mdx` — Installation & first run
- `references/paper/admin/getting-started/adding-plugins.md` — Adding plugins
- `references/paper/admin/getting-started/migration.md` — Migration from Spigot/CraftBukkit
- `references/paper/admin/getting-started/next-steps.md` — Next steps

#### How-To Guides
- `references/paper/admin/how-to/aikars-flags.md` — Aikar's JVM flags (memory tuning)
- `references/paper/admin/how-to/anti-xray.mdx` — Anti-xray configuration
- `references/paper/admin/how-to/profiling.md` — Performance profiling (spark/timings)
- `references/paper/admin/how-to/basic-troubleshooting.mdx` — Troubleshooting guide
- `references/paper/admin/how-to/update.md` — Updating Paper
- `references/paper/admin/how-to/vanilla.mdx` — Vanilla behavior differences

#### Configuration Reference
- `references/paper/admin/reference/configuration/server-properties.mdx` — server.properties
- `references/paper/admin/reference/configuration/bukkit-configuration.mdx` — bukkit.yml
- `references/paper/admin/reference/configuration/spigot-configuration.mdx` — spigot.yml
- `references/paper/admin/reference/configuration/global-configuration.mdx` — paper-global.yml
- `references/paper/admin/reference/configuration/world-configuration.mdx` — paper-world.yml
- `references/paper/admin/reference/configuration/vanilla-data-files.mdx` — Vanilla data files
- `references/paper/admin/reference/configuration/bukkit-commands-configuration.mdx` — commands.yml
- `references/paper/admin/reference/configuration/bukkit-help-configuration.mdx` — help.yml
- `references/paper/admin/reference/configuration/bukkit-permissions-configuration.mdx` — permissions.yml

#### Reference
- `references/paper/admin/reference/commands.md` — Commands
- `references/paper/admin/reference/cli-arguments.md` — CLI arguments
- `references/paper/admin/reference/system-properties.md` — System properties
- `references/paper/admin/reference/paper-plugins.md` — Paper plugins vs Bukkit plugins
- `references/paper/admin/reference/vanilla-command-permissions.md` — Vanilla command permissions

#### Misc
- `references/paper/admin/misc/faq.md` — FAQ
- `references/paper/admin/misc/paper-bug-fixes.md` — Paper bug fixes list
- `references/paper/admin/misc/update-checker.md` — Update checker

### Paper Server — Plugin Development (50+ docs)

#### Getting Started
- `references/paper/dev/getting-started/how-do-plugins-work.md` — How plugins work
- `references/paper/dev/getting-started/project-setup.mdx` — Project setup (Gradle)
- `references/paper/dev/getting-started/plugin-yml.mdx` — plugin.yml / paper-plugin.yml
- `references/paper/dev/getting-started/paper-plugins.md` — Paper plugin system
- `references/paper/dev/getting-started/userdev.md` — paperweight-userdev (NMS access)

#### Command API (Brigadier)
- `references/paper/dev/api/command-api/basics/introduction.md` — Command API introduction
- `references/paper/dev/api/command-api/basics/arguments-and-literals.md` — Arguments & literals
- `references/paper/dev/api/command-api/basics/command-tree.mdx` — Command tree structure
- `references/paper/dev/api/command-api/basics/executors.md` — Executors
- `references/paper/dev/api/command-api/basics/requirements.md` — Requirements (permissions)
- `references/paper/dev/api/command-api/basics/custom-arguments.md` — Custom arguments
- `references/paper/dev/api/command-api/basics/argument-suggestions.mdx` — Argument suggestions
- `references/paper/dev/api/command-api/basics/registration.md` — Registration
- `references/paper/dev/api/command-api/arguments/` — Argument types: adventure, entity-player, enums, location, minecraft, paper, predicate, registry (9 docs)

#### Event System
- `references/paper/dev/api/event-api/event-listeners.md` — Event listeners
- `references/paper/dev/api/event-api/handler-lists.md` — Handler lists
- `references/paper/dev/api/event-api/custom-events.md` — Custom events
- `references/paper/dev/api/event-api/chat-event.md` — Chat events

#### Component API (Adventure)
- `references/paper/dev/api/component-api/intro.md` — Component API intro
- `references/paper/dev/api/component-api/audiences.md` — Audiences
- `references/paper/dev/api/component-api/i18n.md` — Internationalization
- `references/paper/dev/api/component-api/signed-messages.md` — Signed messages

#### Entity, Inventory, Lifecycle
- `references/paper/dev/api/entity-api/display-entities.md` — Display entities
- `references/paper/dev/api/entity-api/entity-teleport.md` — Entity teleport
- `references/paper/dev/api/inventories/menu-type-api.md` — Menu type API
- `references/paper/dev/api/inventories/custom-inventory-holder.md` — Custom inventory holder
- `references/paper/dev/api/lifecycle/lifecycle.md` — Plugin lifecycle
- `references/paper/dev/api/lifecycle/datapacks.mdx` — Datapacks

#### Other APIs
- `references/paper/dev/api/scheduler.md` — Scheduler (async/sync tasks)
- `references/paper/dev/api/pdc.md` — Persistent Data Container
- `references/paper/dev/api/registries.md` — Registries
- `references/paper/dev/api/recipes.md` — Recipes
- `references/paper/dev/api/particles.mdx` — Particles
- `references/paper/dev/api/plugin-messaging.md` — Plugin messaging
- `references/paper/dev/api/plugin-configs.mdx` — Plugin configs
- `references/paper/dev/api/data-component-api.md` — Data component API
- `references/paper/dev/api/folia-support.md` — Folia support
- `references/paper/dev/api/dialogs.mdx` — Dialogs API
- `references/paper/dev/api/roadmap.md` — API roadmap

#### Misc
- `references/paper/dev/misc/databases.md` — Database usage
- `references/paper/dev/misc/debugging.md` — Debugging plugins
- `references/paper/dev/misc/reading-stacktraces.md` — Reading stacktraces
- `references/paper/dev/misc/internal-code.md` — Internal code usage

### Velocity Proxy (20+ docs)

#### Admin
- `references/velocity/admin/getting-started/getting-started.md` — Installation
- `references/velocity/admin/getting-started/why-velocity.md` — Why Velocity
- `references/velocity/admin/getting-started/forwarding.md` — Player forwarding (modern/legacy)
- `references/velocity/admin/getting-started/faq.md` — FAQ
- `references/velocity/admin/how-to/security.md` — Security hardening
- `references/velocity/admin/how-to/tuning.md` — Performance tuning
- `references/velocity/admin/how-to/migration.md` — Migration from BungeeCord
- `references/velocity/admin/reference/configuration.md` — Configuration
- `references/velocity/admin/reference/commands.md` — Commands
- `references/velocity/admin/reference/server-compatibility.mdx` — Server compatibility
- `references/velocity/admin/reference/system-properties.md` — System properties

#### Plugin Development
- `references/velocity/dev/getting-started/creating-your-first-plugin.mdx` — First plugin
- `references/velocity/dev/getting-started/api-basics.md` — API basics
- `references/velocity/dev/getting-started/pitfalls.md` — Common pitfalls
- `references/velocity/dev/api/event.md` — Event API
- `references/velocity/dev/api/command.md` — Command API
- `references/velocity/dev/api/scheduler.md` — Scheduler
- `references/velocity/dev/api/plugin-messaging.md` — Plugin messaging
- `references/velocity/dev/how-to/dependencies.md` — Dependencies

### Folia (5 docs)

- `references/folia/admin/reference/overview.md` — Folia overview
- `references/folia/admin/reference/region-logic.md` — Region threading logic
- `references/folia/admin/reference/faq.md` — FAQ

### Adventure Library (35+ docs)

- `references/adventure/text.md` — Text components
- `references/adventure/minimessage/format.mdx` — MiniMessage format syntax
- `references/adventure/minimessage/api.mdx` — MiniMessage API
- `references/adventure/minimessage/dynamic-replacements.md` — Dynamic replacements
- `references/adventure/minimessage/translator.md` — Translator
- `references/adventure/serializer/json.md` — JSON serializer
- `references/adventure/serializer/gson.mdx` — GSON serializer
- `references/adventure/serializer/legacy.mdx` — Legacy serializer (section signs)
- `references/adventure/serializer/plain.mdx` — Plain text serializer
- `references/adventure/serializer/ansi.mdx` — ANSI serializer
- `references/adventure/audiences.md` — Audiences
- `references/adventure/bossbar.md` — Boss bars
- `references/adventure/book.md` — Books
- `references/adventure/titles.md` — Titles
- `references/adventure/tablist.md` — Tab list
- `references/adventure/sound.md` — Sounds
- `references/adventure/resource-pack.md` — Resource packs
- `references/adventure/localization.md` — Localization
- `references/adventure/platform/` — Platform integrations: Bukkit, BungeeCord, Fabric, NeoForge, Sponge, ViaVersion (10 docs)
- `references/adventure/migration/` — Migration guides (3 docs)
- `references/adventure/faq.md` — FAQ

### Misc (8 docs)

- `references/misc/java-install.md` — Java installation guide
- `references/misc/contact.md` — Contact info
- `references/misc/hangar-publishing.md` — Publishing to Hangar
- `references/misc/tools/start-script-gen.mdx` — Start script generator
- `references/misc/tools/diff-viewer.md` — Diff viewer tool
- `references/misc/tools/minimessage-web-editor.md` — MiniMessage web editor
- `references/misc/tools/item-command-converter.mdx` — Item command converter

### Contributing (2 docs)

- `references/paper/contributing/events.md` — Contributing events
