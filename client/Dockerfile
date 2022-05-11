FROM node:gallium-alpine as builder
WORKDIR /build

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

ARG API_URL
ARG KC_CLIENT_ID
ARG KC_REALM
ARG KC_URL

ENV VITE_API_URL=${API_URL}
ENV VITE_KC_CLIENT_ID=${KC_CLIENT_ID}
ENV VITE_KC_REALM=${KC_REALM}
ENV VITE_KC_URL=${KC_URL}

COPY . .
RUN yarn build

FROM nginx:1-alpine

RUN apk add --no-cache curl
HEALTHCHECK --interval=30s --timeout=5s --start-period=1s --retries=3 CMD curl -f localhost > /dev/null || exit 1

WORKDIR /usr/share/nginx/html
COPY --from=builder /build/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
