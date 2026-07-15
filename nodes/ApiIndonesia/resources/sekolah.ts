import type { INodeProperties } from 'n8n-workflow';
import { returnAllField, limitField, pageField } from '../shared/descriptions';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const sekolahOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['sekolah'] } },
    options: [
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-option-name-wrong-for-get-many -- intentionally renamed to avoid duplicating the "Return All Results" toggle
        name: 'List Schools',
        value: 'getAll',
        action: 'Get many schools',
        routing: {
          request: { method: 'GET', url: '/api/v1/sekolah' },
          output: dataOutput,
        },
      },
      {
        name: 'Search Schools',
        value: 'search',
        action: 'Search schools',
        routing: {
          request: { method: 'GET', url: '/api/v1/sekolah/search' },
          output: dataOutput,
        },
      },
      {
        name: 'Get School',
        value: 'get',
        action: 'Get a school by NPSN',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/sekolah/{{$parameter["npsn"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'NPSN',
    name: 'npsn',
    type: 'string',
    displayOptions: { show: { resource: ['sekolah'], operation: ['get'] } },
    default: '',
    required: true,
    description: 'National School ID number',
  },
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    displayOptions: { show: { resource: ['sekolah'], operation: ['search'] } },
    default: '',
    required: true,
    routing: { send: { type: 'query', property: 'q' } },
  },
  {
    displayName: 'Province ID Filter',
    name: 'provinsiIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['sekolah'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by province code',
    routing: { send: { type: 'query', property: 'provinsi_id' } },
  },
  {
    displayName: 'Regency ID Filter',
    name: 'kabupatenIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['sekolah'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by regency code',
    routing: { send: { type: 'query', property: 'kabupaten_id' } },
  },
  {
    displayName: 'Jenis Filter',
    name: 'jenisFilter',
    type: 'string',
    displayOptions: { show: { resource: ['sekolah'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by school type (e.g. SMA, SMK, SMP)',
    routing: { send: { type: 'query', property: 'jenis' } },
  },
  {
    displayName: 'Status Filter',
    name: 'statusFilter',
    type: 'string',
    displayOptions: { show: { resource: ['sekolah'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by school status (e.g. Negeri, Swasta)',
    routing: { send: { type: 'query', property: 'status' } },
  },
  returnAllField,
  limitField,
  pageField,
];