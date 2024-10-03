import React from "react";

import { LatestGoogleKeywordResultsDto } from "@/src/interface-adapters/controllers/google-keyword-tracker/get-latest-google-keyword-results.controller";
import { Card, CardTitle, CardAccordion, CardAccordionItem, CardAccordionTrigger, CardAccordionContent } from "../Card";


const PeopleAlsoAsk = ({
  keywordData,
}: {
  keywordData: LatestGoogleKeywordResultsDto;
}) => {
  if (!keywordData.peopleAlsoAsk) {
    return null;
  }

  return (
    <Card className="h-fit">
      <CardTitle title='People Also Ask' />
      <CardAccordion type='multiple' >
        {keywordData.peopleAlsoAsk.map((item, index) => (
          <CardAccordionItem key={index} value={item.question} >
            <CardAccordionTrigger><p className="theme-t-p font-medium">{item.question}</p></CardAccordionTrigger>
            <CardAccordionContent>{item.snippet}</CardAccordionContent>
          </CardAccordionItem>
        ))}
      </CardAccordion>
    </Card>
  );
};

export default PeopleAlsoAsk;
