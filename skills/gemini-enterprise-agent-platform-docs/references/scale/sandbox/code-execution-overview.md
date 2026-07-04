Many agent tasks, like financial calculations and data science workflows require
an agent to generate and execute code. Code Execution lets your
agent run code in a secure, isolated, and managed sandbox environment.

Features of Code Execution include:

- Sandboxes can be created and execute code in under a second.

- Sandboxes support file input and output up to 100MB for the entire request
  or response.

- Sandboxes maintain their execution state (memory) for up to 14 days. This
  time to live (TTL) setting is configurable.

> [!NOTE]
> To see an example of using Code Execution,
> run the "Get started with Code Execution" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/agents/agent_engine/tutorial_get_started_with_code_execution.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fagents%2Fagent_engine%2Ftutorial_get_started_with_code_execution.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/agents/agent_engine/tutorial_get_started_with_code_execution.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/agents/agent_engine/tutorial_get_started_with_code_execution.ipynb)

> [!NOTE]
> **Note:** Code Execution is supported in only the `us-central1` region.

You aren't required to deploy your agent to Agent Platform
to use Code Execution. Your agent can be running anywhere, even
locally.

Code Execution works with any agent framework and any generative model.

Here are the major operations for working with a Code Execution sandbox:

- **Create sandbox**: creates a secure, isolated space to
  run untrusted or potentially harmful code. This isolation reduces
  security risks by preventing the code from touching your system's resources,
  files, or network. A sandbox is vital when you need to run code safely, such
  as for data science agents, orchestration scripts, or during development
  testing. The sandbox offers a limited file system and no network access.

- **Get sandbox**: shows the configuration and status of a specific
  Code Execution sandbox. You can check details like its current
  state (for example, running or stopped) and time to live (TTL). This lets
  you track your sandboxes and verify their status before or after running
  code.

- **List sandboxes**: list all of the Code Execution sandboxes in your
  project. You can filter the results by criteria like sandbox status or type.
  This helps with checking, monitoring, and managing many sandboxes in your
  project.

- **Execute code** : sends your code along with any required input files to the
  sandbox for safe execution. The response includes the results, such as
  standard output (`stdout`), standard error (`stderr`), and any files the code
  generates. The sandbox can also maintain *state* , which allows subsequent
  `Execute Code` calls to build on previous calls. This is crucial for
  interactive sessions or complex tasks that need the environment to maintain
  state across several code runs.

> [!NOTE]
> **Note:** Snapshots are not supported for Code Execution sandboxes.

## Supported libraries

The Code Execution sandbox includes the following libraries
categorized by use case. You can't install your own libraries in the sandbox
environment.

### Data Science \& Machine Learning

This section includes libraries essential for data analysis, manipulation,
machine learning, and numerical computation.

#### Core Data Handling \& Numerics

- **numpy** (2.1.3): Fundamental package for numerical computing in Python, providing support for large, multi-dimensional arrays and matrices, along with a large collection of high-level mathematical functions to operate on these arrays.
- **pandas** (2.2.3): Powerful data analysis and manipulation library, offering data structures like DataFrame and Series for handling structured data.
- **scipy** (1.15.2): Ecosystem of open-source software for mathematics, science, and engineering. It builds on NumPy and provides a large number of user-friendly and efficient numerical routines.
- **pyarrow** (18.1.0): Cross-language development platform for in-memory data. It's particularly useful for efficient data handling and interoperability between systems.
- **numexpr** (2.14.1): Fast numerical expression evaluator for NumPy, optimizing array operations.
- **narwhals** (2.19.0): Provides a way to write code that works on multiple DataFrame libraries (like pandas and Polars).

#### Machine Learning Frameworks

- **scikit-learn** (1.6.1): Simple and efficient tools for data mining and data analysis, built on NumPy, SciPy, and matplotlib.
- **tensorflow** (2.20.0): An end-to-end open-source platform for machine learning.
- **keras** (3.14.0): High-level neural networks API, written in Python and capable of running on top of TensorFlow, CNTK, or Theano.
- **xgboost** (3.2.0): Optimized distributed gradient boosting library designed to be highly efficient, flexible, and portable.
- **thinc** (8.3.13): A lightweight deep learning library that offers an elegant, type-checked, functional-programming API for composing models.

