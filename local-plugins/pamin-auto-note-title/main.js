const { Plugin, TFile, Notice, moment } = require('obsidian');
function getTitle(text, timestamp) {
  const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!front || !/^auto-title:\s*true\s*$/m.test(front[1])) return null;
  const body = text.slice(front[0].length).split(/^##\s+Related\s*$/m)[0];
  if (body.includes('<' + '%')) return null;
  const words = body
    .replace(/!?(?:\[\[)([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => label || target)
    .replace(/!?\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^[ \t]*(?:[#>*+-]+|\d+[.)])[ \t]+/gm, '')
    .replace(/[`*_~]/g, '')
    .trim().split(/\s+/).filter(Boolean).slice(0, 8).join(' ')
    .replace(/[\\/:*?"<>|\u0000-\u001F]/g, '').replace(/\s+/g, ' ').replace(/[. ]+$/g, '').trim();
  if (!words) return null;
  const date = front[1].match(/^Creation date:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1] || moment(timestamp).format('YYYY-MM-DD');
  return `${date} ${words}`.slice(0, 180).replace(/[. ]+$/g, '');
}
module.exports = class AutoNoteTitle extends Plugin {
  async onload() {
    this.pending = new Map();
    this.busy = new Set();
    this.registerEvent(this.app.workspace.on('editor-change', (editor, info) => {
      const file = info.file;
      if (!(file instanceof TFile) || file.extension !== 'md') return;
      clearTimeout(this.pending.get(file));
      const timer = setTimeout(async () => {
        this.pending.delete(file);
        if (this.busy.has(file) || info.file !== file) return;
        const title = getTitle(editor.getValue(), file.stat.ctime);
        if (!title || title === file.basename) return;
        const path = `${file.parent?.path && file.parent.path !== '/' ? file.parent.path + '/' : ''}${title}.md`;
        const existing = this.app.vault.getAbstractFileByPath(path);
        if (existing && existing !== file) {
          new Notice('Auto title: another note already has that title. Add different opening words.');
          return;
        }
        this.busy.add(file);
        try { await this.app.fileManager.renameFile(file, path); }
        catch (error) { new Notice('Auto title: ' + error.message); }
        finally { this.busy.delete(file); }
      }, 2000);
      this.pending.set(file, timer);
    }));
  }
  onunload() { for (const timer of this.pending.values()) clearTimeout(timer); }
};
module.exports.getTitle = getTitle;
