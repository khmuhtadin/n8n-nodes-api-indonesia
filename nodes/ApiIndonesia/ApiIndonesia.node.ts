import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { resourceOptions } from './shared/constants';
import { resourceProperties } from './resources';
import { listSearchMethods } from './listSearch';

export class ApiIndonesia implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'API Indonesia',
		name: 'apiIndonesia',
		icon: { light: 'file:api-indonesia.light.svg', dark: 'file:api-indonesia.dark.svg' },
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Indonesian public data API - wilayah, sholat, gempa, cuaca, and more',
		defaults: { name: 'API Indonesia' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'apiIndonesiaApi', required: true }],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: { Accept: 'application/json' },
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: resourceOptions,
				default: 'wilayah',
			},
			...resourceProperties,
		],
	};

	methods = {
		listSearch: listSearchMethods,
	};
}