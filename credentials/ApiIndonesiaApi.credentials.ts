import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

const icon = { light: 'file:api-indonesia.svg', dark: 'file:api-indonesia.svg' } as const;

export class ApiIndonesiaApi implements ICredentialType {
	name = 'apiIndonesiaApi';
	displayName = 'API Indonesia API';
	icon = icon;
  documentationUrl = 'https://docs.apiindonesia.id';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description: 'Your API Indonesia key (starts with aip_live_)',
    },
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://use.apiindonesia.id',
      description: 'Override for dev/staging. Leave default for production.',
    },
  ];
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'x-api-key': '={{$credentials.apiKey}}',
      },
    },
  };
  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '/api/v1/wilayah/provinsi',
      method: 'GET',
    },
  };
}