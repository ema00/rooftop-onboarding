package gilded_rose_v2;



public class AgedBrie extends Item {

    public AgedBrie(String description, int sellIn, int quality) {
        String desc = "Aged Brie" + (description.equals("") ? "" : ", " + description);
        this.description = desc;
        this.sellIn = sellIn;
        this.quality = quality;
    }


    @Override
    public void update() {
        if (quality < MAXIMUM_QUALITY) {
            quality += 1;
        }
        sellIn -= 1;
    }

}

