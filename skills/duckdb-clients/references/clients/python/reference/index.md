# Python Client API

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.BinaryValue">
class duckdb.BinaryValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.BinaryValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.BinderException">
class duckdb.BinderException<a class="headerlink" href="#duckdb.BinderException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.ProgrammingError" title="_duckdb.ProgrammingError"><code class="xref py py-class docutils literal notranslate">ProgrammingError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.BitValue">
class duckdb.BitValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.BitValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.BlobValue">
class duckdb.BlobValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.BlobValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.BooleanValue">
class duckdb.BooleanValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.BooleanValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.CSVLineTerminator">
class duckdb.CSVLineTerminator<a class="headerlink" href="#duckdb.CSVLineTerminator" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">pybind11_object</code></p>
<p>Members:</p>
<p>LINE_FEED</p>
<p>CARRIAGE_RETURN_LINE_FEED</p>
<dl class="py property">
<dt class="sig sig-object py">
CSVLineTerminator.name -&gt; str
</dt>
<dd></dd>
</dl>

</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.CaseExpression">
duckdb.CaseExpression(<em class="sig-param">condition: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>, <em class="sig-param">value: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.CaseExpression" title="Link to this definition">&#182;</a>
</dt>
<dd></dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.CatalogException">
class duckdb.CatalogException<a class="headerlink" href="#duckdb.CatalogException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.ProgrammingError" title="_duckdb.ProgrammingError"><code class="xref py py-class docutils literal notranslate">ProgrammingError</code></a></p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.CoalesceOperator">
duckdb.CoalesceOperator(<em class="sig-param">*args</em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.CoalesceOperator" title="Link to this definition">&#182;</a>
</dt>
<dd></dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.ColumnExpression">
duckdb.ColumnExpression(<em class="sig-param">*args</em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.ColumnExpression" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a column reference from the provided column name</p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.ConnectionException">
class duckdb.ConnectionException<a class="headerlink" href="#duckdb.ConnectionException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.OperationalError" title="_duckdb.OperationalError"><code class="xref py py-class docutils literal notranslate">OperationalError</code></a></p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.ConstantExpression">
duckdb.ConstantExpression(<em class="sig-param">value: object</em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.ConstantExpression" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a constant expression from the provided value</p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.ConstraintException">
class duckdb.ConstraintException<a class="headerlink" href="#duckdb.ConstraintException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.IntegrityError" title="_duckdb.IntegrityError"><code class="xref py py-class docutils literal notranslate">IntegrityError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.ConversionException">
class duckdb.ConversionException<a class="headerlink" href="#duckdb.ConversionException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DataError" title="_duckdb.DataError"><code class="xref py py-class docutils literal notranslate">DataError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.DBAPITypeObject">
class duckdb.DBAPITypeObject(<em class="sig-param">types: list[DuckDBPyType]</em>)<a class="headerlink" href="#duckdb.DBAPITypeObject" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">object</code></p>
<p>DB API 2.0 type object for categorizing database column types.</p>
<p>This class implements the type objects defined in PEP 249 (DB API 2.0).
It allows checking whether a specific DuckDB type belongs to a broader
category like STRING, NUMBER, DATETIME, etc.</p>
<p>The type object supports equality comparison with DuckDBPyType instances,
returning True if the type belongs to this category.</p>
<dl>
<dt>Args:</dt>
<dd>
<p>types: A list of DuckDBPyType instances that belong to this type category.</p>
</dd>
<dt>Example:</dt>
<dd>

<pre>&gt;&gt;&gt; string_types = DBAPITypeObject([sqltypes.VARCHAR, sqltypes.CHAR])
&gt;&gt;&gt; result = sqltypes.VARCHAR == string_types  # True
&gt;&gt;&gt; result = sqltypes.INTEGER == string_types  # False
</pre>

</dd>
<dt>Note:</dt>
<dd>
<p>This follows the DB API 2.0 specification where type objects are compared
using equality operators rather than isinstance() checks.</p>
</dd>
</dl>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.DataError">
class duckdb.DataError<a class="headerlink" href="#duckdb.DataError" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DatabaseError" title="_duckdb.DatabaseError"><code class="xref py py-class docutils literal notranslate">DatabaseError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.DatabaseError">
class duckdb.DatabaseError<a class="headerlink" href="#duckdb.DatabaseError" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Error" title="_duckdb.Error"><code class="xref py py-class docutils literal notranslate">Error</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.DateValue">
class duckdb.DateValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.DateValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.DecimalValue">
class duckdb.DecimalValue(<em class="sig-param">object: Any</em>, <em class="sig-param">width: int</em>, <em class="sig-param">scale: int</em>)<a class="headerlink" href="#duckdb.DecimalValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.DefaultExpression">
duckdb.DefaultExpression() &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.DefaultExpression" title="Link to this definition">&#182;</a>
</dt>
<dd></dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.DependencyException">
class duckdb.DependencyException<a class="headerlink" href="#duckdb.DependencyException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DatabaseError" title="_duckdb.DatabaseError"><code class="xref py py-class docutils literal notranslate">DatabaseError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.DoubleValue">
class duckdb.DoubleValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.DoubleValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection">
class duckdb.DuckDBPyConnection<a class="headerlink" href="#duckdb.DuckDBPyConnection" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">pybind11_object</code></p>
<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.append">
append(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">table_name: str</em>, <em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">by_name: bool = False</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.append" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Append the passed DataFrame to the named table</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.array_type">
array_type(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">type: _duckdb._sqltypes.DuckDBPyType</em>, <em class="sig-param">size: SupportsInt</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.DuckDBPyConnection.array_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create an array type object of &#8216;type&#8217;</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.arrow">
arrow(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">rows_per_batch: SupportsInt = 1000000</em>) &#8594; <a class="reference external" href="https://arrow.apache.org/docs/9.0/python/generated/pyarrow.RecordBatchReader.html#pyarrow.RecordBatchReader" title="(in Apache Arrow v9.0.0)">pyarrow.lib.RecordBatchReader</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.arrow" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Alias of to_arrow_reader(). We recommend using to_arrow_reader() instead.</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.begin">
begin(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.begin" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Start a new transaction</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.checkpoint">
checkpoint(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.checkpoint" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Synchronizes data in the write-ahead log (WAL) to the database data file (no-op for in-memory connections)</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.close">
close(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyConnection.close" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Close the connection</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.commit">
commit(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.commit" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Commit changes performed within a transaction</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.create_function">
create_function(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">name: str</em>, <em class="sig-param">function: collections.abc.Callable</em>, <em class="sig-param">parameters: object = None</em>, <em class="sig-param">return_type: _duckdb._sqltypes.DuckDBPyType = None</em>, <em class="sig-param">*</em>, <em class="sig-param">type: _duckdb._func.PythonUDFType = &lt;PythonUDFType.NATIVE: 0&gt;</em>, <em class="sig-param">null_handling: _duckdb._func.FunctionNullHandling = &lt;FunctionNullHandling.DEFAULT: 0&gt;</em>, <em class="sig-param">exception_handling: <a class="reference internal" href="#duckdb.PythonExceptionHandling" title="_duckdb.PythonExceptionHandling">_duckdb.PythonExceptionHandling</a> = &lt;PythonExceptionHandling.DEFAULT: 0&gt;</em>, <em class="sig-param">side_effects: bool = False</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.create_function" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a DuckDB function out of the passing in Python function so it can be used in queries</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.cursor">
cursor(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.cursor" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a duplicate of the current connection</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.decimal_type">
decimal_type(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">width: SupportsInt</em>, <em class="sig-param">scale: SupportsInt</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.DuckDBPyConnection.decimal_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a decimal type with &#8216;width&#8217; and &#8216;scale&#8217;</p>
</dd>
</dl>

<dl class="py property">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.description">
property description<a class="headerlink" href="#duckdb.DuckDBPyConnection.description" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get result set attributes, mainly column names</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.df">
df(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">date_as_object: bool = False</em>) &#8594; <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.df" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as DataFrame following execute()</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.disable_profiling">
disable_profiling(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyConnection.disable_profiling" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Disable profiling for subsequent queries</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.dtype">
dtype(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">type_str: str</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.DuckDBPyConnection.dtype" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a type object by parsing the &#8216;type_str&#8217; string</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.duplicate">
duplicate(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.duplicate" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a duplicate of the current connection</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.enable_profiling">
enable_profiling(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyConnection.enable_profiling" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Enable profiling for subsequent queries</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.enum_type">
enum_type(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">name: str</em>, <em class="sig-param">type: _duckdb._sqltypes.DuckDBPyType</em>, <em class="sig-param">values: list</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.DuckDBPyConnection.enum_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create an enum type of underlying &#8216;type&#8217;, consisting of the list of &#8216;values&#8217;</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.execute">
execute(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">query: object</em>, <em class="sig-param">parameters: object = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.execute" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute the given SQL query, optionally using prepared statements with parameters set</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.executemany">
executemany(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">query: object</em>, <em class="sig-param">parameters: object = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.executemany" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute the given prepared statement multiple times using the list of parameter sets in parameters</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.extract_statements">
extract_statements(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">query: str</em>) &#8594; list<a class="headerlink" href="#duckdb.DuckDBPyConnection.extract_statements" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Parse the query string and extract the Statement object(s) produced</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.fetch_arrow_table">
fetch_arrow_table(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">rows_per_batch: SupportsInt = 1000000</em>) &#8594; <a class="reference external" href="https://arrow.apache.org/docs/9.0/python/generated/pyarrow.Table.html#pyarrow.Table" title="(in Apache Arrow v9.0.0)">pyarrow.lib.Table</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.fetch_arrow_table" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as Arrow table following execute()</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.fetch_df">
fetch_df(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">date_as_object: bool = False</em>) &#8594; <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.fetch_df" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as DataFrame following execute()</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.fetch_df_chunk">
fetch_df_chunk(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">vectors_per_chunk: SupportsInt = 1</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">date_as_object: bool = False</em>) &#8594; <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.fetch_df_chunk" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a chunk of the result as DataFrame following execute()</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.fetch_record_batch">
fetch_record_batch(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">rows_per_batch: SupportsInt = 1000000</em>) &#8594; <a class="reference external" href="https://arrow.apache.org/docs/9.0/python/generated/pyarrow.RecordBatchReader.html#pyarrow.RecordBatchReader" title="(in Apache Arrow v9.0.0)">pyarrow.lib.RecordBatchReader</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.fetch_record_batch" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch an Arrow RecordBatchReader following execute()</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.fetchall">
fetchall(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; list<a class="headerlink" href="#duckdb.DuckDBPyConnection.fetchall" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch all rows from a result following execute</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.fetchdf">
fetchdf(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">date_as_object: bool = False</em>) &#8594; <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.fetchdf" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as DataFrame following execute()</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.fetchmany">
fetchmany(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">size: SupportsInt = 1</em>) &#8594; list<a class="headerlink" href="#duckdb.DuckDBPyConnection.fetchmany" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch the next set of rows from a result following execute</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.fetchnumpy">
fetchnumpy(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; dict<a class="headerlink" href="#duckdb.DuckDBPyConnection.fetchnumpy" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as list of NumPy arrays following execute</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.fetchone">
fetchone(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; Optional[tuple]<a class="headerlink" href="#duckdb.DuckDBPyConnection.fetchone" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a single row from a result following execute</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.filesystem_is_registered">
filesystem_is_registered(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">name: str</em>) &#8594; bool<a class="headerlink" href="#duckdb.DuckDBPyConnection.filesystem_is_registered" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Check if a filesystem with the provided name is currently registered</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.from_arrow">
from_arrow(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">arrow_object: object</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.from_arrow" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from an Arrow object</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.from_csv_auto">
from_csv_auto(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">path_or_buffer: object</em>, <em class="sig-param">**kwargs</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.from_csv_auto" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from the CSV file in &#8216;name&#8217;</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.from_df">
from_df(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.from_df" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from the DataFrame in df</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.from_parquet">
from_parquet(<em class="sig-param">*args</em>, <em class="sig-param">**kwargs</em>)<a class="headerlink" href="#duckdb.DuckDBPyConnection.from_parquet" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Overloaded function.</p>
<ol class="arabic simple">
<li><p>from_parquet(self: _duckdb.DuckDBPyConnection, file_glob: str, binary_as_string: bool = False, <a href="#id1">*</a>, file_row_number: bool = False, filename: bool = False, hive_partitioning: bool = False, union_by_name: bool = False, compression: object = None) -&gt; _duckdb.DuckDBPyRelation</p></li>
</ol>
<p>Create a relation object from the Parquet files in file_glob</p>
<ol class="arabic simple" start="2">
<li><p>from_parquet(self: _duckdb.DuckDBPyConnection, file_globs: collections.abc.Sequence[str], binary_as_string: bool = False, <a href="#id3">*</a>, file_row_number: bool = False, filename: bool = False, hive_partitioning: bool = False, union_by_name: bool = False, compression: object = None) -&gt; _duckdb.DuckDBPyRelation</p></li>
</ol>
<p>Create a relation object from the Parquet files in file_globs</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.from_query">
from_query(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">query: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">alias: str = ''</em>, <em class="sig-param">params: object = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.from_query" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Run a SQL query. If it is a SELECT statement, create a relation object from the given SQL query, otherwise run the query as-is.</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.get_profiling_information">
get_profiling_information(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">format: str = 'json'</em>) &#8594; str<a class="headerlink" href="#duckdb.DuckDBPyConnection.get_profiling_information" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get profiling information for a query</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.get_table_names">
get_table_names(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">query: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">qualified: bool = False</em>) &#8594; set[str]<a class="headerlink" href="#duckdb.DuckDBPyConnection.get_table_names" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Extract the required table names from a query</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.install_extension">
install_extension(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">extension: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">force_install: bool = False</em>, <em class="sig-param">repository: object = None</em>, <em class="sig-param">repository_url: object = None</em>, <em class="sig-param">version: object = None</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyConnection.install_extension" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Install an extension by name, with an optional version and/or repository to get the extension from</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.interrupt">
interrupt(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyConnection.interrupt" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Interrupt pending operations</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.list_filesystems">
list_filesystems(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; list<a class="headerlink" href="#duckdb.DuckDBPyConnection.list_filesystems" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>List registered filesystems, including builtin ones</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.list_type">
list_type(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">type: _duckdb._sqltypes.DuckDBPyType</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.DuckDBPyConnection.list_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a list type object of &#8216;type&#8217;</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.load_extension">
load_extension(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">extension: str</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyConnection.load_extension" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Load an installed extension</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.map_type">
map_type(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">key: _duckdb._sqltypes.DuckDBPyType</em>, <em class="sig-param">value: _duckdb._sqltypes.DuckDBPyType</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.DuckDBPyConnection.map_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a map type object from &#8216;key_type&#8217; and &#8216;value_type&#8217;</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.pl">
pl(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">rows_per_batch: SupportsInt = 1000000</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">lazy: bool = False</em>) &#8594; duckdb::PolarsDataFrame<a class="headerlink" href="#duckdb.DuckDBPyConnection.pl" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as Polars DataFrame following execute()</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.query">
query(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">query: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">alias: str = ''</em>, <em class="sig-param">params: object = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.query" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Run a SQL query. If it is a SELECT statement, create a relation object from the given SQL query, otherwise run the query as-is.</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.query_progress">
query_progress(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; float<a class="headerlink" href="#duckdb.DuckDBPyConnection.query_progress" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Query progress of pending operation</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.read_csv">
read_csv(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">path_or_buffer: object</em>, <em class="sig-param">**kwargs</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.read_csv" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from the CSV file in &#8216;name&#8217;</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.read_json">
read_json(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">path_or_buffer: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">columns: Optional[object] = None</em>, <em class="sig-param">sample_size: Optional[object] = None</em>, <em class="sig-param">maximum_depth: Optional[object] = None</em>, <em class="sig-param">records: Optional[str] = None</em>, <em class="sig-param">format: Optional[str] = None</em>, <em class="sig-param">date_format: Optional[object] = None</em>, <em class="sig-param">timestamp_format: Optional[object] = None</em>, <em class="sig-param">compression: Optional[object] = None</em>, <em class="sig-param">maximum_object_size: Optional[object] = None</em>, <em class="sig-param">ignore_errors: Optional[object] = None</em>, <em class="sig-param">convert_strings_to_integers: Optional[object] = None</em>, <em class="sig-param">field_appearance_threshold: Optional[object] = None</em>, <em class="sig-param">map_inference_threshold: Optional[object] = None</em>, <em class="sig-param">maximum_sample_files: Optional[object] = None</em>, <em class="sig-param">filename: Optional[object] = None</em>, <em class="sig-param">hive_partitioning: Optional[object] = None</em>, <em class="sig-param">union_by_name: Optional[object] = None</em>, <em class="sig-param">hive_types: Optional[object] = None</em>, <em class="sig-param">hive_types_autocast: Optional[object] = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.read_json" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from the JSON file in &#8216;name&#8217;</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.read_parquet">
read_parquet(<em class="sig-param">*args</em>, <em class="sig-param">**kwargs</em>)<a class="headerlink" href="#duckdb.DuckDBPyConnection.read_parquet" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Overloaded function.</p>
<ol class="arabic simple">
<li><p>read_parquet(self: _duckdb.DuckDBPyConnection, file_glob: str, binary_as_string: bool = False, <a href="#id5">*</a>, file_row_number: bool = False, filename: bool = False, hive_partitioning: bool = False, union_by_name: bool = False, compression: object = None) -&gt; _duckdb.DuckDBPyRelation</p></li>
</ol>
<p>Create a relation object from the Parquet files in file_glob</p>
<ol class="arabic simple" start="2">
<li><p>read_parquet(self: _duckdb.DuckDBPyConnection, file_globs: collections.abc.Sequence[str], binary_as_string: bool = False, <a href="#id7">*</a>, file_row_number: bool = False, filename: bool = False, hive_partitioning: bool = False, union_by_name: bool = False, compression: object = None) -&gt; _duckdb.DuckDBPyRelation</p></li>
</ol>
<p>Create a relation object from the Parquet files in file_globs</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.register">
register(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">view_name: str</em>, <em class="sig-param">python_object: object</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.register" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Register the passed Python Object value for querying with a view</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.register_filesystem">
register_filesystem(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">filesystem: fsspec.AbstractFileSystem</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyConnection.register_filesystem" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Register a fsspec compliant filesystem</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.remove_function">
remove_function(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">name: str</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.remove_function" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Remove a previously created function</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.rollback">
rollback(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.rollback" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Roll back changes performed within a transaction</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.row_type">
row_type(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">fields: object</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.DuckDBPyConnection.row_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a struct type object from &#8216;fields&#8217;</p>
</dd>
</dl>

<dl class="py property">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.rowcount">
property rowcount<a class="headerlink" href="#duckdb.DuckDBPyConnection.rowcount" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get result set row count</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.sql">
sql(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">query: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">alias: str = ''</em>, <em class="sig-param">params: object = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.sql" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Run a SQL query. If it is a SELECT statement, create a relation object from the given SQL query, otherwise run the query as-is.</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.sqltype">
sqltype(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">type_str: str</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.DuckDBPyConnection.sqltype" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a type object by parsing the &#8216;type_str&#8217; string</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.string_type">
string_type(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">collation: str = ''</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.DuckDBPyConnection.string_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a string type with an optional collation</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.struct_type">
struct_type(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">fields: object</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.DuckDBPyConnection.struct_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a struct type object from &#8216;fields&#8217;</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.table">
table(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">table_name: str</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.table" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object for the named table</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.table_function">
table_function(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">name: str</em>, <em class="sig-param">parameters: object = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.table_function" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from the named table function with given parameters</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.tf">
tf(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; dict<a class="headerlink" href="#duckdb.DuckDBPyConnection.tf" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as dict of TensorFlow Tensors following execute()</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.to_arrow_reader">
to_arrow_reader(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">batch_size: SupportsInt = 1000000</em>) &#8594; <a class="reference external" href="https://arrow.apache.org/docs/9.0/python/generated/pyarrow.RecordBatchReader.html#pyarrow.RecordBatchReader" title="(in Apache Arrow v9.0.0)">pyarrow.lib.RecordBatchReader</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.to_arrow_reader" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch an Arrow RecordBatchReader following execute()</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.to_arrow_table">
to_arrow_table(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">batch_size: SupportsInt = 1000000</em>) &#8594; <a class="reference external" href="https://arrow.apache.org/docs/9.0/python/generated/pyarrow.Table.html#pyarrow.Table" title="(in Apache Arrow v9.0.0)">pyarrow.lib.Table</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.to_arrow_table" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as Arrow table following execute()</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.torch">
torch(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>) &#8594; dict<a class="headerlink" href="#duckdb.DuckDBPyConnection.torch" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as dict of PyTorch Tensors following execute()</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.type">
type(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">type_str: str</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.DuckDBPyConnection.type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a type object by parsing the &#8216;type_str&#8217; string</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.union_type">
union_type(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">members: object</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.DuckDBPyConnection.union_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a union type object from &#8216;members&#8217;</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.unregister">
unregister(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">view_name: str</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.unregister" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Unregister the view name</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.unregister_filesystem">
unregister_filesystem(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">name: str</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyConnection.unregister_filesystem" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Unregister a filesystem</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.values">
values(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">*args</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.values" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from the passed values</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyConnection.view">
view(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="_duckdb.DuckDBPyConnection">_duckdb.DuckDBPyConnection</a></em>, <em class="sig-param">view_name: str</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyConnection.view" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object for the named view</p>
</dd>
</dl>

</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation">
class duckdb.DuckDBPyRelation<a class="headerlink" href="#duckdb.DuckDBPyRelation" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">pybind11_object</code></p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html">Relational API page</a>.
<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.aggregate">
aggregate(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">aggr_expr: object</em>, <em class="sig-param">group_expr: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.aggregate" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Compute the aggregate aggr_expr by the optional groups group_expr on the relation</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#aggregate">Relational API page</a>.

</dd>
</dl>

<dl class="py attribute">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.alias">
alias<a class="headerlink" href="#duckdb.DuckDBPyRelation.alias" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get the name of the current alias</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#alias">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.any_value">
any_value(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.any_value" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Returns the first non-null value from a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#any_value">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.apply">
apply(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">function_name: str</em>, <em class="sig-param">function_aggr: str</em>, <em class="sig-param">group_expr: str = ''</em>, <em class="sig-param">function_parameter: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.apply" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Compute the function of a single column or a list of columns by the optional groups on the relation</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#apply">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.arg_max">
arg_max(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">arg_column: str</em>, <em class="sig-param">value_column: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.arg_max" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Finds the row with the maximum value for a value column and returns the value of that row for an argument column</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#arg_max">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.arg_min">
arg_min(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">arg_column: str</em>, <em class="sig-param">value_column: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.arg_min" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Finds the row with the minimum value for a value column and returns the value of that row for an argument column</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#arg_min">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.arrow">
arrow(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">batch_size: SupportsInt = 1000000</em>) &#8594; <a class="reference external" href="https://arrow.apache.org/docs/9.0/python/generated/pyarrow.RecordBatchReader.html#pyarrow.RecordBatchReader" title="(in Apache Arrow v9.0.0)">pyarrow.lib.RecordBatchReader</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.arrow" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Alias of to_arrow_reader(). We recommend using to_arrow_reader() instead.</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#arrow">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.avg">
avg(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.avg" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the average of a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#avg">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.bit_and">
bit_and(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.bit_and" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the bitwise AND of all bits present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#bit_and">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.bit_or">
bit_or(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.bit_or" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the bitwise OR of all bits present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#bit_or">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.bit_xor">
bit_xor(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.bit_xor" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the bitwise XOR of all bits present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#bit_xor">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.bitstring_agg">
bitstring_agg(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">min: Optional[object] = None</em>, <em class="sig-param">max: Optional[object] = None</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.bitstring_agg" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes a bitstring with bits set for each distinct value in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#bitstring_agg">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.bool_and">
bool_and(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.bool_and" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the logical AND of all values present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#bool_and">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.bool_or">
bool_or(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.bool_or" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the logical OR of all values present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#bool_or">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.close">
close(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyRelation.close" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Closes the result</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#close">Relational API page</a>.

</dd>
</dl>

<dl class="py attribute">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.columns">
columns<a class="headerlink" href="#duckdb.DuckDBPyRelation.columns" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Return a list containing the names of the columns of the relation.</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#columns">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.count">
count(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.count" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the number of elements present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#count">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.create">
create(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">table_name: str</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyRelation.create" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Creates a new table named table_name with the contents of the relation object</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#create">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.create_view">
create_view(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">view_name: str</em>, <em class="sig-param">replace: bool = True</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.create_view" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Creates a view named view_name that refers to the relation object</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#create_view">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.cross">
cross(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">other_rel: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.cross" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create cross/cartesian product of two relational objects</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#cross">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.cume_dist">
cume_dist(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">window_spec: str</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.cume_dist" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the cumulative distribution within the partition</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#cume_dist">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.dense_rank">
dense_rank(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">window_spec: str</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.dense_rank" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the dense rank within the partition</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#dense_rank">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.describe">
describe(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.describe" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Gives basic statistics (e.g., min, max) and if NULL exists for each column of the relation.</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#describe">Relational API page</a>.

</dd>
</dl>

<dl class="py attribute">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.description">
description<a class="headerlink" href="#duckdb.DuckDBPyRelation.description" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Return the description of the result</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#description">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.df">
df(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">date_as_object: bool = False</em>) &#8594; <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.df" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and fetch all rows as a pandas DataFrame</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#df">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.distinct">
distinct(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.distinct" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Retrieve distinct rows from this relation object</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#distinct">Relational API page</a>.

</dd>
</dl>

<dl class="py attribute">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.dtypes">
dtypes<a class="headerlink" href="#duckdb.DuckDBPyRelation.dtypes" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Return a list containing the types of the columns of the relation.</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#dtypes">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.except_">
except_(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">other_rel: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.except_" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create the set except of this relation object with another relation object in other_rel</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#except_">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.execute">
execute(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.execute" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Transform the relation into a result set</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#execute">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.explain">
explain(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">type: <a class="reference internal" href="#duckdb.ExplainType" title="_duckdb.ExplainType">_duckdb.ExplainType</a> = 'standard'</em>) &#8594; str<a class="headerlink" href="#duckdb.DuckDBPyRelation.explain" title="Link to this definition">&#182;</a>
</dt>
<dd>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#explain">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.favg">
favg(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.favg" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the average of all values present in a given expression using a more accurate floating point summation (Kahan Sum)</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#favg">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.fetch_arrow_reader">
fetch_arrow_reader(<em class="sig-param">self: object</em>, <em class="sig-param">batch_size: SupportsInt = 1000000</em>) &#8594; object<a class="headerlink" href="#duckdb.DuckDBPyRelation.fetch_arrow_reader" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and return an Arrow Record Batch Reader that yields all rows</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#fetch_arrow_reader">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.fetch_arrow_table">
fetch_arrow_table(<em class="sig-param">self: object</em>, <em class="sig-param">batch_size: SupportsInt = 1000000</em>) &#8594; object<a class="headerlink" href="#duckdb.DuckDBPyRelation.fetch_arrow_table" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and fetch all rows as an Arrow Table</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#fetch_arrow_table">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.fetch_df_chunk">
fetch_df_chunk(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">vectors_per_chunk: SupportsInt = 1</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">date_as_object: bool = False</em>) &#8594; <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.fetch_df_chunk" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and fetch a chunk of the rows</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#fetch_df_chunk">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.fetch_record_batch">
fetch_record_batch(<em class="sig-param">self: object</em>, <em class="sig-param">rows_per_batch: SupportsInt = 1000000</em>) &#8594; object<a class="headerlink" href="#duckdb.DuckDBPyRelation.fetch_record_batch" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and return an Arrow Record Batch Reader that yields all rows</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#fetch_record_batch">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.fetchall">
fetchall(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; list<a class="headerlink" href="#duckdb.DuckDBPyRelation.fetchall" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and fetch all rows as a list of tuples</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#fetchall">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.fetchdf">
fetchdf(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">date_as_object: bool = False</em>) &#8594; <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.fetchdf" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and fetch all rows as a pandas DataFrame</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#fetchdf">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.fetchmany">
fetchmany(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">size: SupportsInt = 1</em>) &#8594; list<a class="headerlink" href="#duckdb.DuckDBPyRelation.fetchmany" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and fetch the next set of rows as a list of tuples</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#fetchmany">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.fetchnumpy">
fetchnumpy(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; dict<a class="headerlink" href="#duckdb.DuckDBPyRelation.fetchnumpy" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and fetch all rows as a Python dict mapping each column to one numpy arrays</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#fetchnumpy">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.fetchone">
fetchone(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; Optional[tuple]<a class="headerlink" href="#duckdb.DuckDBPyRelation.fetchone" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and fetch a single row as a tuple</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#fetchone">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.filter">
filter(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">filter_expr: object</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.filter" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Filter the relation object by the filter in filter_expr</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#filter">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.first">
first(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.first" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Returns the first value of a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#first">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.first_value">
first_value(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.first_value" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the first value within the group or partition</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#first_value">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.fsum">
fsum(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.fsum" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the sum of all values present in a given expression using a more accurate floating point summation (Kahan Sum)</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#fsum">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.geomean">
geomean(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.geomean" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the geometric mean over all values present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#geomean">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.histogram">
histogram(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.histogram" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the histogram over all values present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#histogram">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.insert">
insert(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">values: object</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyRelation.insert" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Inserts the given values into the relation</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#insert">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.insert_into">
insert_into(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">table_name: str</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyRelation.insert_into" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Inserts the relation object into an existing table named table_name</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#insert_into">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.intersect">
intersect(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">other_rel: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.intersect" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create the set intersection of this relation object with another relation object in other_rel</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#intersect">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.join">
join(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">other_rel: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">condition: object</em>, <em class="sig-param">how: str = 'inner'</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.join" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Join the relation object with another relation object in other_rel using the join condition expression in join_condition. Types supported are &#8216;inner&#8217;, &#8216;left&#8217;, &#8216;right&#8217;, &#8216;outer&#8217;, &#8216;semi&#8217; and &#8216;anti&#8217;</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#join">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.lag">
lag(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">window_spec: str</em>, <em class="sig-param">offset: SupportsInt = 1</em>, <em class="sig-param">default_value: str = 'NULL'</em>, <em class="sig-param">ignore_nulls: bool = False</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.lag" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the lag within the partition</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#lag">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.last">
last(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.last" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Returns the last value of a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#last">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.last_value">
last_value(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.last_value" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the last value within the group or partition</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#last_value">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.lead">
lead(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">window_spec: str</em>, <em class="sig-param">offset: SupportsInt = 1</em>, <em class="sig-param">default_value: str = 'NULL'</em>, <em class="sig-param">ignore_nulls: bool = False</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.lead" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the lead within the partition</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#lead">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.limit">
limit(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">n: SupportsInt</em>, <em class="sig-param">offset: SupportsInt = 0</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.limit" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Only retrieve the first n rows from this relation object, starting at offset</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#limit">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.list">
list(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.list" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Returns a list containing all values present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#list">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.map">
map(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">map_function: collections.abc.Callable</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">schema: Optional[object] = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.map" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Calls the passed function on the relation</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#map">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.max">
max(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.max" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Returns the maximum value present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#max">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.mean">
mean(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.mean" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the average of a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#mean">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.median">
median(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.median" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the median over all values present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#median">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.min">
min(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.min" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Returns the minimum value present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#min">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.mode">
mode(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.mode" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the mode over all values present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#mode">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.n_tile">
n_tile(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">window_spec: str</em>, <em class="sig-param">num_buckets: SupportsInt</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.n_tile" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Divides the partition as equally as possible into num_buckets</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#n_tile">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.nth_value">
nth_value(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">window_spec: str</em>, <em class="sig-param">offset: SupportsInt</em>, <em class="sig-param">ignore_nulls: bool = False</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.nth_value" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the nth value within the partition</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#nth_value">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.order">
order(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">order_expr: str</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.order" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Reorder the relation object by order_expr</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#order">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.percent_rank">
percent_rank(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">window_spec: str</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.percent_rank" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the relative rank within the partition</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#percent_rank">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.pl">
pl(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">batch_size: SupportsInt = 1000000</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">lazy: bool = False</em>) &#8594; duckdb::PolarsDataFrame<a class="headerlink" href="#duckdb.DuckDBPyRelation.pl" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and fetch all rows as a Polars DataFrame</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#pl">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.product">
product(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.product" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Returns the product of all values present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#product">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.project">
project(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">*args</em>, <em class="sig-param">groups: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.project" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Project the relation object by the projection in project_expr</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#project">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.quantile">
quantile(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">q: object = 0.5</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.quantile" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the exact quantile value for a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#quantile">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.quantile_cont">
quantile_cont(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">q: object = 0.5</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.quantile_cont" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the interpolated quantile value for a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#quantile_cont">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.quantile_disc">
quantile_disc(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">q: object = 0.5</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.quantile_disc" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the exact quantile value for a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#quantile_disc">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.query">
query(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">virtual_table_name: str</em>, <em class="sig-param">sql_query: str</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.query" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Run the given SQL query in sql_query on the view named virtual_table_name that refers to the relation object</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#query">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.rank">
rank(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">window_spec: str</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.rank" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the rank within the partition</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#rank">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.rank_dense">
rank_dense(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">window_spec: str</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.rank_dense" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the dense rank within the partition</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#rank_dense">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.row_number">
row_number(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">window_spec: str</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.row_number" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the row number within the partition</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#row_number">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.select">
select(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">*args</em>, <em class="sig-param">groups: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.select" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Project the relation object by the projection in project_expr</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#select">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.select_dtypes">
select_dtypes(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">types: object</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.select_dtypes" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Select columns from the relation, by filtering based on type(s)</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#select_dtypes">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.select_types">
select_types(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">types: object</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.select_types" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Select columns from the relation, by filtering based on type(s)</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#select_types">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.set_alias">
set_alias(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">alias: str</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.set_alias" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Rename the relation object to new alias</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#set_alias">Relational API page</a>.

</dd>
</dl>

<dl class="py attribute">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.shape">
shape<a class="headerlink" href="#duckdb.DuckDBPyRelation.shape" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Tuple of # of rows, # of columns in relation.</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#shape">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.show">
show(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">max_width: Optional[SupportsInt] = None</em>, <em class="sig-param">max_rows: Optional[SupportsInt] = None</em>, <em class="sig-param">max_col_width: Optional[SupportsInt] = None</em>, <em class="sig-param">null_value: Optional[str] = None</em>, <em class="sig-param">render_mode: object = None</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyRelation.show" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Display a summary of the data</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#show">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.sort">
sort(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">*args</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.sort" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Reorder the relation object by the provided expressions</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#sort">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.sql_query">
sql_query(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; str<a class="headerlink" href="#duckdb.DuckDBPyRelation.sql_query" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get the SQL query that is equivalent to the relation</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#sql_query">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.std">
std(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.std" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the sample standard deviation for a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#std">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.stddev">
stddev(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.stddev" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the sample standard deviation for a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#stddev">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.stddev_pop">
stddev_pop(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.stddev_pop" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the population standard deviation for a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#stddev_pop">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.stddev_samp">
stddev_samp(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.stddev_samp" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the sample standard deviation for a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#stddev_samp">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.string_agg">
string_agg(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">sep: str = ','</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.string_agg" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Concatenates the values present in a given expression with a separator</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#string_agg">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.sum">
sum(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.sum" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the sum of all values present in a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#sum">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.tf">
tf(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; dict<a class="headerlink" href="#duckdb.DuckDBPyRelation.tf" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as dict of TensorFlow Tensors</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#tf">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.to_arrow_reader">
to_arrow_reader(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">batch_size: SupportsInt = 1000000</em>) &#8594; <a class="reference external" href="https://arrow.apache.org/docs/9.0/python/generated/pyarrow.RecordBatchReader.html#pyarrow.RecordBatchReader" title="(in Apache Arrow v9.0.0)">pyarrow.lib.RecordBatchReader</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.to_arrow_reader" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and return an Arrow Record Batch Reader that yields all rows</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#to_arrow_reader">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.to_arrow_table">
to_arrow_table(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">batch_size: SupportsInt = 1000000</em>) &#8594; <a class="reference external" href="https://arrow.apache.org/docs/9.0/python/generated/pyarrow.Table.html#pyarrow.Table" title="(in Apache Arrow v9.0.0)">pyarrow.lib.Table</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.to_arrow_table" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and fetch all rows as an Arrow Table</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#to_arrow_table">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.to_csv">
to_csv(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">file_name: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">sep: object = None</em>, <em class="sig-param">na_rep: object = None</em>, <em class="sig-param">header: object = None</em>, <em class="sig-param">quotechar: object = None</em>, <em class="sig-param">escapechar: object = None</em>, <em class="sig-param">date_format: object = None</em>, <em class="sig-param">timestamp_format: object = None</em>, <em class="sig-param">quoting: object = None</em>, <em class="sig-param">encoding: object = None</em>, <em class="sig-param">compression: object = None</em>, <em class="sig-param">overwrite: object = None</em>, <em class="sig-param">per_thread_output: object = None</em>, <em class="sig-param">use_tmp_file: object = None</em>, <em class="sig-param">partition_by: object = None</em>, <em class="sig-param">write_partition_columns: object = None</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyRelation.to_csv" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Write the relation object to a CSV file in &#8216;file_name&#8217;</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#to_csv">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.to_df">
to_df(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">date_as_object: bool = False</em>) &#8594; <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.to_df" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute and fetch all rows as a pandas DataFrame</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#to_df">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.to_parquet">
to_parquet(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">file_name: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">compression: object = None</em>, <em class="sig-param">field_ids: object = None</em>, <em class="sig-param">row_group_size_bytes: object = None</em>, <em class="sig-param">row_group_size: object = None</em>, <em class="sig-param">overwrite: object = None</em>, <em class="sig-param">per_thread_output: object = None</em>, <em class="sig-param">use_tmp_file: object = None</em>, <em class="sig-param">partition_by: object = None</em>, <em class="sig-param">write_partition_columns: object = None</em>, <em class="sig-param">append: object = None</em>, <em class="sig-param">filename_pattern: object = None</em>, <em class="sig-param">file_size_bytes: object = None</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyRelation.to_parquet" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Write the relation object to a Parquet file in &#8216;file_name&#8217;</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#to_parquet">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.to_table">
to_table(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">table_name: str</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyRelation.to_table" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Creates a new table named table_name with the contents of the relation object</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#to_table">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.to_view">
to_view(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">view_name: str</em>, <em class="sig-param">replace: bool = True</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.to_view" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Creates a view named view_name that refers to the relation object</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#to_view">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.torch">
torch(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; dict<a class="headerlink" href="#duckdb.DuckDBPyRelation.torch" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as dict of PyTorch Tensors</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#torch">Relational API page</a>.

</dd>
</dl>

<dl class="py attribute">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.type">
type<a class="headerlink" href="#duckdb.DuckDBPyRelation.type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get the type of the relation.</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#type">Relational API page</a>.

</dd>
</dl>

<dl class="py attribute">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.types">
types<a class="headerlink" href="#duckdb.DuckDBPyRelation.types" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Return a list containing the types of the columns of the relation.</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#types">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.union">
union(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">union_rel: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.union" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create the set union of this relation object with another relation object in other_rel</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#union">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.unique">
unique(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">unique_aggr: str</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.unique" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Returns the distinct values in a column.</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#unique">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.update">
update(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">set: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">condition: object = None</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyRelation.update" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Update the given relation with the provided expressions</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#update">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.value_counts">
value_counts(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.value_counts" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the number of elements present in a given expression, also projecting the original expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#value_counts">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.var">
var(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.var" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the sample variance for a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#var">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.var_pop">
var_pop(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.var_pop" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the population variance for a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#var_pop">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.var_samp">
var_samp(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.var_samp" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the sample variance for a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#var_samp">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.variance">
variance(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">expression: str</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">window_spec: str = ''</em>, <em class="sig-param">projected_columns: str = ''</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.DuckDBPyRelation.variance" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Computes the sample variance for a given expression</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#variance">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.write_csv">
write_csv(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">file_name: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">sep: object = None</em>, <em class="sig-param">na_rep: object = None</em>, <em class="sig-param">header: object = None</em>, <em class="sig-param">quotechar: object = None</em>, <em class="sig-param">escapechar: object = None</em>, <em class="sig-param">date_format: object = None</em>, <em class="sig-param">timestamp_format: object = None</em>, <em class="sig-param">quoting: object = None</em>, <em class="sig-param">encoding: object = None</em>, <em class="sig-param">compression: object = None</em>, <em class="sig-param">overwrite: object = None</em>, <em class="sig-param">per_thread_output: object = None</em>, <em class="sig-param">use_tmp_file: object = None</em>, <em class="sig-param">partition_by: object = None</em>, <em class="sig-param">write_partition_columns: object = None</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyRelation.write_csv" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Write the relation object to a CSV file in &#8216;file_name&#8217;</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#write_csv">Relational API page</a>.

</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.DuckDBPyRelation.write_parquet">
write_parquet(<em class="sig-param">self: <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a></em>, <em class="sig-param">file_name: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">compression: object = None</em>, <em class="sig-param">field_ids: object = None</em>, <em class="sig-param">row_group_size_bytes: object = None</em>, <em class="sig-param">row_group_size: object = None</em>, <em class="sig-param">overwrite: object = None</em>, <em class="sig-param">per_thread_output: object = None</em>, <em class="sig-param">use_tmp_file: object = None</em>, <em class="sig-param">partition_by: object = None</em>, <em class="sig-param">write_partition_columns: object = None</em>, <em class="sig-param">append: object = None</em>, <em class="sig-param">filename_pattern: object = None</em>, <em class="sig-param">file_size_bytes: object = None</em>) &#8594; None<a class="headerlink" href="#duckdb.DuckDBPyRelation.write_parquet" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Write the relation object to a Parquet file in &#8216;file_name&#8217;</p>
Detailed examples can be found at <a href="https://duckdb.org/docs/current/clients/python/relational_api.html#write_parquet">Relational API page</a>.

</dd>
</dl>

</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.Error">
class duckdb.Error<a class="headerlink" href="#duckdb.Error" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">Exception</code></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.ExpectedResultType">
class duckdb.ExpectedResultType<a class="headerlink" href="#duckdb.ExpectedResultType" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">pybind11_object</code></p>
<p>Members:</p>
<p>QUERY_RESULT</p>
<p>CHANGED_ROWS</p>
<p>NOTHING</p>
<dl class="py property">
<dt class="sig sig-object py">
ExpectedResultType.name -&gt; str
</dt>
<dd></dd>
</dl>

</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.ExplainType">
class duckdb.ExplainType<a class="headerlink" href="#duckdb.ExplainType" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">pybind11_object</code></p>
<p>Members:</p>
<p>STANDARD</p>
<p>ANALYZE</p>
<dl class="py property">
<dt class="sig sig-object py">
ExplainType.name -&gt; str
</dt>
<dd></dd>
</dl>

</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.Expression">
class duckdb.Expression<a class="headerlink" href="#duckdb.Expression" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">pybind11_object</code></p>
<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.alias">
alias(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>, <em class="sig-param">arg0: str</em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.alias" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a copy of this expression with the given alias.</p>
<dl class="simple">
<dt>Parameters:</dt>
<dd>
<p>name: The alias to use for the expression, this will affect how it can be referenced.</p>
</dd>
<dt>Returns:</dt>
<dd>
<p>Expression: self with an alias.</p>
</dd>
</dl>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.asc">
asc(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.asc" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Set the order by modifier to ASCENDING.</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.between">
between(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>, <em class="sig-param">lower: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>, <em class="sig-param">upper: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.between" title="Link to this definition">&#182;</a>
</dt>
<dd></dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.cast">
cast(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>, <em class="sig-param">type: _duckdb._sqltypes.DuckDBPyType</em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.cast" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a CastExpression to type from self</p>
<dl class="simple">
<dt>Parameters:</dt>
<dd>
<p>type: The type to cast to</p>
</dd>
<dt>Returns:</dt>
<dd>
<p>CastExpression: self::type</p>
</dd>
</dl>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.collate">
collate(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>, <em class="sig-param">collation: str</em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.collate" title="Link to this definition">&#182;</a>
</dt>
<dd></dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.desc">
desc(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.desc" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Set the order by modifier to DESCENDING.</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.get_name">
get_name(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; str<a class="headerlink" href="#duckdb.Expression.get_name" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Return the stringified version of the expression.</p>
<dl class="simple">
<dt>Returns:</dt>
<dd>
<p>str: The string representation.</p>
</dd>
</dl>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.isin">
isin(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>, <em class="sig-param">*args</em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.isin" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Return an IN expression comparing self to the input arguments.</p>
<dl class="simple">
<dt>Returns:</dt>
<dd>
<p>DuckDBPyExpression: The compare IN expression</p>
</dd>
</dl>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.isnotin">
isnotin(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>, <em class="sig-param">*args</em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.isnotin" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Return a NOT IN expression comparing self to the input arguments.</p>
<dl class="simple">
<dt>Returns:</dt>
<dd>
<p>DuckDBPyExpression: The compare NOT IN expression</p>
</dd>
</dl>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.isnotnull">
isnotnull(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.isnotnull" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a binary IS NOT NULL expression from self</p>
<dl class="simple">
<dt>Returns:</dt>
<dd>
<p>DuckDBPyExpression: self IS NOT NULL</p>
</dd>
</dl>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.isnull">
isnull(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.isnull" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a binary IS NULL expression from self</p>
<dl class="simple">
<dt>Returns:</dt>
<dd>
<p>DuckDBPyExpression: self IS NULL</p>
</dd>
</dl>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.nulls_first">
nulls_first(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.nulls_first" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Set the NULL order by modifier to NULLS FIRST.</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.nulls_last">
nulls_last(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.nulls_last" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Set the NULL order by modifier to NULLS LAST.</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.otherwise">
otherwise(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>, <em class="sig-param">value: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.otherwise" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Add an ELSE &lt;value&gt; clause to the CaseExpression.</p>
<dl class="simple">
<dt>Parameters:</dt>
<dd>
<p>value: The value to use if none of the WHEN conditions are met.</p>
</dd>
<dt>Returns:</dt>
<dd>
<p>CaseExpression: self with an ELSE clause.</p>
</dd>
</dl>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.show">
show(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; None<a class="headerlink" href="#duckdb.Expression.show" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Print the stringified version of the expression.</p>
</dd>
</dl>

<dl class="py method">
<dt class="sig sig-object py" id="duckdb.Expression.when">
when(<em class="sig-param">self: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>, <em class="sig-param">condition: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>, <em class="sig-param">value: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.Expression.when" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Add an additional WHEN &lt;condition&gt; THEN &lt;value&gt; clause to the CaseExpression.</p>
<dl class="simple">
<dt>Parameters:</dt>
<dd>
<p>condition: The condition that must be met.
value: The value to use if the condition is met.</p>
</dd>
<dt>Returns:</dt>
<dd>
<p>CaseExpression: self with an additional WHEN clause.</p>
</dd>
</dl>
</dd>
</dl>

</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.FatalException">
class duckdb.FatalException<a class="headerlink" href="#duckdb.FatalException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DatabaseError" title="_duckdb.DatabaseError"><code class="xref py py-class docutils literal notranslate">DatabaseError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.FloatValue">
class duckdb.FloatValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.FloatValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.FunctionExpression">
duckdb.FunctionExpression(<em class="sig-param">function_name: str</em>, <em class="sig-param">*args</em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.FunctionExpression" title="Link to this definition">&#182;</a>
</dt>
<dd></dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.HTTPException">
class duckdb.HTTPException<a class="headerlink" href="#duckdb.HTTPException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.IOException" title="_duckdb.IOException"><code class="xref py py-class docutils literal notranslate">IOException</code></a></p>
<p>Thrown when an error occurs in the httpfs extension, or whilst downloading an extension.</p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.HugeIntegerValue">
class duckdb.HugeIntegerValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.HugeIntegerValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.IOException">
class duckdb.IOException<a class="headerlink" href="#duckdb.IOException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.OperationalError" title="_duckdb.OperationalError"><code class="xref py py-class docutils literal notranslate">OperationalError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.IntegerValue">
class duckdb.IntegerValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.IntegerValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.IntegrityError">
class duckdb.IntegrityError<a class="headerlink" href="#duckdb.IntegrityError" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DatabaseError" title="_duckdb.DatabaseError"><code class="xref py py-class docutils literal notranslate">DatabaseError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.InternalError">
class duckdb.InternalError<a class="headerlink" href="#duckdb.InternalError" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DatabaseError" title="_duckdb.DatabaseError"><code class="xref py py-class docutils literal notranslate">DatabaseError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.InternalException">
class duckdb.InternalException<a class="headerlink" href="#duckdb.InternalException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.InternalError" title="_duckdb.InternalError"><code class="xref py py-class docutils literal notranslate">InternalError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.InterruptException">
class duckdb.InterruptException<a class="headerlink" href="#duckdb.InterruptException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DatabaseError" title="_duckdb.DatabaseError"><code class="xref py py-class docutils literal notranslate">DatabaseError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.IntervalValue">
class duckdb.IntervalValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.IntervalValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.InvalidInputException">
class duckdb.InvalidInputException<a class="headerlink" href="#duckdb.InvalidInputException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.ProgrammingError" title="_duckdb.ProgrammingError"><code class="xref py py-class docutils literal notranslate">ProgrammingError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.InvalidTypeException">
class duckdb.InvalidTypeException<a class="headerlink" href="#duckdb.InvalidTypeException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.ProgrammingError" title="_duckdb.ProgrammingError"><code class="xref py py-class docutils literal notranslate">ProgrammingError</code></a></p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.LambdaExpression">
duckdb.LambdaExpression(<em class="sig-param">lhs: object</em>, <em class="sig-param">rhs: <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a></em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.LambdaExpression" title="Link to this definition">&#182;</a>
</dt>
<dd></dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.ListValue">
class duckdb.ListValue(<em class="sig-param">object: Any</em>, <em class="sig-param">child_type: DuckDBPyType</em>)<a class="headerlink" href="#duckdb.ListValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.LongValue">
class duckdb.LongValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.LongValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.MapValue">
class duckdb.MapValue(<em class="sig-param">object: Any</em>, <em class="sig-param">key_type: DuckDBPyType</em>, <em class="sig-param">value_type: DuckDBPyType</em>)<a class="headerlink" href="#duckdb.MapValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.NotImplementedException">
class duckdb.NotImplementedException<a class="headerlink" href="#duckdb.NotImplementedException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.NotSupportedError" title="_duckdb.NotSupportedError"><code class="xref py py-class docutils literal notranslate">NotSupportedError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.NotSupportedError">
class duckdb.NotSupportedError<a class="headerlink" href="#duckdb.NotSupportedError" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DatabaseError" title="_duckdb.DatabaseError"><code class="xref py py-class docutils literal notranslate">DatabaseError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.NullValue">
class duckdb.NullValue<a class="headerlink" href="#duckdb.NullValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.OperationalError">
class duckdb.OperationalError<a class="headerlink" href="#duckdb.OperationalError" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DatabaseError" title="_duckdb.DatabaseError"><code class="xref py py-class docutils literal notranslate">DatabaseError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.OutOfMemoryException">
class duckdb.OutOfMemoryException<a class="headerlink" href="#duckdb.OutOfMemoryException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.OperationalError" title="_duckdb.OperationalError"><code class="xref py py-class docutils literal notranslate">OperationalError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.OutOfRangeException">
class duckdb.OutOfRangeException<a class="headerlink" href="#duckdb.OutOfRangeException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DataError" title="_duckdb.DataError"><code class="xref py py-class docutils literal notranslate">DataError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.ParserException">
class duckdb.ParserException<a class="headerlink" href="#duckdb.ParserException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.ProgrammingError" title="_duckdb.ProgrammingError"><code class="xref py py-class docutils literal notranslate">ProgrammingError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.PermissionException">
class duckdb.PermissionException<a class="headerlink" href="#duckdb.PermissionException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DatabaseError" title="_duckdb.DatabaseError"><code class="xref py py-class docutils literal notranslate">DatabaseError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.ProgrammingError">
class duckdb.ProgrammingError<a class="headerlink" href="#duckdb.ProgrammingError" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DatabaseError" title="_duckdb.DatabaseError"><code class="xref py py-class docutils literal notranslate">DatabaseError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.PythonExceptionHandling">
class duckdb.PythonExceptionHandling<a class="headerlink" href="#duckdb.PythonExceptionHandling" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">pybind11_object</code></p>
<p>Members:</p>
<p>DEFAULT</p>
<p>RETURN_NULL</p>
<dl class="py property">
<dt class="sig sig-object py">
PythonExceptionHandling.name -&gt; str
</dt>
<dd></dd>
</dl>

</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.RenderMode">
class duckdb.RenderMode<a class="headerlink" href="#duckdb.RenderMode" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">pybind11_object</code></p>
<p>Members:</p>
<p>ROWS</p>
<p>COLUMNS</p>
<dl class="py property">
<dt class="sig sig-object py">
RenderMode.name -&gt; str
</dt>
<dd></dd>
</dl>

</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.SQLExpression">
duckdb.SQLExpression(<em class="sig-param">expression: str</em>) &#8594; <a class="reference internal" href="#duckdb.Expression" title="_duckdb.Expression">_duckdb.Expression</a><a class="headerlink" href="#duckdb.SQLExpression" title="Link to this definition">&#182;</a>
</dt>
<dd></dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.SequenceException">
class duckdb.SequenceException<a class="headerlink" href="#duckdb.SequenceException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DatabaseError" title="_duckdb.DatabaseError"><code class="xref py py-class docutils literal notranslate">DatabaseError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.SerializationException">
class duckdb.SerializationException<a class="headerlink" href="#duckdb.SerializationException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.OperationalError" title="_duckdb.OperationalError"><code class="xref py py-class docutils literal notranslate">OperationalError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.ShortValue">
class duckdb.ShortValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.ShortValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.StarExpression">
duckdb.StarExpression(<em class="sig-param">*args</em>, <em class="sig-param">**kwargs</em>)<a class="headerlink" href="#duckdb.StarExpression" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Overloaded function.</p>
<ol class="arabic simple">
<li><p>StarExpression(<a href="#id9">*</a>, exclude: object = None) -&gt; _duckdb.Expression</p></li>
<li><p>StarExpression() -&gt; _duckdb.Expression</p></li>
</ol>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.Statement">
class duckdb.Statement<a class="headerlink" href="#duckdb.Statement" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">pybind11_object</code></p>
<dl class="py property">
<dt class="sig sig-object py" id="duckdb.Statement.expected_result_type">
property expected_result_type<a class="headerlink" href="#duckdb.Statement.expected_result_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get the expected type of result produced by this statement, actual type may vary depending on the statement.</p>
</dd>
</dl>

<dl class="py property">
<dt class="sig sig-object py" id="duckdb.Statement.named_parameters">
property named_parameters<a class="headerlink" href="#duckdb.Statement.named_parameters" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get the map of named parameters this statement has.</p>
</dd>
</dl>

<dl class="py property">
<dt class="sig sig-object py" id="duckdb.Statement.query">
property query<a class="headerlink" href="#duckdb.Statement.query" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get the query equivalent to this statement.</p>
</dd>
</dl>

<dl class="py property">
<dt class="sig sig-object py" id="duckdb.Statement.type">
property type<a class="headerlink" href="#duckdb.Statement.type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get the type of the statement.</p>
</dd>
</dl>

</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.StatementType">
class duckdb.StatementType<a class="headerlink" href="#duckdb.StatementType" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">pybind11_object</code></p>
<p>Members:</p>
<p>INVALID</p>
<p>SELECT</p>
<p>INSERT</p>
<p>UPDATE</p>
<p>CREATE</p>
<p>DELETE</p>
<p>PREPARE</p>
<p>EXECUTE</p>
<p>ALTER</p>
<p>TRANSACTION</p>
<p>COPY</p>
<p>ANALYZE</p>
<p>VARIABLE_SET</p>
<p>CREATE_FUNC</p>
<p>EXPLAIN</p>
<p>DROP</p>
<p>EXPORT</p>
<p>PRAGMA</p>
<p>VACUUM</p>
<p>CALL</p>
<p>SET</p>
<p>LOAD</p>
<p>RELATION</p>
<p>EXTENSION</p>
<p>LOGICAL_PLAN</p>
<p>ATTACH</p>
<p>DETACH</p>
<p>MULTI</p>
<p>COPY_DATABASE</p>
<p>MERGE_INTO</p>
<dl class="py property">
<dt class="sig sig-object py">
StatementType.name -&gt; str
</dt>
<dd></dd>
</dl>

</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.StringValue">
class duckdb.StringValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.StringValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.StructValue">
class duckdb.StructValue(<em class="sig-param">object: Any</em>, <em class="sig-param">children: dict[str, DuckDBPyType]</em>)<a class="headerlink" href="#duckdb.StructValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.SyntaxException">
class duckdb.SyntaxException<a class="headerlink" href="#duckdb.SyntaxException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.ProgrammingError" title="_duckdb.ProgrammingError"><code class="xref py py-class docutils literal notranslate">ProgrammingError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.TimeTimeZoneValue">
class duckdb.TimeTimeZoneValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.TimeTimeZoneValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.TimeValue">
class duckdb.TimeValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.TimeValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.TimestampMillisecondValue">
class duckdb.TimestampMillisecondValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.TimestampMillisecondValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.TimestampNanosecondValue">
class duckdb.TimestampNanosecondValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.TimestampNanosecondValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.TimestampSecondValue">
class duckdb.TimestampSecondValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.TimestampSecondValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.TimestampTimeZoneValue">
class duckdb.TimestampTimeZoneValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.TimestampTimeZoneValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.TimestampValue">
class duckdb.TimestampValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.TimestampValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.TransactionException">
class duckdb.TransactionException<a class="headerlink" href="#duckdb.TransactionException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.OperationalError" title="_duckdb.OperationalError"><code class="xref py py-class docutils literal notranslate">OperationalError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.TypeMismatchException">
class duckdb.TypeMismatchException<a class="headerlink" href="#duckdb.TypeMismatchException" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.DataError" title="_duckdb.DataError"><code class="xref py py-class docutils literal notranslate">DataError</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.UUIDValue">
class duckdb.UUIDValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.UUIDValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.UnionType">
class duckdb.UnionType(<em class="sig-param">object: Any</em>, <em class="sig-param">members: dict[str, DuckDBPyType]</em>)<a class="headerlink" href="#duckdb.UnionType" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.UnsignedBinaryValue">
class duckdb.UnsignedBinaryValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.UnsignedBinaryValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.UnsignedHugeIntegerValue">
class duckdb.UnsignedHugeIntegerValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.UnsignedHugeIntegerValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.UnsignedIntegerValue">
class duckdb.UnsignedIntegerValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.UnsignedIntegerValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.UnsignedLongValue">
class duckdb.UnsignedLongValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.UnsignedLongValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.UnsignedShortValue">
class duckdb.UnsignedShortValue(<em class="sig-param">object: Any</em>)<a class="headerlink" href="#duckdb.UnsignedShortValue" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <a class="reference internal" href="#duckdb.Value" title="duckdb.value.constant.Value"><code class="xref py py-class docutils literal notranslate">Value</code></a></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.Value">
class duckdb.Value(<em class="sig-param">object: Any</em>, <em class="sig-param">type: DuckDBPyType</em>)<a class="headerlink" href="#duckdb.Value" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">object</code></p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.Warning">
class duckdb.Warning<a class="headerlink" href="#duckdb.Warning" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">Exception</code></p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.__annotate__">
duckdb.__annotate__(<em class="sig-param">format</em>, <em class="sig-param"><abbr title="Positional-only parameter separator (PEP 570)">/</abbr></em>)<a class="headerlink" href="#duckdb.__annotate__" title="Link to this definition">&#182;</a>
</dt>
<dd></dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.aggregate">
duckdb.aggregate(<em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>, <em class="sig-param">aggr_expr: object</em>, <em class="sig-param">group_expr: str = ''</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.aggregate" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Compute the aggregate aggr_expr by the optional groups group_expr on the relation</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.alias">
duckdb.alias(<em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>, <em class="sig-param">alias: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.alias" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Rename the relation object to new alias</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.append">
duckdb.append(<em class="sig-param">table_name: str</em>, <em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">by_name: bool = False</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.append" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Append the passed DataFrame to the named table</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.array_type">
duckdb.array_type(<em class="sig-param">type: _duckdb._sqltypes.DuckDBPyType</em>, <em class="sig-param">size: SupportsInt</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.array_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create an array type object of &#8216;type&#8217;</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.arrow">
duckdb.arrow(<em class="sig-param">*args</em>, <em class="sig-param">**kwargs</em>)<a class="headerlink" href="#duckdb.arrow" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Overloaded function.</p>
<ol class="arabic simple">
<li><p>arrow(rows_per_batch: typing.SupportsInt = 1000000, <a href="#id11">*</a>, connection: duckdb.DuckDBPyConnection = None) -&gt; pyarrow.lib.RecordBatchReader</p></li>
</ol>
<p>Alias of to_arrow_reader(). We recommend using to_arrow_reader() instead.</p>
<ol class="arabic simple" start="2">
<li><p>arrow(arrow_object: object, <a href="#id13">*</a>, connection: duckdb.DuckDBPyConnection = None) -&gt; _duckdb.DuckDBPyRelation</p></li>
</ol>
<p>Create a relation object from an Arrow object</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.begin">
duckdb.begin(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.begin" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Start a new transaction</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.checkpoint">
duckdb.checkpoint(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.checkpoint" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Synchronizes data in the write-ahead log (WAL) to the database data file (no-op for in-memory connections)</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.close">
duckdb.close(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; None<a class="headerlink" href="#duckdb.close" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Close the connection</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.commit">
duckdb.commit(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.commit" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Commit changes performed within a transaction</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.connect">
duckdb.connect(<em class="sig-param">database: object = ':memory:'</em>, <em class="sig-param">read_only: bool = False</em>, <em class="sig-param">config: dict = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.connect" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a DuckDB database instance. Can take a database file name to read/write persistent data and a read_only flag if no changes are desired</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.create_function">
duckdb.create_function(<em class="sig-param">name: str</em>, <em class="sig-param">function: collections.abc.Callable</em>, <em class="sig-param">parameters: object = None</em>, <em class="sig-param">return_type: _duckdb._sqltypes.DuckDBPyType = None</em>, <em class="sig-param">*</em>, <em class="sig-param">type: _duckdb._func.PythonUDFType = &lt;PythonUDFType.NATIVE: 0&gt;</em>, <em class="sig-param">null_handling: _duckdb._func.FunctionNullHandling = &lt;FunctionNullHandling.DEFAULT: 0&gt;</em>, <em class="sig-param">exception_handling: <a class="reference internal" href="#duckdb.PythonExceptionHandling" title="_duckdb.PythonExceptionHandling">_duckdb.PythonExceptionHandling</a> = &lt;PythonExceptionHandling.DEFAULT: 0&gt;</em>, <em class="sig-param">side_effects: bool = False</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.create_function" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a DuckDB function out of the passing in Python function so it can be used in queries</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.cursor">
duckdb.cursor(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.cursor" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a duplicate of the current connection</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.decimal_type">
duckdb.decimal_type(<em class="sig-param">width: SupportsInt</em>, <em class="sig-param">scale: SupportsInt</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.decimal_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a decimal type with &#8216;width&#8217; and &#8216;scale&#8217;</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.default_connection">
duckdb.default_connection() &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.default_connection" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Retrieve the connection currently registered as the default to be used by the module</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.description">
duckdb.description(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; Optional[list]<a class="headerlink" href="#duckdb.description" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get result set attributes, mainly column names</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.df">
duckdb.df(<em class="sig-param">*args</em>, <em class="sig-param">**kwargs</em>)<a class="headerlink" href="#duckdb.df" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Overloaded function.</p>
<ol class="arabic simple">
<li><p>df(<a href="#id15">*</a>, date_as_object: bool = False, connection: duckdb.DuckDBPyConnection = None) -&gt; pandas.DataFrame</p></li>
</ol>
<p>Fetch a result as DataFrame following execute()</p>
<ol class="arabic simple" start="2">
<li><p>df(<a href="#id17">*</a>, date_as_object: bool = False, connection: duckdb.DuckDBPyConnection = None) -&gt; pandas.DataFrame</p></li>
</ol>
<p>Fetch a result as DataFrame following execute()</p>
<ol class="arabic simple" start="3">
<li><p>df(df: pandas.DataFrame, <a href="#id19">*</a>, connection: duckdb.DuckDBPyConnection = None) -&gt; _duckdb.DuckDBPyRelation</p></li>
</ol>
<p>Create a relation object from the DataFrame df</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.disable_profiling">
duckdb.disable_profiling(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; None<a class="headerlink" href="#duckdb.disable_profiling" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Disable profiling for the current connection</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.distinct">
duckdb.distinct(<em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.distinct" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Retrieve distinct rows from this relation object</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.dtype">
duckdb.dtype(<em class="sig-param">type_str: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.dtype" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a type object by parsing the &#8216;type_str&#8217; string</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.duplicate">
duckdb.duplicate(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.duplicate" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a duplicate of the current connection</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.enable_profiling">
duckdb.enable_profiling(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; None<a class="headerlink" href="#duckdb.enable_profiling" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Enable profiling for the current connection</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.enum_type">
duckdb.enum_type(<em class="sig-param">name: str</em>, <em class="sig-param">type: _duckdb._sqltypes.DuckDBPyType</em>, <em class="sig-param">values: list</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.enum_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create an enum type of underlying &#8216;type&#8217;, consisting of the list of &#8216;values&#8217;</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.execute">
duckdb.execute(<em class="sig-param">query: object</em>, <em class="sig-param">parameters: object = None</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.execute" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute the given SQL query, optionally using prepared statements with parameters set</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.executemany">
duckdb.executemany(<em class="sig-param">query: object</em>, <em class="sig-param">parameters: object = None</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.executemany" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Execute the given prepared statement multiple times using the list of parameter sets in parameters</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.extract_statements">
duckdb.extract_statements(<em class="sig-param">query: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; list<a class="headerlink" href="#duckdb.extract_statements" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Parse the query string and extract the Statement object(s) produced</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.fetch_arrow_table">
duckdb.fetch_arrow_table(<em class="sig-param">rows_per_batch: SupportsInt = 1000000</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference external" href="https://arrow.apache.org/docs/9.0/python/generated/pyarrow.Table.html#pyarrow.Table" title="(in Apache Arrow v9.0.0)">pyarrow.lib.Table</a><a class="headerlink" href="#duckdb.fetch_arrow_table" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as Arrow table following execute()</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.fetch_df">
duckdb.fetch_df(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">date_as_object: bool = False</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a><a class="headerlink" href="#duckdb.fetch_df" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as DataFrame following execute()</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.fetch_df_chunk">
duckdb.fetch_df_chunk(<em class="sig-param">vectors_per_chunk: SupportsInt = 1</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">date_as_object: bool = False</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a><a class="headerlink" href="#duckdb.fetch_df_chunk" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a chunk of the result as DataFrame following execute()</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.fetch_record_batch">
duckdb.fetch_record_batch(<em class="sig-param">rows_per_batch: SupportsInt = 1000000</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference external" href="https://arrow.apache.org/docs/9.0/python/generated/pyarrow.RecordBatchReader.html#pyarrow.RecordBatchReader" title="(in Apache Arrow v9.0.0)">pyarrow.lib.RecordBatchReader</a><a class="headerlink" href="#duckdb.fetch_record_batch" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch an Arrow RecordBatchReader following execute()</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.fetchall">
duckdb.fetchall(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; list<a class="headerlink" href="#duckdb.fetchall" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch all rows from a result following execute</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.fetchdf">
duckdb.fetchdf(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">date_as_object: bool = False</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a><a class="headerlink" href="#duckdb.fetchdf" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as DataFrame following execute()</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.fetchmany">
duckdb.fetchmany(<em class="sig-param">size: SupportsInt = 1</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; list<a class="headerlink" href="#duckdb.fetchmany" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch the next set of rows from a result following execute</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.fetchnumpy">
duckdb.fetchnumpy(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; dict<a class="headerlink" href="#duckdb.fetchnumpy" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as list of NumPy arrays following execute</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.fetchone">
duckdb.fetchone(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; Optional[tuple]<a class="headerlink" href="#duckdb.fetchone" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a single row from a result following execute</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.filesystem_is_registered">
duckdb.filesystem_is_registered(<em class="sig-param">name: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; bool<a class="headerlink" href="#duckdb.filesystem_is_registered" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Check if a filesystem with the provided name is currently registered</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.filter">
duckdb.filter(<em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>, <em class="sig-param">filter_expr: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.filter" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Filter the relation object by the filter in filter_expr</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.from_arrow">
duckdb.from_arrow(<em class="sig-param">arrow_object: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.from_arrow" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from an Arrow object</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.from_csv_auto">
duckdb.from_csv_auto(<em class="sig-param">path_or_buffer: object</em>, <em class="sig-param">**kwargs</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.from_csv_auto" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from the CSV file in &#8216;name&#8217;</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.from_df">
duckdb.from_df(<em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.from_df" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from the DataFrame in df</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.from_parquet">
duckdb.from_parquet(<em class="sig-param">*args</em>, <em class="sig-param">**kwargs</em>)<a class="headerlink" href="#duckdb.from_parquet" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Overloaded function.</p>
<ol class="arabic simple">
<li><p>from_parquet(file_glob: str, binary_as_string: bool = False, <a href="#id21">*</a>, file_row_number: bool = False, filename: bool = False, hive_partitioning: bool = False, union_by_name: bool = False, compression: object = None, connection: duckdb.DuckDBPyConnection = None) -&gt; _duckdb.DuckDBPyRelation</p></li>
</ol>
<p>Create a relation object from the Parquet files in file_glob</p>
<ol class="arabic simple" start="2">
<li><p>from_parquet(file_globs: collections.abc.Sequence[str], binary_as_string: bool = False, <a href="#id23">*</a>, file_row_number: bool = False, filename: bool = False, hive_partitioning: bool = False, union_by_name: bool = False, compression: object = None, connection: duckdb.DuckDBPyConnection = None) -&gt; _duckdb.DuckDBPyRelation</p></li>
</ol>
<p>Create a relation object from the Parquet files in file_globs</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.from_query">
duckdb.from_query(<em class="sig-param">query: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">alias: str = ''</em>, <em class="sig-param">params: object = None</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.from_query" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Run a SQL query. If it is a SELECT statement, create a relation object from the given SQL query, otherwise run the query as-is.</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.get_profiling_information">
duckdb.get_profiling_information(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">format: str = 'json'</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; str<a class="headerlink" href="#duckdb.get_profiling_information" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get profiling information from a query</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.get_table_names">
duckdb.get_table_names(<em class="sig-param">query: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">qualified: bool = False</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; set[str]<a class="headerlink" href="#duckdb.get_table_names" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Extract the required table names from a query</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.install_extension">
duckdb.install_extension(<em class="sig-param">extension: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">force_install: bool = False</em>, <em class="sig-param">repository: object = None</em>, <em class="sig-param">repository_url: object = None</em>, <em class="sig-param">version: object = None</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; None<a class="headerlink" href="#duckdb.install_extension" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Install an extension by name, with an optional version and/or repository to get the extension from</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.interrupt">
duckdb.interrupt(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; None<a class="headerlink" href="#duckdb.interrupt" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Interrupt pending operations</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.limit">
duckdb.limit(<em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>, <em class="sig-param">n: SupportsInt</em>, <em class="sig-param">offset: SupportsInt = 0</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.limit" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Only retrieve the first n rows from this relation object, starting at offset</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.list_filesystems">
duckdb.list_filesystems(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; list<a class="headerlink" href="#duckdb.list_filesystems" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>List registered filesystems, including builtin ones</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.list_type">
duckdb.list_type(<em class="sig-param">type: _duckdb._sqltypes.DuckDBPyType</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.list_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a list type object of &#8216;type&#8217;</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.load_extension">
duckdb.load_extension(<em class="sig-param">extension: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; None<a class="headerlink" href="#duckdb.load_extension" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Load an installed extension</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.map_type">
duckdb.map_type(<em class="sig-param">key: _duckdb._sqltypes.DuckDBPyType</em>, <em class="sig-param">value: _duckdb._sqltypes.DuckDBPyType</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.map_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a map type object from &#8216;key_type&#8217; and &#8216;value_type&#8217;</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.order">
duckdb.order(<em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>, <em class="sig-param">order_expr: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.order" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Reorder the relation object by order_expr</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.pl">
duckdb.pl(<em class="sig-param">rows_per_batch: SupportsInt = 1000000</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">lazy: bool = False</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; duckdb::PolarsDataFrame<a class="headerlink" href="#duckdb.pl" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as Polars DataFrame following execute()</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.project">
duckdb.project(<em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>, <em class="sig-param">*args</em>, <em class="sig-param">groups: str = ''</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.project" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Project the relation object by the projection in project_expr</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.query">
duckdb.query(<em class="sig-param">query: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">alias: str = ''</em>, <em class="sig-param">params: object = None</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.query" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Run a SQL query. If it is a SELECT statement, create a relation object from the given SQL query, otherwise run the query as-is.</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.query_df">
duckdb.query_df(<em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>, <em class="sig-param">virtual_table_name: str</em>, <em class="sig-param">sql_query: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.query_df" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Run the given SQL query in sql_query on the view named virtual_table_name that refers to the relation object</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.query_progress">
duckdb.query_progress(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; float<a class="headerlink" href="#duckdb.query_progress" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Query progress of pending operation</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.read_csv">
duckdb.read_csv(<em class="sig-param">path_or_buffer: object</em>, <em class="sig-param">**kwargs</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.read_csv" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from the CSV file in &#8216;name&#8217;</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.read_json">
duckdb.read_json(<em class="sig-param">path_or_buffer: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">columns: Optional[object] = None</em>, <em class="sig-param">sample_size: Optional[object] = None</em>, <em class="sig-param">maximum_depth: Optional[object] = None</em>, <em class="sig-param">records: Optional[str] = None</em>, <em class="sig-param">format: Optional[str] = None</em>, <em class="sig-param">date_format: Optional[object] = None</em>, <em class="sig-param">timestamp_format: Optional[object] = None</em>, <em class="sig-param">compression: Optional[object] = None</em>, <em class="sig-param">maximum_object_size: Optional[object] = None</em>, <em class="sig-param">ignore_errors: Optional[object] = None</em>, <em class="sig-param">convert_strings_to_integers: Optional[object] = None</em>, <em class="sig-param">field_appearance_threshold: Optional[object] = None</em>, <em class="sig-param">map_inference_threshold: Optional[object] = None</em>, <em class="sig-param">maximum_sample_files: Optional[object] = None</em>, <em class="sig-param">filename: Optional[object] = None</em>, <em class="sig-param">hive_partitioning: Optional[object] = None</em>, <em class="sig-param">union_by_name: Optional[object] = None</em>, <em class="sig-param">hive_types: Optional[object] = None</em>, <em class="sig-param">hive_types_autocast: Optional[object] = None</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.read_json" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from the JSON file in &#8216;name&#8217;</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.read_parquet">
duckdb.read_parquet(<em class="sig-param">*args</em>, <em class="sig-param">**kwargs</em>)<a class="headerlink" href="#duckdb.read_parquet" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Overloaded function.</p>
<ol class="arabic simple">
<li><p>read_parquet(file_glob: str, binary_as_string: bool = False, <a href="#id25">*</a>, file_row_number: bool = False, filename: bool = False, hive_partitioning: bool = False, union_by_name: bool = False, compression: object = None, connection: duckdb.DuckDBPyConnection = None) -&gt; _duckdb.DuckDBPyRelation</p></li>
</ol>
<p>Create a relation object from the Parquet files in file_glob</p>
<ol class="arabic simple" start="2">
<li><p>read_parquet(file_globs: collections.abc.Sequence[str], binary_as_string: bool = False, <a href="#id27">*</a>, file_row_number: bool = False, filename: bool = False, hive_partitioning: bool = False, union_by_name: bool = False, compression: object = None, connection: duckdb.DuckDBPyConnection = None) -&gt; _duckdb.DuckDBPyRelation</p></li>
</ol>
<p>Create a relation object from the Parquet files in file_globs</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.register">
duckdb.register(<em class="sig-param">view_name: str</em>, <em class="sig-param">python_object: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.register" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Register the passed Python Object value for querying with a view</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.register_filesystem">
duckdb.register_filesystem(<em class="sig-param">filesystem: fsspec.AbstractFileSystem</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; None<a class="headerlink" href="#duckdb.register_filesystem" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Register a fsspec compliant filesystem</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.remove_function">
duckdb.remove_function(<em class="sig-param">name: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.remove_function" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Remove a previously created function</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.rollback">
duckdb.rollback(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.rollback" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Roll back changes performed within a transaction</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.row_type">
duckdb.row_type(<em class="sig-param">fields: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.row_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a struct type object from &#8216;fields&#8217;</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.rowcount">
duckdb.rowcount(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; int<a class="headerlink" href="#duckdb.rowcount" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Get result set row count</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.set_default_connection">
duckdb.set_default_connection(<em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a></em>) &#8594; None<a class="headerlink" href="#duckdb.set_default_connection" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Register the provided connection as the default to be used by the module</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.sql">
duckdb.sql(<em class="sig-param">query: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">alias: str = ''</em>, <em class="sig-param">params: object = None</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.sql" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Run a SQL query. If it is a SELECT statement, create a relation object from the given SQL query, otherwise run the query as-is.</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.sqltype">
duckdb.sqltype(<em class="sig-param">type_str: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.sqltype" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a type object by parsing the &#8216;type_str&#8217; string</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.string_type">
duckdb.string_type(<em class="sig-param">collation: str = ''</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.string_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a string type with an optional collation</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.struct_type">
duckdb.struct_type(<em class="sig-param">fields: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.struct_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a struct type object from &#8216;fields&#8217;</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.table">
duckdb.table(<em class="sig-param">table_name: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.table" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object for the named table</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.table_function">
duckdb.table_function(<em class="sig-param">name: str</em>, <em class="sig-param">parameters: object = None</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.table_function" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from the named table function with given parameters</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.tf">
duckdb.tf(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; dict<a class="headerlink" href="#duckdb.tf" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as dict of TensorFlow Tensors following execute()</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.to_arrow_reader">
duckdb.to_arrow_reader(<em class="sig-param">batch_size: SupportsInt = 1000000</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference external" href="https://arrow.apache.org/docs/9.0/python/generated/pyarrow.RecordBatchReader.html#pyarrow.RecordBatchReader" title="(in Apache Arrow v9.0.0)">pyarrow.lib.RecordBatchReader</a><a class="headerlink" href="#duckdb.to_arrow_reader" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch an Arrow RecordBatchReader following execute()</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.to_arrow_table">
duckdb.to_arrow_table(<em class="sig-param">batch_size: SupportsInt = 1000000</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference external" href="https://arrow.apache.org/docs/9.0/python/generated/pyarrow.Table.html#pyarrow.Table" title="(in Apache Arrow v9.0.0)">pyarrow.lib.Table</a><a class="headerlink" href="#duckdb.to_arrow_table" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as Arrow table following execute()</p>
</dd>
</dl>

<dl class="py class">
<dt class="sig sig-object py" id="duckdb.token_type">
class duckdb.token_type<a class="headerlink" href="#duckdb.token_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Bases: <code class="xref py py-class docutils literal notranslate">pybind11_object</code></p>
<p>Members:</p>
<p>identifier</p>
<p>numeric_const</p>
<p>string_const</p>
<p>operator</p>
<p>keyword</p>
<p>comment</p>
<dl class="py property">
<dt class="sig sig-object py">
token_type.name -&gt; str
</dt>
<dd></dd>
</dl>

</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.tokenize">
duckdb.tokenize(<em class="sig-param">query: str</em>) &#8594; list<a class="headerlink" href="#duckdb.tokenize" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Tokenizes a SQL string, returning a list of (position, type) tuples that can be used for e.g., syntax highlighting</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.torch">
duckdb.torch(<em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; dict<a class="headerlink" href="#duckdb.torch" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Fetch a result as dict of PyTorch Tensors following execute()</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.type">
duckdb.type(<em class="sig-param">type_str: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a type object by parsing the &#8216;type_str&#8217; string</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.union_type">
duckdb.union_type(<em class="sig-param">members: object</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; _duckdb._sqltypes.DuckDBPyType<a class="headerlink" href="#duckdb.union_type" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a union type object from &#8216;members&#8217;</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.unregister">
duckdb.unregister(<em class="sig-param">view_name: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a><a class="headerlink" href="#duckdb.unregister" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Unregister the view name</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.unregister_filesystem">
duckdb.unregister_filesystem(<em class="sig-param">name: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; None<a class="headerlink" href="#duckdb.unregister_filesystem" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Unregister a filesystem</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.values">
duckdb.values(<em class="sig-param">*args</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.values" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object from the passed values</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.version">
duckdb.version() &#8594; str<a class="headerlink" href="#duckdb.version" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Human-friendly formatted version string of both the distribution package and the bundled DuckDB engine.</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.view">
duckdb.view(<em class="sig-param">view_name: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; <a class="reference internal" href="#duckdb.DuckDBPyRelation" title="_duckdb.DuckDBPyRelation">_duckdb.DuckDBPyRelation</a><a class="headerlink" href="#duckdb.view" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Create a relation object for the named view</p>
</dd>
</dl>

<dl class="py function">
<dt class="sig sig-object py" id="duckdb.write_csv">
duckdb.write_csv(<em class="sig-param">df: <a class="reference external" href="https://pandas.pydata.org/pandas-docs/version/3.0/reference/api/pandas.DataFrame.html#pandas.DataFrame" title="(in pandas v3.0)">pandas.DataFrame</a></em>, <em class="sig-param">filename: str</em>, <em class="sig-param"><abbr title="Keyword-only parameters separator (PEP 3102)">*</abbr></em>, <em class="sig-param">sep: object = None</em>, <em class="sig-param">na_rep: object = None</em>, <em class="sig-param">header: object = None</em>, <em class="sig-param">quotechar: object = None</em>, <em class="sig-param">escapechar: object = None</em>, <em class="sig-param">date_format: object = None</em>, <em class="sig-param">timestamp_format: object = None</em>, <em class="sig-param">quoting: object = None</em>, <em class="sig-param">encoding: object = None</em>, <em class="sig-param">compression: object = None</em>, <em class="sig-param">overwrite: object = None</em>, <em class="sig-param">per_thread_output: object = None</em>, <em class="sig-param">use_tmp_file: object = None</em>, <em class="sig-param">partition_by: object = None</em>, <em class="sig-param">write_partition_columns: object = None</em>, <em class="sig-param">connection: <a class="reference internal" href="#duckdb.DuckDBPyConnection" title="duckdb.DuckDBPyConnection">duckdb.DuckDBPyConnection</a> = None</em>) &#8594; None<a class="headerlink" href="#duckdb.write_csv" title="Link to this definition">&#182;</a>
</dt>
<dd>
<p>Write the relation object to a CSV file in &#8216;file_name&#8217;</p>
</dd>
</dl>

