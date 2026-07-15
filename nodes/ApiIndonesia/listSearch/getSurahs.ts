import type { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';

export async function getSurahs(
  this: ILoadOptionsFunctions,
  filter?: string,
): Promise<INodeListSearchResult> {
  const credentials = await this.getCredentials('apiIndonesiaApi');
  const baseUrl = (credentials.baseUrl as string) || 'https://use.apiindonesia.id';

  const response = await this.helpers.httpRequestWithAuthentication.call(this, 'apiIndonesiaApi', {
    method: 'GET',
    url: `${baseUrl}/api/v1/quran/list-surah`,
    json: true,
  });

  let results = (response.data ?? []).map((s: { id: number; name: string }) => ({
    name: s.name,
    value: String(s.id),
  }));
  if (filter) {
    results = results.filter((r: { name: string; value: string }) =>
      r.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  return { results };
}