import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const liburOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['libur'] } },
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        action: 'Get many holidays',
        routing: {
          request: { method: 'GET', url: '/api/v1/libur' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Upcoming Holidays',
        value: 'upcoming',
        action: 'Get upcoming holidays',
        routing: {
          request: { method: 'GET', url: '/api/v1/libur/upcoming' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Holiday',
        value: 'get',
        action: 'Get a holiday by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/libur/{{$parameter["holidayId"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Holiday ID',
    name: 'holidayId',
    type: 'string',
    displayOptions: { show: { resource: ['libur'], operation: ['get'] } },
    default: '',
    required: true,
  },
  {
    displayName: 'Year',
    name: 'year',
    type: 'number',
    displayOptions: { show: { resource: ['libur'], operation: ['getAll'] } },
    default: new Date().getFullYear(),
    description: 'Filter holidays by year',
    routing: { send: { type: 'query', property: 'tahun' } },
  },
  {
    displayName: 'Month',
    name: 'month',
    type: 'number',
    displayOptions: { show: { resource: ['libur'], operation: ['getAll'] } },
    default: '',
    description: 'Filter holidays by month (1-12)',
    routing: { send: { type: 'query', property: 'bulan' } },
  },
];