var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var sum = 0;
var total_cars = new Array();

function grabInventoryPerSite()
{
	return function(error,response,body) {
		try {
			var $ = cheerio.load(body);
			var cars = $('li.item');
			var prices = $('span.internetPrice.final-price').find('span.value');
			var details = $('dd');
			var cars = new Array();
			for(var i=0;i<16;i++)
			{
				var car = new Object();
				if(prices[i].children!=undefined)
				{
					var pre_price = prices[i].children[0].data.replace(/\D/g,'');
					car.price = parseInt(pre_price);
					//console.log(car);
					cars.push(car);
				}
			}
			var i =0;
			var k = 0;
			for(var j=0;j<details.length;j++)
			{
				cars[i][k++] = details[j].children[0].data;
				if(k==8)
				{
					i++;
					k=0;
				}
			}
			sum+=cars.length;
			for(var k=0;k<cars.length;k++)
				console.log(cars[k]);
			console.log(sum);
		} catch(e) {
			console.log(e);
		}
	}
}

var num_cars = 207;

var site_url = 'http://www.automaxxcalgary.com/used-inventory/index.htm';


for(var i=0; i<207; i+=16)
{
	if(i<207)
		request(site_url + '?start=' + i,grabInventoryPerSite());
	console.log(site_url + '?start=' + i);


}