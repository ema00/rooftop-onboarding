package gilded_rose_v2;

import java.time.LocalDate;
import static java.time.temporal.ChronoUnit.DAYS;



public class Conjured extends Item {

    public Conjured(String description, LocalDate stockDate, LocalDate dueDate, long quality) {
        super(
                "Conjured" + (description.equals("") ? "" : ", " + description),
                stockDate,
                dueDate,
                quality
        );
    }


    @Override
    public void update(LocalDate date) {
        long daysPassedFromStock = DAYS.between(stockDate, date);

        quality = initialQuality - 2 * daysPassedFromStock > 0 ?
                initialQuality - 2 * daysPassedFromStock : 0;
    }

}

