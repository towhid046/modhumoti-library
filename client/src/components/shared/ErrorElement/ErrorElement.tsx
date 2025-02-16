import React from 'react'

interface ErrorElementProps {
  text: string;
}

const ErrorElement: React.FC<ErrorElementProps> = ({text}) => {
  return (
    <h2 className="text-center text-2xl min-h-[80vh] flex justify-center items-center italic text-gray-500 font-semibold">
        {text}
      </h2>
  )
}

export default ErrorElement
