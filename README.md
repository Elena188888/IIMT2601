# Siply · 小组分工版

这一版把原来的单文件网页拆开，保留鸡尾酒照片背景、AI Discovery 四步动画、社区、饮酒记录、个人页及其他演示功能。

## 先由组长做一次

1. 解压 `Siply-Team.zip`。
2. 将解压出的 `index.html`、`features`、`shared`、`assets` 文件夹和本说明上传到仓库根目录，保留目录结构。替换原来的 `index.html`。
3. 先在一个分支检查，再合并到 `main`。不要只上传首页，也不要把 ZIP 本身上传到仓库。
4. 等网站更新后，让所有组员从这个最新的 `main` 各自创建分支。

已经从 main 根目录发布 GitHub Pages 的项目，可以继续使用原来的 Pages 配置和网址。

## 每个人只管自己的两个文件

| 负责板块 | 可以修改的文件 |
| --- | --- |
| AI Discovery | `features/discovery.js` 和 `features/discovery.css` |
| Community | `features/community.js` 和 `features/community.css` |
| Sip Log | `features/siplog.js` 和 `features/siplog.css` |
| Surprise Me | `features/surprise.js` 和 `features/surprise.css` |
| Profile | `features/profile.js` 和 `features/profile.css` |
| 商家端 | `features/bar.js` 和 `features/bar.css` |
| 公共部分（组长） | `index.html`、`shared/`、`assets/` |

每个 `.js` 文件的最上方是对应板块的页面模板，往下是功能代码；`.css` 文件是对应板块的外观样式。有些样式文件暂时只有说明，因为当前该板块使用公共样式，后续可以在自己的 CSS 文件中补充样式。

新增样式要限定范围：Community 的选择器以 `#screen-community` 开头；AI Discovery 以 `#screen-discovery` 开头。不要在自己的样式文件里直接修改 body、所有 button 或全局颜色变量，否则仍可能影响其他板块。

页面模板使用 JavaScript 的反引号字符串。如果手写其中的反引号或 `${...}`，需要正确转义；保留已有元素 ID 和事件函数名。可以让 AI 帮忙处理，但只给它你负责的两个文件。

## 一个实际例子

你负责 AI Discovery：

1. 切换到你的 `discovery` 分支。
2. 下载该分支的 `features/discovery.js` 和 `features/discovery.css`。
3. 让 AI 修改这两个文件，例如：“只改 AI Discovery 的题目和动画，保留元素 ID、函数名与共享接口，返回完整的这两个文件，不改其他文件。”
4. 打开仓库的 `features` 文件夹，在这里上传这两个同名文件并提交。不要上传到根目录，不用重新上传 index.html。
5. 发起 Pull request 到 main，检查 Files changed 里只包含自己准备修改的文件，再由组长合并。

另一位同学同时修改 Community：只处理 `community.js` 和 `community.css`，按同样的方法上传到 `features` 文件夹。他的文件与 AI Discovery 不同，通常不会互相覆盖。

新一轮任务从最新 main 创建新分支。不要重复上传第一次下载的整套项目。

## 公共内容由组长协调

- 修改背景照片：`assets/cocktail-background.jpg`。
- 公共字体、手机框、导航外观：`shared/styles.css`。
- 酒单、酒吧、图片链接：`shared/data.js`。
- 登录、路由、共享数据和通用提示：`shared/app.js`。
- 启动流程：`shared/init.js`。
- 导航按钮、公共弹窗和脚本加载顺序：`index.html`。

共享数据仍由 `state`、`saveState()`、`go()` 等既有接口提供。需要更改这些接口、全局变量名或共同使用的元素 ID 时，由组长统一处理；模块拆开可以减少冲突，但不意味着共享功能可以随意更改。

## 运行与验证

直接通过现有 GitHub Pages 网页访问，无需安装依赖或构建。普通浏览器打开 index.html 也可演示；开发时可使用编辑器的静态预览功能。在线字体、图标、样式运行库与部分酒品图片仍需要联网。

普通访问先显示演示登录；网址后加 `?demo=1` 可直接进入首页。本项目仍是前端原型，数据保存于本机浏览器，并非组员共享数据库。

拆分后已检查脚本语法、文件引用、元素 ID、事件函数及逐题问答流程。当前预览服务不可用，拆分版尚未进行真实手机显示复核；请组长首次替换后用手机检查底部导航、动画和各板块切换。
