function save(event) {
  event.preventDefault();
  let email = document.getElementById("signin-email").value.toLowerCase();
  let password = document.getElementById("signin-password").value;

  let obj = {
    email: email,
    password: password,
  };

  axios.post("http://localhost:3000/api/auth/login", obj).then((response) => {
    console.log(response);
    if (response.data.data == "notexist") {
      alert("User not exist, check email again");
    } else if (response.data.data == "wrongpassword") {
      alert("Password entered Wrongly ! check again");
    } else if (response.data.data == "success") {
      alert("login successful");
      localStorage.setItem("tranquiskintoken", response.data.token);
      localStorage.setItem("name", response.data.Name);
      localStorage.setItem("email",response.data.Email)
      window.location.href =
        "http://127.0.0.1:5500/frontend/mainpage/userhome.html";
    } else {
      alert("Internal server error");
    }
  });
}


//checking wheather account is login or not

if (localStorage.getItem("tranquiskintoken")) {
  document.getElementById("signupform").style.display = "none";
  document.getElementById("login-details").style.display = "block"
  document.getElementById("fullname").value = localStorage.getItem("name");
  document.getElementById("email").value = localStorage.getItem("email");
}

function logout(){
  localStorage.removeItem("tranquiskintoken")
  window.location.reload()
}
