import type { INodeProperties } from 'n8n-workflow';
import { returnAllField, limitField, pageField } from '../shared/descriptions';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const kbbiOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['kbbi'] } },
    options: [
      {
        name: 'Search Words',
        value: 'search',
        action: 'Search KBBI dictionary',
        routing: {
          request: { method: 'GET', url: '/api/v1/kbbi/search' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Word',
        value: 'getWord',
        action: 'Get a word from KBBI',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/kbbi/word/{{$parameter["word"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Get Random Word',
        value: 'random',
        action: 'Get a random word from KBBI',
        routing: {
          request: { method: 'GET', url: '/api/v1/kbbi/random' },
          output: dataOutput,
        },
      },
    ],
    default: 'search',
  },
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    displayOptions: { show: { resource: ['kbbi'], operation: ['search'] } },
    default: '',
    required: true,
    routing: { send: { type: 'query', property: 'q' } },
  },
  {
    displayName: 'Word',
    name: 'word',
    type: 'string',
    displayOptions: { show: { resource: ['kbbi'], operation: ['getWord'] } },
    default: '',
    required: true,
  },
  {
    displayName: 'Count',
    name: 'count',
    type: 'number',
    displayOptions: { show: { resource: ['kbbi'], operation: ['random'] } },
    default: 1,
    description: 'Number of random words to return (max 20)',
    routing: { send: { type: 'query', property: 'count' } },
  },
  returnAllField,
  limitField,
  pageField,
];