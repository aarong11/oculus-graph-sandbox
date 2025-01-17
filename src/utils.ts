export function prettify (data: Object) {
  return JSON.stringify(data, null, '  ');
}

export function payloadDecoder (payload: String) {
  interface Result {
    queries: string;
    access_token: string;
  }

  let result = {};
  payload.split('&').forEach((v) => {
    let vv = v.split('=');
    result[vv[0]] = decodeURIComponent(vv[1]);
  });
  return <Result> result;
}

export function toQueryString (object: Object) {
  let qs = [];
  for (let key in object) {
    qs.push(`${key}=${encodeURIComponent(object[key])}`);
  }
  return qs.join('&');
}

export function generatePayload (accessToken: String, query: String) {
  return toQueryString({
    method: 'GET',
    q: query,
    response_format: 'json'
  });
}

// Quick and dirty to make the query barely legible
export function prettifyQuery (query: String) {
  return query
    .replace(/\{/g, '$&\n')
    .replace(/\},?/g, '$&\n')
    .replace('QueryFragment', '\n\n$&')
    .replace(',', ', ');
}
