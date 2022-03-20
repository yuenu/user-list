import { reactive, computed } from 'vue'
import type { Response} from '../types'
import * as API from '../api'


interface IState {
  responseData: Response['results'],
  isLoading: boolean,
  errorMessage: string,
  displayType: 'column' | 'row'
  perPage: 10 | 30 | 50,
  currentPage: number
}

const state = reactive<IState>({
  responseData: [],
  isLoading: false,
  errorMessage: '',
  displayType: 'column',
  perPage: 30,
  currentPage: 1
})


const getters = reactive({
  getResponseData: computed(() => state.responseData),
  getIsLoading: computed(() => state.isLoading),
  getErrorMessage: computed(() => state.errorMessage),
  getDisplayType: computed(() => state.displayType),
  getPerPage: computed(() => state.perPage),
  getCurrentPage: computed(() => state.currentPage)
})

const actions = {
  SWITCH_DISPLAY_TYPE(type: 'column' | 'row') {
    state.displayType = type
  },

  CHANGE_PER_PAGE(displayNum: 10 | 30 | 50) {
    state.perPage = displayNum
  },

  CHANGE_PAGE(page: number) {
    state.currentPage = page
  },

  async GET_USERS(count: number = 30, page: number = 1) {
    try {
      state.isLoading = true
      const results = await API.getUsers(count, page)
      state.responseData = results.results
    } catch(e) {
      console.error('Unpexct Error:' , e)
      state.errorMessage = String(e)
    } finally {
      state.isLoading = false
    }
  }
}

export default { state, getters, ...actions }