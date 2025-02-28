import "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function Home() {

//     const [students, setStudents] = useState([]); // เก็บข้อมูลนักศึกษา
//     const [selectedStudent, setSelectedStudent] = useState(null); // เก็บข้อมูลนักศึกษาที่ต้องการแก้ไข
//     const [newStdName, setNewStdName] = useState("");
//     const [newStdTel, setNewStdTel] = useState("");
//     // useEffect(() => {
//     //     axios
//     //       .get("http://localhost:8081/")
//     //       .then((res) => console.log(res))
//     //       .catch((err) => console.log(err));
//     // });

//     useEffect(() => {

//         axios.get("http://localhost:8081/") //const response =
//         .then((res) => {
//             console.log("Response data:", res.data);
//             setStudents(res.data); // บันทึกข้อมูลจาก API
//         })
//         .catch((err) => console.log(err));

//     },[]);

//     const handleRead = (id) => {
//         console.log("Reading student with ID:", id);
//         // คุณสามารถเพิ่มการแสดงข้อมูลในรูปแบบอื่น ๆ ได้
//       };
      
//       const handleEdit = (student) => {
//         setSelectedStudent(student);
//         setNewStdName(student.stdName);
//         setNewStdTel(student.stdTel);
//       };

//       const handleSaveEdit = () => {
//         if (selectedStudent) {
//           const updatedStudent = {
//             ...selectedStudent,
//             stdName: newStdName,
//             stdTel: newStdTel,
//           };
          
//           console.log("selectedStudent.id: ",selectedStudent.id);
//           axios
//             .put(`http://localhost:8081/update/${selectedStudent.id}`, updatedStudent)
//             .then((res) => {
//               console.log("Student updated:", res.data);
//               setStudents(
//                 students.map((student) =>
//                   student.id === selectedStudent.id ? updatedStudent : student
//                 )
//               );
//               setSelectedStudent(null); // ปิด Modal หลังจากบันทึก
//             })
//             .catch((err) => console.log(err));
//         }
//       };
      
// // ฟังก์ชันลบข้อมูลนักศึกษา
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this student?")) {
//       axios
//         .delete(`http://localhost:8081/delete/${id}`)
//         .then((res) => {
//           console.log("Student deleted", res.data);
//           // รีเฟรชข้อมูลหลังจากลบ
//           setStudents(students.filter((student) => student.id !== id));
//         })
//         .catch((err) => console.log(err));
//     }
//   };

const [products, setProducts] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:8081/products") // API endpoint
    .then((res) => {
      console.log("Response data:", res.data);
      setProducts(res.data);
    })
    .catch((err) => console.log(err));
}, []);

const handleEdit = (id) => {
  console.log("Editing product with ID:", id);
};

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    axios
      .delete(`http://localhost:8081/products/${id}`)
      .then((res) => {
        console.log("Product deleted", res.data);
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((err) => console.log(err));
  }
};

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Products</h2>
      <button className="btn btn-primary me-2">Create Product</button>
      <button className="btn btn-outline-primary">Refresh</button>
      <div className="table-responsive mt-3">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.price}$</td>
                  <td>
                    <img src={product.image} alt={product.name} width="50" height="50" />
                  </td>
                  <td>{product.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default Home;



// return (
//   <div className="container " style={{ width: "650px", marginTop: "35%" }}> {/* mt-5 */}
//   <div className="card shadow-lg rounded ">
//     <div className="card-header bg-primary text-white text-center">
//       <h2 className="mb-0">ข้อมูลนักศึกษา</h2>
//     </div>
//     <div className="card-body">
//       <div className="table-responsive rounded">
//         <table className="table table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>รหัสนักศึกษา</th>
//               <th>ชื่อ</th>
//               <th>เบอร์โทรศัพท์</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length > 0 ? (
//               students.map((student, index) => (
//                 <tr key={index} className="align-middle">
//                   <td>{student.id}</td>
//                   <td>{student.stdId}</td>
//                   <td>{student.stdName}</td>
//                   <td>{student.stdTel}</td>
//                   <td>
//                       {/* ปุ่ม Read */}
//                       <button className="btn btn-info btn-sm me-2" onClick={() => handleRead(student.id)}>
//                       Read
//                       </button>
//                       {/* ปุ่ม Edit */}
//                       <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(student.id)}>
//                       Edit
//                       </button>
//                       {/* ปุ่ม Delete */}
//                       <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.id)}>
//                       Delete
//                       </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center text-muted">
//                   ไม่มีข้อมูล
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>

//    {/* Modal สำหรับการแก้ไขข้อมูล */}
// {selectedStudent && (
//   <div
//     className="modal fade show"
//     style={{ display: "block" }}
//     tabIndex="-1"
//     aria-labelledby="editModalLabel"
//     aria-hidden="true"
//   >
//     <div className="modal-dialog">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title" id="editModalLabel">
//             แก้ไขข้อมูลนักศึกษา
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="modal"
//             aria-label="Close"
//             onClick={() => setSelectedStudent(null)}
//           ></button>
//         </div>
//         <div className="modal-body">
//           <div className="mb-3">
//             <label htmlFor="stdName" className="form-label">
//               ชื่อนักศึกษา
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="stdName"
//               value={newStdName}
//               onChange={(e) => setNewStdName(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="stdTel" className="form-label">
//               เบอร์โทรศัพท์
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="stdTel"
//               value={newStdTel}
//               onChange={(e) => setNewStdTel(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="modal-footer">
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => setSelectedStudent(null)}
//           >
//             Close
//           </button>
//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={handleSaveEdit}
//           >
//             Save changes
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

// </div>

// );