import {App, Modal, Setting} from 'obsidian';

export class InsertTableModal extends Modal {
  private rows = 3;
  private cols = 3;

  constructor(
      app: App,
      private onSubmit: (rows: number, cols: number) => void,
  ) {
    super(app);
    this.setTitle('Table size');
  }

  onOpen() {
    const {contentEl} = this;
    contentEl.empty();

    this.CreateNumberSetting(
        contentEl,
        'Rows',
        this.rows,
        value => this.rows = value,
    );  // row size input
    this.CreateNumberSetting(
        contentEl,
        'Columns',
        this.cols,
        value => this.cols = value,
    );  // col size input

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
      initialValue: number,
      onChange: (value: number) => void,
  ) {
    let value = initialValue;

    const setting = new Setting(parent).setName(name);

    const decrease = setting.controlEl.createEl('button', {text: '-'});
    const increase = setting.controlEl.createEl('button', {text: '+'});
    const size = setting.controlEl.createEl(
        'input', {type: 'number', value: value.toString()});

    const update =
        () => {
          size.value = value.toString();
          onChange(value);
        }

              decrease.onclick = () => {
          value--;
          value = Math.max(1, value);
          update();
        };
    increase.onclick = () => {
      value++;
      update();
    };
    size.onchange = () => {
      value = Math.max(1, Number(size.value) || 1);
      update();
    };
  }
}