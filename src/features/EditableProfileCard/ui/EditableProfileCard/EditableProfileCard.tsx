import {classNames} from 'shared/lib/classNames/classNames'
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {useCallback} from "react";
import {Currency} from "entities/Currency";
import {Country} from "entities/Country";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {getProfileForm} from "../../model/selectors/getProfileForm/getProfileForm";
import {getProfileIsLoading} from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import {getProfileValidateErrors} from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import {getProfileReadonly} from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import {getProfileError} from "../../model/selectors/getProfileError/getProfileError";
import {ValidateProfileError} from "../../model/types/editableProfileCardSchema";
import {fetchProfileData} from "../../model/services/fetchProfileData/fetchProfileData";
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import {ProfileCard} from "entities/Profile";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import {VStack} from "shared/ui/Stack";

interface EditableProfileCardProps {
    className?: string;
    id: string;
}

export const EditableProfileCard = ({className, id}: EditableProfileCardProps) => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);


  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
  };

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  const onChangeFirstname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ firstName: value || '' }));
  }, [dispatch]);

  const onChangelastName = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ lastName: value || '' }));
  }, [dispatch]);

  const onChangeCity = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ city: value || '' }));
  }, [dispatch]);

  const onChangeAge = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
  }, [dispatch]);

  const onChangeUsername = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ username: value || '' }));
  }, [dispatch]);

  const onChangeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ avatar: value || '' }));
  }, [dispatch]);

  const onChangeCurrency = useCallback((currency: Currency) => {
    dispatch(profileActions.updateProfile({ currency }));
  }, [dispatch]);

  const onChangeCountry = useCallback((country: Country) => {
    dispatch(profileActions.updateProfile({ country }));
  }, [dispatch]);

  const reducers: ReducersList = {
    profile: profileReducer,
  };

    return (
        <DynamicModuleLoader reducers={reducers}>
          <VStack gap='8' max className={classNames('', {}, [className])}>
            <EditableProfileCardHeader />
            {validateErrors?.length && validateErrors.map((err) => (
              <Text
                key={err}
                theme={TextTheme.ERROR}
                text={validateErrorTranslates[err]}
              />
            ))}
            <ProfileCard
              data={formData}
              isLoading={isLoading}
              error={error}
              readonly={readonly}
              onChangeFirstname={onChangeFirstname}
              onChangelastName={onChangelastName}
              onChangeAge={onChangeAge}
              onChangeCity={onChangeCity}
              onChangeUsername={onChangeUsername}
              onChangeAvatar={onChangeAvatar}
              onChangeCurrency={onChangeCurrency}
              onChangeCountry={onChangeCountry}
            />
          </VStack>
        </DynamicModuleLoader>
    )
}