import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const merekOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['merek'] } },
    options: [
      {
        name: 'Search Trademarks',
        value: 'search',
        action: 'Search registered trademarks',
        routing: {
          request: { method: 'GET', url: '/api/v1/merek/search' },
          output: dataOutput,
        },
      },
      {
        name: 'Search Journal',
        value: 'journal',
        action: 'Search the trademark journal',
        routing: {
          request: { method: 'GET', url: '/api/v1/merek/journal' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Trademark',
        value: 'get',
        action: 'Get a trademark',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/merek/{{$parameter["appNumber"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'search',
  },
  {
    displayName: 'Application Number',
    name: 'appNumber',
    type: 'string',
    displayOptions: { show: { resource: ['merek'], operation: ['get'] } },
    default: '',
    required: true,
    description: 'Trademark application number, e.g. DID2019050403',
  },
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    displayOptions: { show: { resource: ['merek'], operation: ['search'] } },
    default: '',
    required: true,
    description: 'Search keyword, e.g. garuda',
    routing: { send: { type: 'query', property: 'q' } },
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    displayOptions: { show: { resource: ['merek'], operation: ['search'] } },
    default: {},
    options: [
      {
        displayName: 'Class',
        name: 'class',
        type: 'string',
        default: '',
        description: 'NICE class, e.g. 35',
        routing: { send: { type: 'query', property: 'class' } },
      },
      {
        displayName: 'Owner',
        name: 'owner',
        type: 'string',
        default: '',
        description: 'Trademark owner name',
        routing: { send: { type: 'query', property: 'owner' } },
      },
      {
        displayName: 'Search In',
        name: 'in',
        type: 'options',
        options: [{ name: 'Owner', value: 'owner' }],
        default: 'owner',
        description: 'Search the keyword in the owner column instead of the mark name',
        routing: { send: { type: 'query', property: 'in' } },
      },
    ],
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    displayOptions: { show: { resource: ['merek'], operation: ['journal'] } },
    default: {},
    options: [
      {
        displayName: 'Journal Number',
        name: 'journal_no',
        type: 'string',
        default: '',
        description: 'Journal number, e.g. 140/P-M/VII/A/2026',
        routing: { send: { type: 'query', property: 'journal_no' } },
      },
      {
        displayName: 'Search Query',
        name: 'q',
        type: 'string',
        default: '',
        description: 'Search keyword, e.g. garuda',
        routing: { send: { type: 'query', property: 'q' } },
      },
    ],
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: { minValue: 1 },
    displayOptions: { show: { resource: ['merek'], operation: ['search', 'journal'] } },
    default: 50,
    description: 'Max number of results to return',
    routing: { send: { type: 'query', property: 'limit' } },
  },
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    typeOptions: { minValue: 1 },
    displayOptions: { show: { resource: ['merek'], operation: ['search', 'journal'] } },
    default: 1,
    routing: { send: { type: 'query', property: 'page' } },
  },
];
