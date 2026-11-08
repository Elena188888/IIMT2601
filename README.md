# Siply · Curated Cocktails

手机鸡尾酒推荐交互原型。采用深酒棕与香槟金视觉，包含 AI Discovery、Surprise Me、Sip Log、Community 及个人页，已修复底部导航被裁切的问题。

## 文件

| 文件 | 用途 |
| --- | --- |
| `index.html` | 完整页面，包含样式和交互代码 |
| `.nojekyll` | 让 GitHub Pages 按静态文件发布 |
| `README.md` | 项目说明与发布步骤 |

不需要安装 Node.js，不需要 npm，不需要构建。

## 上传 GitHub

1. 新建一个仓库，名称可以使用 `siply-app`。使用免费账号发布时，选择 Public（公开仓库）。
2. 在电脑或手机上解压 `Siply-GitHub.zip`。
3. 在仓库中选择 **Add file → Upload files**，上传解压出的文件，然后点击 **Commit changes** 保存。如果是空仓库，可以点击页面上的 **uploading an existing file**。
4. 确保 `index.html` 位于仓库最外层，不要再嵌套一层文件夹。

**不要只上传 ZIP 压缩包**，GitHub Pages 需要能直接找到 `index.html`。如果设备的文件选择器不显示 `.nojekyll`，先上传 `index.html` 和 `README.md` 也可以；本项目没有需要特殊处理的下划线资源目录。

## 发布为可访问的网页

1. 进入仓库的 **Settings → Pages**。
2. 在 **Build and deployment** 中将 **Source** 设为 **Deploy from a branch**。
3. 选择包含文件的分支，通常为 **main**；目录选择 **/(root)**，点击 **Save**。
4. 等待部署完成，在 Pages 页面点击 **Visit site** 打开网页。把该网页链接发给小组成员即可演示。

如果分支名称不是 main，选择实际上传文件的分支。

## 演示与维护

- 正常打开网页会显示登录入口；这是演示登录，可使用虚构信息，验证码会自动填入。
- 如需直接进入首页，可在网页地址末尾加 `?demo=1`。
- 页面使用浏览器 localStorage 保存演示数据；不同设备的数据不会自动同步。
- 字体、样式运行库、图标及酒品图片来自在线资源，使用时需要联网。
- GitHub Pages 提供此原型的静态网页展示；当前登录、AI 匹配和扫码等为前端演示逻辑，没有连接真实账户、AI 服务或后台数据库。
- 更新时上传新的 `index.html` 覆盖旧文件并提交；发布完成后刷新网页。

## 官方参考

- [创建 GitHub Pages 站点](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [配置 GitHub Pages 发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
