import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  Fases: null,
  Observaties: null,
  status: 0
})

export const mutations = {
  setSheet(state, {id, content}) {
    console.log(content)
    state[id] = content
  },
  setStatus(state, val) {
    state.status = val
  }
}

export const actions = {

  async getSheet({ state, dispatch, commit }, { spreadSheetId, sheet }) {
    try {
      const resultSheet = await fetch('/.netlify/functions/get-sheet', {
        method: 'POST',
        body: JSON.stringify({
          spreadSheetId: spreadSheetId,
          sheet
       })
      })
      const content = await resultSheet.json()
      console.log(content)
      commit('setSheet' , {id: sheet, content: content});
      return;
    } catch (err) {
      console.log(err)
      throw 'Unable to fetch sheet'
      
    }
  },
  async sendFormData({ state, dispatch, commit }, { spreadSheetId, actionData, activeCard }) {

    commit('setStatus', 1)
    console.log('here goes', spreadSheetId, activeCard, actionData)

    // Overwrite the updated info from the form
    const updatedCard = {
      ...activeCard,
      'Status': actionData.status,
      'Actie': actionData.text,
      'Verantwoordelijke': actionData.owner
    }

    const data = {
      spreadSheetId: spreadSheetId,
      sheet: 'Observaties',
      card: updatedCard
    }

    try {
      const updatedRow = fetch('/.netlify/functions/update-sheet', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(res => {
        console.log('RES', res)
        // commit('setStatus', 2)
        dispatch('getSheet', { spreadSheetId, sheet: data.sheet }).then(res => {
          commit('setStatus', 2)
          setTimeout(function(){
            commit('setStatus', 0)
          },500);

        })
      })


      const content = await updatedRow.json()


      console.log(content)

    } catch (err) {
      console.log(err)
      throw 'Unable to fetch sheet'

    }

  },



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
      
      if(observation['Moment Beschrijving'] == undefined) return acc;
      const topic = observation['Topic naam']
      
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
    
    return ObservationsPerTopic
  },
  
}
