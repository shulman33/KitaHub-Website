import React from 'react'
import Image from 'next/image'
const SearchBar = () => {
  return (
    <div className="flex w-full rounded-[4px] bg-lightBlue h-[40px] py-1 pl-2 pr-1">
          <input className="w-full bg-transparent text-[14px] leading-[17px] " type="text" placeholder="Search Discussipns.." />
          <Image src="/search.svg" width={32} height={32} alt="search" />
        </div>
  )
}

export default SearchBar