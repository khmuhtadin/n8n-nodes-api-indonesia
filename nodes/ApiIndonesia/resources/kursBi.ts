import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const kursBiOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['kursBi'] } },
    options: [
      {
        name: 'Get Latest BI Rates',
        value: 'latest',
        action: 'Get latest bank indonesia exchange rates',
        routing: {
          request: { method: 'GET', url: '/api/v1/kurs-bi/latest' },
          output: dataOutput,
        },
      },
      {
        name: 'Get BI Rate History',
        value: 'history',
        action: 'Get bank indonesia exchange rate history',
        routing: {
          request: { method: 'GET', url: '/api/v1/kurs-bi/history' },
          output: dataOutput,
        },
      },
    ],
    default: 'latest',
  },
  {
    displayName: 'Currencies',
    name: 'currencies',
    type: 'string',
    displayOptions: { show: { resource: ['kursBi'], operation: ['latest'] } },
    default: '',
    description: 'Comma-separated currency codes (e.g. USD,EUR). Leave empty for defaults.',
    routing: { send: { type: 'query', property: 'currencies' } },
  },
  {
    displayName: 'Currency',
    name: 'currency',
    type: 'string',
    displayOptions: { show: { resource: ['kursBi'], operation: ['history'] } },
    default: 'USD',
    required: true,
    description: 'Currency code (ISO 4217, e.g. USD)',
    routing: { send: { type: 'query', property: 'currency' } },
  },
  {
    displayName: 'Start Date',
    name: 'startDate',
    type: 'dateTime',
    displayOptions: { show: { resource: ['kursBi'], operation: ['history'] } },
    default: '',
    required: true,
    description: 'Start date (YYYY-MM-DD)',
    routing: { send: { type: 'query', property: 'start' } },
  },
  {
    displayName: 'End Date',
    name: 'endDate',
    type: 'dateTime',
    displayOptions: { show: { resource: ['kursBi'], operation: ['history'] } },
    default: '',
    required: true,
    description: 'End date (YYYY-MM-DD)',
    routing: { send: { type: 'query', property: 'end' } },
  },
];