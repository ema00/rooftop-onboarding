package gilded_rose_v1;

import java.util.List;
import java.util.LinkedList;



public class GildedRose {

    private List<Item> items;

    public GildedRose(List<Item> items) {
        this.items = items;
    }


    public static void main(String[] args) {
        List<Item> items = new LinkedList<>();
        items.add(new AgedBrie("", 5, 2));
        items.add(new BackstagePass("TAFKAL80ETC concert", 3, 2));
        items.add(new Sulfuras("Hand of Ragnaros", 5, 3));
        items.add(new Conjured("Bread", 5, 2));

        GildedRose gr = new GildedRose(items);

        for (int i = 1; i < 6; i++) {
            System.out.println("------------------------- Day " + i + ":");
            gr.updateQuality();
            System.out.print(gr.toString());
        }
    }

    public void updateQuality() {
        for (Item item : items) {
            item.update();
        }
    }

    @Override
    public String toString() {
        String result = "";
        for (Item item : items) {
            result = result + item + "\n";
        }
        return result;
    }

}
