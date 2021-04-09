const moment = require("moment");
const wiki =require('wikijs').default;

const SIGNOS = [
  { signo: "Aquário", meses: [1, 2], dias: [20, 18], name:'aquarius' },
  { signo: "Peixes", meses: [2, 3], dias: [19, 20], name:'pisces' },
  { signo: "Áries", meses: [3, 4], dias: [21, 19], name:'aries' },
  { signo: "Touro", meses: [4, 5], dias: [20, 20], name:'taurus' },
  { signo: "Gêmeos", meses: [5, 6], dias: [21, 21], name:'gemini'  },
  { signo: "Câncer", meses: [6, 7], dias: [22, 22], name:'cencer' },
  { signo: "Leão", meses: [7, 8], dias: [23, 22], name:'leo' },
  { signo: "Virgem", meses: [8, 9], dias: [23, 22],  name:'virgo' },
  { signo: "Libra", meses: [9, 10], dias: [23, 22], name:'libra' },
  { signo: "Escorpião", meses: [10, 11], dias: [23, 21], name:'scorpio' },
  { signo: "Sagitário", meses: [11, 12], dias: [22, 21], name:'sagittarius' },
  { signo: "Capricórnio", meses: [12, 12], dias: [19, 31], name:'capricornus' },
  { signo: "Capricórnio", meses: [1, 1], dias: [1, 19], name:'capricornus' },
];

const getSigno = (dt) => {
    const dataNascimento = moment(dt);
    console.log("signo", dataNascimento);
  for (const o of SIGNOS) {
    dia = (dataNascimento.month() + 1) * 100 + dataNascimento.date();
    if (
      dia >= o["meses"][0] * 100 + o["dias"][0] &&
      dia <= o["meses"][1] * 100 + o["dias"][1]
    ) {
      return o;
    }
  }
};


function retira_acentos(str) {
  let com_acento =
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";

  let sem_acento =
    "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
  let novastr = "";
  for (i = 0; i < str.length; i++) {
    let troca = false;
    for (a = 0; a < com_acento.length; a++) {
      if (str.substr(i, 1) == com_acento.substr(a, 1)) {
        novastr += sem_acento.substr(a, 1);
        troca = true;
        break;
      }
    }
    if (troca == false) {
      novastr += str.substr(i, 1);
    }
  }
  return novastr;
}


const sanitize = (nome) => {
  return retira_acentos(
      nome
      .trim()
      .toLowerCase()
      .replace(/\s+/gim, " "));
}

const consultaWiki=async (nome)=>{
     return( await wiki().find(nome)
    .then(async page => ({'info':await page.info(), 'imagem':await page.mainImage(), 'url':page.url()}) )
    .catch(e=>JSON.stringify(e)));

}


const pesquisa = async (_nome) => {

  const nome = sanitize(_nome);


  let resp = await consultaWiki(nome);
  try {
    var signo = undefined;
    if (resp.info?.birthDate?.date) {
      signo =  getSigno(new Date(resp.info?.birthDate?.date));
    }
    return ( {...resp, signo} );
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = pesquisa;
