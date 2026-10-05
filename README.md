# Reusable Obsidian setup

Portable configuration and blank templates for separate personal and work vaults. No note content, bookmarks, task history, calendar records, credentials, or account configuration is included.

## Contents

- `templates/`: the two blank source templates, installed into a vault's `Template/` folder.
- `config/`: portable appearance, template and daily-note preferences, and a plugin inventory. No custom hotkeys, themes or CSS snippets were present in the source vault.
- `plugin-config-examples/`: reviewed Templater and Custom Sort examples, plus a minimal TaskNotes example with API, MCP and calendar connections disabled. No raw TaskNotes settings are copied.
- `local-plugins/pamin-auto-note-title/`: the local plugin for automatic titles after typing.
- `plugins-list.md`: plugin IDs and source versions.

## Set up another Mac

Use company-approved software and storage for your work vault. Keep this repository outside every vault; keep work notes in a separate location approved by your company.

```sh
git clone https://github.com/pamin2222/obsidian-setup.git
cd obsidian-setup
```

1. In Obsidian, create a new, separate vault for work. Close Obsidian before copying configuration. Back up any existing destination configuration first.
2. Copy the contents of `templates/` into `Template/` in the new vault. Create empty `QuickNote/`, `Daily/`, `TaskNotes/Tasks/` and `TaskNotes/Archive/` folders as needed.
3. Copy `config/templates.json`, `config/daily-notes.json` and `config/appearance.json` into the destination vault's `.obsidian/` folder. The empty appearance file uses Obsidian defaults; skip it if you already have a preferred appearance.
4. Open Obsidian and install approved plugins from **Settings → Community plugins**, using `plugins-list.md`. The `community-plugins.json` file is an inventory; do not copy it until the listed plugins are installed. Core plugins are configured locally; enable Templates and Daily notes as needed.
5. Close Obsidian. For a freshly installed plugin, copy its matching example to `.obsidian/plugins/<plugin-id>/data.json`. For an existing setup, review and merge values manually so local settings are preserved. Examples are partial settings; plugins may add defaults. Reopen Obsidian and verify each plugin's settings.
6. Templater uses `Template/`, with folder templates for `QuickNote/` and `Daily/`. Its stale hotkey entry was removed. Keep shell commands and startup scripts unconfigured unless separately reviewed.
7. Optionally copy `local-plugins/pamin-auto-note-title/` to `.obsidian/plugins/pamin-auto-note-title/`, review its code, then enable it under Community plugins. Restart Obsidian. In a disposable note made from Notes Template, type a sentence and wait about two seconds: the title should become `YYYY-MM-DD {first 8 words}`. The body stays blank until you type; text after `## Related` is excluded. Only notes with `auto-title: true` are eligible. Remove that flag to stop renaming. Opening words edited later can rename the note again. A conflicting title is skipped. Unit checks previously passed, but this exported copy has not been tested live on the destination Mac.

Do not point a work vault at the personal vault or enable personal note/calendar sync on it. Configure accounts individually on each machine; never commit the resulting `data.json` files. Avoid symlinking live plugin settings into this repository because plugins write account data into them.

## Updates and public sharing

Pull updates into this repository, review the diff, back up destination configuration, and copy only the intended files with Obsidian closed. Never copy an entire live `.obsidian/` directory back into this repository. Do not bulk export notes.

`.gitignore` blocks common live-state and credential files, but cannot inspect file contents or remove files already tracked. Absolute paths and secrets in otherwise allowed files require review. Before every commit:

```sh
git status --short
git diff --cached
```

Use vault-relative folders in examples. Keep account IDs, email addresses, calendar URLs, tokens, API keys, webhooks and absolute personal/company paths local. If a secret is ever committed, revoke it and remove it from Git history; merely deleting a file is insufficient.

## Export review

The initial export was prepared on 5 October 2026 from configuration and the template folder only. Raw TaskNotes data, workspace state, bookmarks, graph searches, app paths, core sync/publish settings and third-party plugin binaries were excluded. Templater and Custom Sort examples were inspected, and the missing-template hotkey was removed. The two source templates contain placeholders only. No source vault files were modified. No third-party themes or snippets were installed, so none are redistributed.
