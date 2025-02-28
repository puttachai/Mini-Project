// import express from "express";
// import mysql from "mysql";
// import cors from "cors";
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const express = require("express");
const bodyParser = require("body-parser");

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8082 }); // เปิดพอร์ตใหม่สำหรับ WebSocket


const port = 8081;
const app = express();
app.use(bodyParser.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rbac",
    port: 3307
})

// Check database connection
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});


// จำลองข้อมูลสถานะการชำระเงิน (ในระบบจริง ควรรับข้อมูลจากฐานข้อมูลหรือ PromptPay API)
const payments = {
  "1100": { status: "paid", transactionId: "TXN100001000" }, // Order 1100 ได้รับการชำระเงิน
  "1111": { status: "paid", transactionId: "TXN100001011" }, // Order 1100 ได้รับการชำระเงิน
  "1101": { status: "pending", transactionId: "" }, // Order 1101 ยังไม่ได้ชำระเงิน
};

wss.on("connection", (ws) => {
  console.log("🔗 Client connected to WebSocket");

  ws.on("message", (message) => {
    console.log("📩 Received from client:", message);

    try {
        // แปลง Buffer เป็น string ก่อนการ parse
        const messageStr = message.toString(); // แปลง Buffer เป็น string
        console.log("messageStr: ",messageStr);
        const { orderId } = JSON.parse(messageStr); // ทำการ parse เป็น JSON
        console.log(`🔍 Checking payment for Order: ${orderId}`);

        // ตรวจสอบสถานะการชำระเงิน
        if (payments[orderId]) {
            const response = {
                orderId,
                status: payments[orderId].status, // สถานะการชำระเงิน
                transactionId: payments[orderId].transactionId, // รหัสการทำธุรกรรม
            };

            console.log(`📤 Sending update to client:`, response);
            ws.send(JSON.stringify(response));
        }
    } catch (error) {
        console.error("❌ Error processing message:", error);
    }
});

  ws.on("close", () => {
      console.log("❌ Client disconnected");
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🔍 Login request:", req.body);

  const sql = "SELECT * FROM employee WHERE empEmail = ?";
  db.query(sql, [email], async (err, results) => {
      if (err) {
          console.error("❌ Database Error:", err);
          return res.json({ status: "error", message: "Internal Server Error" });
      }
      if (results.length === 0) {
          return res.json({ status: "error", message: "User not found" });
      }

      const user = results[0];

      // ✅ ตรวจสอบว่ารหัสผ่านเป็น Hash หรือยัง
      if (!user.empPassword.startsWith("$2a$")) {
          console.log("🔄 Password is not hashed. Updating...");

          // 🔥 ทำการเข้ารหัสรหัสผ่านใหม่
          const hashedPassword = await bcrypt.hash(user.empPassword, 10);

          // อัปเดตฐานข้อมูลให้เป็น Hash
          const updateSql = "UPDATE employee SET empPassword = ? WHERE empId = ?";
          db.query(updateSql, [hashedPassword, user.empId], (updateErr, updateResult) => {
              if (updateErr) {
                  console.error("❌ Failed to update password:", updateErr);
                  return res.json({ status: "error", message: "Internal Server Error" });
              }
              console.log("✅ Password updated successfully for user:", email);
          });

          // เปลี่ยนรหัสผ่านให้เป็นค่า hash ใหม่
          user.empPassword = hashedPassword;
      }

      // 🔥 เปรียบเทียบรหัสผ่านที่เข้ารหัสแล้ว
      const isMatch = await bcrypt.compare(password, user.empPassword);
      if (!isMatch) {
          return res.json({ status: "error", message: "Invalid credentials" });
      }

      // ✅ สร้าง JWT Token
      const token = jwt.sign(
          { empId: user.empId, email: user.empEmail },
          "secretkey",
          { expiresIn: "1h" }
      );

      return res.json({ status: "success", message: "Login successful", token });
  });
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if(err) return res.json({ Message: "Error inside server"});
        console.log("sql:",sql);
        console.log("result:",result);
        return res.json(result);

    });
});


// เพิ่ม endpoint สำหรับการลบข้อมูล
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM student WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return res.json({ Message: "Error deleting student" });
      console.log("sql:",sql);
      console.log("result:",result);
      return res.json({ Message: "Student deleted successfully" });
    });
  });


  // เพิ่ม endpoint สำหรับการอัปเดตข้อมูล
app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { stdName, stdTel } = req.body;
    const sql =
      "UPDATE student SET stdName = ?, stdTel = ? WHERE id = ?";
    db.query(sql, [stdName, stdTel, id], (err, result) => {
      if (err) return res.json({ Message: "Error updating student" });
      console.log("result: ",result)
      console.log("sql: ",sql)
      return res.json({ Message: "Student updated successfully" },console.log(""));
    });
  });
  

app.listen(port, () => {
    console.log("Listening on port" + port );
});