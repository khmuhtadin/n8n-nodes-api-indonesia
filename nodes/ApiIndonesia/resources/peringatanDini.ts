import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const peringatanDiniOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['peringatanDini'] } },
    options: [
      {
                name: 'Get Many',
        value: 'getAll',
        action: 'Get many early warnings',
        routing: {
          request: { method: 'GET', url: '/api/v1/peringatan-dini' },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Province Filter',
    name: 'provinsi',
    type: 'string',
    displayOptions: { show: { resource: ['peringatanDini'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by province name (partial match)',
    routing: { send: { type: 'query', property: 'provinsi' } },
  },
];