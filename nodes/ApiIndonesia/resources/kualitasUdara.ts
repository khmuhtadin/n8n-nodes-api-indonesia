import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const kualitasUdaraOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['kualitasUdara'] } },
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        action: 'Get many air quality readings for today',
        routing: {
          request: { method: 'GET', url: '/api/v1/kualitas-udara' },
          output: dataOutput,
        },
      },
      {
        name: 'Get City Reading',
        value: 'get',
        action: 'Get latest air quality for a city',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/kualitas-udara/{{encodeURIComponent($parameter["city"])}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'City',
    name: 'city',
    type: 'string',
    displayOptions: { show: { resource: ['kualitasUdara'], operation: ['get'] } },
    default: '',
    required: true,
    description: 'City name, e.g. Jakarta',
  },
];
