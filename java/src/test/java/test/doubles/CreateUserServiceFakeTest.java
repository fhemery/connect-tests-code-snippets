package test.doubles;

import org.junit.jupiter.api.Test;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FakeUserRepository implements IUserRepository {
    private HashMap<String, User> users = new HashMap<>();
    @Override
    public String insert(String name, String email) {
        var id = Integer.toString(users.size() + 1);
        users.put(id, new User(id, name, email));
        return id;
    }
    @Override
    public User get(String id) {
        if (users.containsKey(id)) {
            return users.get(id);
        }
        return null;
    }
}
public class CreateUserServiceFakeTest {
    @Test
    void should_returnTheUserId() {
        var fakeUserRepository = new FakeUserRepository();
        var service = new CreateUserService(fakeUserRepository, new UserValidationService(), null);

        var id = service.createUser("John Doe", "John@doe.com");

        assertEquals("John Doe", fakeUserRepository.get(id).name);
    }
}
