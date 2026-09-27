import type { INodeProperties } from 'n8n-workflow';
import { paginationFields } from '../shared/descriptions';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const hargaPanganOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['hargaPangan'] } },
    options: [
      {
        name: 'Get Overview',
        value: 'overview',
        action: 'Get food price series overview',
        routing: {
          request: { method: 'GET', url: '/api/v1/harga-pangan' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Prices',
        value: 'harga',
        action: 'Get monthly food prices',
        routing: {
          request: { method: 'GET', url: '/api/v1/harga-pangan/harga' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Anomalies',
        value: 'anomali',
        action: 'Get food price anomaly index',
        routing: {
          request: { method: 'GET', url: '/api/v1/harga-pangan/anomali' },
          output: dataOutput,
        },
      },
    ],
    default: 'harga',
  },
  {
    displayName: 'Level',
    name: 'tingkat',
    type: 'options',
    displayOptions: { show: { resource: ['hargaPangan'], operation: ['harga'] } },
    options: [
      { name: 'Consumer', value: 'konsumen' },
      { name: 'Producer', value: 'produsen' },
    ],
    default: 'konsumen',
    routing: { send: { type: 'query', property: 'tingkat' } },
  },
  {
    displayName: 'Region Level',
    name: 'wilayah',
    type: 'options',
    displayOptions: { show: { resource: ['hargaPangan'], operation: ['harga'] } },
    options: [
      { name: 'National', value: 'nasional' },
      { name: 'Province', value: 'provinsi' },
    ],
    default: 'nasional',
    routing: { send: { type: 'query', property: 'wilayah' } },
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    displayOptions: { show: { resource: ['hargaPangan'], operation: ['harga', 'anomali'] } },
    default: {},
    options: [
      {
        displayName: 'Commodity',
        name: 'komoditas',
        type: 'string',
        default: '',
        description: 'Commodity name, e.g. beras premium (partial match)',
        routing: { send: { type: 'query', property: 'komoditas' } },
      },
      {
        displayName: 'From Month',
        name: 'dari',
        type: 'string',
        default: '',
        placeholder: '2025-01',
        description: 'Start month in YYYY-MM format',
        routing: { send: { type: 'query', property: 'dari' } },
      },
      {
        displayName: 'Province',
        name: 'provinsi',
        type: 'string',
        default: '',
        description: 'Province name or code, e.g. aceh or 11. Only for Get Prices with Region Level = Province.',
        routing: { send: { type: 'query', property: 'provinsi' } },
      },
      {
        displayName: 'To Month',
        name: 'sampai',
        type: 'string',
        default: '',
        placeholder: '2026-01',
        description: 'End month in YYYY-MM format',
        routing: { send: { type: 'query', property: 'sampai' } },
      },
    ],
  },
  ...paginationFields('hargaPangan', ['harga', 'anomali'], 'limit'),
];
