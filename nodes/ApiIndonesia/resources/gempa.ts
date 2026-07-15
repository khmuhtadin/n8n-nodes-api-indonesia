import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const gempaOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['gempa'] } },
    options: [
      {
        name: 'Get Latest Earthquakes',
        value: 'terkini',
        action: 'Get latest earthquakes',
        routing: {
          request: { method: 'GET', url: '/api/v1/gempa/terkini' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Felt Earthquakes',
        value: 'dirasakan',
        action: 'Get felt earthquakes',
        routing: {
          request: { method: 'GET', url: '/api/v1/gempa/dirasakan' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Earthquake History',
        value: 'history',
        action: 'Get earthquake history',
        routing: {
          request: { method: 'GET', url: '/api/v1/gempa/history' },
          output: dataOutput,
        },
      },
    ],
    default: 'terkini',
  },
  // Optional start date for history
  {
    displayName: 'Start Date',
    name: 'startDate',
    type: 'dateTime',
    displayOptions: { show: { resource: ['gempa'], operation: ['history'] } },
    default: '',
    description: 'Start of date range (YYYY-MM-DD)',
    routing: {
      send: { type: 'query', property: 'start' },
    },
  },
  // Optional end date for history
  {
    displayName: 'End Date',
    name: 'endDate',
    type: 'dateTime',
    displayOptions: { show: { resource: ['gempa'], operation: ['history'] } },
    default: '',
    description: 'End of date range (YYYY-MM-DD)',
    routing: {
      send: { type: 'query', property: 'end' },
    },
  },
];