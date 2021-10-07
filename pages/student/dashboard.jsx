import { useState, useEffect } from 'react';
import Link from 'next/link';

const dashboard = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/getlinks/class", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ class: 1 }),
        }).then(function (response) {
            return response.json();
        }).then(function (fetchedData) {
            setData(fetchedData)
            console.log(data);
            setIsLoading(false);
        })
    }, []);

    const formatTime = (inputTime) => {
        inputTime = parseFloat(inputTime / 100).toFixed(2).toString().split('.');
        let ampm = "am";
        if (inputTime[0] >= 12) {
            if (inputTime[0] > 12) inputTime[0] -= 12;
            ampm = 'pm';
        }
        return `${inputTime[0]}:${inputTime[1]} ${ampm}`;
    }

    return (
        <section>
            <h2 className="text-4xl font-normal text-center leading-normal mt-0 mb-2 text-blueGray-800">
                Student Dashboard
            </h2>
            {isLoading ? <h3 style={{ textAlign: "center", fontWeight: 400 }}>Loading...</h3> :
                <div>
                    {
                        data.length === 0 ? <h1>Today, you don't any meetings</h1> : <>
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
                                                                Class LInk
                                                            </label>
                                                            <p classNameName="">
                                                                <Link href={element.URL} target="_blank" >
                                                                    <a target="_blank" style={{ color: "blue", textDecoration: "underline" }}>Class Link</a>
                                                                </Link>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* Join By ID button */}
                            {/* <button class="rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white m-5">
                                <Link href={`/`}>
                                    <a>Join by ID</a>
                                </Link>
                            </button> */}
                        </>}
                </div>
            }
        </section>
    )
}

export default dashboard
