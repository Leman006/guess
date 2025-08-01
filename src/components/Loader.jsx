import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#e5e5e5]">
      <div className="w-12 h-12 animate-spin relative">
        <div className="absolute w-2.5 h-2.5 rounded-full bg-black top-0 left-0" />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-gray-600 top-0 right-0" />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-gray-600 bottom-0 left-0" />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-black bottom-0 right-0" />
      </div>
    </div>
  )
}

export default Loader
