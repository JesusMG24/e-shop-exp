import { useState } from "react";
import api from "../api";

export default function ProductForm() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        if (image) formData.append("image", image);
        formData.append("description", description);

        try {
            const res = await api.post("/products/create/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Product created:", res.data);
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
                <label>Image:</label>
                <input type="file" onChange={handleImageChange} />
                {preview && (
                    <img src={preview} alt="Preview" />
                )}
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit">
                Submit
            </button>
        </form>
    );
}