import {App, Component} from 'obsidian';

import {TableCell} from '../../models/TableCell';
import {MarkdownRendererWrapper} from '../../renderer/MarkdownRenderer';

export class CellRenderer {
  static async render(
      app: App,
      el: HTMLElement,
      cell: TableCell,
      ctx: Component,
      ): Promise<void> {
    await MarkdownRendererWrapper.render(app, el, cell.text, ctx);
  }
}