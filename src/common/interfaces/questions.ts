export interface IQuestion {
    qst_id: number,
    
    qst_body: string,
    qst_category: number,

    qst_answer1: string,
    qst_answer2: string,
    qst_answer3: string,
    qst_answer4: string,
    
    qst_correctAnswer: number
}