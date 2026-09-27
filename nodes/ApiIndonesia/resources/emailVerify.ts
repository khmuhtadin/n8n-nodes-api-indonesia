import type { INodeProperties } from 'n8n-workflow';

const dataOutput = {
  postReceive: [{ type: 'rootProperty' as const, properties: { property: 'data' } }],
};

export const emailVerifyOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['emailVerify'] } },
    options: [
      {
        name: 'Verify Email',
        value: 'verify',
        action: 'Verify an email address',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/email/verify',
            body: { email: '={{$parameter["email"]}}' },
          },
          output: dataOutput,
        },
      },
      {
        name: 'Get Credits',
        value: 'credits',
        action: 'Get remaining email verification credits',
        routing: {
          request: { method: 'GET', url: '/api/v1/email/verify/credits' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Many Jobs',
        value: 'getAllJobs',
        action: 'Get many bulk verification jobs',
        routing: {
          request: { method: 'GET', url: '/api/v1/email/verify/jobs' },
          output: dataOutput,
        },
      },
      {
        name: 'Get Job',
        value: 'getJob',
        action: 'Get a bulk verification job',
        routing: {
          request: {
            method: 'GET',
            url: '=/api/v1/email/verify/jobs/{{$parameter["jobId"]}}',
          },
          output: dataOutput,
        },
      },
      {
        name: 'Cancel Job',
        value: 'cancelJob',
        action: 'Cancel a bulk verification job',
        routing: {
          request: {
            method: 'POST',
            url: '=/api/v1/email/verify/jobs/{{$parameter["jobId"]}}/cancel',
          },
          output: dataOutput,
        },
      },
    ],
    default: 'verify',
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    displayOptions: { show: { resource: ['emailVerify'], operation: ['verify'] } },
    default: '',
    required: true,
    description: 'Email address to verify',
  },
  {
    displayName: 'Job ID',
    name: 'jobId',
    type: 'string',
    displayOptions: { show: { resource: ['emailVerify'], operation: ['getJob', 'cancelJob'] } },
    default: '',
    required: true,
    description: 'Job ID, e.g. vjob_5b7e1c9a-4d2f-4a11-9c3e-2d5a17a0cd91',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: { minValue: 1, maxValue: 100 },
    displayOptions: { show: { resource: ['emailVerify'], operation: ['getAllJobs'] } },
    default: 50,
    description: 'Max number of results to return',
    routing: { send: { type: 'query', property: 'limit' } },
  },
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    typeOptions: { minValue: 1 },
    displayOptions: { show: { resource: ['emailVerify'], operation: ['getAllJobs'] } },
    default: 1,
    routing: { send: { type: 'query', property: 'page' } },
  },
];