#### Natural Language Processing (NLP)

- **nltk** (3.9.1): Leading platform for building Python programs to work with human language data.
- **spacy** (3.8.14): Library for advanced Natural Language Processing in Python and Cython.
- **spacy-legacy** (3.0.12): Legacy components for spaCy.
- **spacy-loggers** (1.0.5): Logging utilities for spaCy projects.
- **textblob** (0.19.0): Simplified text processing library, providing a simple API for common NLP tasks.
- **catalogue** (2.0.10): Tiny library for function registries, often used in NLP pipelines.
- **confection** (1.3.3): Configuration system, often used with spaCy.
- **cymem** (2.0.13): Memory management for Cython, used by spaCy.
- **murmurhash** (1.0.15): Cython bindings for MurmurHash, used by spaCy.
- **preshed** (3.0.13): Cython hash tables and bloom filters, used by spaCy.
- **srsly** (2.5.3): Modern high-performance serialization utilities for Python.
- **wasabi** (1.1.3): Lightweight console printing and formatting utilities.
- **weasel** (1.0.0): Command-line interface for spaCy projects.

#### Scientific \& Symbolic Computing

- **mpmath** (1.3.0): Python library for real and complex floating-point arithmetic with arbitrary precision.
- **sympy** (1.13.3): Python library for symbolic mathematics.
- **networkx** (3.6.1): Package for the creation, manipulation, and study of the structure, dynamics, and functions of complex networks.

#### Performance \& Optimization

- **numba** (0.64.0): Just-in-time compiler for Python that translates a subset of Python and NumPy code into fast machine code.
- **llvmlite** (0.46.0): Lightweight LLVM Python bindings for use with Numba.
- **blis** (1.3.3): BLAS-like linear algebra library, often a dependency for numerical packages.
- **opt_einsum** (3.4.0): Optimizing einsum expressions in NumPy, TensorFlow, and other array libraries.
- **optree** (0.19.0): Optimized PyTree manipulation in JAX.
- **nvidia-nccl-cu12** (2.29.7): NVIDIA Collective Communication Library, for multi-GPU communication.

#### Statistical Modeling

- **statsmodels** (0.14.6): Provides classes and functions for the estimation of many different statistical models, as well as for conducting statistical tests and statistical data exploration.
- **patsy** (1.0.2): A Python library for describing statistical models and building design matrices.

#### Operations Research

- **ortools** (9.14.6206): Google Optimization Tools, a suite of tools for combinatorial optimization.

### Visualization

Libraries for creating static, animated, and interactive visualizations.

- **matplotlib** (3.10.1): Comprehensive library for creating static, animated, and interactive visualizations in Python.
- **matplotlib-inline** (0.2.1): Backend for embedding matplotlib plots in Jupyter notebooks.
- **matplotlib-venn** (1.1.2): Library for plotting Venn diagrams.
- **seaborn** (0.13.2): Statistical data visualization library based on matplotlib. It provides a high-level interface for drawing attractive and informative statistical graphics.
- **plotly** (6.1.2): Interactive graphing library that makes it easy to create beautiful, publication-quality graphs online and offline.
- **bokeh** (3.8.2): Interactive visualization library that targets modern web browsers for presentation.
- **mizani** (0.13.5): Scales for Python graphics, inspired by ggplot2.
- **contourpy** (1.3.1): Provides contour line generation algorithms.
- **cycler** (0.12.1): Composable style cycles for matplotlib.
- **fonttools** (4.62.1): Library for manipulating fonts.
- **kiwisolver** (1.5.0): Efficient C++ implementation of the Cassowary constraint solving algorithm.

### Image \& Video Processing

Libraries for working with image and video data.

- **opencv-python** (4.11.0.86): Python bindings for OpenCV, a library of programming functions mainly aimed at real-time computer vision.
- **pillow** (11.1.0): Friendly fork of the Python Imaging Library (PIL), adding support for opening, manipulating, and saving many different image file formats.
- **imageio** (2.37.0): Library for reading and writing a wide range of image data, including animated images, video, and volumetric data.
- **scikit-image** (0.25.2): Collection of algorithms for image processing.
- **tifffile** (2026.4.11): Read and write TIFF files.

