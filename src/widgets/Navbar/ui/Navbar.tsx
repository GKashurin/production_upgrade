import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import React, {memo, useCallback, useState} from 'react';
import {Button, ButtonTheme} from 'shared/ui/Button/Button';
import {Text, TextTheme} from 'shared/ui/Text/Text';
import {LoginModal} from 'features/AuthByUsername';
import {useSelector} from 'react-redux';
import {getUserAuthData} from 'entities/User';
import {AppLink, AppLinkTheme} from 'shared/ui/AppLink/AppLink';
import {RoutePath} from 'shared/config/routeConfig/routeConfig';
import cls from './Navbar.module.scss';
import {HStack} from "shared/ui/Stack";
import {NotificationButton} from "features/NotificationButton";
import {AvatarDropdown} from "features/AvatarDropdown";

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({className}: NavbarProps) => {
  const {t} = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          theme={TextTheme.INVERTED}
          className={cls.appName}
          title={t('GK journal')}
        />
        <AppLink
          className={cls.createBtn}
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.article_create}
        >
          {t('Создать статью')}
        </AppLink>
        <HStack gap='16' className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t('Войти')}
      </Button>
      {isAuthModal && (
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      )}
    </header>
  );
});
