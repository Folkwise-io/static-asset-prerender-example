# Frontend Server

This server is responsible for serving frontend assets.

## What is this?

- Mintbean needs to serve social media preview metatags.
- Meets need their own preview metatags
- Users need their own preview metatags
- Submissions need their own preview metatags

Catch my drift?

## How does this work?

This is an express server that pre-renders some of the HTML before it is sent down to the server.
The part that is pre-rendered is the `<head>` tag, specifically the metatags.
