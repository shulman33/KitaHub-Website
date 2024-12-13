
import React from 'react'
import Header from '../../components/Header'
import DiscussionCard from '../../components/StudentComponents/DiscussionCard'
import DiscussionBoardWidget from '../../components/DiscussionBoardWidget'
import Annoucemnets from '../../components/StudentComponents/courses/Annoucemnets'
import Assigments from '../../components/StudentComponents/courses/Assignments'
import Resources from '../../components/StudentComponents/courses/Resources'

const page = () => {
  return (
   <>
 
    <Header/>
 {/* Dsicussion and Annoucements  */}

<div className='grid gap-[30px] mt-[30px] grid-cols-2'>
  
<DiscussionBoardWidget/>
<Annoucemnets/>
<Assigments/>
<Resources/>
</div>
</> 
    
  )
}

export default page