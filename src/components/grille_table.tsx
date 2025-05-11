"use client"

import { Grille } from "@/lib/enigmes"
import { MouseEvent } from "react"

interface GrilleTableProps {
	lignes: string[]
	colonnes: string[]
	data: Grille
	onClick: (row: number, col: number, check: boolean) => void
}

export function GrilleTable({
	lignes,
	colonnes,
	data,
	onClick,
}: GrilleTableProps) {
	// fonction qui détecte le bouton de la souris qui est pressé et qui lance la fonction onClick
	const go = (e: MouseEvent, i: number, j: number) => {
		e.preventDefault()
		const control_actif = e.ctrlKey
		onClick(i, j, !control_actif)
	}

	return (
        <table style={{ borderCollapse: "collapse", margin: "0.7rem 0" }}
            className=""
        >
			<thead>
				<tr>
					<th></th>
					{colonnes.map((c, j) => (
                        <th
                            className="text-xs -rotate-45 -translate-y-1"
                            key={j}
                        >{c}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{lignes.map((l, i) => (
					<tr key={i}>
                        <td
                            className="text-xs"
                        >{l}</td>
						{colonnes.map((_, j) => (
                            <td
                                
								key={j}
								onClick={(e) => go(e, i, j)}
								style={
									data[i][j] === "✘"
										? {
												border: "2px solid darkblue",
												width: "30px",
												height: "30px",
												textAlign: "center",
												cursor: "pointer",
												color: "red",
										  }
										: {
												border: "2px solid darkblue",
												width: "30px",
												height: "30px",
												textAlign: "center",
												cursor: "pointer",
												color: "green",
										  }
								}
							>
								{data[i][j]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
