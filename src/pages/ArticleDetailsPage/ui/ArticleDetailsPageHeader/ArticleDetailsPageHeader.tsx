import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPageHeader.module.scss'
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {useCallback} from "react";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import {getArticleDetailsData} from "entities/Article";
import {getCanEditArticle} from "../../model/selectors/article";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = ({className}: ArticleDetailsPageHeaderProps) => {
  const navigate = useNavigate();
  const {t} = useTranslation()
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle)

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`);
  }, [article?.id, navigate]);

  return (
    <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
      <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
        {t('Назад к списку')}
      </Button>
      {canEdit && <Button className={cls.editBtn} theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
        {t('Редактировать')}
      </Button>}
    </div>
  )
}