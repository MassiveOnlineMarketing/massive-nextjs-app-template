"use client";

import { useToast } from "@/app/_components/ui/toast/use-toast";

export function useKeywordOpperations() {
  const { toast } = useToast();


  
  async function addNewGoogleKeyword(keywordsString: string, googleKeywordTrackerToolId: string) {
    const res = await fetch("/api/serp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keywordsString,
        googleKeywordTrackerToolId
      }),
    });

    const status = res.status;
    const data = await res.json();

    if (status === 200) {
      // TODO: Deduct display credits
      const creditsToDeduct = data.message;
      
      toast({
        title: "Keywords added",
        variant: "success",
      })

      return { success: true };
    }

    toast({
      title: "Failed to add keywords",
      description: data.message,
      variant: "destructive",
    })

    return { success: false };
  }

  return { addNewGoogleKeyword };
}
