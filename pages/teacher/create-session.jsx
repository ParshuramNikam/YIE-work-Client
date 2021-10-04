import Link from "next/dist/client/link";
import CreateSessionCSS from '../../styles/CreateSession.module.css'
import Dashboard from "../student/dashboard";

const createSession = () => {
    const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <section className={CreateSessionCSS.createSessionSection}>
            <div className={CreateSessionCSS.createDiv}>
                <select name="choose_class" id="choose_class"
                    onChange={(e) => console.log(e.target.value)}
                >
                    <option value="none" selected disabled > --Choose Class-- </option>
                    {
                        classes.map((element, index) => {
                            return <option key={index} value={`Class ${element}`}>{`Class ${element}`}</option>
                        })
                    }
                </select>
                <input type="number" name="input_time" id="input_time" placeholder="Enter session Time" />
                <div>
                    <label htmlFor="input_date">Enter Date</label>
                    <input type="date" name="input_date" id="input_date" />
                </div>
                <input type="url" name="input_url" id="input_url" />
                <div>
                    <input type="checkbox" name="notification" id="notification" />
                    <label htmlFor="notification">Notify Class</label>
                </div>
                <button>Create Class</button>
            </div>

            {/* <Dashboard/> */}

        </section>
    )
}

export default createSession;
