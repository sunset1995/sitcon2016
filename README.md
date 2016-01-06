#  STICON 2016 網頁

請多提供技術上及網頁設計上的意見

## 環境準備

npm 版本過舊可能會導致之後 build 失敗
[更新 node, npm 參考資料](https://nodejs.org/en/download/package-manager/)

安裝套件管理器至全域
```
npm install -g gulp
```

安裝 build 網頁時會用到的前處理器
```
npm install
```

## build 及 debug

所有 source code 都在資料夾 *app* 下

#### 更新網頁
1. 改好 source code 後
2. 用 gulp 的 default task build 整個網頁
3. 切到 gh-pages branch
4. 將 build 資料夾內的所有檔案複製出來
```
gulp
git checkout gh-pages
cp -R ./build/* ./
```

#### debug
`gulp debug` 會重 build 個網頁
並建制臨時的小型網頁伺服用來檢視結果及 livereload

gulp debug 在 build 時不會壓縮

所以 debug 完請再 `gulp` 一次以壓縮可以壓縮的檔案

## Source code

#### html
整個 html 拆成多個部份放在資料夾 *app/html/* 下

由 *app/index.html* 在 build 時 include

其中網頁內文放在 **_app/html/pages_**

若只想 build html 可 `gulp html`

#### scss
所有 scss 放在 *app/scss/* 下

由 *app/scss/sitcon2016.scss* import

最後只會 build 出一個 *build/sitcon2016.css*

若只想 build scss 可 `gulp scss`

