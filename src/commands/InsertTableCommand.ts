import {TableModel} from '../models/TableModel';

export class InsertTableCommand {
  static create(rows: number, cols: number): string {
    let table: TableModel = {
      version: 1,
      style: [],
      rows: [],
    };

    table.rows = Array.from(
        {length: rows},
        (_, r) => ({
          cells: Array.from(
              {length: cols}, (_, c) => ({id: `r${r + 1}c${c + 1}`, text: ''}))
        }));

    return [
      '```table',
      JSON.stringify(table, null, 2),
      '```',
    ].join('\n');
  }
}