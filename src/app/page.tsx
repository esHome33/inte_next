"use client"
import Compteur from "@/components/compteur"
import Erreurs from "@/components/erreurs"
import { GrilleTable } from "@/components/grille_table"
import HelpComponent from "@/components/help"
import IndiceItem from "@/components/indice_item"
import { comparerGrilleSolution, Enigme, Grille } from "@/lib/enigmes"
import Link from "next/link"
import { useState, useEffect, SetStateAction } from "react"

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
	const [jeuGagne, setJeuGagne] = useState<boolean>(false)
	const [nb_errors, setNbErrors] = useState<number>(0)

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

	function traiteGrille(
		grille: Grille,
		row: number,
		col: number,
		fonction: (value: SetStateAction<Grille>) => void
	) {
		if (grille[row][col] === "") {
			grille[row][col] = "✘"
		} else if (grille[row][col] === "✔") {
			grille[row][col] = ""
			for (let i = 0; i < 3; i++) {
				if (i !== row) grille[i][col] = ""
				if (i !== col) grille[row][i] = ""
			}
		} else if (grille[row][col] === "✘") {
			grille[row][col] = "✔"
			for (let i = 0; i < 3; i++) {
				if (i !== row) grille[i][col] = "✘"
				if (i !== col) grille[row][i] = "✘"
			}
		}
		fonction(grille)
		setJeuGagne(jeu_gagne())
	}

	function handleClickAB(row: number, col: number) {
		const newGrid = Array.from(gridAB)
		traiteGrille(newGrid, row, col, setGridAB)
	}

	function handleClickAC(row: number, col: number) {
		const newGrid = Array.from(gridAC)
		traiteGrille(newGrid, row, col, setGridAC)
	}

	function handleClickCB(row: number, col: number) {
		const newGrid = Array.from(gridCB)
		traiteGrille(newGrid, row, col, setGridCB)
	}

	function nb_cases_vides(): number {
		const c1 = combienVide(gridAB)
		const c2 = combienVide(gridAC)
		const c3 = combienVide(gridCB)
		return c1 + c2 + c3
	}

	function jeu_gagne(): boolean {
		let resu = false
		const etat_grille_AB = comparerGrilleSolution(
			gridAB,
			active?.solution[0]
		)
		const etat_grille_AC = comparerGrilleSolution(
			gridAC,
			active?.solution[1]
		)
		const etat_grille_CB = comparerGrilleSolution(
			gridCB,
			active?.solution[2]
		)
		if (
			etat_grille_AB.resolu &&
			etat_grille_AC.resolu &&
			etat_grille_CB.resolu
		) {
			resu = true
		}
		setNbErrors(
			etat_grille_AB.erreurs.length +
				etat_grille_AC.erreurs.length +
				etat_grille_CB.erreurs.length
		)
		return resu
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
		setJeuGagne(false)
		setNbErrors(0)
	}

	return (
		<main className="flex flex-col items-center">
			<h1 className="text-center mb-4 flex flex-row gap-2 items-center">
				🧠 Integramme Web par{" "}
				<Link href={"https://www.eshome.fr"}>
					<code className="text-orange-300 px-2 rounded-md">
						ESHome.fr
					</code>
                </Link>
                <HelpComponent />
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
				<div className="flex-0">
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

						<Compteur
							nb={nb_cases_vides()}
							win={jeuGagne}
							nb_err={nb_errors}
						/>
					</div>
					<div className="flex justify-start gap-8 mt-4 sm:flex-row flex-col">
						<div className="flex justify-start gap-8 ml-7">
							<GrilleTable
								lignes={active.categories.A}
								colonnes={active.categories.B}
								data={gridAB}
								onClick={handleClickAB}
							/>
							{/* <CopySolution solution={transformer(gridAB)} /> */}
							<Erreurs
								grille={gridAB}
								solution={active.solution[0]}
							/>
						</div>
						<div className="flex justify-start gap-8 ml-7">
							<GrilleTable
								lignes={active.categories.A}
								colonnes={active.categories.C}
								data={gridAC}
								onClick={handleClickAC}
							/>
							{/* <CopySolution solution={transformer(gridAC)} /> */}
							<Erreurs
								grille={gridAC}
								solution={active.solution[1]}
							/>
						</div>
					</div>
					<div className="flex justify-start gap-8 ml-7 mt-8 mb-8">
						<GrilleTable
							lignes={active.categories.C}
							colonnes={active.categories.B}
							data={gridCB}
							onClick={handleClickCB}
						/>
						{/* <CopySolution solution={transformer(gridCB)} /> */}
						<Erreurs
							grille={gridCB}
							solution={active.solution[2]}
						/>
					</div>
				</div>
			)}
		</main>
	)
}
