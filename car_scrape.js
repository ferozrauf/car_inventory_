var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


function grabInventoryPerSite()
{
	return function(error,response,body) {
		try {
			$ = cheerio(body);
			var prices = $('span.value');
			var details = ${'dd'};
			console.log(prices);
			for(var i=0;i<prices.length;i++)
			{
				console.log(prices[i]);
			}
			console.log(details.text());
		} catch(e) {
			e.printStackTrace();
		}
	}
}

var num_cars = 200;

var site_url = 'http://www.automaxxcalgary.com/used-inventory/index.htm';


for(var i=0; i<200; i+=16;)
{
	request(site_url + '?start=' + i,grabInventoryPerSite())

}