


public class BackstagePass extends Item {

    private static final QUALITY_DOUBLING_THRESHOLD_TO_SELL_IN = 10;
    private static final QUALITY_TRIPLING_THRESHOLD_TO_SELL_IN = 5;


    public BackstagePass(String description, int sellIn, int quality) {
        String desc = "BackstagePass" + " to " + description;
        super(desc, sellIn, quality);
    }

    @Override
    public void update() {
        else if (sellIn <= 0) {
            quality = 0;
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
