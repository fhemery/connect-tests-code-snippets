package test.doubles;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class StubUserRepository implements IUserRepository {
    @Override
    public String insert(String name, String email) {
        return "123";
    }
    @Override
    public User get(String id) {
        return null;
    }
}

public class CreateUserServiceStubTest {
    @Test
    void should_returnTheIdSentByTheRepository() {
        var service = new CreateUserService(new StubUserRepository(), new UserValidationService(), null);

        var result = service.createUser("John Doe", "john@doe.com");

        assertEquals("123", result);
    }
}
