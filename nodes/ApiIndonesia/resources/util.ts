import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const utilOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['util'] } },
    options: [
      {
        name: 'Format Rupiah',
        value: 'rupiahFormat',
        action: 'Format a number as rupiah',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/util/rupiah/format',
            body: { amount: '={{$parameter["amount"]}}' },
          },
          output: dataOutput,
        },
      },
      {
        name: 'Parse Rupiah Text',
        value: 'rupiahParse',
        action: 'Parse rupiah formatted text to number',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/util/rupiah/parse',
            body: { text: '={{$parameter["text"]}}' },
          },
          output: dataOutput,
        },
      },
      {
        name: 'Rupiah Terbilang',
        value: 'rupiahTerbilang',
        action: 'Convert a number to indonesian words',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/util/rupiah/terbilang',
            body: { amount: '={{$parameter["amount"]}}' },
          },
          output: dataOutput,
        },
      },
      {
        name: 'Dummy NIK',
        value: 'dummyNik',
        action: 'Generate a dummy NIK',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/util/dummy/nik',
            body: {
              province_code: '={{$parameter["provinceCode"]}}',
              gender: '={{$parameter["gender"]}}',
              birth_date: '={{$parameter["birthDate"]}}',
            },
          },
          output: dataOutput,
        },
      },
      {
        name: 'Dummy NPWP',
        value: 'dummyNpwp',
        action: 'Generate a dummy NPWP',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/util/dummy/npwp',
            body: { format: '={{$parameter["npwpFormat"]}}' },
          },
          output: dataOutput,
        },
      },
      {
        name: 'Dummy Phone',
        value: 'dummyTelepon',
        action: 'Generate a dummy phone number',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/util/dummy/telepon',
            body: { operator: '={{$parameter["operator"]}}' },
          },
          output: dataOutput,
        },
      },
      {
        name: 'Parse QRIS',
        value: 'qrisParse',
        action: 'Parse a QRIS payload',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/util/qris/parse',
            body: { payload: '={{$parameter["payload"]}}' },
          },
          output: dataOutput,
        },
      },
      {
        name: 'QRIS to Dynamic',
        value: 'qrisToDynamic',
        action: 'Convert a static QRIS to dynamic',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/util/qris/to-dynamic',
            body: {
              payload: '={{$parameter["payload"]}}',
              amount: '={{$parameter["amount"]}}',
              fee: '={{$parameter["fee"]}}',
            },
          },
          output: dataOutput,
        },
      },
    ],
    default: 'rupiahFormat',
  },
  {
    displayName: 'Amount',
    name: 'amount',
    type: 'number',
    displayOptions: { show: { resource: ['util'], operation: ['rupiahFormat', 'rupiahTerbilang', 'qrisToDynamic'] } },
    default: 0,
    required: true,
    description: 'Numeric amount',
  },
  {
    displayName: 'Text',
    name: 'text',
    type: 'string',
    displayOptions: { show: { resource: ['util'], operation: ['rupiahParse'] } },
    default: '',
    required: true,
    description: 'Rupiah formatted text to parse (e.g. "Rp 1.500.000")',
  },
  {
    displayName: 'Province Code',
    name: 'provinceCode',
    type: 'string',
    displayOptions: { show: { resource: ['util'], operation: ['dummyNik'] } },
    default: '',
    description: 'Optional province code (2-digit BPS)',
  },
  {
    displayName: 'Gender',
    name: 'gender',
    type: 'options',
    displayOptions: { show: { resource: ['util'], operation: ['dummyNik'] } },
    default: 'male',
    options: [
      { name: 'Male', value: 'male' },
      { name: 'Female', value: 'female' },
    ],
    description: 'Optional gender',
  },
  {
    displayName: 'Birth Date',
    name: 'birthDate',
    type: 'dateTime',
    displayOptions: { show: { resource: ['util'], operation: ['dummyNik'] } },
    default: '',
    description: 'Optional birth date (YYYY-MM-DD)',
  },
  {
    displayName: 'NPWP Format',
    name: 'npwpFormat',
    type: 'options',
    displayOptions: { show: { resource: ['util'], operation: ['dummyNpwp'] } },
    default: 'legacy_15',
    options: [
      { name: 'Legacy 15-Digit', value: 'legacy_15' },
      { name: 'NIK 16-Digit', value: 'nik_16' },
    ],
    description: 'NPWP format to generate',
  },
  {
    displayName: 'Operator',
    name: 'operator',
    type: 'string',
    displayOptions: { show: { resource: ['util'], operation: ['dummyTelepon'] } },
    default: '',
    description: 'Optional operator name (e.g. telkomsel, xl)',
  },
  {
    displayName: 'QRIS Payload',
    name: 'payload',
    type: 'string',
    displayOptions: { show: { resource: ['util'], operation: ['qrisParse', 'qrisToDynamic'] } },
    default: '',
    required: true,
    description: 'QRIS payload string',
  },
  {
    displayName: 'Fee',
    name: 'fee',
    type: 'number',
    displayOptions: { show: { resource: ['util'], operation: ['qrisToDynamic'] } },
    default: 0,
    description: 'Optional additional fee',
  },
];