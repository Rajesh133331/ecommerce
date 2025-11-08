let btn = document.getElementById("image-submit");

btn.addEventListener("click",()=>{

    let file = document.getElementById("image-upload");
     if (file.files.length === 0) {
       alert("Please select an image first!");
       return;
     }
     document.getElementById("showing-butoon").innerHTML = "Your request is being processing....."
      let filedata = file.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const obj = {
          filesend: reader.result,
        };

        axios
          .post("http://localhost:3000/analysischeck", obj)
          .then((res) => {
            let result = res.data.data;
            document.getElementById("showing-butoon").innerHTML = "";
            document.getElementById("showing-butoon").style.display = "none";
            document.getElementById("result-showing").style.display = "block";
            document.getElementById("rating").innerText = `Rating : ${result.rating}`
            document.getElementById(
              "recommendations1"
            ).innerText = `${result.recommendations[0]}`;
            document.getElementById(
              "recommendations2"
            ).innerText = `${result.recommendations[1]}`;
            document.getElementById("skintone").innerText = `skin tone: ${result.skintone}`
          })
          .catch((err) => {
            alert("Something went wrong, please try again")
            window.location.reload()
          });
      };

      reader.readAsDataURL(filedata);
})
