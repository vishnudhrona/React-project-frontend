import React from 'react'
import Navbar from '../User/Component/Navbar'
import Userprofile from '../User/Component/Userprofile'
import Profilesidebar from '../User/Component/Profilesidebar'
import Footer from '../User/Component/Footer'

const Userprofilepage = () => {
    return (
        <>
            <Navbar />
            <div className='flex' style={{
                backgroundImage: `url(${'https://t3.ftcdn.net/jpg/06/36/02/34/360_F_636023434_Z5GffDckMSVS76lX7as3DdyfOyoHIIVx.jpg'})`, // Set the background image
                backgroundSize: 'cover', // Adjust background size as needed
                backgroundPosition: 'center', // Adjust background position as needed
                minHeight: '100vh' // Ensure the background covers the entire viewport
            }}>
                <Profilesidebar />
                <Userprofile />
            </div>
            <Footer />
        </>
    )
}

export default Userprofilepage
