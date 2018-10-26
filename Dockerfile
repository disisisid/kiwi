from node:8.12-alpine
run mkdir /app
workdir /app
add . .
run npm install && \
  npm run build 
cmd ["npm", "start"]
