import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const astronomiOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['astronomi'] } },
    options: [
      {
        name: 'Get Sun Data',
        value: 'sun',
        action: 'Get sunrise sunset data',
        routing: {
          request: { method: 'GET', url: '/api/v1/astronomi/sun' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Twilight Data',
        value: 'twilight',
        action: 'Get twilight data',
        routing: {
          request: { method: 'GET', url: '/api/v1/astronomi/twilight' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Moon Data',
        value: 'moon',
        action: 'Get moon phase data',
        routing: {
          request: { method: 'GET', url: '/api/v1/astronomi/moon' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Next Moon Phases',
        value: 'moonNext',
        action: 'Get next moon phases',
        routing: {
          request: { method: 'GET', url: '/api/v1/astronomi/moon/next' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Eclipse Data',
        value: 'gerhana',
        action: 'Get eclipse data',
        routing: {
          request: { method: 'GET', url: '/api/v1/astronomi/gerhana' },
          output: dataOutput,
        },
      },
    ],
    default: 'sun',
  },
  {
    displayName: 'Latitude',
    name: 'lat',
    type: 'number',
    displayOptions: { show: { resource: ['astronomi'], operation: ['sun', 'twilight'] } },
    default: -6.2,
    required: true,
    description: 'Latitude (e.g. -6.2 for Jakarta)',
    routing: { send: { type: 'query', property: 'lat' } },
  },
  {
    displayName: 'Longitude',
    name: 'lon',
    type: 'number',
    displayOptions: { show: { resource: ['astronomi'], operation: ['sun', 'twilight'] } },
    default: 106.8,
    required: true,
    description: 'Longitude (e.g. 106.8 for Jakarta)',
    routing: { send: { type: 'query', property: 'lon' } },
  },
  {
    displayName: 'Timezone Offset',
    name: 'tz',
    type: 'string',
    displayOptions: { show: { resource: ['astronomi'], operation: ['sun', 'twilight'] } },
    default: '',
    description: 'Timezone offset (e.g. +07:00). Defaults to 0.',
    routing: { send: { type: 'query', property: 'tz' } },
  },
  {
    displayName: 'Date',
    name: 'tanggal',
    type: 'dateTime',
    displayOptions: {
      show: { resource: ['astronomi'], operation: ['sun', 'twilight', 'moon', 'moonNext', 'gerhana'] },
    },
    default: '',
    description: 'Date (YYYY-MM-DD). Defaults to today.',
    routing: { send: { type: 'query', property: 'tanggal' } },
  },
  {
    displayName: 'Count',
    name: 'count',
    type: 'number',
    displayOptions: { show: { resource: ['astronomi'], operation: ['moonNext'] } },
    default: 4,
    typeOptions: { minValue: 1, maxValue: 12 },
    description: 'Number of upcoming phases (1-12)',
    routing: { send: { type: 'query', property: 'count' } },
  },
  {
    displayName: 'Days',
    name: 'days',
    type: 'number',
    displayOptions: { show: { resource: ['astronomi'], operation: ['gerhana'] } },
    default: 365,
    typeOptions: { minValue: 1, maxValue: 1825 },
    description: 'Number of days to search ahead (1-1825)',
    routing: { send: { type: 'query', property: 'days' } },
  },
];