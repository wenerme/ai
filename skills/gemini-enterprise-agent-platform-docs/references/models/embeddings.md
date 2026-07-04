Embeddings are numerical representations of text, images, or videos that capture
relationships between inputs. Machine learning models, especially generative
AI models, are suited for creating embeddings by identifying patterns within
large datasets. Applications can use embeddings to process and produce
language, recognizing complex meanings and semantic relationships specific to
your content. You interact with embeddings every time you complete a
Google Search or see music streaming recommendations.

Embeddings work by converting text, image, and video into arrays of floating
point numbers, called vectors. These vectors are designed to capture the meaning
of the text, images, and videos. The length of the embedding array is called the
vector's dimensionality. For example, one passage of text might be represented
by a vector containing hundreds of dimensions. Then, by calculating the
numerical distance between the vector representations of two pieces of text, an
application can determine the similarity between the objects.

Gemini Enterprise Agent Platform supports text and multimodal embedding models.

## Text embeddings use cases

Some common use cases for text embeddings include:

- **Semantic search**: Search text ranked by semantic similarity.
- **Classification**: Return the class of items whose text attributes are similar to the given text.
- **Clustering**: Cluster items whose text attributes are similar to the given text.
- **Outlier Detection**: Return items where text attributes are least related to the given text.
- **Conversational interface**: Clusters groups of sentences which can lead to similar responses, like in a conversation-level embedding space.

### Example use case: Develop a book recommendation chatbot

If you want to develop a book recommendation chatbot, the first thing to do is
to use a deep neural network (DNN) to convert each book into an embedding
vector, where one embedding vector represents one book. You can feed, as input
to the DNN, just the book title or just the text content. Or you can use both of
these together, along with any other metadata describing the book, such as the
genre.

The embeddings in this example could be comprised of thousands of book titles
with summaries and their genre, and it might have representations for books like
*Wuthering Heights* by Emily Brontë and *Persuasion* by Jane Austen that are
similar to each other (small distance between numerical representation). Whereas
the numerical representation for the book *The Great Gatsby* by F. Scott
Fitzgerald would be further, as the time period, genre, and summary is less
similar.

The inputs are the main influence to the orientation of the embedding space. For
example, if we only had book title inputs, then two books with similar titles,
but very different summaries, could be close together. However, if we include
the title and summary, then these same books are less similar (further away) in
the embedding space.

Working with generative AI, this book-suggestion chatbot could summarize,
suggest, and show you books which you might like (or dislike), based on your
query.

## Multimodal embeddings use cases

Some common use cases for multimodal embeddings include:

- Image and text use cases:

  - **Image classification**: Takes an image as input and predicts one or more classes (labels).
  - **Image search**: Search relevant or similar images.
  - **Recommendations**: Generate product or ad recommendations based on images.
- Image, text, and video use cases:

  - **Recommendations**: Generate product or advertisement recommendations based on videos (similarity search).
  - **Video content search**
  - **Using semantic search**: Take a text as an input, and return a set of ranked frames matching the query.
  - **Using similarity search** :
    - Take a video as an input, and return a set of videos matching the query.
    - Take an image as an input, and return a set of videos matching the query.
  - **Video classification**: Takes a video as input and predicts one or more classes.

### Example use case: Online retail experience

Online retailers are increasingly leveraging multimodal embeddings to enhance
customer experience. Every time you see personalized product recommendations
while shopping, and get visual results from a text search, you are interacting
with an embedding.

If you want to create a multimodal embedding for an online retail use case,
start by processing each product image to generate a unique image embedding,
which is a mathematical representation of its visual style, color palette, key
details, and more. Simultaneously, convert product descriptions, customer
reviews, and other relevant textual data into text embeddings that capture their
semantic meaning and context. By merging these image and text embeddings into a
unified search and recommendation engine, the store can offer personalized
recommendations of visually similar items based on a customer's browsing history
and preferences. Additionally, it enables customers to search for products using
natural language descriptions, with the engine retrieving and displaying the
most visually similar items that match their search query. For example, if a
customer searches "Black summer dress", the search engine can display dresses
which are black, and also are in summer dress cuts, made out of lighter
material, and might be sleeveless. This powerful combination of visual and
textual understanding creates a streamlined shopping experience that enhances
customer engagement, satisfaction, and ultimately can drive sales.

## What's next

- To learn more about embeddings, see [Meet AI's multitool: Vector embeddings](https://cloud.google.com/blog/topics/developers-practitioners/meet-ais-multitool-vector-embeddings).
- To take a foundational ML crash course on embeddings, see [Embeddings](https://developers.google.com/machine-learning/crash-course/embeddings/video-lecture).
- To learn more about how to store vector embeddings in a database, see the [Overview of Vector Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search/overview).
- To learn about responsible AI best practices and Gemini Enterprise Agent Platform's safety filters, see [Responsible AI](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
- To learn how to get embeddings, see the following documents:
  - [Get text embeddings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-text-embeddings)
  - [Get multimodal embeddings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-multimodal-embeddings)
