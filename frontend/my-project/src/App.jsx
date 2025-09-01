import Login from "./login";
import Signup from "./sighn-up"
import {BrowserRouter , Routes , Route} from 'react-router-dom'

function App(){
    return(
         <BrowserRouter>
         <Routes>
            <Route path='/' element={<Login/>}> </Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/home' element={<div className="p-14 text-center font-serif text-4xl">Welcome to Home Page</div>}></Route>
         </Routes>
         </BrowserRouter>
    )
}
 export default App