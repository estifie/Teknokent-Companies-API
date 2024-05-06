export class UserNotFoundException extends Error {
  constructor(message?: string) {
    super(message || 'User not found');
    this.name = 'UserNotFoundException';
  }
}

export class UserCreationException extends Error {
  constructor(message?: string) {
    super(message || 'Error creating user');
    this.name = 'UserCreationException';
  }
}

export class UserUpdateException extends Error {
  constructor(message?: string) {
    super(message || 'Error updating user');
    this.name = 'UserUpdateException';
  }
}

export class UserDeletionException extends Error {
  constructor(message?: string) {
    super(message || 'Error removing user');
    this.name = 'UserDeletionException';
  }
}

export class UserAuthenticationException extends Error {
  constructor(message?: string) {
    super(message || 'Error authenticating user');
    this.name = 'UserAuthenticationException';
  }
}
