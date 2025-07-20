const express = require("express")
const cors = require("cors")

const app = express()
const port = 3000

// 中介層設定
app.use(cors())
app.use(express.json())
// 設定靜態檔案服務，提供images資料夾中的圖片
app.use("/images", express.static("images"))

// 模擬電商資料庫
let products = [
  { id: 1, name: "香蕉", category: "水果", price: 50 },
  { id: 2, name: "蘋果", category: "水果", price: 35 },
  { id: 3, name: "西瓜", category: "水果", price: 182 },
  { id: 4, name: "牛奶", category: "飲料", price: 40 },
  { id: 5, name: "咖啡", category: "飲料", price: 65 },
  { id: 6, name: "可樂", category: "飲料", price: 29 },
]

// GET /api/test - 取得所有資料
app.get("/api/test", (req, res) => {
  res.json(testData)
})

// GET /api/test/:id - 根據 ID 取得單筆資料
app.get("/api/test/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const data = testData.find((item) => item.id === id)

  if (data) {
    res.json(data)
  } else {
    res.status(404).json({ message: "找不到資料" })
  }
})

// POST /api/test - 新增資料
app.post("/api/test", (req, res) => {
  const { name, category } = req.body

  if (!name || !category) {
    return res.status(400).json({ message: "名稱和分類不能為空" })
  }

  // 生成新的 ID
  const newId = testData.length > 0 ? Math.max(...testData.map((item) => item.id)) + 1 : 1

  const newData = {
    id: newId,
    name: name,
    category: category,
  }

  testData.push(newData)
  res.status(201).json(newData)
})

// PUT /api/test/:id - 更新資料
app.put("/api/test/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { name, category } = req.body

  const dataIndex = testData.findIndex((item) => item.id === id)

  if (dataIndex === -1) {
    return res.status(404).json({ message: "找不到資料" })
  }

  if (!name || !category) {
    return res.status(400).json({ message: "名稱和分類不能為空" })
  }

  testData[dataIndex] = {
    id: id,
    name: name,
    category: category,
  }

  res.json(testData[dataIndex])
})

// DELETE /api/test/:id - 刪除資料
app.delete("/api/test/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const dataIndex = testData.findIndex((item) => item.id === id)

  if (dataIndex === -1) {
    return res.status(404).json({ message: "找不到資料" })
  }

  testData.splice(dataIndex, 1)
  res.json({ message: "資料已刪除" })
})

// 啟動伺服器
app.listen(port, () => {
  console.log(`伺服器啟動在 http://localhost:${port}`)
})
