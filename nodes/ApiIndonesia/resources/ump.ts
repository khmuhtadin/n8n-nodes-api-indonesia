import type { INodeProperties } from 'n8n-workflow';
import { returnAllField, limitField, pageField } from '../shared/descriptions';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const umpOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['ump'] } },
    options: [
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-option-name-wrong-for-get-many -- intentionally renamed to avoid duplicating the "Return All Results" toggle
        name: 'List Minimum Wages',
        value: 'getAll',
        action: 'Get many minimum wages',
        routing: {
          request: { method: 'GET', url: '/api/v1/ump' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Minimum Wages by Province',
        value: 'getByProvince',
        action: 'Get minimum wages by province',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/ump/{{$parameter["provinceCode"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Get Minimum Wage by Province and Year',
        value: 'getByProvinceAndYear',
        action: 'Get minimum wage by province and year',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/ump/{{$parameter["provinceCode"]}}/{{$parameter["umpYear"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Province Code',
    name: 'provinceCode',
    type: 'string',
    displayOptions: {
      show: { resource: ['ump'], operation: ['getByProvince', 'getByProvinceAndYear'] },
    },
    default: '',
    required: true,
    description: 'Province code (e.g. 11 for Aceh)',
  },
  {
    displayName: 'Year',
    name: 'umpYear',
    type: 'number',
    displayOptions: {
      show: { resource: ['ump'], operation: ['getByProvinceAndYear'] },
    },
    default: 2026,
    required: true,
  },
  {
    displayName: 'Year Filter',
    name: 'yearFilter',
    type: 'number',
    displayOptions: { show: { resource: ['ump'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by year',
    routing: { send: { type: 'query', property: 'year' } },
  },
  {
    displayName: 'Province Name Filter',
    name: 'provinceNameFilter',
    type: 'string',
    displayOptions: { show: { resource: ['ump'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by province name (partial match)',
    routing: { send: { type: 'query', property: 'province_name' } },
  },
  {
    displayName: 'Min Salary Filter',
    name: 'minSalaryFilter',
    type: 'number',
    displayOptions: { show: { resource: ['ump'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by minimum salary',
    routing: { send: { type: 'query', property: 'min_salary' } },
  },
  {
    displayName: 'Max Salary Filter',
    name: 'maxSalaryFilter',
    type: 'number',
    displayOptions: { show: { resource: ['ump'], operation: ['getAll'] } },
    default: '',
    description: 'Filter by maximum salary',
    routing: { send: { type: 'query', property: 'max_salary' } },
  },
  returnAllField,
  limitField,
  pageField,
];