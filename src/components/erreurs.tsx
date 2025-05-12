import { comparerGrilleSolution } from '@/lib/enigmes'
import React from 'react'

type Props = {
    grille: string[][]
    solution: string
}

const Erreurs = ({ grille, solution }: Props) => {
    const comp = comparerGrilleSolution(grille, solution)
    
    let res:boolean = false
    if (comp.resolu) {
        res = true        
    } 

  return (
      <div
          className={'rounded-md text-white p-2 h-fit my-auto ' + (res ? 'bg-green-500' : 'bg-red-500')}
      >
          {res ? "✔":"E"}
      </div>
  )
}

export default Erreurs