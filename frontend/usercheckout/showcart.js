window.addEventListener("load", cartcount);
window.addEventListener("load", showingcartproducts);

//user logi or signup

// document.getElementById("account").addEventListener("click", () => {
//   window.location.href = "http://127.0.0.1:5500/frontend/login/userlogin.html";
// });

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

// const checkout = document.getElementById("checkout-img");
// console.log(checkout);
// document.getElementById("checkout-img").addEventListener("click",()=>{
//     window.location.href =
//       "http://127.0.0.1:5500/frontend/usercheckout/showcard.html";;
// })


//showing checkout products

async function showingcartproducts(){

try{
     const token = localStorage.getItem("tranquiskintoken");
    if (!token) {
      alert("Please login first!");
      window.location.href =
        "http://127.0.0.1:5500/frontend/login/userlogin.html";
      return;
    }

    const response = await axios.get("http://localhost:3000/addcart/checkout", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tranquiskintoken")
      },
    });
    const products = response.data.products || [];
    console.log(products)
    renderProducts(products);
}
catch(err){
    alert("Something went wrong")
}
}

function renderProducts(products) {
  const container = document.getElementById("product-container");
  const totalPriceElement = document.getElementById("total");
  container.innerHTML = "";

  let total = 0;

  products.forEach((product) => {
    total += product.price;

    const card = document.createElement("div");
    card.className = "product-card";

    const infoDiv = document.createElement("div");
    infoDiv.className = "product-info";

    const img = document.createElement("img");
    img.src = `../${product.imageurl}`;
    img.alt = product.name;
    img.style.width = "100px"; 
    img.style.height = "100px";


    const detailsDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    nameDiv.className = "product-name";
    nameDiv.textContent = product.productName;

    const priceDiv = document.createElement("div");
    priceDiv.className = "price";
    priceDiv.textContent = "₹" + product.price;

    detailsDiv.appendChild(nameDiv);
    detailsDiv.appendChild(priceDiv);
    infoDiv.appendChild(img);
    infoDiv.appendChild(detailsDiv);

    // 🧾 Delete button (your style)
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      deleteProduct(product.productId);
    };

    card.appendChild(infoDiv);
    card.appendChild(deleteBtn);

    container.appendChild(card);
  });

  totalPriceElement.textContent = `Total: ₹${total}`;
}


//delete product

async function deleteProduct(idval){

    try{
         await axios.get(`http://localhost:3000/addcart/delete/${idval}`,{}, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tranquiskintoken"),
      },
    }).then((res=>{
        if(res.data.data=="success"){
                alert("Product deleted successfully");
                showingcartproducts();

        }
        else{
            alert("something went wrong")
        }
    }))

    }
    catch(err){
        console.log(err.message)
        alert("something went wrong")
    }

}


document.getElementById("pay-now").addEventListener("click",async()=>{

    axios.post("http://localhost:3000/addcart/removecart",{},{
          headers: {
        Authorization: "Bearer " + localStorage.getItem("tranquiskintoken"),
      }}
    ).then((res)=>{
        if(res.data.data=="success"){
            alert("Paymrnt successfull")
            showingcartproducts();
            cartcount();
        }
        else if(res.data.data=="fail"){
            alert("payment fail")
        }
    })
})