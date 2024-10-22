import axios from 'axios';
import { Failed } from '../helpers/popup';

const API_URL = 'http://localhost:3000/api/v1/sheet/';

// Function to upload PDF
export const uploadSheet = async (sheet) => { 
    try{
        const config = { 
            headers: { 
                'Content-Type': 'multipart/form-data'  
            } 
        };
        
        const response = await axios.post(API_URL + 'upload', sheet, config);
        console.log(response)
        return response;
    }
    catch(err){
        Failed(err)
    }
};
export const getProducts = async () => { 
    const response = await axios.get(API_URL);
    return response;
};
export const editProductDetails = async (id,data) => { 
    try{
        const response = await axios.put(`${API_URL}${id}`,data);
    return response;
    }catch(err){
        Failed(err)
    }
};
export const deleteProduct = async (id) => { 
    try{
        const response = await axios.delete(`${API_URL}${id}`);
    return response;
    }
    catch(err){
        Failed(err)
    }
};




