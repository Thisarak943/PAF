package backend.exception;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(Long id){
        super("could not found id "+id);
    }
    public UserNotFoundException(String message){
        super(message);
    }
}
