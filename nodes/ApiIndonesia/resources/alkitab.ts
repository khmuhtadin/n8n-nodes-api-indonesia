import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const alkitabOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['alkitab'] } },
    options: [
      {
        name: 'Get All Books',
        value: 'getBooks',
        action: 'Get all bible books',
        routing: {
          request: { method: 'GET', url: '/api/v1/alkitab/books' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Books by Testament',
        value: 'getBooksByTestament',
        action: 'Get bible books by testament',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/alkitab/books/{{$parameter["testament"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Get Passage',
        value: 'getPassage',
        action: 'Get a bible passage',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/alkitab/passage/{{$parameter["bookAbbr"]}}/{{$parameter["chapter"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Get Verse',
        value: 'getVerse',
        action: 'Get a specific bible verse',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/alkitab/verse/{{$parameter["bookAbbr"]}}/{{$parameter["chapter"]}}/{{$parameter["verse"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Search Bible',
        value: 'search',
        action: 'Search the bible',
        routing: {
          request: { method: 'GET', url: '/api/v1/alkitab/search' },
          output: dataOutput,
        },
      },
    ],
    default: 'getBooks',
  },
  {
    displayName: 'Testament',
    name: 'testament',
    type: 'options',
    displayOptions: { show: { resource: ['alkitab'], operation: ['getBooksByTestament'] } },
    options: [
      { name: 'Old Testament', value: 'PL' },
      { name: 'New Testament', value: 'PB' },
    ],
    default: 'PL',
    required: true,
  },
  {
    displayName: 'Book',
    name: 'bookAbbr',
    type: 'resourceLocator',
    default: { mode: 'list', value: '' },
    displayOptions: {
      show: { resource: ['alkitab'], operation: ['getPassage', 'getVerse'] },
    },
    required: true,
    description: 'Select a book or enter its abbreviation',
    modes: [
      {
        displayName: 'List',
        name: 'list',
        type: 'list',
        typeOptions: {
          searchListMethod: 'getBibleBooks',
          searchable: true,
        },
      },
      {
        displayName: 'Abbreviation',
        name: 'id',
        type: 'string',
      },
    ],
  },
  {
    displayName: 'Chapter',
    name: 'chapter',
    type: 'number',
    displayOptions: {
      show: { resource: ['alkitab'], operation: ['getPassage', 'getVerse'] },
    },
    default: 1,
    required: true,
  },
  {
    displayName: 'Verse',
    name: 'verse',
    type: 'number',
    displayOptions: { show: { resource: ['alkitab'], operation: ['getVerse'] } },
    default: 1,
    required: true,
  },
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    displayOptions: { show: { resource: ['alkitab'], operation: ['search'] } },
    default: '',
    required: true,
    routing: { send: { type: 'query', property: 'q' } },
  },
  {
    displayName: 'Limit',
    name: 'alkitabLimit',
    type: 'number',
    displayOptions: { show: { resource: ['alkitab'], operation: ['search'] } },
    default: 20,
    description: 'Max number of results (max 100)',
    routing: { send: { type: 'query', property: 'limit' } },
  },
  {
    displayName: 'Offset',
    name: 'alkitabOffset',
    type: 'number',
    displayOptions: { show: { resource: ['alkitab'], operation: ['search'] } },
    default: 0,
    description: 'Number of results to skip',
    routing: { send: { type: 'query', property: 'offset' } },
  },
];