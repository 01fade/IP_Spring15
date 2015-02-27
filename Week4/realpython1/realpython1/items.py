# src: https://realpython.com/blog/python/web-scraping-with-scrapy-and-mongodb/

from scrapy.item import Item, Field


class Realpython1Item(Item):
	title = Field()
	views = Field()