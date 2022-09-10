import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCountryByName } from '../../slices/index';
import iconoSearch from '../../assets/buscar.png';

const SearchBar = () => {
  const [name, setName] = useState("");
  const refInput = useRef(null);
  const dispatch = useDispatch();

  const handleChange = () => {
    setName(refInput.current.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCountryByName(name));
    setName("");
    refInput.current.focus();
  };

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <div className="input-group">
        <input className="form-control" type="search" ref={refInput} value={name} placeholder='Buscar' onChange={handleChange}/>
        <div className="input-group-btn">
          <button className="form-control" type="submit">
            <div>
              <img src={iconoSearch} alt="buscar.png" />
            </div>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar