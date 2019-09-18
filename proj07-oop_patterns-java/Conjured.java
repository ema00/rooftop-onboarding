


public class Conjured extends Item {

    public Conjured(String description, int sellIn, int quality) {
        String desc = "Conjured" + description.equals("") ? "" : ", " + description;
        super(desc, sellIn, quality);
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

