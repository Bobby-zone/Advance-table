// editor/TableEditor.ts

import {TableModel} from '../models/TableModel';

import {Grid} from './Grid';
import {SelectionManager} from './SelectionManager';

export class TableEditor {
  private grid!: Grid;
  private selection: SelectionManager;

  constructor(
      private container: HTMLElement,
      private model: TableModel,
  ) {
    this.selection = new SelectionManager();
    this.render();
  }

  private render(): void {
    this.container.empty();

    this.grid = new Grid(
        this.container,
        this.model,
        this.selection,
    );
  }

  public getModel(): TableModel {
    return this.model;
  }

  public getSelection(): SelectionManager {
    return this.selection;
  }
}