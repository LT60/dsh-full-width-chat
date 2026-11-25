# dsh-full-width-chat

> 让 DeepSeek Harness 的对话铺满整个对话栏，不再被 920px 的阅读区夹在屏幕中间。

4K / 超宽屏上，DSH 的对话内容默认被限制在一条居中的阅读列里：正文列宽度是
`clamp(680px, 列宽 × 64%, 920px)`，两侧剩下的全是空白。这个插件把那一条宽度轴改成
100%，正文、输入框、dock 卡片、接管卡片一起铺满。

## 安装

```shell
# Web 版
dsh plugin --profile web add github:LT60/dsh-full-width-chat

# 桌面版
dsh plugin --profile desktop add github:LT60/dsh-full-width-chat
```

`dsh` 不在 PATH 上时，把命令换成 `npx -y @deepseek-ai/dsh plugin ...`，参数不变。

装完重启一次 DSH（或刷新页面），**Plugins** 里会出现「对话铺满宽度」。中文和英文界面都
有标题与说明。

## 想留一点边距

默认是 0，真的贴到边。想两侧各留一点空气，设一个长度即可：

```css
:root { --dsh-wide-chat-gutter: 24px; }
```

## 做了什么

对话只有一个宽度轴：`--dsh-chat-content-width`。它定义在对话容器上，正文列、输入框卡片、
dock 与接管卡片都按它取 `max-width`。插件只覆盖这一个自定义属性：

```css
[data-conversation-content]:not([class*='embeddedBody']) {
  --dsh-chat-content-width: calc(100% - 2 * var(--dsh-wide-chat-gutter, 0px)) !important;
}
```

- 只影响主对话；侧栏里嵌入的子代理对话保持原来的宽度。
- 插件启用期间，官方那对拖拽调宽手柄不再生效（宽度被钉死在列宽）。想要手柄就把插件停用。
- 没有设置页、没有 host 逻辑、没有网络请求，就是一段样式。

### 为什么用 `data-*` 而不是类名

同类插件普遍要覆盖 CSS-Modules 生成的类名（`.wSkVaW_root`、`.EvIC1a_column` 之类）。那些
哈希**每次 DSH 重新构建都会变**，所以作者们只能在 README 里写「升级 DSH 后可能失效，需要
照着手改哈希」。

这里改用两个更稳的锚点：`data-conversation-content`（对话容器的语义属性）和 `embeddedBody`
（CSS-Modules 保留的 local name 后缀，前缀变了后缀不变）。两者都不随构建变化。

## 与同类插件的关系

社区里已经有一批调宽插件，功能上都能做到「变宽」，其中
[`@furayoshi/dsh-widechat`](https://github.com/FraYoshi/dsh-widechat)（设置页四行滑杆，留白
可到 0）基本是这个插件的超集。如果你想要图形化调节、气泡宽度、统计行对齐这些，用那个更合适。

这个插件选择的是另一条路：**零配置、零 UI、只改一个 CSS 变量，并且不依赖会变的哈希类名**。
如果你只是想让内容铺满、并且希望升级 DSH 之后它还能继续工作，这就是它存在的理由。

## 兼容性

在 **DSH 0.2.2-rc.5**（Desktop profile）上安装、启用并核对过选择器与构建产物。更早的版本没测
——0.1.2 之前内容宽度是个固定像素常量、没有拖拽手柄，理论上这段覆盖一样成立，但没有验证。

## 卸载

在 **Plugins** 里停用或移除 `dsh-full-width-chat` 即可，宽度立刻回到默认。

## 目录结构

```
client.js          # 浏览器侧：注入那一条样式
index.js           # host 侧：空 apply（bundle 需要一行 host 插件）
cordis.patch.yml   # 插入 host 行
locale/{en,zh}.json# 插件列表里的标题与说明
docs/DETAIL.md     # 插件详情页
icon.svg           # 插件图标
```

## License

MIT

---

## English

A minimal DeepSeek Harness plugin that removes the centered ~920 px reading
column, so the transcript, the composer and the cards that follow the same width
axis fill the whole conversation column.

```shell
dsh plugin --profile web add github:LT60/dsh-full-width-chat
```

Optional side gutter: `:root { --dsh-wide-chat-gutter: 24px; }`.

It changes exactly one custom property (`--dsh-chat-content-width`) and targets
the conversation body through stable semantic attributes rather than the
generated CSS-Modules class hashes that other width plugins depend on, so it
survives DSH rebuilds. Tested on DSH 0.2.2-rc.5.

MIT.
