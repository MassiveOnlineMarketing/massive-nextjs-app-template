import { z } from "zod";
import { Website } from "./website";
import { GoogleKeywordTrackerCompetitor, selectGoogleKeywordTrackerCompetitorCoreSchema } from "./google-keyword-tracker/competitor";
import { Location } from "./location";

export type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

export const DAYS_OF_WEEK: {value: DayOfWeek; label: string}[] = [
    { value: "MONDAY", label: "Monday" },
    { value: "TUESDAY", label: "Tuesday" },
    { value: "WEDNESDAY", label: "Wednesday" },
    { value: "THURSDAY", label: "Thursday" },
    { value: "FRIDAY", label: "Friday" },
    { value: "SATURDAY", label: "Saturday" },
    { value: "SUNDAY", label: "Sunday" },
  ];

export const selectGoogleKeywordTrackerCoreSchema = z.object({
    id: z.string(),
    locationId: z.string(),
    websiteId: z.string(),
    status: z.enum(['ACTIVE', 'PAUSED', 'PENDING' ]),
    refresh: z.array(z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])),
    createdAt: z.date(),
    updatedAt: z.date(),

    // keywords: z.array(selectGoogleKeywordTrackerKeywordSchema).nullable(),
    // stats: z.array(selectGoogleKeywordTrackerStatsSchema).nullable(),
    competitors: z.array(selectGoogleKeywordTrackerCompetitorCoreSchema).nullable(),
})

export const googleKeywordTrackerSchema = selectGoogleKeywordTrackerCoreSchema.pick({
    id: true,
    locationId: true,
    websiteId: true,
    status: true,
    refresh: true,
    createdAt: true,
    updatedAt: true,
});

export type GoogleKeywordTracker = z.infer<typeof googleKeywordTrackerSchema>;


// Backend schemas > both loading with core and normal type export works
const selectGoogleKeywordTrackerWithCompetitorsSchema = selectGoogleKeywordTrackerCoreSchema.extend({
    competitors: z.lazy(() => z.array(selectGoogleKeywordTrackerCompetitorCoreSchema)),
});
export type GoogleKeywordTrackerWithCompetitors = z.infer<typeof selectGoogleKeywordTrackerWithCompetitorsSchema>;
export type GoogleKeywordTrackerWithWebsite = z.infer<typeof googleKeywordTrackerSchema & { website: Website }>;
export type GoogleKeywordTrackerWithCompetitorsWebsiteAndLocation = z.infer<typeof googleKeywordTrackerSchema > & {website: Website, location: Location, competitors: GoogleKeywordTrackerCompetitor[]};

// Backend operation schemas
const insertGoogleKeywordTrackerSchema = selectGoogleKeywordTrackerCoreSchema.pick({
    locationId: true,
    websiteId: true,
    refresh: true,
});
export type GoogleKeywordTrackerInsert = z.infer<typeof insertGoogleKeywordTrackerSchema>;


// Fort-end form input schema
export const formInputCreateGoogleKeywordTrackerSchema = selectGoogleKeywordTrackerCoreSchema.extend({
    competitors: z.array(z.string()).optional(),
    keywords: z.string().optional(),
}).pick({
    locationId: true,
    refresh: true,
    competitors: true,
    keywords: true,
});
