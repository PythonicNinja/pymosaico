FROM loansolutions/nginx-node:latest
# Install and build the application
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
COPY default.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
