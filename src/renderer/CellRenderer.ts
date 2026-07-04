import {App} from 'obsidian';

import {TableCell} from '../models/TableCell';

import {MarkdownRendererWrapper} from './MarkdownRenderer';

export class CellRenderer {
  static render(app: App, el: HTMLElement, cell: TableCell, ctx?: any) {
    MarkdownRendererWrapper.render(app, el, cell.text, ctx);
  }
}