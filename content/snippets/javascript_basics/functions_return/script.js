// Parameters are names for the values a function expects.
// Here `person` and later `a`, `b` behave like variables inside the body.

function greet(person) {
  return "Hello, " + person + "!";
}

function add(a, b) {
  return a + b;
}

// `return` hands a value BACK to whoever called the function.
// We can store that value in a new variable:
const message = greet("Ada");
const sum     = add(2, 3);

print(message);
print(sum);

// Or use the returned value directly inside another call:
print(greet("Linus"));
print("10 + 7 = " + add(10, 7));

// Try: call `add` with your own numbers, or make `greet` return a
// different sentence.
