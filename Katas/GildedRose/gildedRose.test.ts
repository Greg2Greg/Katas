import { describe, it, expect } from 'vitest';
import { GildedRose } from './gildedRose.ts';
import { Item } from './item/item.ts';

describe('Gilded Rose', () => {
  describe('Should update a random item correctly', () => {
    it('Should decrease quality and sell in by 1 when sell date hasnt passed', () => {
      const gildedRose = new GildedRose([new Item('Random item', 50, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: 'Random item',
        sellIn: 49,
        quality: 49,
        alterations: undefined,
      });
    });
    it('Should decrease quality by 2 when sell in date has passed', () => {
      const gildedRose = new GildedRose([new Item('Random item', -1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: 'Random item',
        sellIn: -2,
        quality: 48,
        alterations: undefined,
      });
    });
    it('Should not decrease quality lower than 0', () => {
      const gildedRose = new GildedRose([new Item('Random item', -1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: 'Random item',
        sellIn: -2,
        quality: 0,
        alterations: undefined,
      });
    });
    it('Should not be possible to create a random item with quality > 50', () => {
      expect(() => new GildedRose([new Item('Random item', -1, 51)])).toThrow();
    });
    it('Should not be possible to create a random item with quality < 0', () => {
      expect(() => new GildedRose([new Item('Random item', -1, -1)])).toThrow();
    });
  });

  describe('Should update Aged Brie item correctly', () => {
    it('Should increase quality by 1 and decrease sell in by one when sell in date hasnt past', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 50, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: 'Aged Brie',
        sellIn: 49,
        quality: 50,
        alterations: undefined,
      });
    });
    it('Should increase quality by 1 and decrease sell in by one when sell in date has past', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', -1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: 'Aged Brie',
        sellIn: -2,
        quality: 50,
        alterations: undefined,
      });
    });
    it('Should not increase quality higher than 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', -1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: 'Aged Brie',
        sellIn: -2,
        quality: 50,
        alterations: undefined,
      });
    });
    it('Should not be possible to create an Aged Brie item with quality > 50', () => {
      expect(() => new GildedRose([new Item('Aged Brie', -1, 51)])).toThrow();
    });
    it('Should not be possible to create an Aged Brie item with quality < 0', () => {
      expect(() => new GildedRose([new Item('Aged Brie', -1, -1)])).toThrow();
    });
  });

  describe('Should update Sulfuras, Hand of Ragnarose item correctly', () => {
    it('Should not decrease quality nor sell in', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 50, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: 'Sulfuras, Hand of Ragnaros',
        sellIn: 50,
        quality: 80,
        alterations: undefined,
      });
    });
    it('Should not be possible to create a Sulfuras, Hand of Ragnarose item with quality different than 80', () => {
      expect(() => new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -1, 39)])).toThrow();
    });
  });

  describe('Should update Backstage passes to a TAFKAL80ETC concert item correctly', () => {
    it('Should increase quality by 1 when sell in date is above 10 days and decrease sell in by 1', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 10,
        quality: 50,
        alterations: undefined,
      });
    });
    it('Should increase quality by 2 when sell in date is between 5 and 10', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 48)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 5,
        quality: 50,
        alterations: undefined,
      });
    });
    it('Should increase quality by 3 when sell in date is between 0 and 5', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 3, 47)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 2,
        quality: 50,
        alterations: undefined,
      });
    });
    it('Should drop quality to 0 once sell in has past', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', -1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: -2,
        quality: 0,
        alterations: undefined,
      });
    });
    it('Should not be possible to create a Backstage passes to a TAFKAL80ETC concert item with quality > 50', () => {
      expect(() => new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', -1, 51)])).toThrow();
    });
    it('Should not be possible to create a Backstage passes to a TAFKAL80ETC concert item with quality < 0', () => {
      expect(() => new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', -1, -1)])).toThrow();
    });
  });

  describe('Should handle conjured alteration', () => {
    it('Should handle conjuration on a random item', () => {
      const gildedRose = new GildedRose([new Item('Random item', 50, 50, ['CONJURED'])]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: 'Random item',
        sellIn: 49,
        quality: 48,
        alterations: ['CONJURED'],
      });
    });
  });
});
