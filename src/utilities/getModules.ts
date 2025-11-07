import { FieldState, Payload } from 'payload'

type Params = {
  payload: Payload
  course_article_id: string
}

type QuizParams = Params & { module_id: string }

export const getCourse = async (payload: any) => {
  const result = await payload.find({ collection: 'courses' })

  console.log(result, 'result')

  return result.docs
}

export const getModules = async (payload: Payload, course_article_id: string) => {
  if (!course_article_id) {
    throw new Error('No course_article_id provided')
  }

  const result = await payload.find({
    collection: 'courses',
    where: {
      c_id: {
        equals: course_article_id,
      },
    },
  })

  console.log(result, 'result')

  return result.docs
}

export const getQuizId = async ({ payload, course_article_id, module_id }: QuizParams) => {
  if (!course_article_id || !module_id) {
    throw new Error('No Course Article Id or Module Id')
  }

  const result = await payload.find({
    collection: 'module-quizzes',
    where: {
      and: [
        {
          course_article_id: {
            equals: course_article_id,
          },
        },
        {
          module_id: {
            equals: module_id,
          },
        },
      ],
    },
  })

  const formattedResult = result.docs.map((quiz: any) => {
    return {
      id: quiz.id,
      title: quiz.quizTitle,
      quizId: quiz.quizId,
    }
  })

  console.log(result, 'result')
  return formattedResult.length > 0 ? formattedResult : []
}
