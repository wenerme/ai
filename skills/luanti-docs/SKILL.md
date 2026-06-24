---
name: luanti-docs
description: "Luanti (formerly Minetest) documentation — open-source voxel game engine. Covers Lua modding API, server hosting (Linux/Docker/database backends), mod development (mapgen, models, schematics, player physics), player guides (commands, privileges, minetest.conf), and engine internals (network protocol, compiling). USE THIS SKILL WHEN the user asks about Luanti, Minetest, Luanti server, Luanti modding, Lua API, or minetest.conf."
version: 0.1.0
---

# Luanti Documentation

Official docs for [Luanti](https://luanti.org) (formerly Minetest) — an open-source voxel game engine.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (175 docs)

### Engine API Reference (19 docs)

- `references/engine/lua_api.md` — **Server-side Lua API** (comprehensive modding reference)
- `references/engine/client_lua_api.md` — Client-side Lua API
- `references/engine/menu_lua_api.md` — Main menu Lua API
- `references/engine/sscsm_api.md` — Server-Sent Client-Side Mods API
- `references/engine/sscsm_security.md` — SSCSM security model
- `references/engine/builtin_entities.md` — Builtin entities (__builtin:item, __builtin:falling_node)
- `references/engine/world_format.md` — World/map format specification
- `references/engine/texture_packs.md` — Texture pack structure
- `references/engine/docker_server.md` — Docker server image usage
- `references/engine/direction.md` — Project roadmap
- `references/engine/breakages.md` — Breaking changes in next version
- `references/engine/android.md` — Android-specific issues
- `references/engine/compiling/linux.md` — Compiling on Linux
- `references/engine/compiling/macos.md` — Compiling on macOS
- `references/engine/compiling/windows.md` — Compiling on Windows
- `references/engine/developing/docker.md` — Dev with Docker
- `references/engine/developing/profiling.md` — Performance profiling
- `references/engine/developing/os-compatibility.md` — OS compatibility
- `references/engine/developing/android.md` — Android development

### Server Hosting (12 docs)

- `references/site/for-server-hosts/_index.md` — Server hosting overview
- `references/site/for-server-hosts/setup/_index.md` — Setup overview
- `references/site/for-server-hosts/setup/linux.md` — Linux server setup
- `references/site/for-server-hosts/setup/windows.md` — Windows server setup
- `references/site/for-server-hosts/setup/containers.md` — Docker/container setup
- `references/site/for-server-hosts/setup/truenas.md` — TrueNAS setup
- `references/site/for-server-hosts/setup/ip-address.md` — IP address & port forwarding
- `references/site/for-server-hosts/database-backends.md` — Database backends (SQLite, PostgreSQL, Redis)
- `references/site/for-server-hosts/backup-solutions.md` — Backup strategies
- `references/site/for-server-hosts/remote-media.md` — Remote media server (HTTP texture download)
- `references/site/for-server-hosts/prometheus-metrics.md` — Prometheus monitoring
- `references/site/for-server-hosts/domain.md` — Domain name setup

### Mod Development — API (16 docs)

- `references/site/for-creators/api/_index.md` — API overview
- `references/site/for-creators/api/lua-environment.md` — Lua environment
- `references/site/for-creators/api/luajit.md` — LuaJIT specifics
- `references/site/for-creators/api/filesystem.md` — Filesystem access
- `references/site/for-creators/api/http-api.md` — HTTP API
- `references/site/for-creators/api/modchannels.md` — Mod channels
- `references/site/for-creators/api/persistence.md` — Data persistence (mod storage)
- `references/site/for-creators/api/texture-modifiers.md` — Texture modifiers
- `references/site/for-creators/api/timing-and-event-loop.md` — Timing and event loop
- `references/site/for-creators/api/object-properties.md` — Object properties
- `references/site/for-creators/api/classes/_index.md` — API classes overview
- `references/site/for-creators/api/classes/vector.md` — Vector class
- `references/site/for-creators/api/classes/raycast.md` — Raycast class
- `references/site/for-creators/api/classes/metadata.md` — Metadata class
- `references/site/for-creators/api/classes/nodemetadata.md` — NodeMetadata
- `references/site/for-creators/api/classes/itemstackmetadata.md` — ItemStackMetadata
- `references/site/for-creators/api/classes/playermetadata.md` — PlayerMetadata
- `references/site/for-creators/api/classes/modstorage.md` — ModStorage
- `references/site/for-creators/api/classes/random.md` — PseudoRandom / PcgRandom
- `references/site/for-creators/api/classes/voxelarea.md` — VoxelArea

### Mod Development — Guides (30+ docs)

- `references/site/for-creators/creating-mods.md` — Creating mods guide
- `references/site/for-creators/creating-texture-packs.md` — Creating texture packs
- `references/site/for-creators/groups.md` — Groups system
- `references/site/for-creators/hand.md` — Hand tool
- `references/site/for-creators/textures.md` — Texture creation
- `references/site/for-creators/player-physics.md` — Player physics
- `references/site/for-creators/player-world-interaction.md` — Player-world interaction
- `references/site/for-creators/schematic.md` — Schematics
- `references/site/for-creators/spawn-algorithm.md` — Spawn algorithm
- `references/site/for-creators/l-system-trees.md` — L-system trees
- `references/site/for-creators/mapgen/` — Map generation (5 docs)
- `references/site/for-creators/models/` — 3D models: B3D, OBJ, Blender, Blockbench (4 docs)
- `references/site/for-creators/translation/` — Translation/i18n (4 docs)
- `references/site/for-creators/lua-conventions.md` — Lua conventions
- `references/site/for-creators/lua-optimization-tips.md` — Lua optimization
- `references/site/for-creators/mod-dependency-management.md` — Mod dependencies
- `references/site/for-creators/mod-interoperability.md` — Mod interoperability
- `references/site/for-creators/modding-tips.md` — Modding tips
- `references/site/for-creators/debug.md` — Debugging mods
- `references/site/for-creators/development-setup.md` — Dev setup
- `references/site/for-creators/development-tools.md` — Dev tools
- `references/site/for-creators/licensing.md` — Licensing guide
- `references/site/for-creators/limitations.md` — Engine limitations
- `references/site/for-creators/warnings.md` — Common warnings

### Player Guides (30+ docs)

- `references/site/for-players/getting-started.md` — Getting started
- `references/site/for-players/controls.md` — Controls
- `references/site/for-players/chat.md` — Chat
- `references/site/for-players/server-commands.md` — Server commands
- `references/site/for-players/privileges.md` — Privileges system
- `references/site/for-players/inventory.md` — Inventory
- `references/site/for-players/nodes.md` — Nodes
- `references/site/for-players/items.md` — Items
- `references/site/for-players/mobs.md` — Mobs
- `references/site/for-players/worlds.md` — Worlds
- `references/site/for-players/mods.md` — Installing mods
- `references/site/for-players/servers.md` — Joining servers
- `references/site/for-players/minetest-conf.md` — minetest.conf reference
- `references/site/for-players/troubleshooting.md` — Troubleshooting
- And more: mining, light, liquid, texture-packs, coordinates, gamepads, hud, etc.

### Engine Development (15+ docs)

- `references/site/for-engine-devs/structure.md` — Engine code structure
- `references/site/for-engine-devs/script-engine.md` — Script engine internals
- `references/site/for-engine-devs/network-protocol.md` — Network protocol
- `references/site/for-engine-devs/objects.md` — Object system
- `references/site/for-engine-devs/basic-data-structures.md` — Core data structures
- `references/site/for-engine-devs/code-style-guidelines.md` — C++ code style
- `references/site/for-engine-devs/lua-code-style-guidelines.md` — Lua code style
- `references/site/for-engine-devs/git-guidelines.md` — Git guidelines
- `references/site/for-engine-devs/compiling/` — Compiling guides (4 docs)
- `references/site/for-engine-devs/profiler-graph.md` — Profiler graph

### About / FAQ (10+ docs)

- `references/site/about/faq.md` — FAQ
- `references/site/about/glossary.md` — Glossary
- `references/site/about/contentdb.md` — ContentDB
- `references/site/about/changelog.md` — Changelog
- `references/site/about/history/` — Project history
