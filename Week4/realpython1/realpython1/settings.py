# -*- coding: utf-8 -*-

# Scrapy settings for realpython1 project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

BOT_NAME = 'realpython1'

SPIDER_MODULES = ['realpython1.spiders']
NEWSPIDER_MODULE = 'realpython1.spiders'

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'realpython1 (+http://www.yourdomain.com)'


ITEM_PIPELINES = ['realpython1.pipelines.Realpython1Pipeline', ]
# ITEM_PIPELINES = {
# 	'realpython1.pipelines.Realpython1Pipeline': 300, 
# 	# 'realpython1.pipelines.JsonWriterPipeline'
# }

MONGODB_SERVER = "localhost"
MONGODB_PORT = 27017
MONGODB_DB = "youtube"
MONGODB_COLLECTION = "music"