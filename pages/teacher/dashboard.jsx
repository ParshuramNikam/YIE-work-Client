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
        return fetch(`${Base_URL}/getlinks`)
            .then((res) => res.json())
            .then((fetchedData) => {
                setData(fetchedData);
                setIsLoading(false);
            })
            .catch((err) => console.log(err.message));
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
        if ( areYouSure && areYouSure.toLowerCase() === 'yes') {
            fetch( `${Base_URL}/deleteSession/id/${id}`, {
                method: 'DELETE',
            }).then(res => res.json()) 
            .then( deletedSession => console.log(deletedSession))
            getSessionsData();
            alert('Deleted SuccesFully')
        }
    }

    return (
        <section className={TeacherDashboardCSS.dashboardSection} >
            <h1>Teacher Dashboard</h1>
            {isLoading ? <h3 style={{ textAlign: "center", fontWeight: 400 }}>Loading...</h3> :
                <div >
                    {
                        !data.length ? <h1>Today, you don't any meetings</h1> : <>
                            <div className={TeacherDashboardCSS.tableWrapper}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Class</th>
                                            <th>Subject</th>
                                            <th>Time</th>
                                            <th>Teacher Name</th>
                                            <th>Link</th>
                                            <th>Delete Session</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((element, index) => {
                                                return (
                                                    <tr key={index.toString()}>
                                                        <td>Class {element.class}</td>
                                                        <td>{element.Subject}</td>
                                                        <td>{formatTime(element.startTime)}</td>
                                                        <td>{element.TeacherName ? element.TeacherName : "---"}</td>
                                                        <td>
                                                            <Link href={element.URL} target="_blank">
                                                                <a target="_blank">{element.URL}</a>
                                                            </Link>
                                                        </td>
                                                        <td className={TeacherDashboardCSS.deleteSession}
                                                            onClick={() => deleteSession(element._id)}
                                                        >
                                                            🗑 Delete
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <button className={TeacherDashboardCSS.createNewSessionBtn}>
                                <Link href='/teacher/create-session'>
                                    <a> <span>➕</span> Create New Live Session</a>
                                </Link>
                            </button>
                            <button className={TeacherDashboardCSS.teacherJoinByIDBtn}>
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
