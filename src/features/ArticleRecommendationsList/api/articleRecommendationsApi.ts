import { rtkApi } from 'shared/api/rtkApi';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query({
            query: (limit) => ({ // настраиваю обычный http запрос, как в fetch или axios
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
        createArticleRecommendation: build.mutation({ // пример. Не используется
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

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;
export const useCreateArticleRecommendation = recommendationsApi.useGetArticleRecommendationsListQuery; // пример. Не используется
