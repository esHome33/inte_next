"use client"

type Props = {
    solution: string
}

const CopySolution = ({ solution }: Props) => {

    const copy = () => {
        console.log('solution', solution)
        navigator.clipboard.writeText(solution);
    }

    return (
        <button
            onClick={copy}
            className="bg-gray-800 text-gray-400 
          hover:bg-gray-700 hover:text-gray-300 
          font-bold py-2 px-4 rounded h-fit my-auto"
        >
            C
        </button>
    )
}

export default CopySolution