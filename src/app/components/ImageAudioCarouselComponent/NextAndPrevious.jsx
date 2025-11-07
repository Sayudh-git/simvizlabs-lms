import React from 'react'

const NextAndPrevious = ({goPrev, goNext, canNavigate}) => {
  return (
<div className="flex items-center gap-1">
        <button
            onClick={goPrev}
            className="px-4 py-2 rounded-md "
            title="Previous"
          >
            Prev
          </button>
          <button
            onClick={goNext}
            // disabled={!canNavigate}
            // className={`px-4 py-4 rounded-md ${canNavigate ? "bg-white text-black font-bold  hover:bg-gray-400 hover:text-white" : "bg-black text-white  cursor-not-allowed"}`}
            className={`px-4 py-4 rounded-md bg-white text-black font-bold  hover:bg-gray-400 hover:text-white` }
            title="Next"
          >
            Next
          </button>
        </div>  )
}

export default NextAndPrevious