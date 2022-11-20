import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();
    const arr = [1, 1, 1, 2, 5, 5, 2, 2, 7, 2, 2, 2];

    const getUniqueSortArray = () => {
        const hash = arr.reduce((acc: Record<string, number>, item: number) => {
            acc[item] = acc[item] ? acc[item] + 1 : 1;
            return acc;
        }, {});
        const entries: Array<[string, number]> = Object.entries(hash);
        return entries.sort((a, b) => a[1] - b[1]).map(([key]) => Number(key));
    };

    return (
        <Page>
            {t('Главная страница')}
        </Page>
    );
});

export default MainPage;
