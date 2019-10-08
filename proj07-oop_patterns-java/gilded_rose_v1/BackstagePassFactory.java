package gilded_rose_v1;



public class BackstagePassFactory implements ItemFactory {

    @Override
    public BackstagePass createItem(String description, int sellIn, int quality) {
        return new BackstagePass(description, sellIn, quality);
    }

}