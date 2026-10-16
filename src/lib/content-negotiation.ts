import Negotiator from 'negotiator'

export function negotiatePage(accept: string | null) {
  // HTML is the default for missing Accept and wildcards. Both variants use UTF-8.
  const type = new Negotiator({ headers: { accept: accept ?? '*/*' } }).mediaType([
    'text/html; charset=utf-8',
    'text/markdown; charset=utf-8',
  ])
  return type?.split(';')[0]
}
