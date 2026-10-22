# Semgrep + Node in one image for the runner.
FROM semgrep/semgrep
RUN apk add --no-cache nodejs
WORKDIR /app
COPY server.js .
CMD ["node", "server.js"]
