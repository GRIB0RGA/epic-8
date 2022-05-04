export enum InputTypes {
  Firstname = 'firstName',
  Lastname = 'lastName',
  PasswordGroup = 'passwordGroup',
  Password = 'password',
  RepeatePassword = 'repeatePassword',
  Email = 'email',
  Role = 'role',
}

export enum RegisterErrors {
  FormatError = 'The email address is badly formatted',
  EmailIsTaken = 'The email address is already taken',
}
