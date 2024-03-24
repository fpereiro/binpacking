var log = console.log;
var bin = require ('./bin.js');

// Generates `n` items (numbers) between `minValue` and `maxValue`
var generateItems = function (n, minValue, maxValue) {
  var output = [];
  while (output.length < n) {
    var item = Math.round (Math.random () * (maxValue - minValue));
    output.push (item);
  }
  return output;
}

var checkSolution = function (items, bins, maxBinSize, maxBinAmount) {

  var total = {size: 0, amount: 0};
  bins.forEach (function (bin, index) {
    var binTotal = {size: 0, amount: 0};
    bin.forEach (function (item) {
      binTotal.size++;
      binTotal.amount += item;
    });
    if (binTotal.size > maxBinSize) throw new Error (`Bin #${index} contains ${binTotals.size} but the maximum allowed is ${maxBinSize}`);
    if (binTotal.amount > maxBinAmount) throw new Error (`Bin #${index} contains ${binTotals.amount} but the maximum allowed is ${maxBinAmount}`);
    total.size += binTotal.size;
    total.amount += binTotal.amount;
  });

  if (total.size !== items.length) throw new Error (`Mismatch in number of items: ${total.count} vs ${items.length}`);
  var totalAmount = items.reduce ((baseAmount, item) => baseAmount + item, 0);
  if (total.amount !== totalAmount) throw new Error (`Mismatch in amounts: ${total.amount} vs ${totalAmount}`);

  log (bins);
  log ('Fitted', items.length, 'items in', bins.length, 'bins');
}

var testRandom = function () {

  var items = generateItems (1000, 100, 9999);
  var options = {maxSize: 1500, maxAmount: 300000};
  var bins = bin.average (items, options.maxSize, options.maxAmount);
  log (bins);
  checkSolution (items, bins, options.maxSize, options.maxAmount);
}

testRandom ();

var testFit = function () {
  var items = [140000, 140000, 140000, 140000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 20000, 10000];
  var options = {maxSize: 1500, maxAmount: 300000};
  var bins = bin.average (items, options.maxSize, options.maxAmount);
  checkSolution (items, bins, options.maxSize, options.maxAmount);
}

testFit ();
