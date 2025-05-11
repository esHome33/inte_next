export default function Compteur(params: { nb: number }) {
    return (
        <div
            style={{
                border: "1px solid black",
                padding: "0.6rem",
                marginLeft: "5rem",
                borderRadius: "1rem",
                backgroundColor: "hsl(200, 70%, 40%)",
                color: "white",
                height: "100%",
            }}
        >
            <p>Compteur</p>
            <p>Nombre de cases vides : {params.nb}</p>
            {
                params.nb === 0 && <p>Bravo, vous avez gagné !</p>
            }
        </div>
    );
}