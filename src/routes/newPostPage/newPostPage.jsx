import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill" ;
import "react-quill/dist/quill.snow.css";
import apiReuest from "../../lib/apiRequest";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";


function NewPostPage() {
  const [value, setValue] = useState("") 
  const [error, setError] = useState("")
  const [images, setImages] = useState([])
  const navigate  = useNavigate()


  const handleSubmit = async(e) =>{
    e.preventDefault()

    const formData = new FormData(e.target)
    const inputs = Object.fromEntries(formData)
    const sanitizedValue = DOMPurify.sanitize(value);

    // Ensure description isn't empty
    if (!sanitizedValue.trim()) {
      setError("Description is required");
      return;
    }
    try {
      const response = await apiReuest.post("/posts", {
        postData:{
          "title": inputs.title,
          "price": parseInt(inputs.price),
          "images": images,
          "address": inputs.address,
          "city": inputs.city,
          "bedroom": parseInt(inputs.bedroom),
          "bathroom": parseInt(inputs.bathroom),
          "type": inputs.type,
          "property": inputs.property,
          "latitude": inputs.latitude,
          "longitude": inputs.longitude 
      },
      postDetail:{
        "desc":         value,
        "utilities":    inputs.utilities,
        "pet":          inputs.pet,           
        "income" :      inputs.income,
        "size":          parseInt(inputs.size),
        "school":        parseInt(inputs.school),
        "bus":           parseInt(inputs.bus),        
        "restaurant":    parseInt(inputs.restaurant)
      }
    })
    navigate("/"+ response.data.id)
    } catch (error) {
      
    }

    console.log(inputs)
  }
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item"> 
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" min={0} name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder="Write a detailed description here..."
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline", "strike"],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </div>
           
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size"  name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {
              error && <span>{error}</span>
            }
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {
          images.map((image, index) =>{
           return <img src={image} key={index} alt=""/>
          })
        }
        <UploadWidget uwConfig={{
          multiple: true,
          cloudName: "pelumi4",
          uploadPreset: "estate",
          maxImageFileSize: 2000000,
          folder:"posts"
        }}
        setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
