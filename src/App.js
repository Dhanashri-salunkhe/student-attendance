import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('students');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  // main array of objects state || books state || books array of objects
  // const [books, setbooks]=useState(getDatafromLS());
  const [students,setstudents]=useState(getDatafromLS());

  // input field states
  const [name, setName]=useState('');
  const [surname, setSurname]=useState('');
  const [rollno, setRollno]=useState('');
  const [checkintime,setCheckintime]=useState('');
  const [checkouttime,setCheckouttime]=useState('');

  // form submit event
  const handleAddStudentSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let student={
      name,
      surname,
      rollno,
      checkintime,
      checkouttime
    }

    setstudents([...students,student]);
    setName('');
    setSurname('');
    setRollno('');
    setCheckintime('');
    setCheckouttime('');
  }

  // delete book from LS
  const deleteStudent=(rollno)=>{
    const filteredStudents=students.filter((element,index)=>{
      return element.rollno !== rollno
    })
    setstudents(filteredStudents);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('students',JSON.stringify(students));
  },[students])

  return (
    <div className='wrapper'>
      <h1>Attendance App</h1>
      <p>Add and view your attendance using local storage</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddStudentSubmit}
          >
            <label>Name</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setName(e.target.value)} value={name}></input>
            <br></br>
            <label>Surname</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setSurname(e.target.value)} value={surname}></input>
            <br></br>
            <label>Rollno</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setRollno(e.target.value)} value={rollno}></input>
            <br></br>
            <label>CheckInTime</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setCheckintime(e.target.value)} value={checkintime}></input>
            <br></br>
            <label>CheckOutTime</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setCheckouttime(e.target.value)} value={checkouttime}></input>
            <br></br>
           

            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>

        <div className='view-container'>
          {students.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Rollno</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>CheckInTime</th>
                    <th>CheckOutTime</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View students={students} deleteStudent={deleteStudent}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>setstudents([])}>Remove All</button>
          </>}
          {students.length < 1 && <div>No students are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App