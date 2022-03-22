import { reactive, computed } from 'vue'
import type { Response, ListDisplay } from '../types'
import * as API from '../api'

export const memorizedPerPage = Number(window.localStorage.getItem('perPage'))
export const memorizedDisplayType = window.localStorage.getItem('displayType')
export const memorizedCurrentPage = Number(
  window.localStorage.getItem('currentPage')
)

interface IState {
  responseData: Response['results']
  isLoading: boolean
  errorMessage: string
  displayType: string
  perPage: number
  currentPage: number
}

const state = reactive<IState>({
  responseData: [],
  isLoading: false,
  errorMessage: '',
  displayType: memorizedDisplayType || 'column',
  perPage: memorizedPerPage || 30,
  currentPage: memorizedCurrentPage || 1,
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
    window.localStorage.setItem('displayType', type)
  },

  CHANGE_PER_PAGE(displayNum: number) {
    state.perPage = displayNum
    window.localStorage.setItem('perPage', String(displayNum))
  },

  CHANGE_PAGE(page: number) {
    state.currentPage = page
    window.localStorage.setItem('currentPage', String(page))
  },

  async GET_USERS(count: number = 30, page: number = 1) {
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
