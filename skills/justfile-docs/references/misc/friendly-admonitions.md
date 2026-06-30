### Friendly Admonitions

`just` will happily skip cached recipes, but it is your responsibility to make
sure that this is safe, and that the contents of the cache key capture enough
information about recipe invocations for caching to make sense in the first
place.

In particular, there are many details about the context in which a recipe runs
that are not captured by cache keys.

These include the time, input files, output files, system binaries, operating
system version, databases, systems over the network, the DNS, and any of the
myriad other things which may change the execution of a computer program.

Attempting to skip execution based on the type of crude heuristics that `just`
employs has a long and sordid history. However, it is an undeniably convenient
and powerful tool, and it is provided in the hopes that you find it useful.
