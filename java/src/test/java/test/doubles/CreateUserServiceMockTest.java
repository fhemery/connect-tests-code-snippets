package test.doubles;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.STRICT_STUBS)
public class CreateUserServiceMockTest {
    @Mock
    IUserRepository userRepository;

    @Test
    void should_checkIdIsReturnedIsCalled() {
        // ARRANGE
        var service = new CreateUserService(userRepository, new UserValidationService(), null);
        Mockito.when(userRepository.insert("John Doe", "john@doe.fr")).thenReturn("123");

        // ACT
        var result = service.createUser("John Doe", "john@doe.fr");

        // ASSERT
        assertEquals("123", result);
        verify(userRepository).insert("John Doe", "john@doe.fr");
    }

    @Test
    void should_failIfMockIsBadlySetup() {
        // ARRANGE
        var service = new CreateUserService(userRepository, new UserValidationService(), null);
        Mockito.when(userRepository.insert("Kermit", "kermit@thefrog.fr")).thenReturn("123");

        // ACT
        var result = service.createUser("John Doe", "john@doe.fr");

        // ASSERT
        assertEquals("123", result);
    }
}
