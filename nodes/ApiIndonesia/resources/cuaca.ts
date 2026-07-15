import type { INodeProperties } from 'n8n-workflow';
import { returnAllField, limitField, pageField } from '../shared/descriptions';

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
  // Location ID for getForecast (maps to adm4 query param)
  {
    displayName: 'Location ID',
    name: 'locationId',
    type: 'string',
    displayOptions: { show: { resource: ['cuaca'], operation: ['getForecast'] } },
    default: '',
    required: true,
    description: 'Location ID (e.g. 501191 for Jakarta)',
    routing: { send: { type: 'query', property: 'adm4' } },
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
  // Pagination fields
  returnAllField,
  limitField,
  pageField,
];