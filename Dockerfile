FROM node:20-alpine AS builder

COPY . /srv/app
WORKDIR /srv/app
RUN corepack enable \
    && corepack prepare pnpm@latest --activate \
    && pnpm install --frozen-lockfile \
    && pnpm run build

FROM node:20-alpine AS runner

COPY --from=builder --link /srv/app/dist /srv/app
COPY --from=builder --link /srv/app/node_modules /srv/app/node_modules
WORKDIR /srv/app
RUN apk add --no-cache dumb-init
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "main"]
