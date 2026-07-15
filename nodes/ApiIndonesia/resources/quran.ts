import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const quranOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['quran'] } },
    options: [
      {
        name: 'List Surahs',
        value: 'listSurah',
        action: 'Get all surahs',
        routing: {
          request: { method: 'GET', url: '/api/v1/quran/list-surah' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Surah',
        value: 'getSurah',
        action: 'Get a surah by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/quran/surah/{{$parameter["surahId"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'listSurah',
  },
  {
    displayName: 'Surah ID',
    name: 'surahId',
    type: 'resourceLocator',
    default: { mode: 'list', value: '' },
    displayOptions: { show: { resource: ['quran'], operation: ['getSurah'] } },
    required: true,
    description: 'Select a surah or enter its ID',
    modes: [
      {
        displayName: 'List',
        name: 'list',
        type: 'list',
        typeOptions: {
          searchListMethod: 'getSurahs',
          searchable: true,
        },
      },
      {
        displayName: 'ID',
        name: 'id',
        type: 'string',
      },
    ],
  },
];