import { setActivePinia, createPinia } from 'pinia'

import { useDummyServer } from '@/stores/dummyServer'
import { useGoalStore } from '@/stores/goals'
import { useGlobalAuthToken } from '@/stores/authToken'

import { Goal } from '@/util/types'

describe('Dummy Server with dummy tokens', () => {
    beforeEach(() => {
      setActivePinia(createPinia())
    })

    it('should return token "bla"', () =>{
      const dserver = useDummyServer()
      expect(dserver.getToken("simon", "123")).toBe("bla")
    })

    it('should return the very serious error message "meh"', () => {
      const dserver = useDummyServer()
      expect(dserver.getToken("a", "123")).toBe("meh")
    })

    it('should return "wrong password" ', () => {
      const dserver = useDummyServer()
      expect(dserver.getToken("simon", "")).toBe("wrong password")
    })
})

describe("Goal list store", () =>{
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should have an initial list length of 2 ', () => {
    const store = useGoalStore()
    expect(store.getGoalsNumber).toBe(2)
  }) 
  
  it('should allow adding goals ', () => {
    const store = useGoalStore()
    const test_name = "test goal"
    const goal = new Goal(test_name, "testiiing", 0.4)
    store.addGoal(goal)
    expect(store.getGoalsNumber).toBe(3)
  })

  it('should return goal\'s name ', () => {
    const store = useGoalStore() 
    expect(store.getGoal(0).name).toBe("be awesome")
  })
})

describe("Authentication token store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should return token on login and set it to state', () => {
    const store = useGlobalAuthToken()
    const token = store.logIn("simon", "123")

    expect(token).toBe("bla")
    expect(store.isLoggedIn).toBe(true)
    expect(store.getUsername).toBe("simon")
    expect(store.getToken).toBe("bla")
  })
})