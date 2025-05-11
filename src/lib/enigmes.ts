export type Grille = string[][]

export interface Enigme {
	title: string
	id: number
	categories: {
		A: string[]
		B: string[]
		C: string[]
	}
	indices: string[]
	solution: string[]
}

export type AnalyseSolution = {
    resolu: boolean
    erreurs: CoordErreur[]
}

export type CoordErreur = {
    coord: number[]
    erreur: string
}

const coordonnees = [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 1],
    [3, 2],
    [3, 3]
]


export function comparerGrilleSolution(
	grille: string[][],
	solution: string
): AnalyseSolution {
    const erreurs: CoordErreur[] = [];
    let resolu = true
    const grille_transformee = transformer(grille);
      console.log('grille_transformee', grille_transformee)  
	for (let i = 0; i < grille_transformee.length; i++) {
		if(grille_transformee[i] !== solution[i]){			
			erreurs.push({
				coord: coordonnees[i],
				erreur: grille_transformee[i]
			})
		}		
	}
    if (erreurs.length > 0) {
        resolu = false
    }
    return { resolu, erreurs }
}

export function transformer(grille: Grille): string {
	let s = ""
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (grille[i][j] === "") {
				s += "."
			} else if (grille[i][j] === "✔") {
				s += "1"
			} else {
				s += "0"
			}
		}
	}
	return s
}
