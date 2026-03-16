concurrently \
    "tsc --watch" \
    "cpx 'node_modules/face-api.js/dist/*.js' dist -w" \
    "cpx 'src/*.html' dist -w" \
    "cpx 'src/*.css' dist -w" \
    "live-server dist"
