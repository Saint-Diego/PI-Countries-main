const axios = require('axios');
const { Country, Op } = require('../db');

const URL_API = 'https://restcountries.com/v3/all';

class ModelCRUD {
  constructor(modelo) {
    this.model = modelo;
  }; 

  downloadCountries = async () => {
    try {
      const { data } = await axios.get(URL_API);
      const countries = data?.map((country) => (
        { 
          id: country.cca3,
          nameEn: country.name.common, 
          nameEs: country.translations.spa.common,
          flag: country.flags[1], 
          continent: country.continents[0], 
          capital: country.capital ? country.capital[0] : "Sin capital",
          subregion: country.subregion ? country.subregion : "Sin subregión", 
          area: country.area,
          population: country.population,
        }
      ));
      await this.model.bulkCreate(countries);
      return countries;
    } catch (error) {
      throw new TypeError(error.message);
    }
  };

  getAll = async (req, res, next) => {
    let name = (req.query) ? req.query.name : null;
    let data = null;
    try {
      if (name) {
        data = await this.getByName(name);
        if (!data.length) res.status(404).send("Criterio de busqueda sin coincidencia");
      } else {
        const dbCountries = await this.model.findAll();
        const countries = (!dbCountries.length) ? await this.downloadCountries() : dbCountries;
        const promise = await countries?.map(async (c) => await this.setActivities(c));
        data = await Promise.all(promise);
      }
      res.send(data);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    let id = (req.params) && req.params.idPais;
    try {
      const result = await this.model.findByPk(id);
      if (!result) res.status(404).send('País no encontrado');
      else {
        res.send(await this.setActivities(result));
      }
    } catch (error) {
      next(error);
    }
  };

  getByName = async (nameCountry) => {
    const condition = {
      where: {
        nameEs: {
          [Op.iLike]: `%${nameCountry}%`
        }
      }
    };
    try {
      const dbCountries = await this.model.findAll(condition);
      const promise = await dbCountries?.map(async (c) => await this.setActivities(c));
      return await Promise.all(promise);
    } catch (error) {
      throw new TypeError(error.message);
    }
  };

  create = async (req, res, next) => {
    const {name, difficulty, length, season, opCountries} = req.body;
    try {
      const [activity, created] = await this.model.findOrCreate({
        where: {name},
        defaults: {difficulty, length, season}
      });
      if (!created) res.send(`La actividad turística ${name} ya existe`);
      await this.transfer(opCountries, activity);
      res.status(201).send('Activitidad creada correctamente');
    } catch (error) {
      next(error);
    }
  };

  transfer = async (countries, activity) => {
    try {
      countries?.map(async (name) => {
        const country = await Country.findOne({where: {nameEn: name}});
        await country.addActivity(activity);
      });
    } catch (error) {
      throw new TypeError(error.message);
    }
  };

  setActivities = async (country) => {
    try {
      if (!country.getActivities) return {...country, activities: []};
      const activities = await country.getActivities();
      return {...country, activities};
    } catch (error) {
      throw new TypeError(error.message);
    }
  };
}

module.exports = ModelCRUD;