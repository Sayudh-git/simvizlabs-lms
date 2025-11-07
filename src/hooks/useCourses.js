import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import axiosInstance from "@/lib/axios";

export function useGetCourses(params={}){
    return useQuery({
        queryKey:["courses",params],
        queryFn:async()=>{
            const {data}=await axiosInstance.get("/course",{params});
            return data;
        }
    });
}


// export function useGetCourseDetails(courseId) {
//     return useQuery({
//       queryKey: ['course', courseId],
//       queryFn: async () => {
//         const { data } = await axiosInstance.get(`/courses/${courseId}`);
//         return data;
//       },
//       enabled: !!courseId, // Only fetch when courseId is available
//     });
//   }

  export function useCreateCourse() {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async (courseData) => {
        const { data } = await axiosInstance.post('/courses', courseData);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['courses'] });
      },
    });
  }

  export function useUpdateCourse() {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async ({ courseId, ...courseData }) => {
        const { data } = await axiosInstance.put(`/courses/${courseId}`, courseData);
        return data;
      },
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ['courses'] });
        queryClient.invalidateQueries({ queryKey: ['course', variables.courseId] });
      },
    });
  }
  
export function useDeleteCourse() {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async (courseId) => {
        const { data } = await axiosInstance.delete(`/courses/${courseId}`);
        return data;
      },
      onSuccess: (data, courseId) => {
        queryClient.invalidateQueries({ queryKey: ['courses'] });
        queryClient.removeQueries({ queryKey: ['course', courseId] });
      },
    });
  }

  export function useGetCourseDetails(courseId) {
    return useQuery({
      queryKey: ['course', courseId],
      queryFn: async () => {
        const { data } = await axiosInstance.get(`/course-details/${courseId}`);
        return data;
      },
      enabled: !!courseId, // Only fetch when courseId is available
    });
  }


  export function useGetQuizQuestions(quizId) {
    return useQuery({
      queryKey: ['quiz', quizId],
      queryFn: async () => {
        const { data } = await axiosInstance.get(`/course-details/getQuiz/${quizId}`);
        return data;
      },
    });
  }

  export function useGetQuizResults() {
    return useMutation({
      mutationFn: async ({ quizId, answers }) => {
        const response = await axiosInstance.post('/course-details/quiz/checkAnswer', {
          quizId,
          answers,
        });
        return response.data;
      },
    });
  }
