import {App, Component, MarkdownPostProcessorContext, MarkdownView} from 'obsidian';

import {TableModel} from '../models/TableModel';
import {TableBlockSerializer} from '../parser/TableBlockSerializer';

import {CellEditor} from './CellEditor';
import {CellRenderer} from './renderer/CellRenderer';
import {TableRenderer} from './renderer/TableRenderer';

export class TableView {
  private tableRenderer: TableRenderer;
  private cellRenderer: CellRenderer;
  private cellEditor: CellEditor;

  constructor(
      private app: App,
      private component: Component,
      private context: MarkdownPostProcessorContext,
      private model: TableModel,
      private onUpdate: (source: string) => Promise<void>,
  ) {
    this.cellRenderer = new CellRenderer(app, component);
    this.cellEditor = new CellEditor(this.cellRenderer, () => this.save());
    this.tableRenderer = new TableRenderer(this.cellRenderer, this.cellEditor);
  }

  async render(container: HTMLElement) {
    await this.tableRenderer.render(container, this.model, this.isEditable());
  }

  private async save() {
    const source = TableBlockSerializer.serialize(this.model);
    await this.onUpdate(source);
  }

  private isEditable(): boolean {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    return view?.getMode() === 'source';
  }
}