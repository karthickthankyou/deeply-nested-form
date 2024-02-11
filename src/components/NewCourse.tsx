'use client'

import { useFormContextCreateCourse } from '@/forms'
import { useFieldArray } from 'react-hook-form'

export const NewCourse = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useFormContextCreateCourse()
  const formData = watch()
  //   console.log('formData', formData)
  //   console.log('errors', errors)
  return (
    <div>
      <div className='p-6 bg-gray-300 shadow-sm rounded-lg'>
        <div className='text-xl mb-2 font-bold'>New Course</div>
        <form
          className='space-y-3'
          onSubmit={handleSubmit((data) => {
            console.log('Form submitted: 🎉', data)
          })}
        >
          <label title='Title'>
            <div className='mb-1'>Title</div>
            <input
              placeholder='Enter course title'
              className='border-2 border-gray-600  rounded-lg px-2 py-1 bg-transparent'
              // Register: course title
              {...register('title')}
            />
            <div className='text-red-600 text-sm mt-1'>
              {/* Error: Course title */}
              {errors.title?.message}
            </div>
          </label>
          <ManageChapters />
          <div className='text-red-600 text-sm mt-1'>
            {/* Error: Course chapters */}
            {errors.chapters?.message}
          </div>
          <button
            className='px-4 py-2 bg-blue-600 rounded-lg text-white'
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

const ManageChapters = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContextCreateCourse()

  const { append, remove, fields } = useFieldArray({
    name: 'chapters',
    control,
  })
  return (
    <div className=' space-y-4 '>
      {/* Loop through chapter fields */}
      {fields.map((chapter, chapterIndex) => {
        return (
          <div
            className='p-6 bg-gray-200 shadow-lg rounded-lg space-y-3'
            key={chapter.id}
          >
            <div className='flex justify-between'>
              <div className='text-lg mb-2 font-semibold'>Chapters</div>{' '}
              <button
                type='button'
                onClick={() => {
                  // Remove: chapter index
                  remove(chapterIndex)
                }}
                className='text-red-400 text-xs underline underline-offset-4'
              >
                Remove chapter
              </button>
            </div>

            <label title={'Title'}>
              <div className='mb-1'>Chapter title</div>
              <input
                className='border-2 border-gray-600  rounded-lg px-2 py-1 bg-transparent'
                placeholder='Enter chapter title...'
                // Register: chapter title
                {...register(`chapters.${chapterIndex}.title`)}
              />
              <div className='text-red-600'>
                {/* Error: Chapter title */}
                {errors.chapters?.[chapterIndex]?.title?.message}
              </div>
            </label>
            <ManageNotes chapterIndex={chapterIndex} />
            <div className='text-red-600 text-sm mt-1'>
              {/* Error: Chapter notes */}
              {errors.chapters?.[chapterIndex]?.notes?.message}
            </div>
          </div>
        )
      })}

      <button
        type='button'
        onClick={() => {
          // Append: notes
          append({ notes: [], title: '' })
        }}
        className='text-gray-600 text-center w-full underline underline-offset-4 py-2'
      >
        add chapter
      </button>
    </div>
  )
}

const ManageNotes = ({ chapterIndex }: { chapterIndex: number }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContextCreateCourse()

  const { append, remove, fields } = useFieldArray({
    name: `chapters.${chapterIndex}.notes`,
    control,
  })
  return (
    <div className=' space-y-4'>
      {/* Loop through notes fields  */}
      {fields.map((note, notesIndex) => {
        return (
          <div key={note.id} className='py-4 bg-white p-6 rounded-lg shadow-xl'>
            <div>
              <div className='flex justify-between'>
                <div className='mb-2 font-semibold'>Note</div>
                <button
                  type='button'
                  onClick={() => {
                    // Remove: notes index
                    remove(notesIndex)
                  }}
                  className='text-red-400 text-xs underline underline-offset-4'
                >
                  Remove note
                </button>
              </div>
              <label title={'Title'} className='inline-block'>
                <div className='mb-1'>Content</div>
                <input
                  placeholder='Enter note'
                  className='border-2 border-gray-600  rounded-lg px-2 py-1 bg-transparent'
                  //   Register: Chapter notes content
                  {...register(
                    `chapters.${chapterIndex}.notes.${notesIndex}.content`,
                  )}
                />
                <div className='text-red-600'>
                  {/* Error: Chapter notes content */}
                  {
                    errors.chapters?.[chapterIndex]?.notes?.[notesIndex]
                      ?.content?.message
                  }
                </div>
              </label>
            </div>
          </div>
        )
      })}

      <button
        type='button'
        onClick={() => {
          // Append: Notes content
          append({ content: '' })
        }}
        className='text-gray-600 text-center w-full underline underline-offset-4 py-2'
      >
        add note
      </button>
    </div>
  )
}
