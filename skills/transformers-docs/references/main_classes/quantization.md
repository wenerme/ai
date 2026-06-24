

# Quantization

Quantization techniques reduce memory and computational costs by representing weights and activations with lower-precision data types like 8-bit integers (int8). This enables loading larger models you normally wouldn't be able to fit into memory, and speeding up inference. Transformers supports the AWQ and GPTQ quantization algorithms and it supports 8-bit and 4-bit quantization with bitsandbytes.

Quantization techniques that aren't supported in Transformers can be added with the [`HfQuantizer`] class.

Learn how to quantize models in the [Quantization](../quantization) guide.

## QuantoConfig

[[autodoc]] QuantoConfig

## AqlmConfig

[[autodoc]] AqlmConfig

## VptqConfig

[[autodoc]] VptqConfig

## AwqConfig

[[autodoc]] AwqConfig

## EetqConfig

[[autodoc]] EetqConfig

## GPTQConfig

[[autodoc]] GPTQConfig

## BitsAndBytesConfig

[[autodoc]] BitsAndBytesConfig

## HfQuantizer

[[autodoc]] quantizers.base.HfQuantizer

## HiggsConfig

[[autodoc]] HiggsConfig

## HqqConfig

[[autodoc]] HqqConfig

## MetalConfig

[[autodoc]] MetalConfig

## Mxfp4Config

[[autodoc]] Mxfp4Config

## FbgemmFp8Config

[[autodoc]] FbgemmFp8Config

## CompressedTensorsConfig

[[autodoc]] CompressedTensorsConfig

## TorchAoConfig

[[autodoc]] TorchAoConfig

## BitNetQuantConfig

[[autodoc]] BitNetQuantConfig

## SpQRConfig

[[autodoc]] SpQRConfig

## FineGrainedFP8Config

[[autodoc]] FineGrainedFP8Config

## QuarkConfig

[[autodoc]] QuarkConfig

## FourOverSixConfig

[[autodoc]] FourOverSixConfig

## FPQuantConfig

[[autodoc]] FPQuantConfig

## AutoRoundConfig

[[autodoc]] AutoRoundConfig

## SinqConfig

[[autodoc]] SinqConfig
