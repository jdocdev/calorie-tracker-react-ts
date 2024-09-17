import { useMemo } from "react"
import type { Activity } from "../types"
type CalorieTrakerProps = {
    activities: Activity[]
}

export default function CalorieTraker({ activities }: CalorieTrakerProps) {

    const caloriesCosumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

    const netCalories = useMemo(() => caloriesCosumed - caloriesBurned, [activities])

    return (
        <div className="mx-auto w-full px-4 sm:pl-0 sm:pr-4 py-2">
            <div className="border-b flex flex-col rounded-lg border border-gray-200 px-4 py-8 text-center bg-white">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Balance calórico</h2>
                    <p className="mt-4 text-gray-700 text-sm">
                        Lleva un seguimiento de tus comidas y actividades físicas para un control efectivo de tus calorías.
                    </p>
                </div>


                <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-1 lg:grid-cols-3">
                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                        <dt className="order-last text-sm font-medium text-gray-700">Cosumidas</dt>

                        <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">{caloriesCosumed}</dd>
                    </div>

                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                        <dt className="order-last text-sm font-medium text-gray-700">Quemadas</dt>

                        <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">{caloriesBurned}</dd>
                    </div>

                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                        <dt className="order-last text-sm font-medium text-gray-700">Diferencia</dt>

                        <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">{netCalories}</dd>
                    </div>

                </dl>
            </div>
        </div>
    )
}

