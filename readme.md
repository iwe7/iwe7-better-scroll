组件库

| 组件名                | 说明        | 地址                                         |
|--------------------|-----------|--------------------------------------------|
| iwe7-flex          | flex布局组件  | https://github.com/iwe7/iwe7-flex          |
| iwe7-map           | 百度地图组件    | https://github.com/iwe7/iwe7-map           |
| iwe7-im            | IM组件      | https://github.com/iwe7/iwe7-im            |
| iwe7-icss          | rxjs操作css | https://github.com/iwe7/iwe7-icss          |
| iwe7-core          | 核心库       | https://github.com/iwe7/iwe7-core          |
| iwe7-script        | 加载css和js  | https://github.com/iwe7/iwe7-script        |
| iwe7-util          | 工具        | https://github.com/iwe7/iwe7-util          |
| iwe7-square        | 正方形组件     | https://github.com/iwe7/iwe7-square        |
| iwe7-better-scroll | 滑动组件      | https://github.com/iwe7/iwe7-better-scroll |
| iwe7-web-storage   | 缓存相关      | https://github.com/iwe7/iwe7-web-storage   |


## iwe7 better scroll

- 垂直
```html
<iwe7-slide >
  <div>
    <a>
      <img src="http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg">
    </a>
  </div>
  <div>
    <a>
      <img src="http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg">
    </a>
  </div>
</iwe7-slide>
```
- 水平
```html
<iwe7-slide>
  <div>
    <a>
      <img src="http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg">
    </a>
  </div>
  <div>
    <a>
      <img src="http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg">
    </a>
  </div>
</iwe7-slide>
```

- 全屏
```html
<iwe7-slide-full [data]="list">
  <span class="button">立即开启</span>
</iwe7-slide-full>
```

```ts
list: any[] = [{
  image: 'https://ustbhuangyi.github.io/better-scroll/static/img/winter.74aecef.jpeg'
}, {
  image: 'https://ustbhuangyi.github.io/better-scroll/static/img/fall.0e0be3c.jpeg'
}];
```

- index list
```html
<iwe7-index-list>
  <div>
    <div iwe7IndexAnchor="A">标题A</div>
    <ul>
      <li iwe7IndexItem>1</li>
      <li iwe7IndexItem>2</li>
      <li iwe7IndexItem>3</li>
      <li iwe7IndexItem>4</li>
    </ul>
    <div iwe7IndexAnchor="B">标题B</div>
    <ul>
      <li iwe7IndexItem>1</li>
      <li iwe7IndexItem>2</li>
      <li iwe7IndexItem>3</li>
      <li iwe7IndexItem>4</li>
    </ul>
    <div iwe7IndexAnchor="C">标题C</div>
    <ul>
      <li iwe7IndexItem>1</li>
      <li iwe7IndexItem>2</li>
      <li iwe7IndexItem>3</li>
      <li iwe7IndexItem>4</li>
    </ul>
    <div iwe7IndexAnchor="D">标题D</div>
    <ul>
      <li iwe7IndexItem>1</li>
      <li iwe7IndexItem>2</li>
      <li iwe7IndexItem>3</li>
      <li iwe7IndexItem>4</li>
    </ul>
    <div iwe7IndexAnchor="E">标题E</div>
    <ul>
      <li iwe7IndexItem>1</li>
      <li iwe7IndexItem>2</li>
      <li iwe7IndexItem>3</li>
      <li iwe7IndexItem>4</li>
    </ul>
  </div>
</iwe7-index-list>
```