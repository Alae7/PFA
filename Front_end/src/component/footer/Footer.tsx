import React from 'react'
import { socials } from '../../constants'

const Footer = () => {
  return (


    <footer className="relative bottom-0 z-10 left-0 w-full border-t shadow grid p-6 bg-[#111827] border-gray-600">
      <span className="text-sm text-center text-gray-400">© 2023 <a href="#" className="hover:underline">MarketPlace™</a>. All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 justify-self-center text-sm font-medium text-gray-400 sm:mt-0">
        {socials?.map((item, i) => {

          return (
            <li key={i}>
              <a href={item.href} className="hover:underline me-4 md:me-6"> {item.icon} </a>
            </li>
          )
        })}
      </ul>
    </footer>

  )
}

export default Footer