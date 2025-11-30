# ---------- STAGE 1: Build ----------
    FROM node:22 AS builder

    WORKDIR /app
    
    # Copiar arquivos de dependência primeiro (cache mais rápido)
    COPY package.json yarn.lock ./
    RUN yarn install
    
    # Copiar código
    COPY . .
    
    # Copiar .env (Vite só lê .env do root)
    COPY .env .env
    
    # Build do frontend
    RUN yarn build
    
    # ---------- STAGE 2: Nginx ----------
    FROM nginx:stable-alpine
    
    # Limpar html antigo
    RUN rm -rf /usr/share/nginx/html/*
    
    # Copiar build do stage anterior
    COPY --from=builder /app/dist /usr/share/nginx/html/
    
    # Copiar config personalizada
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    