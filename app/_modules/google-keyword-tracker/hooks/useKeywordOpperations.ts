"use client";

import { useToast } from "@/app/_components/ui/toast/use-toast";

export function useKeywordOpperations() {
  const { toast } = useToast();

  async function addNewGoogleKeyword() {
    const keywordString =
      "baristart\nEureka mignon\nEureka mignon specialita\n\nRocket appartamento";

    const res = await fetch("/api/serp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keywordsString: keywordString,
        googleKeywordTrackerToolId: "cm10ys4200000q48b5bvyzw2a",
      }),
    });

    const status = res.status;
    const data = await res.json();
    console.log("data use test", data);

    if (status === 200) {
      // TODO: Deduct display credits
      const creditsToDeduct = data.message;
      
      toast({
        title: "Keywords added",
        // description: "Google keywords added successfully",
        variant: "success",
      })

      return;
    }

    toast({
      title: "Failed to add keywords",
      description: data.message,
      variant: "destructive",
    })
  }

  return { addNewGoogleKeyword };
}
