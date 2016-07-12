/**
Suppose we could access yesterday's stock
prices as an array, where:

The indices are the time in minutes 
past trade opening time, 
which was 9:30am local time.

The values are the price in dollars of 
Apple stock at that time.

So if the stock cost $500 at 10:30am, 
stockPricesYesterday[60] = 500.
**/


function getMaxProfit(prices) {
	// buy comparison
	var maxProfit = prices[1] - prices[0];

	for (var i=0; i<prices.length; i++) {
		for (var j=i+1; j<prices.length; j++) {

			// determine which time is less which is later
			var earlier = Math.min(prices[i], prices[j])
			var later = Math.max(prices[i], prices[j])


			var money = later - earlier		
			maxProfit = (money>maxProfit) ? money : maxProfit; 

			console.log(later, earlier, money, maxProfit)
		}
	}
	return maxProfit;
}

var stockPricesYesterday = [12, 3, 10, 7, 5, 8, 11, 9];

var v = getMaxProfit(stockPricesYesterday);
console.log(v)
// returns 6 (buying for $5 and selling for $11)



