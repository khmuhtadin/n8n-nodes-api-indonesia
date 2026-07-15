import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const ojkInvestOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['ojkInvest'] } },
    options: [
      {
        name: 'Get All Investment Products',
        value: 'getAllProducts',
        action: 'Get all investment products',
        routing: {
          request: { method: 'GET', url: '/api/v1/ojk/products' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Investment Product',
        value: 'getProduct',
        action: 'Get an investment product by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/ojk/products/{{$parameter["productId"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Get All Investment Apps',
        value: 'getAllApps',
        action: 'Get all investment apps',
        routing: {
          request: { method: 'GET', url: '/api/v1/ojk/apps' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Investment App',
        value: 'getApp',
        action: 'Get an investment app by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/ojk/apps/{{$parameter["appId"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Get All Illegal Investments',
        value: 'getAllIllegals',
        action: 'Get all illegal investments',
        routing: {
          request: { method: 'GET', url: '/api/v1/ojk/illegals' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Illegal Investment',
        value: 'getIllegal',
        action: 'Get an illegal investment by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/ojk/illegals/{{$parameter["illegalId"]}}',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'getAllProducts',
  },
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'number',
    displayOptions: { show: { resource: ['ojkInvest'], operation: ['getProduct'] } },
    default: '',
    required: true,
    description: 'Investment product ID (positive integer)',
  },
  {
    displayName: 'App ID',
    name: 'appId',
    type: 'number',
    displayOptions: { show: { resource: ['ojkInvest'], operation: ['getApp'] } },
    default: '',
    required: true,
    description: 'Investment app ID (positive integer)',
  },
  {
    displayName: 'Illegal Investment ID',
    name: 'illegalId',
    type: 'number',
    displayOptions: { show: { resource: ['ojkInvest'], operation: ['getIllegal'] } },
    default: '',
    required: true,
    description: 'Illegal investment ID (positive integer)',
  },
  {
    displayName: 'Name Filter',
    name: 'nameFilter',
    type: 'string',
    displayOptions: {
      show: { resource: ['ojkInvest'], operation: ['getAllProducts', 'getAllApps', 'getAllIllegals'] },
    },
    default: '',
    description: 'Filter by name (partial match)',
    routing: { send: { type: 'query', property: 'name' } },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: { resource: ['ojkInvest'], operation: ['getAllProducts', 'getAllApps', 'getAllIllegals'] },
    },
    default: 50,
    typeOptions: { minValue: 1, maxValue: 200 },
    description: 'Max number of results to return',
    routing: { send: { type: 'query', property: 'limit' } },
  },
  {
    displayName: 'Offset',
    name: 'offset',
    type: 'number',
    displayOptions: {
      show: { resource: ['ojkInvest'], operation: ['getAllProducts', 'getAllApps', 'getAllIllegals'] },
    },
    default: 0,
    typeOptions: { minValue: 0 },
    description: 'Number of results to skip',
    routing: { send: { type: 'query', property: 'offset' } },
  },
];