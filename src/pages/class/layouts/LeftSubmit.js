import React from 'react'
import './LeftSubmit.css'
import { selectselectexam ,selectselectquestionChoose} from '../../../redux/Exam'
import { useSelector,useDispatch } from 'react-redux'
export default function LeftSubmit() {
    const exam = useSelector(selectselectexam)
    const questionChoose = useSelector(selectselectquestionChoose)
    console.log(exam)
    console.log(questionChoose)
    const dispatch = useDispatch()


    return(
        <div>
           {/* {exam && exam.exam && exam.exam.questions && exam.exam.questions.map((item,index)=>{
               return(
                   <div className="leftsubmit">
                       <div className="leftsubmit__item">
                           <div className="leftsubmit__item__title">
                               <p>Câu {index+1}</p>
                           </div>
                           <div className="leftsubmit__item__content">
                               <p>{item.content}</p>
                           </div>
                       </div>
                   </div>
               )
           })} */}

        </div>
    )
}
