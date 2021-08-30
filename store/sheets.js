import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  Fases: null,
  Observaties: null
})

export const mutations = {
  setSheet(state, {id, content}) {
    console.log(content)

    state[id.slice(3)] = content
  }
}

export const actions = {
  
  async getSheet({ state, dispatch, commit }, { spreadSheetId, sheet }) {
    console.log(spreadSheetId, sheet)
    try {
      const resultSheet = await fetch('/.netlify/functions/get-sheet', {
        method: 'POST',
        body: JSON.stringify({
          spreadSheetId: spreadSheetId,
          sheet
       })
      })
      const content = await resultSheet.json()
      commit('setSheet' , {id: sheet, content: content});
      return;
    } catch (err) {
      console.log(err)
      throw 'Unable to fetch sheet'
      
    }
  }
}

export const getters = {
  // Info: state => {
  //   if(state.Info === null) return null; 
  //   return state.Info[0]
  // },
  // Fases: state => {
  //   if(state.Fases === null) return null; 
  //   // const fasesWithoutEmptylines = state.Fases.filter(f => f['Naam'] !== undefined)
  //   return state.Fases
  // },
  // 
  ObservationsPerTopic: state => {
   
    // console.log(state.Observaties)
    if(state.Observaties == undefined) return null;
    if(state.Observaties == null) return null;
    const ObservationsPerTopic = state.Observaties.reduce((acc, observation) => {
      // console.log(observation)

      if(observation['Moment beschrijving'] == undefined || observation['Moment beschrijving'] == '') return acc;

      let topic = 'Geen categorie'
      if(observation['Topic naam'] != undefined) topic = observation['Topic naam']

      if(acc[topic]) {
        acc[topic].cards = [...acc[topic].cards, observation.Id * 1]
      } else {
        acc[topic] = {
          description: observation['Topic beschrijving'],
          cards: [
            observation.Id * 1
          ]
        }
      }
      
      return acc
      
    }, {})
    console.log(ObservationsPerTopic)
    return ObservationsPerTopic
  },
  
}
