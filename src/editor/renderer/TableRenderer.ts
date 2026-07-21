import {App, Component} from 'obsidian';

import {TableModel} from '../../models/TableModel';

import {CellRenderer} from './CellRenderer';

export class TableRenderer {
  async render(
      app: App,
      container: HTMLElement,
      model: TableModel,
      ctx: Component,
  ) {
    const table = container.createEl('table');
    table.addClass('html-table');

    for (let rowIndex = 0; rowIndex < model.rows.length; rowIndex++) {
      const row = model.rows[rowIndex];
      if (!row) return;
      const tr = table.createEl('tr');

      for (let colIndex = 0; colIndex < row.cells.length; colIndex++) {
        const cell = row.cells[colIndex];
        if (!cell) return;
        const td = tr.createEl('td');

        if (cell.rowspan) td.rowSpan = cell.rowspan;
        if (cell.colspan) td.colSpan = cell.colspan;

        if (model.style.includes('top') && rowIndex === 0) {
          td.classList.add('header-top');
        }
        if (model.style.includes('side') && colIndex === 0) {
          td.classList.add('header-side');
        }
        if (model.style.includes('top') && model.style.includes('side') &&
            rowIndex === 0 && colIndex === 0) {
          td.classList.remove('header-top', 'header-side');
          td.classList.add('header-corner');
        }

        await CellRenderer.render(app, td, cell, ctx);
      }

      table.classList.add(...(model.style ?? []));
    }
  }
}