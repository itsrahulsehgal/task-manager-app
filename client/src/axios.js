import axios from "axios";
export default axios.create({
    baseURL: 'https://task-manager-app-iahj.vercel.app'
    // baseURL: 'http://localhost:5000' 
});
