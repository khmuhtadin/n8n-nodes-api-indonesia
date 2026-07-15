import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const halalOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['halal'] } },
    options: [
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-option-name-wrong-for-get-many -- intentionally renamed to avoid duplicating the "Return All Results" toggle
        name: 'List Halal Certificates',
        value: 'getAll',
        action: 'Get many halal certificates',
        routing: {
          request: { method: 'GET', url: '/api/v1/halal' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Halal Certificate',
        value: 'get',
        action: 'Get a halal certificate by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/halal/{{$parameter["halalId"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Halal Certificate ID',
    name: 'halalId',
    type: 'string',
    displayOptions: { show: { resource: ['halal'], operation: ['get'] } },
    default: '',
    required: true,
    description: 'UUID of the halal certificate',
  },
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    displayOptions: { show: { resource: ['halal'], operation: ['getAll'] } },
    default: '',
    required: true,
    description: 'Filter by product name or company (min 2 characters)',
    routing: { send: { type: 'query', property: 'q' } },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: { show: { resource: ['halal'], operation: ['getAll'] } },
    default: 50,
    typeOptions: { minValue: 1, maxValue: 200 },
    description: 'Max number of results to return',
    routing: { send: { type: 'query', property: 'limit' } },
  },
  {
    displayName: 'Offset',
    name: 'offset',
    type: 'number',
    displayOptions: { show: { resource: ['halal'], operation: ['getAll'] } },
    default: 0,
    typeOptions: { minValue: 0 },
    description: 'Number of results to skip',
    routing: { send: { type: 'query', property: 'offset' } },
  },
];