import {Notice, Plugin} from 'obsidian';

import {InsertTableCommand} from './commands/InsertTableCommand';
import {MarkdownUpdater} from './editor/MarkdownUpdater';
import {TableView} from './editor/Tableview';
import {TableBlockParser} from './parser/TableBlockParser';
import {InsertTableModal} from './ui/InsertTable';

export default class TablePlugin extends Plugin {
  private markdownUpdater!: MarkdownUpdater;

  async onload() {
    // find codeblock table
    this.registerMarkdownCodeBlockProcessor(
        'table', async (source, el, context) => {
          try {
            const model = TableBlockParser.parse(source);

            const view = new TableView(
                this.app, this, context, model, async (newSource) => {
                  const markdownUpdater = new MarkdownUpdater(this.app);
                  await markdownUpdater.updateCodeBlock(context, el, newSource);
                });
            await view.render(el);
          } catch (err) {
            console.error(err);

            el.createEl('pre', {text: 'Failed to render table.'});
          }
        });

    // add command to insert table
    this.addCommand({
      id: 'create-table',
      name: 'Create table',
      editorCallback: (editor) => {
        new InsertTableModal(this.app, (rows, cols) => {
          new Notice(rows.toString());
          const table = InsertTableCommand.create(rows, cols);  // create table
          editor.replaceSelection(table);                       // insert table
        }).open();
      }
    });
  }
}
