import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {SignIn} from "./pl/components/LoginPage/SignIn";
import {Storage} from "./pl/components/storage/Storage";
import {Users} from "./pl/components/Users/Users";
import {Documents} from "./pl/components/documents/Documents";
import {Appointment} from "./pl/components/appointment/Appointment";
import {MainPage} from "./pl/components/MainPage/MainPage";

export const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route index element={<SignIn/>}/>
            <Route path="paperbase" element={<MainPage/>}/>
            <Route path="paperbase/users" element={<Users/>}/>
            <Route path="paperbase/storage" element={<Storage/>}/>
            <Route path="paperbase/appointment" element={<Appointment/>}/>
            <Route path="paperbase/documents" element={<Documents/>}>
            </Route>
        </Routes>
    </Router>
)

export default App;
