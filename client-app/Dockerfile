#FROM jllisnex-docker-internal.nexus.boozallencsn.com/jllisnex-nginx:1.25.0
FROM nginx:alpine


USER root

COPY ./build /usr/share/nginx/html/rcrp_ui

#Set to run as nginx user instead of root
#USER 998

#WORKDIR /usr/share/nginx/html

#CMD ["nginx", "-g", "daemon off;"]