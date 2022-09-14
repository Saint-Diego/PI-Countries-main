const validatorFields = (data) => {
  if (!data.name) return {msgName: 'Campo obligatorio'};
  if (!isNaN(data.name)) return {msgName: 'Ingrese solamente texto'};
  if (data.difficulty < 1 || data.difficulty > 5) return {msgDifficulty: 'Ingrese un valor entre 1 a 5'};
  if (!data.difficulty) return {msgDifficulty: 'Campo obligatorio'};
  if (data.duration  < 1 || data.duration > 24) return {msgDuration: 'Ingrese un valor entre 1 a 24'};
  if (!data.duration) return {msgDuration: 'Campo obligatorio'};
  if (!data.season) return {msgSeason: 'Seleccione una temporada'};
  if (!data.opCountries.length) return {msgCountries: 'Seleccione paises a asociar'};
	return false;
}

export default validatorFields