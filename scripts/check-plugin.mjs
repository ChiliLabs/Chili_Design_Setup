#!/usr/bin/env node
// Static checks for the chili-design plugin. No dependencies, no model calls.
// Run from the repository root:  node scripts/check-plugin.mjs
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const plugin = join(repo, 'plugins', 'chili-design');
const rel = (p) => relative(repo, p);
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const read = (p) => readFileSync(p, 'utf8');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.DS_Store' || name === 'results') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// Frontmatter: flat `key: value` lines between the first two `---` lines.
function frontmatter(text, file) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const kv = line.match(/^([A-Za-z_-]+):\s?(.*)$/);
    if (!kv) { err(`${rel(file)}: frontmatter line is not "key: value" → ${line}`); continue; }
    let v = kv[2].trim();
    const quoted = /^'.*'$/.test(v) || /^".*"$/.test(v);
    if (!quoted && /:\s/.test(v)) err(`${rel(file)}: "${kv[1]}" contains ": " — wrap the value in quotes`);
    if (/^'.*'$/.test(v)) v = v.slice(1, -1).replace(/''/g, "'");
    else if (/^".*"$/.test(v)) v = v.slice(1, -1);
    data[kv[1]] = v;
  }
  return { data, body: m[2] };
}

// ---------- 1. manifest and version ----------
const manifestPath = join(plugin, '.claude-plugin', 'plugin.json');
let version = '';
try {
  const manifest = JSON.parse(read(manifestPath));
  version = manifest.version || '';
  if (manifest.name !== 'chili-design') err(`plugin.json: name is "${manifest.name}", expected "chili-design"`);
  if (!/^\d+\.\d+\.\d+$/.test(version)) err(`plugin.json: version "${version}" is not X.Y.Z`);
} catch (e) { err(`plugin.json: ${e.message}`); }

