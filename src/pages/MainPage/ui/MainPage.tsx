import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Counter } from '@/entities/Counter';

const MainPage = memo(() => {
  const { t } = useTranslation();

  // interface Square {
  //     width: number;
  // }
  //
  // interface Reqtangle extends Square {
  //     height: number;
  // }
  //
  // type Shape = Square | Reqtangle // точно будет width
  //
  // function calculateArea(shape: Shape) {
  //     if (shape instanceof Reqtangle) {
  //         return shape.width * shape.height
  //     }
  //     return shape.width * shape.width;
  // }
  //
  // function calculateArea1(shape: Shape) {
  //     if ('height' in shape) {
  //         return shape.width * shape.height;
  //     }
  //     return shape.width * shape.width;
  // }
  //
  // function setLightSwitch(value: boolean) {
  //     switch (value) {
  //     case true:
  //         console.log('on');
  //         break;
  //     case false:
  //         console.log('off');
  //         break;
  //     default:
  //         console.log('default');
  //     }
  // }

  return (
    <Page data-testid="MainPage">
      {t('Главная страница')}
      <Counter />
    </Page>
  );
});

export default MainPage;
