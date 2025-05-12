
type Props = {
    nb: number
    win?: boolean
    nb_err: number
}

export default function Compteur({nb, win, nb_err}: Props) {
    return (
        <div
            className="bg-slate-200 dark:bg-slate-900 text-black dark:text-white p-3 rounded-md h-fit border-slate-800 border-2 shadow-amber-700 shadow text-center"
        >

            <p>Nombre de cases vides : {nb}</p>
            {
                win &&
                <p
                    className="text-green-700 dark:text-green-400"
                >
                    Bravo, vous avez gagné !
                </p>
            }
            {
                nb_err > 0 &&
                <p
                    className="text-orange-500 dark:text-orange-300 font-bold"
                >
                    {nb_err} erreurs
                </p>
            }
        </div>
    );
}