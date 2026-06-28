import {ItemView, WorkspaceLeaf} from 'obsidian';

import {TableDocument} from '../models/TableDocument';
import {TableSerializer} from '../parser/TableSerializer';

import {TableEditor} from './TableEditor';
import {Toolbar} from './Toolbar';

export const TABLE_EDITOR_VIEW = 'advanced-table-editor';

export class TableEditorView extends ItemView {
  private document!: TableDocument;
  private editor!: TableEditor;

  getViewType() {
    return TABLE_EDITOR_VIEW;
  }

  getDisplayText() {
    return 'Table Editor';
  }

  async setTable(document: TableDocument) {
    this.document = document;

    this.render();
  }

  private render() {
    this.contentEl.empty();

    const toolbarEl = this.contentEl.createDiv();
    const gridEl = this.containerEl.createDiv();

    new Toolbar(toolbarEl, () => this.save());

    this.editor = new TableEditor(gridEl, this.document.model);
  }

  private async save() {
    const model = this.editor.getModel();

    const replacement = TableSerializer.serialize(model);

    this.document.editor.replaceRange(
        replacement, this.document.from, this.document.to);

    // return focus to original note
    await this.app.workspace.setActiveLeaf(
        this.document.sourceLeaf, {focus: true});

    // close editor tab
    this.leaf.detach();
  }
}