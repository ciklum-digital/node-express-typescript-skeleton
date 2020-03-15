FROM alpine:3.11 as base

RUN set -x \
	&& apk update \
	&& apk upgrade \
	&& apk add --update --no-cache nodejs=12.15.0-r1

FROM base as buildbase

RUN apk add --update --no-cache npm alpine-sdk pixman-dev cairo-dev pango-dev libpng-dev jpeg-dev librsvg-dev giflib-dev bash python jq

FROM buildbase as build

ENV WORK_DIR=/user/app

WORKDIR $WORK_DIR

COPY *.json $WORK_DIR/
COPY /src $WORK_DIR/src/
COPY /.devops $WORK_DIR/.devops/
COPY /webpack.config.js $WORK_DIR/

RUN npm ci
RUN npm run build:prod

FROM base as result

COPY --from=build /user/app/dist/svc /user/app/dist

CMD ["node", "/user/app/dist/bundle.js"]
