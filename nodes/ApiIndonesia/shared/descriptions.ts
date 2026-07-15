import type { INodeProperties } from 'n8n-workflow';

// Resources that have paginated list operations
const paginatedResources = [
  'wilayah', 'sekolah', 'kampus', 'rs', 'kodepos', 'alkitab', 'cuaca', 'kbbi', 'ump',
  'peringatanDini',
];

// Operations within those resources that return paginated lists
const paginatedOperations = [
  'getAll', 'getAllProvinsi', 'getAllKabupaten', 'getAllKecamatan',
  'getAllKelurahan', 'search', 'getByProvince',
];

const paginationDisplay = {
  resource: paginatedResources,
  operation: paginatedOperations,
};

export const returnAllField: INodeProperties = {
  displayName: 'Return All Results',
  name: 'returnAll',
  type: 'boolean',
  displayOptions: { show: paginationDisplay },
  default: false,
  description: 'Whether to return all results or only up to a given limit',
  routing: {
    send: {
      paginate: '={{$value}}',
      type: 'query',
      property: 'per_page',
      value: '100',
    },
    operations: {
      pagination: {
        type: 'generic',
        properties: {
          continue:
            '={{ $response.body.meta && $response.body.meta.page < $response.body.meta.total_pages }}',
          request: {
            qs: {
              page: '={{ ($response.body.meta?.page ?? 1) + 1 }}',
            },
          },
        },
      },
    },
  },
};

export const limitField: INodeProperties = {
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
		typeOptions: {
			minValue: 1,
		},
  displayOptions: {
    show: {
      ...paginationDisplay,
      returnAll: [false],
    },
  },
  default: 50,
  description: 'Max number of results to return',
  routing: {
    send: { type: 'query', property: 'per_page' },
    output: { maxResults: '={{$value}}' },
  },
};

export const pageField: INodeProperties = {
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: {
    show: {
      ...paginationDisplay,
      returnAll: [false],
    },
  },
  default: 1,
  routing: { send: { type: 'query', property: 'page' } },
};