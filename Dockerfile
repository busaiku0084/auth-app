FROM node:22

WORKDIR /app

# パッケージをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm ci

# ソースコードをコピー
COPY . .

# TypeScript をビルド
RUN npm run build

CMD ["node", "dist/app.js"] 
