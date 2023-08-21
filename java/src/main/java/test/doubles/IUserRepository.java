package test.doubles;

public interface IUserRepository {
    String insert(String name, String email);
    User get(String id);
}
