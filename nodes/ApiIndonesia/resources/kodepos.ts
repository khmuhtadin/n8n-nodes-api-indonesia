import type { INodeProperties } from 'n8n-workflow';
import { paginationFields } from '../shared/descriptions';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const kodeposOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['kodepos'] } },
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        action: 'Get many postal codes',
        routing: {
          request: { method: 'GET', url: '/api/v1/kodepos' },
          output: dataOutput,
        },
      },
      {
        name: 'Search Postal Codes',
        value: 'search',
        action: 'Search postal codes',
        routing: {
          request: { method: 'GET', url: '/api/v1/kodepos/search' },
          output: dataOutput,
        },
      },
      {
        name: 'Lookup Codes',
        value: 'lookup',
        action: 'Look up postal and region codes',
        routing: {
          request: { method: 'GET', url: '/api/v1/kodepos/lookup' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Postal Code',
        value: 'get',
        action: 'Get a postal code by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/kodepos/{{$parameter["kodeposId"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Postal Code ID',
    name: 'kodeposId',
    type: 'string',
    displayOptions: { show: { resource: ['kodepos'], operation: ['get'] } },
    default: '',
    required: true,
  },
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    displayOptions: { show: { resource: ['kodepos'], operation: ['search'] } },
    default: '',
    required: true,
    routing: { send: { type: 'query', property: 'q' } },
  },
  {
    displayName: 'Province ID Filter',
    name: 'provinsiIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['kodepos'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by province code',
    routing: { send: { type: 'query', property: 'provinsi_id' } },
  },
  {
    displayName: 'Regency ID Filter',
    name: 'kabupatenIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['kodepos'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by regency code',
    routing: { send: { type: 'query', property: 'kabupaten_id' } },
  },
  {
    displayName: 'District ID Filter',
    name: 'kecamatanIdFilter',
    type: 'string',
    displayOptions: { show: { resource: ['kodepos'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by district code',
    routing: { send: { type: 'query', property: 'kecamatan_id' } },
  },
  {
    displayName: 'Codes',
    name: 'lookupCodes',
    type: 'collection',
    placeholder: 'Add Code',
    displayOptions: { show: { resource: ['kodepos'], operation: ['getAll', 'lookup'] } },
    default: {},
    description: 'Filter by postal, BPS or Kemendagri code',
    options: [
      {
        displayName: 'BPS District Code',
        name: 'bps_district_code',
        type: 'string',
        default: '',
        routing: { send: { type: 'query', property: 'bps_district_code' } },
      },
      {
        displayName: 'BPS Province Code',
        name: 'bps_province_code',
        type: 'string',
        default: '',
        routing: { send: { type: 'query', property: 'bps_province_code' } },
      },
      {
        displayName: 'BPS Regency Code',
        name: 'bps_regency_code',
        type: 'string',
        default: '',
        routing: { send: { type: 'query', property: 'bps_regency_code' } },
      },
      {
        displayName: 'BPS Village Code',
        name: 'bps_village_code',
        type: 'string',
        default: '',
        routing: { send: { type: 'query', property: 'bps_village_code' } },
      },
      {
        displayName: 'Kemendagri District Code',
        name: 'kemendagri_district_code',
        type: 'string',
        default: '',
        routing: { send: { type: 'query', property: 'kemendagri_district_code' } },
      },
      {
        displayName: 'Kemendagri Province Code',
        name: 'kemendagri_province_code',
        type: 'string',
        default: '',
        routing: { send: { type: 'query', property: 'kemendagri_province_code' } },
      },
      {
        displayName: 'Kemendagri Regency Code',
        name: 'kemendagri_regency_code',
        type: 'string',
        default: '',
        routing: { send: { type: 'query', property: 'kemendagri_regency_code' } },
      },
      {
        displayName: 'Kemendagri Village Code',
        name: 'kemendagri_village_code',
        type: 'string',
        default: '',
        description: 'Village code, e.g. 32.73.01.1001',
        routing: { send: { type: 'query', property: 'kemendagri_village_code' } },
      },
      {
        displayName: 'Postal Code',
        name: 'kode_pos',
        type: 'string',
        default: '',
        description: '5-digit postal code',
        routing: { send: { type: 'query', property: 'kode_pos' } },
      },
    ],
  },
  ...paginationFields('kodepos', ['getAll', 'search', 'lookup']),
];