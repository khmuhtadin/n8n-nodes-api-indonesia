import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const bpomOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['bpom'] } },
    options: [
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-option-name-wrong-for-get-many -- intentionally renamed to avoid duplicating the "Return All Results" toggle
        name: 'List BPOM Products',
        value: 'getAll',
        action: 'Get many BPOM products',
        routing: {
          request: { method: 'GET', url: '/api/v1/bpom' },
          output: dataOutput,
        },
      },
      {
        name: 'Get BPOM Product',
        value: 'get',
        action: 'Get a BPOM product by NIE',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/bpom/{{$parameter["nie"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'NIE',
    name: 'nie',
    type: 'string',
    displayOptions: { show: { resource: ['bpom'], operation: ['get'] } },
    default: '',
    required: true,
    description: 'BPOM registration number (NIE). Backend uppercases it.',
  },
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    displayOptions: { show: { resource: ['bpom'], operation: ['getAll'] } },
    default: '',
    required: true,
    description: 'Filter by product name (min 2 characters)',
    routing: { send: { type: 'query', property: 'q' } },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: { show: { resource: ['bpom'], operation: ['getAll'] } },
    default: 50,
    typeOptions: { minValue: 1, maxValue: 200 },
    description: 'Max number of results to return',
    routing: { send: { type: 'query', property: 'limit' } },
  },
  {
    displayName: 'Offset',
    name: 'offset',
    type: 'number',
    displayOptions: { show: { resource: ['bpom'], operation: ['getAll'] } },
    default: 0,
    typeOptions: { minValue: 0 },
    description: 'Number of results to skip',
    routing: { send: { type: 'query', property: 'offset' } },
  },
];