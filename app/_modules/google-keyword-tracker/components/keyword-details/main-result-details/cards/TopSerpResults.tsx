import React from 'react'




import { Card, CardAccordion, CardAccordionContent, CardAccordionItem, CardAccordionTrigger, CardTitle } from '../Card'
import { getOrdinalSuffix } from '@/app/_utils/numberUtils'
import { cn } from '@/app/_components/utils'
import useFetchTopTenSerpResults from '@/app/_modules/google-keyword-tracker/hooks/fetching/useFetchTopTenSerpResults'

const TopSerpResults = ({
  keywordId,
  userDomain
}: {
  keywordId: string
  userDomain: string
}) => {
  const { data } = useFetchTopTenSerpResults(keywordId)

  if (!data) return

  return (
    <Card>
      <CardTitle title='Top SERP Results' />
      <CardAccordion type='multiple'>
        {data
          .sort((a, b) => a.position - b.position)
          .map((result, index) => {
            const url = new URL(result.url);
            const domainName = url.hostname
              .replace("www.", "")
              .split(".")
              .slice(0, -1)
              .join(".");
            const domainUrl = url.hostname

            const { metaTitle, metaDescription } = result;
            const usersPosition = userDomain.includes(domainName)
            const suffix = getOrdinalSuffix(result.position)


            return (
              <CardAccordionItem key={index} value={result.url}>
                <CardAccordionTrigger >
                  <div className='flex gap-2'>
                    <div className='w-10 h-10 rounded-[4px] theme-bg-p flex items-center justify-center'>{result.position}{suffix}</div>
                    <div className='text-left'>
                      <p className={cn(
                        usersPosition ? 'text-base-500' : 'theme-t-p',
                      )}>{domainName}</p>
                      <p className='theme-t-s'>{domainUrl}</p>
                    </div>
                  </div>
                </CardAccordionTrigger>
                <CardAccordionContent >
                  <p className='text-base-500 text-xl'>{metaTitle}</p>
                  <p className='theme-t-s'>{metaDescription}</p>
                </CardAccordionContent>
              </CardAccordionItem>
            )
          })}
      </CardAccordion>
    </Card>
  )
}

export default TopSerpResults