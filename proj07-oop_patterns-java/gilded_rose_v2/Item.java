package gilded_rose_v2;

import java.time.LocalDate;
import static java.time.temporal.ChronoUnit.DAYS;



public abstract class Item {

    protected static final int MINIMUM_QUALITY = 0;
    protected static final int MAXIMUM_QUALITY = 50;

    protected final String description;
    protected final LocalDate stockDate;
    protected final LocalDate dueDate;
    protected final long initialQuality;
    protected long quality;


    protected Item(String description, LocalDate stockDate, LocalDate dueDate, long quality) {
        this.description = description;
        this.stockDate = stockDate;
        this.dueDate = dueDate;
        this.initialQuality = quality;
    }


    public final String getDescription() {
        return description;
    }

    public final long getQuality() {
        return quality;
    }

    public final long daysToDueDate(LocalDate date) {
        return DAYS.between(date, dueDate);
    }

    public void update(LocalDate date) {
        long remaining = daysToDueDate(date);

        if (remaining > 0) {
            if (initialQuality < remaining) {
                quality = MINIMUM_QUALITY;
            } else {
                quality -= remaining;
            }
        } else {
            long daysUntilDueDate = DAYS.between(stockDate, dueDate);
            long daysPassedDueDate = -remaining;
            quality = initialQuality - daysUntilDueDate;
            quality = (quality - 2 * daysPassedDueDate > 0 ? quality - 2 * daysPassedDueDate : 0);
        }
    }

    @Override
    public String toString() {
        return this.description + ", " + daysToDueDate(LocalDate.now()) + ", " + this.quality;
    }

}
