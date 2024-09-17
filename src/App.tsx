import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import CalorieTraker from "./components/CalorieTraker"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestarApp = () => useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <header className="mx-auto w-full px-4 py-2">
        <div className="border-b  flex flex-col rounded-lg border border-gray-200 px-4 py-8 bg-white">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div >
              <h1 className="text-2xl font-bold text-rose-600 sm:text-3xl">Control de Calorías</h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="inline-block rounded bg-rose-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-700 focus:outline-none focus:ring disabled:opacity-30"
                type="button"
                disabled={!canRestarApp()}
                onClick={() => dispatch({ type: 'restart-app' })}
              >
                Reiniciar APP <i className="bi bi-stars text-lg ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-4 sm:gap-4">
        <section className="col-span-4 lg:col-span-1">
          <Form dispatch={dispatch} state={state} />
        </section>

        <div className="col-span-4  lg:col-span-3">
          <section>
            <CalorieTraker
              activities={state.activities}
            />
          </section>
          <section>
            <ActivityList activities={state.activities} dispatch={dispatch} />
          </section>
        </div>
      </div>

    </>
  )
}

export default App
