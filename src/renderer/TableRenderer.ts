import {App, Component} from 'obsidian';

import {TableModel} from '../models/TableModel';

import {CellRenderer} from './CellRenderer';

export class TableRenderer {
  async render(
      app: App, container: HTMLElement, model: TableModel, ctx: Component) {
    const table = container.createEl('table');
    table.addClass('html-table');

    for (const row of model.rows) {
      const tr = table.createEl('tr');

      for (const cell of row.cells) {
        const td = tr.createEl('td');

        if (cell.rowspan) td.rowSpan = cell.rowspan
          if (cell.colspan) td.rowSpan =
              cell.colspan

                  await CellRenderer.render(app, td, cell, ctx);
      }
    }
  }
}