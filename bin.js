var bin = module.exports;

// Will try to sort `items` in as few bins as possible, without putting more than `maxBinSize` items per bin nor varting the amount of the items on a bin exceeding `maxBinAmount`.
// `items` is assumed to be of the form `[NUMBER, ...]`.
bin.average = function (items, maxBinSize, maxBinAmount) {

  var getTotalAmount = function (items) {
    return items.reduce ((baseAmount, item) => baseAmount + item, 0);
  };

  var addToBin = function (item, bin) {
    if (getTotalAmount (bin) + item > maxBinAmount) return false;
    bin.push (item);
    return true;
  };

  // Copy `items` so we do not modify the argument
  var globalAverage = getTotalAmount (items) / items.length;
  items = items.slice ();
  // Sort by greatest first
  items.sort ((a, b) => b.amount - a.amount);

  var bins = [[]];

  while (items.length) {
    var lastBin = bins [bins.length - 1];
    // Bin is full of items. Add a new one and continue.
    if (lastBin.length >= maxBinSize) {
      bins.push ([]);
      continue;
    };

    var binTotal = getTotalAmount (lastBin);
    var binAverage = binTotal / lastBin.length || 0;

    // If the average item in the bin is lower than the global average AND there's room to fit in the biggest item, fit the biggest item.
    // Otherwise, fit the smallest item.
    var addBigItem = (binAverage < globalAverage && binTotal + items [0] <= maxBinAmount);
    var nextItem = addBigItem ? items.shift () : items.pop ();

    var successfullyAdded = addToBin (nextItem, lastBin);
    if (successfullyAdded) continue;
    addBigItem ? items.unshift (nextItem) : items.push (nextItem);

    bins.push ([]);
  }

  return bins;
}
