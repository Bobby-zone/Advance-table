import {App, Editor, MarkdownFileInfo, MarkdownView, Notice, Plugin, WorkspaceLeaf} from 'obsidian';

import {TableDocument} from './models/TableDocument';
import {TableBlockParser} from './parser/TableBlockParser';
import {TableRenderer} from './renderer/TableRenderer';

// Remember to rename these classes and interfaces!

export default class TablePlugin extends Plugin {
  async onload() {
    // find codeblock table
    this.registerMarkdownCodeBlockProcessor(
        'table', async (source, el, ctx) => {
          try {
            const model = TableBlockParser.parse(source);

            const renderer = new TableRenderer();
            await renderer.render(el, model, ctx);
          } catch (err) {
            console.error(err);

            el.createEl('pre', {text: 'Failed to render table.'});
          }
        });
  }

  onunload() {}
}
