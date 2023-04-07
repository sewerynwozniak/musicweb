import React from 'react'
import {Outlet} from 'react-router-dom'



const LayoutMain = () => {
   

return ( 
    <div className='layout__main'> 
        <Outlet /> 
    </div>

)


}

export default LayoutMain