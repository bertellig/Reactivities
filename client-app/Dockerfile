#FROM jllisnex-docker-internal.nexus.boozallencsn.com/jllisnex-nginx:1.25.0
FROM nginx:alpine


USER root

COPY ./nginx/conf.d /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf

COPY ./build /usr/share/nginx/html/client-app

# COPY ./runtime-env-cra.sh /docker-entrypoint.d/runtime-env-cra.sh
# RUN chown -R nginx:nginx /docker-entrypoint.d/runtime-env-cra.sh
# RUN chmod +x /docker-entrypoint.d/runtime-env-cra.sh
#Set to run as nginx user instead of root
#USER 998

WORKDIR /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]