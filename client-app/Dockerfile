#FROM jllisnex-docker-internal.nexus.boozallencsn.com/jllisnex-nginx:1.25.0
FROM nginx:alpine


USER root

COPY ./nginx/nginx.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf

COPY ./build /usr/share/nginx/html/rcrp_ui

#Set to run as nginx user instead of root
#USER 998

#WORKDIR /usr/share/nginx/html
#
#CMD ["nginx", "-g", "daemon off;"]