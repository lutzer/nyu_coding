// `const` means the name stays attached to the same value.
const greeting = "Hello";
print(greeting);

// Try: uncomment the next line and look at the error in the terminal.
// greeting = "Hi";

// `let` is for values that WILL change later.
let score = 0;
print(score);

score = score + 1;
score = score + 1;
print(score);

// Rule of thumb: default to `const`, reach for `let` only when needed.
