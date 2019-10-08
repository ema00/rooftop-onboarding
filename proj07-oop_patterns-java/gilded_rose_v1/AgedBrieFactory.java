package gilded_rose_v1;



public class AgedBrieFactory implements ItemFactory {

    @Override
    public AgedBrie createItem(String description, int sellIn, int quality) {
        return new AgedBrie("", sellIn, quality);
    }

}
