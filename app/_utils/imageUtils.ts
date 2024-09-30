/**
 * Returns the URL for the favicon of a given website.
 * @param url - The URL of the website.
 * @returns The URL for the favicon.
 */
export function getFaviconUrl(url: string): string {
  if (!url.startsWith('https://')) {
    if (url.startsWith('http://')) {
      url = 'https://' + url.substring(7);
    } else {
      url = 'https://' + url;
    }
  }
    return `https://www.google.com/s2/favicons?domain=${url}&sz=32`;
  }