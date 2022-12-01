import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from 'widgets/Page/Page';
import { useSearchParams } from 'react-router-dom';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import {ArticleInfiniteList} from "../ArticleInfiniteList/ArticleInfiniteList";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader 
          reducers={reducers}
          removeAfterUnmount={false}
        >
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleInfiniteList className={cls.list}/>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
