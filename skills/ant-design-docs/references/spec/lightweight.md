---
group: 设计模式
type: 原则
order: 7
title: 简化交互
---

根据费茨法则（Fitts's Law），用户鼠标移动距离越短、对象相对目标越大，用户越容易操作。通过运用上下文工具（即：放在内容中的操作工具），使内容和操作融合，从而简化交互。

> **费茨法则** ：到达目标的时间是到达目标的距离与目标大小的函数，具体：[fitts] 其中：1. D 为设备当前位置和目标位置的距离；2. W 为目标的大小。距离越长，所用时间越长；目标越大，所用时间越短。

---

## 实时可见工具

<FlexWithImagePreview justify='space-between' title='如果某个操作非常重要，就应该把它放在界面中，并实时可见。' description=''>
  [实时可见工具示例]状态二：鼠标悬停时，鼠标「指针」变为「手型」，底色发生变化，邀请用户点击。状态三：鼠标点击后，和未点击前有明显的区分。" src="https://gw.alipayobjects.com/zos/rmsportal/ofpeZpgdrqXcRpTlVXTp.png">
</FlexWithImagePreview>

---

## 悬停即现工具

<FlexWithImagePreview justify='space-between' title='如果某个操作不那么重要，或者使用「实时可见工具」过于啰嗦会影响用户阅读时，可以在悬停在该对象上时展示操作项。' description=''>
  [悬停即现工具示例]
</FlexWithImagePreview>

---

## 开关显示工具

<FlexWithImagePreview justify='space-between' title='如果某些操作只需要在特定模式时显示，可以通过开关来实现。' description=''>
  [开关显示工具示例]
</FlexWithImagePreview>

---

## 可视区域 ≠ 可点击区域

<FlexWithImagePreview justify='space-between' title='在使用 Table 时，文字链的点击范围受到文字长短影响，可以设置整个单元格为热区，以便用户触发。' description=''>
  [文字链热区示例]
</FlexWithImagePreview>

<FlexWithImagePreview justify='space-between' title='当需要增强按钮的响应性时，可以通过增加用户点击热区的范围，而不是增大按钮形状，来增强响应性，又不降低美感。' description='注：在移动端尤其适用。'>
  [按钮热区示例]
</FlexWithImagePreview>
