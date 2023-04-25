import React, {useState} from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route, Navigate,useNavigate } from "react-router-dom";
import MiniDrawer from './components/sidebar.component';
import Dashboard from './pages/dashboard.page';
import InstitutionPage from './pages/institution.page';
import ProgramOfficers from './pages/program-officers.page';
import NewsGenerationPage from './pages/news-generation.page';
import SignUpPage from './pages/sign-up.page';
import LoginPage from './pages/login.page';
import StudentPage from './pages/students.pages';
import ApprovalsPage from './pages/approvals.page';
import EventsPlannedPage from './pages/events-planned.page';
import MyProfilePage from './pages/my-profile.page';
import ActivityUpdatePage from './pages/activity-update.page';
import MyUploadsPage from './pages/my-uploads.page';
import CertificatePage from './pages/certificate.page';
import StudentRegisterPage from './pages/student-register.page';

class App extends React.Component {
  state = {
    // isLoggedIn: false
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false
  };
  componentDidUpdate(prevProps:any, prevState:any, snapshot:any){
    // Update the localStorage whenever the state changes
    if (this.state.isLoggedIn !== prevState.isLoggedIn) {
      this.setState({ isLoggedIn: this.state.isLoggedIn });
      localStorage.setItem('isLoggedIn', this.state.isLoggedIn.toString());
    }
    // if (this.state.isLoggedIn == true) {
    //   window.location.href = "/"
    // }
  }
  render() {
    return(
    <BrowserRouter>
      {this.state.isLoggedIn ? (
        <Routes>
          <Route path="/" element={<MiniDrawer/>}>
            <Route index element={<Dashboard />} />
            <Route path="/institution" element={<InstitutionPage />} />
            <Route path="/program-officers" element={<ProgramOfficers />} />
            <Route path="/news-generation" element={<NewsGenerationPage />} />
            <Route path="/students" element={<StudentPage />} />
            <Route path="/approvals" element={<ApprovalsPage />} />
            <Route path="/events" element={<EventsPlannedPage />} />
            <Route path="/my-profile" element={<MyProfilePage/>} />
            <Route path="/activity" element={<ActivityUpdatePage/>} />
            <Route path="/uploads" element={<MyUploadsPage/>} />
            <Route path="/certificate" element={<CertificatePage/>} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage setIsLoggedIn={(value) => this.setState({ isLoggedIn: value })} />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/register" element={<StudentRegisterPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
    )
  }
}

export default App;
