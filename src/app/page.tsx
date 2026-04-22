import { prisma } from '@/lib/prisma'
import { createPerson, deletePerson } from './actions'

export default async function Home() {
  const people = await prisma.person.findMany()

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Person App</h1>

      {/* CREATE FORM */}
      <form action={createPerson} className="mb-8 flex flex-col gap-4">
        <input name="firstName" placeholder="First Name"
          className="border p-2 rounded" required />
        <input name="lastName" placeholder="Last Name"
          className="border p-2 rounded" required />
        <input name="email" placeholder="Email" type="email"
          className="border p-2 rounded" required />
        <input name="age" placeholder="Age" type="number"
          className="border p-2 rounded" required />
        <button type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Person
        </button>
      </form>

      {/* LIST OF PEOPLE */}
      <div className="flex flex-col gap-4">
        {people.map((person) => (
          <div key={person.id}
            className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-bold">{person.firstName} {person.lastName}</p>
              <p className="text-gray-600">{person.email}</p>
              <p className="text-gray-600">Age: {person.age}</p>
            </div>
            <form action={deletePerson.bind(null, person.id)}>
              <button type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  )
}