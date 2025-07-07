const express = require("express")
const cors = require("cors")

const app = express()
const port = 3000

// 中介層設定
app.use(cors())
app.use(express.json())
// 設定靜態檔案服務，提供images資料夾中的圖片
app.use('/images', express.static('images'))

// 模擬電商資料庫
let products = [
  { id: 1, name: "iPhone 15 Pro", price: 35900, category: "手機", stock: 50, description: "最新款iPhone，搭載A17 Pro晶片", image: "/images/product1.jpg" },
  { id: 2, name: "MacBook Air M3", price: 36900, category: "筆電", stock: 30, description: "輕薄強悍的筆記型電腦", image: "/images/product2.jpg" },
  { id: 3, name: "AirPods Pro", price: 7490, category: "耳機", stock: 100, description: "主動式降噪無線耳機", image: "/images/product3.jpg" },
  { id: 4, name: "iPad Air", price: 18900, category: "平板", stock: 25, description: "10.9吋Liquid Retina顯示器", image: "/images/product4.jpg" },
  { id: 5, name: "Samsung Galaxy S24", price: 28900, category: "手機", stock: 45, description: "三星旗艦手機，配備AI功能", image: "/images/product5.jpg" },
  { id: 6, name: "Dell XPS 13", price: 42000, category: "筆電", stock: 20, description: "輕薄商務筆電，InfinityEdge顯示器", image: "/images/product6.jpg" },
  { id: 7, name: "Sony WH-1000XM5", price: 10900, category: "耳機", stock: 80, description: "業界領先的降噪耳機", image: "/images/product7.jpg" },
  { id: 8, name: "iPad Pro 12.9", price: 32900, category: "平板", stock: 15, description: "專業級平板，支援Apple Pencil", image: "/images/product8.jpg" },
  { id: 9, name: "Google Pixel 8", price: 24900, category: "手機", stock: 35, description: "Google原生Android體驗", image: "/images/product9.jpg" },
  { id: 10, name: "ASUS ROG Strix", price: 65000, category: "筆電", stock: 10, description: "電競筆電，RTX 4070顯卡", image: "/images/product10.jpg" },
  { id: 11, name: "JBL Flip 6", price: 3290, category: "音響", stock: 60, description: "便攜式藍牙音響，防水設計", image: "/images/product11.jpg" },
  { id: 12, name: "Apple Watch Series 9", price: 12900, category: "穿戴", stock: 40, description: "智慧手錶，健康監測功能", image: "/images/product12.jpg" },
  { id: 13, name: "Nintendo Switch", price: 9780, category: "遊戲", stock: 55, description: "任天堂遊戲主機，掌機與家機二合一", image: "/images/product13.jpg" },
  { id: 14, name: "LG OLED C3", price: 89900, category: "電視", stock: 8, description: "65吋OLED電視，4K HDR", image: "/images/product14.jpg" },
  { id: 15, name: "Dyson V15", price: 21900, category: "家電", stock: 25, description: "無線吸塵器，雷射偵測灰塵", image: "/images/product15.jpg" },
  { id: 16, name: "Canon EOS R6", price: 78000, category: "相機", stock: 12, description: "全片幅無反相機，4K錄影", image: "/images/product16.jpg" },
  { id: 17, name: "Kindle Paperwhite", price: 4290, category: "電子書", stock: 90, description: "電子書閱讀器，防水設計", image: "/images/product17.jpg" },
  { id: 18, name: "Tesla Model Y", price: 1890000, category: "汽車", stock: 3, description: "電動休旅車，自動駕駛功能", image: "/images/product18.jpg" },
  { id: 19, name: "Bose SoundLink", price: 5990, category: "音響", stock: 70, description: "藍牙音響，360度環繞音效", image: "/images/product19.jpg" },
  { id: 20, name: "Garmin Fenix 7", price: 18900, category: "穿戴", stock: 30, description: "戶外運動智慧手錶，GPS定位", image: "/images/product20.jpg" },
  { id: 21, name: "PlayStation 5", price: 15980, category: "遊戲", stock: 20, description: "Sony次世代遊戲主機，4K遊戲", image: "/images/product21.jpg" },
  { id: 22, name: "Philips Hue", price: 2990, category: "智能家居", stock: 85, description: "智慧燈泡，1600萬色彩", image: "/images/product22.jpg" },
  { id: 23, name: "DJI Mini 3", price: 22900, category: "無人機", stock: 18, description: "迷你空拍機，4K錄影功能", image: "/images/product23.jpg" },
  { id: 24, name: "Xiaomi 13 Pro", price: 22900, category: "手機", stock: 40, description: "小米旗艦手機，徠卡鏡頭", image: "/images/product24.jpg" },
  { id: 25, name: "HP Spectre x360", price: 48000, category: "筆電", stock: 18, description: "2合1變形筆電，觸控螢幕", image: "/images/product25.jpg" },
  { id: 26, name: "Beats Studio3", price: 8900, category: "耳機", stock: 65, description: "Apple W1晶片，主動降噪", image: "/images/product26.jpg" },
  { id: 27, name: "Microsoft Surface Pro", price: 29900, category: "平板", stock: 22, description: "專業平板電腦，可替代筆電", image: "/images/product27.jpg" },
  { id: 28, name: "OnePlus 11", price: 23900, category: "手機", stock: 35, description: "哈蘇相機，120Hz螢幕", image: "/images/product28.jpg" },
  { id: 29, name: "Razer Blade 15", price: 85000, category: "筆電", stock: 8, description: "電競筆電，RTX 4080顯卡", image: "/images/product29.jpg" },
  { id: 30, name: "Marshall Acton III", price: 12900, category: "音響", stock: 45, description: "復古藍牙音響，經典搖滾風格", image: "/images/product30.jpg" },
  { id: 31, name: "Samsung Galaxy Tab S9", price: 24900, category: "平板", stock: 28, description: "Android平板，S Pen支援", image: "/images/product32.jpg" },
  { id: 32, name: "Fitbit Versa 4", price: 7990, category: "穿戴", stock: 50, description: "健身智慧手錶，心率監測", image: "/images/product33.jpg" },
  { id: 33, name: "Xbox Series X", price: 15980, category: "遊戲", stock: 15, description: "微軟次世代遊戲主機", image: "/images/product35.jpg" },
  { id: 34, name: "Roomba i7+", price: 32900, category: "家電", stock: 12, description: "智慧掃地機器人，自動集塵", image: "/images/product1.jpg" },
  { id: 35, name: "GoPro Hero 12", price: 18900, category: "相機", stock: 30, description: "運動攝影機，4K 120fps錄影", image: "/images/product2.jpg" },
]

