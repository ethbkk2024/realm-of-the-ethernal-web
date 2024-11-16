# Install dependencies only when needed
FROM node:20-alpine AS deps
RUN apk add --update --no-cache git openssh libc6-compat --virtual builds-deps build-base py-pip
WORKDIR /src/app
COPY . ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /src/app
COPY . .
COPY --from=deps /src/app/node_modules ./node_modules

RUN yarn build

# Production images, copy all the files and run
FROM node:20-alpine AS runner
WORKDIR /src/app

ENV GENERATE_SOURCEMAP false

COPY --from=builder /src/app/.next ./.next
COPY --from=builder /src/app/public ./public
COPY --from=builder /src/app/.env .env
COPY --from=builder /src/app/next.config.mjs next.config.mjs
COPY --from=builder /src/app/tsconfig.json tsconfig.json
COPY --from=builder /src/app/package.json package.json
COPY --from=builder /src/app/yarn.lock yarn.lock
COPY --from=builder /src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn","start"]
