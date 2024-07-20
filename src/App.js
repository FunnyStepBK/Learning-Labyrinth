import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/home";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import logoutUser from './pages/utils/logout';
import Landing from "./pages/landing";
import ProtectedRoute from "./components/ProtectedRoute";
import isLoggedIn from "./pages/utils/checkLogin";
import styles from "./Styles/global.module.css";
import logo from './logo-favicon/maze.png';
import Owl from './images/owl.svg';
import OwlInverted from './images/owl1.svg';
import Loader from './loader/owl.gif';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentOwl, setCurrentOwl] = useState(Owl);
  const [isSwapped, setIsSwapped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 6000);
    
    const checkAuth = async () => {
      const authStatus = await isLoggedIn();
      setIsAuthenticated(authStatus);
    };

    checkAuth();

    return () => {
      clearTimeout(loadTimeout);
    };
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/signup' || currentPath === '/signin') {
      setIsAuthenticating(true);
    } else {
      setIsAuthenticating(false);
    }
  }, [window.location.pathname]);

  const logout = async () => {
    try {
      const response = await logoutUser();
      localStorage.removeItem('accessToken');
      setResponseStatus(true);
      setResponseMessage('Logged out successfully.');

      setTimeout(() => {
        window.location.href = 'http://localhost:3000/';
      }, 4000);

    } catch (error) {
      console.error('Logout failed:', error);
      setResponseMessage('Logout failed. Please try again.');
    }
  };
  
  const toggleOwl = () => {
    setCurrentOwl((prevOwl) => prevOwl === Owl ? OwlInverted : Owl);
    setIsSwapped((prevSwapped) => !prevSwapped);
  };

  return (
    <div id={styles.appContainer}>
      {isLoading && (
        <div id={styles.activeLoader}>
          <img src={Loader} alt="Loading..." id={styles.loaderGif} />
        </div>
      )}

      {!isAuthenticating && (
        <>
          <div id={styles.navbar}>
            <div id={styles.logoContainer} onClick={() => {
              navigate(isAuthenticated ? '/home' : '/');
            }}>
              <img src={logo} id={styles.logo} alt="Logo" />
              <div id={styles.logoName}>
                Learning <br />Labyrinth
              </div>
            </div>

            <div id={styles.navOptionsContainer}>
              {isAuthenticated ? (
                <span className={styles.navOptions}>
                  <span style={{ marginLeft: '24px' }}>My</span>
                  <br />
                  Courses
                </span>
              ) : (
                <span id={styles.authSection}>
                  <img
                    src={currentOwl}
                    id={styles.Owl}
                    onClick={toggleOwl}
                    style={{ cursor: 'pointer' }}
                    alt="Owl Icon"
                  />
                  <a href="/signup" id={styles.signUpLink} 
                  className={isSwapped ? `${styles.hideSignUp}` : ''}>
                    <span id={styles.signUp}>Sign Up</span>
                  </a>
                  <a href="/signin" id={styles.signInLink}
                  className={isSwapped ? `${styles.activeSignIn}` : `${styles.hideSignIn}`}>
                    <span id={styles.signIn}>Sign In</span>
                  </a>
                </span>
              )}

              <span className={styles.navOptions}>
                <span style={{ marginLeft: '2px' }}>Explore</span>
                <br />
                Courses
              </span>

              <span className={`material-symbols-outlined ${styles.navIcons}`}>
                search
              </span>

              <span id={styles.menuBtn}  className={!isSideBarActive ? 
              `material-symbols-outlined ${styles.navIcons}` :
              `material-symbols-outlined ${styles.navIcons} ${styles.activeMenuBtn}`} 
              onClick={() => {
                !isSideBarActive ? setIsSideBarActive(true) : setIsSideBarActive(false);
              }}>
                {isSideBarActive ? "menu_open" : "menu"}
              </span>
            </div>
          </div>

          <div id={styles.sidebar} className={isSideBarActive ? `${styles.sideBarActive}` : `${styles.hideSideBar}`}>

          {isAuthenticated ? (
              <>
                <div id={styles.personalSection} className={styles.sidebarComponents}>

                  <h2>
                    Personal
                  </h2>

                  <div className={styles.commonBarComponenetsProps}></div>
                  <div className={styles.commonBarComponenetsProps}></div>
                  <div className={styles.commonBarComponenetsProps}></div>
                                

                  </div>

                <div id={styles.currentLessons} className={styles.sidebarComponents}>

                  <h2>
                    Current Lesson
                  </h2>

                  <div className={styles.commonBarComponenetsProps}></div>
                  <div className={styles.commonBarComponenetsProps}></div>
                  <div className={styles.commonBarComponenetsProps}></div>
                                

                  </div>

                <div id={styles.settings} className={styles.sidebarComponents}>

                  <h2>
                    Settings
                  </h2>

                  <div className={styles.commonBarComponenetsProps}></div>
                  <div className={styles.commonBarComponenetsProps}></div>
                  <div id={styles.logout} className={styles.commonBarComponenetsProps}>
                    <span id={styles.logoutBtn} className={`material-symbols-outlined`} onClick={logout}>
                      logout
                    </span>
                  </div>

                </div>
              </>
          ) : (
            <div id={styles.barSignUp} className={styles.sidebarComponents}>
              Sign-Up
            </div>
          )}


            
          </div>
        </>
      )}

      <div id={styles.mainContent} className={!isSideBarActive && !isAuthenticating ? `${styles.mainContentSideBar}` : ``}>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
