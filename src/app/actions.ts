'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createPerson(formData: FormData) {
  await prisma.person.create({
    data: {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      age: parseInt(formData.get('age') as string),
    },
  })
  revalidatePath('/')
}

export async function deletePerson(id: number) {
  await prisma.person.delete({ where: { id } })
  revalidatePath('/')
}

export async function updatePerson(id: number, formData: FormData) {
  await prisma.person.update({
    where: { id },
    data: {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      age: parseInt(formData.get('age') as string),
    },
  })
  revalidatePath('/')
}