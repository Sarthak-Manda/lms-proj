import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className = 'bg-gray-900 md:px-36 texxt-left w-full mt-10'>
      <div className = 'flex flex-col md:flex-row items-start px-8md: px-0 justify-center gap-10 md: gap-32 py-10 border-b border-white/30'> I
        <div className = 'flex flex-col md:items-start items-center w-full'>
          <img src = {assets.logo_dark } alt = 'logo' />
          <p className = 'mt-6 text-center mdtext-left text-sm text-white/80'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, odio. Quaerat laborum aperiam omnis repellat excepturi
             maiores error magni, reprehenderit, ut, quisquam culpa ipsum in esse consequuntur. Deleniti, dolores soluta! </p>
        </div>
        <div className='flex flex-col md: items-start items-center w-full'>
          <h2 className="text-lg font-semibold mb-5 text-white">Company</h2>
        <ul className="flex flex-col gap-3 text-gray-400 text-sm">
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>
        <div className = 'hidden md:flex flex-col items-start w-full'>
          <h2 className = 'font-semibold text-white mb-5'> Subscribe to our newsletter</h2>
          <p className = 'text-sm text-white/80'>The latest news, articles, and resources , sent to your indox weekly.</p>
          <div>
            <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l-md focus:outline-none" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md">Subscribe</button>
          </div>
        </div>

      </div>
      <p className='py-4 text-center text-xs md:text-sm text-white/60'> COPYRIGHT 2025 @HeHeStack. All right Reserved  </p>
    </footer>
  )
}

export default Footer
