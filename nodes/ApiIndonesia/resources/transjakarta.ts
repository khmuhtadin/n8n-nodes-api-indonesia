import type { INodeProperties } from 'n8n-workflow';
import { paginationFields } from '../shared/descriptions';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const transjakartaOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['transjakarta'] } },
    options: [
      {
        name: 'Get Many Stops',
        value: 'getAllHalte',
        action: 'Get many bus stops',
        routing: {
          request: { method: 'GET', url: '/api/v1/transjakarta/halte' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Nearby Stops',
        value: 'nearbyHalte',
        action: 'Get nearby bus stops',
        routing: {
          request: { method: 'GET', url: '/api/v1/transjakarta/halte/nearby' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Stop',
        value: 'getHalte',
        action: 'Get a bus stop',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/transjakarta/halte/{{$parameter["halteId"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Get Many Routes',
        value: 'getAllRute',
        action: 'Get many routes',
        routing: {
          request: { method: 'GET', url: '/api/v1/transjakarta/rute' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Route',
        value: 'getRute',
        action: 'Get a route',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/transjakarta/rute/{{$parameter["ruteId"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Get Schedules',
        value: 'jadwal',
        action: 'Get departure headways',
        routing: {
          request: { method: 'GET', url: '/api/v1/transjakarta/jadwal' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Fares',
        value: 'tarif',
        action: 'Get fares',
        routing: {
          request: { method: 'GET', url: '/api/v1/transjakarta/tarif' },
          output: dataOutput,
        },
      },
    ],
    default: 'getAllHalte',
  },
  {
    displayName: 'Stop ID',
    name: 'halteId',
    type: 'string',
    displayOptions: { show: { resource: ['transjakarta'], operation: ['getHalte'] } },
    default: '',
    required: true,
    description: 'Stop ID, e.g. B02475P',
  },
  {
    displayName: 'Route ID',
    name: 'ruteId',
    type: 'string',
    displayOptions: { show: { resource: ['transjakarta'], operation: ['getRute'] } },
    default: '',
    required: true,
    description: 'Route ID, e.g. 1, 1C, 10A, or JAK.79',
  },
  {
    displayName: 'Latitude',
    name: 'lat',
    type: 'number',
    typeOptions: { numberPrecision: 6 },
    displayOptions: { show: { resource: ['transjakarta'], operation: ['nearbyHalte'] } },
    default: -6.172531,
    required: true,
    routing: { send: { type: 'query', property: 'lat' } },
  },
  {
    displayName: 'Longitude',
    name: 'lng',
    type: 'number',
    typeOptions: { numberPrecision: 6 },
    displayOptions: { show: { resource: ['transjakarta'], operation: ['nearbyHalte'] } },
    default: 106.82315,
    required: true,
    routing: { send: { type: 'query', property: 'lng' } },
  },
  {
    displayName: 'Radius (Meters)',
    name: 'radius',
    type: 'number',
    typeOptions: { minValue: 1, maxValue: 5000 },
    displayOptions: { show: { resource: ['transjakarta'], operation: ['nearbyHalte'] } },
    default: 1000,
    routing: { send: { type: 'query', property: 'radius' } },
  },
  {
    displayName: 'Limit',
    name: 'nearbyLimit',
    type: 'number',
    typeOptions: { minValue: 1, maxValue: 100 },
    displayOptions: { show: { resource: ['transjakarta'], operation: ['nearbyHalte'] } },
    default: 20,
    description: 'Max number of results to return',
    routing: { send: { type: 'query', property: 'limit' } },
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    displayOptions: { show: { resource: ['transjakarta'], operation: ['getAllHalte', 'getAllRute'] } },
    default: {},
    options: [
      {
        displayName: 'Search Query',
        name: 'q',
        type: 'string',
        default: '',
        description: 'Search by name, code or ID, e.g. monas',
        routing: { send: { type: 'query', property: 'q' } },
      },
    ],
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    displayOptions: { show: { resource: ['transjakarta'], operation: ['jadwal'] } },
    default: {},
    options: [
      {
        displayName: 'Route ID',
        name: 'rute',
        type: 'string',
        default: '',
        description: 'Route ID, e.g. 10A',
        routing: { send: { type: 'query', property: 'rute' } },
      },
    ],
  },
  ...paginationFields('transjakarta', ['getAllHalte', 'getAllRute', 'jadwal']),
];