### File Handling \& I/O

Libraries for reading, writing, and manipulating various file formats.

#### Excel

- **openpyxl** (3.1.5): Library to read/write Excel 2010 xlsx/xlsm/xltx/xltm files.
- **xlrd** (2.0.1): Library for developers to extract data from Microsoft Excel (tm) spreadsheet files.
- **XlsxWriter** (3.2.0): Module for creating Excel files in the XSLX format.

#### PDF

- **PyPDF2** (3.0.1): Pure-python PDF library capable of splitting, merging, cropping, and transforming the pages of PDF files.
- **fpdf** (1.7.2): Simple library for PDF generation.
- **reportlab** (4.3.1): Powerful library for creating PDFs.
- **PyLaTeX** (1.4.2): Library for creating and compiling LaTeX files.

#### Word

- **python-docx** (1.1.2): Library for creating and updating Microsoft Word (.docx) files.

#### PowerPoint

- **python-pptx** (1.0.2): Library for creating and updating PowerPoint (.pptx) files.

#### XML/HTML

- **lxml** (5.3.1): Feature-rich and easy-to-use library for processing XML and HTML.
- **et_xmlfile** (2.0.0): Low memory library for creating large XML files.

#### Markdown

- **Markdown** (3.10.2): Python implementation of John Gruber's Markdown.
- **markdown-it-py** (4.0.0): Markdown parser, done right. 100% CommonMark support.
- **mdurl** (0.1.2): URL utilities for Markdown.

#### YAML

- **PyYAML** (6.0.3): YAML parser and emitter for Python.

#### RTF

- **striprtf** (0.0.28): Library to extract plain text from RTF documents.

#### General File I/O

- **h5py** (3.16.0): Pythonic interface to the HDF5 binary data format.
- **smart_open** (7.6.0): Utils for streaming large files (S3, HDFS, GCS, etc.).
- **cloudpathlib** (0.23.0): Pathlib-style classes for cloud storage.

### Web \& Networking

Libraries for web requests, server development, and network communication.

- **requests** (2.33.1): Elegant and simple HTTP library for Python, built for human beings.
- **httpx** (0.28.1): Fully featured HTTP client for Python, with support for HTTP/1.1 and HTTP/2, and async capabilities.
- **httpcore** (1.0.9): Low-level HTTP client, forming the core of HTTPX.
- **urllib3** (2.6.3): Powerful, user-friendly HTTP client for Python.
- **grpcio** (1.80.0): Python gRPC (Google Remote Procedure Call) library.
- **h11** (0.16.0): Pure-Python, bring-your-own-I/O implementation of HTTP/1.1.
- **idna** (3.11): Internationalized Domain Names in Applications (IDNA) 2008 support.
- **certifi** (2026.2.25): Provides Mozilla's carefully curated collection of Root Certificates for validating the trustworthiness of SSL certificates.
- **tornado** (6.5.5): Web framework and asynchronous networking library.
- **Werkzeug** (3.1.8): Comprehensive WSGI web application library.
- **Jinja2** (3.1.6): Modern and designer-friendly templating language for Python.
- **MarkupSafe** (3.0.3): Safely add untrusted strings to HTML/XML markup.

### Development Tools \& Utilities

General utilities, tools for building applications, and development aids.

#### Packaging \& Distribution

- **pip** (24.2): The package installer for Python.
- **setuptools** (82.0.1): Library for packaging Python projects.
- **wheel** (0.46.3): Built-package format for Python.
- **packaging** (24.0): Core utilities for Python packages.

#### Command Line Interfaces (CLI)

- **click** (8.3.2): Composable command line interface creation toolkit.
- **typer** (0.24.1): Library for building CLI applications with type hints.
- **rich** (15.0.0): Library for rich text and beautiful formatting in the terminal.
- **termcolor** (3.3.0): ANSII Color formatting for output in terminal.
- **tqdm** (4.67.3): Fast, extensible progress bar for Python and CLI.
- **shellingham** (1.5.4): Tool to detect a user's shell.

