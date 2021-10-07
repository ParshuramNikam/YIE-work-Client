import { useState, useEffect } from 'react';
import Link from 'next/link';
import TeacherDashboardCSS from '../../styles/Dashboard.module.css';

const dashboard = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const Base_URL = "http://localhost:8000/api";

    useEffect(() => {
        getSessionsData();
    }, []);

    const getSessionsData = () => {
        const tacherName = "ABCD XYZ";

        // check the routes.js file in backend code
        /*
            "/api/getlinks/byClassAndTeacher/"   -->  pass both "classYear" and "teacher" fileds to get data.
            "/api/getlinks/class/"    -->  pass "classYear" filed to get data by class
            "/api/getlinks/teacher/"  -->  pass "teacher" fileds to get data by teacher
        */

        return fetch("http://localhost:8000/api/getlinks/teacher", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ teacher: tacherName}),
        }).then(function (response) {
            return response.json();
        }).then(function (fetchedData) {
            setData(fetchedData)
            console.log(data);
            setIsLoading(false);
        })
    }

    const formatTime = (inputTime) => {
        inputTime = parseFloat(inputTime / 100).toFixed(2).toString().split('.');
        let ampm = "am";
        if (inputTime[0] >= 12) {
            if (inputTime[0] > 12) inputTime[0] -= 12;
            ampm = 'pm';
        }
        return `${inputTime[0]}:${inputTime[1]} ${ampm}`;
    }

    const deleteSession = (id) => {
        console.log("Cliked on : ", id);
        let areYouSure = prompt(`Are you Sure. Type "yes" if you want to Delete this meeting.`);
        if (areYouSure && areYouSure.toLowerCase() === 'yes') {
            fetch(`${Base_URL}/deleteSession/id/${id}`, {
                method: 'DELETE',
            }).then(res => res.json())
                .then(deletedSession => console.log(deletedSession))
            getSessionsData();
            alert('Deleted SuccesFully')
        }
    }

    return (
        <section >
            <h2 className="text-4xl font-normal text-center leading-normal mt-0 mb-2 text-blueGray-800">
                Teacher Dashboard
            </h2>
            {isLoading ? <h3 style={{ textAlign: "center", fontWeight: 400 }}>Loading...</h3> :
                <div >
                    {
                        !data.length ? <h1>Today, you don't any meetings</h1> : <>

                            <div className="m-8 bg-white shadow-lg hover:shadow-xl rounded-md overflow-hidden">
                                <table className="table flex table-auto w-full leading-normal">
                                    <thead className="uppercase text-gray-600 text-xs font-semibold bg-gray-200">
                                        <tr className="hidden sm:table-row">
                                            <th className="text-left p-3">
                                                <p>Class Name</p>
                                            </th>
                                            <th className="text-left p-3">
                                                <p>Subject</p>
                                            </th>
                                            <th className="text-left p-3">
                                                <p>Time</p>
                                            </th>
                                            <th className="text-left p-3">
                                                <p>Teacher Name</p>
                                            </th>
                                            <th className="text-left p-3">
                                                <p>Link</p>
                                            </th>
                                            <th className="text-left p-3">
                                                <p>Delete Session</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="flex-1 text-gray-700 sm:flex-none">
                                        {
                                            data.map((element, index) => {
                                                return (
                                                    <tr
                                                        v-for="(person, index) in persons"
                                                        key={index.toString()}
                                                        className="border-t first:border-t-0 flex p-1 sm:p-3 hover:bg-gray-100 sm:table-row flex-col w-full flex-wrap"
                                                    >
                                                        <td className="p-1 sm:p-3">
                                                            <label className="text-xs text-gray-500 uppercase font-semibold sm:hidden">
                                                                className
                                                            </label>
                                                            <p className="">class {element.class}</p>
                                                        </td>
                                                        <td className="p-1 sm:p-3">
                                                            <label className="text-xs text-gray-500 uppercase font-semibold sm:hidden">
                                                                Subject
                                                            </label>
                                                            <p className="">{element.Subject}</p>
                                                        </td>
                                                        <td className="p-1 sm:p-3">
                                                            <label className="text-xs text-gray-500 uppercase font-semibold sm:hidden">
                                                                Start Time
                                                            </label>
                                                            <p className="">{formatTime(element.startTime)}</p>
                                                        </td>
                                                        <td className="p-1 sm:p-3">
                                                            <label className="text-xs text-gray-500 uppercase font-semibold sm:hidden">
                                                                Teacher Name
                                                            </label>
                                                            <p className="">{element.TeacherName ? element.TeacherName : "---"}</p>
                                                        </td>
                                                        <td className="p-1 sm:p-3">
                                                            <label className="text-xs text-gray-500 uppercase font-semibold sm:hidden">
                                                                Delete Session
                                                            </label>
                                                            <p className="text-blue-600">
                                                                <Link href={element.URL} target="_blank" >
                                                                    <a target="_blank" style={{ textDecoration: "underline" }}>Class Link</a>
                                                                </Link>
                                                            </p>
                                                        </td>
                                                        <td className="p-1 sm:p-3">
                                                            <label className="text-xs text-gray-500 uppercase font-semibold sm:hidden">
                                                                Class LInk
                                                            </label>
                                                            <button className="block bg-red-600 hover:bg-red-700 text-white py-2 px-4 my-1 border rounded" style={{ cursor: "pointer" }}
                                                                onClick={(e) => deleteSession(element._id)}>
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <button class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mx-3 my-2 rounded" style={{ cursor: "pointer" }}>
                                <Link href='/teacher/create-session'>
                                    <a> <span>➕</span> Create New Live Session</a>
                                </Link>
                            </button>
                            <button class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mx-3 my-2 float-right rounded" style={{ cursor: "pointer" }}>
                                <Link href={`/`}>
                                    <a>Join by ID</a>
                                </Link>
                            </button>

                        </>}
                </div>
            }
        </section>
    )
}

export default dashboard