try {
  const git = (args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  const changed = git(['status', '--porcelain', '--', 'plugins/chili-design']).trim();
  if (changed) {
    const headVersion = JSON.parse(git(['show', 'HEAD:plugins/chili-design/.claude-plugin/plugin.json'])).version;
    if (headVersion === version) err(`version: plugin files changed but the version is still ${version} — bump it in plugin.json`);
  }
} catch { warn('version: git not available, skipped the «bump on every change» check'); }

// ---------- 2. skills ----------
const BUILT_IN = new Set(['skills', 'help', 'plugin', 'mcp', 'review', 'doctor', 'release-notes', 'clear', 'config',
  'init', 'login', 'logout', 'memory', 'model', 'status', 'agents', 'compact', 'cost', 'resume', 'permissions', 'hooks']);
const skillsDir = join(plugin, 'skills');
const skills = readdirSync(skillsDir).filter((d) => existsSync(join(skillsDir, d, 'SKILL.md')));
for (const dir of readdirSync(skillsDir)) {
  if (dir === '.DS_Store') continue;
  const file = join(skillsDir, dir, 'SKILL.md');
  if (!existsSync(file)) { err(`skills/${dir}: no SKILL.md`); continue; }
  const fm = frontmatter(read(file), file);
  if (!fm) { err(`${rel(file)}: no frontmatter`); continue; }
  if (fm.data.name !== dir) err(`${rel(file)}: name "${fm.data.name}" ≠ folder "${dir}"`);
  const d = fm.data.description || '';
  if (!d) err(`${rel(file)}: empty description`);
  if (d.length > 1024) err(`${rel(file)}: description is ${d.length} chars, limit 1024`);
  if (/[<>]/.test(d)) err(`${rel(file)}: description contains angle brackets`);
  if (BUILT_IN.has(dir)) err(`skills/${dir}: the name equals a built-in command`);
  if (!fm.body.trim()) err(`${rel(file)}: empty body`);
}

// ---------- 3. links and skill references in every markdown file ----------
const mdFiles = walk(plugin).filter((f) => f.endsWith('.md') && !rel(f).includes(`${join('chili-design', 'evals')}`));
for (const file of mdFiles) {
  const text = read(file);
  for (const m of text.matchAll(/`((?:\.\.\/)+[\w./-]+\.(?:md|js))`/g)) {
    if (!existsSync(resolve(dirname(file), m[1]))) err(`${rel(file)}: broken link ${m[1]}`);
  }
  if (file.includes(`${join('chili-design', 'skills')}`) && !file.includes('templates')) {
    for (const m of text.matchAll(/\bskills? `([a-z][a-z-]+)`/g)) {
      if (!skills.includes(m[1])) err(`${rel(file)}: refers to skill \`${m[1]}\`, which does not exist`);
    }
  }
  const outsideQuotes = text.replace(/«[^»]*»/g, '');
  if (/[А-Яа-яЁё]/.test(outsideQuotes)) warn(`${rel(file)}: Cyrillic outside «…» — plugin files are English only`);
}
for (const m of read(join(plugin, 'references', 'ux-principles.md')).matchAll(/`([\w-]+\.md)`/g)) {
  if (!existsSync(join(plugin, 'references', m[1]))) err(`references/ux-principles.md: broken link ${m[1]}`);
}

// ---------- 4. project config template ----------
const cfgPath = join(skillsDir, 'project-setup', 'templates', 'context', 'project-config.md');
const cfg = read(cfgPath);
for (const key of ['project_type', 'design_system_ready', 'language', 'task_tracker', 'products', 'platform_options',
  'connectors', 'external_skills', 'default_mode', 'default_ui_approach', 'task_defaults', 'output', 'validation',
  'never_invent', 'work_types']) {
  if (!new RegExp(`^${key}:`, 'm').test(cfg)) err(`project-config.md template: key "${key}" is missing`);
}
for (const m of cfg.matchAll(/^\s+skill:\s*([\w:-]+)/gm)) {
  if (m[1] !== 'none' && !skills.includes(m[1])) err(`project-config.md template: work type uses skill "${m[1]}", which does not exist`);
}
const newTask = read(join(skillsDir, 'new-task', 'SKILL.md'));
for (const key of ['task_defaults.last', 'task_defaults.remember', 'default_ui_approach', 'default_mode', 'connectors.default', 'design_system_ready']) {
  if (!newTask.includes(key)) err(`new-task: no longer mentions \`${key}\``);
}
const qa = read(join(skillsDir, 'design-qa', 'SKILL.md'));
if (!qa.includes('references/state-matrix.md')) err('design-qa: no longer uses references/state-matrix.md');

// ---------- 5. README ----------
const readme = read(join(plugin, 'README.md'));
for (const s of skills) if (!readme.includes(`\`${s}\``)) err(`README.md: skill \`${s}\` is not in the table`);
const count = readme.match(/(\d+) skills/);
if (count && Number(count[1]) !== skills.length) err(`README.md: says ${count[1]} skills, there are ${skills.length}`);
if (version && !readme.includes(`**${version}**`)) err(`README.md: no changelog entry for ${version}`);

// ---------- 6. eval suite ----------
const evalsDir = join(plugin, 'evals');
const GRADER_TYPES = new Set(['regex', 'tool_used', 'tool_order', 'file_exists', 'llm', 'baseline']);
const PROMPT_KEYS = new Set(['schema_version', 'name', 'description', 'tags', 'plugins', 'runs', 'expected_outcome', 'model',
  'max_turns', 'timeout_seconds', 'allowed_tools', 'append_system_prompt', 'env']);
const covered = new Set();
let cases = 0;
if (!existsSync(evalsDir)) err('evals/: missing');
else {
  const caseDirs = [...new Set(walk(evalsDir).filter((f) => /(^|[\\/])(prompt\.md|case\.yaml)$/.test(f)).map(dirname))];
  const names = new Set();
  for (const dir of caseDirs) {
    cases++;
    const name = rel(dir).split(/[\\/]/).pop();
    if (names.has(name)) err(`evals: duplicate case name "${name}"`);
    names.add(name);
    const promptFile = join(dir, 'prompt.md');
    if (existsSync(promptFile)) {
      const fm = frontmatter(read(promptFile), promptFile);
      if (!fm) err(`${rel(promptFile)}: no frontmatter`);
      else {
        for (const k of Object.keys(fm.data)) if (!PROMPT_KEYS.has(k)) err(`${rel(promptFile)}: unknown key "${k}"`);
        if (!fm.body.trim()) err(`${rel(promptFile)}: empty prompt`);
      }
    }
    const caseFile = join(dir, 'case.yaml');
    if (existsSync(caseFile)) {
      const y = read(caseFile);
      if (!/^schema_version:\s*"1\.1"/m.test(y)) err(`${rel(caseFile)}: schema_version must be "1.1"`);
      if (!new RegExp(`^name:\\s*${name}\\s*$`, 'm').test(y)) err(`${rel(caseFile)}: name must be ${name}`);
      const s = y.match(/scaffold_script:\s*(\S+)/);
      if (s && !existsSync(join(dir, s[1]))) err(`${rel(caseFile)}: scaffold script ${s[1]} not found`);
    }
    const gradersDir = join(dir, 'graders');
    const graders = existsSync(gradersDir) ? readdirSync(gradersDir).filter((f) => f.endsWith('.md')) : [];
    if (!graders.length) err(`${rel(dir)}: no graders`);
    for (const g of graders) {
      const file = join(gradersDir, g);
      const fm = frontmatter(read(file), file);
      if (!fm) { err(`${rel(file)}: no frontmatter`); continue; }
      const t = fm.data.type;
      if (!GRADER_TYPES.has(t)) err(`${rel(file)}: unknown grader type "${t}"`);
      if (t === 'llm' && !/PASS[\s\S]*FAIL/.test(fm.body)) err(`${rel(file)}: llm rubric needs PASS and FAIL conditions`);
      for (const key of ['pattern', 'input_match']) {
        if (fm.data[key] === undefined) continue;
        try { new RegExp(fm.data[key], (fm.data.flags || '').replace(/[^dgimsuvy]/g, '')); }
        catch (e) { err(`${rel(file)}: ${key} is not a valid regex — ${e.message}`); }
      }
      if (t === 'regex' && !fm.data.pattern) err(`${rel(file)}: regex grader without pattern`);
      if (t === 'tool_used' && fm.data.tool === 'Skill' && fm.data.input_match) {
        const alt = fm.data.input_match.match(/\(\?:([a-z|-]+)\)"$/);
        if (!alt) err(`${rel(file)}: input_match must end with (?:skill-a|skill-b)"`);
        else for (const s of alt[1].split('|')) {
          if (!skills.includes(s)) err(`${rel(file)}: expects skill "${s}", which does not exist`);
          covered.add(s);
        }
      }
    }
  }
  for (const s of skills) if (!covered.has(s)) err(`evals: no case expects skill "${s}"`);
}

// ---------- report ----------
for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`FAIL  ${e}`);
console.log(`\nchili-design ${version}: ${skills.length} skills, ${mdFiles.length} markdown files, ${cases} eval cases — ` +
  (errors.length ? `${errors.length} error(s)` : 'all static checks passed') + (warnings.length ? `, ${warnings.length} warning(s)` : ''));
process.exit(errors.length ? 1 : 0);
