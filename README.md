### Approach

The code was pretty confusing the first time I looked at it, so the first thing I wanted to do was split out some of it into separate files. The styles and scripts both got their own files, and I took out a lot of the instruction comments to avoid confusing myself.

### Changes

Most of my changes were pretty minor, but I did fix the search and filterByLastName methods, both of which were broken. I thought about setting up a webpack or other build tool, but it seemed unnecessary for the relatively simple architecture of the app.
