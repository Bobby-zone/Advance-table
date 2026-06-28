import {TableModel} from '../models/TableModel';

import {Row} from './Row';
import {SelectionManager} from './SelectionManager';

// create <table>
export class Grid {
  constructor(
      private container: HTMLElement,
      private model: TableModel,
      private selection: SelectionManager,
  ) {
    this.render();
  }

  private render() {
    this.container.empty();

    const table = this.container.createEl('table', {cls: 'table-grid'});

    // column
    if (this.model.columns.length > 0) {
      const colgroup = table.createEl('colgroup');

      for (const col of this.model.columns) {
        const c = colgroup.createEl('col');
        if (col.width) c.style.width = `${col.width}px`;
      }
    }

    // row
    for (const row of this.model.rows) {
      new Row(table, row, this.selection);
    }
  }
}