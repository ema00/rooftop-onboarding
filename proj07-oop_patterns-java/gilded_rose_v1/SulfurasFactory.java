package gilded_rose_v1;



public class SulfurasFactory implements ItemFactory {

    @Override
    public Sulfuras createItem(String description, int sellIn, int quality) {
        return new Sulfuras(description, sellIn, quality);
    }

}