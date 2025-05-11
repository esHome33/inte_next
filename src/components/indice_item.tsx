"use client"
import { useState } from "react"

type Props = {
	indice: string
	onRaye: (id: number, raye: boolean) => void
	myId: number
	barre?: boolean
}

const IndiceItem = (props: Props) => {
	//const [raye, setRaye] = useState<boolean>(props.barre ? true : false);
	const [indice] = useState<string>(props.indice)

	const etat = props.barre ? true : false

	const rayer = () => {
		//setRaye(!raye);
		props.onRaye(props.myId, !etat)
	}

	return (
		<button
			onClick={(e) => {
				e.preventDefault()
				rayer()
			}}
			className="rounded-2xl px-2"
		>
			<li
				style={{
					textDecoration: etat ? "line-through" : "none",
					color: etat ? "goldenrod" : "white",
				}}
			>
				🔹{indice}
			</li>
		</button>
	)
}

export default IndiceItem
