## Base64 encode images

To make image generation requests you must send image data as
[Base64 encoded](https://en.wikipedia.org/wiki/Base64) text.

## Using the command line

Within a gRPC request, you can simply write binary data out directly;
however, JSON is used when making a REST request. JSON
is a text format that does not directly support binary data, so you will need to
convert such binary data into text using
[Base64](https://en.wikipedia.org/wiki/Base64) encoding.

Most development environments contain a native `base64` utility to
encode a binary into ASCII text data. To encode a file:

### Linux

Encode the file using the `base64` command line tool, making sure to
prevent line-wrapping by using the `-w 0` flag:

```
base64 INPUT_FILE -w 0 > OUTPUT_FILE
```

### macOS

Encode the file using the `base64` command line tool:

```
base64 -i INPUT_FILE -o OUTPUT_FILE
```

### Windows

Encode the file using the `Base64.exe` tool:

```
Base64.exe -e INPUT_FILE > OUTPUT_FILE
```

### PowerShell

Encode the file using the `Convert.ToBase64String` method:

```
[Convert]::ToBase64String([IO.File]::ReadAllBytes("./INPUT_FILE")) > OUTPUT_FILE
```

Create a JSON request file, inlining the base64-encoded data:

### JSON

```json
{
  "instances": [
    {
      "prompt": "TEXT_PROMPT",
      "image": {
        "bytes_base64_encoded": "B64_BASE_IMAGE"
      }
    }
  ]
}
```

## Using client libraries

Embedding binary data into requests through text editors is neither
desirable or practical. In practice, you will be embedding base64 encoded files
within client code. All supported programming languages have built-in mechanisms
for base64 encoding content.

### Python

    # Import the base64 encoding library.
    import base64

    # Pass the image data to an encoding function.
    def encode_image(image):
        with open(image, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        return encoded_string

### Node.js

    // Read the file into memory.
    var fs = require('fs');
    var imageFile = fs.readFileSync('/path/to/file');

    // Convert the image data to a Buffer and base64 encode it.
    var encoded = Buffer.from(imageFile).toString('base64');

### Java

    // Import the Base64 encoding library.
    import org.apache.commons.codec.binary.Base64;

    // Encode the image.
    String encodedString = Base64.getEncoder().encodeToString(imageFile.getBytes());

### Go

    import (
        "bufio"
        "encoding/base64"
        "io"
        "os"
    )

    // Open image file.
    f, _ := os.Open("image.jpg")

    // Read entire image into byte slice.
    reader := bufio.NewReader(f)
    content, _ := io.ReadAll(reader)

    // Encode image as base64.
    base64.StdEncoding.EncodeToString(content)

## Base64 decode images

API requests return generated or edited images as base64-encoded strings. You
can use the following client library samples to decode this data and save it
locally as an image file.

### Python

    # Import the base64 encoding library.
    import base64

    # Pass the base64 encoded image data to a decoding function and save image file.
    def decode_image(b64_encoded_string):
       with open("b64DecodedImage.png", "wb") as fh:
         fh.write(base64.decodebytes(b64_encoded_string))

### Node.js

    var fs = require('fs');

    // Create buffer object, specifying base64 as encoding
    var buf = Buffer.from(base64str,'base64');

    // Write buffer content to a file
    fs.writeFile("b64DecodedImage.png", buf, function(error){
      if(error){
        throw error;
      }else{
        console.log('File created from base64 string');
        return true;
      }
    });

### Java

    // Import libraries
    import org.apache.commons.codec.binary.Base64;
    import org.apache.commons.io.FileUtils;

    // Create new file
    File file = new File("./b64DecodedImage.png");
    // Convert base64 encoded string to byte array
    byte[] bytes = Base64.decodeBase64("base64");
    // Write out file
    FileUtils.writeByteArrayToFile(file, bytes);

### Go

    // Import packages
    import (
       "encoding/base64"
       "io"
       "os"
    )

    // Add encoded file string
    var b64 = `TWFuIGlz...Vhc3VyZS4=`

    // Decode base64-encoded string
    dec, err := base64.StdEncoding.DecodeString(b64)
    if err != nil {
        panic(err)
    }

    // Create output file
    f, err := os.Create("b64DecodedImage.png")
    if err != nil {
        panic(err)
    }
    defer f.Close()

    if _, err := f.Write(dec); err != nil {
        panic(err)
    }
    if err := f.Sync(); err != nil {
        panic(err)
    }
