import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo, Dispatch } from "react"
import { ActivityActions } from "../reducers/activity-reducer"

export type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}


export default function ActivityList({ activities, dispatch }: ActivityListProps) {

    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        , [activities])

    return (
        <>
            {activities.length === 0 ?
                <div className="mx-auto w-full px-4 sm:pl-0 sm:pr-4 py-2">
                    <div className="border-b flex flex-col rounded-lg border border-gray-200 px-4 py-8 text-center bg-white">
                        <p className="mt-1.5 text-sm text-gray-700">
                        Todavía no has registrado ninguna comida o actividad. Empieza agregando tu primera comida o ejercicio y monitorea tus calorías.
                        </p>
                    </div>
                </div>
                :
                <div className="mx-auto w-full px-4 sm:pl-0 sm:pr-4 py-2">
                    <div className="border-b flex flex-col rounded-lg border border-gray-200 px-4 py-8 text-center bg-white">
                        <h1 className="text-2xl font-bold text-gray-700 pb-8">Comida y actividades</h1>
                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                <thead className="ltr:text-left rtl:text-right">
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-2 text-lg font-semibold text-gray-700 text-start">Categoría</th>
                                        <th className="whitespace-nowrap px-4 py-2 text-lg font-semibold text-gray-700">Actividad</th>
                                        <th className="whitespace-nowrap px-4 py-2 text-lg font-semibold text-gray-700">Calorías</th>
                                        <th className="px-4 py-2 text-lg font-semibold text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {activities.map(activity => (
                                        <tr key={activity.id}><td className={`whitespace-nowrap px-4 py-2 text-lg text-start font-bold ${activity.category === 1 ? 'text-rose-600' : 'text-gray-700'}`}>{categoryName(+activity.category)}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{activity.name}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{activity.calories}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-end">
                                                <button
                                                    className="inline-block rounded bg-sky-400 px-4 py-2 text-xs font-medium text-white hover:bg-sky-500 mr-1"
                                                    title="Editar"
                                                    onClick={() => dispatch({ type: "set-activeId", payload: { id: activity.id } })}
                                                >
                                                    <i className="text-md bi bi-pencil-square"></i>
                                                </button>
                                                <button
                                                    className="inline-block rounded bg-rose-600 px-4 py-2 text-xs font-medium text-white hover:bg-rose-700 "
                                                    title="Eliminar"
                                                    onClick={() => dispatch({ type: "delete-activity", payload: { id: activity.id } })}
                                                >
                                                    <i className="text-md bi bi-trash3"></i>
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}
