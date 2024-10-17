import styles from './Sidebar.module.css'
import React, { useEffect, useState } from 'react'
import { IonIcon } from '@ionic/react'
import {
  home,
  happy,
  clipboard,
  checkbox,
  journal,
  archive,
  trashBin,
  logIn,
  logOut,
} from 'ionicons/icons'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogout } from '../Redux/Features/authSlice.js'

function Sidebar() {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [isExpanded, setExpanded] = useState(false)
  const [isLogedIn, setIsLoggedIn] = useState(user)
  const dispatch = useDispatch()
  const nav = useNavigate()
  // useEffect(() => {
  //   if (!user) {
  //     dispatch(setLogout())
  //     setIsLoggedIn(!isLogedIn)
  //   }
  // }, [])

  const handleLogout = () => {
    dispatch(setLogout())
    setIsLoggedIn(false)
    nav('/login')
  }

  const menuItems = [
    {
      text: isLogedIn ? `${user?.result?.name}` : 'Login',
      icon: (
        <IonIcon
          className={
            isExpanded ? styles.nav_link_icons : styles.nav_link_icons_nx
          }
          icon={isLogedIn ? happy : logIn}
        />
      ),
      link: '/login',
    },
    {
      text: 'Home',
      icon: (
        <IonIcon
          className={
            isExpanded ? styles.nav_link_icons : styles.nav_link_icons_nx
          }
          icon={home}
        />
      ),
      link: '/',
    },
    {
      text: 'Notes',
      icon: (
        <IonIcon
          className={
            isExpanded ? styles.nav_link_icons : styles.nav_link_icons_nx
          }
          icon={clipboard}
        />
      ),
      link: '/notes',
    },
    {
      text: 'Notebooks',
      icon: (
        <IonIcon
          className={
            isExpanded ? styles.nav_link_icons : styles.nav_link_icons_nx
          }
          icon={journal}
        />
      ),
      link: '/notebooks',
    },
    {
      text: 'Archive',
      icon: (
        <IonIcon
          className={
            isExpanded ? styles.nav_link_icons : styles.nav_link_icons_nx
          }
          icon={archive}
        />
      ),
      link: '/archive',
    },
    {
      text: 'Bin',
      icon: (
        <IonIcon
          className={
            isExpanded ? styles.nav_link_icons : styles.nav_link_icons_nx
          }
          icon={trashBin}
        />
      ),
      link: '/bin',
    },
  ]

  return (
    <div
      className={
        isExpanded ? styles.side_nav_container : styles.side_nav_container_nx
      }
    >
      <div className={styles.nav_upper}>
        <div className={styles.nav_heading}>
          {isExpanded && (
            <div className={styles.nav_brand}>
              <div className={styles.nav_brand_img}></div>
              <p>VINO</p>
            </div>
          )}

          <button
            onClick={() => setExpanded(!isExpanded)}
            className={
              isExpanded
                ? `${styles.nav_hamburger} ${styles.nav_hamburger_in}`
                : `${styles.nav_hamburger} ${styles.nav_hamburger_out}`
            }
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={styles.nav_links}>
          {menuItems.map((element) => (
            <NavLink to={element.link} className={styles.nav_link}>
              {element.icon}
              {isExpanded && <p>{element.text}</p>}
            </NavLink>
          ))}
          {isLogedIn && (
            <Link onClick={handleLogout} to="/" className={styles.nav_link}>
              <IonIcon
                className={
                  isExpanded ? styles.nav_link_icons : styles.nav_link_icons_nx
                }
                icon={logOut}
              />
              {isExpanded && <p>Logout</p>}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
