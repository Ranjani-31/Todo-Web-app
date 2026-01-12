import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'


function ProtectedRoute({children}){

    const token = Cookies.get('token')
console.log(token)
if (!token) return <Navigate to="/login" replace />

    return children 

}  

 
export default ProtectedRoute  