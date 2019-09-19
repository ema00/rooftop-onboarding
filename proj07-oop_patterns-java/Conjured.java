


public class Conjured extends Item {

    public Conjured(String description, int sellIn, int quality) {
        String desc = "Conjured" + (description.equals("") ? "" : ", " + description);
        this.description = desc;
        this.sellIn = sellIn;
        this.quality = quality;
    }


    @Override
    public void update() {
        if (quality == 1) {
            quality = 0;
        }
        else if (quality > 1) {
            quality -= 2;
        }
        sellIn -= 1;
    }

}

