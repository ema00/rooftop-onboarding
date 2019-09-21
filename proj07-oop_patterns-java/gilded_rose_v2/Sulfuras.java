package gilded_rose_v2;

import java.time.LocalDate;



public class Sulfuras extends Item {

    public Sulfuras(String description, LocalDate stockDate, LocalDate dueDate, long quality) {
        super(
                "Sulfuras" + (description.equals("") ? "" : ", " + description),
                stockDate,
                dueDate,
                quality
        );
        this.quality = initialQuality;
    }


    @Override
    public void update(LocalDate date) {
        if (quality > MINIMUM_QUALITY) {
            quality -= 1;
        }
    }

}
