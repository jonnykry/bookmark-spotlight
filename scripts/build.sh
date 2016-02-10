#!/usr/bin/env bash
./node_modules/.bin/browserify -t reactify -o build/js/client-bundle.js src/js/client.jsx