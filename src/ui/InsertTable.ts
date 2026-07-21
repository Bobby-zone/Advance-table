import {App, Modal, Setting} from 'obsidian';

export class InsertTableModal extends Modal {
  rows = 3;
  cols = 3;

  constructor(
      app: App,
      private onSubmit: (rows: number, cols: number) => void,
  ) {
    super(app);
  }

  onOpen() {
    const {contentEl} = this;
    contentEl.empty();

    contentEl.createEl('h1', {text: 'Table Size'});

    this.CreateNumberSetting(contentEl, 'Rows', this.rows);  // row size input
    this.CreateNumberSetting(
        contentEl, 'Columns', this.cols);  // col size input

    // submit btn
    new Setting(contentEl).addButton(
        (btn) => btn.setButtonText('Confirm').setCta().onClick(() => {
          this.close();
          this.onSubmit(this.rows, this.cols);
        }));
  }

  private CreateNumberSetting(
      parent: HTMLElement,
      name: string,
      value: number,
  ) {
    const setting = new Setting(parent).setName(name);

    const decrease = setting.controlEl.createEl('button', {text: '-'});
    const increase = setting.controlEl.createEl('button', {text: '+'});
    const size = setting.controlEl.createEl(
        'input', {type: 'number', value: value.toString()});

    decrease.onclick = () => {
      value = Math.max(1, value--);
      size.value = value.toString();
    };
    increase.onclick = () => {
      value++;
      size.value = value.toString();
    };
    size.onchange = () => {
      value = Math.max(1, Number(size.value) || 1);
      size.value = value.toString();
    };
  }
}