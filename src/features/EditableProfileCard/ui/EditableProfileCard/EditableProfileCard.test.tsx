import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { EditableProfileCard } from './EditableProfileCard';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { profileReducer } from '../../model/slice/profileSlice';
import { $api } from '@/shared/api/api';

const profile: Profile = {
  id: '1',
  firstName: 'admin',
  lastName: 'admin',
  age: 44,
  currency: Currency.EUR,
  country: Country.Belarus,
  city: 'Ekb',
  username: 'adm123',
};

const options = {
  initialState: {
    // данные для теста
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: '1',
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('features/EditableProfileCard', () => {
  test('Переключение в режим редактирования', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton'),
    ).toBeInTheDocument();
  });

  test('При отмене значения обнуляются', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    await userEvent.clear(screen.getByTestId('Profilecard.firstname')); // очищаю значения в двух инпутах
    await userEvent.clear(screen.getByTestId('Profilecard.lastname'));

    await userEvent.type(screen.getByTestId('Profilecard.firstname'), 'user'); // вместо admin / admin записываю user / user
    await userEvent.type(screen.getByTestId('Profilecard.lastname'), 'user');
    expect(screen.getByTestId('Profilecard.lastname')).toHaveValue('user'); // убеждаюсь, что инпут содержит нужное значение
    expect(screen.getByTestId('Profilecard.firstname')).toHaveValue('user'); // убеждаюсь, что инпут содержит нужное значение
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.CancelButton'),
    ); // нажимаю кнопку отмены
    await userEvent.type(screen.getByTestId('Profilecard.firstname'), 'admin');
    await userEvent.type(screen.getByTestId('Profilecard.lastname'), 'admin'); // должны вернуться значения admin / admin
  });

  test('Должна появиться ошибка', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    await userEvent.clear(screen.getByTestId('Profilecard.firstname')); // очищаю значение
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton'),
    ); // нажимаю кнопку сохранения
    expect(
      screen.getByTestId('EditableProfileCard.Error.paragraph'),
    ).toBeInTheDocument(); // жду ошибку
  });

  test('Если нет ошибок валидации, улетает запрос', async () => {
    const mockPutRequest = jest.spyOn($api, 'put');
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    await userEvent.type(screen.getByTestId('Profilecard.firstname'), 'user');
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton'),
    );
    expect(mockPutRequest).toHaveBeenCalled();
  });
});
