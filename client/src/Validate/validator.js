const validatorFields = (data) => {
  if (!data.name) return 'Ingrese nombre de la actividad';
  if (!isNaN(data.name)) return 'Ingrese solo texto';
  if (data.difficulty < 1 || data.difficulty > 5) return 'Ingrese un valor entre 1 a 5';
  if (!data.difficulty) return 'Ingrese un valor numérico';
  if (data.duration  < 1) return 'Ingrese un valor mayor a cero';
  if (!data.duration) return 'Ingrese un valor numérico';
  if (!data.season) return 'Seleccione una temporada';
  if (!data.opCountries.length) return 'Seleccione paises a asociar';
}

export default validatorFields