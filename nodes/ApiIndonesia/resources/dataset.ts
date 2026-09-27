import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const datasetOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['dataset'] } },
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        action: 'Get many dataset metadata',
        routing: {
          request: { method: 'GET', url: '/api/v1/meta/datasets' },
          output: dataOutput,
        },
      },
      {
        name: 'Get',
        value: 'get',
        action: 'Get dataset metadata',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/meta/datasets/{{$parameter["dataset"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Dataset ID',
    name: 'dataset',
    type: 'string',
    displayOptions: { show: { resource: ['dataset'], operation: ['get'] } },
    default: '',
    required: true,
    description: 'Dataset ID, e.g. sekolah',
  },
];
