export class CompanyNotFoundException extends Error {
  constructor(message?: string) {
    super(message || 'Company not found');
    this.name = 'CompanyNotFoundException';
  }
}

export class CompanyCreationException extends Error {
  constructor(message?: string) {
    super(message || 'Error creating company');
    this.name = 'CompanyCreationException';
  }
}

export class CompanyUpdateException extends Error {
  constructor(message?: string) {
    super(message || 'Error updating company');
    this.name = 'CompanyUpdateException';
  }
}

export class CompanyDeletionException extends Error {
  constructor(message?: string) {
    super(message || 'Error removing company');
    this.name = 'CompanyDeletionException';
  }
}
