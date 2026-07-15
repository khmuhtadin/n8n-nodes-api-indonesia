import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const kursOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['kurs'] } },
    options: [
      {
        name: 'Get Latest Rates',
        value: 'latest',
        action: 'Get latest exchange rates',
        routing: {
          request: { method: 'GET', url: '/api/v1/kurs/latest' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Rate History',
        value: 'history',
        action: 'Get exchange rate history',
        routing: {
          request: { method: 'GET', url: '/api/v1/kurs/history' },
          output: dataOutput,
        },
      },
    ],
    default: 'latest',
  },
  {
    displayName: 'Base Currency',
    name: 'baseCurrency',
    type: 'string',
    displayOptions: { show: { resource: ['kurs'], operation: ['latest', 'history'] } },
    default: 'USD',
    required: true,
    description: 'Base currency code (ISO 4217, e.g. USD)',
    routing: { send: { type: 'query', property: 'base' } },
  },
  {
    displayName: 'Target Currency',
    name: 'targetCurrency',
    type: 'string',
    displayOptions: { show: { resource: ['kurs'], operation: ['latest', 'history'] } },
    default: 'IDR',
    required: true,
    description: 'Target currency code (ISO 4217, e.g. IDR)',
    routing: { send: { type: 'query', property: 'target' } },
  },
  {
    displayName: 'Start Date',
    name: 'startDate',
    type: 'dateTime',
    displayOptions: { show: { resource: ['kurs'], operation: ['history'] } },
    default: '',
    required: true,
    description: 'Start of date range (YYYY-MM-DD)',
    routing: { send: { type: 'query', property: 'start' } },
  },
  {
    displayName: 'End Date',
    name: 'endDate',
    type: 'dateTime',
    displayOptions: { show: { resource: ['kurs'], operation: ['history'] } },
    default: '',
    required: true,
    description: 'End of date range (YYYY-MM-DD)',
    routing: { send: { type: 'query', property: 'end' } },
  },
];