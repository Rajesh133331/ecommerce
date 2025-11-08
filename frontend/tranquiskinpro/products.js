window.addEventListener("load", displaybestsellers);
window.addEventListener("load", cartcount);
async function displaybestsellers() {
  try {
    const res = await axios.get("http://localhost:3000/products/list");
    const data = res.data;
    console.log(data);
    const container = document.getElementById("display-products");
    container.innerHTML = "";

    data.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

      const img = document.createElement("img");
      img.src = `../${product.imageurl}`;
      console.log(product.imageUrl);
      img.alt = product.productName;

      const name = document.createElement("h3");
      name.textContent = product.productName;

      const price = document.createElement("p");
      price.className = "product-price";
      price.textContent = `₹${product.price}`;

      const btn = document.createElement("button");
      btn.textContent = "View Product";
      // btn.dataset.id = product._id;
      btn.onclick = () => {
        console.log(product.productId);
        addcart(product.productId);
      };

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(price);
      card.appendChild(btn);
      container.appendChild(card);
    });
  } catch (err) {
    console.log(err.message);
  }
}

//addingitems to cart

async function addcart(idvalue) {
  if (!localStorage.getItem("tranquiskintoken")) {
    alert("Login into the account to add cart");
  }

  axios
    .post(
      "http://localhost:3000/addcart",
      { productid: idvalue },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tranquiskintoken"),
        },
      }
    )
    .then((res) => {
      const response = res.data.data;
      if (response == "success") {
        alert("cart added successfully");
        cartcount();
      }
    })
    .catch((err) => {
      console.log(err.message);
      alert("Something went wrong while adding cart");
    });
}

//user logi or signup

document.getElementById("account").addEventListener("click", () => {
  if (!localStorage.getItem("tranquiskintoken")) {
    window.location.href =
      "http://127.0.0.1:5500/frontend/login/userlogin.html";
  }
});

//checking number of items present in the cart now to display

async function cartcount() {
  axios
    .post(
      "http://localhost:3000/addcart/count",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tranquiskintoken"),
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      document.getElementsByTagName("sup")[0].innerHTML = res.data;
    });
}

document.getElementById("suptag").addEventListener("click",()=>{
  window.location.href =
    "http://127.0.0.1:5500/frontend/usercheckout/showcard.html";
})
