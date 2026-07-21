import {TableColumn} from './TableColumn';
import {TableRow} from './TableRow';

export interface TableModel {
  version: number;
  style: string[];
  columns?: TableColumn[];
  rows: TableRow[];
}