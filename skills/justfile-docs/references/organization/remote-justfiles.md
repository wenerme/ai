### Remote Justfiles

If you wish to include a `mod` or `import` source file in many `justfiles`
without needing to duplicate it, you can use an optional `mod` or `import`,
along with a recipe to fetch the module source:

```just
import? 'foo.just'

fetch:
  curl https://raw.githubusercontent.com/casey/just/master/justfile > foo.just
```

Given the above `justfile`, after running `just fetch`, the recipes in
`foo.just` will be available.
