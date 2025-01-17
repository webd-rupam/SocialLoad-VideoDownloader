import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className='w-full min-h-[51vh] overflow-x-hidden flex flex-col justify-between md:pt-20 pt-16 px-6 md:px-20 lg:px-40 bg-black text-white relative z-40'>
       
       <div className='flex flex-col md:flex-row justify-between'>
       
       <div className='w-full md:w-1/2 lg:w-1/3 mb-6 md:mb-0'>
         <h4 className='text-xl font-bold'>SocialLoad</h4>
         <p className='text-sm mt-4 md:mt-6 mb-6 lg:mr-10'>
         Experience seamless video downloads with SocialLoad. From popular platforms like Facebook, Instagram, and TikTok, to YouTube and more, enjoy quick and secure access to your favorite content. Whether you're on the go or relaxing at home, we make downloading videos effortless and fast.
         </p>
       </div>

       <div className='w-full md:w-1/2 lg:w-1/3 flex flex-col items-start md:items-end lg:items-end'>
         <h4 className='text-xl font-bold md:pr-[74px] mb-4'>SOCIAL</h4>
         <div className='flex flex-wrap gap-4'>
           <a href="https://www.linkedin.com/in/rupam-majee-0811a6288/" target="_blank" rel="noopener noreferrer">
             <img className='w-6 h-6' src="linkedin2.png" alt="LinkedIn" />
           </a>
           <a href="https://github.com/webd-rupam" target="_blank" rel="noopener noreferrer">
             <img className='w-6 h-6' src="github2.png" alt="GitHub" />
           </a>
           <a href="https://x.com/webd_rupam" target="_blank" rel="noopener noreferrer">
             <img className='w-6 h-6' src="x2.png" alt="X" />
           </a>
           <a href="https://www.instagram.com/rupam.ctl/" target="_blank" rel="noopener noreferrer">
             <img className='relative bottom-[2px] w-7 h-7' src="insta2.png" alt="Instagram" />
           </a>
         </div>

         <div className='flex gap-5 lg:hidden relative top-8'>
       <a href='/privacy' target='_blank' className='text-[12px] text-center mt-8 md:mt-0 mb-10 md:mb-8 underline'>Privacy Policy</a>
       </div>
       </div>

       </div>

       <div className='w-full bg-gray-700 h-[0.5px] mt-6 md:mt-0 md:my-6'></div>

<div className='flex justify-around'>

       <p className='text-[11.5px] text-center mt-8 md:mt-0 mb-10 md:mb-8'>&copy; Copyright {currentYear} YourRest . Made by <a className='underline' href='https://portfoliodekho.vercel.app' target="_blank">Webd Rupam</a></p>

</div>
     
         
    </div>
  )
}

export default Footer
