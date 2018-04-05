// import vue from 'vue'
import axios from '../../rest/instances/axiosConfig'

export default {
  state: {
    message: {
      content: '',
      createdDate: '',
      tags: []
    },
    messages: [{}]
  },
  getters: {
    getMessages () {
      axios
      .get('message.json')
      .then(response => {
        return response.data
      })
      .catch(error => console.log(error))
    }
  },
  mutations: {},
  actions: {
    newMessage (context, payload) {
      const msg = {
        content: payload.content,
        createdDate: payload.createdDate,
        tags: payload.tags
      }
      axios.post('message.json', msg)
      .then(response => {
        console.log('[POST] Message', response)
      })
      .catch(error => console.log(error))
    }
  }
}
