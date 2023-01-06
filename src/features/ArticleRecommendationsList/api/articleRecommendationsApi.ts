import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '@/entities/Article';

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query<Article[], number>({
      query: (limit) => ({
        // настраиваю обычный http запрос, как в fetch или axios
        url: '/articles',
        params: {
          _limit: limit,
        },
      }),
    }),
    createArticleRecommendation: build.mutation({
      // пример. Не используется
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit,
        },
        method: 'POST',
      }),
    }),
  }),
});

export const useArticleRecommendationsList =
  recommendationsApi.useGetArticleRecommendationsListQuery;
export const useCreateArticleRecommendation =
  recommendationsApi.useGetArticleRecommendationsListQuery; // пример. Не используется
