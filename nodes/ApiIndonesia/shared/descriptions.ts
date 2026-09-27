import type { INodeProperties } from 'n8n-workflow';

// Return All / Limit / Page fields for list operations that respond with
// `meta.page` and `meta.total_pages`.
export function paginationFields(
  resource: string,
  operations: string[],
  perPageProperty = 'per_page',
): INodeProperties[] {
  return [
    {
      displayName: 'Return All Results',
      name: 'returnAll',
      type: 'boolean',
      displayOptions: { show: { resource: [resource], operation: operations } },
      default: false,
      description: 'Whether to return all results or only up to a given limit',
      routing: {
        send: {
          paginate: '={{$value}}',
          type: 'query',
          property: perPageProperty,
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
    },
    {
      displayName: 'Limit',
      name: 'limit',
      type: 'number',
      typeOptions: {
        minValue: 1,
      },
      displayOptions: {
        show: { resource: [resource], operation: operations, returnAll: [false] },
      },
      default: 50,
      description: 'Max number of results to return',
      routing: {
        send: { type: 'query', property: perPageProperty },
        output: { maxResults: '={{$value}}' },
      },
    },
    {
      displayName: 'Page',
      name: 'page',
      type: 'number',
      displayOptions: {
        show: { resource: [resource], operation: operations, returnAll: [false] },
      },
      default: 1,
      routing: { send: { type: 'query', property: 'page' } },
    },
  ];
}
