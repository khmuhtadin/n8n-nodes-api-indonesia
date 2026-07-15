import type { INodeProperties } from 'n8n-workflow';
import { returnAllField, limitField, pageField } from '../shared/descriptions';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const kodeposOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['kodepos'] } },
    options: [
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-option-name-wrong-for-get-many -- intentionally renamed to avoid duplicating the "Return All Results" toggle
        name: 'List Postal Codes',
        value: 'getAll',
        action: 'Get many postal codes',
        routing: {
          request: { method: 'GET', url: '/api/v1/kodepos' },
          output: dataOutput,
        },
      },
      {
        name: 'Search Postal Codes',
        value: 'search',
        action: 'Search postal codes',
        routing: {
          request: { method: 'GET', url: '/api/v1/kodepos/search' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Postal Code',
        value: 'get',
        action: 'Get a postal code by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/kodepos/{{$parameter["kodeposId"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Postal Code ID',
    name: 'kodeposId',
    type: 'string',
    displayOptions: { show: { resource: ['kodepos'], operation: ['get'] } },
    default: '',
    required: true,
  },
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    displayOptions: { show: { resource: ['kodepos'], operation: ['search'] } },
    default: '',
    required: true,
    routing: { send: { type: 'query', property: 'q' } },
  },
  {
    displayName: 'Province ID Filter',
    name: 'provinsiIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['kodepos'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by province code',
    routing: { send: { type: 'query', property: 'provinsi_id' } },
  },
  {
    displayName: 'Regency ID Filter',
    name: 'kabupatenIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['kodepos'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by regency code',
    routing: { send: { type: 'query', property: 'kabupaten_id' } },
  },
  {
    displayName: 'District ID Filter',
    name: 'kecamatanIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['kodepos'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by district code',
    routing: { send: { type: 'query', property: 'kecamatan_id' } },
  },
  returnAllField,
  limitField,
  pageField,
];