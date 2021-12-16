import { ToyPreview } from './toy-preview.jsx'

export function ToysList({ toys, onRemoveToy, user }) {
    return (
        <section className="toys-list">

            {toys.map(toy => <ToyPreview key={toy._id}
                toy={toy} user={user}
                onRemoveToy={onRemoveToy} />)}

        </section>
    )

}