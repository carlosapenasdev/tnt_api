require('dotenv').config();
const axios = require("axios");
const mongoose = require("mongoose");
const { Schema } = mongoose;

class Questions {
  constructor() {
    this.pageSize = 500;
    this.baseUrl = process.env.BASE_URL;
    this.idToken = process.env.TOKEN_GOOGLE;
    this.mongoUri = process.env.MONGO_URI;
    this.indexStart = process.env.START_AT;
    this.accessToken = "";
    this.totalPages = this.indexStart+1;
    this.questionSchema = new Schema({
      id: { type: Number },
      value: { type: String },
      language: { type: String }
    });
    this.questionModel = mongoose.model('Question', this.questionSchema);
  }

  async login() {
    const data = JSON.stringify({
      idToken: this.idToken,
      provider: "Google",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}Account/ExternalLogin`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      this.accessToken = `Bearer ${response.data.result.token}`;
      console.log('Login bem sucedido');
    } catch (error) {
      throw new Error('Falha no login');
    }
  }

  async requestData(pageIndex) {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${this.baseUrl}Questions?pageIndex=${pageIndex}&pageSize=${this.pageSize}`,
      headers: {
        'Authorization': this.accessToken
      }
    };

    try {
      const response = await axios.request(config);
      const data = response.data.result.data;
      this.totalPages = response.data.result.totalPages;
      return data;
    } catch (error) {
      throw new Error('Falha ao buscar dados');
    }
  }

  async readFromTntApi() {
    const result = [];

    for (let pageIndex = this.indexStart; pageIndex <= this.totalPages; pageIndex++) {
      let data;
      try {
        data = await this.requestData(pageIndex);
      } catch (error) {
        await this.login();
        pageIndex--;
        continue;
      }

      if (data && data.length > 0) {
        for (const item of data) {
          const question = {
            id: item.id,
            value: item.value
          };
          try {
            await this.questionModel.findOneAndUpdate(
              { id: question.id },
              { $set: question },
              { upsert: true }
            );
          } catch (error) {
            throw new Error('Falha ao atualizar dados no MongoDB');
          }
        }
      }

      const percentage = (pageIndex / this.totalPages) * 100;
      console.log(`Progresso: ${pageIndex} - ${percentage.toFixed(2)}% concluído`);
    }

    return result;
  }

  async importFromApi() {
    await mongoose.connect(this.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await this.readFromTntApi();

      console.log('Todos os dados foram armazenados com sucesso!');
    } catch (error) {
      console.log('Erro ao buscar e atualizar os dados:', error);
    } finally {
      mongoose.disconnect();
    }
  }

  async import() {
    try {
      await this.login();
      await this.importFromApi();
    } catch (error) {
      console.log("Ocorreu um erro:", error);
    }
  }
}

module.exports = Questions;