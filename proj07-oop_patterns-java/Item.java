package gilded_rose;



public abstract class Item {

    private static final MINIMUM_QUALITY = 0;
    private static final MAXIMUM_QUALITY = 50;

    private final String description;
    private int sellIn;
    private int quality;


    public Item(String description, int sellIn, int quality) {
        this.description = description;
        this.sellIn = sellIn;
        this.quality = quality;
    }


    public void update() {
        if (quality > 1) {
            if (sellIn > 0) {
                quality -= 1;
            }
            else {
                quality -= 2;
            }
        }
        else if (quality == 1) {
            quality = 0;
        }
        sellIn -= 1;
    }

    @Override
    public String toString() {
        return this.name + ", " + this.sellIn + ", " + this.quality;
    }

}
