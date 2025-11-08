function save(event) {
  event.preventDefault();
  let pass1 = document.getElementById("signup-password").value;
  let pass2 = document.getElementById("signup-repassword").value;
  let name = document.getElementById("signup-name").value;
  let mobile = document.getElementById("signup-mobile").value;
  let email = document.getElementById("signup-email").value;

  //saving  data into object
  let obj = {
    name: name,
    mobilenumber: mobile,
    email: email,
    password: pass1,
  };

  document.getElementById("signup-password").addEventListener("focus", () => {
    document.getElementById("passwordwrong").innerHTML = "";
  });

  document.getElementById("signup-repassword").addEventListener("focus", () => {
    document.getElementById("passwordwrong").innerHTML = "";
  });

  //password same checking code here in signup
  if (pass1 !== pass2) {
    document.getElementById("passwordwrong").innerHTML =
      "* Both password should be same";
    return;
  } else {
    axios.post("http://localhost:3000/api/auth/signup", obj).then((result) => {
      console.log(result);
      if (result.data.data == "exist") {
        alert("User already exist please login");
        window.location.href =
          "http://127.0.0.1:5500/frontend/login/userlogin.html";
      } else if (result.data.data == "success") {
        alert("successfull signup,Please login into account");
        window.location.href =
          "http://127.0.0.1:5500/frontend/login/userlogin.html";
      } else {
        alert("Internal server error,please try after some time");
      }
    });
  }
}
