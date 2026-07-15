import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const sholatOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['sholat'] } },
    options: [
      {
        name: 'Get Prayer Time Cities',
        value: 'getListKota',
        action: 'Get list of prayer time cities',
        routing: {
          request: { method: 'GET', url: '/api/v1/sholat/list-kota' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Prayer Times',
        value: 'getByDate',
        action: 'Get prayer times by date',
        routing: {
          request: { method: 'GET', url: '/api/v1/sholat' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Monthly Prayer Times',
        value: 'getMonthly',
        action: 'Get monthly prayer times',
        routing: {
          request: { method: 'GET', url: '/api/v1/sholat/monthly' },
          output: dataOutput,
        },
      },
    ],
    default: 'getListKota',
  },
  // Regency ID via resourceLocator for getByDate and getMonthly
  {
    displayName: 'Regency ID',
    name: 'regencyId',
    type: 'resourceLocator',
    default: { mode: 'list', value: '' },
    displayOptions: {
      show: { resource: ['sholat'], operation: ['getByDate', 'getMonthly'] },
    },
    required: true,
    description: 'Select a regency or enter its ID',
    modes: [
      {
        displayName: 'List',
        name: 'list',
        type: 'list',
        typeOptions: {
          searchListMethod: 'getRegencies',
          searchable: true,
        },
      },
      {
        displayName: 'ID',
        name: 'id',
        type: 'string',
      },
    ],
    routing: {
      send: { type: 'query', property: 'kabupaten_id' },
    },
  },
  // Date for getByDate
  {
    displayName: 'Date',
    name: 'date',
    type: 'dateTime',
    displayOptions: { show: { resource: ['sholat'], operation: ['getByDate'] } },
    default: '',
    required: true,
    description: 'Date in YYYY-MM-DD format',
    routing: {
      send: { type: 'query', property: 'tanggal' },
    },
  },
  // Year for getMonthly
  {
    displayName: 'Year',
    name: 'year',
    type: 'number',
    displayOptions: { show: { resource: ['sholat'], operation: ['getMonthly'] } },
    default: 2026,
    required: true,
    routing: {
      send: { type: 'query', property: 'tahun' },
    },
  },
  // Month for getMonthly
  {
    displayName: 'Month',
    name: 'month',
    type: 'number',
    typeOptions: { minValue: 1, maxValue: 12 },
    displayOptions: { show: { resource: ['sholat'], operation: ['getMonthly'] } },
    default: 1,
    required: true,
    routing: {
      send: { type: 'query', property: 'bulan' },
    },
  },
];