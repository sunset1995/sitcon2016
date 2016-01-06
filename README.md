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
2. 用 gulp 的 default task build 網頁
3. 切到 gh-pages branch
4. 將 build 資料夾內的所有檔案複製出來
```
gulp
git checkout gh-pages
cp -R ./build/* ./
```

#### debug
用 `gulp debug` 會重編整個網頁
並用 *browser-sync* 建制臨時的小型網頁伺服用來檢視結果及 livereload

