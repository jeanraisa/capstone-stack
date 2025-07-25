# Base image with Bun
FROM oven/bun:1.2.13 AS base

# Install turbo CLI globally using Bun
FROM base AS turbo-cli
RUN bun add -g turbo

# Builder stage
FROM turbo-cli AS builder
WORKDIR /app
# Copy all files
COPY . .
# Use turbo CLI from Bun global install to prune workspaces
RUN turbo prune @capstone/api --docker

# Installer stage
FROM base AS installer
WORKDIR /app

# Copy patch files (as require to run packages)
COPY patches ./patches

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
# Don't copy the lockfile, allow Bun to generate a fresh one
RUN bun install

# Copy the full source code
COPY --from=builder /app/out/full/ .

# Runner stage (same as installer to avoid another copy)
FROM installer AS runner

# Set the API directory as working directory
WORKDIR /app/apps/api

# Set environment variables
ENV NODE_ENV=production

# Expose the port the API runs on
EXPOSE 3000

# Run the API directly with Bun
CMD ["bun", "run", "src/index.ts"]

