import { GoogleKeywordTrackerKeyword } from "@/src/entities/models/google-keyword-tracker/keyword";

export type InitialSerpApiResponse = {
    searchParameters: searchParameters;
    knowledgeGraph?: any;
    organic: SerperApiSerpResult[] | [];
    places?: SerperApiPlaces[];
    peopleAlsoAsk?: SerpApiPeopleAsloAsk[];
    relatedSearches?: SerpApiRelatedSearches[];
    images?: SerpApiImages[];
    credits: number;
  }
  
  /**
   * Represents the successful fetch response from the SerpApi.
   * - If no results are found, organic will be an empty array.
   */
  export type SuccessfulSerpApiFetches = {
    searchParameters: searchParameters;
    knowledgeGraph?: any;
    /**
     * An array of organic search results.
     * If no results are found, it will be an empty array.
     */
    organic: SerperApiSerpResult[] | [];
  
    keyword: GoogleKeywordTrackerKeyword;
    /**
     * An array of places related to the search.
     */
    places?: SerperApiPlaces[];
    /**
     * An array of "People Also Ask" related to the search.
     */
    peopleAlsoAsk?: SerpApiPeopleAsloAsk[];
    /**
     * An array of related searches.
     */
    relatedSearches?: SerpApiRelatedSearches[];
  
    images?: SerpApiImages[];
  
    credits: number;
  };
  
  type searchParameters = {
    q: string;
    location?: string;
    gl: string;
    hl: string;
    type: string;
    num: number;
    engine: string;
  };
  
  // FetchItem and SuccessfulFetches types
  export type SerperApiSerpResult = {
    title: string;
    link: string;
    snippet: string;
    position: number;
    date?: string;
    sitelinks?: SiteLinks[];
    rating?: number;
    ratingCount?: number;
    attributes?: any;
    imageUrl?: string;
    priceRange?: string;
  };
  
  type SerperApiPlaces = {
    title: string;
    address: string;
    cid: string;
  };
  
  export type SerpApiPeopleAsloAsk = {
    question: string;
    snippet: string;
    title: string;
    link: string;
  };
  
  export type SerpApiRelatedSearches = {
    query: string;
  };
  
  
  type SerpApiImages = {
    title: string;
    imageUrl: string;
    link: string;
  };
  
  export type SiteLinks = {
    title: string;
    link: string;
  };
  
  
  export type GoogleSearchLocation = {
    name: string;
    canonicalName: string;
    googleId: number;
    countryCode: string;
    targetType: string;
  };
  
  
  
  export type CampaignStats = {
    campaignId: string;
    improved: number;
    worsened: number;
    total: number;
    topThree: number;
    topTen: number;
    topHundred: number;
    noChange: number;
    notFound: number;
    averagePosition: number;
  }