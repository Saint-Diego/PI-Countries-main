import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCountryByName } from '../../slices/index';

const SearchBar = () => {
  const [name, setName] = useState("");
  const refInput = useRef(null);
  const dispatch = useDispatch();

  const handleChange = () => {
    setName(refInput.current.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchCountryByName(name));
    setName("");
    refInput.current.focus();
  };

  return (
    <div>
      <input type="text" ref={refInput} value={name} placeholder='Buscar...' onChange={handleChange}/>
      <button onClick={handleClick}>Buscar</button>
    </div>
  )
}

export default SearchBar