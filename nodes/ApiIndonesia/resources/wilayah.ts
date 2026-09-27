import type { INodeProperties } from 'n8n-workflow';
import { paginationFields } from '../shared/descriptions';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const wilayahOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['wilayah'] } },
    options: [
      {
        name: 'Get All Provinces',
        value: 'getAllProvinsi',
        action: 'Get all provinces',
        routing: {
          request: { method: 'GET', url: '/api/v1/wilayah/provinsi' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Province',
        value: 'getProvinsi',
        action: 'Get a province',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/wilayah/provinsi/{{$parameter["provinsiId"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Get All Regencies',
        value: 'getAllKabupaten',
        action: 'Get all regencies',
        routing: {
          request: { method: 'GET', url: '/api/v1/wilayah/kabupaten' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Regency',
        value: 'getKabupaten',
        action: 'Get a regency',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/wilayah/kabupaten/{{$parameter["kabupatenId"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Get All Districts',
        value: 'getAllKecamatan',
        action: 'Get all districts',
        routing: {
          request: { method: 'GET', url: '/api/v1/wilayah/kecamatan' },
          output: dataOutput,
        },
      },
      {
        name: 'Get District',
        value: 'getKecamatan',
        action: 'Get a district',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/wilayah/kecamatan/{{$parameter["kecamatanId"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Get All Villages',
        value: 'getAllKelurahan',
        action: 'Get all villages',
        routing: {
          request: { method: 'GET', url: '/api/v1/wilayah/kelurahan' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Village',
        value: 'getKelurahan',
        action: 'Get a village',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/wilayah/kelurahan/{{$parameter["kelurahanId"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Search',
        value: 'search',
        action: 'Search administrative regions',
        routing: {
          request: { method: 'GET', url: '/api/v1/wilayah/search' },
          output: dataOutput,
        },
      },
    ],
    default: 'getAllProvinsi',
  },
  // Province ID for getProvinsi
  {
    displayName: 'Province ID',
    name: 'provinsiId',
    type: 'string',
    displayOptions: { show: { resource: ['wilayah'], operation: ['getProvinsi'] } },
    default: '',
    required: true,
    description: 'Province code (e.g. 11 for Aceh)',
  },
  // Regency ID for getKabupaten
  {
    displayName: 'Regency ID',
    name: 'kabupatenId',
    type: 'string',
    displayOptions: { show: { resource: ['wilayah'], operation: ['getKabupaten'] } },
    default: '',
    required: true,
  },
  // District ID for getKecamatan
  {
    displayName: 'District ID',
    name: 'kecamatanId',
    type: 'string',
    displayOptions: { show: { resource: ['wilayah'], operation: ['getKecamatan'] } },
    default: '',
    required: true,
  },
  // Village ID for getKelurahan
  {
    displayName: 'Village ID',
    name: 'kelurahanId',
    type: 'string',
    displayOptions: { show: { resource: ['wilayah'], operation: ['getKelurahan'] } },
    default: '',
    required: true,
  },
  // Province filter for kabupaten list
  {
    displayName: 'Province ID Filter',
    name: 'provinsiIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['wilayah'], operation: ['getAllKabupaten'] } },
    default: '',
    description: 'Filter by province code (e.g. 11 for Aceh)',
    routing: { send: { type: 'query', property: 'provinsi_id' } },
  },
  // Regency filter for kecamatan list
  {
    displayName: 'Regency ID Filter',
    name: 'kabupatenIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['wilayah'], operation: ['getAllKecamatan'] } },
    default: '',
    description: 'Filter by regency/city code (e.g. 3273)',
    routing: { send: { type: 'query', property: 'kabupaten_id' } },
  },
  // District filter for kelurahan list
  {
    displayName: 'District ID Filter',
    name: 'kecamatanIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['wilayah'], operation: ['getAllKelurahan'] } },
    default: '',
    description: 'Filter by district code (e.g. 327301)',
    routing: { send: { type: 'query', property: 'kecamatan_id' } },
  },
  // Search query
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    displayOptions: { show: { resource: ['wilayah'], operation: ['search'] } },
    default: '',
    required: true,
    routing: { send: { type: 'query', property: 'q' } },
  },
  ...paginationFields('wilayah', ['getAllProvinsi', 'getAllKabupaten', 'getAllKecamatan', 'getAllKelurahan', 'search']),
];