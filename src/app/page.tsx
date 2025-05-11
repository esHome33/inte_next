"use client"
import Compteur from "@/components/compteur"
import CopySolution from "@/components/copysolution"
import Erreurs from "@/components/erreurs"
import { GrilleTable } from "@/components/grille_table"
import IndiceItem from "@/components/indice_item"
import { Enigme, Grille, transformer } from "@/lib/enigmes"
import Link from "next/link"
import { useState, useEffect } from "react"

function creerGrilleVide(): Grille {
    return Array.from({ length: 3 }, () => Array(3).fill(""))
}

function combienVide(grille: Grille): number {
    return grille.reduce(
        (count, row) => count + row.filter((cell) => cell === "").length,
        0
    )
}

export default function Home() {
    const [enigmes, setEnigmes] = useState<Enigme[]>([])
    const [active, setActive] = useState<Enigme | null>(null)
    const [gridAB, setGridAB] = useState<Grille>(creerGrilleVide())
    const [gridAC, setGridAC] = useState<Grille>(creerGrilleVide())
    const [gridCB, setGridCB] = useState<Grille>(creerGrilleVide())
    const [rayes, setRayes] = useState<boolean[]>([
        false,
        false,
        false,
        false,
        false,
    ])

    useEffect(() => {
        fetch("/integrammes.json")
            .then((res) => res.json())
            .then((data) => setEnigmes(data))
    }, [])

    function choisirEnigme(index: number) {
        const e = enigmes[index]
        setActive(e)
        resetAll()
    }

    function handleClickAB(row: number, col: number, check: boolean) {
        const newGrid = Array.from(gridAB)
        if (newGrid[row][col] === "") {
            if (check) {
                newGrid[row][col] = "✔"
                for (let i = 0; i < 3; i++) {
                    if (i !== row) newGrid[i][col] = "✘"
                    if (i !== col) newGrid[row][i] = "✘"
                }
            } else {
                newGrid[row][col] = "✘"
            }
            setGridAB(newGrid)
        } else if (newGrid[row][col] === "✔") {
            if (check) {
                newGrid[row][col] = ""
                for (let i = 0; i < 3; i++) {
                    if (i !== row) newGrid[i][col] = ""
                    if (i !== col) newGrid[row][i] = ""
                }
                setGridAB(newGrid)
            }
        } else if (newGrid[row][col] === "✘") {
            if (!check) {
                newGrid[row][col] = ""
                setGridAB(newGrid)
            }
        }
    }

    function handleClickAC(row: number, col: number, check: boolean) {
        const newGrid = Array.from(gridAC)
        if (newGrid[row][col] === "") {
            if (check) {
                newGrid[row][col] = "✔"
                for (let i = 0; i < 3; i++) {
                    if (i !== row) newGrid[i][col] = "✘"
                    if (i !== col) newGrid[row][i] = "✘"
                }
            } else {
                newGrid[row][col] = "✘"
            }
            setGridAC(newGrid)
        } else if (newGrid[row][col] === "✔") {
            if (check) {
                newGrid[row][col] = ""
                for (let i = 0; i < 3; i++) {
                    if (i !== row) newGrid[i][col] = ""
                    if (i !== col) newGrid[row][i] = ""
                }
                setGridAC(newGrid)
            }
        } else if (newGrid[row][col] === "✘") {
            if (!check) {
                newGrid[row][col] = ""
                setGridAC(newGrid)
            }
        }
    }

    function handleClickCB(row: number, col: number, check: boolean) {
        const newGrid = Array.from(gridCB)
        if (newGrid[row][col] === "") {
            if (check) {
                newGrid[row][col] = "✔"
                for (let i = 0; i < 3; i++) {
                    if (i !== row) newGrid[i][col] = "✘"
                    if (i !== col) newGrid[row][i] = "✘"
                }
            } else {
                newGrid[row][col] = "✘"
            }
            setGridCB(newGrid)
        } else if (newGrid[row][col] === "✔") {
            if (check) {
                newGrid[row][col] = ""
                for (let i = 0; i < 3; i++) {
                    if (i !== row) newGrid[i][col] = ""
                    if (i !== col) newGrid[row][i] = ""
                }
                setGridCB(newGrid)
            }
        } else if (newGrid[row][col] === "✘") {
            if (!check) {
                newGrid[row][col] = ""
                setGridCB(newGrid)
            }
        }
    }

    function jeu_fini(): number {
        const c1 = combienVide(gridAB)
        const c2 = combienVide(gridAC)
        const c3 = combienVide(gridCB)
        return c1 + c2 + c3
    }

    function raye(numero: number, raye: boolean) {
        const newRayes = [...rayes]
        newRayes[numero] = raye
        setRayes(newRayes)
    }

    function resetAll() {
        setGridAB(creerGrilleVide())
        setGridAC(creerGrilleVide())
        setGridCB(creerGrilleVide())
        setRayes([false, false, false, false, false])
    }

    return (
        <main className="flex flex-col items-center">
            <h1
                className="text-center mb-4"
            >🧠 Integramme Web par <Link
                href={"https://www.eshome.fr"}
            ><code
                className="text-orange-300 px-2 rounded-md"
            >ESHome.fr</code>
                </Link>
            </h1>
            <select
                onChange={(e) => choisirEnigme(parseInt(e.target.value))}
                className="bg-orange-200 rounded-2xl border p-2 border-orange-800 text-orange-800"
            >
                <option>Choisir une énigme</option>
                {enigmes.map((e, i) => (
                    <option
                        key={i}
                        value={i}
                    >
                        {i + 1}. {e.title}
                    </option>
                ))}
            </select>

            {active && (
                <div
                    className="flex-0"
                >
                    <h2 className="mt-4">{active.title}</h2>
                    <div className="flex justify-start gap-4 sm:gap-8 flex-col sm:flex-row">
                        <ul
                            style={{
                                listStyle: "none",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                            }}
                        >
                            {active.indices.map((ind, i) => (
                                <IndiceItem
                                    key={active.id * 100 + i}
                                    indice={ind}
                                    onRaye={raye}
                                    myId={i}
                                    barre={rayes[i]}
                                />
                            ))}
                        </ul>

                        <button
                            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit"
                            onClick={() => {
                                resetAll()
                            }}
                        >
                            Reset grilles
                        </button>

                        <Compteur nb={jeu_fini()} />
                    </div>
                    <div
                        className="flex justify-start gap-8 mt-4 sm:flex-row flex-col"
                    >
                        <div className="flex justify-start gap-8 ml-7">
                            <GrilleTable
                                lignes={active.categories.A}
                                colonnes={active.categories.B}
                                data={gridAB}
                                onClick={handleClickAB}
                            />
                            <CopySolution solution={transformer(gridAB)} />
                            <Erreurs grille={gridAB} solution={active.solution[0]} />
                        </div>
                        <div className="flex justify-start gap-8 ml-7">
                            <GrilleTable
                                lignes={active.categories.A}
                                colonnes={active.categories.C}
                                data={gridAC}
                                onClick={handleClickAC}
                            />
                            <CopySolution solution={transformer(gridAC)} />
                            <Erreurs grille={gridAC} solution={active.solution[1]} />
                        </div>
                    </div>
                    <div className="flex justify-start gap-8 ml-7 mt-8">
                        <GrilleTable
                            lignes={active.categories.C}
                            colonnes={active.categories.B}
                            data={gridCB}
                            onClick={handleClickCB}
                        />
                        <CopySolution solution={transformer(gridCB)} />
                        <Erreurs grille={gridCB} solution={active.solution[2]} />
                    </div>
                </div>
            )}
        </main>
    )
}
