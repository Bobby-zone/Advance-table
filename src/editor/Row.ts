import {TableRow} from '../models/TableRow';

import {Cell} from './Cell';
import {SelectionManager} from './SelectionManager';

// create <tr>
export class Row {
  constructor(
      private table: HTMLTableElement,
      private model: TableRow,
      private selection: SelectionManager,
  ) {
    this.render();
  }

  private render() {
    const tr = this.table.createEl('tr');

    for (const cell of this.model.cells) {
      const td = tr.createEl('td');

      new Cell(td, cell, this.selection);
    }
  }
}