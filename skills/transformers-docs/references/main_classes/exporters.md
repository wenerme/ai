

# Exporters

New export backends can be added to Transformers by subclassing [`HfExporter`].

Learn how to use the built-in exporters in the [Exporters](../exporters) guide.

## AutoHfExporter

[[autodoc]] exporters.auto.AutoHfExporter

## AutoExportConfig

[[autodoc]] exporters.auto.AutoExportConfig

## HfExporter

[[autodoc]] exporters.base.HfExporter

## DynamoExporter

[[autodoc]] exporters.exporter_dynamo.DynamoExporter
    - export

## OnnxExporter

[[autodoc]] exporters.exporter_onnx.OnnxExporter
    - export

## ExecutorchExporter

[[autodoc]] exporters.exporter_executorch.ExecutorchExporter
    - export

## DynamoConfig

[[autodoc]] exporters.configs.DynamoConfig

## OnnxConfig

[[autodoc]] exporters.configs.OnnxConfig

## ExecutorchConfig

[[autodoc]] exporters.configs.ExecutorchConfig

## Utilities

Lower-level functions that power `export_for_generation`, useful when you need to intervene
between decomposing a model and exporting each component.

[[autodoc]] exporters.utils.get_leaf_tensors

[[autodoc]] exporters.utils.prepare_for_export

[[autodoc]] exporters.utils.decompose_prefill_decode

[[autodoc]] exporters.utils.decompose_multimodal

[[autodoc]] exporters.utils.decompose_for_generation

[[autodoc]] exporters.utils.is_multimodal
