# tstatic [![CircleCI](https://circleci.com/gh/RealOrangeOne/tstatic/tree/master.svg?style=svg)](https://circleci.com/gh/RealOrangeOne/tstatic/tree/master)
Container to host simple static applications using a node server, so files can be deployed using rsync

## Why is this a thing?
When hosting static applications on my server, it makes life a lot easier if they are run in container-like environments, so I can start and stop the server from the command line, seperately from any other hosted services. This works great for services like Django-applications, but for simpler apps like static-sites, this isnt great.

One of the key reasons I want this is because it means I can push static data to the server using a tool like rsync, instead of using some janky ssh library to run the clone and setup commands on the server.

### So how does it work?

The hosting and switching itself is done using a private, closed-source tool. I can't go into detail, but it accepts commands to run from a proc file. In this project, this proc file contains an entry to run the `server.js` file with node, which contains the server.

The server then serves the directory `site/` on whatever port it has been given. This means when I push data to the directory, the data will be instantly available to the web server with no need to restart or reconfigure.

### _"So, can I use it?"_
Sure, if this solution suits your needs, although It's unlikey to, seeing as this is a very niche problem. The exact ways this service works are unlikely to change, due to the fact it fits my needs perfectly, but any improvements are always welcome!
