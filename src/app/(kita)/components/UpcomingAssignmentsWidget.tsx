import Link from "next/link";

const assignments = [
  {
    id: 1,
    course: "Algorithm Design",
    assignmentTitle: "Shortest Path",
    deadline: "11/23/45",
  },
  {
    id: 2,
    course: "Data Structures",
    assignmentTitle: "Stacks and Queues",
    deadline: "11/23/45",
  },
  {
    id: 3,
    course: "Computer Networks",
    assignmentTitle: "Packet Switching",
    deadline: "11/23/45",
  },
  {
    id: 4,
    course: "Operating Systems",
    assignmentTitle: "Scheduling Algorithms",
    deadline: "11/23/45",
  }
];

export default function UpcomingAssignmentsWidget() { 
  return (
    <div className="bg-white rounded-2xl px-4 pt-6 sm:px-6 lg:px-8 border">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-bold leading-6 text-midnight-blue">
            🗂️ Upcoming Assignments
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link 
            href="/assignments"
            className="px-3 py-2 text-center text-sm font-semibold text-gray-500"
          >
            View All
          </Link>
        </div>
      </div>
      <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-midnight-blue sm:pl-0"
              >
                Course
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-base font-semibold text-midnight-blue lg:table-cell"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-base font-semibold text-midnight-blue"
              >
                Deadline
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-base font-medium text-midnight-blue sm:w-auto sm:max-w-none sm:pl-0">
                  {assignment.course}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Assignment Title</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      {assignment.assignmentTitle}
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-base font-medium text-midnight-blue lg:table-cell">
                  {assignment.assignmentTitle}
                </td>
                <td className="px-3 py-4 text-base font-semibold text-midnight-blue">
                  {assignment.deadline}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
