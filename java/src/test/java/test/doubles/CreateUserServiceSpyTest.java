package test.doubles;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class CreateUserServiceSpyTest {
    @Test
    void should_checkValidationServiceIsCalled() {
        // ARRANGE
        UserValidationService userValidationService = new UserValidationService();
        var userServiceSpy = Mockito.spy(userValidationService);

        var service = new CreateUserService(new FakeUserRepository(), userServiceSpy, null);

        // ACT
        service.createUser("John Doe", "john@doe.fr");

        // ASSERT
        Mockito.verify(userServiceSpy).sendActivationLinkToUser("1");
    }
}
