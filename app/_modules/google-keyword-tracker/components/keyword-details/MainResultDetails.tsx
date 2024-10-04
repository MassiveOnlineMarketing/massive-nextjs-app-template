
import { LatestGoogleKeywordResultsDto } from "@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller";
import { Location } from "@/src/entities/models/location";

import KeywordDetails from "./main-result-details/cards/KeywordDetails";
import GoogleAdsMetrics from "./main-result-details/cards/GoogleAdsMetrics";
import MetaData from "./main-result-details/cards/MetaData";
import Url from "./main-result-details/cards/Url";
import TopSerpResults from "./main-result-details/cards/TopSerpResults";
import RelatedSearches from "./main-result-details/cards/RelatedSearches";
import PeopleAlsoAsk from "./main-result-details/cards/PeopleAlsoAsk";

import { BarChart } from "lucide-react";


const MainResultDetails = ({ keywordData, domain, toolId, location }: {
  keywordData: LatestGoogleKeywordResultsDto,
  domain: string
  toolId: string
  location: Location | undefined
}) => {

  console.log('Render MainResultDetails');

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <KeywordDetails keywordData={keywordData} />
        <GoogleAdsMetrics keywordData={keywordData} />
      </div>

      <Sepetator Icon={BarChart} text="SERP Data" />

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <Url url={keywordData.url} domainUrl={domain} />
          <MetaData metaTitle={keywordData.metaTitle} metaDescription={keywordData.metaDescription} />
        </div>
        <div className="space-y-6">
          <TopSerpResults keywordId={keywordData.keywordId} userDomain={domain} />
        </div>
      </div>


      {
        keywordData.peopleAlsoAsk || keywordData.relatedSearches ? (
          <Sepetator Icon={BarChart} text="Related Searches" />
        ) : null
      }
      <div className="grid grid-cols-2 gap-6 pb-6">
        <RelatedSearches keywordData={keywordData} toolId={toolId} location={location} />
        <PeopleAlsoAsk keywordData={keywordData} />
      </div>

    </>
  );
}

const Sepetator = ({ Icon, text }: { Icon: React.ElementType, text: string }) => {

  return (
    <div className="py-6 flex items-center gap-2">
      <Icon className="text-base-500 w-[18px] h-[18px]" />
      <p className="text-xl theme-t-p font-medium">{text}</p>
      <Svg />
    </div>
  );
}


const Svg = () => {
  return (
    <svg width="82" height="9" viewBox="0 0 82 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M43.5 8.42371L50 0.423706L6.5 0.423708L0 8.42371L43.5 8.42371Z" fill="#DFE5FA" />
      <path d="M54.5 8.42371L61 0.423706L54.5 0.423706L48 8.42371L54.5 8.42371Z" fill="#DFE5FA" />
      <path d="M65 8.42371L71 0.423706L65 0.423706L59 8.42371L65 8.42371Z" fill="#DFE5FA" />
      <path d="M75.5 8.42371L82 0.423706L75.5 0.423706L69 8.42371L75.5 8.42371Z" fill="#DFE5FA" />
    </svg>

  )
}

export default MainResultDetails;