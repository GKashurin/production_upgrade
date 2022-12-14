import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../constants/constants';

const data = {
  username: 'admin',
  age: 22,
  country: Country.Ukraine,
  lastName: 'Кашурин',
  firstName: 'asd',
  city: 'asf',
  currency: Currency.USD,
};

describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test('without first and last name', async () => {
    const result = validateProfileData({
      ...data,
      firstName: '',
      lastName: '',
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  test('incorrect all', async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
    ]);
  });
});
