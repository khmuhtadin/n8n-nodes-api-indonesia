import type { INodeProperties } from 'n8n-workflow';
import { paginationFields } from '../shared/descriptions';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const kampusOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['kampus'] } },
    options: [
      {
                name: 'Get Many',
        value: 'getAll',
        action: 'Get many universities',
        routing: {
          request: { method: 'GET', url: '/api/v1/kampus' },
          output: dataOutput,
        },
      },
      {
        name: 'Search Universities',
        value: 'search',
        action: 'Search universities',
        routing: {
          request: { method: 'GET', url: '/api/v1/kampus/search' },
          output: dataOutput,
        },
      },
      {
        name: 'Get University',
        value: 'get',
        action: 'Get a university by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/kampus/{{$parameter["kampusId"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'University ID',
    name: 'kampusId',
    type: 'string',
    displayOptions: { show: { resource: ['kampus'], operation: ['get'] } },
    default: '',
    required: true,
  },
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    displayOptions: { show: { resource: ['kampus'], operation: ['search'] } },
    default: '',
    required: true,
    routing: { send: { type: 'query', property: 'q' } },
  },
  {
    displayName: 'Province ID Filter',
    name: 'provinsiIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['kampus'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by province code',
    routing: { send: { type: 'query', property: 'province' } },
  },
  {
    displayName: 'Regency ID Filter',
    name: 'kabupatenIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['kampus'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by regency code',
    routing: { send: { type: 'query', property: 'regency' } },
  },
  {
    displayName: 'Type Filter',
    name: 'jenisFilter',
    type: 'string',
    displayOptions: { show: { resource: ['kampus'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by type: universitas, institut, politeknik, akademi, or sekolah_tinggi',
    routing: { send: { type: 'query', property: 'type' } },
  },
  {
    displayName: 'Group Filter',
    name: 'kelompokFilter',
    type: 'string',
    displayOptions: { show: { resource: ['kampus'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by group: PTN, PTS, PTA, or PTK',
    routing: { send: { type: 'query', property: 'group' } },
  },
  ...paginationFields('kampus', ['getAll']),
];