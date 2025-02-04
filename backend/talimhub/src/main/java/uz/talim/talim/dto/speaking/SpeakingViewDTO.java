package uz.talim.talim.dto.speaking;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.talim.talim.model.Brand;
import uz.talim.talim.model.Topic;
import uz.talim.talim.model.Like;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpeakingViewDTO {
    private String id;
    private String name;
    private String description;
    private Double price;
    private Double offer_price;
    private List<String> images;
    private Long available;
    private Long productSale;
    private List<Like> rates;
    private String productType;
    private Topic category;
    private Brand brand;
}
