/**
 * Returns the URL for the favicon of a given website.
 * @param url - The URL of the website.
 * @returns The URL for the favicon.
 */
export function getFaviconUrl(url: string): string {
    return `https://www.google.com/s2/favicons?domain=${url}&sz=32`;
  }