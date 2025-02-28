// import React, { useEffect, useState } from "react";

// const OrderStatus = () => {
//     const [ws, setWs] = useState(null);
//     const [orderStatus, setOrderStatus] = useState("");

//     useEffect(() => {
//         const socket = new WebSocket("ws://localhost:8082");

//         socket.onmessage = async (event) => {
//           console.log("📩 Received from WebSocket:", event.data);

//           if (event.data instanceof Blob) {
//               const text = await event.data.text(); // แปลง Blob เป็นข้อความ
//               try {
//                   const data = JSON.parse(text); // แปลงข้อความเป็น JSON
//                   console.log("✅ Parsed data:", data);

//                   setOrderStatus(`Order ${data.orderId}: ${data.status}`);

//                   // if (data.orderId === data.orderId) {
//                   //     setOrderStatus(data.status);
//                   // }
//               } catch (error) {
//                   console.error("❌ Error parsing WebSocket data:", error);
//               }
//           } else {
//               try {
//                   const data = JSON.parse(event.data);
//                   console.log("✅ Parsed data:", data);

//                   setOrderStatus(`Order ${data.orderId}: ${data.status}`);
//                   // if (data.orderId === data.orderId) {
//                   //     setOrderStatus(data.status);
//                   // }
//               } catch (error) {
//                   console.error("❌ Error parsing WebSocket data:", error);
//               }
//           }
//       };

//         socket.onclose = () => {
//             console.log("❌ WebSocket Disconnected");
//         };

//         return () => socket.close();
//     }, []);

//     // const sendOrderUpdate = () => {
//     //   if (ws) {
//     //       const orderData = {
//     //           orderId: "1100",
//     //           status: "success",
//     //           transactionId: "TXN100001000",
//     //       };
//     //       ws.send(JSON.stringify(orderData));
//     //       console.log("📤 Sent:", orderData);
//     //   }
//   // };

//     return (
//         <div className="mt-4">
//             <h2>📦 สถานะคำสั่งซื้อ: <strong>{orderStatus || "กำลังรอการอัปเดต..."}</strong></h2>
//             {/* <button onClick={sendOrderUpdate}>🔄 Send Order Update</button> */}
//         </div>
//     );
// };

// export default OrderStatus;

import React, { useEffect, useState } from "react";

const OrderStatus = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState("กำลังรอการอัปเดต...");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8082");

    socket.onopen = () => {
      console.log("✅ WebSocket Connected");
      // ส่งคำขอไปยังเซิร์ฟเวอร์เพื่อขอข้อมูลของ orderId
      socket.send(JSON.stringify({ orderId }));
    };

    socket.onmessage = async (event) => {
      console.log("📩 Received from WebSocket:", event.data);

      if (event.data instanceof Blob) {
        //               const text = await event.data.text(); // แปลง Blob เป็นข้อความ
        try {
          const data = JSON.parse(text); // แปลงข้อความเป็น JSON
          console.log("✅ Parsed data:", data);
          // const data = JSON.parse(event.data);
          // console.log("✅ Parsed data:", data);

          if (data.orderId === orderId) {
            if (data.status === "paid") {
              setOrderStatus(
                `✅ คำสั่งซื้อ ${orderId} ชำระเงินแล้ว (Transaction: ${data.transactionId})`
              );
            } else {
              setOrderStatus(`⌛ คำสั่งซื้อ ${orderId} รอการชำระเงิน...`);
            }
          }
        } catch (error) {
          console.error("❌ Error parsing WebSocket data:", error);
        }
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket Disconnected");
    };

    return () => socket.close();
  }, [orderId]); // อัปเดตเมื่อ orderId เปลี่ยนแปลง

  return (
    <div className="mt-4">
      <h2>
        📦 สถานะคำสั่งซื้อ: <strong>{orderStatus}</strong>
      </h2>
    </div>
  );
};

export default OrderStatus;

// import React, { useState, useEffect } from "react";
// // import axios from "axios";

// const OrderStatus = ({ orderId }) => {
//   const [paid, setPaid] = useState(null);

//   useEffect(() => {
//     console.log("useEffect paid :", paid);
//   },[paid]);

//   useEffect(() => {
//     const ws = new WebSocket("wss://localhost:8082");

//     // เมื่อได้รับข้อมูลจากเซิร์ฟเวอร์ผ่าน WebSocket
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.orderId === orderId) {
//         console.log("🔹 เช็ก orderId:", orderId.paid);
//         console.log("🔹 เช็ก orderId:", data);
//         setPaid(data.paid); // อัปเดตค่า paid
//       }
//     };

//     return () => {
//       ws.close(); // ปิดการเชื่อมต่อ WebSocket เมื่อ component ถูกทำลาย
//     };
//   }, [orderId]); // ทำงานเมื่อ orderId เปลี่ยนแปลง

//   // useEffect(() => {
//   //   const checkPaymentStatus = async () => {
//   //     try {
//   //       const response = await axios.get(`http://localhost:8081/order-status/${orderId}`,{
//   //         headers: {
//   //           'Cache-Control': 'no-cache',
//   //         }
//   //       });
//   //       console.log("data.paid: ",response.data.paid);
//   //       console.log("data: ",response);
//   //       setPaid(response.data.paid);
//   //     } catch (error) {
//   //       console.error("Error checking payment status", error);
//   //     }
//   //   };

//   //   const interval = setInterval(checkPaymentStatus, 500); // ตรวจสอบทุกๆ 5 วินาที
//   //   console.log("interval: ",interval);
//   //   return () => clearInterval(interval);
//   // }, [orderId]);

//   return (
//     <div className="mt-4">
//     {paid === null ? (
//       <h2>⌛ กำลังโหลด...</h2>
//     ) : paid ? (
//       <h2>✅ ชำระเงินเรียบร้อยแล้ว</h2>
//     ) : (
//       <h2>⌛ รอการชำระเงิน...</h2>
//     )}
//   </div>
//   );
// };

// export default OrderStatus;
