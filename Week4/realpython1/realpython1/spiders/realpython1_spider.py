# src: https://realpython.com/blog/python/web-scraping-with-scrapy-and-mongodb/
# ref: http://doc.scrapy.org/en/latest/topics/selectors.html

from scrapy import Spider
from scrapy.selector import Selector

from realpython1.items import Realpython1Item


class Realpython1Spider(Spider):
    name = "realpython1"
    allowed_domains = ["youtube.com"]
    start_urls = (
        'http://www.youtube.com/results?search_query=dress&filters=video',
        'http://www.youtube.com/results?filters=video&search_query=dress&page=2',
    )

    def parse(self, response):
        notes = Selector(response).xpath('//div[@class="yt-lockup-content"]')

        for note in notes:
            item = Realpython1Item()
            item['title'] = note.xpath('h3/a/text()').extract()[0]
            item['views'] = note.xpath('.//li[2]/text()').extract()
            yield item

# ------------------------------------------------------------------------------
# Tumblr doesn't work -- need to fix

# class Realpython1Spider(Spider):
#     name = "realpython1"
#     allowed_domains = ["228miles.tumblr.com"]
#     start_urls = (
#         'http://228miles.tumblr.com/post/76761952452',
#     )

#     def parse(self, response):
#       notes = Selector(response).xpath('//li/span')

#       for note in notes:
#           item = Realpython1Item()
#           #need to update items.py accordingly
#           item['user'] = note.xpath('a[@class="tumblelog"]/text()').extract()
#           yield item