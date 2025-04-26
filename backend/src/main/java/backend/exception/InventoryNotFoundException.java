package backend.exception;

public class InventoryNotFoundException extends RuntimeException {
    public InventoryNotFoundException(Long id){
        super("could not found id "+id);
    }
    public InventoryNotFoundException(String message){
        super(message);
    }
}
