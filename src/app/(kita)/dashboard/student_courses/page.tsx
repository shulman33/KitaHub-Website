<<<<<<< HEAD

import React from 'react'
import Header from '../../components/Header'
import DiscussionCard from '../../components/StudentComponents/DiscussionCard'
import DiscussionBoardWidget from '../../components/DiscussionBoardWidget'
import Annoucemnets from '../../components/StudentComponents/courses/Annoucemnets'
import Assigments from '../../components/StudentComponents/courses/Assignments'
import Resources from '../../components/StudentComponents/courses/Resources'
import InstructorInformation from '../../components/StudentComponents/courses/InstructorInformation'

const page = () => {
  return (
   <>

   <div className='grid grid-cols-[60%,auto] gap-[30px]'>
   <Header/>
   <InstructorInformation/>
   </div>
 
    
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

=======

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

>>>>>>> 17e58c277143578bc44b3b7cd8d75b6ea97232ca
export default page