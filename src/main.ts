import {Notice, Plugin} from 'obsidian';

import {TableRenderer} from './editor/renderer/TableRenderer';
import {TableBlockParser} from './parser/TableBlockParser';
import {InsertTableModal} from './ui/InsertTable';

export default class TablePlugin extends Plugin {
  async onload() {
    // find codeblock table
    this.registerMarkdownCodeBlockProcessor('table', async (source, el) => {
      try {
        const model = TableBlockParser.parse(source);

        const renderer = new TableRenderer();
        await renderer.render(this.app, el, model, this);
      } catch (err) {
        console.error(err);

        el.createEl('pre', {text: 'Failed to render table.'});
      }
    });

    // add command to insert table
    this.addCommand({
      id: 'create-table',
      name: 'Create table',
      editorCallback: () => {
        new InsertTableModal(this.app, (rows, cols) => {
          new Notice(`${rows.toString()} ${cols.toString()}`);
        }).open();
      }
    });
  }
}
