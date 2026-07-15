import type { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';

export async function getBibleBooks(
  this: ILoadOptionsFunctions,
  filter?: string,
): Promise<INodeListSearchResult> {
  const credentials = await this.getCredentials('apiIndonesiaApi');
  const baseUrl = (credentials.baseUrl as string) || 'https://use.apiindonesia.id';

  const response = await this.helpers.httpRequestWithAuthentication.call(this, 'apiIndonesiaApi', {
    method: 'GET',
    url: `${baseUrl}/api/v1/alkitab/books`,
    json: true,
  });

  let results = (response.data ?? []).map((b: { abbr: string; name: string }) => ({
    name: b.name,
    value: b.abbr,
  }));
  if (filter) {
    results = results.filter((r: { name: string; value: string }) =>
      r.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  return { results };
}