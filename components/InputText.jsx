// 'use client'

// import { useState } from 'react'

// const inputSize = {
//   small: 'w-32 h-7 p-1',
//   medium: 'w-3/5 h-6 p-2',
//   large: 'w-4/5 h-7 p-3'
// }

// const Focus = {
//   styles: 'border-b-green-500 text-white bg-transparent'
// }

// const InputText = ({
//   label,
//   type = 'text',
//   placeholder,
//   size = 'medium',
//   icon,
//   onChange,
//   fullwidth
// }) => {
//   const [isFocused, setIsFocused] = useState(false)
//   const [inputValue, setInputValue] = useState('')

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value)
//     onChange(event) // Pasa el evento al onChange si está definido
//   }

//   return (
//     <div className={`${fullwidth ? 'w-full' : 'w-4/5'}`}>
//       <label className='text-red'>{label}</label>
//       <div
//         className={`
//           flex bg-white
//           border ${isFocused ? 'border-green-500' : 'border-slate-500'}
//           bg-blue-300 ${inputSize[size]}
//           transition-all duration-300 rounded-md shadow-md
//         `}
//       >
//         {icon}
//         <input
//           type={type}
//           placeholder={placeholder}
//           className={`
//             outline-none ${isFocused ? Focus[' styles '] : 'border-none'}
//             w-full px-2 bg-transparent text-white
//           `}
//           value={inputValue}
//           onChange={handleInputChange}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//         />
//       </div>
//     </div>
//   )
// }

// export default InputText
