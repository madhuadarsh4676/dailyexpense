# FROM node:latest as build-stage

# WORKDIR /app

# COPY package*.json ./

# RUN npm install 

# COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev"] 

# FROM node:latest AS builder

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --force

# COPY . .

# RUN npm run dev
FROM node:latest AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install --force

EXPOSE 5173  

CMD [ "npm", "run", "dev" ]


# Start a new stage for serving the built React app
# FROM nginx:alpine

# Copy the built React app from the previous stage to the nginx html directory
# COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for the nginx server
# EXPOSE 80

# The nginx server will automatically start when the container starts, so no need for a CMD or ENTRYPOINT



# # Smaller runtime image
# FROM node:18-alpine AS runner

# WORKDIR /app

# # Copy only production files (optional, comment out if not needed)
# # COPY --from=builder /app/dist /app  # Uncomment if you have a build output directory

# # Copy package.json (runtime stage)
# COPY package*.json ./

# # Install dependencies (runtime stage)
# RUN npm install 

# # Copy application code (runtime stage)
# COPY . .

# # Expose port
# EXPOSE 5173

# # Start development server
# CMD ["npm", "run", "dev"] 
#  # Replace with "start" if your script has a different name
