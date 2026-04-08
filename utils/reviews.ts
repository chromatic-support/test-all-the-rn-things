import reviewsData from '@/data/reviews.json';

export type FlavorReviewSummary = {
  averageRating: number;
  reviewCount: number;
};

/**
 * Builds a lookup of review summaries keyed by flavorId.
 * Computed once at module load since reviews.json is static.
 */
function buildReviewSummaries(): Record<string, FlavorReviewSummary> {
  const totals: Record<string, { sum: number; count: number }> = {};

  for (const review of reviewsData) {
    if (!totals[review.flavorId]) {
      totals[review.flavorId] = { sum: 0, count: 0 };
    }
    totals[review.flavorId].sum += review.rating;
    totals[review.flavorId].count += 1;
  }

  const summaries: Record<string, FlavorReviewSummary> = {};
  for (const [flavorId, { sum, count }] of Object.entries(totals)) {
    summaries[flavorId] = {
      averageRating: sum / count,
      reviewCount: count,
    };
  }

  return summaries;
}

const REVIEW_SUMMARIES = buildReviewSummaries();

export function getFlavorReviewSummary(flavorId: string): FlavorReviewSummary {
  return REVIEW_SUMMARIES[flavorId] ?? { averageRating: 0, reviewCount: 0 };
}
