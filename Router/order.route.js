const express = require("express");
const app = express.Router();
const moment = require("moment");
var order = require("../Models/hoadon.model");

app.get("/", async (req, res) => {
  let list = await order.SelectAll();
  list = list.map((item) => ({
    ...item,
    NgayLapHoaDon: moment(item.NgayLapHoaDon).format("DD/MM/YYYY"),
  }));
  //   console.log(list);
  res.render("Admin/order/OrderManagement", { list,
    page: 'Quản Lý Thông Tin Đặt Hàng / Xác Nhận Đặt Hàng',
    dathang: 'background-color:dodgerblue', });
});

app.post("/details/:orderID/return", async (req, res) => {
  const { orderID } = req.params;
  const { mathangID, reason } = req.body;
  const rows = await order.ReturnProduct({
    MaMatHang: mathangID,
    NgayTra: new Date().getTime(),
    LyDo: reason,
    MaDH: orderID,
  });

  //   console.log(rows);
  res.json(rows);
});

app.get("/details/:orderID", async (req, res) => {
  const { orderID } = req.params;
  let list = await order.SelectOne(orderID);
  // console.log(list);
  res.render("Admin/order/OrderDetails", { list,
    page: 'Quản Lý Thông Tin Đặt Hàng / Xác Nhận Đặt Hàng',
    dathang: 'background-color:dodgerblue', });
});

app.delete("/details/:orderID", async (req, res) => {
  const { orderID } = req.params;
  const { mathangID } = req.body;
  const rows = await order.DeleteDetails(orderID, mathangID);
  // console.log(rows);
  res.json(rows);
});
app.delete("/:orderID", async (req, res) => {
  const { orderID } = req.params;
  const rows = await order.DeleteOrder(orderID);
  // console.log(rows);
  res.json(rows);
});

app.put("/:orderID", async (req, res) => {
  const { orderID } = req.params;
  const { payment } = req.body;
  const rows = await order.UpdateThanhToan(orderID, payment);
  // console.log(rows);
  res.json(rows);
});

module.exports = app;
