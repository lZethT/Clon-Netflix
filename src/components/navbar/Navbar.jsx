import {
  CancelOutlined,
  ExpandMore,
  ExpandMoreOutlined,
  Notifications,
  Search,
} from "@mui/icons-material";
import "./navbar.scss";
import React, { useContext, useState } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import { ScrollContext } from "../contexts/ScrollContext";
import movieData from "../../mocks/mock.json";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [responsiveMenu, setResponsiveMenu] = useState(false);
  const [notfMenu, setNotfMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const { isScrolled } = useContext(ScrollContext);
  const { setIsLoggedIn } = useContext(UserContext);

  const handleClick = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <NavLink to="/Home">
            <picture className="netflix-icon">
              <source
                srcSet="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                media="(min-width: 600px)"
              />
              <source
                srcSet="https://seeklogo.com/images/N/netflix-logo-6A5D357DF8-seeklogo.com.png"
                media="(max-width: 599px)"
              />
              <img alt="netflix-icon" />
            </picture>
          </NavLink>

          <ul className="links">
            <li>
              <NavLink className={"navlink"} to="/Home">
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink className={"navlink"} to="/Series">
                Series
              </NavLink>
            </li>
            <li>
              <NavLink className={"navlink"} to="/Movies">
                Películas
              </NavLink>
            </li>
          </ul>

          <div
            className="explore"
            onClick={() =>
              setResponsiveMenu((responsiveMenu) => !responsiveMenu)
            }
          >
            <span>Explorar</span>
            <ExpandMoreOutlined className="drop" />
          </div>
          <ul
            className={
              responsiveMenu
                ? isScrolled
                  ? "menu active scrolled"
                  : "menu active"
                : "menu"
            }
          >
            <li className="menu-item">
              <NavLink className={"navlink"} to="/Series">
                Series
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink className={"navlink"} to="/Movies">
                Películas
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="right">
          {search && <SearchComponent movieData={movieData} />}
          {!search ? (
            <Search
              className="icon"
              onClick={() => setSearch((search) => !search)}
            />
          ) : (
            <CancelOutlined
              className="icon"
              onClick={() => setSearch((search) => !search)}
            />
          )}
          <NavLink className="navlink" to={"/Kids"}>
            <span className="niñ">Niños</span>
          </NavLink>
          <Notifications
            className="icon"
            onClick={() => setNotfMenu((notfMenu) => !notfMenu)}
          />
          {notfMenu && (
            <div className="notifications">
              <span>No hay notificaciones</span>
            </div>
          )}
          <img
            src="https://i.ytimg.com/vi/_UDTRXuqB_s/maxresdefault.jpg"
            alt="user-icon"
          />
          <div
            className="profile"
            onClick={() => setDropDownMenu((dropDownMenu) => !dropDownMenu)}
          >
            <ExpandMore className="userInfo" />
            {dropDownMenu && (
              <div className="options" onClick={handleClick}>
                <Link to={"/"} className="session">
                  <span>Cerrar sesión</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const SearchComponent = ({ movieData }) => {
  const list = movieData.catalogue;
  const [filterList, setFilteredList] = useState(list);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    setInputValue(value);
    if (value.trim() === "") {
      setFilteredList([]);
      return;
    }

    const filteredValues = list.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setFilteredList(filteredValues);
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleSearch}
        placeholder="Busque su película o serie"
        className="searchInput"
      />
      {inputValue !== "" && (
        <section className="filteredList">
          <ul className="filteredItem">
            {filterList.length > 0 ? (
              filterList.map((item) => {
                return (
                  <Link
                    to={`/Watch/${encodeURIComponent(item.info.trailer)}`}
                    key={item.id}
                  >
                    <li>
                      <img src={item.info.thumbnail} alt={item.title} />
                      <span className="title">{item.title}</span>
                    </li>
                  </Link>
                );
              })
            ) : (
              <span>No se encontraron resultados</span>
            )}
          </ul>
        </section>
      )}
    </>
  );
};
