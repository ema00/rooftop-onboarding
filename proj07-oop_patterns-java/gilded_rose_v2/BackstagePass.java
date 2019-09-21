package gilded_rose_v2;

import java.time.LocalDate;
import static java.time.temporal.ChronoUnit.DAYS;



public class BackstagePass extends Item {

    private static final int QUALITY_DOUBLING_THRESHOLD_TO_SELL_IN = 10;
    private static final int QUALITY_TRIPLING_THRESHOLD_TO_SELL_IN = 5;


    public BackstagePass(String description, LocalDate stockDate, LocalDate dueDate, long quality) {
        super(
                "BackstagePass" + " to " + description,
                stockDate,
                dueDate,
                quality
        );
    }

    @Override
    public void update(LocalDate date) {
        long remaining = daysToDueDate(date);
        long daysPassedFromStock = DAYS.between(stockDate, date);
        long duration = DAYS.between(stockDate, dueDate);
        this.quality = initialQuality;

        if (remaining < 0) {
            quality = 0;
        }
        else {
            long threshold2 = duration - QUALITY_DOUBLING_THRESHOLD_TO_SELL_IN;
            long threshold3 = duration - QUALITY_TRIPLING_THRESHOLD_TO_SELL_IN;
            for (long d = 1; d <= daysPassedFromStock; d++) {
                if (d < threshold2 + 1) {
                    quality += 1;
                } else if (d < threshold3 + 1) {
                    quality *= 2;
                }
                else {
                    quality *= 3;
                }
            }
        }
    }

}
