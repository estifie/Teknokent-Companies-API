export class ProviderNotFoundException extends Error {
  constructor(message?: string) {
    super(message || 'Provider not found');
    this.name = 'ProviderNotFoundException';
  }
}

export class ProviderCreationException extends Error {
  constructor(message?: string) {
    super(message || 'Error creating provider');
    this.name = 'ProviderCreationException';
  }
}

export class ProviderUpdateException extends Error {
  constructor(message?: string) {
    super(message || 'Error updating provider');
    this.name = 'ProviderUpdateException';
  }
}

export class ProviderDeletionException extends Error {
  constructor(message?: string) {
    super(message || 'Error removing provider');
    this.name = 'ProviderDeletionException';
  }
}
