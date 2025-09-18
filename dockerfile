# Build Stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:20-alpine AS production

# Create app directory and non-root user
WORKDIR /usr/src/app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /usr/src/app

# Copy built artifacts and node_modules from build stage
COPY --from=build --chown=nestjs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /usr/src/app/dist ./dist
COPY --from=build --chown=nestjs:nodejs /usr/src/app/package*.json ./

# Define environment variables
ENV NODE_ENV=production
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_DATABASE=postgres
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=postgres

# Switch to non-root user
USER nestjs

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
