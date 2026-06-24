

# Backbone

A backbone is a model used for feature extraction for higher level computer vision tasks such as object detection and image classification. Transformers provides an [`AutoBackbone`] class for initializing a Transformers backbone from pretrained model weights, and two utility classes:

* [`~backbone_utils.BackboneMixin`] enables initializing a backbone from Transformers or [timm](https://hf.co/docs/timm/index) and includes functions for returning the output features and indices.
* [`~backbone_utils.BackboneConfigMixin`] sets the output features and indices of the backbone configuration.

[timm](https://hf.co/docs/timm/index) models are loaded with the [`TimmBackbone`] and [`TimmBackboneConfig`] classes.

Backbones are supported for the following models:

* [BEiT](../model_doc/beit)
* [BiT](../model_doc/bit)
* [ConvNext](../model_doc/convnext)
* [ConvNextV2](../model_doc/convnextv2)
* [DiNAT](../model_doc/dinat)
* [DINOV2](../model_doc/dinov2)
* [FocalNet](../model_doc/focalnet)
* [MaskFormer](../model_doc/maskformer)
* [NAT](../model_doc/nat)
* [ResNet](../model_doc/resnet)
* [Swin Transformer](../model_doc/swin)
* [Swin Transformer v2](../model_doc/swinv2)
* [ViTDet](../model_doc/vitdet)

## AutoBackbone

[[autodoc]] AutoBackbone

## BackboneMixin

[[autodoc]] backbone_utils.BackboneMixin

## BackboneConfigMixin

[[autodoc]] backbone_utils.BackboneConfigMixin

## TimmBackbone

[[autodoc]] models.timm_backbone.TimmBackbone

## TimmBackboneConfig

[[autodoc]] models.timm_backbone.TimmBackboneConfig
