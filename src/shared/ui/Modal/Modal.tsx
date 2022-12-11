import {classNames, Mods} from '@/shared/lib/classNames/classNames';
import React, {ReactNode,} from 'react';
import {useTheme} from '@/app/providers/ThemeProvider';
import {Portal} from '../Portal/Portal';
import cls from './Modal.module.scss';
import {Overlay} from "../Overlay/Overlay";
import {useModal} from '@/shared/lib/hooks/useModal/useModal';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy: boolean;
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;


    const { theme } = useTheme();

    const {
        isClosing,
        isMounted,
        close
    } = useModal({
        isOpen,
        onClose,
        animationDelay: 300
    })

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <Overlay onClick={close} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
