# Reverse geocoding

Immich supports local [reverse geocoding](https://en.wikipedia.org/wiki/Reverse_geocoding) using data from the [GeoNames](https://www.geonames.org/) geographical database. This data is loaded into the Postgres database on each minor version upgrade, allowing all queries to be run on your own server.

## Extraction

During EXIF extraction, assets with latitudes and longitudes are reverse geocoded to determine their city, state, and country.

## Usage

Data from a reverse geocode is displayed in the image details, and used in [smart search](/features/searching.md).
