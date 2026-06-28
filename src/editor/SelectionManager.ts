import {Cell} from './Cell';

export class SelectionManager {
  private selectedCells: Set<Cell> = new Set();
  private anchorCell: Cell|null = null;

  clear() {
    for (const cell of this.selectedCells) {
      cell.unselect();
    }

    this.selectedCells.clear();
    this.anchorCell = null;
  }

  selectSingle(cell: Cell) {
    this.clear();

    this.selectedCells.add(cell);
    this.anchorCell = cell;

    cell.select();
  }

  add(cell: Cell) {
    this.selectedCells.add(cell);
    cell.select();
  }

  remove(cell: Cell) {
    this.selectedCells.delete(cell);
    cell.unselect();
  }

  getSelected(): Cell[] {
    return [...this.selectedCells];
  }

  getAnchor(): Cell|null {
    return this.anchorCell;
  }
}