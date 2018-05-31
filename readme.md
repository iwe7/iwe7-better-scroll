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

···ts
list: any[] = [{
  image: 'https://ustbhuangyi.github.io/better-scroll/static/img/winter.74aecef.jpeg'
}, {
  image: 'https://ustbhuangyi.github.io/better-scroll/static/img/fall.0e0be3c.jpeg'
}];
```