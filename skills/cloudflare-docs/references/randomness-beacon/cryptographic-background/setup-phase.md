---
title: Setup Phase
description: In the drand setup phase, you create a collective private and public key pair shared among 𝑛 participants. This is done through a 𝑡-of-𝑛 Distributed Key Generation (DKG) process and results in each participant receiving a copy of the collective public key plus a private key share of the collective private key — no individual node knows the collective private key. Each private key share can then be used to perform cryptographic threshold computations, such as generating threshold signatures, where at least 𝑡 contributions produced using the individual private key shares are required to successfully finish the collective operation.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/randomness-beacon/cryptographic-background/setup-phase.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Setup Phase

In the drand setup phase, you create a collective private and public key pair shared among _𝑛_ participants. This is done through a `𝑡-of-𝑛` Distributed Key Generation (DKG) process and results in each participant receiving a copy of the collective public key plus a private key share of the collective private key — no individual node knows the collective **private** key. Each private key share can then be used to perform cryptographic threshold computations, such as generating threshold signatures, where at least `𝑡` contributions produced using the individual private key shares are required to successfully finish the collective operation.

A DKG is performed in a fully distributed manner, avoiding any single points of failure. This is an overview of the different sub-components of the drand DKG implementation.

## Secret Sharing

Secret sharing is an important technique many advanced threshold cryptography mechanisms rely on.

Secret sharing allows you to split a secret value `𝑠` into `𝑛` shares `𝑠1,…,𝑠𝑛` so that `𝑠` can only be reconstructed if a threshold of `𝑡` shares is available.

## Shamir’s Secret Sharing (SSS)

The SSS scheme is one of the most well-known and widely used secret sharing approaches, and a core component of drand. SSS works over an arbitrary finite field, but a simplistic approach uses the integers modulo `𝑝`, denoted by `ℤ𝑝`. Let `𝑠∈ℤ𝑝` denote the secret to share.

### Share Distribution

To share `𝑠`, a dealer first creates a polynomial, `𝑞(𝑥)=𝑎0+𝑎1𝑥+⋯+𝑎𝑡−1𝑥𝑡−1` with `𝑎0=𝑠` and (random) `𝑎𝑖∈ℤ𝑝` for `𝑖=1,…,𝑡−1` and then creates one share 𝑠𝑖 for each participant 𝑖 by evaluating 𝑞(𝑥) at the integer 𝑖 and setting 𝑠𝑖=(𝑖,𝑞(𝑖)).

### Secret Reconstruction

To recover the secret `𝑠`, collect at least `𝑡` shares, then uniquely reconstruct `𝑞(𝑥)` using Lagrange interpolation and obtain `𝑠` as `𝑠=𝑎0=𝑞(0)`.

Note that you can use any subset of `𝑡-of-𝑛` shares to perform Lagrange interpolation and uniquely determine `𝑠`; however, having a subset of less than `𝑡` shares does not allow to learn anything about `𝑠`.

## Verifiable Secret Sharing

SSS scheme assumes that the dealer is honest, but this may not always hold in practice. A Verifiable Secret Sharing (VSS) scheme protects against malicious dealers by enabling participants to verify that their shares are consistent with those dealt to other nodes, ensuring that the shared secret can be correctly reconstructed later.

drand uses Feldman’s VSS scheme, an extension of SSS. Let `𝔾` denote a cyclic group of prime order `𝑝` in which computing discrete logarithms is intractable. A _cyclic group_ means there exists a generator, `𝑔`, so that any element `𝑥∈𝔾` can be written as `𝑥=𝑔𝑎` for some `𝑎∈{0,…,𝑝−1}`.

### Share Distribution

In addition to distributing shares of the secret to participants, the dealer also broadcasts commitments to the coefficients of the polynomial `𝑞(𝑥)` of the form `(𝐴0,𝐴1,…,𝐴𝑡−1)=(𝑔𝑠,𝑔𝑎1,…,𝑔𝑎𝑡−1)`. These commitments enable individual participants, `𝑖`, to verify that their share `𝑠𝑖=(𝑖,𝑞(𝑖))` is consistent with respect to the polynomial `𝑞(𝑥)` by checking that `𝑔𝑞(𝑖)=∏𝑡−1𝑗=0(𝐴𝑗)𝑖𝑗` holds.

### Secret Reconstruction

The recovery of secret `𝑠` works the same as regular SSS, except that verified to be valid shares are used.

## Distributed Key Generation (DKG)

Although VSS schemes protect against a malicious dealer, the dealer still knows the secret. To create a collectively shared secret `𝑠` so no individual node gets any information about it, participants can use a DKG protocol. drand uses Pedersen’s DKG scheme, which runs `𝑛` instances of Feldman’s VSS in parallel and on top of additional verification steps.

### Share Distribution

Individual participants, `𝑖`, create a (random) secret, `𝑠𝑖∈ℤ𝑝`, and share it all participants using VSS, sending a share, `𝑠𝑖,𝑗` to each `𝑗` and broadcasts the list of commitments `(𝐴𝑖,0,𝐴𝑖,1,…,𝐴𝑖,𝑡−1)` to everyone.

### Share Verification

`𝑗` verifies the shares received as prescribed by Feldman’s VSS scheme. If `𝑗` receives an invalid share, `𝑠𝑖,𝑗`, from `𝑖`, then `𝑗` broadcasts a complaint. `𝑖` must reveal the correct share `𝑠𝑖,𝑗` or they are considered an invalid dealer.

### Share Finalization

At the end of the protocol, the final share of `𝑖` is `𝑠𝑖=∑𝑗𝑠𝑗,𝑖` for all valid participants `𝑗` , that is, for all `𝑗`s not excluded during the verification phase.

The collective public key associated with the valid shares can be computed as `𝑆=∑𝑗𝐴𝑗,0` for all valid `𝑗`s.

**Note:** Even though the secret created using Pedersen’s DKG can be biased, it is safe to use for threshold signing as shown by Rabin et al.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/randomness-beacon/","name":"Randomness Beacon"}},{"@type":"ListItem","position":3,"item":{"@id":"/randomness-beacon/cryptographic-background/","name":"Cryptographic Background"}},{"@type":"ListItem","position":4,"item":{"@id":"/randomness-beacon/cryptographic-background/setup-phase/","name":"Setup Phase"}}]}
```
