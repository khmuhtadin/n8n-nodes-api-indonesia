import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const cuacaOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['cuaca'] } },
    options: [
      {
        name: 'Get Weather Forecast',
        value: 'getForecast',
        action: 'Get weather forecast by location',
        routing: {
          request: { method: 'GET', url: '/api/v1/cuaca' },
          output: dataOutput,
        },
      },
      {
        name: 'Search Weather',
        value: 'search',
        action: 'Search weather by location',
        routing: {
          request: { method: 'GET', url: '/api/v1/cuaca/search' },
          output: dataOutput,
        },
      },
    ],
    default: 'getForecast',
  },
  {
    displayName: 'Location Type',
    name: 'locationType',
    type: 'options',
    displayOptions: { show: { resource: ['cuaca'], operation: ['getForecast'] } },
    options: [
      { name: 'Village (ADM4)', value: 'village' },
      { name: 'Regency/City', value: 'regency' },
    ],
    default: 'village',
  },
  {
    displayName: 'Village Code',
    name: 'locationId',
    type: 'string',
    displayOptions: {
      show: { resource: ['cuaca'], operation: ['getForecast'], locationType: ['village'] },
    },
    default: '',
    required: true,
    description: 'Village (ADM4) code from the Region resource, e.g. 32.73.01.1001',
    routing: { send: { type: 'query', property: 'adm4' } },
  },
  {
    displayName: 'Regency ID',
    name: 'kabupatenId',
    type: 'string',
    displayOptions: {
      show: { resource: ['cuaca'], operation: ['getForecast'], locationType: ['regency'] },
    },
    default: '',
    required: true,
    description: 'Regency/city code, e.g. 3273',
    routing: { send: { type: 'query', property: 'kabupaten_id' } },
  },
  // Search query
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    displayOptions: { show: { resource: ['cuaca'], operation: ['search'] } },
    default: '',
    required: true,
    routing: { send: { type: 'query', property: 'q' } },
  },
];