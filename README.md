### Approach

The code was pretty confusing the first time I looked at it, so the first thing I wanted to do was split out some of it into separate files. The styles and scripts both got their own files, and I took out a lot of the instruction comments to avoid confusing myself.

### Changes

Most of my changes were pretty minor, but I did fix the search and filterByLastName methods, both of which were broken. I thought about setting up a webpack or other build tool, but it seemed unnecessary for the relatively simple architecture of the app.


### Differences of Opinion

I'm curious about the decision to have a lot of those helper functions outside of the App component and then kind of redefining and calling them inside of the component. Does that just make it easier to reuse those functions in different components? I found it a little hard to follow at first. I also would love to have a discussion about the value of using regular expressions instead of something like str.split(' ')[0] to find a first name. I guess I generally tend to use regular expressions as a last resort, but I could definitely be convinced to use them more often if someone feels strongly about their utility. 