// 商品分類
const categories = products.reduce((acc, cur) => {
  if (!acc.includes(cur.category)) {
    acc.push(cur.category)
  }
  return acc
}, [])

// 取得商品分類
app.get("/categories", (req, res) => {
  res.json(categories)
})

// 取得全部商品
app.get("/products", (req, res) => {
  res.json(products)
})

// 取得單一商品
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const product = products.find((p) => p.id === id)
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: "找不到商品" })
  }
})

// 新增商品
app.post("/products", (req, res) => {
  const { name, price, category, stock, description, image } = req.body
  const newProduct = {
    id: Date.now(),
    name,
    price,
    category,
    stock,
    description,
    image,
  }
  products.push(newProduct)
  res.status(201).json(newProduct)
})

// 修改商品
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { name, price, category, stock, description, image } = req.body
  const product = products.find((p) => p.id === id)
  if (product) {
    product.name = name ?? product.name
    product.price = price ?? product.price
    product.category = category ?? product.category
    product.stock = stock ?? product.stock
    product.description = description ?? product.description
    product.image = image ?? product.image
    res.json(product)
  } else {
    res.status(404).json({ message: "找不到商品" })
  }
})

// 刪除商品
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const index = products.findIndex((p) => p.id === id)
  if (index > -1) {
    products.splice(index, 1)
    res.status(204).send() // 無內容
  } else {
    res.status(404).json({ message: "找不到商品" })
  }
})

// 啟動伺服器
app.listen(port, () => {
  console.log(`伺服器啟動在 http://localhost:${port}`)
})
