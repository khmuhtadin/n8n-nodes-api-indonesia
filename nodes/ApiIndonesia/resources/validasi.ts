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
        name: 'Get Bank by Code',
        value: 'getBank',
        action: 'Get a bank by code',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/validasi/bank/{{$parameter["bankCode"]}}',
          },
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
      {
        name: 'Validate Phone',
        value: 'validateTelepon',
        action: 'Validate a phone number',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/validasi/telepon',
            body: { telepon: '={{$parameter["telepon"]}}' },
          },
          output: dataOutput,
        },
      },
      {
        name: 'Validate Bank Account',
        value: 'validateRekening',
        action: 'Validate a bank account number',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/validasi/rekening',
            body: {
              bank_code: '={{$parameter["bankCode"]}}',
              account_number: '={{$parameter["accountNumber"]}}',
            },
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAllBanks',
  },
  {
    displayName: 'Bank Code',
    name: 'bankCode',
    type: 'string',
    displayOptions: { show: { resource: ['validasi'], operation: ['getBank', 'validateRekening'] } },
    default: '',
    required: true,
    description: 'Bank code (e.g. BCA, BNI)',
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
  {
    displayName: 'Phone Number',
    name: 'telepon',
    type: 'string',
    displayOptions: { show: { resource: ['validasi'], operation: ['validateTelepon'] } },
    default: '',
    required: true,
    description: 'Phone number to validate',
  },
  {
    displayName: 'Account Number',
    name: 'accountNumber',
    type: 'string',
    displayOptions: { show: { resource: ['validasi'], operation: ['validateRekening'] } },
    default: '',
    required: true,
    description: 'Bank account number to validate',
  },
];