### Hints

Here are some hints to get you started with specific kinds of new features,
which you can use in addition to the contribution workflow above.

#### Adding a New Attribute

1. Write a new integration test in
   [tests/attributes.rs](https://github.com/casey/just/blob/master/tests/attributes.rs).

2. Add a new variant to the
   [`Attribute`](https://github.com/casey/just/blob/master/src/attribute.rs)
   enum.

3. Implement the functionality of the new attribute.

4. Run `just ci` to make sure that all tests pass.
