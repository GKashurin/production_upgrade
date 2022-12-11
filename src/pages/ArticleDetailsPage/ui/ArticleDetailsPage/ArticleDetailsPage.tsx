import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';
import {
    ArticleRecommendationsList,
} from '@/features/ArticleRecommendationsList/ui/ArticleRecommendationsList/ArticleRecommendationsList';
import { Page } from '@/widgets/Page/Page';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticlesDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

export const ArticleDetailsPage = ({ className }: ArticlesDetailsPageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
