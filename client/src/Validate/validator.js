const validatorFields = (data) => {
  if (!data.name) return 'Ingrese nombre de la actividad';
  if (data.difficulty < 1 || data.difficulty > 5) return 'Ingrese un valor entre 1 a 5';
  if (data.duration  < 0) return 'Ingrese un valor mayor a cero';
  if (!data.season) return 'Seleccione una temporada';
  if (!data.opCountries.length) return 'Ingrese nombre de la actividad';
}