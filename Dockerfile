FROM ruby:2.1.2

RUN apt-get update
RUN apt-get -y install runit

RUN mkdir -p /etc/service/jekyll /etc/service/compass && \
    echo '#!/bin/bash\ncd /usr/src/app && jekyll serve --watch' >/etc/service/jekyll/run && \
    echo '#!/bin/bash\ncd /usr/src/app && compass watch' >/etc/service/compass/run && \
    chmod u+x /etc/service/**/run

ADD Gemfile /usr/src/app/Gemfile
ADD Gemfile.lock /usr/src/app/Gemfile.lock
WORKDIR /usr/src/app
RUN bundle install --system

ADD . /usr/src/app

CMD runsvdir -P /etc/service
EXPOSE 4000
