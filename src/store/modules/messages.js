// import vue from 'vue'
import axios from '../../rest/instances/axiosDefaultConfig'
import ext from '../../custom/extensions'

export default {
  state: {
    message: {
      content: '',
      createdDate: '',
      tags: []
    },
    messages: []
  },
  getters: {
    getMessages (state) {
      return state.messages
    }
  },
  mutations: {
    setMessages (state, msgs) {
      state.messages = msgs
    }
  },
  actions: {
    newMessage (context, payload) {
      const newMessage = {
        content: payload.content,
        createdDate: Date(),
        tags: payload.tags
      }
      axios.post('message.json' + '?auth=' + context.getters.getToken, newMessage)
      .then(response => {
        // console.log('[POST] Message', response)
      })
      .catch(error => console.log(error))
    },
    fetchMessages (context) {
      axios.get('message.json' + '?auth=' + context.getters.getToken)
      .then(response => {
        return response
      })
      .then(resp => {
        ext.MyLog()
        /*
        const arr = []
        const items = resp.data
        for (let key in items) {
          const item = items[key]
          item.id = key
          arr.push(item)
        }
        */
        // console.log(arr)
        context.commit('setMessages', ext.PromiseToArray(resp.data))
      })
      .catch(error => console.log(error))
    }
  }
}
