import { useState, useEffect } from "react";
import {
  deleteProduct,
  getProducts,
  uploadSheet,
  editProductDetails,
} from "../services/uploadService";
import { Failed, Success } from "../helpers/popup";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadSheet(formData);
        Success(res.data.message);
      fetchProducts();
    } catch (err) {
      Failed(err);
    }
  };

  const handleDelete = async (id) => {
    const res=await deleteProduct(id);
    fetchProducts();
    Success(res.data.message);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleSaveEdit = async (id) => {
    const res=await editProductDetails(id, { ...editProduct });
    fetchProducts();
    Success(res.data.message);
    setEditProduct(null);
  };

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <div className="mb-6">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          onClick={handleUpload}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Upload
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="text-left py-3 px-4">Name</th>
            <th className="text-left py-3 px-4">Description</th>
            <th className="text-left py-3 px-4">Model Number</th>
            <th className="text-left py-3 px-4">Price</th>
            <th className="text-left py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {products?.map((product) => (
            <tr key={product._id} className="border-t even:bg-gray-50">
              <td className="py-3 px-4">
                {editProduct && editProduct._id === product._id ? (
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        name: e.target.value,
                      })
                    }
                    className="block w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="py-3 px-4">
                {editProduct && editProduct._id === product._id ? (
                  <input
                    type="text"
                    value={editProduct.description}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        description: e.target.value,
                      })
                    }
                    className="block w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                ) : (
                  product.description
                )}
              </td>
              <td className="py-3 px-4">
                {editProduct && editProduct._id === product._id ? (
                  <input
                    type="text"
                    value={editProduct.modelNumber}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        modelNumber: e.target.value,
                      })
                    }
                    className="block w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                ) : (
                  product.modelNumber
                )}
              </td>
              <td className="py-3 px-4">
                {editProduct && editProduct._id === product._id ? (
                  <input
                    type="number"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        price: e.target.value,
                      })
                    }
                    className="block w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td className="py-3 px-4 flex gap-2">
                {editProduct && editProduct._id === product._id ? (
                  <button
                    onClick={() => handleSaveEdit(product._id)}
                    className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
