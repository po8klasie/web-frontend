import environment from '../environment/server';

export const fetchData = (path: string) => fetch(`${environment.publicEnvironment.API_URL}${path}`);

export const fetchJson = <T = unknown>(path: string) =>
  fetchData(path).then((res) => res.json() as T);
