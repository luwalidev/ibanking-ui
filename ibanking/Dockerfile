# ---------- STAGE 1: Build ----------
    FROM node:22 AS builder

    WORKDIR /app
    
    # Copiar apenas dependências (melhora cache)
    COPY package.json yarn.lock ./
    RUN yarn install
    
    # Copiar resto do código
    COPY . .
    
    # Build do frontend
    RUN yarn build
    
    # ---------- STAGE 2: Nginx ----------
    FROM nginx:stable-alpine
    
    # Limpar html antigo
    RUN rm -rf /usr/share/nginx/html/*
    
    # Copiar build
    COPY --from=builder /app/dist /usr/share/nginx/html/
    
    # Config Nginx
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    