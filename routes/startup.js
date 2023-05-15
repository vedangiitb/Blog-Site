const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');



router.get('/', (req,res)=>{
    const urls = ['https://www.ycombinator.com/blog/yc-build-sprint-winter-2021/ ',
        'https://www.ycombinator.com/blog/how-to-start-a-biotech-company-on-a-budget/',
        'https://www.ycombinator.com/blog/the-pre-product-startup-and-the-fda',
        'https://www.strategy-business.com/article/Building-for-the-future']

    const data = []
        const scrapePage = async (url) => {
            try {
              const response = await axios.get(url);
              const $ = cheerio.load(response.data);
              $('h1:first').each(function() {
                data.push($(this).text());
              });
            } catch (error) {
              console.log(error);
            }
          }

          (async () => {
            for (const url of urls) {
              await scrapePage(url);
            }
            
            res.render('startup',{data})
          })();
})

router.get('/:id', (req,res)=>{
  const {id} = req.params
  const urls = ['https://www.ycombinator.com/blog/yc-build-sprint-winter-2021/ ',
  'https://www.ycombinator.com/blog/how-to-start-a-biotech-company-on-a-budget/',
  'https://www.ycombinator.com/blog/the-pre-product-startup-and-the-fda',
  'https://www.strategy-business.com/article/Building-for-the-future']

  const url = urls[id];
  const data = []
  const headings = []
      const scrapePage = async (url) => {
          try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            $('h1:first').each(function() {
              headings.push($(this).text());
            });
            $('p').each(function() {
              data.push($(this).text());
            });
          } catch (error) {
            console.log(error);
          }
        }
        
        (async () => {
          await scrapePage(url);
          const page = {
            headings : headings,
            content: data
          }
          res.render('blogpage',{page})
        })();
})

module.exports = router;