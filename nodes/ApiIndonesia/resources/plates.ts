import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const platesOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['plates'] } },
    options: [
      {
                name: 'Get Many',
        value: 'getAll',
        action: 'Get many vehicle plate codes',
        routing: {
          request: { method: 'GET', url: '/api/v1/plates' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Plate Code',
        value: 'get',
        action: 'Get a plate code by code',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/plates/{{$parameter["plateCode"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Plate Code',
    name: 'plateCode',
    type: 'string',
    displayOptions: { show: { resource: ['plates'], operation: ['get'] } },
    default: '',
    required: true,
    description: 'Vehicle plate code (e.g. B for Jakarta)',
  },
];