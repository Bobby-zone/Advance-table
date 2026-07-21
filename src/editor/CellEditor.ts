import {TableCell} from '../models/TableCell';

import {CellRenderer} from './renderer/CellRenderer';

export class CellEditor {
  private editing?: {
    cell: TableCell; el: HTMLTableCellElement; textarea: HTMLTextAreaElement;
  };

  constructor(
      private renderer: CellRenderer,
      private onChange: () => Promise<void>,
  ) {}

  async beginEdit(cell: TableCell, el: HTMLTableCellElement) {
    if (this.editing?.cell.id === cell.id) return;

    // if another cell is editing, save it first
    await this.finishEdit();

    el.classList.add('editing');

    // fixed td width
    const wt = el.getBoundingClientRect().width;
    el.setCssProps({'--table-cell-width': `${wt}px`})

    const textarea = el.createEl('textarea', {cls: 'table-cell-editor'});
    textarea.value = cell.text;
    textarea.focus();

    this.editing = {cell, el, textarea};

    // resize textarea according to content
    const resize = () => {
      textarea.setCssProps({'--table-cell-height': `0px`});
      textarea.setCssProps(
          {'--table-cell-height': `${textarea.scrollHeight}px`});
    };


    textarea.addEventListener('input', resize);
    resize();

    // if click outside table finishEdit
    activeDocument.addEventListener('pointerdown', this.handleOutsideClick);
  };

  async finishEdit() {
    if (!this.editing) return;

    const {cell, el, textarea} = this.editing;

    // save the edited text
    cell.text = textarea.value;

    // remove the textarea
    el.empty();
    el.removeClass('editing');
    el.setCssProps({'--table-cell-width': ''});

    // re-render cell
    await this.renderer.render(el, cell);

    // tell outside that model changed
    await this.onChange();


    // no cell is being edited
    this.editing = undefined;

    // remove eventListener
    activeDocument.removeEventListener('pointerdown', this.handleOutsideClick);
  }

  private handleOutsideClick = (event: MouseEvent): void => {
    if (!this.editing) return;

    const target = event?.target as HTMLElement;

    // if click inside table do nothing
    if (this.editing.el.contains(target)) return;

    void this.finishEdit();
  }
}