// eslint-disable-next-line react/prop-types
export default function FormInput({label,id,type,name,placeholder,onChange,onBlur, value, error }){
	return(
	
		<div>
			<label htmlFor={id}>{label} </label>
			<input
				id={id}
				className={`p-3 bg-transparent border border-gray-400 rounded w-full`}
				placeholder={placeholder}
				type={type}
				name={name} 
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				required/>
				
				<p className="inputError">{error}</p>
		</div>
				
	
		
	)
}