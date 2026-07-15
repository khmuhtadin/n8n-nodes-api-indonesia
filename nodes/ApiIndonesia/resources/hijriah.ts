import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const hijriahOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['hijriah'] } },
    options: [
      {
        name: 'Convert Date',
        value: 'konversi',
        action: 'Convert gregorian date to hijri',
        routing: {
          request: { method: 'GET', url: '/api/v1/hijriah/konversi' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Hijri Calendar',
        value: 'kalender',
        action: 'Get hijri calendar',
        routing: {
          request: { method: 'GET', url: '/api/v1/hijriah/kalender' },
          output: dataOutput,
        },
      },
    ],
    default: 'konversi',
  },
  {
    displayName: 'Date',
    name: 'tanggal',
    type: 'dateTime',
    displayOptions: { show: { resource: ['hijriah'], operation: ['konversi'] } },
    default: '',
    required: true,
    description: 'Gregorian date to convert (YYYY-MM-DD)',
    routing: { send: { type: 'query', property: 'tanggal' } },
  },
  {
    displayName: 'Year',
    name: 'tahun',
    type: 'number',
    displayOptions: { show: { resource: ['hijriah'], operation: ['kalender'] } },
    default: 2026,
    required: true,
    routing: { send: { type: 'query', property: 'tahun' } },
  },
  {
    displayName: 'Month',
    name: 'bulan',
    type: 'number',
    typeOptions: { minValue: 1, maxValue: 12 },
    displayOptions: { show: { resource: ['hijriah'], operation: ['kalender'] } },
    default: 1,
    required: true,
    routing: { send: { type: 'query', property: 'bulan' } },
  },
];