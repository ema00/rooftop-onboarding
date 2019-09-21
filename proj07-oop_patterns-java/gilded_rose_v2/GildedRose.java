package gilded_rose_v2;

import java.time.LocalDate;
import java.util.List;
import java.util.LinkedList;



public class GildedRose {

    private List<Item> items;

    public GildedRose(List<Item> items) {
        this.items = items;
    }


    public static void main(String[] args) {
        List<Item> items = new LinkedList<>();
        items.add(new AgedBrie("", LocalDate.now(), LocalDate.now().plusDays(5), 2));
        items.add(new BackstagePass("TAFKAL80ETC concert", LocalDate.now(), LocalDate.now().plusDays(13), 1));
        items.add(new Sulfuras("Hand of Ragnaros", LocalDate.now(), LocalDate.now().plusDays(5), 3));
        items.add(new Conjured("Bread", LocalDate.now(), LocalDate.now().plusDays(5), 8));

        GildedRose gr = new GildedRose(items);

        for (int i = 1; i < 15; i++) {
            LocalDate date = LocalDate.now().plusDays(i);
            System.out.println("------------------------- Day " + i + ":");
            gr.updateQuality(date);
            System.out.print(gr.toString(date));
        }
    }

    public void updateQuality(LocalDate date) {
        for (Item item : items) {
            item.update(date);
        }
    }

    public String toString(LocalDate date) {
        String result = "";
        for (Item item : items) {
            result = result
                    + item.getDescription() + ", " + item.daysToDueDate(date)
                    + ", " + item.getQuality() + "\n";
        }
        return result;
    }

}
