import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions } from "../reducers/activity-reducer"
import { ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

let id = crypto.randomUUID()

const initialState = {
    id: id,
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {
            const selectActiivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActiivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: { newActivity: activity } })

        setActivity({
            ...initialState,
            id: crypto.randomUUID()
        })
    }

    return (
        <div className="mx-auto max-w-screen-lg px-4 sm:pr-0 sm:pl-4 py-2">
            <div className="border-b flex flex-col rounded-lg border border-gray-200 px-4 py-8 bg-white">
                <div className="mx-auto text-center w-4/4 px-4">
                    <h1 className="font-bold text-2xl">¡Empieza hoy!</h1>
                    <p className="mt-4 text-gray-700 text-sm">
                        Registrando las calorías que consumes y las que quemas diariamente.
                    </p>
                </div>

                <form
                    className="mx-auto mb-0 mt-8 w-full px-4 space-y-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col w-4/4 mx-auto"> {/* Ancho del 75% */}
                        <label htmlFor="category" className="text-gray-700 text-sm">Categoría:</label>
                        <div className="relative mb-3 mt-1 w-full">
                            <select
                                name="category"
                                id="category"
                                className="w-full rounded-lg bg-gray-100 border-gray-200 p-4 pr-12 text-sm shadow-sm appearance-none text-gray-700"
                                value={activity.category}
                                onChange={handleChange}
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-gray-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col w-4/4 mx-auto">
                        <label htmlFor="name" className="text-gray-700 text-sm">Actividad:</label>
                        <div className="relative mb-3 mt-1 w-full">
                            <input
                                id="name"
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-700 bg-gray-100"
                                placeholder="Ej. Ensalada, Frutas, Pesas, Running..."
                                value={activity.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col w-4/4 mx-auto">
                        <label htmlFor="calories" className="text-gray-700 text-sm">Calorías:</label>
                        <div className="relative mb-3 mt-1 w-full">
                            <input
                                id="calories"
                                type="number"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-700 bg-gray-100"
                                placeholder="Ej. 300 "
                                value={activity.calories}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mx-auto group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-sky-600 transition-colors hover:bg-sky-600 focus:outline-none focus:ring active:bg-sky-500 disabled:opacity-60"
                        disabled={!isValidActivity()}
                    >
                        <span className="font-medium transition-colors group-hover:text-white">
                            {activity.category === 1 ? "Guardar comida" : "Guardar ejercicio"}
                        </span>
                        <span className="shrink-0 rounded-full border border-sky-600 bg-white p-2 group-active:border-sky-500">
                            <svg
                                className="size-5 rtl:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>
                </form>
            </div>
        </div>
    )
}
