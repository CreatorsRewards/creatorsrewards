// import { apiGet } from "./client";
// import type { PlatformStats } from "./types";

// /** Marketing numbers used until the API responds, or if it is down. */
// export const FALLBACK_STATS: PlatformStats = {
//   creatorCount: 1000,
// };

// function isPlatformStats(value: unknown): value is PlatformStats {
//   return (
//     typeof value === "object" &&
//     value !== null &&
//     typeof (value as Record<string, unknown>).creatorCount === "number"
//   );
// }

// /**
//  * Never throws: the landing page must render even if the API is missing,
//  * slow, or returns something unexpected.
//  */
// export async function getPlatformStats(): Promise<PlatformStats> {
//   try {
//     // TODO: match this path to the real route in apps/api.
//     const data = await apiGet<unknown>("/stats/platform", {
//       next: { revalidate: 300 },
//     });
//     return isPlatformStats(data) ? data : FALLBACK_STATS;
//   } catch (error) {
//     console.warn("[getPlatformStats] using fallback:", error);
//     return FALLBACK_STATS;
//   }
// }

import type { PlatformStats } from "./types";

// Static for now. When apps/api has a stats route, this becomes a fetch.
export const PLATFORM_STATS: PlatformStats = { creatorCount: 1000 };
