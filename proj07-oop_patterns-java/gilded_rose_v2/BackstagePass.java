package gilded_rose_v2;



public class BackstagePass extends Item {

    private static final int QUALITY_DOUBLING_THRESHOLD_TO_SELL_IN = 10;
    private static final int QUALITY_TRIPLING_THRESHOLD_TO_SELL_IN = 5;


    public BackstagePass(String description, int sellIn, int quality) {
        this.description = "BackstagePass" + " to " + description;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    @Override
    public void update() {
        if (sellIn <= 0) {
            quality = MINIMUM_QUALITY;
        }
        else if (0 < sellIn && sellIn <= QUALITY_TRIPLING_THRESHOLD_TO_SELL_IN) {
            quality *= 3;
        }
        else if (sellIn <= QUALITY_DOUBLING_THRESHOLD_TO_SELL_IN) {
            quality *= 2;
        }
        else {
            quality += 1;
        }
        sellIn -= 1;
    }

}
