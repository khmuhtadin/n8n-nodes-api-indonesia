import type { INodeProperties } from 'n8n-workflow';
import { returnAllField, limitField, pageField } from '../shared/descriptions';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const rsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['rs'] } },
    options: [
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-option-name-wrong-for-get-many -- intentionally renamed to avoid duplicating the "Return All Results" toggle
        name: 'List Hospitals',
        value: 'getAll',
        action: 'Get many hospitals',
        routing: {
          request: { method: 'GET', url: '/api/v1/rumah-sakit' },
          output: dataOutput,
        },
      },
      {
        name: 'Search Hospitals',
        value: 'search',
        action: 'Search hospitals',
        routing: {
          request: { method: 'GET', url: '/api/v1/rumah-sakit/search' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Hospital',
        value: 'get',
        action: 'Get a hospital by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/rumah-sakit/{{$parameter["rsId"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Hospital ID',
    name: 'rsId',
    type: 'string',
    displayOptions: { show: { resource: ['rs'], operation: ['get'] } },
    default: '',
    required: true,
  },
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    displayOptions: { show: { resource: ['rs'], operation: ['search'] } },
    default: '',
    required: true,
    routing: { send: { type: 'query', property: 'q' } },
  },
  {
    displayName: 'Province ID Filter',
    name: 'provinsiIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['rs'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by province code',
    routing: { send: { type: 'query', property: 'provinsi_id' } },
  },
  {
    displayName: 'Regency ID Filter',
    name: 'kabupatenIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['rs'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by regency code',
    routing: { send: { type: 'query', property: 'kabupaten_id' } },
  },
  {
    displayName: 'Jenis Filter',
    name: 'jenisFilter',
    type: 'string',
    displayOptions: { show: { resource: ['rs'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by hospital type (e.g. RSU, RSUK, RSK)',
    routing: { send: { type: 'query', property: 'jenis' } },
  },
  {
    displayName: 'Kelas Filter',
    name: 'kelasFilter',
    type: 'string',
    displayOptions: { show: { resource: ['rs'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by hospital class (A, B, C, D)',
    routing: { send: { type: 'query', property: 'kelas' } },
  },
  returnAllField,
  limitField,
  pageField,
];