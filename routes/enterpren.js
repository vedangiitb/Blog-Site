const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');



router.get('/', (req,res)=>{
    const urls = ['https://garyvaynerchuk.com/reframing-the-narrative-on-entrepreneurship/',
        'https://entrepreneurshandbook.co/netflixs-co-founder-has-5-pieces-of-advice-for-aspiring-entrepreneurs-97255228d778',
        'https://medium.com/i-m-h-o/good-and-bad-reasons-to-become-an-entrepreneur-decf0766de8d',
        'https://www.jotform.com/blog/do-not-become-an-entrepreneur/']

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

            res.render('enterpren',{data})
          })();
})

router.get('/:id', (req,res)=>{
  const {id} = req.params
  const urls = ['https://garyvaynerchuk.com/reframing-the-narrative-on-entrepreneurship/',
      'https://entrepreneurshandbook.co/netflixs-co-founder-has-5-pieces-of-advice-for-aspiring-entrepreneurs-97255228d778',
      'https://medium.com/i-m-h-o/good-and-bad-reasons-to-become-an-entrepreneur-decf0766de8d',
      'https://www.jotform.com/blog/do-not-become-an-entrepreneur/']

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