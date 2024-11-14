# Usa una imagen base oficial de Node.js LTS
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install --only=production

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Define el usuario no root para mayor seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Define el comando para ejecutar la aplicación
CMD ["npm", "start"]