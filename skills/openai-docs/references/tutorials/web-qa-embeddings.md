# Web QA with embeddings

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

This tutorial walks through an example of crawling a website (in this example, the OpenAI website), turning the crawled pages into embeddings using the [Embeddings API](https://developers.openai.com/api/docs/guides/embeddings), and then creating a basic search functionality that allows a user to ask questions about the embedded information. This is intended to be a starting point for more sophisticated applications that make use of custom knowledge bases.

# Getting started

Before starting, [set up an OpenAI API key](https://developers.openai.com/api/reference/overview) and work through the [quickstart tutorial](https://developers.openai.com/api/docs/quickstart).




Create a virtual environment and install the packages:

```bash
python -m venv env
source env/bin/activate
python -m pip install openai pandas numpy requests beautifulsoup4 tiktoken matplotlib
```

Copy the Python examples into a file or notebook in the order shown.







Download and extract the [TypeScript sample archive](https://developers.openai.com/api/docs/samples/typescript.tar.gz). From the extracted `typescript-examples` directory, run `pnpm install --ignore-workspace --frozen-lockfile`. The lockfile pins OpenAI, Cheerio, CSV, tokenizer, and canvas dependencies. Set `OPENAI_API_KEY` before the API steps.

Run each complete program separately from the same working directory with `node --experimental-strip-types tutorial-crawl-website-embeddings/<filename>.ts`. Do not concatenate the excerpts: each file includes its own imports and setup. Run `crawl-website`, `build-scraped-dataframe`, `tokenize-scraped-text`, `split-long-text`, `visualize-chunk-token-counts`, `create-embeddings`, and `answer-question` in that order. The hyperlink helpers share one program; context retrieval, answering, and test questions share `answer-question.ts`.

Replace `https://example.com` with your website's URL in the crawler, hyperlink, and scraped-data programs. Replace `{{MODEL}}` in the downloaded answering program with the model shown below. The crawler saves text under `text`; later stages produce `processed/scraped.csv`, `processed/chunks.json`, and `processed/embeddings.csv`. Run `create-embeddings` before answering questions; the package's synthetic CSV fixtures are only for local analysis tests.







The Go examples use `github.com/openai/openai-go/v3`, `github.com/tiktoken-go/tokenizer`, and `golang.org/x/net/html`. Use the complete programs in the [Go tutorial sample directory](https://github.com/openai/developers-website/tree/main/src/content/platform/go-examples/tutorial-crawl-website-embeddings). When running downloaded source files, replace `{{MODEL}}` with the model shown in the rendered example. Run each workflow step separately from the same working directory; don't concatenate their `main` functions. The hyperlink helpers share one program, and context retrieval, answering, and test questions share another.

Replace `https://example.com` with your website's URL in the crawler, hyperlink, and scraped-data programs. Set `OPENAI_API_KEY` before the API steps. The Go crawler follows same-domain redirects and writes files under `text`; subsequent programs read and write `processed/scraped.csv`, `processed/chunks.json`, and `processed/embeddings.csv` in order. The histogram steps write `token-histogram.png` locally.







For Ruby, install the `openai`, `nokogiri`, `tiktoken_ruby`, and `chunky_png` gems. The [sample dependencies](https://developers.openai.com/api/docs/samples/ruby-Gemfile) list tested versions.




Set `OPENAI_API_KEY` before running examples in your selected language.




For Ruby, append all snippets to one `.rb` file and run it in a directory where the script can create `text` and `processed`. Set `CRAWL_URL` to the website to crawl; it defaults to `https://example.com`. Ruby saves the scraped rows in `processed/scraped.csv`, the chunks in `processed/chunks.json`, and the completed index in `processed/embeddings.csv`. Each later step reads the preceding output.




For Java, use these tested Maven dependencies: `com.openai:openai-java:4.105.0`, `org.jsoup:jsoup:1.24.1`, `org.apache.commons:commons-csv:1.14.1`, `com.knuddels:jtokkit:1.1.0`, and `com.fasterxml.jackson.core:jackson-databind:2.18.11`. Use one Java class for the four crawler excerpts, one class for the three final question-answering excerpts, and a separate class for each intermediate example. In each Java file, put imports at the top, place executable statements in a `main` method that declares checked exceptions, and place helper methods, fields, and records at class scope. Set `OPENAI_API_KEY` and run the classes in order from your IDE or build tool, with the Maven dependencies on the runtime classpath. Use the same working directory so each program can read the preceding program’s `text/` and `processed/` outputs.

## Setting up a web crawler

Choose a website you can crawl. Expand the steps below to collect page text for the embeddings.



### Learn how to build a web crawler





  

    Acquiring data in text form is the first step to use embeddings. This
      tutorial creates a new set of data by crawling the OpenAI website, a
      technique that you can also use for your own company or personal website.
    

  




While this crawler is written from scratch, open source packages like [`Scrapy`](https://github.com/scrapy/scrapy) can also help with these operations.

This crawler will start from the root URL passed in at the bottom of the code below, visit each page, find additional links, and visit those pages as well (as long as they have the same root domain). To begin, import the required packages and set the starting URL. Python uses an `HTMLParser` subclass; Java uses `jsoup`. Combine the four Java excerpts in this section into the same crawler class.

Set up the web crawler

```typescript
import { load } from "cheerio";

function getHTMLHyperlinks(html: string): string[] {
  const document = load(html);
  return document("a[href]")
    .map((_, node) => document(node).attr("href")!)
    .get();
}
```

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

```go
package main

import (
	"encoding/json"
	"fmt"
	"golang.org/x/net/html"
	"io"
	"os"
	"strings"
)

func parseHTML(body io.Reader) ([]string, string, error) {
	document, err := html.Parse(body)
	if err != nil {
		return nil, "", err
	}
	links := []string{}
	var text strings.Builder
	var visit func(*html.Node)
	visit = func(node *html.Node) {
		if node.Type == html.ElementNode && (node.Data == "script" || node.Data == "style") {
			return
		}
		if node.Type == html.TextNode {
			text.WriteString(node.Data)
		}
		if node.Type == html.ElementNode && node.Data == "a" {
			for _, attribute := range node.Attr {
				if attribute.Key == "href" {
					links = append(links, attribute.Val)
				}
			}
		}
		for child := node.FirstChild; child != nil; child = child.NextSibling {
			visit(child)
		}
	}
	visit(document)
	return links, text.String(), nil
}

func main() {
	links, _, err := parseHTML(os.Stdin)
	if err == nil {
		err = json.NewEncoder(os.Stdout).Encode(links)
	}
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
```

```java
static final HttpClient HTTP =
    HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(10))
        .followRedirects(HttpClient.Redirect.NEVER)
        .build();

static List<String> hyperlinks(String html) {
  return Jsoup.parse(html).select("a[href]").stream().map(link -> link.attr("href")).toList();
}
```

```csharp
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using HtmlAgilityPack;

// Paste the four C# steps into Program.cs in a .NET 10 console project.
// Add the parser with: dotnet add package HtmlAgilityPack --version 1.11.71

const int MaxPages = 100;
const int MaxRedirects = 5;
const int MaxPageBytes = 1_048_576;
const int MaxLinksPerPage = 2_000;

// Redirects are checked before sending another request. TLS uses normal OS trust.
static HttpClient CreateClient() => new(new HttpClientHandler
{
    AllowAutoRedirect = false,
    UseCookies = false,
    AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
})
{
    Timeout = TimeSpan.FromSeconds(10)
};
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

```typescript
import { load } from "cheerio";

function parseHTML(html: string): { links: string[]; text: string } {
  const document = load(html);
  document("script, style").remove();
  return {
    links: document("a[href]")
      .map((_, node) => document(node).attr("href")!)
      .get(),
    text: document.root().text(),
  };
}

function validURL(url: URL): boolean {
  return (
    ["http:", "https:"].includes(url.protocol) && !url.username && !url.password
  );
}

async function fetchPage(address: string, domain: string) {
  let url = new URL(address);
  const signal = AbortSignal.timeout(10_000);
  for (let redirects = 0; ; redirects++) {
    if (!validURL(url) || url.host !== domain) {
      throw new Error("Expected a same-domain HTTP or HTTPS URL");
    }
    url.hash = "";
    const response = await fetch(url, { redirect: "manual", signal });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      await response.body?.cancel();
      const location = response.headers.get("location");
      if (!location) return null;
      if (redirects >= 5) throw new Error("Too many redirects");
      url = new URL(location, url);
      continue;
    }
    if (
      !response.ok ||
      response.headers
        .get("content-type")
        ?.split(";")[0]
        .trim()
        .toLowerCase() !== "text/html"
    ) {
      await response.body?.cancel();
      return null;
    }
    const reader = response.body?.getReader();
    if (!reader) return null;
    const buffers: Uint8Array[] = [];
    let bytes = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.length;
        if (bytes > 8 * 1024 * 1024) throw new Error("HTML page exceeds 8 MiB");
        buffers.push(value);
      }
    } finally {
      await reader.cancel();
    }
    return { url, ...parseHTML(Buffer.concat(buffers).toString("utf8")) };
  }
}

async function getHyperlinks(address: string): Promise<string[]> {
  const page = await fetchPage(address, new URL(address).host);
  if (!page) return [];
  return page.links.flatMap((link) => {
    if (!link || link.startsWith("#")) return [];
    try {
      return [new URL(link, page.url).href];
    } catch {
      return [];
    }
  });
}
```

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

```go
func parseHTML(body io.Reader) ([]string, string, error) {
	document, err := html.Parse(body)
	if err != nil {
		return nil, "", err
	}
	links := []string{}
	var text strings.Builder
	var visit func(*html.Node)
	visit = func(node *html.Node) {
		if node.Type == html.ElementNode && (node.Data == "script" || node.Data == "style") {
			return
		}
		if node.Type == html.TextNode {
			text.WriteString(node.Data)
		}
		if node.Type == html.ElementNode && node.Data == "a" {
			for _, attribute := range node.Attr {
				if attribute.Key == "href" {
					links = append(links, attribute.Val)
				}
			}
		}
		for child := node.FirstChild; child != nil; child = child.NextSibling {
			visit(child)
		}
	}
	visit(document)
	return links, text.String(), nil
}
func validURL(value *url.URL) bool {
	return (value.Scheme == "http" || value.Scheme == "https") && value.Host != "" && value.User == nil
}
func fetchPage(ctx context.Context, address, domain string) (*url.URL, []string, string, error) {
	initial, err := url.Parse(address)
	if err != nil {
		return nil, nil, "", err
	}
	if !validURL(initial) || initial.Host != domain {
		return nil, nil, "", fmt.Errorf("expected a same-domain HTTP or HTTPS URL")
	}
	client := &http.Client{Timeout: 10 * time.Second, CheckRedirect: func(request *http.Request, via []*http.Request) error {
		if !validURL(request.URL) || request.URL.Host != domain {
			return fmt.Errorf("expected a same-domain HTTP or HTTPS URL")
		}
		if len(via) > 5 {
			return fmt.Errorf("Too many redirects")
		}
		request.URL.Fragment = ""
		return nil
	}}
	request, err := http.NewRequestWithContext(ctx, http.MethodGet, initial.String(), nil)
	if err != nil {
		return nil, nil, "", err
	}
	response, err := client.Do(request)
	if err != nil {
		return nil, nil, "", err
	}
	defer response.Body.Close()
	mediaType, _, _ := mime.ParseMediaType(response.Header.Get("Content-Type"))
	if response.StatusCode < 200 || response.StatusCode >= 300 || mediaType != "text/html" {
		// A nil final URL marks an HTTP error or non-HTML response to skip.
		return nil, nil, "", nil
	}
	// Bound each downloaded page before parsing it.
	body, err := io.ReadAll(io.LimitReader(response.Body, (8<<20)+1))
	if err != nil {
		return nil, nil, "", err
	}
	if len(body) > 8<<20 {
		return nil, nil, "", fmt.Errorf("HTML page exceeds 8 MiB")
	}
	links, text, err := parseHTML(bytes.NewReader(body))
	return response.Request.URL, links, text, err
}
func getHyperlinks(ctx context.Context, address string) ([]string, error) {
	initial, err := url.Parse(address)
	if err != nil {
		return nil, err
	}
	final, links, _, err := fetchPage(ctx, address, initial.Host)
	if err != nil {
		return nil, err
	}
	if final == nil {
		return []string{}, nil
	}
	resolved := []string{}
	for _, link := range links {
		if link == "" || strings.HasPrefix(link, "#") {
			continue
		}
		relative, err := url.Parse(link)
		if err != nil {
			continue
		}
		resolved = append(resolved, final.ResolveReference(relative).String())
	}
	return resolved, nil
}
```

```java
static List<String> getHyperlinks(URI url) throws Exception {
  var response =
      HTTP.send(
          HttpRequest.newBuilder(url).timeout(Duration.ofSeconds(10)).GET().build(),
          HttpResponse.BodyHandlers.ofString());
  if (response.statusCode() != 200
      || !response.headers().firstValue("content-type").orElse("").startsWith("text/html"))
    return List.of();
  return hyperlinks(response.body());
}
```

```csharp
static async Task<IReadOnlyList<string>> GetHyperlinksAsync(
    HttpClient client, Uri url, HtmlDocument? fetchedDocument = null)
{
    // Reuse the already fetched HTML when calling this helper from a crawl.
    if (fetchedDocument is not null) return Hyperlinks(fetchedDocument);
    HtmlPage? page = await FetchHtmlAsync(client, url, url);
    return page is null ? [] : Hyperlinks(page.Document);
}

static string[] Hyperlinks(HtmlDocument document) =>
    document.DocumentNode.Descendants("a")
        .Where(node => node.Attributes["href"] is not null)
        .Take(MaxLinksPerPage)
        .Select(node => HtmlEntity.DeEntitize(node.GetAttributeValue("href", "")))
        .ToArray();

static async Task<HtmlPage?> FetchHtmlAsync(
    HttpClient client, Uri initial, Uri origin, HashSet<string>? fetched = null)
{
    Uri current = initial;
    HashSet<string> redirects = new(StringComparer.Ordinal);
    using CancellationTokenSource deadline = new(TimeSpan.FromSeconds(10));
    for (int hop = 0; hop <= MaxRedirects; hop++)
    {
        if (!SameAuthority(origin, current))
        {
            Console.Error.WriteLine($"Skipping redirect outside the same-authority boundary: {current}");
            return null;
        }
        if (!redirects.Add(current.AbsoluteUri))
        {
            Console.Error.WriteLine($"Skipping redirect loop: {current}");
            return null;
        }
        // Shared across the traversal, so redirect targets are fetched only once.
        if (fetched is not null && !fetched.Add(current.AbsoluteUri))
        {
            return null;
        }
        using HttpRequestMessage request = new(HttpMethod.Get, current);
        using HttpResponseMessage response = await client.SendAsync(
            request, HttpCompletionOption.ResponseHeadersRead, deadline.Token);
        int status = (int)response.StatusCode;
        if (status is 301 or 302 or 303 or 307 or 308)
        {
            Uri? location = response.Headers.Location;
            Uri? target = location is null ? null : ResolveLink(current, location.OriginalString);
            if (hop == MaxRedirects || target is null)
            {
                Console.Error.WriteLine($"Skipping invalid redirect or redirect limit: {current}");
                return null;
            }
            current = target;
            continue;
        }
        if (response.StatusCode != HttpStatusCode.OK)
        {
            Console.Error.WriteLine($"Skipping HTTP {status}: {current}");
            return null;
        }
        if (!string.Equals(response.Content.Headers.ContentType?.MediaType,
            "text/html", StringComparison.OrdinalIgnoreCase))
        {
            Console.Error.WriteLine($"Skipping non-HTML content: {current}");
            return null;
        }
        if (response.Content.Headers.ContentLength is > MaxPageBytes)
        {
            throw new InvalidDataException($"HTML page exceeds {MaxPageBytes} bytes: {current}");
        }
        await using Stream input = await response.Content.ReadAsStreamAsync(deadline.Token);
        using MemoryStream body = new();
        byte[] buffer = new byte[8192];
        int count;
        while ((count = await input.ReadAsync(buffer.AsMemory(), deadline.Token)) != 0)
        {
            if (body.Length + count > MaxPageBytes)
            {
                throw new InvalidDataException($"HTML page exceeds {MaxPageBytes} bytes: {current}");
            }
            body.Write(buffer, 0, count);
        }
        string? charset = response.Content.Headers.ContentType?.CharSet?.Trim('"');
        Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
        Encoding encoding = string.IsNullOrWhiteSpace(charset) ? Encoding.UTF8 : Encoding.GetEncoding(charset);
        body.Position = 0;
        using StreamReader reader = new(body, encoding, detectEncodingFromByteOrderMarks: true);
        HtmlDocument document = new();
        document.LoadHtml(await reader.ReadToEndAsync(deadline.Token));
        return new HtmlPage(current, document);
    }
    throw new InvalidOperationException("Unreachable redirect state.");
}
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

```typescript
async function getDomainHyperlinks(
  domain: string,
  address: string
): Promise<string[]> {
  const links = await getHyperlinks(address);
  const result = new Set<string>();
  for (const link of links) {
    const url = new URL(link);
    if (!validURL(url) || url.host !== domain) continue;
    url.hash = "";
    result.add(url.href);
  }
  return [...result];
}
const address = "https://example.com";
console.log(
  JSON.stringify(await getDomainHyperlinks(new URL(address).host, address))
);
```

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

```go
func getDomainHyperlinks(ctx context.Context, domain, address string) ([]string, error) {
	links, err := getHyperlinks(ctx, address)
	if err != nil {
		return nil, err
	}
	result := []string{}
	seen := map[string]bool{}
	for _, link := range links {
		candidate, err := url.Parse(link)
		if err != nil || !validURL(candidate) || candidate.Host != domain {
			continue
		}
		candidate.Fragment = ""
		normalized := candidate.String()
		if !seen[normalized] {
			seen[normalized] = true
			result = append(result, normalized)
		}
	}
	return result, nil
}
func crawlURL() string {
	return "https://example.com"
}
func main() {
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()
	address := crawlURL()
	initial, err := url.Parse(address)
	if err != nil {
		log.Fatal(err)
	}
	links, err := getDomainHyperlinks(ctx, initial.Host, address)
	if err != nil {
		log.Fatal(err)
	}
	if err := json.NewEncoder(os.Stdout).Encode(links); err != nil {
		log.Fatal(err)
	}
}
```

```java
static Set<URI> getDomainHyperlinks(String domain, URI url) throws Exception {
  return domainHyperlinks(domain, url, getHyperlinks(url));
}

static Set<URI> domainHyperlinks(String domain, URI url, List<String> hrefs) {
  var links = new LinkedHashSet<URI>();
  for (String href : hrefs) {
    if (href.isEmpty() || href.startsWith("#")) continue;
    try {
      // Query-only references keep the current path, including its final segment.
      URI link =
          href.startsWith("?")
              ? URI.create(url.toString().split("[?#]", 2)[0] + href)
              : url.resolve(href);
      link = URI.create(link.toString().split("#", 2)[0]);
      if (("http".equals(link.getScheme()) || "https".equals(link.getScheme()))
          && domain.equals(link.getRawAuthority())) links.add(link);
    } catch (IllegalArgumentException malformed) {
      /* Ignore malformed links. */
    }
  }
  return links;
}
```

```csharp
static async Task<IReadOnlyList<string>> GetDomainHyperlinksAsync(
    HttpClient client, Uri origin, Uri url, IReadOnlyList<string>? fetchedHyperlinks = null)
{
    if (!SameAuthority(origin, url))
    {
        throw new ArgumentException("The page must have the same authority as the crawl origin.", nameof(url));
    }
    if (fetchedHyperlinks is not null)
        return DomainHyperlinks(origin, url, fetchedHyperlinks).Select(link => link.AbsoluteUri).ToArray();
    HtmlPage? page = await FetchHtmlAsync(client, url, origin);
    return page is null ? [] : DomainHyperlinks(origin, page.Url, Hyperlinks(page.Document))
        .Select(link => link.AbsoluteUri).ToArray();
}

static List<Uri> DomainHyperlinks(Uri origin, Uri page, IEnumerable<string> hrefs)
{
    HashSet<string> seen = new(StringComparer.Ordinal);
    List<Uri> links = [];
    foreach (string href in hrefs)
    {
        string reference = href.Trim();
        if (reference.Length == 0 || reference.StartsWith('#'))
        {
            continue;
        }
        Uri? link = ResolveLink(page, reference);
        if (link is not null && SameAuthority(origin, link) && seen.Add(link.AbsoluteUri))
        {
            links.Add(link);
        }
    }
    return links;
}

static bool SameAuthority(Uri origin, Uri candidate) =>
    candidate.IsAbsoluteUri && candidate.Scheme is "http" or "https"
    && candidate.UserInfo.Length == 0
    && string.Equals(origin.Authority, candidate.Authority, StringComparison.OrdinalIgnoreCase);

static Uri? ResolveLink(Uri page, string reference)
{
    // System.Uri preserves the current path for query-only references.
    if (!Uri.TryCreate(page, reference, out Uri? resolved)
        || resolved.Scheme is not ("http" or "https") || resolved.UserInfo.Length != 0)
    {
        return null;
    }
    // Slice the escaped absolute URI so query escapes keep their identity.
    string absolute = resolved.AbsoluteUri;
    int fragment = absolute.IndexOf('#', StringComparison.Ordinal);
    return fragment < 0 ? resolved : new Uri(absolute[..fragment]);
}
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

```typescript
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

async function crawl(address: string): Promise<void> {
  const initial = new URL(address);
  if (!validURL(initial)) throw new Error("Expected an HTTP or HTTPS URL");
  initial.hash = "";
  const directory = path.join("text", initial.host);
  await mkdir(directory, { recursive: true });
  await mkdir("processed", { recursive: true });
  const queue = [initial.href];
  const queued = new Set(queue);
  const visited = new Set<string>();
  while (queue.length) {
    const current = queue.pop()!;
    const page = await fetchPage(current, initial.host);
    if (!page || visited.has(page.url.href)) continue;
    visited.add(page.url.href);
    console.log(page.url.href);
    const digest = createHash("sha256").update(page.url.href).digest("hex");
    // URL-encoded paths keep filenames ASCII; the digest prevents collisions.
    const prefix = `${initial.host}${page.url.pathname}`
      .replaceAll("/", "_")
      .slice(0, 186);
    await writeFile(path.join(directory, `${prefix}#${digest}.txt`), page.text);
    for (const link of page.links) {
      if (!link || link.startsWith("#")) continue;
      let next: URL;
      try {
        next = new URL(link, page.url);
      } catch {
        continue;
      }
      next.hash = "";
      if (
        !validURL(next) ||
        next.host !== initial.host ||
        queued.has(next.href) ||
        visited.has(next.href)
      )
        continue;
      queued.add(next.href);
      queue.push(next.href);
    }
  }
}

await crawl("https://example.com");
```

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

```go
package main

import (
	"bytes"
	"context"
	"crypto/sha256"
	"fmt"
	"golang.org/x/net/html"
	"io"
	"log"
	"mime"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func parseHTML(body io.Reader) ([]string, string, error) {
	document, err := html.Parse(body)
	if err != nil {
		return nil, "", err
	}
	links := []string{}
	var text strings.Builder
	var visit func(*html.Node)
	visit = func(node *html.Node) {
		if node.Type == html.ElementNode && (node.Data == "script" || node.Data == "style") {
			return
		}
		if node.Type == html.TextNode {
			text.WriteString(node.Data)
		}
		if node.Type == html.ElementNode && node.Data == "a" {
			for _, attribute := range node.Attr {
				if attribute.Key == "href" {
					links = append(links, attribute.Val)
				}
			}
		}
		for child := node.FirstChild; child != nil; child = child.NextSibling {
			visit(child)
		}
	}
	visit(document)
	return links, text.String(), nil
}
func validURL(value *url.URL) bool {
	return (value.Scheme == "http" || value.Scheme == "https") && value.Host != "" && value.User == nil
}
func fetchPage(ctx context.Context, address, domain string) (*url.URL, []string, string, error) {
	initial, err := url.Parse(address)
	if err != nil {
		return nil, nil, "", err
	}
	if !validURL(initial) || initial.Host != domain {
		return nil, nil, "", fmt.Errorf("expected a same-domain HTTP or HTTPS URL")
	}
	client := &http.Client{Timeout: 10 * time.Second, CheckRedirect: func(request *http.Request, via []*http.Request) error {
		if !validURL(request.URL) || request.URL.Host != domain {
			return fmt.Errorf("expected a same-domain HTTP or HTTPS URL")
		}
		if len(via) > 5 {
			return fmt.Errorf("Too many redirects")
		}
		request.URL.Fragment = ""
		return nil
	}}
	request, err := http.NewRequestWithContext(ctx, http.MethodGet, initial.String(), nil)
	if err != nil {
		return nil, nil, "", err
	}
	response, err := client.Do(request)
	if err != nil {
		return nil, nil, "", err
	}
	defer response.Body.Close()
	mediaType, _, _ := mime.ParseMediaType(response.Header.Get("Content-Type"))
	if response.StatusCode < 200 || response.StatusCode >= 300 || mediaType != "text/html" {
		// A nil final URL marks an HTTP error or non-HTML response to skip.
		return nil, nil, "", nil
	}
	// Bound each downloaded page before parsing it.
	body, err := io.ReadAll(io.LimitReader(response.Body, (8<<20)+1))
	if err != nil {
		return nil, nil, "", err
	}
	if len(body) > 8<<20 {
		return nil, nil, "", fmt.Errorf("HTML page exceeds 8 MiB")
	}
	links, text, err := parseHTML(bytes.NewReader(body))
	return response.Request.URL, links, text, err
}
func getHyperlinks(ctx context.Context, address string) ([]string, error) {
	initial, err := url.Parse(address)
	if err != nil {
		return nil, err
	}
	final, links, _, err := fetchPage(ctx, address, initial.Host)
	if err != nil {
		return nil, err
	}
	if final == nil {
		return []string{}, nil
	}
	resolved := []string{}
	for _, link := range links {
		if link == "" || strings.HasPrefix(link, "#") {
			continue
		}
		relative, err := url.Parse(link)
		if err != nil {
			continue
		}
		resolved = append(resolved, final.ResolveReference(relative).String())
	}
	return resolved, nil
}
func getDomainHyperlinks(ctx context.Context, domain, address string) ([]string, error) {
	links, err := getHyperlinks(ctx, address)
	if err != nil {
		return nil, err
	}
	result := []string{}
	seen := map[string]bool{}
	for _, link := range links {
		candidate, err := url.Parse(link)
		if err != nil || !validURL(candidate) || candidate.Host != domain {
			continue
		}
		candidate.Fragment = ""
		normalized := candidate.String()
		if !seen[normalized] {
			seen[normalized] = true
			result = append(result, normalized)
		}
	}
	return result, nil
}
func crawlURL() string {
	return "https://example.com"
}
func crawl(ctx context.Context, address string) error {
	initial, err := url.Parse(address)
	if err != nil {
		return err
	}
	if !validURL(initial) {
		return fmt.Errorf("expected an HTTP or HTTPS URL")
	}
	initial.Fragment = ""
	if initial.Path == "" {
		initial.Path = "/"
	}
	directory := filepath.Join("text", initial.Host)
	if err := os.MkdirAll(directory, 0700); err != nil {
		return err
	}
	if err := os.MkdirAll("processed", 0700); err != nil {
		return err
	}
	queue := []string{initial.String()}
	seen := map[string]bool{initial.String(): true}
	for len(queue) > 0 {
		current := queue[len(queue)-1]
		queue = queue[:len(queue)-1]
		final, links, text, err := fetchPage(ctx, current, initial.Host)
		if err != nil {
			return err
		}
		if final == nil {
			continue
		}
		final.Fragment = ""
		if final.String() != current && seen[final.String()] {
			continue
		}
		seen[final.String()] = true
		fmt.Println(final.String())
		name := strings.ReplaceAll(initial.Host+final.EscapedPath(), "/", "_")
		// Include the complete URL so paths such as /a/b and /a_b stay distinct.
		suffix := fmt.Sprintf("#%x", sha256.Sum256([]byte(final.String())))
		limit := 255 - len(suffix) - len(".txt")
		if len(name) > limit {
			name = name[:limit]
		}
		name += suffix
		if err := os.WriteFile(filepath.Join(directory, name+".txt"), []byte(text), 0600); err != nil {
			return err
		}
		for _, link := range links {
			if link == "" || strings.HasPrefix(link, "#") {
				continue
			}
			relative, err := url.Parse(link)
			if err != nil {
				continue
			}
			candidate := final.ResolveReference(relative)
			candidate.Fragment = ""
			if !validURL(candidate) || candidate.Host != initial.Host || seen[candidate.String()] {
				continue
			}
			seen[candidate.String()] = true
			queue = append(queue, candidate.String())
		}
	}
	return nil
}
func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)
	defer cancel()
	if err := crawl(ctx, crawlURL()); err != nil {
		log.Fatal(err)
	}
}
```

```java
import java.net.URI;
import java.net.http.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.time.Duration;
import java.util.*;
import org.jsoup.Jsoup;

crawl(URI.create("https://example.com/"));

static void crawl(URI initial) throws Exception {
  URI start = initial.getRawPath().isEmpty() ? URI.create(initial + "/") : initial;
  String domain = start.getRawAuthority();
  Path directory = Path.of("text", domain);
  Files.createDirectories(directory);
  Files.createDirectories(Path.of("processed"));
  var queue = new ArrayDeque<URI>();
  queue.add(start);
  var seen = new HashSet<URI>();
  seen.add(start);
  while (!queue.isEmpty()) {
    URI url = queue.removeLast();
    var response =
        HTTP.send(
            HttpRequest.newBuilder(url).timeout(Duration.ofSeconds(10)).GET().build(),
            HttpResponse.BodyHandlers.ofString());
    if (response.statusCode() != 200
        || !response
            .headers()
            .firstValue("content-type")
            .orElse("")
            .toLowerCase(Locale.ROOT)
            .startsWith("text/html")) continue;
    System.out.println(url);
    String filename = (domain + url.getRawPath()).replace("/", "_");
    String suffix =
        "#"
            + HexFormat.of()
                .formatHex(
                    java.security.MessageDigest.getInstance("SHA-256")
                        .digest(url.toString().getBytes(StandardCharsets.UTF_8)));
    while (filename.getBytes(StandardCharsets.UTF_8).length > 255 - suffix.length() - 4)
      filename = filename.substring(0, filename.offsetByCodePoints(filename.length(), -1));
    filename += suffix;
    Files.writeString(directory.resolve(filename + ".txt"), Jsoup.parse(response.body()).text());
    for (URI link : domainHyperlinks(domain, url, hyperlinks(response.body())))
      if (seen.add(link)) queue.add(link);
  }
}
```

```csharp
// Replace this with a website you own or have permission to crawl.
Uri start = new("https://example.com/");
using HttpClient client = CreateClient();
IReadOnlyList<LinkObservation> observations = await CrawlAsync(client, start);

static async Task<IReadOnlyList<LinkObservation>> CrawlAsync(HttpClient client, Uri start)
{
    List<LinkObservation> observations = [];
    if (!SameAuthority(start, start))
    {
        throw new ArgumentException("Use an HTTP or HTTPS URL without embedded credentials.", nameof(start));
    }
    start = new UriBuilder(start) { Fragment = "" }.Uri;
    string directory = Path.Combine("text", OutputDirectoryName(start));
    Directory.CreateDirectory(directory);
    Directory.CreateDirectory("processed");
    Queue<Uri> queue = new();
    queue.Enqueue(start);
    HashSet<string> scheduled = new(StringComparer.Ordinal) { start.AbsoluteUri };
    HashSet<string> fetched = new(StringComparer.Ordinal);
    int saved = 0;
    while (queue.TryDequeue(out Uri? url))
    {
        HtmlPage? page = await FetchHtmlAsync(client, url, start, fetched);
        if (page is null)
        {
            continue;
        }
        // Redirect aliases can share a final page; FetchHtmlAsync deduplicates requests.
        string path = Path.Combine(directory, PageFilename(page.Url));
        await File.WriteAllTextAsync(path, VisibleText(page.Document.DocumentNode), new UTF8Encoding(false));
        Console.WriteLine(page.Url.AbsoluteUri);
        saved++;
        IReadOnlyList<string> hyperlinks = await GetHyperlinksAsync(client, page.Url, page.Document);
        IReadOnlyList<string> domainHyperlinks = await GetDomainHyperlinksAsync(client, start, page.Url, hyperlinks);
        observations.Add(new(page.Url, hyperlinks, domainHyperlinks));
        foreach (string address in domainHyperlinks)
        {
            Uri link = new(address);
            if (scheduled.Contains(link.AbsoluteUri))
            {
                continue;
            }
            if (scheduled.Count == MaxPages)
            {
                Console.Error.WriteLine($"Crawl limited to {MaxPages} scheduled pages.");
                break;
            }
            scheduled.Add(link.AbsoluteUri);
            queue.Enqueue(link);
        }
    }
    Console.Error.WriteLine($"Saved {saved} HTML pages.");
    return observations;
}

static string OutputDirectoryName(Uri origin)
{
    string host = origin.IdnHost;
    bool ordinaryHost = origin.IsDefaultPort && host.Length <= 200
        && host.All(character => char.IsAsciiLetterOrDigit(character) || character is '.' or '-')
        && !host.EndsWith('.')
        && !Regex.IsMatch(host, @"^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)",
            RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
    // Keep the guide's text/example.com layout; ports, IPv6 and device names use ASCII.
    return ordinaryHost ? host : "site-" + Convert.ToHexString(
        SHA256.HashData(Encoding.UTF8.GetBytes(origin.Authority))).ToLowerInvariant();
}

static string PageFilename(Uri url)
{
    string digest = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(url.AbsoluteUri)))
        .ToLowerInvariant();
    string suffix = "#" + digest + ".txt";
    string readable = Uri.UnescapeDataString(url.Authority + url.AbsolutePath);
    StringBuilder prefix = new();
    int bytes = 0;
    // Windows reserves device basenames even before an extension, such as con.example.
    if (Regex.IsMatch(readable, @"^(con|prn|aux|nul|com[1-9¹²³]|lpt[1-9¹²³])(?:\.|$)",
        RegexOptions.IgnoreCase | RegexOptions.CultureInvariant))
    {
        prefix.Append('_');
        bytes++;
    }
    foreach (Rune rune in readable.EnumerateRunes())
    {
        bool invalid = rune.Value < 32 || rune.Value is '/' or '\\' or ':' or '*' or '?' or '"' or '<' or '>' or '|';
        string part = invalid ? "_" : rune.ToString();
        int length = Encoding.UTF8.GetByteCount(part);
        if (bytes + length > 255 - suffix.Length)
        {
            break;
        }
        prefix.Append(part);
        bytes += length;
    }
    return prefix.ToString() + suffix;
}

static string VisibleText(HtmlNode root)
{
    StringBuilder text = new();
    AppendText(root, text);
    return Regex.Replace(HtmlEntity.DeEntitize(text.ToString()), @"\s+", " ").Trim();
}

static void AppendText(HtmlNode node, StringBuilder text)
{
    if (node.Name is "script" or "style" || node.NodeType == HtmlNodeType.Comment)
    {
        return;
    }
    if (node.NodeType == HtmlNodeType.Text)
    {
        text.Append(node.InnerText);
        return;
    }
    bool block = node.Name is "address" or "article" or "aside" or "blockquote" or "br"
        or "dd" or "div" or "dl" or "dt" or "fieldset" or "figcaption" or "figure"
        or "footer" or "form" or "h1" or "h2" or "h3" or "h4" or "h5" or "h6"
        or "header" or "hr" or "li" or "main" or "nav" or "ol" or "p" or "pre"
        or "section" or "table" or "td" or "th" or "tr" or "ul";
    if (block) text.Append(' ');
    foreach (HtmlNode child in node.ChildNodes)
    {
        AppendText(child, text);
    }
    if (block) text.Append(' ');
}
internal sealed record LinkObservation(
    Uri Url, IReadOnlyList<string> Hyperlinks, IReadOnlyList<string> DomainHyperlinks);

sealed record HtmlPage(Uri Url, HtmlDocument Document);
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

```typescript
function removeNewlines(texts: string[]): string[] {
  return texts.map((text) =>
    text.replaceAll("\n", " ").replaceAll("\\n", " ").replace(/ {2,}/g, " ")
  );
}
```

```python
def remove_newlines(serie):
    serie = serie.str.replace("\n", " ")
    serie = serie.str.replace("\\n", " ")
    serie = serie.str.replace("  ", " ")
    serie = serie.str.replace("  ", " ")
    return serie
```

```go
package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

func removeNewlines(texts []string) []string {
	result := make([]string, len(texts))
	for i, text := range texts {
		text = strings.ReplaceAll(text, "\n", " ")
		text = strings.ReplaceAll(text, `\n`, " ")
		text = strings.ReplaceAll(text, "  ", " ")
		result[i] = strings.ReplaceAll(text, "  ", " ")
	}
	return result
}
func main() {
	var texts []string
	err := json.NewDecoder(os.Stdin).Decode(&texts)
	if err == nil {
		err = json.NewEncoder(os.Stdout).Encode(removeNewlines(texts))
	}
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
```

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;

System.out.println(removeNewlines("first\nsecond"));

static String removeNewlines(String text) {
  return text.replace("\n", " ").replace("\\n", " ").replaceAll(" {2,}", " ");
}
```

```csharp
using System.Text.Json;
using System.Text.RegularExpressions;

namespace OpenAI.Docs.Examples.TutorialCrawlWebsiteEmbeddings.RemoveNewlines;

internal static class RemoveNewlinesSample
{

internal static void ShowExample()
    {
        Console.WriteLine(RemoveNewlines("first\nsecond"));
    }
    internal static string RemoveNewlines(string text)
    {
        ArgumentNullException.ThrowIfNull(text);
        return Regex.Replace(
            text.Replace("\r\n", " ", StringComparison.Ordinal)
                .Replace("\r", " ", StringComparison.Ordinal)
                .Replace("\n", " ", StringComparison.Ordinal)
                .Replace(@"\n", " ", StringComparison.Ordinal),
            " {2,}", " ");
    }
}
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

```typescript
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { stringify } from "csv-stringify/sync";

const address = new URL("https://example.com");
const directory = path.join("text", address.host);
const rows: { fname: string; text: string }[] = [];
const entries = await readdir(directory, { withFileTypes: true });
entries.sort((a, b) => a.name.localeCompare(b.name));
for (const entry of entries) {
  if (!entry.isFile() || !entry.name.endsWith(".txt")) continue;
  let title = entry.name.slice(0, -4).replace(/#[a-f0-9]{64}$/, "");
  if (title === address.host || title === `${address.host}_`) title = "index";
  else if (title.startsWith(`${address.host}_`))
    title = title.slice(address.host.length + 1);
  title = title.replaceAll("#update", "").replace(/[-_]/g, " ");
  const content = await readFile(path.join(directory, entry.name), "utf8");
  const text = content
    .replaceAll("\n", " ")
    .replaceAll("\\n", " ")
    .replace(/ {2,}/g, " ");
  rows.push({ fname: title, text: `${title}. ${text}` });
}
await mkdir("processed", { recursive: true });
await writeFile(
  "processed/scraped.csv",
  stringify(rows, {
    header: true,
    columns: ["fname", "text"],
  })
);
```

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

```go
package main

import (
	"encoding/csv"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/url"
	"os"
	"path/filepath"
	"strings"
)

func removeNewlines(texts []string) []string {
	result := make([]string, len(texts))
	for i, text := range texts {
		text = strings.ReplaceAll(text, "\n", " ")
		text = strings.ReplaceAll(text, `\n`, " ")
		text = strings.ReplaceAll(text, "  ", " ")
		result[i] = strings.ReplaceAll(text, "  ", " ")
	}
	return result
}

func main() {
	address := "https://example.com"
	initial, err := url.Parse(address)
	if err != nil {
		log.Fatal(err)
	}
	if (initial.Scheme != "http" && initial.Scheme != "https") || initial.Host == "" || initial.User != nil {
		log.Fatal("expected an HTTP or HTTPS URL")
	}
	directory := filepath.Join("text", initial.Host)
	entries, err := os.ReadDir(directory)
	if err != nil {
		log.Fatal(err)
	}
	rows := []map[string]string{}
	for _, entry := range entries {
		if !entry.Type().IsRegular() || filepath.Ext(entry.Name()) != ".txt" {
			continue
		}
		title := strings.TrimSuffix(entry.Name(), ".txt")
		// The crawler's URL digest prevents filename collisions, but isn't a page title.
		if i := strings.LastIndex(title, "#"); i >= 0 && len(title)-i == 65 {
			if _, err := hex.DecodeString(title[i+1:]); err == nil {
				title = title[:i]
			}
		}
		if title == initial.Host || title == initial.Host+"_" {
			title = "index"
		} else {
			title = strings.TrimPrefix(title, initial.Host+"_")
		}
		title = strings.NewReplacer("-", " ", "_", " ", "#update", "").Replace(title)
		data, err := os.ReadFile(filepath.Join(directory, entry.Name()))
		if err != nil {
			log.Fatal(err)
		}
		text := removeNewlines([]string{string(data)})[0]
		rows = append(rows, map[string]string{"fname": title, "text": fmt.Sprintf("%s. %s", title, text)})
	}
	if err := os.MkdirAll("processed", 0700); err != nil {
		log.Fatal(err)
	}
	file, err := os.Create("processed/scraped.csv")
	if err != nil {
		log.Fatal(err)
	}
	records := [][]string{{"fname", "text"}}
	for _, row := range rows {
		records = append(records, []string{row["fname"], row["text"]})
	}
	if err := csv.NewWriter(file).WriteAll(records); err != nil {
		file.Close()
		log.Fatal(err)
	}
	if err := file.Close(); err != nil {
		log.Fatal(err)
	}
	if err := json.NewEncoder(os.Stdout).Encode(rows); err != nil {
		log.Fatal(err)
	}
}
```

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;

String domain = java.net.URI.create("https://example.com/").getRawAuthority();
var rows = new ArrayList<Map<String, String>>();
try (var files = Files.list(Path.of("text", domain))) {
  for (var file : files.sorted().toList()) {
    String title =
        file.getFileName()
            .toString()
            .replaceFirst("\\.txt$", "")
            .replaceFirst("#[0-9a-f]{64}$", "");
    if (title.startsWith(domain + "_")) title = title.substring(domain.length() + 1);
    else if (title.equals(domain)) title = "index";
    if (title.isEmpty()) title = "index";
    title = title.replace("-", " ").replace("_", " ").replace("#update", "");
    String text = Files.readString(file).replace("\n", " ").replace("\\n", " ");
    rows.add(Map.of("fname", title, "text", title + ". " + text));
  }
}
Files.createDirectories(Path.of("processed"));
try (var writer =
    CSVFormat.DEFAULT
        .builder()
        .setHeader("id", "fname", "text")
        .get()
        .print(Files.newBufferedWriter(Path.of("processed/scraped.csv")))) {
  for (int i = 0; i < rows.size(); i++)
    writer.printRecord(i, rows.get(i).get("fname"), rows.get(i).get("text"));
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

// Use the same origin and working directory as the crawler.
Uri origin = new("https://example.com/");
string workingDirectory = ".";

string domain = origin.Authority;
List<Dictionary<string, string>> rows = [];
string[] files = Directory.GetFiles(Path.Combine(workingDirectory, "text", OutputDirectoryName(origin)), "*.txt");
Array.Sort(files, StringComparer.Ordinal);
foreach (string file in files)
{
    string title = TitleFromFilename(Path.GetFileName(file), domain);
    string text = RemoveNewlines(await File.ReadAllTextAsync(file));
    rows.Add(new() { ["fname"] = title, ["text"] = title + ". " + text });
}

Directory.CreateDirectory(Path.Combine(workingDirectory, "processed"));
using (StreamWriter output = new(Path.Combine(workingDirectory, "processed", "scraped.csv"), false, new UTF8Encoding(false)))
{
    await output.WriteLineAsync("id,fname,text");
    for (int index = 0; index < rows.Count; index++)
    {
        await output.WriteLineAsync(string.Join(",", index.ToString(CultureInfo.InvariantCulture),
            QuoteCsv(rows[index]["fname"]), QuoteCsv(rows[index]["text"])));
    }
}

static string OutputDirectoryName(Uri origin)
{
    string host = origin.IdnHost;
    bool ordinaryHost = origin.IsDefaultPort && host.Length <= 200
        && host.All(character => char.IsAsciiLetterOrDigit(character) || character is '.' or '-')
        && !host.EndsWith('.')
        && !Regex.IsMatch(host, @"^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)",
            RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
    // Match the crawler's portable folder, preserving text/example.com for ordinary DNS.
    return ordinaryHost ? host : "site-" + Convert.ToHexString(
        SHA256.HashData(Encoding.UTF8.GetBytes(origin.Authority))).ToLowerInvariant();
}

static string TitleFromFilename(string filename, string domain)
{
    // PageFilename replaces these authority characters before writing the file.
    domain = Regex.Replace(domain, @"[\x00-\x1f/\\:*?""<>|]", "_");
    string title = Regex.Replace(Path.GetFileNameWithoutExtension(filename), "#[0-9a-f]{64}$", "");
    // Remove only the crawler's Windows-device escape for this authority.
    if (Regex.IsMatch(domain, @"^(con|prn|aux|nul|com[1-9¹²³]|lpt[1-9¹²³])(?:\.|$)",
        RegexOptions.IgnoreCase | RegexOptions.CultureInvariant)
        && title.StartsWith("_" + domain, StringComparison.Ordinal))
    {
        title = title[1..];
    }
    if (title.StartsWith(domain + "_", StringComparison.Ordinal))
    {
        title = title[(domain.Length + 1)..];
    }
    else if (title == domain)
    {
        title = "index";
    }
    if (title.Length == 0)
    {
        title = "index";
    }
    return title.Replace("-", " ", StringComparison.Ordinal)
        .Replace("_", " ", StringComparison.Ordinal)
        .Replace("#update", "", StringComparison.Ordinal);
}

static string QuoteCsv(string value) => "\"" + value.Replace("\"", "\"\"", StringComparison.Ordinal) + "\"";

static string RemoveNewlines(string text)
{
    ArgumentNullException.ThrowIfNull(text);
    return Regex.Replace(
        text.Replace("\r\n", " ", StringComparison.Ordinal)
            .Replace("\r", " ", StringComparison.Ordinal)
            .Replace("\n", " ", StringComparison.Ordinal)
            .Replace(@"\n", " ", StringComparison.Ordinal),
        " {2,}", " ");
}
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

```typescript
import { readFile, writeFile } from "node:fs/promises";
import { createCanvas } from "@napi-rs/canvas";
import { getEncoding } from "js-tiktoken";
const encoding = getEncoding("cl100k_base");
import { parse } from "csv-parse/sync";
const rows: { text: string }[] = parse(
  await readFile("processed/scraped.csv", "utf8"),
  { columns: true, skip_empty_lines: true }
);
const texts = rows.map((row) => row.text);
const counts = texts.map((text) => encoding.encode(text).length);
const bins = Array<number>(10).fill(0);
const maximum = Math.max(1, ...counts);
for (const count of counts)
  bins[Math.min(9, Math.floor((count / maximum) * 10))]++;
const canvas = createCanvas(800, 600);
const context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, 800, 600);
context.fillStyle = "black";
context.font = "20px sans-serif";
context.fillText("Token counts", 40, 30);
const largestBin = Math.max(1, ...bins);
context.fillStyle = "steelblue";
for (const [index, count] of bins.entries()) {
  const height = (count / largestBin) * 480;
  context.fillRect(40 + index * 72, 540 - height, 68, height);
}
context.fillStyle = "black";
context.fillText("0", 40, 575);
context.fillText(String(maximum), 740, 575);
await writeFile("token-histogram.png", await canvas.encode("png"));
```

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

```go
package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"github.com/tiktoken-go/tokenizer"
	"image"
	"image/color"
	"image/draw"
	"image/png"
	"io"
	"log"
	"os"
	"slices"
)

func readTexts(path string) ([]string, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	column := -1
	for i, name := range header {
		if name == "text" {
			column = i
		}
	}
	if column < 0 {
		return nil, fmt.Errorf("missing text column")
	}
	texts := []string{}
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		texts = append(texts, record[column])
	}
	return texts, nil
}
func histogram(texts []string) error {
	codec, err := tokenizer.Get(tokenizer.Cl100kBase)
	if err != nil {
		return err
	}
	counts := make([]int, len(texts))
	frequencies := map[int]int{}
	for i, text := range texts {
		ids, _, err := codec.Encode(text)
		if err != nil {
			return err
		}
		counts[i] = len(ids)
		frequencies[counts[i]]++
	}
	keys := []int{}
	maximum := 1
	total := 0
	for count, frequency := range frequencies {
		keys = append(keys, count)
		maximum = max(maximum, frequency)
		total += frequency
	}
	slices.Sort(keys)
	plot := image.NewRGBA(image.Rect(0, 0, 600, 400))
	draw.Draw(plot, plot.Bounds(), image.NewUniform(color.White), image.Point{}, draw.Src)
	for i, count := range keys {
		left := 20 + i*560/len(keys)
		right := 20 + (i+1)*560/len(keys)
		top := 380 - frequencies[count]*360/maximum
		draw.Draw(plot, image.Rect(left, top, right, 381), image.NewUniform(color.RGBA{0, 100, 0, 255}), image.Point{}, draw.Src)
	}
	file, err := os.Create("token-histogram.png")
	if err != nil {
		return err
	}
	if err := png.Encode(file, plot); err != nil {
		file.Close()
		return err
	}
	if err := file.Close(); err != nil {
		return err
	}
	return json.NewEncoder(os.Stdout).Encode(map[string]any{"counts": counts, "histogram_total": total})
}
func main() {
	texts, err := readTexts("processed/scraped.csv")
	if err != nil {
		log.Fatal(err)
	}
	if err := histogram(texts); err != nil {
		log.Fatal(err)
	}
}
```

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;

var texts = new ArrayList<String>();
try (var csv =
    CSVFormat.DEFAULT
        .builder()
        .setHeader()
        .setSkipHeaderRecord(true)
        .get()
        .parse(Files.newBufferedReader(Path.of("processed/scraped.csv")))) {
  for (var row : csv) texts.add(row.get("text"));
}
var counts = texts.stream().map(ENCODING::countTokens).toList();
int total = histogram(counts);

static final com.knuddels.jtokkit.api.Encoding ENCODING =
    com.knuddels.jtokkit.Encodings.newDefaultEncodingRegistry()
        .getEncoding(com.knuddels.jtokkit.api.EncodingType.CL100K_BASE);

static int histogram(List<Integer> counts) throws Exception {
  var bins = new TreeMap<Integer, Integer>();
  for (int count : counts) bins.merge(count, 1, Integer::sum);
  var image =
      new java.awt.image.BufferedImage(640, 400, java.awt.image.BufferedImage.TYPE_INT_RGB);
  var graphics = image.createGraphics();
  try {
    graphics.setColor(java.awt.Color.WHITE);
    graphics.fillRect(0, 0, 640, 400);
    int index = 0, maximum = bins.values().stream().max(Integer::compare).orElse(1);
    for (var bin : bins.entrySet()) {
      int x = 40 + index++ * 540 / Math.max(1, bins.size()),
          height = bin.getValue() * 300 / maximum;
      graphics.setColor(java.awt.Color.BLUE);
      graphics.fillRect(x, 340 - height, Math.max(1, 500 / Math.max(1, bins.size())), height);
      graphics.setColor(java.awt.Color.BLACK);
      graphics.drawString(bin.getKey().toString(), x, 360);
    }
  } finally {
    graphics.dispose();
  }
  javax.imageio.ImageIO.write(image, "png", Path.of("local-plot.png").toFile());
  return bins.values().stream().mapToInt(Integer::intValue).sum();
}
```

```csharp
using System.Text.Json;
using Microsoft.ML.Tokenizers;
using Microsoft.VisualBasic.FileIO;

var (counts, total) = SaveTokenHistogram();

static (int[] Counts, int Total) SaveTokenHistogram()
{
    List<string> texts = ReadColumn("processed/scraped.csv", "text");
    int[] counts = texts.Select(CountTokens).ToArray();
    int total = SaveHistogram(counts);
    return (counts, total);
}


static int CountTokens(string text) => TokenCounter.Encoding.CountTokens(text);

static int SaveHistogram(IReadOnlyList<int> counts)
{
    // Exact integer token counts form the bins; every row contributes once.
    var bins = counts.GroupBy(count => count).OrderBy(group => group.Key).ToArray();
    ScottPlot.Bar[] bars = bins.Select(group => new ScottPlot.Bar
    {
        Position = group.Key,
        Value = group.Count()
    }).ToArray();
    ScottPlot.Plot plot = new();
    if (bins.Length > 0)
    {
        plot.Add.Bars(bars);
    }
    plot.Title("Token count distribution");
    plot.XLabel("Tokens per text");
    plot.YLabel("Number of texts");
    plot.Axes.Bottom.Min = -1;
    plot.Axes.Left.Min = 0;
    plot.SavePng("token-histogram.png", 640, 400);
    return bins.Sum(group => group.Count());
}

// TextFieldParser handles quoted commas, escaped quotes, and multiline fields.
// Empty physical lines are ignored; quoted empty fields remain values.
static List<string> ReadColumn(string path, string column)
{
    using TextFieldParser parser = new(path, System.Text.Encoding.UTF8, true)
    {
        TextFieldType = FieldType.Delimited,
        HasFieldsEnclosedInQuotes = true,
        TrimWhiteSpace = false
    };
    parser.SetDelimiters(",");
    string[] header = parser.ReadFields() ?? throw new InvalidDataException("Missing CSV header.");
    if (header.Distinct(StringComparer.Ordinal).Count() != header.Length)
    {
        throw new InvalidDataException("Duplicate CSV column.");
    }
    int columnIndex = Array.IndexOf(header, column);
    if (columnIndex < 0)
    {
        throw new InvalidDataException($"Missing CSV column: {column}.");
    }
    List<string> values = [];
    while (!parser.EndOfData)
    {
        string[] fields = parser.ReadFields() ?? throw new InvalidDataException("Missing CSV record.");
        if (fields.Length != header.Length)
        {
            throw new InvalidDataException("CSV record length differs from its header.");
        }
        values.Add(fields[columnIndex]);
    }
    return values;
}
// The data package supplies this cached vocabulary without a network request.
static class TokenCounter
{
    internal static readonly TiktokenTokenizer Encoding = TiktokenTokenizer.CreateForEncoding("cl100k_base");
}
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




The Java programs pass data between steps through CSV files. The splitting step reads `processed/scraped.csv` and writes each chunk and its token count to `processed/chunks.csv`. The following histogram and embedding steps read that file.




Split long pages into chunks

```typescript
import { readFile, writeFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";
import { getEncoding } from "js-tiktoken";

const encoding = getEncoding("cl100k_base");
function splitIntoMany(text: string, maxTokens = 500): string[] {
  if (!Number.isInteger(maxTokens) || maxTokens <= 0) {
    throw new Error("maxTokens must be a positive integer");
  }
  if (!text.trim()) return [];
  const sentences = text.split(". ");
  const chunks: string[] = [];
  let chunk = "";
  for (const [index, part] of sentences.entries()) {
    const sentence = index < sentences.length - 1 ? `${part}.` : part;
    if (encoding.encode(sentence).length > maxTokens) {
      throw new Error("Split the oversized sentence before chunking");
    }
    const candidate = chunk ? `${chunk} ${sentence}` : sentence;
    if (encoding.encode(candidate).length > maxTokens) {
      chunks.push(chunk);
      chunk = sentence;
    } else chunk = candidate;
  }
  if (chunk) chunks.push(chunk);
  return chunks;
}

const rows: { text: string }[] = parse(
  await readFile("processed/scraped.csv", "utf8"),
  { columns: true, skip_empty_lines: true }
);
const chunks = rows.flatMap((row) => splitIntoMany(row.text));
await writeFile("processed/chunks.json", JSON.stringify(chunks));
```

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

```go
package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"github.com/tiktoken-go/tokenizer"
	"io"
	"log"
	"os"
	"strings"
)

func readTexts(path string) ([]string, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	column := -1
	for i, name := range header {
		if name == "text" {
			column = i
		}
	}
	if column < 0 {
		return nil, fmt.Errorf("missing text column")
	}
	texts := []string{}
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		texts = append(texts, record[column])
	}
	return texts, nil
}
func splitIntoMany(text string, maxTokens int) ([]string, error) {
	if maxTokens <= 0 {
		return nil, fmt.Errorf("maxTokens must be positive")
	}
	chunks := []string{}
	if strings.TrimSpace(text) == "" {
		return chunks, nil
	}
	codec, err := tokenizer.Get(tokenizer.Cl100kBase)
	if err != nil {
		return nil, err
	}
	sentences := strings.Split(text, ". ")
	chunk := ""
	for i, sentence := range sentences {
		if i < len(sentences)-1 {
			sentence += "."
		}
		ids, _, err := codec.Encode(sentence)
		if err != nil {
			return nil, err
		}
		if len(ids) > maxTokens {
			return nil, fmt.Errorf("a sentence exceeds maxTokens; split it before chunking")
		}
		candidate := sentence
		if chunk != "" {
			candidate = chunk + " " + sentence
		}
		ids, _, err = codec.Encode(candidate)
		if err != nil {
			return nil, err
		}
		if len(ids) > maxTokens {
			chunks = append(chunks, chunk)
			chunk = sentence
		} else {
			chunk = candidate
		}
	}
	if chunk != "" {
		chunks = append(chunks, chunk)
	}
	return chunks, nil
}

func main() {
	texts, err := readTexts("processed/scraped.csv")
	if err != nil {
		log.Fatal(err)
	}
	chunks := []string{}
	for _, text := range texts {
		parts, err := splitIntoMany(text, 500)
		if err != nil {
			log.Fatal(err)
		}
		chunks = append(chunks, parts...)
	}
	data, err := json.Marshal(chunks)
	if err != nil {
		log.Fatal(err)
	}
	if err := os.WriteFile("processed/chunks.json", data, 0600); err != nil {
		log.Fatal(err)
	}
}
```

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;

try (var input =
        CSVFormat.DEFAULT
            .builder()
            .setHeader()
            .setSkipHeaderRecord(true)
            .get()
            .parse(Files.newBufferedReader(Path.of("processed/scraped.csv")));
    var output =
        CSVFormat.DEFAULT
            .builder()
            .setHeader("text", "n_tokens")
            .get()
            .print(Files.newBufferedWriter(Path.of("processed/chunks.csv")))) {
  for (var row : input) {
    for (var chunk : splitIntoMany(row.get("text"), 500)) {
      output.printRecord(chunk, ENCODING.countTokens(chunk));
    }
  }
}

static final com.knuddels.jtokkit.api.Encoding ENCODING =
    com.knuddels.jtokkit.Encodings.newDefaultEncodingRegistry()
        .getEncoding(com.knuddels.jtokkit.api.EncodingType.CL100K_BASE);

static List<String> splitIntoMany(String text, int maxTokens) {
  if (maxTokens < 1) throw new IllegalArgumentException("maxTokens must be positive");
  var chunks = new ArrayList<String>();
  if (text.isBlank()) return chunks;
  String chunk = "";
  String[] sentences = text.split("\\. ", -1);
  for (int i = 0; i < sentences.length; i++) {
    String sentence = sentences[i] + (i < sentences.length - 1 ? "." : "");
    if (ENCODING.countTokens(sentence) > maxTokens)
      throw new IllegalArgumentException("Split the overlong sentence before chunking");
    String candidate = chunk.isEmpty() ? sentence : chunk + " " + sentence;
    if (ENCODING.countTokens(candidate) > maxTokens) {
      chunks.add(chunk);
      chunk = sentence;
    } else chunk = candidate;
  }
  if (!chunk.isEmpty()) chunks.add(chunk);
  return chunks;
}
```

```csharp
using System.Globalization;
using System.Text;
using System.Text.Json;
using Microsoft.ML.Tokenizers;
using Microsoft.VisualBasic.FileIO;

List<string> texts = ReadColumn("processed/scraped.csv", "text");
List<string> chunks = texts.SelectMany(text => SplitIntoMany(text, 500)).ToList();
Directory.CreateDirectory("processed");
using (StreamWriter output = new("processed/chunks.csv", false, new UTF8Encoding(false)))
{
    await output.WriteLineAsync("text,n_tokens");
    foreach (string chunk in chunks)
    {
        string quoted = "\"" + chunk.Replace("\"", "\"\"", StringComparison.Ordinal) + "\"";
        await output.WriteLineAsync(quoted + "," + CountTokens(chunk).ToString(CultureInfo.InvariantCulture));
    }
}
// The embedding producer can consume the same chunks without CSV parsing.
await File.WriteAllTextAsync("processed/chunks.json", JsonSerializer.Serialize(chunks));

static int CountTokens(string text) => TokenCounter.Encoding.CountTokens(text);

static List<string> SplitIntoMany(string text, int maxTokens)
{
    ArgumentNullException.ThrowIfNull(text);
    ArgumentOutOfRangeException.ThrowIfLessThan(maxTokens, 1);
    List<string> chunks = [];
    if (string.IsNullOrWhiteSpace(text))
    {
        return chunks;
    }
    string chunk = "";
    string[] sentences = text.Split(". ", StringSplitOptions.None);
    for (int index = 0; index < sentences.Length; index++)
    {
        string sentence = sentences[index] + (index < sentences.Length - 1 ? "." : "");
        if (CountTokens(sentence) > maxTokens)
        {
            throw new ArgumentException("Split the overlong sentence before chunking.", nameof(text));
        }
        string candidate = chunk.Length == 0 ? sentence : chunk + " " + sentence;
        // Recount the complete candidate, including separators, at every step.
        if (CountTokens(candidate) > maxTokens)
        {
            chunks.Add(chunk);
            chunk = sentence;
        }
        else
        {
            chunk = candidate;
        }
    }
    if (chunk.Length > 0)
    {
        chunks.Add(chunk);
    }
    return chunks;
}

// TextFieldParser handles quoted commas, escaped quotes, and multiline fields.
// Empty physical lines are ignored; quoted empty fields remain values.
static List<string> ReadColumn(string path, string column)
{
    using TextFieldParser parser = new(path, System.Text.Encoding.UTF8, true)
    {
        TextFieldType = FieldType.Delimited,
        HasFieldsEnclosedInQuotes = true,
        TrimWhiteSpace = false
    };
    parser.SetDelimiters(",");
    string[] header = parser.ReadFields() ?? throw new InvalidDataException("Missing CSV header.");
    if (header.Distinct(StringComparer.Ordinal).Count() != header.Length)
    {
        throw new InvalidDataException("Duplicate CSV column.");
    }
    int columnIndex = Array.IndexOf(header, column);
    if (columnIndex < 0)
    {
        throw new InvalidDataException($"Missing CSV column: {column}.");
    }
    List<string> values = [];
    while (!parser.EndOfData)
    {
        string[] fields = parser.ReadFields() ?? throw new InvalidDataException("Missing CSV record.");
        if (fields.Length != header.Length)
        {
            throw new InvalidDataException("CSV record length differs from its header.");
        }
        values.Add(fields[columnIndex]);
    }
    return values;
}

// The data package supplies this cached vocabulary without a network request.
static class TokenCounter
{
    internal static readonly TiktokenTokenizer Encoding = TiktokenTokenizer.CreateForEncoding("cl100k_base");
}
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

```typescript
import { readFile, writeFile } from "node:fs/promises";
import { createCanvas } from "@napi-rs/canvas";
import { getEncoding } from "js-tiktoken";
const encoding = getEncoding("cl100k_base");
const texts: string[] = JSON.parse(
  await readFile("processed/chunks.json", "utf8")
);
const counts = texts.map((text) => encoding.encode(text).length);
const bins = Array<number>(10).fill(0);
const maximum = Math.max(1, ...counts);
for (const count of counts)
  bins[Math.min(9, Math.floor((count / maximum) * 10))]++;
const canvas = createCanvas(800, 600);
const context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, 800, 600);
context.fillStyle = "black";
context.font = "20px sans-serif";
context.fillText("Token counts", 40, 30);
const largestBin = Math.max(1, ...bins);
context.fillStyle = "steelblue";
for (const [index, count] of bins.entries()) {
  const height = (count / largestBin) * 480;
  context.fillRect(40 + index * 72, 540 - height, 68, height);
}
context.fillStyle = "black";
context.fillText("0", 40, 575);
context.fillText(String(maximum), 740, 575);
await writeFile("token-histogram.png", await canvas.encode("png"));
```

```python
df = pd.DataFrame(shortened, columns=["text"])
df["n_tokens"] = df.text.apply(lambda x: len(tokenizer.encode(x)))
df.n_tokens.hist()
```

```go
package main

import (
	"encoding/json"
	"github.com/tiktoken-go/tokenizer"
	"image"
	"image/color"
	"image/draw"
	"image/png"
	"log"
	"os"
	"slices"
)

func histogram(texts []string) error {
	codec, err := tokenizer.Get(tokenizer.Cl100kBase)
	if err != nil {
		return err
	}
	counts := make([]int, len(texts))
	frequencies := map[int]int{}
	for i, text := range texts {
		ids, _, err := codec.Encode(text)
		if err != nil {
			return err
		}
		counts[i] = len(ids)
		frequencies[counts[i]]++
	}
	keys := []int{}
	maximum := 1
	total := 0
	for count, frequency := range frequencies {
		keys = append(keys, count)
		maximum = max(maximum, frequency)
		total += frequency
	}
	slices.Sort(keys)
	plot := image.NewRGBA(image.Rect(0, 0, 600, 400))
	draw.Draw(plot, plot.Bounds(), image.NewUniform(color.White), image.Point{}, draw.Src)
	for i, count := range keys {
		left := 20 + i*560/len(keys)
		right := 20 + (i+1)*560/len(keys)
		top := 380 - frequencies[count]*360/maximum
		draw.Draw(plot, image.Rect(left, top, right, 381), image.NewUniform(color.RGBA{0, 100, 0, 255}), image.Point{}, draw.Src)
	}
	file, err := os.Create("token-histogram.png")
	if err != nil {
		return err
	}
	if err := png.Encode(file, plot); err != nil {
		file.Close()
		return err
	}
	if err := file.Close(); err != nil {
		return err
	}
	return json.NewEncoder(os.Stdout).Encode(map[string]any{"counts": counts, "histogram_total": total})
}
func main() {
	data, err := os.ReadFile("processed/chunks.json")
	if err != nil {
		log.Fatal(err)
	}
	var texts []string
	if err := json.Unmarshal(data, &texts); err != nil {
		log.Fatal(err)
	}
	if err := histogram(texts); err != nil {
		log.Fatal(err)
	}
}
```

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;

var texts = new ArrayList<String>();
try (var csv =
    CSVFormat.DEFAULT
        .builder()
        .setHeader()
        .setSkipHeaderRecord(true)
        .get()
        .parse(Files.newBufferedReader(Path.of("processed/chunks.csv")))) {
  for (var row : csv) texts.add(row.get("text"));
}
var counts = texts.stream().map(ENCODING::countTokens).toList();
int total = histogram(counts);

static final com.knuddels.jtokkit.api.Encoding ENCODING =
    com.knuddels.jtokkit.Encodings.newDefaultEncodingRegistry()
        .getEncoding(com.knuddels.jtokkit.api.EncodingType.CL100K_BASE);

static int histogram(List<Integer> counts) throws Exception {
  var bins = new TreeMap<Integer, Integer>();
  for (int count : counts) bins.merge(count, 1, Integer::sum);
  var image =
      new java.awt.image.BufferedImage(640, 400, java.awt.image.BufferedImage.TYPE_INT_RGB);
  var graphics = image.createGraphics();
  try {
    graphics.setColor(java.awt.Color.WHITE);
    graphics.fillRect(0, 0, 640, 400);
    int index = 0, maximum = bins.values().stream().max(Integer::compare).orElse(1);
    for (var bin : bins.entrySet()) {
      int x = 40 + index++ * 540 / Math.max(1, bins.size()),
          height = bin.getValue() * 300 / maximum;
      graphics.setColor(java.awt.Color.BLUE);
      graphics.fillRect(x, 340 - height, Math.max(1, 500 / Math.max(1, bins.size())), height);
      graphics.setColor(java.awt.Color.BLACK);
      graphics.drawString(bin.getKey().toString(), x, 360);
    }
  } finally {
    graphics.dispose();
  }
  javax.imageio.ImageIO.write(image, "png", Path.of("local-plot.png").toFile());
  return bins.values().stream().mapToInt(Integer::intValue).sum();
}
```

```csharp
using System.Text.Json;
using Microsoft.ML.Tokenizers;
using Microsoft.VisualBasic.FileIO;

var (counts, total) = SaveTokenHistogram();

static (int[] Counts, int Total) SaveTokenHistogram()
{
    List<string> texts = ReadColumn("processed/chunks.csv", "text");
    int[] counts = texts.Select(CountTokens).ToArray();
    int total = SaveHistogram(counts);
    return (counts, total);
}


static int CountTokens(string text) => TokenCounter.Encoding.CountTokens(text);

static int SaveHistogram(IReadOnlyList<int> counts)
{
    // Exact integer token counts form the bins; every row contributes once.
    var bins = counts.GroupBy(count => count).OrderBy(group => group.Key).ToArray();
    ScottPlot.Bar[] bars = bins.Select(group => new ScottPlot.Bar
    {
        Position = group.Key,
        Value = group.Count()
    }).ToArray();
    ScottPlot.Plot plot = new();
    if (bins.Length > 0)
    {
        plot.Add.Bars(bars);
    }
    plot.Title("Token count distribution");
    plot.XLabel("Tokens per text");
    plot.YLabel("Number of texts");
    plot.Axes.Bottom.Min = -1;
    plot.Axes.Left.Min = 0;
    plot.SavePng("token-histogram.png", 640, 400);
    return bins.Sum(group => group.Count());
}

// TextFieldParser handles quoted commas, escaped quotes, and multiline fields.
// Empty physical lines are ignored; quoted empty fields remain values.
static List<string> ReadColumn(string path, string column)
{
    using TextFieldParser parser = new(path, System.Text.Encoding.UTF8, true)
    {
        TextFieldType = FieldType.Delimited,
        HasFieldsEnclosedInQuotes = true,
        TrimWhiteSpace = false
    };
    parser.SetDelimiters(",");
    string[] header = parser.ReadFields() ?? throw new InvalidDataException("Missing CSV header.");
    if (header.Distinct(StringComparer.Ordinal).Count() != header.Length)
    {
        throw new InvalidDataException("Duplicate CSV column.");
    }
    int columnIndex = Array.IndexOf(header, column);
    if (columnIndex < 0)
    {
        throw new InvalidDataException($"Missing CSV column: {column}.");
    }
    List<string> values = [];
    while (!parser.EndOfData)
    {
        string[] fields = parser.ReadFields() ?? throw new InvalidDataException("Missing CSV record.");
        if (fields.Length != header.Length)
        {
            throw new InvalidDataException("CSV record length differs from its header.");
        }
        values.Add(fields[columnIndex]);
    }
    return values;
}
// The data package supplies this cached vocabulary without a network request.
static class TokenCounter
{
    internal static readonly TiktokenTokenizer Encoding = TiktokenTokenizer.CreateForEncoding("cl100k_base");
}
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

For the C# example, first export the `text` column of the chunked `df` to `processed/chunks.json` as a JSON array of strings. The example reads those chunks and writes the embeddings used by the question-answering step.

Create embeddings for the scraped text

```typescript
import OpenAI from "openai";
import { readFile, writeFile } from "node:fs/promises";
import { stringify } from "csv-stringify/sync";

const client = new OpenAI();
const chunks: string[] = JSON.parse(
  await readFile("processed/chunks.json", "utf8")
);
if (
  !Array.isArray(chunks) ||
  !chunks.every((text) => typeof text === "string")
) {
  throw new Error("Expected an array of text chunks");
}
const rows: (string | number)[][] = [["text", "n_tokens", "embeddings"]];
for (const text of chunks) {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  if (
    response.data.length !== 1 ||
    response.data[0].index !== 0 ||
    !response.data[0].embedding.length
  ) {
    throw new Error("Expected one embedding per chunk");
  }
  rows.push([
    text,
    response.usage.prompt_tokens,
    JSON.stringify(response.data[0].embedding),
  ]);
}
await writeFile("processed/embeddings.csv", stringify(rows));
```

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

```go
package main

import (
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"github.com/openai/openai-go/v3"
	"log"
	"os"
	"strconv"
	"time"
)

func run() error {
	data, err := os.ReadFile("processed/chunks.json")
	if err != nil {
		return err
	}
	var texts []string
	if err := json.Unmarshal(data, &texts); err != nil {
		return err
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)
	defer cancel()
	client := openai.NewClient()
	records := [][]string{{"text", "n_tokens", "embeddings"}}
	for _, text := range texts {
		response, err := client.Embeddings.New(ctx, openai.EmbeddingNewParams{Model: "text-embedding-3-small", Input: openai.EmbeddingNewParamsInputUnion{OfString: openai.String(text)}})
		if err != nil {
			return err
		}
		if len(response.Data) != 1 || response.Data[0].Index != 0 || len(response.Data[0].Embedding) == 0 {
			return fmt.Errorf("expected one embedding")
		}
		vector, err := json.Marshal(response.Data[0].Embedding)
		if err != nil {
			return err
		}
		records = append(records, []string{text, strconv.FormatInt(response.Usage.PromptTokens, 10), string(vector)})
	}
	if err := os.MkdirAll("processed", 0700); err != nil {
		return err
	}
	file, err := os.Create("processed/embeddings.csv")
	if err != nil {
		return err
	}
	if err := csv.NewWriter(file).WriteAll(records); err != nil {
		file.Close()
		return err
	}
	return file.Close()
}
func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}
```

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.embeddings.EmbeddingCreateParams;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;

var client = OpenAIOkHttpClient.fromEnv();
Files.createDirectories(Path.of("processed"));
try (var chunks =
        CSVFormat.DEFAULT
            .builder()
            .setHeader()
            .setSkipHeaderRecord(true)
            .get()
            .parse(Files.newBufferedReader(Path.of("processed/chunks.csv")));
    var csv =
        CSVFormat.DEFAULT
            .builder()
            .setHeader("text", "n_tokens", "embeddings")
            .get()
            .print(Files.newBufferedWriter(Path.of("processed/embeddings.csv")))) {
  for (var chunk : chunks) {
    String text = chunk.get("text");
    int tokens = Integer.parseInt(chunk.get("n_tokens"));
    var embedding =
        client
            .embeddings()
            .create(
                EmbeddingCreateParams.builder()
                    .model("text-embedding-3-small")
                    .input(text)
                    .build())
            .data()
            .get(0)
            .embedding();
    csv.printRecord(text, tokens, new ObjectMapper().writeValueAsString(embedding));
  }
}
```

```csharp
using System.Globalization;
using System.Text.Json;
using OpenAI.Embeddings;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
string model = "text-embedding-3-small";
EmbeddingClient client = new(model, key);

string[] pageChunks = JsonSerializer.Deserialize<string[]>(
    await File.ReadAllTextAsync("processed/chunks.json"))!;
Directory.CreateDirectory("processed");
using StreamWriter writer = new("processed/embeddings.csv");
await writer.WriteLineAsync("text,n_tokens,embeddings");
foreach (string text in pageChunks)
{
    (float[] vector, int tokens) = await EmbedAsync(client, text.Replace("\n", " ", StringComparison.Ordinal));
    string encoded = JsonSerializer.Serialize(vector);
    await writer.WriteLineAsync($"{CsvField(text)},{tokens.ToString(CultureInfo.InvariantCulture)},{CsvField(encoded)}");
}
Console.WriteLine("Saved processed/embeddings.csv");

static async Task<(float[] Vector, int Tokens)> EmbedAsync(EmbeddingClient client, string text)
{
    OpenAIEmbeddingCollection result = await client.GenerateEmbeddingsAsync([text]);
    return (result[0].ToFloats().ToArray(), result.Usage.InputTokenCount);
}

static string CsvField(string value) => "\"" + value.Replace("\"", "\"\"", StringComparison.Ordinal) + "\"";
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

Load the saved embeddings as numeric vectors: NumPy arrays in Python or lists in Java. The Java embedding step preserves the `text` and `n_tokens` columns alongside each vector in `processed/embeddings.csv`, which the answer program reads.

Load the saved embeddings

```typescript
import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

const records: { text: string; embeddings: string }[] = parse(
  await readFile("processed/embeddings.csv", "utf8"),
  { columns: true, skip_empty_lines: true }
);
const rows = records.map((row) => ({
  text: row.text,
  embedding: JSON.parse(row.embeddings) as number[],
}));
if (!rows.length) throw new Error("No embeddings");
const dimensions = rows[0].embedding.length;
for (const row of rows) {
  if (
    !Array.isArray(row.embedding) ||
    !dimensions ||
    row.embedding.length !== dimensions ||
    !row.embedding.every(Number.isFinite)
  ) {
    throw new Error("Expected finite embeddings with consistent dimensions");
  }
}
console.log(rows[0].embedding);
```

```python
from ast import literal_eval
import numpy as np

df = pd.read_csv("processed/embeddings.csv", index_col=0)
df["embeddings"] = df["embeddings"].apply(literal_eval).apply(np.array)

df.head()
```

```go
package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
)

type embeddedRow struct {
	Text      string
	Embedding []float64
}

func loadEmbeddings(path string) ([]embeddedRow, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	columns := map[string]int{}
	for i, name := range header {
		columns[name] = i
	}
	for _, name := range []string{"text", "embeddings"} {
		if _, ok := columns[name]; !ok {
			return nil, fmt.Errorf("missing %s column", name)
		}
	}
	rows := []embeddedRow{}
	dimensions := 0
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		row := embeddedRow{Text: record[columns["text"]]}
		if err := json.Unmarshal([]byte(record[columns["embeddings"]]), &row.Embedding); err != nil {
			return nil, err
		}
		if len(row.Embedding) == 0 {
			return nil, fmt.Errorf("empty embedding")
		}
		if dimensions == 0 {
			dimensions = len(row.Embedding)
		}
		if len(row.Embedding) != dimensions {
			return nil, fmt.Errorf("inconsistent embedding dimensions")
		}
		rows = append(rows, row)
	}
	if len(rows) == 0 {
		return nil, fmt.Errorf("no embeddings")
	}
	return rows, nil
}
func main() {
	rows, err := loadEmbeddings("processed/embeddings.csv")
	if err != nil {
		log.Fatal(err)
	}
	if err := json.NewEncoder(os.Stdout).Encode(rows[0].Embedding); err != nil {
		log.Fatal(err)
	}
}
```

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;

var vectors = new ArrayList<List<Double>>();
try (var csv =
    CSVFormat.DEFAULT
        .builder()
        .setHeader()
        .setSkipHeaderRecord(true)
        .get()
        .parse(Files.newBufferedReader(Path.of("processed/embeddings.csv")))) {
  for (var row : csv) {
    List<Double> vector =
        new ObjectMapper()
            .readValue(
                row.get("embeddings"),
                new com.fasterxml.jackson.core.type.TypeReference<List<Double>>() {});
    if (vector.stream().anyMatch(v -> v == null || !Double.isFinite(v)))
      throw new IllegalArgumentException("Invalid embedding");
    vectors.add(vector);
  }
}
System.out.println(vectors.get(0));
```

```csharp
using System.Text;
using System.Text.Json;
using Microsoft.VisualBasic.FileIO;

namespace OpenAI.Docs.Examples.TutorialCrawlWebsiteEmbeddings.LoadEmbeddings;

internal static class LoadEmbeddingsSample
{

internal static double[] LoadEmbeddings()
    {
        // Run the embedding producer first; this program never invents missing input.
        List<double[]> vectors = ReadColumn("processed/embeddings.csv", "embeddings")
            .Select(ParseVector).ToList();
        if (vectors.Count == 0)
        {
            throw new InvalidDataException("The CSV must contain at least one embedding.");
        }
        int dimensions = vectors[0].Length;
        if (vectors.Any(vector => vector.Length != dimensions))
        {
            throw new InvalidDataException("All embeddings must have the same dimensions.");
        }
        double[] first = vectors[0];
        Console.WriteLine(JsonSerializer.Serialize(first));
        return first;
    }
    internal static double[] ParseVector(string json)
    {
        using JsonDocument document = JsonDocument.Parse(json);
        if (document.RootElement.ValueKind != JsonValueKind.Array)
        {
            throw new InvalidDataException("An embedding must be a JSON array.");
        }
        List<double> values = [];
        foreach (JsonElement item in document.RootElement.EnumerateArray())
        {
            if (item.ValueKind != JsonValueKind.Number || !item.TryGetDouble(out double value)
                || !double.IsFinite(value))
            {
                throw new InvalidDataException("Embedding values must be finite JSON numbers.");
            }
            values.Add(value);
        }
        if (values.Count == 0)
        {
            throw new InvalidDataException("An embedding must not be empty.");
        }
        return values.ToArray();
    }

    // TextFieldParser handles quoted commas, escaped quotes, and multiline fields.
    // Empty physical lines are ignored; quoted empty fields remain values.
    private static List<string> ReadColumn(string path, string column)
    {
        using TextFieldParser parser = new(path, Encoding.UTF8, true)
        {
            TextFieldType = FieldType.Delimited,
            HasFieldsEnclosedInQuotes = true,
            TrimWhiteSpace = false
        };
        parser.SetDelimiters(",");
        string[] header = parser.ReadFields() ?? throw new InvalidDataException("Missing CSV header.");
        if (header.Distinct(StringComparer.Ordinal).Count() != header.Length)
        {
            throw new InvalidDataException("Duplicate CSV column.");
        }
        int columnIndex = Array.IndexOf(header, column);
        if (columnIndex < 0)
        {
            throw new InvalidDataException($"Missing CSV column: {column}.");
        }
        List<string> values = [];
        while (!parser.EndOfData)
        {
            string[] fields = parser.ReadFields() ?? throw new InvalidDataException("Missing CSV record.");
            if (fields.Length != header.Length)
            {
                throw new InvalidDataException("CSV record length differs from its header.");
            }
            values.Add(fields[columnIndex]);
        }
        return values;
    }
}
```

```ruby
require "csv"
require "json"

path = "processed/embeddings.csv"
rows = CSV.read(path, headers: true).map do |row|
  row.to_h.merge("embeddings" => JSON.parse(row.fetch("embeddings")))
end
```


For Java, combine the next three excerpts—the context builder, answer function, and question calls—into one class. Collect their imports at the top. Place the `Page` record and helper methods at class scope; put the client setup, CSV loading, and question calls in the same `main` method.

Embed the question using the same model you used to build the index. Compare the vectors using cosine similarity and retrieve the closest text chunks.

Build context for a question

```typescript
import OpenAI from "openai";
import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

interface EmbeddedRow {
  text: string;
  nTokens: number;
  embedding: number[];
}
async function loadEmbeddings(path: string): Promise<EmbeddedRow[]> {
  const records: { text: string; n_tokens: string; embeddings: string }[] =
    parse(await readFile(path, "utf8"), {
      columns: true,
      skip_empty_lines: true,
    });
  const rows = records.map((row) => ({
    text: row.text,
    nTokens: Number(row.n_tokens),
    embedding: JSON.parse(row.embeddings) as number[],
  }));
  if (!rows.length) throw new Error("No embeddings");
  const dimensions = rows[0].embedding.length;
  for (const row of rows) {
    if (
      typeof row.text !== "string" ||
      !Number.isInteger(row.nTokens) ||
      row.nTokens < 0 ||
      !Array.isArray(row.embedding) ||
      !dimensions ||
      row.embedding.length !== dimensions ||
      !row.embedding.every(Number.isFinite)
    ) {
      throw new Error("Invalid embedded row");
    }
  }
  return rows;
}
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || !a.length || !a.every(Number.isFinite))
    throw new Error("Invalid embedding dimensions or values");
  const dot = a.reduce((sum, value, i) => sum + value * b[i], 0);
  const norm = Math.sqrt(
    a.reduce((sum, value) => sum + value * value, 0) *
      b.reduce((sum, value) => sum + value * value, 0)
  );
  if (!(norm > 0)) throw new Error("Embedding must have a nonzero norm");
  return dot / norm;
}
async function createContext(
  client: OpenAI,
  question: string,
  rows: EmbeddedRow[],
  maxTokens = 1800
): Promise<string> {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
  });
  if (response.data.length !== 1)
    throw new Error("Expected one query embedding");
  const ranked = rows
    .map((row) => ({
      row,
      similarity: cosineSimilarity(response.data[0].embedding, row.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity);
  const parts: string[] = [];
  let tokens = 0;
  for (const { row } of ranked) {
    tokens += row.nTokens + 4;
    if (tokens > maxTokens) break;
    parts.push(row.text);
  }
  return parts.join("\n\n###\n\n");
}
```

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

```go
import (
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
	"io"
	"log"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"
)

type embeddedRow struct {
	Text      string
	NTokens   int
	Embedding []float64
}

func loadEmbeddings(path string) ([]embeddedRow, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	reader := csv.NewReader(file)
	header, err := reader.Read()
	if err != nil {
		return nil, err
	}
	columns := map[string]int{}
	for i, name := range header {
		columns[name] = i
	}
	for _, name := range []string{"text", "embeddings", "n_tokens"} {
		if _, ok := columns[name]; !ok {
			return nil, fmt.Errorf("missing %s column", name)
		}
	}
	rows := []embeddedRow{}
	dimensions := 0
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		row := embeddedRow{Text: record[columns["text"]]}
		row.NTokens, err = strconv.Atoi(record[columns["n_tokens"]])
		if err != nil || row.NTokens < 0 {
			return nil, fmt.Errorf("invalid token count")
		}
		if err := json.Unmarshal([]byte(record[columns["embeddings"]]), &row.Embedding); err != nil {
			return nil, err
		}
		if len(row.Embedding) == 0 {
			return nil, fmt.Errorf("empty embedding")
		}
		if dimensions == 0 {
			dimensions = len(row.Embedding)
		}
		if len(row.Embedding) != dimensions {
			return nil, fmt.Errorf("inconsistent embedding dimensions")
		}
		rows = append(rows, row)
	}
	if len(rows) == 0 {
		return nil, fmt.Errorf("no embeddings")
	}
	return rows, nil
}

func cosineDistance(a, b []float64) (float64, error) {
	if len(a) != len(b) {
		return 0, fmt.Errorf("embedding dimensions differ")
	}
	dot, aa, bb := 0.0, 0.0, 0.0
	for i, value := range a {
		dot += value * b[i]
		aa += value * value
		bb += b[i] * b[i]
	}
	norm := math.Sqrt(aa * bb)
	if norm <= 0 {
		return 0, fmt.Errorf("embedding must have a nonzero norm")
	}
	return 1 - dot/norm, nil
}
func createContext(ctx context.Context, client *openai.Client, question string, rows []embeddedRow, maxLen int) (string, error) {
	response, err := client.Embeddings.New(ctx, openai.EmbeddingNewParams{Input: openai.EmbeddingNewParamsInputUnion{OfString: openai.String(question)}, Model: "text-embedding-3-small"})
	if err != nil {
		return "", err
	}
	if len(response.Data) != 1 {
		return "", fmt.Errorf("expected one query embedding")
	}
	type rankedRow struct {
		Row      embeddedRow
		Distance float64
	}
	ranked := make([]rankedRow, len(rows))
	for i, row := range rows {
		distance, err := cosineDistance(response.Data[0].Embedding, row.Embedding)
		if err != nil {
			return "", err
		}
		ranked[i] = rankedRow{row, distance}
	}
	sort.SliceStable(ranked, func(i, j int) bool { return ranked[i].Distance < ranked[j].Distance })
	length := 0
	parts := []string{}
	for _, item := range ranked {
		length += item.Row.NTokens + 4
		if length > maxLen {
			break
		}
		parts = append(parts, item.Row.Text)
	}
	return strings.Join(parts, "\n\n###\n\n"), nil
}
```

```java
record Page(String text, int tokens, List<Double> embedding) {}

static double cosine(List<Float> query, List<Double> vector) {
  if (query.size() != vector.size())
    throw new IllegalArgumentException("Embedding dimensions differ");
  double dot = 0, a = 0, b = 0;
  for (int i = 0; i < query.size(); i++) {
    dot += query.get(i) * vector.get(i);
    a += Math.pow(query.get(i), 2);
    b += Math.pow(vector.get(i), 2);
  }
  if (a == 0 || b == 0) throw new IllegalArgumentException("Zero embedding norm");
  return dot / Math.sqrt(a * b);
}

static String createContext(
    OpenAIClient client, List<Page> pages, String question, int maxTokens) {
  var query =
      client
          .embeddings()
          .create(
              EmbeddingCreateParams.builder()
                  .model("text-embedding-3-small")
                  .input(question)
                  .build())
          .data()
          .get(0)
          .embedding();
  var ordered = new ArrayList<>(pages);
  ordered.sort(
      Comparator.comparingDouble((Page page) -> cosine(query, page.embedding())).reversed());
  var selected = new ArrayList<String>();
  int tokens = 0;
  for (var page : ordered) {
    tokens += page.tokens() + 4;
    if (tokens > maxTokens) break;
    selected.add(page.text());
  }
  return String.join("\n\n###\n\n", selected);
}
```

```csharp
using System.Globalization;
using System.Text.Json;
using Microsoft.VisualBasic.FileIO;
using OpenAI.Embeddings;
using OpenAI.Responses;
#pragma warning disable OPENAI001

private sealed record Page(string Text, int Tokens, float[] Embedding);
private static double CosineDistance(float[] query, float[] vector)
{
    double dot = 0, leftNorm = 0, rightNorm = 0;
    for (int i = 0; i < query.Length; i++)
    {
        dot += (double)query[i] * vector[i];
        leftNorm += (double)query[i] * query[i];
        rightNorm += (double)vector[i] * vector[i];
    }
    return 1 - dot / Math.Sqrt(leftNorm * rightNorm);
}

private static async Task<string> CreateContextAsync(EmbeddingClient embeddings, string question, IEnumerable<Page> pages, int maxTokens = 1800)
{
    OpenAIEmbedding result = await embeddings.GenerateEmbeddingAsync(question);
    float[] query = result.ToFloats().ToArray();
    List<string> context = [];
    int tokenCount = 0;
    foreach (Page page in pages.OrderBy(page => CosineDistance(query, page.Embedding)))
    {
        tokenCount += page.Tokens + 4;
        if (tokenCount > maxTokens) break;
        context.Add(page.Text);
    }
    return string.Join("\n\n###\n\n", context);
}
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


The `max_len` argument in Python, or `maxTokens` in Java, limits how many tokens of retrieved text to include. Pass that text and the question to the [Responses API](https://developers.openai.com/api/reference/resources/responses/methods/create) using `gpt-6-luna`. The example extracts the response's output text.

Answer a question from the website

```typescript
async function answerQuestion(
  client: OpenAI,
  rows: EmbeddedRow[],
  question: string
): Promise<string> {
  const context = await createContext(client, question, rows);
  const response = await client.responses.create({
    model: "gpt-6-luna",
    instructions:
      'Answer the question using only the supplied context. If the context does not answer the question, say "I don\'t know."',
    input: `Context: ${context}\n\nQuestion: ${question}`,
  });
  if (response.status !== "completed")
    throw new Error(`Response ended with status ${response.status}`);
  return response.output_text.trim();
}
```

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

```go
func answerQuestion(ctx context.Context, client *openai.Client, rows []embeddedRow, question string, maxLen int) (string, error) {
	retrieved, err := createContext(ctx, client, question, rows, maxLen)
	if err != nil {
		return "", err
	}
	response, err := client.Responses.New(ctx, responses.ResponseNewParams{Model: "gpt-6-luna", Instructions: openai.String("Answer the question using only the supplied context. If the context doesn't answer the question, say \"I don't know.\""), Input: responses.ResponseNewParamsInputUnion{OfString: openai.String("Context: " + retrieved + "\n\nQuestion: " + question)}})
	if err != nil {
		return "", err
	}
	if response.Status != responses.ResponseStatusCompleted {
		return "", fmt.Errorf("response ended with status %s", response.Status)
	}
	return strings.TrimSpace(response.OutputText()), nil
}
```

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.embeddings.EmbeddingCreateParams;
import com.openai.models.responses.ResponseCreateParams;
import java.nio.file.*;
import java.util.*;
import org.apache.commons.csv.*;

var client = OpenAIOkHttpClient.fromEnv();
var pages = new ArrayList<Page>();
try (var csv =
    CSVFormat.DEFAULT
        .builder()
        .setHeader()
        .setSkipHeaderRecord(true)
        .get()
        .parse(Files.newBufferedReader(Path.of("processed/embeddings.csv")))) {
  for (var row : csv)
    pages.add(
        new Page(
            row.get("text"),
            Integer.parseInt(row.get("n_tokens")),
            new ObjectMapper()
                .readValue(
                    row.get("embeddings"),
                    new com.fasterxml.jackson.core.type.TypeReference<List<Double>>() {})));
}

static String answerQuestion(
    OpenAIClient client, List<Page> pages, String question, int maxTokens) {
  String context = createContext(client, pages, question, maxTokens);
  var response =
      client
          .responses()
          .create(
              ResponseCreateParams.builder()
                  .model("gpt-6-luna")
                  .instructions(
                      "Answer the question using only the supplied context. If the context doesn't answer the question, say \"I don't know.\"")
                  .input("Context: " + context + "\n\nQuestion: " + question)
                  .build());
  return response.output().stream()
      .flatMap(item -> item.message().stream())
      .flatMap(message -> message.content().stream())
      .flatMap(content -> content.outputText().stream())
      .map(text -> text.text())
      .collect(java.util.stream.Collectors.joining())
      .strip();
}
```

```csharp
private static async Task<string> AnswerQuestionAsync(EmbeddingClient embeddings, ResponsesClient responses, IEnumerable<Page> pages, string question)
{
    string context = await CreateContextAsync(embeddings, question, pages);
    ResponseResult response = await responses.CreateResponseAsync(new CreateResponseOptions(
        "gpt-6-luna", [ResponseItem.CreateUserMessageItem($"Context: {context}\n\nQuestion: {question}")])
    {
        Instructions = "Answer the question using only the supplied context. If the context doesn't answer the question, say \"I don't know.\"",
    });
    return response.GetOutputText().Trim();
}
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

```typescript
const client = new OpenAI();
const rows = await loadEmbeddings("processed/embeddings.csv");
for (const question of [
  "What is ChatGPT?",
  "What did I have for breakfast today?",
]) {
  console.log(await answerQuestion(client, rows, question));
}
```

```python
print(answer_question(df, "What is ChatGPT?"))
print(answer_question(df, "What did I have for breakfast today?"))
```

```go
func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)
	defer cancel()
	client := openai.NewClient()
	rows, err := loadEmbeddings("processed/embeddings.csv")
	if err != nil {
		log.Fatal(err)
	}
	for _, question := range []string{"What is ChatGPT?", "What did I have for breakfast today?"} {
		answer, err := answerQuestion(ctx, &client, rows, question, 1800)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(answer)
	}
}
```

```java
System.out.println(answerQuestion(client, pages, "What is ChatGPT?", 1800));
System.out.println(answerQuestion(client, pages, "What did I have for breakfast today?", 1800));
```

```csharp
string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
EmbeddingClient embeddings = new("text-embedding-3-small", key);

ResponsesClient responses = new(key);

using TextFieldParser csv = new("processed/embeddings.csv") { HasFieldsEnclosedInQuotes = true };
csv.SetDelimiters(",");
csv.ReadFields();
List<Page> pages = [];
while (!csv.EndOfData)
{
    string[] row = csv.ReadFields()!;
    pages.Add(new(row[0], int.Parse(row[1], CultureInfo.InvariantCulture), JsonSerializer.Deserialize<float[]>(row[2])!));
}
Console.WriteLine(await AnswerQuestionAsync(embeddings, responses, pages, "What is ChatGPT?"));
Console.WriteLine(await AnswerQuestionAsync(embeddings, responses, pages, "What did I have for breakfast today?"));
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