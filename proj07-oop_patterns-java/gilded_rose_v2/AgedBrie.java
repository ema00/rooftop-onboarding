package gilded_rose_v2;

import java.time.LocalDate;



public class AgedBrie extends Item {

    public AgedBrie(String description, LocalDate stockDate, LocalDate dueDate, long quality) {
        super(
                "Aged Brie" + (description.equals("") ? "" : ", " + description),
                stockDate,
                dueDate,
                quality
        );
    }


    @Override
    public void update(LocalDate date) {
        if (quality < MAXIMUM_QUALITY) {
            quality += 1;
        }
    }

}

