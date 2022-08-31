const { Country, Op } = require('../db');

const URL_API = `https://restcountries.com/v3.1/all`;

class ModelCRUD {
  constructor(modelo) {
    this.model = modelo;
  }; 

  downloadCountries = async () => {
    try {
      const { data } = await axios.get(URL_API);
      const countries = await data?.map((country) => (
        { 
          id: country.cca3,
          name: country.name.common, 
          flag: country.flags[0], 
          continent: country.continents[0], 
          capital: country.capital[0],
          subregion: country.subregion, 
          area: country.area,
          population: country.population,
        }
      ));
      await this.model.bulkCreate(countries);
      return await this.model.findAll();
    } catch (error) {
      throw new TypeError(error.message);
    }
  };

  getAll = async (req, res, next) => {
    const { name } = req.query;
    let data = null;
    try {
      if (name) {
        data = await this.getByName(name);
        if (!data.length) res.status(404).send('Country not found!');
      } else {
        data = await this.model.findAll();
        if (!data.length) data = await this.downloadCountries(next);
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
      if (!result) res.status(404).send('Country not found!');
      res.send(result);
    } catch (error) {
      next(error);
    }
  };

  getByName = async (nameCountry) => {
    const condition = {
      where: {
        name: {
          [Op.iLike]: `%${nameCountry}%`
        }
      }
    };
    try {
      return await this.model.finAll(condition);
    } catch (error) {
      throw new TypeError(error.message);
    }
  };

  create = async (req, res, next) => {
    try {
      const created = await this.model.create(req.body);
      if (!created) res.send(`Tourism activity ${req.body.name} already exist`);
      await this.transfer(req.body.countries, created);
      res.status(201).send('Activity created successfully');
    } catch (error) {
      next(error);
    }
  };

  transfer = async (countries, activity) => {
    try {
      countries?.map(async (name) => {
        const country = await Country.findOne({where: {name}});
        await country.addActivity(activity);
      });
    } catch (error) {
      throw new TypeError(error.message);
    }
  };
}

module.exports = ModelCRUD;