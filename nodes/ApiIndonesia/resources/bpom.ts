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
                name: 'Get Many',
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
];