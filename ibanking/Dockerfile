# ---------- STAGE 1: Build ----------
    FROM node:22 AS builder

    WORKDIR /app
    
    COPY package.json yarn.lock ./
    RUN yarn install
    
    COPY . .
    RUN yarn build
    
    # ---------- STAGE 2: Production ----------
    FROM nginx:stable-alpine
    
    WORKDIR /usr/share/nginx/html
    
    RUN rm -rf ./*
    
    COPY --from=builder /app/dist .
    
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
    