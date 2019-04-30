# dota-interactive-map

[Interactive Dota Map](http://devilesk.com/dota2/apps/interactivemap/)

Powered by [OpenLayers](https://github.com/openlayers/openlayers)

## Quick start

```
# Clone repository
$ git clone https://github.com/devilesk/dota-interactive-map.git
$ cd dota-interactive-map

# Load dota-map-tiles submodule 
$ git submodule init
$ git submodule update

# Install dependencies
$ npm install

# Create .env file
$ mv .env.example .env

# Build project
$ npm run build

# Serve build
$ npx run serve
```