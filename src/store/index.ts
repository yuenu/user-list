import { reactive, computed } from 'vue'
import type { Response, ListDisplay, PerPage } from '../types'
import * as API from '../api'

interface IState {
  responseData: Response['results']
  isLoading: boolean
  errorMessage: string
  displayType: ListDisplay
  perPage: PerPage
  currentPage: number
}

const state = reactive<IState>({
  responseData: [],
  isLoading: false,
  errorMessage: '',
  displayType: 'column',
  perPage: 30,
  currentPage: 1,
})

const getters = reactive({
  getResponseData: computed(() => state.responseData),
  getIsLoading: computed(() => state.isLoading),
  getErrorMessage: computed(() => state.errorMessage),
  getDisplayType: computed(() => state.displayType),
  getPerPage: computed(() => state.perPage),
  getCurrentPage: computed(() => state.currentPage),
})

const actions = {
  SWITCH_DISPLAY_TYPE(type: ListDisplay) {
    state.displayType = type
  },

  CHANGE_PER_PAGE(displayNum: PerPage) {
    state.perPage = displayNum
  },

  CHANGE_PAGE(page: number) {
    state.currentPage = page
  },

  async GET_USERS(count: PerPage = 30, page: number = 1) {
    try {
      state.isLoading = true
      this.CHANGE_PER_PAGE(count)
      const results = await API.getUsers(count, page)
      state.responseData = results.results
    } catch (e) {
      console.error('Unpexct Error:', e)
      state.errorMessage = String(e)
    } finally {
      state.isLoading = false
    }
  },
}

export default { state, getters, ...actions }
