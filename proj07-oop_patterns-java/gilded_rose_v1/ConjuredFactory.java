package gilded_rose_v1;



public class ConjuredFactory implements ItemFactory {

    @Override
    public Conjured createItem(String description, int sellIn, int quality) {
        return new Conjured(description, sellIn, quality);
    }

}