package backend.controller;

import backend.exception.InventoryNotFoundException;
import backend.model.InventoryModel;
import backend.repository.InventoryRepository;
import org.springframework.core.io.FileSystemResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping("/Inventory")
    public InventoryModel newInventoryModel(@RequestBody InventoryModel newInventoryModel) {

        return inventoryRepository.save(newInventoryModel);

    }

    @PostMapping("inventory/itemImg")
    public String itemImage(@RequestParam("file") MultipartFile file) {
        String folder = "C:/Users/thisa/Downloads/spring-CRUD-main/spring-CRUD-main/pto";
        
        String itemImage = file.getOriginalFilename();

        try {
            File uplodDir = new File(folder);
            if (!uplodDir.exists()) {
                uplodDir.mkdir();
            }
            file.transferTo(Paths.get(folder+"/" + itemImage));
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading file: " + itemImage;
        }
        return itemImage;
    }

    @GetMapping("/inventory")

    public List<InventoryModel> getAllItems() {
        List<InventoryModel> items = inventoryRepository.findAll();
        return items; // Ensure proper serialization
    }

    @GetMapping("/inventory/{id}")
    InventoryModel getItemId(@PathVariable Long id) {
        return inventoryRepository.findById(id).orElseThrow(() -> new InventoryNotFoundException(id));
    }

    private final String UPLOAD_DIR = "C:/Users/thisa/Downloads/spring-CRUD-main/spring-CRUD-main/pto";

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String filename) {
        System.out.println("Requesting image: " + filename); // Log the requested filename

        File file = new File(UPLOAD_DIR + filename);
        if (!file.exists()) {
            System.out.println("File not found: " + filename); // Log if the file does not exist

            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new FileSystemResource(file));
    }

    @PutMapping("/inventory/{id}")
    public InventoryModel updateItem(
            @RequestPart(value = "itemDetails") String itemDetails,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @PathVariable Long id) {
        System.out.println("Item Details: " + itemDetails);
        if (file != null) {
            System.out.println("File received: " + file.getOriginalFilename());
        } else {
            System.out.println("No file uploaded");
        }

        ObjectMapper mapper = new ObjectMapper();
        InventoryModel newInventory;
        try {
            newInventory = mapper.readValue(itemDetails, InventoryModel.class);
        } catch (Exception e) {
            throw new RuntimeException("Error parsing itemDetails", e);
        }

        return inventoryRepository.findById(id).map(existingInventory -> {
            existingInventory.setItemId(newInventory.getItemId());
            existingInventory.setItemName(newInventory.getItemName());
            existingInventory.setItemCategory(newInventory.getItemCategory());
            existingInventory.setItemQty(newInventory.getItemQty());
            existingInventory.setItemDetails(newInventory.getItemDetails());

            if (file != null && !file.isEmpty()) {
                String folder = "C:/Users/thisa/Downloads/spring-CRUD-main/spring-CRUD-main/pto";
                String itemImage = file.getOriginalFilename();
                try {
                    file.transferTo(Paths.get(folder + itemImage));
                    existingInventory.setItemImage(itemImage);
                } catch (IOException e) {
                    throw new RuntimeException("Error uploading file", e);
                }
            }
            return inventoryRepository.save(existingInventory);
        }).orElseThrow(() -> new InventoryNotFoundException(id));
    }

    @DeleteMapping("/inventory/{id}")
    String deleteItem(@PathVariable Long id) {
        //check item is exists db
        InventoryModel inventoryItem = inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));
        //delete item
        String itemImage = inventoryItem.getItemImage();
        if(itemImage != null && !itemImage.isEmpty()){
            File imageFile = new File(UPLOAD_DIR + itemImage);
            if (imageFile.exists()) {
                if(imageFile.delete()){
                    System.out.println("Image file deleted successfully");
                }else {
                    System.out.println("Failed to delete the image file");
                }
            }
        }
        //delete item from the reppo
        inventoryRepository.deleteById(id);
        return "Item"+ id+" and image deleted successfully";
    }

}
