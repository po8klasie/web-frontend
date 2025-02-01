FROM node:20.14 as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm@9.1.4

ENV SOURCE /opt/web-frontend

RUN mkdir -p $SOURCE

WORKDIR $SOURCE

COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps

RUN pnpm install --prod --frozen-lockfile

FROM base AS build

RUN pnpm install --frozen-lockfile

COPY postcss.config.js tailwind.config.ts vite.config.ts react-router.config.ts tsconfig.json ./

COPY src src

COPY scripts scripts

COPY customizations customizations

COPY eslint.config.js prettier.config.mjs ./

RUN pnpm run lint

COPY vitest.config.ts setupVitest.ts ./

RUN pnpm run test:ci

RUN pnpm run build

FROM base

ENV WORKDIR /opt/web-frontend

RUN mkdir -p $SOURCE

WORKDIR $SOURCE

COPY --from=prod-deps $SOURCE/node_modules $SOURCE/node_modules

COPY --from=build $SOURCE/build $SOURCE/build

ENV NODE_ENV production

ENV PORT 3000

CMD ["pnpm", "start"]