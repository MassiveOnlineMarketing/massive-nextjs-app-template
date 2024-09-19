import { CardTitle, Card, CardPlainRow, CardRow, CardAdsBidRow, CardAccordion, CardAccordionItem, CardAccordionTrigger, CardAccordionContent } from '@/app/_modules/google-keyword-tracker/components/card'
import { TraficLight, TraficLightIndicator } from '@/app/_modules/google-keyword-tracker/components/TraficLightIndicator'
import React from 'react'

//! Deze card component moet nog worden aangapst 
const KwDetailCard = () => {
  return (
    <div>
      <Card className='w-[600px]'>
        <CardTitle title='Keyword'>
          <TraficLight>
            <div className='theme-t-p font-semibold mr-3'>
              2nd
            </div>
            <TraficLightIndicator maxValue={10} currentValue={2} flip />
          </TraficLight>
        </CardTitle>
        <CardPlainRow value='keywordName' />
        <CardRow label='Position' value='2' fill />
        <CardRow label='Best Position' value='4' />
        <CardAdsBidRow label='Higest bid' value='0099012' fill />
        <CardAdsBidRow label='Lowest bid' value='0099012' />

        <CardAccordion type='multiple' >
          <CardAccordionItem key={1} value='Is elke dag koffie slecht voor je?' >
            <CardAccordionTrigger><p>Is elke dag koffie slecht voor je?</p></CardAccordionTrigger>
            <CardAccordionContent><p>Gezonde volwassenen kunnen gemiddeld zonder problemen, naast 3 kopjes groene of zwarte thee, nog ongeveer 5 kopjes koffie drinken per dag (1 kopje is 125 milliliter), als ze verder geen of weinig producten met cafeïne nemen. Voor zwangere vrouwen, vrouwen die borstvoeding geven en kinderen gelden lagere adviezen</p></CardAccordionContent>
          </CardAccordionItem>

          <CardAccordionItem key={2} value='Is elke dag koffie slecht voor je' >
            <CardAccordionTrigger><p>Is elke dag koffie slecht voor je?</p></CardAccordionTrigger>
            <CardAccordionContent><p>Gezonde volwassenen kunnen gemiddeld zonder problemen, naast 3 kopjes groene of zwarte thee, nog ongeveer 5 kopjes koffie drinken per dag (1 kopje is 125 milliliter), als ze verder geen of weinig producten met cafeïne nemen. Voor zwangere vrouwen, vrouwen die borstvoeding geven en kinderen gelden lagere adviezen</p></CardAccordionContent>
          </CardAccordionItem>
        </CardAccordion>


      </Card>
    </div>
  )
}

export default KwDetailCard