// function validation(val) {
//     let error = {};
//     const email_pattern = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/;
//     //const password_pattern =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  
//     if (val.email === "") {
//       error.email = "Name should not be empty";
//     } else if (!email_pattern.test(val.email)) {
//       error.email = "Email Didn't match";
//     } else {
//       error.email = "";
//     }
  
//     if (val.password === "") {
//       error.password = "Name should not be empty";
//     } else {
//       error.password = "";
//     }
  
//     return error;
//   }
  
//   export default validation;

function validation(val) {
    let error = {};
    const email_pattern = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;
    const password_pattern = /.{6,}/; // กำหนดให้รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร

    if (!val.email.trim()) {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(val.email)) {
        error.email = "Invalid email format";
    }

    if (!val.password.trim()) {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(val.password)) {
        error.password = "Password must be at least 6 characters long";
    }

    return error;
}

export default validation;
