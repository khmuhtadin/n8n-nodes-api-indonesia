import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const validasiOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['validasi'] } },
    options: [
      {
        name: 'Get All Banks',
        value: 'getAllBanks',
        action: 'Get all supported banks',
        routing: {
          request: { method: 'GET', url: '/api/v1/validasi/bank' },
          output: dataOutput,
        },
      },
      {
        name: 'Validate NIK',
        value: 'validateNik',
        action: 'Validate a NIK',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/validasi/nik',
            body: { nik: '={{$parameter["nik"]}}' },
          },
          output: dataOutput,
        },
      },
      {
        name: 'Validate NPWP',
        value: 'validateNpwp',
        action: 'Validate an NPWP',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/validasi/npwp',
            body: { npwp: '={{$parameter["npwp"]}}' },
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAllBanks',
  },
  {
    displayName: 'NIK',
    name: 'nik',
    type: 'string',
    displayOptions: { show: { resource: ['validasi'], operation: ['validateNik'] } },
    default: '',
    required: true,
    description: 'National ID number (NIK) to validate',
  },
  {
    displayName: 'NPWP',
    name: 'npwp',
    type: 'string',
    displayOptions: { show: { resource: ['validasi'], operation: ['validateNpwp'] } },
    default: '',
    required: true,
    description: 'Tax ID number (NPWP) to validate',
  },
];