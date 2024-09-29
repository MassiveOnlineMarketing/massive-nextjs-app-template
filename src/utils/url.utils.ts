/**
 * Extracts the hostname from a given URL string.
 * 
 * @param url - The URL string from which to extract the hostname.
 * @returns The hostname if the URL includes "http", otherwise returns the original URL string.
 */
export const extractHostname = (url: string) => {
  if (url.includes("http")) return new URL(url).hostname;
  return url;
};
