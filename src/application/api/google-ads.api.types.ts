export type FetchHistoricalMetricsResponseGoogleAdsApi = {
  keyword_metrics: KeywordMetrics;
  text: string;
};

export type KeywordMetrics = {
  googleSearchKeywordId: string;
  avg_monthly_searches: string | null;
  competition: string | null;
  competition_index: string | null;
  high_top_of_page_bid_micros: string | null;
  low_top_of_page_bid_micros: string | null;
  monthly_search_volumes: MonthlySearchVolume[];
};

type MonthlySearchVolume = {
  month: string;
  monthly_searches: string;
  year: string;
};