
const FormField = ({ lableName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          className="block text-sm font-medium text-gray-900" 
          htmlFor={name}>
          {lableName}
        </label>
        { isSurpriseMe && (
          <button 
          type="button"
          onClick={handleSurpriseMe}
          className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise me
          </button>
        )}
      </div>

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        autocomplete="off"
        className="bg-transparent apparence-none border-b border-gray-300 text-gray-100 text-lg outline-none block w-full lg:w-[800px] mx-auto p-3"
       />

    </div>
  )
}

export default FormField