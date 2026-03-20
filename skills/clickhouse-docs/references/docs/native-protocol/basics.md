---
title: 'Basics'
description: 'Native protocol basics'
keywords: ['native protocol', 'TCP protocol', 'protocol basics', 'binary protocol', 'client-server communication']
doc_type: 'guide'
---

# Basics

> **note**: Client protocol reference is in progress.

Most examples are only in Go.

This document describes binary protocol for ClickHouse TCP clients.

## Varint {#varint}

For lengths, packet codes and other cases the *unsigned varint* encoding is used.
Use [binary.PutUvarint](https://pkg.go.dev/encoding/binary#PutUvarint) and [binary.ReadUvarint](https://pkg.go.dev/encoding/binary#ReadUvarint).

> **note**: *Signed* varint isn't used.

## String {#string}

Variable length strings are encoded as *(length, value)*, where *length* is [varint](#varint) and *value* is utf8 string.

> **important**: Validate length to prevent OOM:

`0 ≤ len < MAX`
```go
s := "Hello, world!"

// Writing string length as uvarint.
buf := make([]byte, binary.MaxVarintLen64)
n := binary.PutUvarint(buf, uint64(len(s)))
buf = buf[:n]

// Writing string value.
buf = append(buf, s...)
```

```go
r := bytes.NewReader([]byte{
    0xd, 0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c,
    0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21,
})

// Read length.
n, err := binary.ReadUvarint(r)
if err != nil {
        panic(err)
}

// Check n to prevent OOM or runtime exception in make().
const maxSize = 1024 * 1024 * 10 // 10 MB
if n > maxSize || n < 0 {
    panic("invalid n")
}

buf := make([]byte, n)
if _, err := io.ReadFull(r, buf); err != nil {
        panic(err)
}

fmt.Println(string(buf))
// Hello, world!
```

```hexdump
00000000  0d 48 65 6c 6c 6f 2c 20  77 6f 72 6c 64 21        |.Hello, world!|
```

```text
DUhlbGxvLCB3b3JsZCE
```

```go
data := []byte{
    0xd, 0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c,
    0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21,
}
```

## Integers {#integers}

> **tip**: ClickHouse uses **Little Endian** for fixed size integers.

### Int32 {#int32}
```go
v := int32(1000)

// Encode.
buf := make([]byte, 8)
binary.LittleEndian.PutUint32(buf, uint32(v))

// Decode.
d := int32(binary.LittleEndian.Uint32(buf))
fmt.Println(d) // 1000
```

```hexdump
00000000  e8 03 00 00 00 00 00 00                           |........|
```

```text
6AMAAAAAAAA
```

## Boolean {#boolean}

Booleans are represented by single byte, `1` is `true` and `0` is `false`.
