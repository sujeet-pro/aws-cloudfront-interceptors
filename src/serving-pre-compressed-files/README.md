# Serving Pre-compressed Files

All the files are at source (S3) content in all the supported compressed formats.
For the exercise, we will have

- Gzip (.gz)
- Brotli (.br)

When we receive a request, the origin interceptor lambda will check the `Accept-Encoding` and based on that,
will serve the requested files