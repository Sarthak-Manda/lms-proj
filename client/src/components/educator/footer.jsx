import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-white text-gray-600 py-10 px-6 mt-auto'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>
        
        {/* Logo */}
        <img src={assets.logo} alt="logo" className='w-28 brightness-200' />

        {/* Divider (vertical on md+) */}
        <div className='hidden md:block w-px h-10 bg-gray-600' />

        {/* Copyright */}
        <p className='text-sm text-center'>
          Copyright 2026 &copy; SarthakManda. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className='flex items-center gap-4'>
          <a href="#" className='hover:text-white transition-colors'>
            <img src={assets.facebook_icon} alt="facebook" className='w-5 h-5' />
          </a>
          <a href="#" className='hover:text-white transition-colors'>
            <img src={assets.twitter_icon} alt="twitter" className='w-5 h-5' />
          </a>
          <a href="#" className='hover:text-white transition-colors'>
            <img src={assets.instagram_icon} alt="instagram" className='w-5 h-5' />
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer