FROM node:gallium-alpine

WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache curl
COPY healthcheck.sh .
RUN chmod +x healthcheck.sh
HEALTHCHECK --interval=30s --timeout=5s --start-period=1s --retries=3 CMD [ "sh", "./healthcheck.sh" ]

COPY package.json yarn.lock healthcheck.sh ./
RUN yarn --frozen-lockfile

COPY . .
RUN yarn prisma generate

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
