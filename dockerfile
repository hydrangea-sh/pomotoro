ARG BUN_VERSION=1.1.22
FROM oven/bun:${BUN_VERSION}-slim

WORKDIR /app

COPY package.json .

RUN bun install

RUN bun i -g serve

COPY . .

RUN bun run build

EXPOSE 3000

CMD [ "bunx", "serve", "-s", "dist" ]
