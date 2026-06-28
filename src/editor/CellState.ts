import {Cell} from './Cell';

export class CellState {
  private static selectedCell: Cell|null = null;

  static set(cell: Cell|null) {
    if (this.selectedCell) {
      this.selectedCell.unselect();
    }

    this.selectedCell = cell;

    if (cell) {
      cell.select();
    }
  }

  static get() {
    return this.selectedCell;
  }
}