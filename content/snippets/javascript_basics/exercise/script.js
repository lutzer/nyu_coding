// `print(value)` writes a line to the terminal on the right.

// Below is an object describing a product in a shop.
// Read its fields with a dot:  product.name , product.price
const product = {
  name: "Headphones",
  price: 100,
};

const quantity = 3;

// 1. Write a function `total(product, quantity)` that returns
//    the price times the quantity.
//    Two parameters, one `return`. No `print` inside — just return.


// 2. Build a one-line summary and store it in a variable called
//    `summary` to something that prints "3x headphones = 300"
//    Hints:
//      - glue strings and numbers together with `+`
//      - read the product's name with `product.name`
//      - call `total(product, quantity)` to get the number


print("total: " + total(product, quantity));
print(summary);
