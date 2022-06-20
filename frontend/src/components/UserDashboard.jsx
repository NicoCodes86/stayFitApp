import ResponsiveAppBar from "./Navbar";
import { Button } from '@chakra-ui/button';
import { Link, useNavigate } from "react-router-dom";
import { useState, useParams } from 'react';
import stayFitDataService from '../services/stayFitDataService';


const UserDashboard = () => {
    // const {id} = useParams();

    // let user = stayFitDataService.findUser(id);
    // console.log(user);

    const initialUserInfoState = {
        age: "",
        height: "",
        currentWeight: "",
        targetWeight: "",
        injuries: "", 
        hr: "",
        bp: "", 
        respirations: "", 
        o2: "",
        bmi: "",
        
    }
    const [userInfo, setUserInfo] = useState([initialUserInfoState]);

    const handleInputChange = event => {
        event.preventDefault();
        const {name, value} = event.target;
        setUserInfo({...userInfo, [name]: value})
    }

    const saveUserInfo = () => {

        var data = {
            age: userInfo.age,
            height: userInfo.height,
            currentWeight: userInfo.currentWeight,
            targetWeight: userInfo.targetWeight,
            injuries: userInfo.injuries,
            hr: userInfo.hr,
            bp: userInfo.bp,
            respirations: userInfo.respirations,
            o2: userInfo.o2,
            bmi: userInfo.bmi,
        }
        stayFitDataService.updateUser(data)
        .then(response => {
            console.log(response.data);
            setUserInfo(initialUserInfoState)
        })
        .catch(e => {
            console.log(e)
        })
    }
    return (
        <>
        <ResponsiveAppBar/>
        <h1 style={{ mx: "auto", textAlign: "center" }}>My Dashboard</h1>
        <div style={{ textAlign: 'center', fontSize: "20px"}} className="submit-form">
            <br/>
            <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
                type="number"
                id="age"
                required
                value={userInfo.age}
                onChange={handleInputChange}
                name="age"
            />
            </div>
            <div className="form-group">
            <label htmlFor="height">Height</label>
            <input
                type="number"
                id="height"
                required
                value={userInfo.height}
                onChange={handleInputChange}
                name="height"
            />
            </div>
            <div className="form-group">
            <label htmlFor="currentWeight">Current Weight</label>
            <input
                type="number"
                id="currentWeight"
                required
                value={userInfo.currentWeight}
                onChange={handleInputChange}
                name="currentWeight"
            />
            </div>
            <div className="form-group">
            <label htmlFor="targetWeight">Target Weight</label>
            <input
                type="number"
                id="targetWeight"
                required
                value={userInfo.targetWeight}
                onChange={handleInputChange}
                name="targetWeight"
            />
            </div>
            <div className="form-group">
            <label htmlFor="injuries">Injuries</label>
            <input
                type="text"
                id="injuries"
                required
                value={userInfo.injuries}
                onChange={handleInputChange}
                name="injuries"
            />
            </div>
            <div className="form-group">
            <label htmlFor="injuries">HR</label>
            <input
                type="text"
                id="injuries"
                required
                value={userInfo.injuries}
                onChange={handleInputChange}
                name="injuries"
            />
            </div>
            <div className="form-group">
            <label htmlFor="bp">BP</label>
            <input
                type="text"
                id="bp"
                required
                value={userInfo.bp}
                onChange={handleInputChange}
                name="bp"
            />
            </div>
            <div className="form-group">
            <label htmlFor="respirations">Respirations</label>
            <input
                type="text"
                id="respirations"
                required
                value={userInfo.respirations}
                onChange={handleInputChange}
                name="respirations"
            />
            </div>
            <div className="form-group">
            <label htmlFor="o2">O2</label>
            <input
                type="text"
                id="o2"
                required
                value={userInfo.o2}
                onChange={handleInputChange}
                name="o2"
            />
            </div>
            <div className="form-group">
            <label htmlFor="bmi">BMI</label>
            <input
                type="text"
                id="bmi"
                required
                value={userInfo.bmi}
                onChange={handleInputChange}
                name="bmi"
            />
            </div>
            <div className="form-group">
            <label htmlFor="imageUrl">Profile Image URL</label>
            <input
                type="text"
                id="imageUrl"
                required
                value={userInfo.imageUrl}
                onChange={handleInputChange}
                name="imageUrl"
            />
            </div>
            <br/>
            <Link to="/userlogin" style={{display: 'inline-block', textDecoration: "none"}}>
            <Button onclick={saveUserInfo}>Update</Button>
              </Link>
            
        </div>
        </>
    )
}

export default UserDashboard;