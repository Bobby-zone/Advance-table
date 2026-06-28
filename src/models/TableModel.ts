import {TableRow} from './TableRow';

export interface TableColumn {
  width?: number;
}

export interface TableModel {
  version: number;
  style: [];
  columns: TableColumn[];

  rows: TableRow[];
}