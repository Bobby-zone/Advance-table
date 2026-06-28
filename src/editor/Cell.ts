import {TableCell} from '../models/TableCell';

import {SelectionManager} from './SelectionManager';

// create <td>
export class Cell {
  private textarea!: HTMLTextAreaElement;

  constructor(
      private container: HTMLElement,
      private model: TableCell,
      private selection: SelectionManager,
  ) {
    this.render();
  }

  private render() {
    this.container.empty();

    this.container.addClass('table-cell');

    this.textarea =
        this.container.createEl('textarea', {cls: 'table-cell-input'});

    this.textarea.value = this.model.text;

    this.textarea.oninput = () => {
      this.model.text = this.textarea.value;
    };

    // click > select single
    this.container.onclick = (e) => {
      e.stopPropagation();
      this.selection.selectSingle(this);
    };
  }

  public select() {
    this.container.addClass('is-selected');
    this.textarea.focus();
  }

  public unselect() {
    this.container.removeClass('is-selected');
  }

  public getModel() {
    return this.model;
  }
}