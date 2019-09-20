


public class Sulfuras extends Item {

    public Sulfuras(String description, int sellIn, int quality) {
        String desc = "Sulfuras" + (description.equals("") ? "" : ", " + description);
        this.description = desc;
        this.sellIn = sellIn;
        this.quality = quality;
    }


    @Override
    public void update() {
        if (quality > MINIMUM_QUALITY) {
            quality -= 1;
        }
    }

}
