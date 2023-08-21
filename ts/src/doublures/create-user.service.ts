export class User {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: any
  ) {}
}

export interface IUserRepository {
  insert(name: string, email: string): string;

  get(id: string): User | null;
}

export class UserValidationService {
  sendActivationLinkToUser(id: string): void {
    // Do something potentially complex
    throw Error('AH AH YOU FAIL');
  }
}

export class NotificationService {
  sendNotification(to: string, message: string): void {
    // Do something we don't care for now
  }
}

export class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private userValidationService: UserValidationService,
    private notificationService: NotificationService
  ) {}

  createUser(name: string, email: string): string {
    const id = this.userRepository.insert(name, email);
    this.userValidationService.sendActivationLinkToUser(id);
    return id;
  }
}
