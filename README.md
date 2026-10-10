# Reusable Obsidian setup

Portable configuration and blank templates for separate personal and work vaults. No note content, bookmarks, task history, calendar records, credentials, or account configuration is included.

## Contents

- `templates/`: the two blank source templates, installed into a vault's `Template/` folder.
- `config/`: portable appearance, template and daily-note preferences, and a plugin inventory. No custom hotkeys, themes or CSS snippets were present in the source vault.
- `plugin-config-examples/`: reviewed Templater and Custom Sort examples, plus a TaskNotes example with basic task preferences and API, MCP and calendar connections disabled. No raw TaskNotes settings are copied.
- `local-plugins/pamin-auto-note-title/`: the local plugin for automatic titles after typing.
- `plugins-list.md`: plugin IDs and source versions.
- `sortspec.md`: the reviewed root Custom Sort specification; copy it to the root of the destination vault.

## Set up another Mac

Use company-approved software and storage for your work vault. Keep this repository outside every vault; keep work notes in a separate location approved by your company.

```sh
git clone https://github.com/pamin2222/obsidian-setup.git
cd obsidian-setup
```

1. In Obsidian, create a new, separate vault for work. Close Obsidian before copying configuration. Back up any existing destination configuration first.
2. Copy the contents of `templates/` into `Template/` in the new vault. Create empty `QuickNote/`, `Notebook/`, `Daily/`, `TaskNotes/Tasks/` and `TaskNotes/Archive/` folders as needed.
3. Copy `config/templates.json`, `config/daily-notes.json` and `config/appearance.json` into the destination vault's `.obsidian/` folder. The empty appearance file uses Obsidian defaults; skip it if you already have a preferred appearance.
4. Open Obsidian and install approved plugins from **Settings → Community plugins**, using `plugins-list.md`. The `community-plugins.json` file is an inventory; do not copy it until the listed plugins are installed. Core plugins are configured locally; enable Templates and Daily notes as needed.
5. Close Obsidian. For a freshly installed plugin, copy its matching example to `.obsidian/plugins/<plugin-id>/data.json`. For an existing setup, review and merge values manually so local settings are preserved. Examples are partial settings; plugins may add defaults. Reopen Obsidian and verify each plugin's settings.
6. Templater uses `Template/`, with folder templates for `QuickNote/`, `Notebook/` and `Daily/`. Its stale hotkey entry was removed. Keep shell commands and startup scripts unconfigured unless separately reviewed.
7. Optionally copy `local-plugins/pamin-auto-note-title/` to `.obsidian/plugins/pamin-auto-note-title/`, review its code, then enable it under Community plugins. Restart Obsidian. In a disposable note made from Notes Template, type a sentence and wait about two seconds: the title should become `YYYY-MM-DD {first 8 words}`. The body stays blank until you type; text after `## Related` is excluded. Only notes with `auto-title: true` are eligible. Remove that flag to stop renaming. Opening words edited later can rename the note again. A conflicting title is skipped. Unit checks previously passed, but this exported copy has not been tested live on the destination Mac.

### Custom Sort

Copy `sortspec.md` to the root of your destination vault. Install **Custom File Explorer sorting** (`custom-sort`), close Obsidian, then apply `plugin-config-examples/custom-sort.json` as `.obsidian/plugins/custom-sort/data.json` (merge manually for an existing setup). These settings match the reviewed source configuration: sorting is active (`suspended: false`), automatic bookmarks integration is enabled, and the bookmark group used as the ordering reference is named `sortspec`. `additionalSortspecFile` is empty; no machine-specific path is required.

The root specification targets `/*`, places bookmarked items in bookmark order, and sorts the remaining items in descending alphabetical order (`> a-z`). This is lexical sorting, so numbered names do not use natural numeric order. Enable the core Bookmarks plugin and create a `sortspec` bookmark group locally if you want custom bookmark ordering. Personal bookmarks are not included. Restart Obsidian and check the work vault's file explorer; destination behavior has not been tested live.

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

## Latest source review — 11 October 2026

The enabled plugin list now excludes Auto Link Title. The daily template has a combined Tasks section plus Learning. Templater also applies Notes Template to `Notebook/`; create that folder locally if needed. The stale `Template/Template.md` hotkey remains excluded because that template does not exist. TaskNotes examples now include tag-based identification, the `task` tag, `normal` priority and `open` status; integrations remain disabled and account data is excluded. The root sorting specification, Custom Sort settings and local auto-title plugin were checked and are unchanged. No custom hotkeys, themes or snippets are currently present. The source vault was read only; installation on another Mac still requires local verification.
