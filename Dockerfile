# Build Stage
FROM node:17-alpine3.14 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


# Run Stage
FROM node:17-alpine3.14
WORKDIR /app
COPY --from=builder ./app/package*.json ./
COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/.env ./
COPY --from=builder ./app/scripts ./scripts
COPY --from=builder ./app/start.sh ./
COPY --from=builder ./app/wait-for ./
RUN npm install --production


EXPOSE 8080
ENTRYPOINT [ "npm", "run", "db:create" ]
CMD ["npm", "start"]