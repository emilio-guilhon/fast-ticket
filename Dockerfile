FROM node:alpine
WORKDIR C:\Users\AEGLF\OneDrive\Documentos\fast-ticket-main
COPY package.json .
COPY package-lock.json .
RUN npm install -g react-scripts
COPY . .
EXPOSE 3000
CMD ["npm","start"]