'use client'
import { NewCourse } from '@/components/NewCourse'
import { FormProviderCreateCourse } from '@/forms'

export default function Home() {
  return (
    <main className='container mx-auto'>
      <FormProviderCreateCourse>
        <NewCourse />
      </FormProviderCreateCourse>
    </main>
  )
}
