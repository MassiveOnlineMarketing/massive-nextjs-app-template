
export type SearchConsoleApiErrorResponse = {
  message: string;
  status: 'error';
};

export type SearchConsoleApiFetchSitesSuccessResponse = {
  data: FetchConnectedSitesResponseGoogleSearchApi[];
  status: 'success';
};

export type FetchConnectedSitesResponseGoogleSearchApi = {
  permissionLevel: string;
  siteUrl: string;
};

export type ConnectedGscProperties = {
  siteUrl: string;
};


export type SearchConsoleApiFetchKeywordDataSuccessResponse = {
  data: KeywordSearchConsoleData[];
  status: 'success';
};

export type KeywordSearchConsoleData = {  
  clicks: number
  ctr: number
  date: string
  impressions: number
  position: number
}
