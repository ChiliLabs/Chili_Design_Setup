#!/bin/bash
set -e
mkdir -p context
cat > CLAUDE.md <<'EOF'
# Demo Shop — project instructions
Project type: `existing` · Domain: `e-commerce` (see `context/project-config.md`).
Start every task with a new-task request.
EOF
cat > context/project-config.md <<'EOF'
# Project config

```yaml
project: Demo Shop
domain: e-commerce
docs: []
project_type: existing
design_system_ready: true
language:
  chat: ru
  ui: [en]
  design: en
task_tracker:
  type: none
products:
  - name: Demo Shop app
    audience: shoppers
    jira_projects: []
    figma_file: none
    figma_pages_of_truth: []
    design_system: [Demo DS]
platform_options: ["Mob only"]
themes: [light]
connectors:
  ask: false
  default: []
external_skills: []
default_mode: analyze
default_ui_approach: auto
task_defaults:
  remember: true
  last: {}
output:
  page_name: Playground AI
  section_naming: "<short title> — <YYYY-MM-DD>"
  protect_existing: true
never_invent: []
work_types:
  - id: feature-update
    label: Screen / flow update
    menu_hint: Change an existing screen, component or part of a flow
    skill: feature-update
    project_types: [existing]
    enabled: true
  - id: flow-builder
    label: New flow
    menu_hint: Create or rework a sequence of screens
    skill: flow-builder
    project_types: [existing, greenfield]
    enabled: true
  - id: design-qa
    label: Design QA
    menu_hint: Check finished screens against the task
    skill: design-qa
    project_types: [existing, greenfield]
    enabled: true
```
EOF
