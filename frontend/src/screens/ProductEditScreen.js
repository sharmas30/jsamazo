import { parseRequestUrl, showLoading, showMessage, hideLoading, } from '../utils';
import { getProduct, updateProduct, uploadProductImage } from '../api';

//******* firebase connectivity variable start ******//

var ImgName, ImgUrl, Product_Fname, LinkToImage;
var files = [];
var reader;
var id;
var rollv;

//******* firebase connectivity variable end ******//

const ProductEditScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document
            .getElementById('edit-product-form')
            .addEventListener('submit', async(e) => {
                console.log("SUBMIt CALL ==");

                e.preventDefault();
                showLoading();
                const data = await updateProduct({
                    _id: request.id,
                    name: document.getElementById('name').value,
                    price: document.getElementById('price').value,
                    image: LinkToImage,
                    brand: document.getElementById('brand').value,
                    category: document.getElementById('category').value,
                    countInStock: document.getElementById('countInStock').value,
                    description: document.getElementById('description').value,
                });
                hideLoading();
                if (data.error) {
                    showMessage(data.error);
                } else {
                    document.location.hash = '/productlist';
                }
            });
        //******************/
        // document
        //     .getElementById('image-file')
        //     .addEventListener('change', async(e) => {
        //         const file = e.target.files[0];
        //         const formData = new FormData();
        //         formData.append('image', file);
        //         showLoading();
        //         const data = await uploadProductImage(formData);
        //         hideLoading();
        //         if (data.error) {
        //             showMessage(data.error);
        //         } else {
        //             showMessage('Image uploaded successfully');
        //             document.getElementById('image').value = data.image;
        //         }
        //     });
        //******************/


        //****** Firebase connectivity for image start ******//

        //--------------------- SELECTION PROCESS START------------------------//

        document.getElementById("select").onclick = function(e) {
            console.log("SELECt CALL == 1");

            var input = document.createElement("input");
            input.type = "file";

            console.log("SELECt CALL == 2", input);

            input.onchange = (e) => {
                files = e.target.files;
                reader = new FileReader();

                console.log("SELECt CALL == 3");

                reader.onload = function() {
                    document.getElementById("myimg").src = reader.result;
                };
                reader.readAsDataURL(files[0]);
                console.log("reader ", reader);
                uploadToFirebase();
            };

            input.click();

        };

        //--------------------- SELECTION PROCESS END------------------------//

        //-------------------- UPLOAD PICTURE TO STORAGE START ------------------//
        function uploadToFirebase() {
            // step 1
            console.log("ImgName=>> ", ImgName);
            var uploadTask = firebase
                .storage()
                .ref("ImagesProduct/" + rollv + ".png")
                .put(files[0]);

            //step 2
            uploadTask.on(
                "state_changed",
                function(snapshot) {
                    var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    document.getElementById("UpProgress").innerHTML =
                        "Upload" + progress + "%";
                    console.log("progress=>> ", progress);
                },

                //step 3
                function(error) {
                    alert("error in saving the image ");
                },

                //step 4
                function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(url) {

                        ImgUrl = url;
                        console.log("ImgUrl ", ImgUrl);
                        firebase
                            .database()
                            .ref("Pictures/" + rollv)
                            .set({
                                id: rollv,
                                Name: document.getElementById('name').value,
                                Link: ImgUrl,
                            });
                        console.log("LinkIMG=>> ", ImgUrl);

                        // alert("image uploaded successfully ");
                        showMessage("image uploaded successfully ")
                        getImageById();
                    });
                }
            );
        }

        //-------------------- UPLOAD PICTURE TO STORAGE END ------------------//

        //----------------------- RETRIEVAL BY ID START -----------------------//

        function getImageById() {
            console.log("rollv=> ", rollv);
            firebase
                .database()
                .ref("Pictures/" + rollv)
                .on("value", function(snapshot) {
                    Product_Fname = snapshot.val().Name;
                    LinkToImage = snapshot.val().Link;
                });
            console.log("LinkToImage ", LinkToImage, Product_Fname);
        };
        //----------------------- RETRIEVAL BY ID END -----------------------//


        //****** Firebase connectivity for image end ******//

    },

    render: async() => {

        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        rollv = product._id;
        // ImgName = product.name;
        return `
    <div class="content">
      <div>
        <a href="/#/productlist">Back to products</a>
      </div>
      <div class="form-container">
        <form id="edit-product-form">
          <ul class="form-items">
            <li>
              <h1>Edit Product ${product._id.substring(0, 8)}</h1>
            </li>
            <li>
              <label for="name">Name</label>
              <input type="text" name="name" value="${
                product.name
              }" id="name" />
            </li>
            <li>
              <label for="price">Price</label>
              <input type="number" name="price" value="${
                product.price
              }" id="price" />
		      	</li>
			
            <li class="primary-btn">
              <img id="myimg" src="" value="${LinkToImage}" /><label id="UpProgress" ></label>
              <div id="select" >Choose File </div>
            </li>
            

            <li>
              <label for="brand">Brand</label>
              <input type="text" name="brand" value="${
                product.brand
              }" id="brand" />
            </li>
            <li>
              <label for="countInStock">Count In Stock</label>
              <input type="text" name="countInStock" value="${
                product.countInStock
              }" id="countInStock" />
            </li>
            <li>
              <label for="category">Category</label>
              <input type="text" name="category" value="${
                product.category
              }" id="category" />
            </li>
            <li>
              <label for="description">Description</label>
              <input type="text" name="description" value="${
                product.description
              }" id="description" />
            </li>
            <li>
              <button type="submit" class="primary">Update</button>
            </li>
          </ul>
        </form>
      </div>
    </div>
    `;
    },
};
export default ProductEditScreen;