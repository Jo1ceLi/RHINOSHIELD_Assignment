使用說明

1. `npm i`
2. `npm run start:dev`
3. `curl "localhost:3000/?source=M"` -> Metaphorpsum or `curl "localhost:3000/?source=I"` -> Itsthisforthat
4. `npm run test` -> unit test

可優化的部分以及設計說明

- 沒有使用 env 控制變數，直接寫死取得句子的 api endpoint，以及 timeout 固定為 1000ms
- 做出`GetDailySentense`這個 interface，接著實作 M 以及 I，並用工廠模式產出對應的 service
