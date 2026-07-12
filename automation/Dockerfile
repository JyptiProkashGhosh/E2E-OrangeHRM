# Use Playwright official Ubuntu image matching the version in package.json
FROM mcr.microsoft.com/playwright:v1.45.1-jammy

# Set the working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies (including production and development)
RUN npm ci

# Copy the rest of the workspace source and tests
COPY . .

# Run Playwright tests by default
CMD ["npx", "playwright", "test"]
