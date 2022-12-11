import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../../constants/constants';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }

    const {
        firstName, lastName, age,
    } = profile;

    const errors: ValidateProfileError[] = [];

    if (!firstName || !lastName) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!age) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }

    return errors;
};
