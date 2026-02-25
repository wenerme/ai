# Skills

AI Agent Skills 备份与追踪。

## 什么是 Skill

Skill（技能）是 AI Agent 的**可复用知识单元**，本质上是人类知识的蒸馏内容，包括 SOP、参考文档、脚本等。

> Agent Skills 规范由 Anthropic 推动，是一个开放标准。

### 核心定位

| 概念 | 类比 | 特点 |
|------|------|------|
| Agent Skills | SOP 手册、教程 | 静态知识 |
| MCP | USB 接口、驱动 | 动态能力 |
| SubAgent | 人设、Persona | 角色扮演 |

### 目录结构

```
skill-name/
├── SKILL.md              # 技能主文档（必需）
├── scripts/              # 可执行脚本
├── references/           # 技术参考资料
│   ├── REFERENCE.md
│   ├── FORMS.md
│   └── *.md
└── assets/               # 模板、图片、数据等
```

### SKILL.md 规范

```markdown
---
name: my-skill-name          # 必需，1-64字符，小写+连字符，须与目录名一致
description: 技能描述         # 必需，1-1024字符，包含关键词便于匹配
license: MIT                  # 可选
compatibility: ...            # 可选，环境要求，最多500字符
metadata: {}                  # 可选，任意键值对
allowed-tools: tool1 tool2    # 可选，实验性，预授权工具列表
---

# 技能标题

[指令内容，建议 < 5000 tokens / < 500 行]
```

### 三阶段渐进式加载

1. **Discovery（发现）** — 启动时仅加载 `name` + `description`（~100 tokens/skill）
2. **Activation（激活）** — 任务匹配时加载完整 `SKILL.md`（建议 < 5000 tokens）
3. **Execution（执行）** — 按需加载 `scripts/`、`references/`、`assets/`

### 存放位置

- `.claude/skills/` — Claude Code
- `.github/skills/` — GitHub
- `.codex/skills/` — Codex
- `.gemini/skills/` — Gemini

## 参考

- [agentskills.io](https://agentskills.io/) — 官方站点
- [agentskills/agentskills](https://github.com/agentskills/agentskills) — 规范仓库
- [skillsmp.com](https://skillsmp.com/) — 使用指南
- [skills.sh](https://skills.sh) — Registry (`npx skills add <owner/repo>`)
- [context7.com](https://context7.com/?tab=skills) — Registry (`npx ctx7 skills search <name>`)
