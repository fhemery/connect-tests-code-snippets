package test.doubles;

public class CreateUserService {

    private IUserRepository userRepository;
    private UserValidationService userValidationService;
    private NotificationService notificationService;

    CreateUserService(IUserRepository userRepository, UserValidationService userValidationService, NotificationService notificationService ) {
        this.userRepository = userRepository;
        this.userValidationService = userValidationService;
        this.notificationService = notificationService;
    }

    String createUser(String name, String email) {
        var id = this.userRepository.insert(name, email);
        this.userValidationService.sendActivationLinkToUser(id);
        return id;
    }
}
