import {classNames} from 'shared/lib/classNames/classNames'
import cls from './NotificationButton.module.scss'
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Icon} from "shared/ui/Icon/Icon";
import NotificationIcon from "shared/assets/icons/notification-20-20.svg";
import {NotificationList} from "entities/Notification";
import {Popover} from "shared/ui/Popups";
import React from "react";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = ({className}: NotificationButtonProps) => {
    return (
      <Popover
        className={classNames(cls.NotificationButton, {}, [className])}
        direction="bottom left"
        trigger={(
          <Button theme={ButtonTheme.CLEAR}>
            <Icon Svg={NotificationIcon} inverted />
          </Button>
        )}
      >
        <NotificationList className={cls.notifications} />
      </Popover>
    )
}