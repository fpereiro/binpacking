# Bin packing

Recently, at work, we came across an instance of the [bin packing problem](https://en.wikipedia.org/wiki/Bin_packing_problem). I decided to essay a solution to the problem using an algorithm that tries to fill bins in a way that the average size of the items in a bin matches the global average of all the items that we're putting into bins.

The implementation is available at `bin.average`. You can run `test.js` to see the results.
