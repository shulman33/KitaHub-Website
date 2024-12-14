
import Image from 'next/image'
import React from 'react'
import StudentContactCard from './elements/StudentContactCard'

const StudentsContacts = () => {
    return (
        <div className="p-[24px] max-h-[378px] rounded-[16px] overflow-y-auto bg-white">
            <div className="flex justify-between mb-[16px] items-center">
                <div className="text-secondary text-[16px] leading-[19px] font-bold">
                    <p className="text-[14px]  leading-[19px] font-bold  ">🎓 Students</p>
                </div>
                <div>
                    <p className="text-[#74759A] text-[14px] ">1.2K Active</p>
                </div>

            </div>

          <StudentContactCard/>
          <StudentContactCard/>
          <StudentContactCard/>
          <StudentContactCard/>
          <StudentContactCard/>
          <StudentContactCard/>
          <StudentContactCard/>

        </div>
    )
}

export default StudentsContacts