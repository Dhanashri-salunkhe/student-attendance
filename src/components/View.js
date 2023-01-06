import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({students,deleteStudent}) => {
    
    return students.map(student=>(
        
        <tr key={student.rollno}>
            <td>{student.rollno}</td>
            <td>{student.name}</td>
            <td>{student.surname}</td>
            <td>{student.checkintime}</td>
            <td>{student.checkouttime}</td>
            <td className='delete-btn' onClick={()=>deleteStudent(student.rollno)}>
                <Icon icon={trash}/>
            </td>           
        </tr>            
    
))
}