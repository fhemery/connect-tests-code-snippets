import {
  CreateUserService,
  IUserRepository,
  NotificationService,
  User,
  UserValidationService,
} from "./create-user.service";

describe("createUserService", () => {
  let service: CreateUserService;

  describe("when using a stub", function () {
    class StubUserRepository implements IUserRepository {
      insert(name: string, email: string): string {
        return "123";
      }

      get() {
        return null;
      }
    }

    it("should return the id send by the repository", () => {
      const validationService = new UserValidationService();
      service = new CreateUserService(
        new StubUserRepository(),
        validationService,
        {} as NotificationService
      );

      jest
        .spyOn(validationService, "sendActivationLinkToUser")
        .mockReturnValue();

      const id = service.createUser("John Doe", "john@doe.fr");

      expect(id).toBe("123");
    });
  });

  describe("when using a spy", function () {
    it("should check validation service is called", () => {
      const validationService = new UserValidationService();
      service = new CreateUserService(
        new FakeUserRepository(),
        validationService,
        {} as NotificationService
      );
      const spy = jest
        .spyOn(validationService, "sendActivationLinkToUser")
        .mockReturnValue();

      const id = service.createUser("John Doe", "john@doe.fr");

      expect(spy).toHaveBeenCalledWith(id);
    });
  });

  describe("when using a mock", function () {
    it("should check validation service is called with right parameter", () => {
      const validationService = new UserValidationService();
      service = new CreateUserService(
        new FakeUserRepository(),
        validationService,
        {} as NotificationService
      );
      const spy = jest
        .spyOn(validationService, "sendActivationLinkToUser")
        .mockImplementation((id) => {
          if (id !== "1") {
            throw new Error("Nope");
          }
        });

      const id = service.createUser("John Doe", "john@doe.fr");

      expect(spy).toHaveBeenCalledWith(id);
    });
  });

  class FakeUserRepository implements IUserRepository {
    private users = new Map<string, User>();

    get(id: string): User | null {
      return this.users.get(id) || null;
    }

    insert(name: string, email: string): string {
      const id = (this.users.size + 1).toString();
      this.users.set(id, new User(id, name, email));
      return id;
    }
  }

  describe("when using a fake", function () {
    it("should return the id send by the repository", () => {
      const fakeUserRepository = new FakeUserRepository();
      const validationService = new UserValidationService();
      service = new CreateUserService(
        fakeUserRepository,
        validationService,
        {} as NotificationService
      );
      jest
        .spyOn(validationService, "sendActivationLinkToUser")
        .mockReturnValue();

      const id = service.createUser("John Doe", "john@doe.fr");

      expect(fakeUserRepository.get(id)?.name).toBe("John Doe");
    });
  });
});
