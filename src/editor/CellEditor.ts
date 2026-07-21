import {TableCell} from '../models/TableCell';

import {CellRenderer} from './renderer/CellRenderer';

export class CellEditor {
  private editing?: {
    cell: TableCell; el: HTMLTableCellElement; textarea: HTMLTextAreaElement;
  };

  constructor(
      private renderer: CellRenderer,
      private onChange: () => void,
  ) {}

  async beginEdit(cell: TableCell, el: HTMLTableCellElement) {
    if (this.editing?.cell.id === cell.id) return;

    // if another cell is editing, save it first
    await this.finishEdit();

    el.classList.add('editing');

    // fixed td width
    const wt = el.getBoundingClientRect().width;
    el.style.width = `${wt}px`;

    const textarea = el.createEl('textarea', {cls: 'table-cell-editor'});
    textarea.value = cell.text;
    textarea.focus();

    this.editing = {cell, el, textarea};

    // resize textarea according to content
    const resize = () => {
      textarea.style.height = `0px`;
      textarea.style.height = `${textarea.scrollHeight}px`;
    };


    textarea.addEventListener('input', resize);
    resize();

    // if click outside table finishEdit
    document.addEventListener('pointerdown', this.handleOutsideClick);
  };

  async finishEdit() {
    if (!this.editing) return;

    const {cell, el, textarea} = this.editing;

    // save the edited text
    cell.text = textarea.value;

    // remove the textarea
    el.empty();
    el.removeClass('editing');
    el.style.width = '';

    // re-render cell
    await this.renderer.render(el, cell);

    // tell outside that model changed
    this.onChange();


    // no cell is being edited
    this.editing = undefined;

    // remove eventListener
    document.removeEventListener('pointerdown', this.handleOutsideClick);
  }

  private handleOutsideClick = async (event: MouseEvent) => {
    if (!this.editing) return;

    const target = event?.target as HTMLElement;

    // if click inside table do nothing
    if (this.editing.el.contains(target)) return;

    await this.finishEdit();
  }
}