#### Data Validation \& Schemas

- **pydantic** (2.13.1): Data validation and settings management using python type annotations.
- **pydantic_core** (2.46.1): Core validation logic for Pydantic.
- **annotated-types** (0.7.0): Reusable constraint types for function arguments, variables, and dataclass fields.
- **jsonschema** (4.23.0): Implementation of JSON Schema for Python.
- **jsonschema-specifications** (2024.10.1): The JSON Schema meta-schemas and vocabularies.
- **referencing** (0.37.0): JSON Reference resolution.

#### Serialization

- **protobuf** (6.31.1): Google's Protocol Buffers.
- **flatbuffers** (25.12.19): Efficient cross-platform serialization library.

#### Concurrency \& Parallelism

- **anyio** (4.13.0): Asynchronous compatibility layer that allows you to write async code that works on different async event loops.
- **joblib** (1.4.2): Lightweight pipelining: tools to run Python functions as a pipeline.
- **threadpoolctl** (3.6.0): Python interface to control the number of threads used in thread pools of common libraries.

#### Parsing

- **pyparsing** (3.2.1): Alternative approach to creating and executing simple grammars, vs. the standard lex/yacc approach.
- **astunparse** (1.6.3): Unparser for Python abstract syntax trees.

#### Low-level \& Foreign Function Interface (FFI)

- **libclang** (18.1.1): Clang Python bindings.

#### Date \& Time

- **python-dateutil** (2.9.0.post0): Extensions to the standard datetime module.
- **pytz** (2025.2): World timezone definitions, modern and historical.
- **tzdata** (2025.3): Time zone data.

#### General Utilities

- **attrs** (25.3.0): Classes Without Boilerplate.
- **toolz** (1.0.0): Functional standard library for Python.
- **six** (1.17.0): Python 2 and 3 compatibility utilities.
- **wrapt** (2.1.2): Module for decorators, wrappers and monkey patching.
- **immutabledict** (4.3.1): Immutable dictionary.
- **ordered-set** (4.1.0): Mutable data structure that is a hybrid of a list and a set.
- **lazy-loader** (0.5): Lazily import Python modules.
- **google-pasta** (0.2.0): Library to refactor Python code.
- **traitlets** (5.14.3): Configuration system for Python applications.
- **regex** (2026.4.4): Alternative regular expression module, to replace Python's `re` module.
- **chardet** (7.4.3): Universal character encoding detector.
- **charset-normalizer** (3.4.7): The Real First Universal Charset Detector.
- **typing_extensions** (4.15.0): Backported and Experimental Type Hints for Python 3.7+.
- **typing-inspection** (0.4.2): Runtime inspection of types in Python.
- **Pygments** (2.20.0): Python syntax highlighter.
- **ml_dtypes** (0.5.4): dtypes for machine learning.
- **rpds-py** (0.30.0): Rust Persistent Data Structures for Python.
- **annotated-doc** (0.0.4): Library for document annotation.
- **namex** (0.1.0): Utility library.

#### Debugging \& Profiling

- **tensorboard** (2.20.0): TensorFlow's visualization toolkit.
- **tensorboard-data-server** (0.7.2): Data server for TensorBoard.

### Geospatial

Libraries specifically designed for handling geospatial data.

- **geopandas** (1.0.1): Extends the datatypes used by pandas to allow spatial operations on geometric types.
- **pyogrio** (0.12.1): Vectorized I/O for geospatial vector file formats.
- **pyproj** (3.7.2): Python interface to PROJ (cartographic projections and coordinate transformations library).
- **shapely** (2.1.2): Package for manipulation and analysis of planar geometric objects.
- **xyzservices** (2026.3.0): Source of XYZ tile providers.

### Miscellaneous

- **chess** (1.11.2): A pure Python chess library with move generation and validation, PGN parsing and writing, and more.
- **gast** (0.7.0): A generic AST to AST converter.

## What's next

- [Code Execution quickstart](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sandbox/code-execution-quickstart)
