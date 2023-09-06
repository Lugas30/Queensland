import React from 'react'

const Subscribe = () => {
  return (
    <div className='p-6 border-b-2 grid w-full items-center'>
      <div className='justify-center items-center text-center py-5'>
        <h4 className='text-2xl font-bold'>Subscribe newsletter</h4>
        <p className='pb-5'>Subscribe to receive updates, access to exclusive deals, and more.</p>
        <div className='flex justify-center items-center py-5'>
          <input type="text" placeholder="Your email" className="input input-bordered w-full max-w-xs" />
          <button className='btn btn-secondary normal-case'>Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default Subscribe