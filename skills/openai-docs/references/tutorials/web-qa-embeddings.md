# Web QA with embeddings

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

This tutorial walks through an example of crawling a website (in this example, the OpenAI website), turning the crawled pages into embeddings using the [Embeddings API](https://developers.openai.com/api/docs/guides/embeddings), and then creating a basic search functionality that allows a user to ask questions about the embedded information. This is intended to be a starting point for more sophisticated applications that make use of custom knowledge bases.

# Getting started

Some basic knowledge of Python and GitHub is helpful for this tutorial. Before diving in, make sure to [set up an OpenAI API key](https://developers.openai.com/api/reference/overview) and walk through the [quickstart tutorial](https://developers.openai.com/api/docs/quickstart). This will give a good intuition on how to use the API to its full potential.

Use Python 3.11 or later. Create a virtual environment, install the packages used in the examples, and set `OPENAI_API_KEY` as described in the [quickstart](https://developers.openai.com/api/docs/quickstart).

```bash
python -m venv env
source env/bin/activate
python -m pip install openai pandas numpy requests beautifulsoup4 tiktoken matplotlib
```




For Ruby, use Ruby 3.3 with the `openai`, `nokogiri`, `tiktoken_ruby`, and `chunky_png` gems. The [sample dependencies](https://github.com/openai/developers-website/blob/main/src/content/platform/ruby-examples/Gemfile) list tested versions.




Set `OPENAI_API_KEY` for either language.

Copy the examples into a file or notebook for the selected language in the order shown.




For Ruby, append all snippets to one `.rb` file and run it in a directory where the script can create `text` and `processed`. Set `CRAWL_URL` to the website to crawl; it defaults to `https://example.com`. Ruby saves the scraped rows in `processed/scraped.csv`, the chunks in `processed/chunks.json`, and the completed index in `processed/embeddings.csv`. Each later step reads the preceding output.




## Setting up a web crawler

Choose a website you can crawl. Expand the steps below to collect page text for the embeddings.



### Learn how to build a web crawler





  

    Acquiring data in text form is the first step to use embeddings. This
      tutorial creates a new set of data by crawling the OpenAI website, a
      technique that you can also use for your own company or personal website.
    

  




While this crawler is written from scratch, open source packages like [`Scrapy`](https://github.com/scrapy/scrapy) can also help with these operations.

This crawler will start from the root URL passed in at the bottom of the code below, visit each page, find additional links, and visit those pages as well (as long as they have the same root domain). To begin, import the required packages, set the starting URL, and define a subclass of `HTMLParser`.

Set up the web crawler

```python
import requests
import re
import urllib.request
from bs4 import BeautifulSoup
from collections import deque
from html.parser import HTMLParser
from urllib.parse import urldefrag, urljoin, urlparse
import os

# Regex pattern to match a URL
HTTP_URL_PATTERN = r"^http[s]*://.+"

domain = "openai.com"  # <- put your domain to be crawled
full_url = "https://openai.com/"  # <- put your domain to be crawled with https or http


# Create a class to parse the HTML and get the hyperlinks
class HyperlinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        # Create a list to store the hyperlinks
        self.hyperlinks = []

    # Override the HTMLParser's handle_starttag method to get the hyperlinks
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)

        # If the tag is an anchor tag and it has an href attribute, add the href attribute to the list of hyperlinks
        if tag == "a" and "href" in attrs:
            self.hyperlinks.append(attrs["href"])
```

```ruby
require "net/http"
require "uri"
require "json"
require "digest"
require "csv"
require "fileutils"
require "nokogiri"

class HyperlinkParser
  attr_reader :hyperlinks

  def initialize
    @hyperlinks = []
  end

  def feed(html)
    @hyperlinks.concat(Nokogiri::HTML.parse(html).css("a[href]").map { |anchor| anchor["href"] })
  end
end
```


The next function takes a URL as an argument, opens the URL, and reads the HTML content. Then, it returns all the hyperlinks found on that page.

Extract links from a page

```python
# Function to get the hyperlinks from a URL
def get_hyperlinks(url):
    # Try to open the URL and read the HTML
    try:
        with urllib.request.urlopen(url, timeout=30) as response:
            # If the response is not HTML, return an empty list
            if not response.info().get("Content-Type", "").startswith("text/html"):
                return []

            # Decode the HTML
            html = response.read().decode("utf-8")
    except Exception as error:
        print(error)
        return []

    # Create the HTML Parser and then Parse the HTML to get hyperlinks
    parser = HyperlinkParser()
    parser.feed(html)

    return parser.hyperlinks
```

```ruby
def fetch_page(url, local_domain = nil)
  uri = URI.parse(url)
  raise ArgumentError, "Expected an HTTP or HTTPS URL" unless uri.is_a?(URI::HTTP)

  local_domain ||= uri.authority
  6.times do |redirect_count|
    unless uri.authority == local_domain
      raise ArgumentError, "Expected a same-domain HTTP or HTTPS URL"
    end

    response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https", open_timeout: 10, read_timeout: 10) do |http|
      http.get(uri.request_uri)
    end
    return [uri, response] unless response.is_a?(Net::HTTPRedirection)

    raise ArgumentError, "Too many redirects" if redirect_count == 5

    location = response["location"]
    raise ArgumentError, "Redirect has no location" if location.to_s.empty?

    target = URI.join(uri.to_s, location)
    unless target.is_a?(URI::HTTP) && target.authority == local_domain
      raise ArgumentError, "Expected a same-domain HTTP or HTTPS URL"
    end

    uri = target
    uri.fragment = nil
  end
end

def get_hyperlinks(url)
  uri, response = fetch_page(url)
  return [] unless response.is_a?(Net::HTTPSuccess) && response.content_type == "text/html"

  parser = HyperlinkParser.new
  parser.feed(response.body)
  parser.hyperlinks.filter_map do |link|
    next if link.empty? || link.start_with?("#")

    begin
      URI.join(uri.to_s, link).to_s
    rescue URI::InvalidURIError
      nil
    end
  end
end
```


The goal is to crawl through and index only the content that lives under the OpenAI domain. For this purpose, a function that calls the `get_hyperlinks` function but filters out any URLs that are not part of the specified domain is needed.

Keep links within the target domain

```python
# Function to get the hyperlinks from a URL that are within the same domain
def get_domain_hyperlinks(local_domain, url):
    links = set()
    for link in get_hyperlinks(url):
        if not link or link.startswith("#"):
            continue
        candidate, _ = urldefrag(urljoin(url, link))
        parsed = urlparse(candidate)
        if parsed.scheme in {"http", "https"} and parsed.netloc == local_domain:
            links.add(candidate)
    return list(links)
```

```ruby
def get_domain_hyperlinks(local_domain, url)
  get_hyperlinks(url).filter_map do |link|
    next if link.empty? || link.start_with?("#")

    begin
      candidate = URI.join(url, link)
      candidate.fragment = nil
      candidate.to_s if candidate.is_a?(URI::HTTP) && candidate.authority == local_domain
    rescue URI::InvalidURIError
      nil
    end
  end.uniq
end
```


The `crawl` function is the final step in the web scraping task setup. It keeps track of the visited URLs to avoid repeating the same page, which might be linked across multiple pages on a site. It also extracts the raw text from a page without the HTML tags, and writes the text content into a local .txt file specific to the page.

Crawl the website

```python
from hashlib import sha256


def crawl(url):
    # Parse the URL and get the domain
    parsed = urlparse(url)
    local_domain = parsed.netloc
    url = parsed._replace(path=parsed.path or "/").geturl()

    # Create a queue to store the URLs to crawl
    queue = deque([url])

    # Create a set to store the URLs that have already been seen (no duplicates)
    seen = set([url])

    # Create a directory to store the text files
    if not os.path.exists("text/"):
        os.mkdir("text/")

    if not os.path.exists("text/" + local_domain + "/"):
        os.mkdir("text/" + local_domain + "/")

    # Create a directory to store the csv files
    if not os.path.exists("processed"):
        os.mkdir("processed")

    # While the queue is not empty, continue crawling
    while queue:
        # Get the next URL from the queue
        url = queue.pop()
        print(url)  # for debugging and to see the progress

        # Save text from the url to a <url>.txt file
        parsed_page = urlparse(url)
        page_name = (local_domain + parsed_page.path).replace("/", "_")
        if parsed_page.query:
            # Parsed URL domains and paths cannot contain the fragment separator '#'.
            suffix = "#" + sha256(url.encode("utf-8")).hexdigest()
            # Keep the filename, including its extension, within 255 bytes.
            prefix_bytes = 255 - len(suffix) - len(".txt")
            name_prefix = page_name.encode("utf-8")[:prefix_bytes]
            page_name = name_prefix.decode("utf-8", errors="ignore") + suffix
        with open(
            "text/" + local_domain + "/" + page_name + ".txt",
            "w",
            encoding="UTF-8",
        ) as f:
            # Get the text from the URL using BeautifulSoup
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")

            # Get the text but remove the tags
            text = soup.get_text()

            # If the crawler gets to a page that requires JavaScript, it will stop the crawl
            if "You need to enable JavaScript to run this app." in text:
                print(
                    "Unable to parse page " + url + " due to JavaScript being required"
                )

            # Otherwise, write the text to the file in the text directory
            f.write(text)

        # Get the hyperlinks from the URL and add them to the queue
        for link in get_domain_hyperlinks(local_domain, url):
            if link not in seen:
                queue.append(link)
                seen.add(link)


crawl(full_url)
```

```ruby
def crawl(full_url)
  initial = URI.parse(full_url)
  raise ArgumentError, "Expected an HTTP or HTTPS URL" unless initial.is_a?(URI::HTTP)

  local_domain = initial.authority or raise ArgumentError, "URL has no host"
  initial.path = "/" if initial.path.to_s.empty?
  queue = [initial.to_s]
  seen = Set.new(queue)
  directory = File.join("text", local_domain)
  FileUtils.mkdir_p([directory, "processed"])
  until queue.empty?
    url = queue.pop
    uri, response = fetch_page(url, local_domain)
    next if uri.to_s != url && !seen.add?(uri.to_s)

    url = uri.to_s
    puts url

    page_name = (local_domain + uri.path).tr("/", "_")
    if uri.query
      suffix = "##{Digest::SHA256.hexdigest(url)}"
      prefix = page_name.byteslice(0, 255 - suffix.bytesize - ".txt".bytesize).to_s.scrub("")
      page_name = prefix + suffix
    end
    response.value
    text = Nokogiri::HTML.parse(response.body).text
    File.write(File.join(directory, "#{page_name}.txt"), text)
    get_domain_hyperlinks(local_domain, url).each do |link|
      queue << link if seen.add?(link)
    end
  end
end

crawl(ENV.fetch("CRAWL_URL", "https://example.com"))
```


The last line of the above example runs the crawler which goes through all the accessible links and turns those pages into text files. This will take a few minutes to run depending on the size and complexity of your site.





## Building an embeddings index



  

    CSV is a common format for storing embeddings. You can use this format
      with Python by converting the raw text files (which are in the text
      directory) into Pandas data frames. Pandas is a popular open source
      library that helps you work with tabular data (data stored in rows and
      columns).
    

    

      Blank empty lines can clutter the text files and make them harder to
      process. A function can remove those lines and tidy up the files.
    

  




Clean the scraped text

```python
def remove_newlines(serie):
    serie = serie.str.replace("\n", " ")
    serie = serie.str.replace("\\n", " ")
    serie = serie.str.replace("  ", " ")
    serie = serie.str.replace("  ", " ")
    return serie
```

```ruby
def remove_newlines(texts)
  texts.map { |text| text.tr("\n", " ").gsub('\n', " ").gsub("  ", " ").gsub("  ", " ") }
end
```


Converting the text to CSV requires looping through the text files in the text directory created earlier. After opening each file, remove the extra spacing and append the modified text to a list. Then, add the text with the new lines removed to an empty Pandas data frame and write the data frame to a CSV file.

Extra spacing and new lines can clutter the text and complicate the embeddings
  process. The code used here helps to remove some of them but you may find 3rd
  party libraries or other methods useful to get rid of more unnecessary
  characters.

Save scraped pages as a dataset

```python
from pathlib import Path

import pandas as pd

# Create a list to store the text files
texts = []

# Get all the text files in the text directory
for file in os.listdir("text/" + domain + "/"):
    # Open the file and read the text
    with open("text/" + domain + "/" + file, "r", encoding="UTF-8") as f:
        text = f.read()

        page_name = Path(file).stem
        domain_prefix = f"{domain}_"
        if page_name.startswith(domain_prefix):
            page_name = page_name[len(domain_prefix) :]
        elif page_name == domain:
            page_name = "index"

        # Replace -, _, and #update with spaces.
        texts.append(
            (
                page_name.replace("-", " ").replace("_", " ").replace("#update", ""),
                text,
            )
        )

# Create a dataframe from the list of texts
df = pd.DataFrame(texts, columns=["fname", "text"])

# Set the text column to be the raw text with the newlines removed
df["text"] = df.fname + ". " + remove_newlines(df.text)
df.to_csv("processed/scraped.csv")
df.head()
```

```ruby
require "csv"
require "fileutils"

require "uri"

initial = URI.parse(ENV.fetch("CRAWL_URL", "https://example.com"))
raise ArgumentError, "Expected an HTTP or HTTPS URL" unless initial.is_a?(URI::HTTP)

local_domain = initial.authority or raise ArgumentError, "URL has no host"
directory = File.join("text", local_domain)
FileUtils.mkdir_p("processed")

def remove_newlines(texts)
  texts.map { |text| text.tr("\n", " ").gsub('\n', " ").gsub("  ", " ").gsub("  ", " ") }
end

rows = Dir.children(directory).sort.map do |file|
  page_name = File.basename(file, ".txt")
  page_name = [local_domain, "#{local_domain}_"].include?(page_name) ? "index" : page_name.delete_prefix("#{local_domain}_")
  title = page_name.tr("-_", "  ").gsub("#update", "")
  text = remove_newlines([File.read(File.join(directory, file))]).fetch(0)
  {
    "fname" => title,
    "text" => "#{title}. #{text}"
  }
end
CSV.open("processed/scraped.csv", "w") do |csv|
  csv << ["fname", "text"]
  rows.each { |row| csv << row.values_at("fname", "text") }
end
```


The next step is tokenization after saving the raw text into a CSV file. This process splits the input text into tokens by breaking down the sentences and words. A visual demonstration of this can be seen by [checking out our tokenizer](https://platform.openai.com/tokenizer) in the docs.

> A helpful rule of thumb is that one token generally corresponds to ~4 characters of text for common English text. This translates to roughly ¾ of a word (so 100 tokens ~= 75 words).

The API has a limit on the maximum number of input tokens for embeddings. To stay below the limit, the text in the CSV file needs to be broken down into multiple rows. The existing length of each row will be recorded first to identify which rows need to be split.

Count tokens in scraped pages

```python
import tiktoken

# Load the cl100k_base tokenizer which is designed to work with the ada-002 model
tokenizer = tiktoken.get_encoding("cl100k_base")

df = pd.read_csv("processed/scraped.csv", index_col=0)
df.columns = ["title", "text"]

# Tokenize the text and save the number of tokens to a new column
df["n_tokens"] = df.text.apply(lambda x: len(tokenizer.encode(x)))

# Visualize the distribution of the number of tokens per row using a histogram
df.n_tokens.hist()
```

```ruby
require "csv"
require "tiktoken_ruby"
require "chunky_png"

tokenizer = Tiktoken.get_encoding("cl100k_base")
rows = CSV.read("processed/scraped.csv", headers: true)
counts = rows.map { |row| tokenizer.encode(row.fetch("text")).length }
histogram = counts.tally
plot = ChunkyPNG::Image.new(600, 400, ChunkyPNG::Color::WHITE)
maximum = histogram.values.max || 1
histogram.sort.each_with_index do |(_token_count, frequency), index|
  left = 20 + index * 560 / histogram.size
  right = 20 + (index + 1) * 560 / histogram.size - 1
  top = 380 - frequency * 360 / maximum
  plot.rect(left, top, right, 380, ChunkyPNG::Color::BLACK, ChunkyPNG::Color.from_hex("#006400"))
end
plot.save("token-histogram.png")
```




  

    <img src="https://cdn.openai.com/API/docs/images/tutorials/web-qa/embeddings-initial-histrogram.png"
      alt="Embeddings histogram"
      width="553"
      height="413"
    />
  




Split longer pages into chunks that fit within the [embedding model’s input limit](https://developers.openai.com/api/docs/models/text-embedding-3-small).

Split long pages into chunks

```python
max_tokens = 500


# Function to split the text into chunks of a maximum number of tokens
def split_into_many(text, max_tokens=max_tokens):
    if max_tokens < 1:
        raise ValueError("max_tokens must be positive.")
    if not text.strip():
        return []

    sentences = text.split(". ")
    chunks = []
    chunk = ""
    for index, sentence in enumerate(sentences):
        if index < len(sentences) - 1:
            sentence += "."
        # Do not silently discard a sentence that needs finer-grained splitting.
        if len(tokenizer.encode(sentence)) > max_tokens:
            raise ValueError("A sentence exceeds max_tokens; split it before chunking.")

        candidate = f"{chunk} {sentence}" if chunk else sentence
        if len(tokenizer.encode(candidate)) > max_tokens:
            chunks.append(chunk)
            chunk = sentence
        else:
            chunk = candidate

    if chunk:
        chunks.append(chunk)
    return chunks


shortened = []

# Loop through the dataframe
for row in df.iterrows():
    # If the text is None, go to the next row
    if row[1]["text"] is None:
        continue

    # If the number of tokens is greater than the max number of tokens, split the text into chunks
    if row[1]["n_tokens"] > max_tokens:
        shortened += split_into_many(row[1]["text"])

    # Otherwise, add the text to the list of shortened texts
    else:
        shortened.append(row[1]["text"])
```

```ruby
require "csv"
require "json"
require "tiktoken_ruby"

TOKENIZER = Tiktoken.get_encoding("cl100k_base")
def split_into_many(text, max_tokens = 500)
  raise ArgumentError, "text must be a string" unless text.is_a?(String)
  raise ArgumentError, "max_tokens must be a positive integer" unless max_tokens.is_a?(Integer) && max_tokens.positive?
  return [] if text.strip.empty?

  sentences = text.split(". ", -1)
  chunks = []
  chunk = ""
  sentences.each_with_index do |sentence, index|
    sentence += "." if index < sentences.length - 1
    if TOKENIZER.encode(sentence).length > max_tokens
      raise ArgumentError, "A sentence exceeds max_tokens; split it before chunking"
    end

    candidate = chunk.empty? ? sentence : "#{chunk} #{sentence}"
    if TOKENIZER.encode(candidate).length > max_tokens
      chunks << chunk
      chunk = sentence
    else
      chunk = candidate
    end
  end
  chunks << chunk unless chunk.empty?
  chunks
end

rows = CSV.read("processed/scraped.csv", headers: true)
texts = rows.map { |row| row.fetch("text") }
shortened = texts.compact.flat_map { |text| split_into_many(text) }
File.write("processed/chunks.json", JSON.generate(shortened))
```


Visualizing the updated histogram again can help to confirm if the rows were successfully split into shortened sections.

Visualize token counts after splitting

```python
df = pd.DataFrame(shortened, columns=["text"])
df["n_tokens"] = df.text.apply(lambda x: len(tokenizer.encode(x)))
df.n_tokens.hist()
```

```ruby
require "json"
require "tiktoken_ruby"
require "chunky_png"

tokenizer = Tiktoken.get_encoding("cl100k_base")
shortened = JSON.parse(File.read("processed/chunks.json"))
counts = shortened.map { |text| tokenizer.encode(text).length }
histogram = counts.tally
plot = ChunkyPNG::Image.new(600, 400, ChunkyPNG::Color::WHITE)
maximum = histogram.values.max || 1
histogram.sort.each_with_index do |(_token_count, frequency), index|
  left = 20 + index * 560 / histogram.size
  right = 20 + (index + 1) * 560 / histogram.size - 1
  top = 380 - frequency * 360 / maximum
  plot.rect(left, top, right, 380, ChunkyPNG::Color::BLACK, ChunkyPNG::Color.from_hex("#006400"))
end
plot.save("token-histogram.png")
```




  

    <img src="https://cdn.openai.com/API/docs/images/tutorials/web-qa/embeddings-tokenized-output.png"
      alt="Embeddings tokenized output"
      width="552"
      height="418"
    />
  




Create an embedding for each chunk with `text-embedding-3-small`. Use the same model for query embeddings. If you change embedding models, rebuild the index before searching it.

Create embeddings for the scraped text

```python
from openai import OpenAI

client = OpenAI()

df["embeddings"] = df.text.apply(
    lambda x: client.embeddings.create(
        input=x, model="text-embedding-3-small"
    ).data[0].embedding
)

df.to_csv("processed/embeddings.csv")
df.head()
```

```ruby
require "openai"
require "csv"
require "json"
require "fileutils"

shortened = JSON.parse(File.read("processed/chunks.json"))
client = OpenAI::Client.new
rows = shortened.map do |text|
  response = client.embeddings.create(input: text, model: "text-embedding-3-small")
  [text, response.usage.prompt_tokens, JSON.generate(response.data.fetch(0).embedding)]
end
FileUtils.mkdir_p("processed")
CSV.open("processed/embeddings.csv", "w") do |csv|
  csv << ["text", "n_tokens", "embeddings"]
  rows.each { |row| csv << row }
end
```


This should take about 3-5 minutes but after you will have your embeddings ready to use!

## Building a question answer system with your embeddings



  

    Embed the user's question and compare it with the indexed chunks to find
      the most relevant text. Send that text and the question to the Responses
      API to generate an answer.
    

  




---

Turning the embeddings into a NumPy array is the first step, which will provide more flexibility in how to use it given the many functions available that operate on NumPy arrays. It will also flatten the dimension to 1-D, which is the required format for many subsequent operations.

Load the saved embeddings

```python
from ast import literal_eval
import numpy as np

df = pd.read_csv("processed/embeddings.csv", index_col=0)
df["embeddings"] = df["embeddings"].apply(literal_eval).apply(np.array)

df.head()
```

```ruby
require "csv"
require "json"

path = "processed/embeddings.csv"
rows = CSV.read(path, headers: true).map do |row|
  row.to_h.merge("embeddings" => JSON.parse(row.fetch("embeddings")))
end
```


Embed the question using the same model you used to build the index. The example computes cosine distances with NumPy and retrieves the closest text chunks.

Build context for a question

```python
def distances_from_embeddings(query, embeddings, distance_metric="cosine"):
    if distance_metric != "cosine":
        raise ValueError("This example supports cosine distance only.")
    return [
        1 - float(np.dot(query, item) / (np.linalg.norm(query) * np.linalg.norm(item)))
        for item in embeddings
    ]

def create_context(question, df, max_len=1800):
    """
    Create a context for a question by finding the most similar context from the dataframe
    """

    # Get the embeddings for the question
    q_embeddings = (
        client.embeddings.create(input=question, model="text-embedding-3-small")
        .data[0]
        .embedding
    )

    # Get the distances from the embeddings
    df["distances"] = distances_from_embeddings(
        q_embeddings, df["embeddings"].values, distance_metric="cosine"
    )

    returns = []
    cur_len = 0

    # Sort by distance and add the text to the context until the context is too long
    for _, row in df.sort_values("distances", ascending=True).iterrows():
        # Add the length of the text to the current length
        cur_len += row["n_tokens"] + 4

        # If the context is too long, break
        if cur_len > max_len:
            break

        # Else add it to the text that is being returned
        returns.append(row["text"])

    # Return the context
    return "\n\n###\n\n".join(returns)
```

```ruby
require "openai"
require "csv"
require "json"

def cosine_distance(query, vector)
  raise ArgumentError, "Embedding dimensions differ" unless query.length == vector.length

  dot = query.zip(vector).sum { |a, b| a * b }
  norm = Math.sqrt(query.sum { |x| x * x } * vector.sum { |x| x * x })
  raise ArgumentError, "Embedding must have a nonzero norm" unless norm.positive?

  1.0 - dot / norm
end

def create_context(client, question, rows, max_len: 1800)
  embedding = client.embeddings.create(input: question, model: "text-embedding-3-small").data.fetch(0).embedding
  ranked = rows.sort_by { |row| cosine_distance(embedding, row.fetch("embeddings")) }
  length = 0
  context = []
  ranked.each do |row|
    length += Integer(row.fetch("n_tokens")) + 4
    break if length > max_len

    context << row.fetch("text")
  end
  context.join("\n\n###\n\n")
end
```


The `max_len` argument limits how many tokens of retrieved text to include. Pass that text and the question to the [Responses API](https://developers.openai.com/api/reference/resources/responses/methods/create) using `gpt-6-luna`. Read the answer from `response.output_text`.

Answer a question from the website

```python
def answer_question(df, question, max_len=1800):
    context = create_context(question, df, max_len=max_len)
    response = client.responses.create(
        model="gpt-6-luna",
        instructions=(
            "Answer the question using only the supplied context. "
            "If the context doesn't answer the question, say \"I don't know.\""
        ),
        input=f"Context: {context}\n\nQuestion: {question}",
    )
    return response.output_text.strip()
```

```ruby
def answer_question(client, rows, question, max_len: 1800)
  context = create_context(client, question, rows, max_len: max_len)
  response = client.responses.create(
    model: "gpt-6-luna",
    instructions: "Answer the question using only the supplied context. " \
                  "If the context doesn't answer the question, say \"I don't know.\"",
    input: "Context: #{context}\n\nQuestion: #{question}"
  )
  response.output_text.strip
end
```


Ask a question the indexed pages can answer, then ask one they cannot. If the index contains a description of ChatGPT, the first call should answer from it. The second should return “I don't know.”

Try example questions

```python
print(answer_question(df, "What is ChatGPT?"))
print(answer_question(df, "What did I have for breakfast today?"))
```

```ruby
client = OpenAI::Client.new
rows = CSV.read("processed/embeddings.csv", headers: true).map do |row|
  row.to_h.merge("embeddings" => JSON.parse(row.fetch("embeddings")))
end
puts answer_question(client, rows, "What is ChatGPT?")
puts answer_question(client, rows, "What did I have for breakfast today?")
```


If the system is not able to answer a question that is expected, it is worth searching through the raw text files to see if the information that is expected to be known actually ended up being embedded or not. The crawling process that was done initially was setup to skip sites outside the original domain that was provided, so it might not have that knowledge if there was a subdomain setup.

Currently, the data frame is being passed in each time to answer a question. For more production workflows, a [vector database solution](https://developers.openai.com/api/docs/guides/embeddings#how-can-i-retrieve-k-nearest-embedding-vectors-quickly) should be used instead of storing the embeddings in a CSV file, but the current approach is a great option for prototyping.