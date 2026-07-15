import type { INodeProperties } from 'n8n-workflow';
import { returnAllField, limitField, pageField } from '../shared/descriptions';

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
        // eslint-disable-next-line n8n-nodes-base/node-param-option-name-wrong-for-get-many -- intentionally renamed to avoid duplicating the "Return All Results" toggle
        name: 'List Early Warnings',
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
  returnAllField,
  limitField,
  pageField,
];