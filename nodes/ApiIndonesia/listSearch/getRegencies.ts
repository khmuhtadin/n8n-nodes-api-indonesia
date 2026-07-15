import type { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';

export async function getRegencies(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodeListSearchResult> {
  const page = paginationToken ? +paginationToken : 1;
  const credentials = await this.getCredentials('apiIndonesiaApi');
  const baseUrl = (credentials.baseUrl as string) || 'https://use.apiindonesia.id';

  const response = await this.helpers.httpRequestWithAuthentication.call(this, 'apiIndonesiaApi', {
    method: 'GET',
    url: `${baseUrl}/api/v1/wilayah/kabupaten`,
    qs: { page, per_page: 50 },
    json: true,
  });

  let results = (response.data ?? []).map((r: { id: string; name: string }) => ({
    name: r.name,
    value: r.id,
  }));
  if (filter) {
    results = results.filter((r: { name: string; value: string }) =>
      r.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  const nextToken =
    response.meta && page < response.meta.total_pages ? String(page + 1) : undefined;
  return { results, paginationToken: nextToken };
}