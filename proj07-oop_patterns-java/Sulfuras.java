


public class Sulfuras extends Item {

    public Sulfuras(String description, int sellIn, int quality) {
        String desc = "Sulfuras" + description.equals("") ? "" : ", " + description;
        super(desc, sellIn, quality);
    }


    @Override
    public void update() {
        if (quality > 0) {
            quality -= 1;
        }
    }

}
