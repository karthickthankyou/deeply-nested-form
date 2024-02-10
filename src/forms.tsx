import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { z } from 'zod'

/**
 * Schemas
 */

const schemaCreateNote = z.object({
  content: z.string().min(3),
})

const schemaCreateChapter = z.object({
  title: z.string().min(3),
  notes: z
    .array(schemaCreateNote)
    .min(1, { message: 'Chapter must contain atleast one note.' }),
})

export const schemaCreateCourse = z.object({
  title: z.string().min(3),
  chapters: z
    .array(schemaCreateChapter, { required_error: 'Chapters are required.' })
    .min(1, { message: 'Course must contain atleast one chapter.' }),
})

/**
 * Hooks
 */

export type FormTypeCreateCourse = z.infer<typeof schemaCreateCourse>

export const useFormCreateCourse = () =>
  useForm<FormTypeCreateCourse>({
    resolver: zodResolver(schemaCreateCourse),
  })

/**
 * Context
 */

export const FormProviderCreateCourse = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateCourse()
  return <FormProvider {...methods}>{children}</FormProvider>
}

export const useFormContextCreateCourse = () =>
  useFormContext<FormTypeCreateCourse>()
