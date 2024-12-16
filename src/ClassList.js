import React, { useState, useEffect } from 'react';

function ClassList() {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch.get('http://your-laravel-api-url/classes', {
          params: { search }
        });
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes', error);
      }
    };

    fetchClasses();
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex justify-center pt-6"> {/* Removed min-h-screen, added pt-6 for top padding */}
      <div className="w-4/5 p-6 bg-white shadow-lg rounded-lg">
        <div className="mb-4 mt-6">
          <input
            type="text"
            placeholder="Search by class, student, or subject"
            value={search}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="overflow-auto">
          <ul className="space-y-4">
            {classes.map((classItem) => (
              <li
                key={classItem.class_name}
                className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-semibold mb-2">{classItem.class_name}</h3>
                <ul className="space-y-2">
                  {classItem.students.map((student) => (
                    <li key={student.student_name} className="pl-4">
                      <h4 className="text-lg font-medium">{student.student_name}</h4>
                      <p className="text-sm text-gray-500">Subjects: {student.subjects.join(', ')}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ClassList;
