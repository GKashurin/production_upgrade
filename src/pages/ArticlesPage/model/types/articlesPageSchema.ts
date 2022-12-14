import { EntityState } from '@reduxjs/toolkit';
import {
  Article,
  ArticleSortField,
  ArticleType,
  ArticleView,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;

  // pagination
  page: number;
  limit: number;
  hasMore: boolean;

  // filters
  order: SortOrder;
  view: ArticleView;
  sort: ArticleSortField;
  search: string;
  _inited: boolean;
  type: ArticleType;
}
