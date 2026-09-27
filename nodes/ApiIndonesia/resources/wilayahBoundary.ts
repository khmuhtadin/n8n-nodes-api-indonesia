import type { INodeProperties } from 'n8n-workflow';
import { paginationFields } from '../shared/descriptions';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const wilayahBoundaryOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['wilayahBoundary'] } },
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        action: 'Get many region boundaries',
        routing: {
          request: { method: 'GET', url: '/api/v1/wilayah-boundary' },
          output: dataOutput,
        },
      },
      {
        name: 'Get GeoJSON',
        value: 'get',
        action: 'Get a region boundary geometry',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/wilayah-boundary/{{$parameter["code"]}}',
          },
        },
      },
      {
        name: 'Get Metadata',
        value: 'metadata',
        action: 'Get region boundary metadata',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/wilayah-boundary/{{$parameter["code"]}}/metadata',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Region Code',
    name: 'code',
    type: 'string',
    displayOptions: { show: { resource: ['wilayahBoundary'], operation: ['get', 'metadata'] } },
    default: '',
    required: true,
    description: 'Dotted region code, e.g. 31 or 32.73',
  },
  {
    displayName: 'Level',
    name: 'level',
    type: 'options',
    displayOptions: { show: { resource: ['wilayahBoundary'], operation: ['getAll'] } },
    options: [
      { name: 'Province', value: 'province' },
      { name: 'Regency', value: 'regency' },
      { name: 'District', value: 'district' },
      { name: 'Village', value: 'village' },
    ],
    default: 'province',
    routing: { send: { type: 'query', property: 'level' } },
  },
  ...paginationFields('wilayahBoundary', ['getAll']),
];
