/**
 * Replaces the domain URL in a given URL with a forward slash ("/").
 * If the resulting URL does not start with a "/", it is prepended with one.
 *
 * @param url - The URL to modify.
 * @param domainUrl - The domain URL to replace.
 * @returns The modified URL with the domain URL replaced by a forward slash.
 *          If the resulting URL does not start with a "/", it is prepended with one.
 */
export function urlWithoutDomain(url: string, domainUrl: string): string {
  let result = url.replace(domainUrl, "");
  if (!result.startsWith("/")) {
    result = "/" + result;
  }
  return result;
}

/**
 * Extracts the hostname from a given URL.
 *
 * @param url - The URL string from which to extract the hostname.
 * @returns The hostname if the URL includes "http", otherwise returns the original URL string.
 */
export function extractHostname(url: string) {
  if (url.includes("http")) return new URL(url).hostname;
  return url
};