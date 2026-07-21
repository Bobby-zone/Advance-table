import {App, Component, Notice} from 'obsidian';

import {TableCell} from '../../models/TableCell';
import {MarkdownRendererWrapper} from '../../renderer/MarkdownRenderer';

export class CellRenderer {
  constructor(
      private app: App,
      private component: Component,
  ) {}

  async render(
      el: HTMLElement,
      cell: TableCell,
      ): Promise<void> {
    const markdown = cell.text.replace(/\n/g, '<br>');
    await MarkdownRendererWrapper.render(
        this.app, el, markdown, this.component);
  }
}