import { ErrorMessages } from '../models/errors.model';

export const errorHandler = (error: string) => {
  if (error === ErrorMessages.FirebaseInvalidPassword) {
    return 'Invalid Password';
  }
  if (error === ErrorMessages.FirebaseIvalidEmail) {
    return 'Invalid Email';
  }
  return '';
};
