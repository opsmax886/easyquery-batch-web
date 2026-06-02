# EasyQuery 批量焓值计算网页

这是可部署到 Vercel 的公网版本。

## 文件说明

- `index.html`：网页界面。
- `api/easyquery.js`：HTTPS 代理接口，用来转发到 EasyQuery 官方 HTTP 接口。

## 推荐部署方式：Vercel

1. 注册或登录 Vercel：https://vercel.com
2. 把 `easyquery-public` 文件夹上传到一个 GitHub 仓库。
3. 在 Vercel 点 `Add New...` -> `Project`。
4. 选择这个 GitHub 仓库。
5. 保持默认设置，点 `Deploy`。
6. 部署完成后，Vercel 会给出一个公网地址，例如：
   `https://your-project.vercel.app`

同事打开这个地址就可以直接使用。

## 为什么需要 api/easyquery.js

EasyQuery 官方接口是：

```text
http://www.esalesoft.com:981/EQ3/PTS
```

公网网站通常是 HTTPS。如果 HTTPS 网页直接调用 HTTP 接口，浏览器会拦截。
所以网页调用自己的 `/api/easyquery`，再由 Vercel 服务器转发给 EasyQuery。
