


public class AgedBrie extends Item {

    public AgedBrie(String description, int sellIn, int quality) {
        String desc = "Aged Brie" + description.equals("") ? "" : ", " + description;
        super(desc, sellIn, quality);
    }


    @Override
    public void update() {
        if (quality < MAXIMUM_QUALITY) {
            quality += 1;
        }
        sellIn -= 1;
    }

}

