

import React from 'react'
import ProfessorInfoCard from './elements/ProfessorInfoCard'

const ActiveCourses = () => {
    return (
        <div className="p-[24px] max-h-[378px] rounded-[16px] overflow-y-auto bg-white">
            <div className="flex justify-between mb-[16px] items-center">
                <div className="text-secondary text-[16px] leading-[19px] font-bold">
                    <p className="text-[14px]  leading-[19px] font-bold  ">📚 Active Courses</p>
                </div>
                <div>
                    <p className="text-[#74759A] text-[14px] ">+ New Course</p>
                </div>

            </div>
            <ProfessorInfoCard />
            <ProfessorInfoCard />
            <ProfessorInfoCard />
            <ProfessorInfoCard />
            <ProfessorInfoCard />
        </div>
    )
}

export default ActiveCourses