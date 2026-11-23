---
description: Configured project, all answers in the message → summary routes to feature-update
tags: [branch, scaffold]
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill, AskUserQuestion]
append_system_prompt: "Project instructions from the CLAUDE.md of this project (an eval run does not load that file) — Start every task with a new-task request, skill new-task. It loads the config and routes to the right skill."
---

Новая задача: обновление существующего экрана — добавить поле промокода на экран оформления заказа. Исходного экрана в Figma нет, работаем по описанию. UI строго по дизайн-системе, один вариант.
